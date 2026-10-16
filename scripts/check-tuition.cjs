const fs=require('fs'),ts=require('typescript'),vm=require('vm'),assert=require('node:assert/strict');
const code=ts.transpileModule(fs.readFileSync('src/lib/courseTuition.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const moduleExports={};vm.runInNewContext(code,{exports:moduleExports,Intl,Map,Number,Error});
const {createTuitionResolver}=moduleExports;let total=0,estimated=0,published=0;const report={};
for(const country of ['france','uk','usa','australia','canada','germany','ireland']){
 const data=JSON.parse(fs.readFileSync(`public/data/universities/${country}-courses.json`));
 const path=`public/data/universities/${country}-fee-context.json`;const ctx=fs.existsSync(path)?JSON.parse(fs.readFileSync(path)):{};
 const resolve=createTuitionResolver(country,data.courses,ctx);let est=0;const sources={};
 for(const c of data.courses){const f=resolve(c);assert(Number.isFinite(f.low)&&Number.isFinite(f.high)&&f.low>=0&&f.high>=f.low,c.id);assert(f.headline&&f.period&&f.detail&&f.source&&/^https:\/\//.test(f.sourceUrl),`${c.id}: missing fee evidence`);assert(!/not published|not captured|unavailable/i.test(f.headline),c.id);if(c.tuition!==null){assert.equal(f.estimated,false);assert.equal(f.low,c.tuition);published++;}else{assert(f.estimated);estimated++;est++;}sources[f.source]=(sources[f.source]||0)+1;total++;}
 report[country]={courses:data.courses.length,estimates:est,published:data.courses.length-est,sources};
 if(country==='france') {const apprentice=data.courses.find(c=>ctx.courses[c.id]?.apprenticeship&&c.tuition===null);assert.equal(resolve(apprentice).high,0);const bts=data.courses.find(c=>ctx.courses[c.id]?.sector==='Publics'&&!ctx.courses[c.id]?.apprenticeship&&/BTS/.test(c.level));assert.equal(resolve(bts).high,0);}
}
report.total={courses:total,estimated,published,blankFees:0};fs.mkdirSync('audit/tuition',{recursive:true});fs.writeFileSync('audit/tuition/coverage.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
