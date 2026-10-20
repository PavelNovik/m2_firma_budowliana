// Converts source images (assets-src/) into optimized web assets.
// Usage: npm run assets
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_COVERS = 'assets-src/covers';
const OUT_PORTFOLIO = 'public/portfolio';
const HERO_ID = '7698017911071460641';

fs.mkdirSync(OUT_PORTFOLIO, { recursive: true });

for (const file of fs.readdirSync(SRC_COVERS)) {
  const id = path.parse(file).name;
  await sharp(path.join(SRC_COVERS, file))
    .resize(720, 1280, { fit: 'cover' })
    .webp({ quality: 74 })
    .toFile(path.join(OUT_PORTFOLIO, `${id}.webp`));
}

// Hero background — landscape crop of a finished decorative wall
await sharp(path.join(SRC_COVERS, `${HERO_ID}.jpg`))
  .resize(1600, 1000, { fit: 'cover', position: 'centre' })
  .modulate({ saturation: 0.6 })
  .webp({ quality: 70 })
  .toFile('public/hero.webp');

// Icons
const mark = fs.readFileSync('app/icon.svg');
await sharp(mark).resize(180).png().toFile('app/apple-icon.png');
await sharp(mark).resize(192).png().toFile('public/icon-192.png');
await sharp(mark).resize(512).png().toFile('public/icon-512.png');

// Open Graph image 1200x630: graphite background, white logo, red accent bar
const logoWhite = await sharp(fs.readFileSync('public/brand/logo-white.svg')).resize(760).png().toBuffer();
const grid = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.05"/></pattern></defs>
  <rect width="1200" height="630" fill="#161618"/><rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="612" width="1200" height="18" fill="#a8232b"/>
</svg>`);
await sharp(grid)
  .composite([{ input: logoWhite, gravity: 'centre' }])
  .jpeg({ quality: 86 })
  .toFile('public/og.jpg');

console.log('assets ok');
