// Copies the pdf.js reader into public/ so the CV checker can read PDFs in the browser, without uploading them.
import { copyFileSync, mkdirSync } from 'node:fs';
const out = 'public/vendor/pdfjs';
mkdirSync(out, { recursive: true });
for (const f of ['pdf.min.mjs', 'pdf.worker.min.mjs']) copyFileSync(`node_modules/pdfjs-dist/build/${f}`, `${out}/${f}`);
console.log('pdf.js copied to', out);
