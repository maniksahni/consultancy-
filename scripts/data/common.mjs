import {createHash} from 'node:crypto';
export const hash=r=>createHash('sha256').update(JSON.stringify({...r,review:undefined})).digest('hex');
export function validate(records){
 const seen=new Set();
 for(const r of records){
  if(!r.id||!r.name||seen.has(r.id))throw Error('Missing or duplicate record ID'); seen.add(r.id);
  if(!['programme','university'].includes(r.kind))throw Error('Invalid kind');
  for(const f of ['institution','city','level','subject','language','intake','cost','currency','officialUrl','programmeUrl','applicationUrl','lastVerified'])if(!(f in r))throw Error(`Missing field ${f}`);
  for(const f of ['sourceUrl','officialUrl','programmeUrl','applicationUrl'])if(r[f]&&!['https:','http:'].includes(new URL(r[f]).protocol))throw Error('Unsafe URL');
  if(!r.sourceUrl||!r.provenance?.source||!r.provenance?.retrievedAt)throw Error('Missing provenance');
  if(r.cost!==null&&(typeof r.cost!=='number'||r.cost<0||r.currency!=='EUR'))throw Error('Invalid EUR cost');
  if(r.lastVerified!==null&&!/^\d{4}-\d{2}-\d{2}$/.test(r.lastVerified))throw Error('Invalid verification date');
 }
 return records;
}
