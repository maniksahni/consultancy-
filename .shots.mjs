import { chromium } from 'playwright';
const [,, out, w, h, ...routes] = process.argv;
const b = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: +w, height: +h } });
await ctx.addInitScript(() => { try { sessionStorage.setItem('althea-intro','1'); } catch {} });
const p = await ctx.newPage(); const errs=[]; p.on('pageerror', e => errs.push(e.message));
for (const r of routes) { await p.goto('http://localhost:3000'+r, { waitUntil: 'networkidle', timeout: 180000 }); await p.waitForTimeout(3500); await p.screenshot({ path: `${out}${r.replace(/\W/g,'_')}.png` }); }
console.log(errs.slice(0,5)); await b.close();
