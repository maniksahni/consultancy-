import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import Critters from 'critters';

const output = resolve('out');
// CSS extraction cannot infer the font families referenced through custom properties.
// Keep their declarations in HTML so discovering a font does not wait for the full CSS.
let fontFaces = '';
let criticalFontHref = '';
for (const name of await readdir(join(output, '_next/static/css'))) {
  if (!name.endsWith('.css')) continue;
  const css = await readFile(join(output, '_next/static/css', name), 'utf8');
  fontFaces += (css.match(/@font-face\s*\{[^}]*\}/g) || []).join('');
  const criticalFont = css.match(/@font-face\{font-family:[^}]*Cormorant[^}]*font-style:normal;font-weight:400[^}]*src:url\(([^)]+)\)[^}]*unicode-range:u\+00\?\?/);
  if (criticalFont) criticalFontHref = criticalFont[1];
}
if (!criticalFontHref) throw new Error('Could not find the critical Cormorant Latin font');
const critters = new Critters({
  path: output,
  publicPath: '/',
  preload: 'media',
  inlineFonts: true,
  preloadFonts: false,
  pruneSource: false,
  logLevel: 'silent',
});

async function inlineDirectory(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, item.name);
    if (item.isDirectory()) await inlineDirectory(file);
    else if (item.name.endsWith('.html')) {
      let html = await critters.process(await readFile(file, 'utf8'));
      // The export already contains all page content. Start hydration after its first
      // paint so framework execution does not delay discovery of the text hero's fonts.
      html = html.replace(/<link[^>]*rel="preload"[^>]*as="script"[^>]*>/g, '');
      html = html.replace(/<link[^>]*rel="preload"[^>]*as="font"[^>]*>/g, '');
      html = html.replace(/<script([^>]*?)src="(\/_next\/[^"]+)"([^>]*)><\/script>/g,
        (_, before, src, after) => `<script${before}type="text/plain" data-deferred-src="${src}"${after}></script>`);
      const loader = `<script>requestAnimationFrame(function(){requestAnimationFrame(function(){document.querySelectorAll('script[data-deferred-src]').forEach(function(node){var script=document.createElement('script');Array.from(node.attributes).forEach(function(attr){if(attr.name!=='type'&&attr.name!=='data-deferred-src')script.setAttribute(attr.name,attr.value)});script.src=node.getAttribute('data-deferred-src');node.replaceWith(script)})})})</script>`;
      html = html.replace('</body>', loader + '</body>');
      html = html.replace('</head>', `<link rel="preload" href="${criticalFontHref}" as="font" type="font/woff2" crossorigin="anonymous"><style data-font-faces>${fontFaces}</style></head>`);
      // Noscript must load the complete stylesheet even when onload handlers cannot run.
      const withFallback = html.replace(/<noscript>([\s\S]*?)<\/noscript>/g, (_, fallback) =>
        `<noscript>${fallback.replace(/ media="print"| onload="[^"]*"/g, '')}</noscript>`
      );
      await writeFile(file, withFallback);
    }
  }
}
await inlineDirectory(output);
