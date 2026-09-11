/**
 * Derives the brand assets the site actually uses from the two master logo
 * files in scripts/brand-src/.
 *
 *   npm run brand
 *
 * The masters are 1536x1024 PNGs with alpha, carrying one lockup: the mark
 * (an H pill, an O circle, a tall Y pill and a full stop) with "HOUSE OF YOU"
 * set underneath, tucked bottom-left beneath the H and O.
 *
 * Two problems with using them directly:
 *
 *   - They are 771KB and 1.15MB, for something drawn at 40px in a header.
 *   - At header size the "HOUSE OF YOU" line is about five pixels tall, which
 *     renders as grey mush rather than as words.
 *
 * So we cut the mark on its own and use that everywhere, setting "House of You"
 * in type at a legible size wherever a tagline is wanted. Even at 64px tall the
 * baked-in wordmark renders around 7px, which is below the size at which it
 * reads as words — type is the honest way to show it small.
 *
 * The crop is measured from the alpha channel rather than eyeballed. These are
 * the real shape boundaries, from scanning the alpha profile:
 *
 *   rows, left of the Y pill : 266-808 (H pill + O circle), 830-945 (wordmark)
 *   columns                  : 173-499 (H), 523-876 (O), 902-1247 (Y), 1271-1443 (dot)
 *
 * The 22px gap between 808 and 830, and the fact the Y pill starts at x=902
 * while the wordmark ends by x=890, are what make a clean separation possible.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'brand-src');
const OUT = path.resolve(__dirname, '..', 'src', 'assets', 'brand');
const PUBLIC = path.resolve(__dirname, '..', 'public');

/** Everything below this row and left of the Y pill is the "HOUSE OF YOU" line. */
const WORDMARK_TOP = 820;
const Y_PILL_LEFT = 895;

const VARIANTS = [
  { name: 'dark', file: 'hoy-logo-dark.png' }, // ink shapes, for light backgrounds
  { name: 'light', file: 'hoy-logo-light.png' }, // white shapes, for dark backgrounds
];

/** Blanks the wordmark out of the master, leaving the mark alone. */
async function markOnly(src) {
  const { width, height } = await sharp(src).metadata();
  // A fully transparent rectangle composited with 'dest-out' erases whatever
  // is underneath it, which is cleaner than cropping shapes we want to keep.
  const eraser = await sharp({
    create: {
      width: Y_PILL_LEFT,
      height: height - WORDMARK_TOP,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  return sharp(src)
    .composite([{ input: eraser, left: 0, top: WORDMARK_TOP, blend: 'dest-out' }])
    .toBuffer();
}

/** Trims transparent margin and renders at a fixed height. */
async function emit(buffer, outPath, height) {
  await sharp(buffer)
    .trim({ threshold: 2 })
    .resize({ height, withoutEnlargement: false, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(outPath);
  const { size } = await fs.stat(outPath);
  console.log(`[brand] ${path.basename(outPath)} — ${(size / 1024).toFixed(1)}KB`);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });

  for (const { name, file } of VARIANTS) {
    const src = path.join(SRC, file);

    // 3x the largest size the mark is drawn at, so retina stays crisp.
    await emit(await markOnly(src), path.join(OUT, `hoy-mark-${name}.png`), 132);
  }

  // Favicons: the mark, knocked out of an ink rounded square.
  const mark = await sharp(await markOnly(path.join(SRC, 'hoy-logo-light.png')))
    .trim({ threshold: 2 })
    .toBuffer();

  for (const size of [32, 180, 512]) {
    // The mark is 1.38:1, so fitting it by width in a square already leaves
    // vertical air. Tight padding on the small sizes buys back the pixels
    // that decide whether a 32px tab icon reads as letters or as specks.
    const pad = Math.round(size * (size <= 32 ? 0.06 : 0.16));
    const inner = await sharp(mark)
      .resize({ width: size - pad * 2, fit: 'inside' })
      .toBuffer();
    const meta = await sharp(inner).metadata();

    const rounded = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
         <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="#14110F"/>
       </svg>`,
    );

    await sharp(rounded)
      .composite([
        {
          input: inner,
          left: Math.round((size - meta.width) / 2),
          top: Math.round((size - meta.height) / 2),
        },
      ])
      .png()
      .toFile(path.join(PUBLIC, size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`));
    console.log(`[brand] favicon ${size}px`);
  }
}

main().catch((err) => {
  console.error('[brand] failed:', err.message);
  process.exit(1);
});
