import { readdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat();
}
const pages = (await files('out')).filter(p => p.endsWith('.html') && !p.endsWith('/404.html'));
const urls = new Set();
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  for (const pattern of [/<title>[^<]+<\/title>/, /name="description" content="[^"]+"/, /property="og:title" content="[^"]+"/, /property="og:description" content="[^"]+"/, /name="twitter:card" content="summary_large_image"/]) {
    assert.match(html, pattern, `Missing search metadata: ${path}`);
  }
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `Missing canonical: ${path}`);
  assert.ok(canonical[1].startsWith('https://altheaconsulting.in'), `Wrong host: ${path}`);
  urls.add(canonical[1]);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const robots = await readFile('out/robots.txt', 'utf8');
assert.match(robots, /Allow: \//);
assert.doesNotMatch(robots, /Disallow: \//);
for (const url of urls) assert.ok(sitemap.includes(`<loc>${url}</loc>`) || sitemap.includes(`<loc>${url}/</loc>`), `Canonical missing from sitemap: ${url}`);
console.log(`Verified metadata, canonical sitemap coverage and valid JSON-LD across ${pages.length} exported pages.`);
