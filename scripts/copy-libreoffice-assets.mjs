import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkgRoot = join(root, 'node_modules/@matbee/libreoffice-converter');
const wasmOut = join(root, 'public/libreoffice/wasm');
const distOut = join(root, 'public/libreoffice/dist');

if (!existsSync(pkgRoot)) {
  console.error('Missing @matbee/libreoffice-converter — run npm install first.');
  process.exit(1);
}

mkdirSync(wasmOut, { recursive: true });
mkdirSync(distOut, { recursive: true });

for (const file of ['soffice.js', 'soffice.wasm', 'soffice.data', 'soffice.worker.js']) {
  cpSync(join(pkgRoot, 'wasm', file), join(wasmOut, file));
}

cpSync(join(pkgRoot, 'dist/browser.worker.global.js'), join(distOut, 'browser.worker.js'));

console.log('Copied LibreOffice WASM assets to public/libreoffice/');
