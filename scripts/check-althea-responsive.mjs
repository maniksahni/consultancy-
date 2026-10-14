import {chromium} from '@playwright/test';
import {readdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
const widths=[320,360,375,390,430,768,1024,1280,1440,1920];
const routes=(await readdir('out',{recursive:true})).filter(f=>f.endsWith('.html')&&!f.includes('404')).map(f=>f==='index.html'?'/':'/'+f.replace(/\.html$/,''));
const server=spawn(process.execPath,['audit/serve.cjs'],{env:{...process.env,PORT:'3019'},stdio:'ignore'});
const browser=await chromium.launch();
const failures=[];let checks=0;
try {
 for(let attempt=0;attempt<40;attempt++){try{await fetch('http://127.0.0.1:3019');break;}catch{await new Promise(r=>setTimeout(r,100));}}
 const page=await browser.newPage({reducedMotion:'reduce'});
 for(const width of widths){
  await page.setViewportSize({width,height:900});
  for(const route of routes){
   const response=await page.goto('http://127.0.0.1:3019'+route);
   await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel=canonical]')?.href}));
   if(response.status()!==200||result.overflow||result.h1!==1||result.canonical!==`https://altheaconsulting.in${route}`)failures.push({route,width,status:response.status(),...result});
   checks++;
  }
  console.log(`${width}px: ${routes.length} routes checked`);
 }
 await writeFile('audit/responsive-results.json',JSON.stringify({widths,checks,failures},null,2));
 if(failures.length)throw new Error(JSON.stringify(failures,null,2));
 console.log(`${checks} route/viewport checks passed.`);
}finally{await browser.close();server.kill();}
