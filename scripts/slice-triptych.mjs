/**
 * Cuts scripts/.raw/looks-triptych.jpg into the three look panels.
 *
 * The three looks are generated in one frame on purpose — see the
 * looks-triptych entry in image-prompts.mjs — so they have to be separated
 * before the page can use them as three cards.
 *
 * Crops a third of the frame around each of the three figures.
 *
 * Earlier versions hunted for the thin rules the model sometimes draws
 * between panels and failed twice — once reading a pair of dark jeans as a
 * divider, once the edge of a curtain, giving panels of 969, 3480 and 1031
 * pixels. Column variance is the reliable signal instead: a wall is flat and
 * a person is not, and a drawn rule is flat too, so the same measurement
 * finds both the figures and the seams whether or not a rule was drawn.
 *
 * Run by generate-images.mjs; also runnable on its own:
 *   node scripts/slice-triptych.mjs
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAW = path.join(path.dirname(fileURLToPath(import.meta.url)), '.raw');
const SRC = path.join(RAW, 'looks-triptych.jpg');
const OUT = ['look-office', 'look-weekend', 'look-festive'];

/** Mean absolute deviation of a column — high over a person, low over a wall. */
function columnActivity(data, width, height) {
  const out = new Float64Array(width);
  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = 0; y < height; y++) sum += data[y * width + x];
    const mean = sum / height;
    let dev = 0;
    for (let y = 0; y < height; y++) dev += Math.abs(data[y * width + x] - mean);
    out[x] = dev / height;
  }
  return out;
}

/** Box blur, to stop a single busy column splitting a figure into two runs. */
function smooth(arr, radius) {
  const out = new Float64Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    let n = 0;
    for (let j = Math.max(0, i - radius); j <= Math.min(arr.length - 1, i + radius); j++) {
      sum += arr[j];
      n++;
    }
    out[i] = sum / n;
  }
  return out;
}

export async function sliceTriptych() {
  const img = sharp(SRC);
  const { width, height } = await img.metadata();
  const { data, info } = await img.clone().greyscale().raw().toBuffer({ resolveWithObject: true });

  const activity = smooth(columnActivity(data, info.width, info.height), Math.round(width * 0.01));
  const peak = Math.max(...activity);
  const floor = Math.min(...activity);
  const threshold = floor + (peak - floor) * 0.35;

  // Runs of "busy" columns — the figures, plus any furniture behind them.
  const runs = [];
  let start = -1;
  for (let x = 0; x < width; x++) {
    if (activity[x] > threshold && start < 0) start = x;
    else if (activity[x] <= threshold && start >= 0) {
      runs.push([start, x - 1]);
      start = -1;
    }
  }
  if (start >= 0) runs.push([start, width - 1]);

  // Keep the three strongest, then put them back in left-to-right order.
  const weight = ([a, b]) => {
    let w = 0;
    for (let x = a; x <= b; x++) w += activity[x] - threshold;
    return w;
  };
  const figures = runs
    .sort((p, q) => weight(q) - weight(p))
    .slice(0, 3)
    .sort((p, q) => p[0] - q[0]);

  // One third of the frame, centred on each figure. Deriving the width from
  // the gaps instead was a mistake: when the model spaced the figures
  // unevenly the narrowest gap was 1308px, every panel was squeezed to that,
  // and the outer two figures were sliced through.
  const panelWidth = Math.floor(width / 3);

  const centres =
    figures.length === 3
      ? figures.map(([a, b]) => Math.round((a + b) / 2))
      : [0, 1, 2].map((i) => Math.round(panelWidth * (i + 0.5)));

  if (figures.length !== 3) {
    console.log(`found ${figures.length} figures, not 3 — falling back to even thirds`);
  }

  for (const [i, centre] of centres.entries()) {
    const left = Math.max(0, Math.min(centre - Math.floor(panelWidth / 2), width - panelWidth));
    await sharp(SRC)
      .extract({ left, top: 0, width: panelWidth, height })
      .jpeg({ quality: 95 })
      .toFile(path.join(RAW, `${OUT[i]}.jpg`));
    console.log(`${OUT[i]}: ${panelWidth}x${height} centred on x=${centre}, cropped from x=${left}`);
  }

  return OUT;
}

// Allow running directly. pathToFileURL rather than string concatenation:
// on Windows argv[1] is "C:\path\to\file", which never matches the
// "file:///C:/path/to/file" form import.meta.url uses, so the naive compare
// silently skipped the run.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await sliceTriptych();
}
