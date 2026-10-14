"use client";
import {useEffect,useMemo,useState} from "react";
import {Search,ArrowUpRight,GraduationCap} from "lucide-react";
import {franceProgrammes} from "@/data/franceProgrammes";
export default function ProgrammeSearch(){
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>setHydrated(true),[]);
 const [q,setQ]=useState("");const [level,setLevel]=useState("All");const [city,setCity]=useState("All");const [field,setField]=useState("All");
 const results=useMemo(()=>franceProgrammes.filter(p=>{
  const haystack=[p.title,p.institution,p.city,p.field,p.note].join(" ").toLowerCase();
  return haystack.includes(q.trim().toLowerCase())&&(level==="All"||p.level===level)&&(city==="All"||p.city===city)&&(field==="All"||p.field===field);
 }),[q,level,city,field]);
 const input="min-h-12 w-full border border-[var(--color39)]/20 bg-white px-4 text-sm text-[var(--color51)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color25)]";
 const fields=["All",...Array.from(new Set(franceProgrammes.map(p=>p.field)))];
 const cities=["All",...Array.from(new Set(franceProgrammes.map(p=>p.city)))];
 function clear(){setQ("");setLevel("All");setCity("All");setField("All");}
 return <div data-hydrated={hydrated} className="mx-auto max-w-[1328px] px-5 pb-24 sm:px-9 lg:px-14">
  <div className="border border-[var(--color39)]/15 bg-[var(--color7)] p-5 sm:p-8">
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <label><span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[var(--color52)]">Keyword</span><span className="relative block"><Search className="absolute left-3 top-4 text-[var(--color53)]" size={17}/><input className={input+" pl-10"} type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="AI, Business, Physics..."/></span></label>
    <label><span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[var(--color52)]">Degree</span><select className={input} value={level} onChange={e=>setLevel(e.target.value)}>{["All","Bachelor","Master"].map(v=><option key={v} value={v}>{v==="All"?"All levels":v}</option>)}</select></label>
    <label><span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[var(--color52)]">City</span><select className={input} value={city} onChange={e=>setCity(e.target.value)}>{cities.map(v=><option key={v} value={v}>{v==="All"?"All cities":v}</option>)}</select></label>
    <label><span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[var(--color52)]">Subject</span><select className={input} value={field} onChange={e=>setField(e.target.value)}>{fields.map(v=><option key={v} value={v}>{v==="All"?"All subjects":v}</option>)}</select></label>
   </div>
   <button type="button" onClick={clear} className="mt-5 min-h-11 text-[11px] font-semibold uppercase tracking-widest text-[var(--color28)] hover:underline">Reset all filters</button>
  </div>
  <div className="my-8 flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color23)]/15 pb-5"><h2 aria-live="polite" className="font-display text-3xl">{results.length} verified-source examples</h2><p className="max-w-lg text-xs leading-6 text-[var(--color50)]">This editorial sample is not a complete or live Campus France catalogue. Language, tuition, deadlines and requirements must be checked with the university.</p></div>
  {results.length?<div className="grid gap-4 md:grid-cols-2">{results.map((p,i)=><article key={p.id} className="flex flex-col border border-[var(--color23)]/15 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-8">
   <div className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-[var(--color35)]">Programme / {String(i+1).padStart(2,"0")}</span><GraduationCap aria-hidden size={21} strokeWidth={1.4}/></div>
   <h3 className="mt-7 font-display text-3xl leading-[1.1] sm:text-4xl">{p.title}</h3><p className="mt-4 text-sm text-[var(--color54)]">{p.institution} · {p.city}</p>
   <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color55)]">{p.note}</p>
   <div className="mt-6 flex flex-wrap gap-2"><span className="border border-[var(--color23)]/15 px-3 py-1.5 text-[10px] uppercase tracking-wider">{p.level}</span><span className="border border-[var(--color23)]/15 px-3 py-1.5 text-[10px] uppercase tracking-wider">{p.field}</span></div>
   <div className="mt-7 border-t border-[var(--color23)]/15 pt-5"><p className="mb-4 text-xs text-[var(--color50)]">{p.language} · Source checked {p.checkedAt}</p><a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-between gap-3 bg-[var(--color39)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[.1em] text-white hover:bg-[var(--color56)] sm:w-auto">View official programme listing <ArrowUpRight size={17}/></a></div>
  </article>)}</div>:<div className="border border-[var(--color23)]/15 p-10 text-center"><p className="font-display text-3xl">No matching example programmes.</p><p className="mt-3 text-sm text-[var(--color50)]">Try a wider search or open the complete Campus France catalogue.</p><button onClick={clear} className="mt-5 min-h-11 bg-[var(--color39)] px-6 text-xs text-white" type="button">Reset filters</button></div>}
 </div>;
}