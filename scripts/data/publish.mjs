import {readFile,writeFile,rename} from 'node:fs/promises';
import {validate,hash} from './common.mjs';
const records=validate(JSON.parse(await readFile('data/review/candidates.json','utf8')));
if(!records.length)throw Error('Refusing empty release');
for(const r of records)if(r.review?.status!=='approved'||!r.review.reviewer?.trim()||!r.review.reviewedAt||!r.lastVerified||r.review.hash!==hash(r))throw Error(`Human approval missing or content changed: ${r.id}`);
const snapshot={schemaVersion:1,publishedAt:new Date().toISOString(),programmes:records.filter(r=>r.kind==='programme'),universities:records.filter(r=>r.kind==='university')};
const file='src/data/published-directory.json';await writeFile(file+'.tmp',JSON.stringify(snapshot,null,2)+'\n');await rename(file+'.tmp',file);console.log('Reviewed snapshot published locally. Commit through protected PR review.');
