import opentype from 'opentype.js';
import fs from 'fs';
// Usage: node scripts/generate-logo.mjs  ->  public/brand/*.svg + app/icon.svg
const out = 'public/brand';
const F = (p) => opentype.loadSync(p);
const cinzel = F('node_modules/@fontsource/cinzel/files/cinzel-latin-700-normal.woff');
const mont7 = F('node_modules/@fontsource/montserrat/files/montserrat-latin-700-normal.woff');
const mont6 = F('node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff');

function text(font, str, size, tracking, x, y, anchor = 'middle') {
  const glyphs = font.stringToGlyphs(str);
  const scale = size / font.unitsPerEm;
  const widths = glyphs.map((g) => g.advanceWidth * scale);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (glyphs.length - 1);
  let cx = anchor === 'middle' ? x - total / 2 : anchor === 'end' ? x - total : x;
  let d = '';
  glyphs.forEach((g, i) => { d += g.getPath(cx, y, size).toPathData(2); cx += widths[i] + tracking; });
  return { d, width: total };
}

function build({ dark, red, bg }) {
  const W = 640, H = 400;
  const maks = text(cinzel, 'MAKSYMYK', 80, 7, 320, 262);
  const group = text(cinzel, 'GROUP', 40, 20, 320, 316);
  const firma = text(mont7, 'FIRMA BUDOWLANA', 25, 6, 320, 364);
  const mw = text(mont6, 'm', 50, 0, 0, 0, 'start').width; const mx0 = 320 - (mw + 16) / 2; const m = text(mont6, 'm', 50, 0, mx0, 178, 'start');
  const two = text(mont6, '2', 24, 0, mx0 + m.width + 2, 150, 'start');
  const gL = 320 - group.width / 2 - 22, gR = 320 + group.width / 2 + 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="M2 Maksymyk Group – Firma Budowlana">
${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ''}
<path d="M86 182 L320 40 L554 182" fill="none" stroke="${dark}" stroke-width="22" stroke-linejoin="miter" stroke-miterlimit="10"/>
<path d="M164 70 H194 V118.5 L164 136.7 Z" fill="${dark}"/>
<path d="M330 74 L516 186" fill="none" stroke="${red}" stroke-width="6"/>
<path fill="${dark}" d="${m.d}${two.d}"/>
<path fill="${dark}" d="${maks.d}"/>
<path fill="${red}" d="${group.d}"/>
<path d="M${(gL - 95).toFixed(1)} 302 H${gL.toFixed(1)} M${gR.toFixed(1)} 302 H${(gR + 95).toFixed(1)}" stroke="${red}" stroke-width="4"/>
<path fill="${dark}" d="${firma.d}"/>
<path d="M190 386 H450" stroke="${dark}" stroke-width="2.5"/>
<path d="M296 386 H344" stroke="${red}" stroke-width="5"/>
</svg>`;
}

function mark({ dark, red, bg, rx = 0 }) {
  const m = text(mont6, 'm', 210, 0, 0, 0, 'start');
  const mx = 256 - (m.width + 40) / 2;
  const mm = text(mont6, 'm', 210, 0, mx, 430, 'start');
  const two = text(mont6, '2', 96, 0, mx + m.width + 6, 318, 'start');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
${bg ? `<rect width="512" height="512" rx="${rx}" fill="${bg}"/>` : ''}
<path d="M48 226 L256 86 L464 226" fill="none" stroke="${dark}" stroke-width="40" stroke-linejoin="miter" stroke-miterlimit="10"/>
<path d="M112 92 H160 V151 L112 183 Z" fill="${dark}"/>
<path d="M282 146 L392 221" fill="none" stroke="${red}" stroke-width="12"/>
<path fill="${dark}" d="${mm.d}"/>
<path fill="${red}" d="${two.d}"/>
</svg>`;
}

fs.mkdirSync(out, { recursive: true });
const C = { dark: '#1d1d1f', red: '#a8232b' };
fs.writeFileSync(`${out}/logo.svg`, build({ ...C }));
fs.writeFileSync(`${out}/logo-white.svg`, build({ dark: '#ffffff', red: '#d23b43' }));
fs.writeFileSync(`${out}/logo-mark.svg`, mark({ ...C }));
fs.writeFileSync('app/icon.svg', mark({ ...C, bg: '#ffffff', rx: 96 }));
fs.writeFileSync(`${out}/icon-dark.svg`, mark({ dark: '#ffffff', red: '#d23b43', bg: '#1d1d1f', rx: 0 }));
console.log('ok');
