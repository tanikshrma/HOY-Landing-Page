/**
 * Cuts scripts/.raw/looks-triptych.jpg into the three look panels.
 *
 * The three looks are generated in one frame on purpose — see the
 * looks-triptych entry in image-prompts.mjs for why — so they have to be
 * separated before the page can use them as three cards.
 *
 * Run by generate-images.mjs; also runnable on its own:
 *   node scripts/slice-triptych.mjs
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAW = path.join(path.dirname(fileURLToPath(import.meta.url)), '.raw');
const SRC = path.join(RAW, 'looks-triptych.jpg');
const OUT = ['look-office', 'look-weekend', 'look-festive'];

export async function sliceTriptych() {
  const img = sharp(SRC);
  const { width, height } = await img.metadata();
  const { data, info } = await img.clone().greyscale().raw().toBuffer({ resolveWithObject: true });

  // The model drew thin dark rules between the panels. Find them by looking for
  // columns whose mean luminance is far below the image mean.
  const colMean = [];
  for (let x = 0; x < info.width; x++) {
  let sum = 0;
  for (let y = 0; y < info.height; y++) sum += data[y * info.width + x];
  colMean.push(sum / info.height);
  }
  const overall = colMean.reduce((a, b) => a + b, 0) / colMean.length;
  const dark = colMean.map((m, x) => ({ x, m })).filter((c) => c.m < overall * 0.72);

  // Group adjacent dark columns into runs, then take the centre of each run that
  // sits away from the outer edges.
  const runs = [];
  for (const c of dark) {
  const last = runs.at(-1);
  if (last && c.x - last.at(-1) <= 3) last.push(c.x);
  else runs.push([c.x]);
  }
  // A drawn rule is only a few pixels wide and dark down the whole column;
  // a pair of dark jeans is hundreds of pixels wide. Filter on run width.
  const cuts = runs
  .filter((r) => r.length <= 14)
  .map((r) => Math.round((r[0] + r.at(-1)) / 2))
  .filter((x) => x > width * 0.15 && x < width * 0.85);

  console.log(`image ${width}x${height}, detected cuts at: ${cuts.join(', ') || '(none)'}`);

  // Fall back to even thirds if the rules were not drawn.
  const bounds = cuts.length === 2
  ? [[0, cuts[0]], [cuts[0], cuts[1]], [cuts[1], width]]
  : [[0, width / 3], [width / 3, (width * 2) / 3], [(width * 2) / 3, width]];

  for (const [i, [a, b]] of bounds.entries()) {
  const pad = 6; // step off the rule itself
  const left = Math.round(a === 0 ? 0 : a + pad);
  const right = Math.round(b === width ? width : b - pad);
  const w = right - left;
  await sharp(SRC)
    .extract({ left, top: 0, width: w, height })
    .jpeg({ quality: 95 })
    .toFile(`scripts/.raw/${OUT[i]}.jpg`);
  console.log(`${OUT[i]}: ${w}x${height}  aspect ${(w / height).toFixed(3)}`);
  }

  return OUT;
}

// Allow running directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  await sliceTriptych();
}
