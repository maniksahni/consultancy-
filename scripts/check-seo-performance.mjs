import {readFile} from "node:fs/promises";
import {join,resolve} from "node:path";
import {gzipSync} from "node:zlib";
const root=resolve("out");
const origin=(process.env.NEXT_PUBLIC_SITE_URL||"https://consultancyworld2.web.app").replace(/\/$/,"");
const routes=["/","/france","/france/universities","/france/programmes","/france/institutions","/france/campus-france","/france/resources","/france/scholarships","/france/visas","/france/living","/france/costs","/france/faq","/admissions-process","/mentorship-model"];
const failures=[];const summary=[];
async function getExport(path){
 const base=path==="/"?"/index":path;
 for(const pathName of [base+".html",base+"/index.html"]){
  try{return await readFile(join(root,pathName),"utf8");}catch{}
 }
 failures.push(path+": missing exported static HTML");return "";
}
function tagAttr(tag,name){return (tag.match(new RegExp(name+'="([^"]*)"',"i"))||[])[1]||"";}
for(const path of routes){
 const html=await getExport(path);if(!html)continue;
 const title=(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||"";
 const descriptionTag=(html.match(/<meta\s+name="description"[^>]*>/i)||[])[0]||"";
 const canonTags=[...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map(x=>x[0]);
 const canon=tagAttr(canonTags[0]||"","href");
 const expected=origin+path;
 const h1=(html.match(/<h1\b/gi)||[]).length;
 if(!title||title.length<12||title.length>110)failures.push(path+": missing/poor length title");
 if((title.match(/Althéa Consulting/g)||[]).length>1)failures.push(path+": repeated organisation title");
 if(!descriptionTag||tagAttr(descriptionTag,"content").length<60)failures.push(path+": missing or very short description");
 if(canonTags.length!==1||!canon||new URL(canon).href!==new URL(expected).href)failures.push(path+": expected exactly one self-canonical "+expected+"; got "+canon);
 if(h1!==1)failures.push(path+": expected one H1; got "+h1);
 const schemaBlocks=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
 if(!schemaBlocks.length)failures.push(path+": missing schema");
 for(const [,json] of schemaBlocks){try{JSON.parse(json)}catch(e){failures.push(path+": malformed JSON-LD: "+e.message);}}
 if(path!=="/"&&path.startsWith("/france/")&&!html.includes("BreadcrumbList"))failures.push(path+": missing breadcrumb schema");
 if(Buffer.byteLength(html)>450000)failures.push(path+": oversized HTML");
 const scripts=[...new Set([...html.matchAll(/<script\b[^>]*\bsrc="(\/_next\/static\/[^"]+\.js)"[^>]*>/g)].map(x=>x[1]))];
 let compressed=0;
 for(const src of scripts){try{compressed+=gzipSync(await readFile(join(root,src))).length}catch{}}
 if(compressed>600000)failures.push(path+": route boot JS exceeds 600KB gzip ("+compressed+")");
 summary.push({path,title,htmlKB:Math.round(Buffer.byteLength(html)/1024),jsGzipKB:Math.round(compressed/1024),schema:schemaBlocks.length});
}
const sitemap=await readFile(join(root,"sitemap.xml"),"utf8").catch(()=>null);
const robots=await readFile(join(root,"robots.txt"),"utf8").catch(()=>null);
if(!sitemap)failures.push("missing sitemap.xml");else for(const path of routes){if(!sitemap.includes(origin+path+"</loc>"))failures.push("missing sitemap route "+path);}
if(!robots||!robots.includes("sitemap.xml"))failures.push("missing robots.txt or sitemap reference");
if(sitemap&&(/<loc>[^<]*(?:\/outcomes|\/destinations\/)/.test(sitemap)))failures.push("legacy unsupported success/destination content in sitemap");
const homepage=await getExport("/");
if(homepage&&!homepage.includes("srcSet")&&!homepage.includes("srcset"))failures.push("homepage missing responsive hero srcset");
console.log("SEO and static-performance report:\n"+JSON.stringify(summary,null,2));
if(failures.length){console.error("SEO/PERF QUALITY FAILURES:\n"+failures.join("\n"));process.exitCode=1;}
else console.log("PASS: "+summary.length+" canonical, titled, source-indexable static routes; valid JSON-LD, sitemap, responsive image, JS and HTML budgets.");
