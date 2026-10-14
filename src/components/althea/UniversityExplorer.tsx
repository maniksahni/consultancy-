"use client";
import {useEffect,useMemo,useState} from "react";
import {Search,MapPin,ArrowUpRight} from "lucide-react";
import {institutions} from "@/data/franceDirectory";

export default function UniversityExplorer(){
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>setHydrated(true),[]);
 const [q,setQ]=useState(""); const [city,setCity]=useState("All"); const [field,setField]=useState("All");
 const cities=["All",...Array.from(new Set(institutions.map(u=>u.city)))];
 const fields=["All",...Array.from(new Set(institutions.flatMap(u=>u.focus)))].sort();
 const results=useMemo(()=>institutions.filter(u=>
  [u.name,u.city,u.region,u.description,...u.focus].join(" ").toLowerCase().includes(q.toLowerCase().trim())
  &&(city==="All"||u.city===city)&&(field==="All"||u.focus.includes(field))
 ),[q,city,field]);
 const clear=()=>{setQ("");setCity("All");setField("All");};
 const inputClass="min-h-12 w-full border border-[var(--color23)]/20 bg-white px-4 text-sm text-[var(--color24)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color25)]";
 return <section data-hydrated={hydrated} aria-label="University explorer" className="mx-auto max-w-[1328px] px-5 pb-24 sm:px-9 lg:px-14">
  <div className="border border-[var(--color23)]/15 bg-[var(--color26)] p-5 sm:p-8">
   <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><h2 className="font-display text-3xl text-[var(--color27)] sm:text-4xl">Find your direction.</h2><button onClick={clear} className="min-h-11 text-xs font-semibold uppercase tracking-widest text-[var(--color28)] hover:underline" type="button">Clear all filters</button></div>
   <div className="grid gap-4 md:grid-cols-3">
    <label className="block"><span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[var(--color29)]">Search university or subject</span><span className="relative block"><Search size={17} aria-hidden className="absolute left-3 top-4 text-[var(--color30)]"/><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Paris, science, business..." className={inputClass+" pl-10"}/></span></label>
    <label className="block"><span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[var(--color29)]">Location</span><select className={inputClass} value={city} onChange={e=>setCity(e.target.value)}>{cities.map(c=><option value={c} key={c}>{c==="All"?"All cities":c}</option>)}</select></label>
    <label className="block"><span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[var(--color29)]">Discipline</span><select className={inputClass} value={field} onChange={e=>setField(e.target.value)}>{fields.map(f=><option value={f} key={f}>{f==="All"?"All disciplines":f}</option>)}</select></label>
   </div>
  </div>
  <div className="my-8 flex flex-wrap justify-between gap-3 border-b border-[var(--color31)]/15 pb-5"><h2 aria-live="polite" className="font-display text-2xl text-[var(--color32)]">{results.length} {results.length===1?"university":"universities"} to explore</h2><p className="max-w-md text-xs leading-5 text-[var(--color33)]">Curated official-source links, not a live admissions database. Check each institution for fees, intakes, language and eligibility.</p></div>
  {results.length>0?<div className="grid gap-5 lg:grid-cols-2">{results.map((u,i)=><article key={u.id} className="group flex flex-col border border-[var(--color31)]/15 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color34)] hover:shadow-xl sm:p-9">
   <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-[10px] uppercase tracking-[.23em] text-[var(--color35)]">Établissement / {String(i+1).padStart(2,"0")}</span><span className="flex items-center gap-1.5 text-xs text-[var(--color36)]"><MapPin size={14} aria-hidden/>{u.city}</span></div>
   <h3 className="mt-7 font-display text-3xl leading-tight text-[var(--color32)] sm:text-4xl">{u.name}</h3>
   <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color37)]">{u.description}</p>
   <div className="mt-5 flex flex-wrap gap-2">{u.focus.map(f=><span key={f} className="border border-[var(--color23)]/15 px-2 py-1.5 text-[10px] uppercase tracking-wide text-[var(--color38)]">{f}</span>)}</div>
   <div className="mt-7 border-t border-[var(--color23)]/15 pt-5"><p className="mb-4 text-xs text-[var(--color36)]">{u.degreeLevels.join(" · ")} · {u.language} · Reviewed {u.verifiedOn}</p><a className="inline-flex min-h-12 w-full items-center justify-between gap-3 bg-[var(--color39)] px-5 py-3 text-xs font-medium text-white hover:bg-[var(--color40)] sm:w-auto" href={u.sourceUrl} target="_blank" rel="noopener noreferrer">{u.sourceLabel}<ArrowUpRight aria-hidden size={17}/></a></div>
  </article>)}</div>:<div className="border border-[var(--color23)]/15 p-10 text-center"><p className="font-display text-3xl text-[var(--color32)]">No matches yet.</p><p className="mt-3 text-sm text-[var(--color37)]">Try fewer filters or use the Campus France official catalogues.</p><button type="button" onClick={clear} className="mt-6 min-h-11 bg-[var(--color39)] px-6 text-xs text-white">Reset filters</button></div>}
 </section>;
}