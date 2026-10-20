// Refuses to deploy a build that would remove pages from the live site.
// Runs before every deploy (npm run deploy and the daily GitHub Action). An old checkout or a
// partial build once replaced the 401-page site with a 196-page one; this stops that happening again.
//   - every page in the live sitemap must still exist in out/ (a few may go: up to MAX_LOST)
//   - key pages must be present
// To remove pages on purpose, run with ALLOW_PAGE_REMOVAL=1.
import { access, readdir } from 'node:fs/promises';

const SITE = 'https://altheaconsulting.in';
const MAX_LOST = 3;
const KEY_PAGES = ['/', '/site-map', '/france/universities', '/france/universities/sorbonne-university', '/from-india/timeline', '/france/safety-wellbeing', '/jobs', '/about'];

const exists = async (path) => {
  const file = path === '/' ? 'out/index.html' : `out${path}.html`;
  try { await access(file); return true; } catch { try { await access(`out${path}/index.html`); return true; } catch { return false; } }
};
async function count(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? count(`${dir}/${e.name}`) : e.name.endsWith('.html') ? 1 : 0))).reduce((a, b) => a + b, 0);
}

const problems = [];
for (const p of KEY_PAGES) if (!(await exists(p))) problems.push(`missing key page ${p}`);

// Read the live sitemap, retrying; if it cannot be read at all, do not deploy blind.
let live = null;
for (let attempt = 1; attempt <= 4 && !live; attempt++) {
  try {
    const res = await fetch(`${SITE}/sitemap.xml`, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    live = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/');
  } catch (e) { console.warn(`Deploy guard: live sitemap attempt ${attempt} failed (${e.message}).`); await new Promise((r) => setTimeout(r, 3000 * attempt)); }
}
if (!live) { problems.push('could not read the live sitemap to compare against (set ALLOW_PAGE_REMOVAL=1 to deploy anyway)'); live = []; }
const lost = [];
for (const p of live) if (!(await exists(p))) lost.push(p);
if (lost.length > MAX_LOST) problems.push(`${lost.length} live pages would disappear, e.g. ${lost.slice(0, 5).join(', ')}`);

const built = await count('out');
if (problems.length && process.env.ALLOW_PAGE_REMOVAL !== '1') {
  console.error(`Deploy guard: NOT deploying. Build has ${built} pages; live sitemap lists ${live.length}.\n  - ${problems.join('\n  - ')}\nThis usually means an old checkout. Pull the latest branch and rebuild, or set ALLOW_PAGE_REMOVAL=1 if the removal is intended.`);
  process.exit(1);
}
console.log(`Deploy guard: OK. Build has ${built} pages; all ${live.length} live sitemap pages kept${lost.length ? ` except ${lost.length}` : ''}.`);
