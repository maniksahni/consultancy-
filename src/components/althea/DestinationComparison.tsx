'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { destinations, destinationHref } from '@/data/destinations';
import { compareFacts, type CompareFacts } from '@/data/compare';

type Destination = (typeof destinations)[number];
type Row = { label: string; value: (d: Destination) => string; best?: { pick: (f: CompareFacts) => number; low?: boolean; badge: string } };
const facts = (d: Destination) => compareFacts[d.slug];
const rows: Row[] = [
  { label: 'Tuition a year', value: d => facts(d).tuition, best: { pick: f => f.costLevel, low: true, badge: 'Most affordable' } },
  { label: 'Living costs', value: d => facts(d).living },
  { label: 'Money to show for the visa', value: d => facts(d).funds },
  { label: 'Visa fees', value: d => facts(d).visaFee },
  { label: "Master's length", value: d => facts(d).mastersLength, best: { pick: f => f.mastersYears, low: true, badge: 'Fastest' } },
  { label: 'Intakes', value: d => facts(d).intakes },
  { label: 'Work while studying', value: d => facts(d).work, best: { pick: f => f.workHours, badge: 'Most hours' } },
  { label: 'Stay and work after graduating', value: d => facts(d).postStudy, best: { pick: f => f.postStudyMonths, badge: 'Longest stay' } },
  { label: 'Route to permanent residence', value: d => facts(d).prRoute },
  { label: 'Language', value: d => facts(d).language },
  { label: 'Cities to explore', value: d => d.city },
  { label: 'How to apply', value: d => d.application },
];
/** The destinations that win a row (ties share the badge); none when every choice is equal. */
const winners = (row: Row, choices: Destination[]) => {
  if (!row.best) return new Set<string>();
  const scores = choices.map(d => row.best!.pick(facts(d)));
  const top = row.best.low ? Math.min(...scores) : Math.max(...scores);
  if (scores.every(v => v === top)) return new Set<string>();
  return new Set(choices.filter((_, i) => scores[i] === top).map(d => d.slug));
};
const validSlugs = (values: unknown): string[] => Array.isArray(values) ? [...new Set(values.filter((s): s is string => typeof s === 'string' && destinations.some(d=>d.slug===s)))].slice(0,3) : [];

export default function DestinationComparison() {
  const [selected,setSelected]=useState<string[]>([]);
  const [ready,setReady]=useState(false);
  const [differencesOnly,setDifferencesOnly]=useState(false);
  const [copied,setCopied]=useState(false);
  useEffect(()=>{
    const params=new URLSearchParams(location.search);
    let values:string[]=[];
    if(params.has('destinations')) values=validSlugs(params.get('destinations')!.split(','));
    else {try{values=validSlugs(JSON.parse(localStorage.getItem('althea-destinations')||'[]'));}catch{}}
    setSelected(values);setReady(true);
  },[]);
  function update(next:string[]) {
    setSelected(next);setCopied(false);
    const url=new URL(location.href);url.searchParams.set('destinations',next.join(','));history.replaceState(null,'',url);
    try{localStorage.setItem('althea-destinations',JSON.stringify(next));}catch{}
  }
  const choices=selected.map(slug=>destinations.find(d=>d.slug===slug)!);
  async function copyLink(){try{const url=new URL(location.href);url.searchParams.set('destinations',selected.join(','));await navigator.clipboard.writeText(url.href);setCopied(true);}catch{setCopied(false);}}
  return <div className="destination-comparison">
    <div className="comparison-toolbar"><div><p className="ms-kicker">BUILD YOUR COMPARISON</p><h2 className="ms-sub">Your destinations, <em>in perspective.</em></h2><p className="ms-muted">Choose two or three destinations. Each one gets a clear verdict, and the table marks who wins on cost, speed, work hours and post-study stay.</p></div><Link className="ms-btn ms-btn-ghost" href="/destinations">Back to the atlas ↗</Link></div>
    <fieldset className="comparison-picker"><legend>Destinations to compare</legend>{destinations.map(d=><label key={d.slug} className={selected.includes(d.slug)?'is-selected':''}><input type="checkbox" checked={selected.includes(d.slug)} disabled={!ready || selected.length===3&&!selected.includes(d.slug)} onChange={()=>update(selected.includes(d.slug)?selected.filter(s=>s!==d.slug):[...selected,d.slug])}/>{d.name}</label>)}</fieldset>
    {!ready ? <p role="status">Loading your shortlist…</p> : choices.length<2 ? <div className="comparison-empty" role="status"><h3>Choose another destination to compare.</h3><p>Select at least two countries above to see their differences side by side.</p></div> : <>
      <div className="comparison-verdicts">{choices.map(d => { const f = facts(d); return <article key={d.slug} className="comparison-verdict">
        <p className="ms-kicker">{d.region} · {d.city}</p>
        <h3>{d.name}</h3>
        <p className="comparison-bestfor"><strong>Best for:</strong> {f.bestFor}</p>
        <ul className="comparison-pros">{f.strengths.map(x => <li key={x}>{x}</li>)}</ul>
        <ul className="comparison-cons">{f.watchOuts.map(x => <li key={x}>{x}</li>)}</ul>
        <Link className="ms-link" href={destinationHref(d.slug)}>Read the full {d.name} guide ↗</Link>
      </article>; })}</div>
      <div className="comparison-wins" aria-label="Who wins where">{rows.filter(r => r.best).map(r => { const w = winners(r, choices); if (!w.size) return null; return <div key={r.label}><span>{r.best!.badge}</span><strong>{choices.filter(d => w.has(d.slug)).map(d => d.name).join(' & ')}</strong><small>{r.label}</small></div>; })}</div>
      <div className="comparison-options"><label><input type="checkbox" checked={differencesOnly} onChange={e=>setDifferencesOnly(e.target.checked)}/> Show differences only</label><button type="button" className="ms-btn ms-btn-ghost" onClick={copyLink}>{copied?'Link copied':'Copy comparison link'}</button></div>
      <div className="comparison-table-wrap" role="region" aria-label="Scrollable destination comparison" tabIndex={0}><table className="comparison-table"><caption>Study destination differences</caption><thead><tr><th scope="col">Your decision</th>{choices.map(d=><th scope="col" key={d.slug}><span>{d.region}</span><strong>{d.name}</strong><button type="button" aria-label={`Remove ${d.name} from comparison`} onClick={()=>update(selected.filter(s=>s!==d.slug))}>Remove ×</button></th>)}</tr></thead><tbody>{rows.map(row=>{
        const different=new Set(choices.map(row.value)).size>1;
        if(differencesOnly&&!different)return null;
        return <tr key={row.label} className={different?'is-different':''}><th scope="row">{row.label}<small>{different?'Differs by destination':'Shared'}</small></th>{choices.map(d=>{ const win=winners(row,choices).has(d.slug); return <td key={d.slug} className={win?'is-best':undefined}>{win&&<span className="comparison-badge">{row.best!.badge}</span>}{row.value(d)}</td>; })}</tr>;
      })}<tr><th scope="row">Go deeper</th>{choices.map(d=><td key={d.slug}><Link className="ms-link" href={destinationHref(d.slug)}>Explore {d.name} ↗</Link><a href={d.source} target="_blank" rel="noreferrer">{d.publisher} ↗</a></td>)}</tr></tbody></table></div>
      <p className="ms-muted comparison-note">This comparison summarises our destination guides. Course fees, entry requirements and visa conditions depend on your programme and circumstances; use the official sources linked above for current requirements. France is our specialist advisory focus.</p>
    </>}
  </div>;
}
