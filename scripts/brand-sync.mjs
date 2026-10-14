import {readFile,writeFile,mkdir} from 'node:fs/promises';
const text=await readFile('src/config/brand.ts','utf8');
const brand=JSON.parse(text.slice(text.indexOf('=')+1,text.lastIndexOf(' as const;')));
await mkdir('public/brand',{recursive:true});
for(const [key,svg] of Object.entries(brand.svg)) await writeFile('public'+brand.assets[key],svg.replace(/\{(\w+)\}/g,(_,k)=>String(brand.colors[k]??brand[k]??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')));
const vars={...brand.palette,...brand.colors,'font-display':brand.fonts.display,'font-body':brand.fonts.body};
await writeFile('src/config/brand.css',':root {\n'+Object.entries(vars).map(([k,v])=>`  --${k}: ${v};`).join('\n')+'\n}\n');
