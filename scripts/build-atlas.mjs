import sharp from 'sharp';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

const cfg = JSON.parse(await readFile(new URL('../lib/logo-atlas.json', import.meta.url), 'utf8'));
const { columns, rows, cell, padding, logos } = cfg;
const ICONS = path.join(process.cwd(), 'node_modules', 'devicon', 'icons');
const inner = cell - padding * 2;

const layers = [];
const missing = [];

for (const [i, logo] of logos.entries()) {
  const file = path.join(ICONS, logo.devicon);
  try {
    await access(file);
  } catch {
    missing.push(logo.devicon);
    continue;
  }

  const png = await sharp(await readFile(file), { density: 600 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  layers.push({
    input: png,
    left: (i % columns) * cell + padding,
    top: Math.floor(i / columns) * cell + padding,
  });
}

if (missing.length) {
  console.error(
    `Missing devicon files:\n  ${missing.join('\n  ')}\n` +
      'Check the names in node_modules/devicon/icons and update lib/logo-atlas.json.',
  );
  process.exit(1);
}

await sharp({
  create: {
    width: columns * cell,
    height: rows * cell,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(layers)
  .webp({ quality: 90, alphaQuality: 100, effort: 6 })
  .toFile(path.join(process.cwd(), 'public', 'prog.webp'));

console.log(`✓ public/prog.webp: ${columns * cell}×${rows * cell}, ${logos.length} logos`);