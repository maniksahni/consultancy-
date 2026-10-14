import { readdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat();
}
const pages = (await files('out')).filter(p => p.endsWith('.html') && !p.endsWith('/404.html'));
const urls = new Set();
const titleCanonicals = new Map();
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  for (const pattern of [/<title>[^<]+<\/title>/, /name="description" content="[^"]+"/, /property="og:title" content="[^"]+"/, /property="og:description" content="[^"]+"/, /name="twitter:card" content="summary_large_image"/]) {
    assert.match(html, pattern, `Missing search metadata: ${path}`);
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.replaceAll('&amp;', '&');
  const description = html.match(/name="description" content="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
  assert.ok(title && title.length <= 60, `Search title should be concise (max 60 chars): ${path} (${title?.length ?? 0})`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `Page must have one clear primary heading: ${path}`);
  assert.ok(description && description.length <= 160, `Search description should be concise (max 160 chars): ${path} (${description?.length ?? 0})`);
  assert.match(html, /name="robots" content="index, follow"/, `Page must remain indexable: ${path}`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `Missing canonical: ${path}`);
  assert.ok(canonical[1].startsWith('https://altheaconsulting.in'), `Wrong host: ${path}`);
  const existingTitleCanonical = titleCanonicals.get(title);
  assert.ok(!existingTitleCanonical || existingTitleCanonical === canonical[1], `Search title is duplicated across canonical pages: ${title} (${existingTitleCanonical}, ${canonical[1]})`);
  titleCanonicals.set(title, canonical[1]);
  urls.add(canonical[1]);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
const robots = await readFile('out/robots.txt', 'utf8');
assert.match(robots, /Allow: \//);
assert.doesNotMatch(robots, /Disallow: \//);
assert.deepEqual(sitemapUrls, urls, 'Sitemap URLs must match the pages’ canonical URLs exactly');
console.log(`Verified concise, indexable metadata, exact canonical sitemap coverage and valid JSON-LD across ${pages.length} exported pages.`);
