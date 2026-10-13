"use client";

import {useState} from "react";
import {ArrowUpRight,BookOpen,Database,Search,ChevronLeft,ChevronRight,Info,RotateCcw} from "lucide-react";

type RecordValue=string|number|boolean|null|Record<string,unknown>|unknown[];
type SourceRecord=Record<string,RecordValue>;
type Result={total_count:number;results:SourceRecord[]};
const api="https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-mon_master/records";
const source="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-mon_master/";
const pageSize=24;

function clean(value:RecordValue|undefined):string{
 if(value==null)return "";
 if(typeof value==="string")return value.trim();
 if(typeof value==="number"||typeof value==="boolean")return String(value);
 if(Array.isArray(value))return value.map(v=>clean(v as RecordValue)).filter(Boolean).join(", ");
 return "";
}
function choose(r:SourceRecord,names:string[],regex?:RegExp):string{
 for(const n of names){const value=clean(r[n]);if(value)return value;}
 if(regex){for(const [key,value] of Object.entries(r)){if(regex.test(key)){const text=clean(value);if(text)return text;}}}
 return "";
}
function formatKey(key:string){return key.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());}
function recordTitle(r:SourceRecord):string{
 return choose(r,["libelle_formation","nom_formation","mention","mention_master","libelle_mention","intitule_formation","lib_form","formation","libelle","form_lib"],/^(?!.*(code|taux|nb_|nombre|part|proportion)).*(mention|parcours|formation|intitule).*/i)||"Master programme record";
}
function institution(r:SourceRecord):string{
 return choose(r,["etablissement","libelle_etablissement","etablissement_lib","nom_etablissement","etab_lib","uo_lib","etab","lib_etab"],/^(?!.*(code|uai|id_|statut)).*(etablissement|universite|etab_lib).*/i)||"Institution name: inspect record";
}
function city(r:SourceRecord):string{
 return choose(r,["ville","commune","com_nom","lib_commune","nom_commune"],/^(?!.*(code|insee)).*(commune|ville).*/i);
}
function findYear(r:SourceRecord){return choose(r,["annee","annee_universitaire","session","campagne","annee_de_campagne"],/annee|session|campagne/i);}
const inputClass="min-h-12 w-full border border-[#173969]/20 bg-white px-4 text-sm text-[#173969] outline-none focus-visible:ring-2 focus-visible:ring-[#AE9166]";
export default function OfficialMastersArchive(){
 const [query,setQuery]=useState("");
 const [searched,setSearched]=useState("");
 const [page,setPage]=useState(0);
 const [rows,setRows]=useState<SourceRecord[]>([]);
 const [total,setTotal]=useState<number|null>(null);
 const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
 const [error,setError]=useState("");
 const [fetchedAt,setFetchedAt]=useState("");
 async function fetchPage(q:string,nextPage:number){
  setStatus("loading");setError("");
  const params=new URLSearchParams({limit:String(pageSize),offset:String(nextPage*pageSize)});
  if(q.trim()){
   // Opendatasoft's documented full-text ODSQL predicate. Escape quotes and slashes.
   const safe=q.trim().slice(0,100).replace(/\\/g,"\\\\").replace(/"/g,'\\"');
   params.set("where",'search("'+safe+'")');
  }
  try{
   const response=await fetch(api+"?"+params,{signal:AbortSignal.timeout(20000),headers:{Accept:"application/json"}});
   if(!response.ok)throw new Error("Official archive could not be reached (HTTP "+response.status+").");
   const result=await response.json() as Result;
   if(!Array.isArray(result.results)||typeof result.total_count!=="number")throw new Error("The archive returned an unexpected response format.");
   setRows(result.results);setTotal(result.total_count);setPage(nextPage);setSearched(q);setStatus("success");setFetchedAt(new Date().toLocaleString());
  }catch(err){setStatus("error");setError(err instanceof Error?err.message:"Unable to reach the source.");}
 }
 const canPrev=page>0,canNext=total!=null&&(page+1)*pageSize<total;
 return <section aria-labelledby="master-archive-title" className="mx-auto max-w-[1328px] px-5 pb-24 sm:px-9 lg:px-14">
   <div className="relative overflow-hidden border border-[#173969]/15 bg-[#F1ECE3] p-6 sm:p-10">
    <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[#173969]/10"/>
    <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
     <div className="lg:col-span-7">
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.22em] text-[#987F5A]"><Database size={15}/> Données publiques · Public dataset</p>
      <h2 id="master-archive-title" className="mt-5 max-w-xl font-display text-[clamp(2.5rem,5vw,4.6rem)] leading-[.95] tracking-[-.035em]">Explore real <em>Master's programme records.</em></h2>
      <p className="mt-5 max-w-2xl text-sm leading-8 text-[#536681]">Search an open government archive of programmes included in the <strong>Mon Master 2024–2025 campaigns</strong>. These are historical records, not current intakes or an international-admissions eligibility checker.</p>
     </div>
     <div className="lg:col-span-5">
      <form onSubmit={event=>{event.preventDefault();void fetchPage(query,0);}} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
       <label className="relative block min-w-0 flex-1">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.14em] text-[#596A81]">Search official programme records</span>
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute bottom-[16px] left-3 text-[#9D8660]"/>
        <input type="search" className={inputClass+" pl-10"} value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. Informatique, Paris, Physique" maxLength={100}/>
       </label>
       <button disabled={status==="loading"} type="submit" className="mt-0 inline-flex min-h-12 items-center justify-center gap-2 self-end bg-[#173969] px-6 py-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white disabled:opacity-50 sm:mt-6 lg:mt-0 lg:self-stretch">
        {status==="loading"?"Fetching archive…":"Search programme archive"} <ArrowUpRight size={17}/>
       </button>
      </form>
     </div>
    </div>
   </div>
   {status==="idle"&&<div className="mt-6 flex flex-col items-start justify-between gap-4 border border-[#173969]/15 bg-white p-6 sm:flex-row sm:items-center sm:p-8"><p className="max-w-2xl text-sm leading-7 text-[#5B6980]">Press Search to retrieve live results from the official historical programme dataset. No registration or account required.</p><button type="button" onClick={()=>void fetchPage("",0)} className="inline-flex min-h-12 shrink-0 items-center gap-2 bg-[#173969] px-6 text-xs font-semibold text-white"><BookOpen size={17}/> Browse records</button></div>}
   {status==="loading"&&<div role="status" aria-live="polite" className="mt-6 border border-[#173969]/15 bg-white px-6 py-10 text-center text-sm text-[#556780]">Retrieving source data…</div>}
   {status==="error"&&<div role="alert" className="mt-6 border border-[#A56C62]/30 bg-[#FFF9F7] p-7 text-sm leading-7 text-[#8A3D33]"><p>{error}</p><p className="mt-2">You can still use the source directly.</p><a target="_blank" rel="noopener noreferrer" href={source} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline">Open official dataset <ArrowUpRight size={16}/></a></div>}
   {status==="success"&&<div className="mt-8">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#173969]/15 pb-6">
     <div><p className="text-[10px] uppercase tracking-[.24em] text-[#A18864]">Official historical records</p><h3 aria-live="polite" className="mt-2 font-display text-3xl sm:text-4xl">{total?.toLocaleString()} results{searched?" for “"+searched+"”":""}</h3></div><p className="max-w-xs text-xs leading-6 text-[#708097]">Fetched {fetchedAt} · Records returned by the French higher education ministry.</p>
    </div>
    {rows.length?<div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{rows.map((r,i)=>{
     const title=recordTitle(r);const uni=institution(r);const place=city(r);const year=findYear(r);
     const entries=Object.entries(r).filter(([key,value])=>key!=="geo_point_2d"&&clean(value));
     return <article key={page+"-"+i} className="flex min-w-0 flex-col overflow-hidden border border-[#173969]/15 bg-white p-6 transition-shadow hover:border-[#B79A69] hover:shadow-[0_18px_45px_rgba(13,38,80,.09)] sm:p-7">
      <div className="flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[.18em] text-[#9E835F]"><span>Record {page*pageSize+i+1}</span><span>{year||"2024–25 archive"}</span></div>
      <h4 className="mt-7 break-words font-display text-3xl leading-[1.05] text-[#173969]">{title}</h4>
      <p className="mt-4 break-words text-sm font-medium leading-7 text-[#385A84]">{uni}</p>
      {place&&<p className="mt-2 text-xs text-[#68778A]">{place}</p>}
      <div className="mt-auto pt-7">
       <details className="group/details border-y border-[#173969]/10 py-4">
        <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-xs font-semibold text-[#173969]">Inspect complete source record <ChevronRight size={17} className="transition-transform group-open/details:rotate-90"/></summary>
        <dl className="mt-3 max-h-64 space-y-3 overflow-y-auto pr-2">{entries.map(([key,value])=><div key={key} className="border-b border-[#173969]/10 pb-2"><dt className="break-all text-[10px] font-semibold uppercase tracking-wider text-[#987F5A]">{formatKey(key)}</dt><dd className="mt-1 break-words text-xs leading-5 text-[#536681]">{clean(value)||"—"}</dd></div>)}</dl>
       </details><a href={source} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-12 w-full items-center justify-between gap-2 bg-[#173969] px-5 py-3 text-[11px] font-semibold uppercase tracking-[.08em] text-white">Open official dataset <ArrowUpRight size={17}/></a>
      </div>
     </article>;
    })}</div>:<p className="mt-5 bg-white p-7 text-sm text-[#536681]">No matching archive records. Try another discipline or city.</p>}
    {total!=null&&total>pageSize&&<div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#173969]/15 pt-6">
     <button disabled={!canPrev||status==="loading"} type="button" onClick={()=>void fetchPage(searched,page-1)} className="inline-flex min-h-12 items-center gap-2 border border-[#173969]/25 px-5 text-xs text-[#173969] disabled:opacity-40"><ChevronLeft size={17}/> Previous</button>
     <span className="text-xs text-[#64748A]">Page {page+1} of {Math.ceil(total/pageSize)}</span>
     <button disabled={!canNext||status==="loading"} type="button" onClick={()=>void fetchPage(searched,page+1)} className="inline-flex min-h-12 items-center gap-2 bg-[#173969] px-5 text-xs text-white disabled:opacity-40">Next <ChevronRight size={17}/></button>
    </div>}
   </div>}
   <div className="mt-7 flex items-start gap-3 text-xs leading-7 text-[#6B788D]"><Info size={19} className="mt-1 shrink-0 text-[#A58F6B]"/><p><strong>Not the live Campus France programme catalogue.</strong> The underlying Mon Master dataset documents 2024/2025 national application campaigns. Course names, international routes, current tuition and admission requirements must be checked separately with each institution. Source: French Ministry of Higher Education, Licence Ouverte/Open Licence. <a href={source} target="_blank" rel="noopener noreferrer" className="underline">Source & licence ↗</a></p></div>
  </section>;
}
