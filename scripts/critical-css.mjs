// After `next build`: inline each page's first-screen CSS into its HTML and load the full
// stylesheets without blocking the first paint. Runs on every exported page in out/.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import Critters from 'critters';

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat();
}
const critters = new Critters({ path: 'out', publicPath: '/', preload: 'media', pruneSource: false, reduceInlineStyles: false, mergeStylesheets: true, logLevel: 'silent', compress: true });
const pages = (await files('out')).filter((p) => p.endsWith('.html'));
let done = 0;
for (let i = 0; i < pages.length; i += 8) {
  await Promise.all(pages.slice(i, i + 8).map(async (page) => {
    const html = await readFile(page, 'utf8');
    await writeFile(page, await critters.process(html));
    done++;
  }));
}
console.log(`Critical CSS inlined on ${done} pages.`);
