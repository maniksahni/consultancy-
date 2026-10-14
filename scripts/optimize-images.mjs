import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const images = ['paris-eiffel','paris-street',...['uk','usa','canada','germany','australia','ireland'].map(s => `destinations/${s}`)];
const widths = [320,640,960,1440];
const manifest = {};
await mkdir('public/images/optimized',{recursive:true});
for (const name of images) {
  const src = `/images/${name}.webp`;
  const meta = await sharp(`public${src}`).metadata();
  const key = name.replaceAll('/','-');
  for (const width of widths) {
    for (const format of ['webp','avif']) {
      await sharp(`public${src}`).resize({width}).toFormat(format,{quality:format==='avif'?48:76}).toFile(`public/images/optimized/${key}-${width}.${format}`);
    }
  }
  manifest[src] = { width: meta.width, height: meta.height, key };
}
await writeFile('src/data/imageManifest.json',JSON.stringify(manifest,null,2)+'\n');
await sharp('public/images/paris-eiffel.webp').resize(1200,630,{fit:'cover'}).jpeg({quality:85}).toFile('public/images/og-althea.jpg');
console.log(`Optimized ${images.length} photographs in four sizes and two formats.`);
