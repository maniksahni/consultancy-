// Before every build: pull PUBLISHED pages, blog articles, media and SEO settings from the admin's
// content studio (Apps Script, see booking/apps-script/Cms.gs) into src/data/generated/cms.json, and
// copy the photos they use into public/uploads/ (made into WebP sizes by build-image-variants.py).
// public/data/cms-version.json records what the live site was built from, so the publish workflow can
// tell when Harshita has published something new.
//   - On GitHub (CI) a failed fetch stops the build: deploying without it would drop her pages.
//   - On a computer it keeps the last fetched copy (or an empty one) and warns.
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

const OUT = 'src/data/generated/cms.json';
const UPLOADS = 'public/uploads';
const config = await readFile('src/config/booking.ts', 'utf8');
const endpoint = (config.match(/bookingEndpoint\s*=\s*"([^"]+)"/) || [])[1];
const empty = { version: 'none', fetchedAt: null, pages: [], media: [], seo: {} };

const exists = (p) => access(p).then(() => true, () => false);
async function getJson(url, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000), redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'not ok');
      return data;
    } catch (e) {
      if (i >= tries) throw e;
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
}

// URLs a root-level admin page may not take: every page and public folder the site already has.
const taken = [...new Set([...await readdir('src/app'), ...await readdir('public')].map((n) => n.replace(/\.\w+$/, '')).filter((n) => /^[a-z0-9-]+$/.test(n)))].sort();

async function save(data) {
  await mkdir('src/data/generated', { recursive: true });
  await mkdir('public/data', { recursive: true });
  const clashes = data.pages.filter((p) => p.type !== 'blog' && taken.includes(p.slug));
  for (const p of clashes) console.warn(`Content studio: skipping "${p.title}" - /${p.slug} is already a page of the site.`);
  data = { ...data, pages: data.pages.filter((p) => !clashes.includes(p)) };
  await writeFile(OUT, JSON.stringify(data, null, 1));
  await writeFile('public/data/reserved-slugs.json', JSON.stringify(taken));
  await writeFile('public/data/cms-version.json', JSON.stringify({ version: data.version }));
}

let data;
try {
  if (!endpoint) throw new Error('no booking endpoint configured');
  if (process.env.CMS_OFFLINE) throw new Error('CMS_OFFLINE is set');
  data = await getJson(`${endpoint}?action=cms`);
} catch (e) {
  if (process.env.CI) { console.error(`Content studio: could not fetch published content (${e.message}). Stopping so the deploy does not drop pages.`); process.exit(1); }
  const previous = await readFile(OUT, 'utf8').then(JSON.parse, () => null);
  console.warn(`Content studio: fetch failed (${e.message}); ${previous ? 'keeping the last fetched copy' : 'building with no CMS pages'}.`);
  await save(previous || empty);
  process.exit(0);
}

await mkdir(UPLOADS, { recursive: true });
let copied = 0;
for (const m of data.media) {
  const name = m.path.replace(/^\/uploads\//, '');
  if (!/^[\w\-.]+$/.test(name) || await exists(`${UPLOADS}/${name}`)) continue;
  const file = await getJson(`${endpoint}?action=mediaFile&id=${encodeURIComponent(m.id)}`);
  await writeFile(`${UPLOADS}/${name}`, Buffer.from(file.data, 'base64'));
  copied++;
}
const { ok: _ok, ...clean } = data;
await save({ ...clean, fetchedAt: new Date().toISOString() });
console.log(`Content studio: ${data.pages.length} published pages, ${data.media.length} images (${copied} downloaded), version ${String(data.version).slice(0, 8)}.`);
