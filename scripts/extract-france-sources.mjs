/**
 * Controlled research extraction for Althéa's France directory.
 * NOT a Campus France API and NOT a complete course catalogue.
 * Fetches a small allowlist of public official pages, checks basic robots rules,
 * and exports source metadata plus candidate schema.org Course objects for human review.
 * No student data, logins, bulk crawling, or publishing automatically.
 *
 * Run: node scripts/extract-france-sources.mjs
 */
import {mkdir,writeFile} from "node:fs/promises";
import {URL} from "node:url";
const entries = [
 {id:"campus-france-procedures",url:"https://www.campusfrance.org/en/application-etudes-en-france-procedure?lang=en"},
 {id:"campus-france-programmes",url:"https://www.campusfrance.org/en/finding-a-university-programme-France"},
 {id:"campus-france-india",url:"https://www.inde.campusfrance.org/application-and-admission-procedure"},
 {id:"paris-saclay",url:"https://www.universite-paris-saclay.fr/en/education/masters-programmes-taught-english"},
 {id:"psl",url:"https://psl.eu/en/programs-and-tracks-taught-english"},
 {id:"sorbonne",url:"https://www.sorbonne-universite.fr/en/programs-english"},
 {id:"bordeaux",url:"https://www.u-bordeaux.fr/en/international/come-to-bordeaux/international-students/international-study-programmes"},
 {id:"grenoble",url:"https://formations.univ-grenoble-alpes.fr/en/catalog.html"}
];
const agent="AltheaSourceResearch/0.1 (editorial verification; low-volume)";
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const strip=s=>(s||"").replace(/<[^>]*>/g," ").replace(/&amp;/g,"&").replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g," ").trim().slice(0,800);
function meta(html,key){
 const tags=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]);
 const tag=tags.find(t=>new RegExp('(?:name|property)\\s*=\\s*["\\\']'+key+'["\\\']',"i").test(t));
 return tag?strip((tag.match(/content\s*=\s*["']([^"']*)["']/i)||[])[1]):"";
}
function candidateCourses(html){
 const out=[];
 for(const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
  try{
   const data=JSON.parse(match[1].trim());
   const traverse=(obj)=>{
    if(!obj||typeof obj!=="object")return;
    if(Array.isArray(obj)){obj.forEach(traverse);return;}
    const typ=obj["@type"]; const types=Array.isArray(typ)?typ:[typ];
    if(types.includes("Course")||types.includes("EducationalOccupationalProgram")){
     out.push({name:String(obj.name||"").slice(0,200),url:String(obj.url||"").slice(0,500),type:types[0]});
    }
    if(obj["@graph"])traverse(obj["@graph"]);
   };
   traverse(data);
  }catch{}
 }
 return out.slice(0,100);
}
async function robotsAllows(url){
 const target=new URL(url);
 try{
  const response=await fetch(target.origin+"/robots.txt",{headers:{"User-Agent":agent},signal:AbortSignal.timeout(12000)});
  if(!response.ok)return {allowed:true,note:"robots.txt unavailable; check site terms"};
  const txt=await response.text();
  let applies=false;
  for(const raw of txt.split(/\r?\n/)){
   const line=raw.split("#")[0].trim();if(!line)continue;
   const [key,...parts]=line.split(":");const value=parts.join(":").trim();
   if(key.toLowerCase()==="user-agent")applies=value==="*";
   if(applies&&key.toLowerCase()==="disallow"&&value&&target.pathname.startsWith(value))
    return {allowed:false,note:"Disallowed by generic robots.txt"};
  }
  return {allowed:true,note:"Basic generic robots.txt check passed; respect individual site terms"};
 }catch{return {allowed:true,note:"robots check unavailable; editorial review required"};}
}
const rows=[];
for(const entry of entries){
 const checkedAt=new Date().toISOString();
 const result={id:entry.id,sourceUrl:entry.url,checkedAt,manualReviewRequired:true};
 try{
  const robots=await robotsAllows(entry.url);
  if(!robots.allowed){rows.push({...result,status:"skipped",note:robots.note});continue;}
  const response=await fetch(entry.url,{headers:{"User-Agent":agent,Accept:"text/html"},signal:AbortSignal.timeout(20000),redirect:"follow"});
  if(!response.ok){rows.push({...result,status:"http-error",httpStatus:response.status,note:"No data reused"});continue;}
  const html=(await response.text()).slice(0,1500000);
  const title=strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]);
  const h1=strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]);
  rows.push({...result,status:"review-ready",httpStatus:response.status,resolvedUrl:response.url,lastModified:response.headers.get("last-modified"),title,h1,summary:meta(html,"description"),courseCandidates:candidateCourses(html),note:"Source metadata/candidate schemas only; no verified admission claims extracted."});
 }catch(error){rows.push({...result,status:"fetch-error",note:String(error.message||error).slice(0,220)});}
 await sleep(1100);
}
await mkdir("reports",{recursive:true});
await writeFile("reports/france-source-research.json",JSON.stringify({generatedAt:new Date().toISOString(),type:"editorial-research-not-live-feed",sources:rows},null,2)+"\n");
console.log(rows.map(r=>`${r.id}: ${r.status}`).join("\n"));
console.log("Wrote reports/france-source-research.json (manual review required).");
