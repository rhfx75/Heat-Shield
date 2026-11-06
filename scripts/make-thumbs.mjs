import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DATA = path.join(ROOT, 'src', 'data', 'products.ts');
const PUB = path.join(ROOT, 'public');
const OUT = path.join(PUB, 'images', 'products', 'thumbs');
const SIZES = [480, 960];

function safeName(p) {
  return p.replace(/^\/+/, '').replace(/^images\/products\/?/i, '').replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-');
}

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function tryTrim(input) {
  // Conservative: only trim when a solid/near-solid border is detected by sharp.trim defaults on flattened white bg.
  try {
    const meta = await sharp(input).metadata();
    const buf = await sharp(input).flatten({ background: { r: 255, g: 255, b: 255 } }).trim({ threshold: 12 }).toBuffer();
    const tmeta = await sharp(buf).metadata();
    if (!meta.width || !meta.height || !tmeta.width || !tmeta.height) return { buffer: null, trimmed: false };
    const areaRatio = (tmeta.width * tmeta.height) / (meta.width * meta.height);
    // If trim removes too much (>35%), skip - likely removed product content.
    if (areaRatio < 0.65) return { buffer: null, trimmed: false };
    // If trim removes almost nothing, not useful.
    if (areaRatio > 0.995) return { buffer: null, trimmed: false };
    return { buffer: buf, trimmed: true };
  } catch {
    return { buffer: null, trimmed: false };
  }
}

const src = await fs.readFile(DATA, 'utf8');
const re = /image:\s*'([^']+)'/g;
const images = [];
let m;
while ((m = re.exec(src))) images.push(m[1]);
const unique = [...new Set(images)];
await fs.mkdir(OUT, { recursive: true });

const report = { source: unique.length, generated480: 0, generated960: 0, missing: [], failed: [], trimDisabled: [], skipped: 0 };

for (const rel of unique) {
  if (!rel || rel === 'null') continue;
  const abs = path.join(PUB, rel.replace(/^\//, ''));
  if (!(await exists(abs))) { report.missing.push(rel); continue; }
  const base = safeName(rel).replace(/\.(png|jpe?g|webp|avif)$/i, '');
  let pipelineInput = abs;
  let trimmed = false;
  const t = await tryTrim(abs);
  if (t.buffer) { pipelineInput = t.buffer; trimmed = true; }
  if (!trimmed) report.trimDisabled.push(rel);
  for (const size of SIZES) {
    const out = path.join(OUT, `${base}-${size}.webp`);
    try {
      let p = sharp(pipelineInput, { failOn: 'none' }).rotate().resize({ width: size, withoutEnlargement: true, fit: 'inside' }).webp({ quality: 82 });
      await p.toFile(out);
      if (size === 480) report.generated480++; else report.generated960++;
    } catch (e) {
      report.failed.push({ image: rel, size, error: String(e && e.message ? e.message : e) });
    }
  }
}

await fs.writeFile(path.join(ROOT, 'audit', 'thumbs-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
