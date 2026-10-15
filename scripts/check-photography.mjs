import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=process.cwd();
const collection=JSON.parse(await readFile(path.join(root,'src/data/photoSources.json'),'utf8'));
const issues=[];const sources=new Map();
for(const [slot,photo] of Object.entries(collection)){
 const identity=photo.sha1||photo.source||photo.file;
 if(sources.has(identity))issues.push(`Source repeated: ${sources.get(identity)} and ${slot}`);
 sources.set(identity,slot);
 try{await stat(path.join(root,'public',photo.file));}catch{issues.push(`Missing asset: ${slot} -> ${photo.file}`);}
}
const files=[];async function walk(dir){for(const ent of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,ent.name);if(ent.isDirectory())await walk(f);else if(f.endsWith('.html'))files.push(f);}}
await walk(path.join(root,'out'));
const placements=new Map();let count=0;
for(const file of files){const html=await readFile(file,'utf8');for(const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)){
 const src=match[1];if(!src.startsWith('/images/'))continue;count++;
 if(/althea-paper-paris|\/mentor\.(jpg|webp)/.test(src))issues.push(`Rejected photo rendered in ${file}`);
 const pages=placements.get(src)||[];pages.push(path.relative(root,file));placements.set(src,pages);
}}
for(const [src,pages]of placements)if(pages.length>1)issues.push(`Rendered photo repeated: ${src} -> ${pages.join(', ')}`);
const fingerprints=new Map();
for(const src of placements.keys()){const hash=createHash('sha256').update(await readFile(path.join(root,'public',src))).digest('hex');if(fingerprints.has(hash))issues.push(`Identical files with different names: ${src}, ${fingerprints.get(hash)}`);fingerprints.set(hash,src);}
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}else console.log(`Photography audit passed: ${files.length} exported pages, ${count} rendered photo placements, ${sources.size} distinct reserved sources. No repeated rendered photos or rejected images.`);
