import fs from 'fs';
import path from 'path';

console.log('======================================================');
console.log('🧪 VERIFICACIÓN DE FAVICONS Y OPEN GRAPH (WHATSAPP)');
console.log('======================================================\n');

let total = 0;
let passed = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ [PASS] ${message}`);
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Archivos en public/
const files = [
  { name: 'og-image.png', minSize: 10000 },
  { name: 'og-image-square.png', minSize: 10000 },
  { name: 'favicon.ico', minSize: 1000 },
  { name: 'favicon-32x32.png', minSize: 500 },
  { name: 'favicon-16x16.png', minSize: 300 },
  { name: 'apple-touch-icon.png', minSize: 2000 },
  { name: 'pwa-192x192.png', minSize: 2000 },
  { name: 'pwa-512x512.png', minSize: 5000 },
  { name: 'pwa-maskable-512x512.png', minSize: 5000 }
];

console.log('--- 1. Existencia y Peso de Archivos en public/ ---');
files.forEach(f => {
  const p = path.join(process.cwd(), 'public', f.name);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size >= f.minSize, `${f.name} existe y tiene peso válido (${(size/1024).toFixed(1)} KB)`);
});

// 2. Metadatos en index.html
console.log('\n--- 2. Metadatos en index.html ---');
const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');

assert(html.includes('property="og:title"'), 'index.html contiene og:title');
assert(html.includes('property="og:description"'), 'index.html contiene og:description');
assert(html.includes('property="og:image" content="/og-image.png"'), 'index.html contiene og:image apuntando a /og-image.png');
assert(html.includes('property="og:image:width" content="1200"'), 'index.html especifica og:image:width 1200');
assert(html.includes('property="og:image:height" content="630"'), 'index.html especifica og:image:height 630');
assert(html.includes('name="twitter:card" content="summary_large_image"'), 'index.html contiene twitter:card summary_large_image');
assert(html.includes('name="twitter:image" content="/og-image.png"'), 'index.html contiene twitter:image apuntando a /og-image.png');

assert(html.includes('href="/favicon.ico"'), 'index.html enlaza favicon.ico');
assert(html.includes('href="/favicon-32x32.png"'), 'index.html enlaza favicon-32x32.png');
assert(html.includes('href="/favicon-16x16.png"'), 'index.html enlaza favicon-16x16.png');
assert(html.includes('href="/apple-touch-icon.png"'), 'index.html enlaza apple-touch-icon.png');
assert(html.includes('href="/pwa-192x192.png"'), 'index.html enlaza pwa-192x192.png');

// 3. vite.config.js
console.log('\n--- 3. Configuración en vite.config.js ---');
const viteCfg = fs.readFileSync(path.join(process.cwd(), 'vite.config.js'), 'utf-8');
assert(viteCfg.includes('favicon.ico'), 'vite.config.js incluye favicon.ico en includeAssets');
assert(viteCfg.includes('og-image.png'), 'vite.config.js incluye og-image.png en includeAssets');

console.log('\n======================================================');
console.log(`📊 RESULTADO: ${passed}/${total} pruebas exitosas.`);
console.log('======================================================\n');
