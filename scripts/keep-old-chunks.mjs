// Carries recently retired /_next/static files over from the live site into out/ before a deploy.
// Runs before every deploy (npm run deploy and the daily GitHub Action).
// Why: each Firebase deploy is a complete new version, so the previous build's hashed JS chunks vanish.
// Google fetches a page's HTML and renders it later; if a deploy lands in between, the old HTML asks for
// a chunk that now 404s, the root layout fails to hydrate, and Next.js replaces the whole page with
// "Application error: a client-side exception has occurred" (no title, no canonical). That text is the
// same on every Next.js site, so Search Console filed our pages as "Duplicate without user-selected
// canonical" with another site's URL as the canonical. Keeping old chunks for a while lets late renders work.
//   - out/_next/retained-chunks.json lists every static file in the deploy with the last day a build produced it
//   - files from the live list that are not in this build and are under KEEP_DAYS old are downloaded into out/
//   - with no live list yet, the files referenced by the live pages are kept instead
// Best effort: network problems only print a warning.
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const SITE = 'https://altheaconsulting.in';
const KEEP_DAYS = 14;
const MANIFEST = 'out/_next/retained-chunks.json';
const STATIC_REF = /static\/[A-Za-z0-9_-]+\/[A-Za-z0-9_\-./]+\.(?:js|css|woff2?|ttf|png|jpe?g|svg|webp|avif|gif|ico)/g;

const today = new Date().toISOString().slice(0, 10);
const tooOld = (day) => Date.now() - Date.parse(day) > KEEP_DAYS * 86400000;

async function list(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? list(`${dir}/${e.name}`) : [`${dir}/${e.name}`]))).flat();
}
async function get(url, as = 'text') {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) return null;
  return as === 'bytes' ? Buffer.from(await res.arrayBuffer()) : res.text();
}
async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: size }, async () => { while (queue.length) await fn(queue.shift()); }));
}

// Paths are relative to /_next/, e.g. static/chunks/app/layout-ec81d5ec208ea04b.js
const files = Object.fromEntries((await list('out/_next/static')).map((f) => [f.slice('out/_next/'.length), today]));

const wanted = {};
try {
  const live = await get(`${SITE}/_next/retained-chunks.json`);
  if (live) Object.assign(wanted, JSON.parse(live).files);
  else {
    const sitemap = (await get(`${SITE}/sitemap.xml`)) || '';
    const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    await pool(pages, 16, async (page) => {
      const html = await get(page).catch(() => null);
      for (const ref of html?.match(STATIC_REF) || []) wanted[ref] = today;
    });
  }
} catch (e) { console.warn(`Keep old chunks: could not read the live site (${e.message}); deploying without old chunks.`); }

let kept = 0, missing = 0;
await pool(Object.entries(wanted).filter(([path, day]) => !files[path] && !tooOld(day)), 8, async ([path, day]) => {
  const bytes = await get(`${SITE}/_next/${path}`, 'bytes').catch(() => null);
  if (!bytes) { missing++; return; }
  await mkdir(dirname(`out/_next/${path}`), { recursive: true });
  await writeFile(`out/_next/${path}`, bytes);
  files[path] = day;
  kept++;
});

await writeFile(MANIFEST, JSON.stringify({ updated: today, keepDays: KEEP_DAYS, files }, null, 0));
console.log(`Keep old chunks: ${kept} older static files carried over${missing ? `, ${missing} no longer on the live site` : ''}; ${Object.keys(files).length} listed.`);
