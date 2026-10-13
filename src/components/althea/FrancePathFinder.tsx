"use client";
import {useState} from "react";
import {ArrowUpRight,Info} from "lucide-react";
type Level="bachelor-first"|"bachelor-later"|"master"|"doctorate";
export default function FrancePathFinder(){
 const [residence,setResidence]=useState("india");
 const [level,setLevel]=useState<Level>("master");
 const inEef=residence==="india"||residence==="eef";
 let headline="Check your country-specific route";
 let detail="Your place of residence and programme determine the application channel. Use the official Campus France procedure checker and confirm with the institution.";
 if(level==="doctorate"){headline="Doctoral school / research route";detail="Doctoral candidates generally contact doctoral schools and supervisors directly. Researcher residence and visa categories depend on the offer and contract; check official guidance.";}
 else if(inEef&&level==="bachelor-first"){headline="Likely DAP + Études en France";detail="For many non-EU applicants holding a non-French secondary diploma and entering first-year Licence, the preliminary-admission (DAP) route applies through Études en France. French/European baccalauréat and programme exceptions can change the pathway.";}
 else if(inEef&&(level==="bachelor-later"||level==="master")){headline="Études en France / non-DAP route";detail="For students applying to later Licence years or Master's programmes from an Études en France country, the EEF process commonly applies. Some schools require parallel or direct applications. Check every programme's instructions.";}
 return <div className="border border-[#193763]/15 bg-[#F7F3EB] p-6 sm:p-9">
  <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9E835C]">Application pathway finder</p>
  <h3 className="mt-3 font-display text-3xl text-[#16345F] sm:text-4xl">Where should I begin?</h3>
  <div className="mt-7 grid gap-4 sm:grid-cols-2">
   <label className="block"><span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[#5B6780]">Where do you live?</span><select value={residence} onChange={e=>setResidence(e.target.value)} className="min-h-12 w-full border border-[#193763]/25 bg-white px-4 text-sm text-[#16345F]"><option value="india">India</option><option value="eef">Other Études en France country</option><option value="other">Outside Études en France countries</option></select></label>
   <label className="block"><span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-[#5B6780]">What level?</span><select value={level} onChange={e=>setLevel(e.target.value as Level)} className="min-h-12 w-full border border-[#193763]/25 bg-white px-4 text-sm text-[#16345F]"><option value="bachelor-first">Bachelor's first year</option><option value="bachelor-later">Bachelor's second / third year</option><option value="master">Master's</option><option value="doctorate">Doctorate / research</option></select></label>
  </div>
  <div aria-live="polite" className="mt-7 border-l-2 border-[#B09466] bg-white p-6"><p className="text-[10px] uppercase tracking-[.2em] text-[#9E835C]">Suggested direction, not an eligibility decision</p><h4 className="mt-3 font-display text-3xl text-[#16345F]">{headline}</h4><p className="mt-3 text-sm leading-7 text-[#56677C]">{detail}</p><p className="mt-5 flex items-start gap-2 text-xs leading-6 text-[#7A7B83]"><Info size={16} className="mt-1 shrink-0"/>Rules vary by nationality, qualification, course and institution. Always verify before submitting or paying.</p></div>
  <a href="https://www.campusfrance.org/en/application-etudes-en-france-procedure?lang=en" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#173969] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#31558C] sm:w-auto">Verify on Campus France <ArrowUpRight size={17}/></a>
 </div>;
}