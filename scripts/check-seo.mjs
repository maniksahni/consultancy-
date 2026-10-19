import { readdir, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat();
}
const pages = (await files('out')).filter(p => p.endsWith('.html') && !p.endsWith('/404.html'));
const exportFiles = new Set(await files('out'));
const urls = new Set();
const descriptionCanonicals = new Map();
const titleCanonicals = new Map();
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  for (const pattern of [/<title>[^<]+<\/title>/, /name="description" content="[^"]+"/, /property="og:title" content="[^"]+"/, /property="og:description" content="[^"]+"/, /name="twitter:card" content="summary_large_image"/]) {
    assert.match(html, pattern, `Missing search metadata: ${path}`);
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.replaceAll('&amp;', '&').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
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
  const previousDescription = descriptionCanonicals.get(description);
  assert.ok(!previousDescription || previousDescription === canonical[1], `Duplicate description across canonical pages: ${path}`);
  descriptionCanonicals.set(description, canonical[1]);
  urls.add(canonical[1]);
  const entities = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(match => { const data = JSON.parse(match[1]); return data['@graph'] || [data]; });
  const webpage = entities.find(entity => entity['@type'] === 'WebPage');
  assert.ok(webpage, `Missing WebPage identity: ${path}`);
  assert.equal(webpage.url, canonical[1], `WebPage identity must match canonical: ${path}`);
  if (new URL(canonical[1]).pathname !== '/') {
    const breadcrumb = entities.find(entity => entity['@type'] === 'BreadcrumbList');
    assert.ok(breadcrumb, `Missing breadcrumb: ${path}`);
    assert.equal(breadcrumb.itemListElement.at(-1).item, canonical[1], `Breadcrumb must resolve to canonical: ${path}`);
    const depth = new URL(canonical[1]).pathname.split('/').length - 1;
    if (/\/(destinations\/[^/]+\/|france\/|programmes\/|insights\/)/.test(canonical[1])) assert.ok(breadcrumb.itemListElement.length >= 3, `Nested page needs its section in the breadcrumb: ${path}`);
    assert.ok(breadcrumb.itemListElement.length <= depth + 2, `Breadcrumb deeper than the URL: ${path}`);
  }
  const pathname = new URL(canonical[1]).pathname;
  if (/^\/programmes\/./.test(pathname)) assert.ok(entities.some(e => e['@type'] === 'Course' && e.provider?.name && e.offers?.price), `Programme needs Course data: ${path}`);
  if (/^\/(destinations\/[^/]+\/|france\/(?!institutions|programmes|universities|resources)|insights\/)./.test(pathname)) {
    const article = entities.find(e => e['@type'] === 'Article');
    assert.ok(article?.author && /^\d{4}-\d{2}-\d{2}$/.test(article.dateModified), `Guide page needs a dated, authored Article: ${path}`);
    assert.ok(webpage.dateModified, `Guide page needs dateModified: ${path}`);
  }
  if (html.includes('class="ms-guide-jumps"')) {
    assert.match(html, /class="ms-guide-editorial"/, `Guide needs visible editorial context: ${path}`);
    assert.match(html, /id="guide-sources"/, `Guide needs a linkable source section: ${path}`);
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const [, anchor] of html.matchAll(/href="#(guide-topic-\d+|guide-sources)"/g)) {
      assert.ok(ids.has(anchor), `Guide topic link must resolve: ${anchor} on ${path}`);
    }
  }
  // Check local navigation in the exported HTML, without depending on hydration.
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
    const target = new URL(href.replaceAll('&amp;', '&'), canonical[1]);
    if (target.origin !== new URL(canonical[1]).origin) continue;
    const pathname = decodeURIComponent(target.pathname).replace(/\/$/, '') || '/';
    assert.ok(pathname === '/' || exportFiles.has(`out${pathname}.html`) || exportFiles.has(`out${pathname}/index.html`) || exportFiles.has(`out${pathname}`), `Broken internal link: ${href} on ${path}`);
  }
}
const home = await readFile('out/index.html', 'utf8');
assert.match(home, /rel="icon"[^>]+href="\/brand\/favicon.png"[^>]+sizes="512x512"/, 'Homepage must advertise the square brand favicon');
assert.match(home, /<nav class="ms-nav-links" aria-label="Main navigation">/, 'Homepage must render the primary desktop navigation');
const homeEntities = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap(match => { const data = JSON.parse(match[1]); return data['@graph'] || [data]; });
const organization = homeEntities.find(entity => entity['@type'] === 'Organization');
const website = homeEntities.find(entity => entity['@type'] === 'WebSite');
assert.equal(organization.name, website.name, 'Organization and site name must agree');
assert.ok(organization.alternateName.includes('Althea Consulting'), 'Expose the unaccented brand spelling');
assert.equal(organization.founder['@id'], 'https://altheaconsulting.in/#adviser');
assert.ok(home.includes('Althéa Consulting (altheaconsulting.in) is an independent'), 'Brand identity must be visible before hydration');
assert.equal(organization.hasOfferCatalog.itemListElement.length, 3);
for (const offer of organization.hasOfferCatalog.itemListElement) {
  assert.ok(home.includes(`href="${new URL(offer.itemOffered.url).pathname}"`), 'Marked-up services must be linked visibly');
}
for (const [, asset] of home.matchAll(/<link[^>]+rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]+href="([^"]+)"/g)) {
  assert.ok(exportFiles.has(`out${asset}`), `Missing advertised favicon: ${asset}`);
}
const favicon = await readFile('out/brand/favicon.png');
assert.equal(favicon.readUInt32BE(16), 512, 'Brand favicon width');
assert.equal(favicon.readUInt32BE(20), 512, 'Brand favicon height');
for (const route of ['study-in-france', 'settle-in-france', 'career-support', 'jobs', 'about', 'reviews', 'book-consultation']) {
  assert.ok(home.includes(`href="/${route}"`), `Homepage must link directly to /${route}`);
}
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
assert.equal((sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}/g) || []).length, sitemapUrls.size, 'Every sitemap URL needs a lastmod date');
const llmsFull = await readFile('out/llms-full.txt', 'utf8');
assert.ok(llmsFull.length > 50000 && llmsFull.includes('https://altheaconsulting.in/france/costs'), 'llms-full.txt must carry the full guide text');
assert.match(await readFile('out/llms.txt', 'utf8'), /llms-full\.txt/, 'llms.txt must point to the full corpus');
const robots = await readFile('out/robots.txt', 'utf8');
assert.match(robots, /Allow: \//);
assert.doesNotMatch(robots, /Disallow: \//);
assert.deepEqual(sitemapUrls, urls, 'Sitemap URLs must match the pages’ canonical URLs exactly');
console.log(`Verified concise, indexable metadata, exact canonical sitemap coverage and valid JSON-LD across ${pages.length} exported pages.`);
