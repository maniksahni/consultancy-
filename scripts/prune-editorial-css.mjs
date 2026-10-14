import {PurgeCSS} from 'purgecss';
import {readFile,writeFile} from 'node:fs/promises';
const css=await readFile('src/app/globals.css','utf8');
const [result]=await new PurgeCSS().purge({
  content:['src/**/*.tsx','src/**/*.ts'],css:[{raw:css}],
  safelist:{standard:['open','is-visible','voices-full','ready','reveal-ready'],greedy:[/data-reveal/,/view-transition/]},
  keyframes:false,variables:false,fontFace:false,
});
await writeFile('src/app/globals.css',result.css);
console.log(`Editorial CSS: ${css.length} → ${result.css.length} characters. Run full route/interaction QA after pruning.`);
