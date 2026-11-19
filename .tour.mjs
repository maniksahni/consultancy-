import { chromium } from 'playwright';
const [,, out, w='1440', h='900'] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type()==='error' && errs.push(m.text()));
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 120000 });
await p.waitForTimeout(700); await p.screenshot({ path: `${out}-intro.png` });
await p.waitForTimeout(3000); await p.screenshot({ path: `${out}-00.png` });
await p.mouse.move(w/2, h/2);
const total = await p.evaluate(() => document.documentElement.scrollHeight);
let i = 1;
for (let y = 0; y < total; y += 900) {
  for (let k = 0; k < 6; k++) { await p.mouse.wheel(0, 150); await p.waitForTimeout(40); }
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}-${String(i++).padStart(2,'0')}.png` });
  if (await p.evaluate(() => innerHeight + scrollY >= document.documentElement.scrollHeight - 5)) break;
}
console.log('shots', i, 'height', await p.evaluate(() => document.documentElement.scrollHeight), errs.slice(0,5));
await b.close();
