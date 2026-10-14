import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validate} from './common.mjs';
const config=JSON.parse(await readFile('scripts/data/sources.json','utf8'));
await mkdir('data/cache',{recursive:true}); await mkdir('data/staging',{recursive:true});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url){
 const key=createHash('sha256').update(url).digest('hex'); const file=`data/cache/${key}.json`;
 try{const c=JSON.parse(await readFile(file,'utf8'));if(Date.now()-c.at<86400000)return c.body;}catch{}
 for(let i=0;i<4;i++){await pause(1000*(i+1));try{const res=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'AltheaDirectoryImporter/1.0'}});if(!res.ok)throw Error(`HTTP ${res.status}`);const body=await res.text();await writeFile(file,JSON.stringify({at:Date.now(),body}));return body;}catch(e){if(i===3)throw e;}}
}
const source=`https://${config.openData.domain}/explore/dataset/${config.openData.dataset}/information/`;
const url=`https://${config.openData.domain}/api/explore/v2.1/catalog/datasets/${config.openData.dataset}/records?limit=${config.openData.limit}&order_by=annee%20DESC`;
const payload=JSON.parse(await get(url)); const now=new Date().toISOString(); const records=[];
for(const r of payload.results){records.push({id:`parcoursup-${r.annee}-${r.gta}`,kind:'programme',name:r.nm?.join(' / ')||r.fl?.join(' / ')||'Unnamed programme',institution:r.etab_nom||null,city:r.commune||null,level:null,subject:r.fl?.join(' / ')||null,language:null,intake:null,cost:null,currency:null,officialUrl:r.etab_url||null,programmeUrl:r.fiche||null,applicationUrl:null,sourceUrl:source,lastVerified:null,provenance:{source,license:config.openData.license,retrievedAt:now,sourceYear:r.annee,apiUrl:url},review:{status:'pending'}});}
// University fetching is disabled until an exact URL has documented permission.
for(const page of config.universityPages){if(!page.permissionUrl||!page.permissionReviewedAt||!page.robotsReviewedAt||page.allowed!==true)throw Error('University page lacks permission/robots review');const u=new URL(page.url);if(u.protocol!=='https:'||u.hostname!==page.domain||u.hostname.includes('campusfrance'))throw Error('Domain not allowlisted');await mkdir('data/staging/pages',{recursive:true});await writeFile(`data/staging/pages/${createHash('sha256').update(page.url).digest('hex')}.json`,JSON.stringify({url:page.url,retrievedAt:now,permission:page,html:await get(page.url)}));}
const institutionDataset='fr-esr-principaux-etablissements-enseignement-superieur';
const institutionSource=`https://${config.openData.domain}/explore/dataset/${institutionDataset}/`;
const registry=JSON.parse(await get(`https://${config.openData.domain}/api/explore/v2.1/catalog/datasets/${institutionDataset}/records?limit=100`));
for(const r of registry.results)records.push({id:`institution-${r.etablissement_id_paysage||r.uo_lib}`,kind:'university',name:r.uo_lib,institution:null,city:r.com_nom||null,level:null,subject:null,language:null,intake:null,cost:null,currency:null,officialUrl:r.url?.startsWith('http')?r.url:null,programmeUrl:null,applicationUrl:null,sourceUrl:institutionSource,lastVerified:null,provenance:{source:institutionSource,license:'Licence Ouverte v2.0',retrievedAt:now},review:{status:'pending'}});
const unique=[...new Map(records.map(r=>[r.id,r])).values()];validate(unique);
await writeFile('data/staging/candidates.json',JSON.stringify(unique,null,2)+'\n');
console.log(`${unique.length} candidates staged. Published snapshot untouched.`);
