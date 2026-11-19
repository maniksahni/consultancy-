import { chromium } from 'playwright';
const [,, out, w, h] = process.argv;
const routes = ['/', '/about', '/services', '/book-consultation', '/study-in-france', '/destinations', '/universities?country=france&view=courses', '/programmes', '/jobs', '/knowledge', '/reviews', '/faq'];
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: +w, height: +h } });
await ctx.addInitScript(() => { try { sessionStorage.setItem('althea-intro','1'); } catch {} });
const p = await ctx.newPage(); const errs = {};
p.on('pageerror', e => { (errs[p.url()] ||= []).push(e.message.slice(0,140)); });
p.on('console', m => { if (m.type()==='error' && !/favicon|404/.test(m.text())) (errs[p.url()] ||= []).push('console: '+m.text().slice(0,140)); });
for (const r of routes) {
  const name = r === '/' ? 'home' : r.slice(1).replace(/[^a-z0-9]+/gi,'_');
  try {
    await p.goto('http://localhost:3000'+r, { waitUntil: 'networkidle', timeout: 180000 });
    await p.waitForTimeout(1800);
    await p.screenshot({ path: `${out}/${name}-a.png` });
    for (let k = 0; k < 8; k++) { await p.mouse.wheel(0, 140); await p.waitForTimeout(50); }
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `${out}/${name}-b.png` });
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ov > 1) (errs[r] ||= []).push('horizontal overflow ' + ov + 'px');
  } catch (e) { (errs[r] ||= []).push('NAV ' + e.message.slice(0,100)); }
}
console.log(JSON.stringify(errs, null, 1));
await b.close();
