import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import Critters from "critters";

const output=resolve("out");
// Preserve Next.js's native script scheduling and event wiring. Delaying its
// hydration scripts by two animation frames made forms and filters race user inputs.
const critters=new Critters({
 path:output,
 publicPath:"/",
 preload:"media",
 inlineFonts:false,
 preloadFonts:false,
 pruneSource:false,
 logLevel:"silent",
});
let count=0;
async function optimize(directory){
 for(const item of await readdir(directory,{withFileTypes:true})){
  const file=join(directory,item.name);
  if(item.isDirectory())await optimize(file);
  else if(item.name.endsWith(".html")){
   const html=await readFile(file,"utf8");
   const optimized=await critters.process(html);
   await writeFile(file,optimized);
   count++;
  }
 }
}
await optimize(output);
console.log("Critical CSS processed for "+count+" static HTML pages; native hydration order kept intact.");
