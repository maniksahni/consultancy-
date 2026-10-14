import {mkdir,writeFile,readFile} from 'node:fs/promises';
const dataset='fr-esr-principaux-etablissements-enseignement-superieur';
const base=`https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/${dataset}`;
const source=`https://data.enseignementsup-recherche.gouv.fr/explore/dataset/${dataset}/`;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url){
 for(let attempt=0;attempt<3;attempt++){
  try{const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'AltheaEditorial/1.0'}});if(!response.ok)throw Error(`Official API returned ${response.status}`);return await response.json();}
  catch(error){if(attempt===2)throw error;await pause(1000*2**attempt);}
 }
}
if(process.argv.includes('--publish')) {
 const reviewer=process.argv[process.argv.indexOf('--reviewer')+1];
 if(!process.argv.includes('--reviewer')||!reviewer)throw Error('A named review is required. Never auto-publish imports.');
 const snapshot=JSON.parse(await readFile('data/staging/institutions.json','utf8'));
 if(!snapshot.records.length||snapshot.records.some(r=>!r.id||!r.name||r.source!==source))throw Error('Invalid staged snapshot');
 snapshot.review={reviewer,reviewedAt:new Date().toISOString(),scope:'Official institution registry fields only; no programme/admissions verification'};
 await mkdir('public/data',{recursive:true});
 await writeFile('public/data/institutions.json',JSON.stringify(snapshot)+'\n');
 console.log(`Published reviewed registry snapshot: ${snapshot.records.length} institutions.`);
} else {
 const metadata=await get(base);const license=metadata.metas?.default?.license;const licenseUrl=metadata.metas?.default?.license_url;
 if(!license?.includes('Licence Ouverte')||!licenseUrl)throw Error('Open licence metadata missing; stop for editorial review.');
 const obtainedAt=new Date().toISOString();let raw=[];let total=0;
 for(let offset=0;offset<1200;offset+=100){
  const page=await get(`${base}/records?limit=100&offset=${offset}`);
  if(!Array.isArray(page.results)||!Number.isInteger(page.total_count))throw Error('Invalid registry response');
  total=page.total_count;raw.push(...page.results);if(raw.length>=total)break;await pause(600);
 }
 if(raw.length<total)throw Error('Dataset exceeds bounded import capacity; do not publish an incomplete snapshot.');
 const text=v=>typeof v==='string'?v.trim():Array.isArray(v)?v.join(', '):'';
 const url=v=>{try{const u=new URL(text(v));return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
 const records=Array.from(new Map(raw.map(v=>{
  const id=text(v.etablissement_id_paysage)||text(v.uo_lib);
  const record={id,name:text(v.uo_lib),city:text(v.com_nom),region:text(v.reg_nom),type:text(v.type_d_etablissement),sector:text(v.secteur_d_etablissement),website:url(v.url),provider:'French higher-education ministry',institutionId:id,programmeId:null,programmeName:null,level:null,subject:null,language:null,fees:null,eligibility:null,duration:null,dates:null,source,obtainedAt,lastVerifiedAt:obtainedAt,copyrightLicence:license,qualityStatus:'official-registry-fields-only'};
  return [id,record];
 })).values()).filter(r=>r.id&&r.name);
 const snapshot={provider:'French higher-education ministry',source,license,licenseUrl,obtainedAt,total,records,missingValueLabel:'Not yet verified',review:null};
 await mkdir('data/staging',{recursive:true});await writeFile('data/staging/institutions.json',JSON.stringify(snapshot,null,2)+'\n');
 console.log(`Staged ${records.length} deduplicated institutions. No publication performed.`);
}
