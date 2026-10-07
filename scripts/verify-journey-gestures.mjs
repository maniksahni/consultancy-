import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
for(const [component,dataName,count] of [['DestinationGallery','DESTINATIONS',6],['ScrollJourney','chapters',4]]) {
 const file=`src/components/home/${component}.tsx`,source=fs.readFileSync(file,'utf8');
 const root=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const declarations=[];
 function visit(n){if(ts.isVariableDeclaration(n)&&[dataName,'handleTouchStart','handleTouchEnd'].includes(n.name.getText(root)))declarations.push(`const ${n.getText(root)};`);ts.forEachChild(n,visit);}
 visit(root);const js=ts.transpileModule(declarations.join('\n'),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;
 for(const [dx,dy,expected] of [[-80,0,1],[80,0,count-1],[-30,0,0],[-60,100,0]]) {
  let index=0;const setIndex=fn=>index=fn(index);
  const context=vm.createContext({touchStart:{current:null},setSelected:setIndex,setActive:setIndex});vm.runInContext(js,context);
  vm.runInContext('handleTouchStart',context)({touches:[{clientX:200,clientY:200}]});
  vm.runInContext('handleTouchEnd',context)({changedTouches:[{clientX:200+dx,clientY:200+dy}]});
  assert.equal(index,expected,`${component}: dx=${dx}, dy=${dy}`);
  assert.equal(context.touchStart.current,null);
 }
}
console.log('Destination and journey finger-swipe direction, loop wrapping, minimum distance and vertical-scroll rejection pass.');
