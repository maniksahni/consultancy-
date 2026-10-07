// Execute the unchanged handler with isolated mocks; no booking or message is sent.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const file='src/components/home/FinalCTA.tsx';
const source=fs.readFileSync(file,'utf8');
const root=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
let handler;
function visit(n) { if(ts.isVariableDeclaration(n)&&n.name.getText(root)==='handleSubmit') handler=n.initializer.getText(root); ts.forEachChild(n,visit); }
visit(root);
const js=ts.transpileModule(`const run = ${handler};`,{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;
async function scenario(overrides={}) {
 const result={saved:[],opened:[],errors:[],submitted:false,submitting:false,prevented:false};
 const formData={fullName:'Local Verification',whatsapp:'0000000000',targetCountry:'Germany',targetIntake:'Spring 2027',qualification:'Undergraduate / Working Professional',...overrides.formData};
 const location={}; Object.defineProperty(location,'href',{set(url){if(overrides.locationThrows)throw Error('Unavailable deep link');result.opened.push(url);}});
 const context=vm.createContext({formData,setError:v=>result.errors.push(v),setSubmitting:v=>result.submitting=v,setSubmitted:v=>result.submitted=v,getStoredUTMParams:()=>({source:'isolated-test'}),saveMentorshipBooking:payload=>{result.saved.push(payload);if(overrides.saveRejects)return Promise.reject(Error('Mock unavailable'));if(overrides.savePending)return new Promise(()=>{});return Promise.resolve();},window:{location,open:url=>result.opened.push(url)},encodeURIComponent,Promise,setTimeout:(fn,delay)=>{assert.equal(delay,2500);return setTimeout(fn,1);},console:{error:()=>{}}});
 vm.runInContext(js,context); await vm.runInContext('run',context)({preventDefault:()=>result.prevented=true}); return result;
}
for(const invalid of [{fullName:' '},{whatsapp:'123'}]) { const r=await scenario({formData:invalid});assert.equal(r.saved.length,0);assert.equal(r.opened.length,0);assert.match(r.errors[0],/full name and valid 10-digit/); }
for(const options of [{},{saveRejects:true},{savePending:true},{locationThrows:true}]) {
 const r=await scenario(options);assert.equal(r.prevented,true);assert.equal(r.saved.length,1);assert.equal(r.submitted,true);assert.equal(r.submitting,false);assert.equal(r.opened.length,1);assert.match(r.opened[0],/^https:\/\/wa.me\/33755749029\?text=/);assert.match(decodeURIComponent(r.opened[0]),/Germany \(Spring 2027\).*Local Verification/);assert.equal(r.saved[0].qualification,'Undergraduate / Working Professional');assert.equal(r.saved[0].helpNeeded,'Direct 1-on-1 Strategy Session');assert.equal(r.saved[0].utm.source,'isolated-test');
}
console.log('Booking guards, payload, success, save-error/timeout paths, WhatsApp auto-open and window.open fallback pass with isolated mocks.');
