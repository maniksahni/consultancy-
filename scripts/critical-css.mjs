// After `next build`: inline each page's first-screen CSS into its HTML and load the full
// stylesheets without blocking the first paint. Runs on every exported page in out/.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import Critters from 'critters';

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? files(`${dir}/${e.name}`) : `${dir}/${e.name}`))).flat();
}
// inlineFonts: the @font-face rules ride along with the inlined CSS. Without them the headline's
// font family doesn't exist until the async stylesheet lands, so the biggest text on the page stays
// invisible through the font's block period and paints hundreds of ms after everything else.
const options = { path: 'out', publicPath: '/', preload: 'media', pruneSource: false, reduceInlineStyles: false, mergeStylesheets: true, inlineFonts: true, preloadFonts: false, logLevel: 'silent', compress: true };
const pages = (await files('out')).filter((p) => p.endsWith('.html'));
// next/font's size-matched fallbacks (local Arial with size-adjust) are what the text uses until the
// web fonts arrive; Critters only inlines faces with a url(), so add these too - otherwise the
// first paint uses an unadjusted system font and the text jumps when the real font swaps in.
const cssDir = 'out/_next/static/css';
const sheets = await Promise.all((await readdir(cssDir)).filter((f) => f.endsWith('.css')).map((f) => readFile(`${cssDir}/${f}`, 'utf8')));
const fallbackFaces = [...new Set(sheets.join('').match(/@font-face\{font-family:__\w+_Fallback_\w+;[^}]*\}/g) || [])].join('');
let done = 0;
// One page at a time: Critters run concurrently drops rules the page really uses (the home
// hero's own layout went missing), so first visitors saw a broken, unstyled flash until the
// full stylesheets arrived.
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const out = await new Critters(options).process(html);
  await writeFile(page, fallbackFaces ? out.replace(/<style([^>]*)>/, `<style$1>${fallbackFaces}`) : out);
  done++;
}
console.log(`Critical CSS inlined on ${done} pages.`);
