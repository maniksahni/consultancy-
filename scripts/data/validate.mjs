import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {validate,hash} from './common.mjs';
const records=validate(JSON.parse(await readFile('data/staging/candidates.json','utf8')));
await mkdir('data/review',{recursive:true});
await writeFile('data/review/candidates.json',JSON.stringify(records.map(r=>({...r,review:{status:'pending',hash:hash(r)}})),null,2)+'\n');
console.log('Validated candidates copied to review. Human approval required.');
