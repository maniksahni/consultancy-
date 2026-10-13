"use client";
import {useState} from "react";
import OfficialMastersArchive from "@/components/althea/OfficialMastersArchive";
export default function FranceNationalProgrammeArchives(){
 const [active,setActive]=useState<"masters"|"undergraduate">("masters");
 return <div id="official-programme-records" className="scroll-mt-16">
  <div className="mx-auto max-w-[1328px] px-5 pt-16 sm:px-9 lg:px-14 lg:pt-24">
   <p className="text-[11px] font-semibold uppercase tracking-[.26em] text-[#AA8F64]">Le registre / Official programme data</p>
   <h2 className="mt-4 max-w-3xl font-display text-[clamp(3.2rem,6vw,6rem)] leading-[.94] text-[#173565]">Beyond a handful <em>of examples.</em></h2>
   <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5A6C82]">Browse two official national open datasets, and inspect the source fields yourself. They have different application routes and may contain older programme records. Althéa is not affiliated with either system.</p>
   <div role="tablist" aria-label="Government programme data" className="mt-8 flex flex-wrap gap-3">
    <button type="button" role="tab" aria-selected={active==="masters"} onClick={()=>setActive("masters")} className={"min-h-12 border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider "+(active==="masters"?"border-[#173969] bg-[#173969] text-white":"border-[#173969]/25 bg-white text-[#173969]")}>Master's programme data</button>
    <button type="button" role="tab" aria-selected={active==="undergraduate"} onClick={()=>setActive("undergraduate")} className={"min-h-12 border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider "+(active==="undergraduate"?"border-[#173969] bg-[#173969] text-white":"border-[#173969]/25 bg-white text-[#173969]")}>Bachelor's-level programme data</button>
   </div>
  </div>
  <div role="tabpanel" aria-label={active==="masters"?"Mon Master archive":"Parcoursup archive"}><OfficialMastersArchive key={active} kind={active}/></div>
 </div>;
}
