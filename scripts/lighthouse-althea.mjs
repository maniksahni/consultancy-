import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const base=process.argv[2] || 'http://127.0.0.1:3016';
const label=process.argv[3] || 'after';
const routes=['/','/destinations','/study-in-france','/book-consultation'];
await mkdir('audit/lighthouse',{recursive:true});
const summaries=[];
for(const route of routes){
 const slug=route==='/'?'home':route.slice(1);
 const file=`audit/lighthouse/${label}-${slug}.json`;
 await new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,['node_modules/lighthouse/cli/index.js',base+route,'--chrome-path=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','--chrome-flags=--headless','--only-categories=performance,accessibility,best-practices,seo','--output=json',`--output-path=${file}`,'--quiet'],{stdio:'inherit'});
  child.on('exit',code=>code===0?resolve():reject(Error(`Lighthouse failed ${route}`)));
 });
 const report=JSON.parse(await readFile(file,'utf8'));
 const scores=Object.fromEntries(Object.entries(report.categories).map(([k,v])=>[k,Math.round(v.score*100)]));
 const item={route,base,fetchTime:report.fetchTime,scores,lcp:report.audits['largest-contentful-paint'].numericValue,cls:report.audits['cumulative-layout-shift'].numericValue,tbt:report.audits['total-blocking-time'].numericValue};
 summaries.push(item);console.log(JSON.stringify(item));
}
await writeFile(`audit/lighthouse/${label}-summary.json`,JSON.stringify(summaries,null,2)+'\n');
