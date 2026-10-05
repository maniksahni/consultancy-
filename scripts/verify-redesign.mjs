import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import ts from 'typescript';
const checkpoint = '3f0972d';
const before = file => execFileSync('git', ['show', `${checkpoint}:${file}`], { encoding: 'utf8' });
const after = file => fs.readFileSync(file, 'utf8');
const ast = (file, text) => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function collect(file, text, predicate) {
  const root = ast(file, text), found = [];
  function visit(node) { if (predicate(node)) found.push(node.getText(root)); ts.forEachChild(node, visit); }
  visit(root); return found;
}
for (const file of ['firestore.rules', 'src/lib/firebase.ts', 'src/lib/utm.ts', 'src/components/common/StatCounter.tsx', 'src/components/home/TrustLedger.tsx']) {
  assert.equal(after(file), before(file), `${file} changed`);
}
const files = ['HeroExperience','DestinationGallery','DifferenceGrid','ScrollJourney','MentorSpotlight','AnimatedFAQ','OutcomeCases','FinalCTA'].map(name=>`src/components/home/${name}.tsx`).concat('src/components/layout/Footer.tsx');
for (const file of files) {
  const old = before(file), current = after(file);
  const copy = text => collect(file, text, ts.isJsxText).map(s=>s.replace(/\s+/g,' ').trim()).filter(Boolean).sort();
  assert.deepEqual(copy(current), copy(old), `JSX copy changed in ${file}`);
  const data = text => collect(file, text, n=>ts.isVariableDeclaration(n) && ['scenes','DESTINATIONS','PANELS','SLIDES','chapters','principles','FAQ_ITEMS','CASES','DESTINATION_IMAGES'].includes(n.name.getText()));
  assert.deepEqual(data(current), data(old), `Data changed in ${file}`);
  const handlers = text => collect(file, text, n=>ts.isJsxAttribute(n) && /^(onClick|onChange|onSubmit|onKeyDown|onTouchStart|onTouchEnd|onTouchCancel)$/.test(n.name.getText()));
  assert.deepEqual(handlers(current), handlers(old), `Interaction handlers changed in ${file}`);
  const numbers = text => [...text.matchAll(/(?:33755749029|\+33 7 55 74 90 29)/g)].map(m=>m[0]);
  assert.deepEqual(numbers(current),numbers(old), `Contact values changed in ${file}`);
}
for (const name of ['DifferenceGrid','OutcomeCases']) {
  const file=`src/components/home/${name}.tsx`;
  const logic = text => text.slice(text.indexOf('  const [emblaRef'),text.indexOf(';',text.indexOf('  const activeDot'))+1);
  assert.equal(logic(after(file)),logic(before(file)),`${name} carousel logic changed`);
  const geometry = text => collect(file,text,n=>ts.isJsxAttribute(n)&&n.name.getText()==='className').filter(t=>t.includes('flex-[0_0_') || t.includes('flex -ml-4'));
  assert.deepEqual(geometry(after(file)),geometry(before(file)),`${name} carousel geometry changed`);
}
const booking='src/components/home/FinalCTA.tsx';
const submit = text => collect(booking,text,n=>ts.isVariableDeclaration(n)&&n.name.getText()==='handleSubmit');
assert.deepEqual(submit(after(booking)),submit(before(booking)),'Booking submission or validation changed');
const validation = text=>collect(booking,text,n=>ts.isJsxAttribute(n)&&['required','type','value','disabled'].includes(n.name.getText()));
assert.deepEqual(validation(after(booking)),validation(before(booking)),'Booking field behavior changed');
const footer='src/components/layout/Footer.tsx';
const socials = text=>collect(footer,text,n=>ts.isJsxElement(n)&&n.openingElement.tagName.getText()==='a'&&/https:\/\/www\.(linkedin|instagram)\.com/.test(n.getText()));
assert.deepEqual(socials(after(footer)),socials(before(footer)),'Footer social links changed');
console.log('Protected logic, carousel geometry, contact values, social links, data and copy match checkpoint 3f0972d.');
