"use client";
import { brand } from "@/config/brand";
import {useState} from 'react';
import Link from 'next/link';
import {destinations} from '@/data/destinations';
import {studyKnowledge,knowledgeReviewedAt,planningChecklist} from '@/data/studyKnowledge';
export default function KnowledgeHub({country,compact=false}:{country?:string;compact?:boolean}) {
 const [selected,setSelected]=useState(country||'france');const [topic,setTopic]=useState('all');const [query,setQuery]=useState('');
 const topics=Array.from(new Set(studyKnowledge.filter(e=>selected==='all'||e.country===selected).map(e=>e.topic)));
 const results=studyKnowledge.filter(e=>(selected==='all'||e.country===selected)&&(topic==='all'||e.topic===topic)&&(e.title+' '+e.summary+' '+e.publisher).toLowerCase().includes(query.toLowerCase()));
 function download(){const name=destinations.find(d=>d.slug===selected)?.name||'Global';const text=`{brand.shortName} · ${name} study planning\nSource review: ${knowledgeReviewedAt}\nGeneral guidance; recheck the official source before applying.\n\n`+results.map(e=>`${e.topic} · ${e.title}\n${e.summary}\n${e.effective?'Applies: '+e.effective+'\n':''}Source: ${e.source}\nEvidence: ${e.basis}\n`).join('\n')+'\nPreparation checklist\n'+planningChecklist.map(g=>g.title+'\n'+g.items.map(x=>'[ ] '+x).join('\n')).join('\n\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`althea-${selected}-study-plan-2026-10-14.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <section className="knowledge-hub" id="country-knowledge">
  <div className="knowledge-review"><span className="review-dot"/>SOURCE REVIEW · {knowledgeReviewedAt}<span>Manual review · Recheck before applying</span></div>
  {!compact&&<details className="knowledge-scope"><summary>How this source review works</summary><p>These country summaries draw on official pages and clearly labelled search listings. The programme research desk provides published tuition and dates. Individual admission decisions, fee exceptions and visa eligibility depend on the applicable requirements. This is a dated editorial review, not a live sync of every university catalogue.</p><Link href="/knowledge#coverage">See coverage and review limits ↗</Link></details>}
  <div className="knowledge-controls">{!country&&<label><span>Destination</span><select aria-label="Destination" value={selected} onChange={e=>{setSelected(e.target.value);setTopic('all');}}><option value="all">All countries</option>{destinations.map(d=><option value={d.slug} key={d.slug}>{d.name}</option>)}</select></label>}<label><span>Topic</span><select aria-label="Topic" value={topic} onChange={e=>setTopic(e.target.value)}><option value="all">Every chapter</option>{topics.map(t=><option key={t}>{t}</option>)}</select></label><label className="knowledge-search">Search guidance<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Scholarships, funds, APS, visa…"/></label><button className="button" onClick={download}>Download your guide ↓</button></div>
  <p role="status" className="knowledge-count">{results.length} {results.length===1?'guide':'guides'} · sources reviewed {knowledgeReviewedAt}</p>
  <div className="knowledge-grid study-guide-rail">{results.map(e=><article id={e.id} key={e.id}><p className="eyebrow">{destinations.find(d=>d.slug===e.country)?.name} / {e.topic}</p><h3>{e.title}</h3>{e.effective&&<p className="effective-date">APPLIES · {e.effective}</p>}<p>{e.summary}</p><div className="knowledge-source"><span>{e.publisher} · source reference</span><span>{e.basis} · Reviewed {knowledgeReviewedAt}</span></div></article>)}</div>
  {!results.length&&<div className="empty-state"><h3>No matching guidance.</h3><p>Try another subject or a broader keyword.</p><button className="text-button" onClick={()=>{setQuery('');setTopic('all');}}>Reset search ↺</button></div>}
 </section>
}
