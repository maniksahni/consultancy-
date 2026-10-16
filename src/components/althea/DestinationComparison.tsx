'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { destinations, destinationHref } from '@/data/destinations';

type Destination = (typeof destinations)[number];
const rows: {label:string; value:(d:Destination)=>string}[] = [
  {label:'Region',value:d=>d.region},
  {label:'Cities to explore',value:d=>d.city},
  {label:'Academic focus',value:d=>d.focus},
  {label:'Application approach',value:d=>d.application},
  {label:'What to compare carefully',value:d=>d.planning},
];
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
    <div className="comparison-toolbar"><div><p className="ms-kicker">BUILD YOUR COMPARISON</p><h2 className="ms-sub">Your destinations, <em>in perspective.</em></h2><p className="ms-muted">Choose two or three destinations. Highlighted rows show different answers.</p></div><Link className="ms-btn ms-btn-ghost" href="/destinations">Back to the atlas ↗</Link></div>
    <fieldset className="comparison-picker"><legend>Destinations to compare</legend>{destinations.map(d=><label key={d.slug} className={selected.includes(d.slug)?'is-selected':''}><input type="checkbox" checked={selected.includes(d.slug)} disabled={!ready || selected.length===3&&!selected.includes(d.slug)} onChange={()=>update(selected.includes(d.slug)?selected.filter(s=>s!==d.slug):[...selected,d.slug])}/>{d.name}</label>)}</fieldset>
    {!ready ? <p role="status">Loading your shortlist…</p> : choices.length<2 ? <div className="comparison-empty" role="status"><h3>Choose another destination to compare.</h3><p>Select at least two countries above to see their differences side by side.</p></div> : <>
      <div className="comparison-options"><label><input type="checkbox" checked={differencesOnly} onChange={e=>setDifferencesOnly(e.target.checked)}/> Show differences only</label><button type="button" className="ms-btn ms-btn-ghost" onClick={copyLink}>{copied?'Link copied':'Copy comparison link'}</button></div>
      <div className="comparison-table-wrap" role="region" aria-label="Scrollable destination comparison" tabIndex={0}><table className="comparison-table"><caption>Study destination differences</caption><thead><tr><th scope="col">Your decision</th>{choices.map(d=><th scope="col" key={d.slug}><span>{d.region}</span><strong>{d.name}</strong><button type="button" aria-label={`Remove ${d.name} from comparison`} onClick={()=>update(selected.filter(s=>s!==d.slug))}>Remove ×</button></th>)}</tr></thead><tbody>{rows.map(row=>{
        const different=new Set(choices.map(row.value)).size>1;
        if(differencesOnly&&!different)return null;
        return <tr key={row.label} className={different?'is-different':''}><th scope="row">{row.label}<small>{different?'Differs by destination':'Shared'}</small></th>{choices.map(d=><td key={d.slug}>{row.value(d)}</td>)}</tr>;
      })}<tr><th scope="row">Go deeper</th>{choices.map(d=><td key={d.slug}><Link className="ms-link" href={destinationHref(d.slug)}>Explore {d.name} ↗</Link><a href={d.source} target="_blank" rel="noreferrer">{d.publisher} ↗</a></td>)}</tr></tbody></table></div>
      <p className="ms-muted comparison-note">This comparison summarises our destination guides. Course fees, entry requirements and visa conditions depend on your programme and circumstances; use the official sources linked above for current requirements. France is our specialist advisory focus.</p>
    </>}
  </div>;
}
