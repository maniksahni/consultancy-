import { chromium } from 'playwright';
const [,, out, w, h] = process.argv;
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: +w, height: +h } });
await ctx.addInitScript(() => { try { sessionStorage.setItem('althea-intro','1'); } catch {} });
const p = await ctx.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type()==='error' && errs.push(m.text()));
await p.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 180000 }); await p.waitForTimeout(4500);
await p.screenshot({ path: `${out}-0.png` });
const total = await p.evaluate(() => document.documentElement.scrollHeight); let i=1;
for (let y=0; y<total; y+=900) { for (let k=0;k<6;k++){ await p.mouse.wheel(0,150); await p.waitForTimeout(40);} await p.waitForTimeout(1100); await p.screenshot({ path: `${out}-${String(i++).padStart(2,'0')}.png` }); if (await p.evaluate(() => innerHeight+scrollY >= document.documentElement.scrollHeight-5)) break; }
console.log('shots', i, errs.slice(0,5)); await b.close();
