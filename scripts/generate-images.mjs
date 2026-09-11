/**
 * Generates the landing page photography with Gemini (Nano Banana Pro) and
 * writes AVIF / WebP / JPEG derivatives into src/assets/img.
 *
 *   npm run images          # only generates what is missing
 *   npm run images -- --force           # regenerate everything
 *   npm run images -- --only hero-desktop,rewear
 *
 * Raw model output is kept in scripts/.raw so a re-encode never costs another
 * API call.
 */
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import 'dotenv/config';
import { PROMPTS } from './image-prompts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW_DIR = path.join(__dirname, '.raw');
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'img');

const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3-pro-image';
const API_KEY = process.env.GEMINI_API_KEY;

// Widths we actually serve. Anything wider is wasted bytes on a phone.
const WIDTHS = {
  'hero-desktop': [1024, 1600, 2048],
  'hero-mobile': [480, 720, 960],
  'og-share': [1200],
  'band-rail': [1024, 1600, 2200],
  // Sliced out of looks-triptych rather than generated directly.
  'look-office': [480, 800, 1200],
  'look-weekend': [480, 800, 1200],
  'look-festive': [480, 800, 1200],
  _default: [480, 800, 1200],
};

const argv = process.argv.slice(2);
const FORCE = argv.includes('--force');
const onlyArg = argv.indexOf('--only');
const ONLY =
  onlyArg !== -1 && argv[onlyArg + 1]
    ? new Set(argv[onlyArg + 1].split(',').map((s) => s.trim()))
    : null;

function log(...a) {
  console.log('[images]', ...a);
}

async function generate({ key, aspect, prompt, ref, size }) {
  const rawPath = path.join(RAW_DIR, `${key}.jpg`);

  if (existsSync(rawPath) && !FORCE) {
    log(`${key}: reusing cached original`);
    return rawPath;
  }

  if (!API_KEY) {
    throw new Error(
      `GEMINI_API_KEY is not set and scripts/.raw/${key}.jpg does not exist. ` +
        'Add the key to .env, or commit the raw originals.',
    );
  }

  // A `ref` names an already-generated image to condition on. Text alone
  // cannot hold a face and a specific garment steady across separate calls,
  // so the "same shirt, three ways" series passes the first frame into the
  // next two.
  const parts = [];
  if (ref) {
    const refPath = path.join(RAW_DIR, `${ref}.jpg`);
    if (!existsSync(refPath)) {
      throw new Error(`${key}: reference image ${ref} must be generated first`);
    }
    parts.push({
      inlineData: { mimeType: 'image/jpeg', data: readFileSync(refPath).toString('base64') },
    });
  }
  parts.push({ text: prompt });

  log(`${key}: generating (${aspect})${ref ? ` from ${ref}` : ''}…`);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: aspect, imageSize: size || '2K' },
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`${key}: ${res.status} ${await res.text()}`);
  }

  const body = await res.json();
  const part = body.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) {
    throw new Error(`${key}: model returned no image — ${JSON.stringify(body).slice(0, 400)}`);
  }

  await fs.mkdir(RAW_DIR, { recursive: true });
  await fs.writeFile(rawPath, Buffer.from(part.inlineData.data, 'base64'));
  log(`${key}: saved original`);
  return rawPath;
}

async function encode(key, rawPath) {
  const widths = WIDTHS[key] || WIDTHS._default;
  const src = sharp(rawPath).rotate();
  const { width: nativeWidth } = await src.metadata();

  for (const w of widths) {
    if (w > nativeWidth) continue;
    const resized = () => sharp(rawPath).rotate().resize({ width: w, withoutEnlargement: true });

    await resized().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT_DIR, `${key}-${w}.avif`));
    await resized().webp({ quality: 74 }).toFile(path.join(OUT_DIR, `${key}-${w}.webp`));
  }

  // JPEG fallback at the smallest width, for anything that cannot do <picture>.
  await sharp(rawPath)
    .rotate()
    .resize({ width: widths[0], withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT_DIR, `${key}-${widths[0]}.jpg`));

  // A 24px blur-up placeholder, inlined as a data URI at build time.
  const lqip = await sharp(rawPath).rotate().resize({ width: 24 }).webp({ quality: 20 }).toBuffer();

  const meta = await sharp(rawPath).metadata();
  return {
    key,
    widths: widths.filter((w) => w <= nativeWidth),
    width: meta.width,
    height: meta.height,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const targets = PROMPTS.filter((p) => !ONLY || ONLY.has(p.key));

  if (!targets.length) {
    log('nothing matched --only');
    return;
  }

  const manifest = {};
  for (const spec of targets) {
    const rawPath = await generate(spec);

    // The triptych is not served itself — it is cut into the three look
    // panels, which are what the page uses.
    if (spec.key === 'looks-triptych') {
      const { sliceTriptych } = await import('./slice-triptych.mjs');
      for (const key of await sliceTriptych()) {
        manifest[key] = await encode(key, path.join(RAW_DIR, `${key}.jpg`));
        log(`${key}: sliced and encoded`);
      }
      continue;
    }

    manifest[spec.key] = await encode(spec.key, rawPath);
    log(`${spec.key}: encoded ${manifest[spec.key].widths.join(', ')}`);
  }

  // Merge into any existing manifest so --only does not wipe the rest.
  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  let existing = {};
  if (existsSync(manifestPath)) {
    existing = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  }
  await fs.writeFile(manifestPath, JSON.stringify({ ...existing, ...manifest }, null, 2));
  log(`wrote manifest with ${Object.keys({ ...existing, ...manifest }).length} entries`);
}

main().catch((err) => {
  console.error('[images] failed:', err.message);
  process.exit(1);
});
