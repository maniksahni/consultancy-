import {ArrowUpRight,BookOpen,GraduationCap,Languages} from "lucide-react";
const sources=[
 {name:"Find your Bachelor's / Licence",type:"Licence",desc:"Start with Campus France's official Bachelor's programme finder and check the institution's own instructions.",href:"https://www.campusfrance.org/en/finding-a-university-programme-France",icon:BookOpen},
 {name:"Find your Master's degree",type:"Master",desc:"Follow the official Campus France Master's catalogue entry and verify the degree route with your university.",href:"https://www.campusfrance.org/en/finding-a-university-programme-France",icon:GraduationCap},
 {name:"Programmes taught in English",type:"English",desc:"Review Campus France's October 2026 English-taught programme guidance, and confirm the instruction language directly.",href:"https://www.campusfrance.org/en/resource/programs-taught-in-english",icon:Languages}
];
export default function CampusFranceCatalogues(){return <section aria-labelledby="catalogues-title" className="bg-[#F1EBE1] px-5 py-18 sm:px-9 lg:px-14 lg:py-24"><div className="mx-auto max-w-[1328px] py-16">
 <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#A78C63]">Campus France / Catalogue officiel</p><h2 id="catalogues-title" className="mt-4 max-w-3xl font-display text-[clamp(3rem,5.5vw,5.5rem)] leading-[.93]">Start with the <em>official catalogues.</em></h2></div><p className="max-w-md text-sm leading-8 text-[#5C6D83] lg:col-span-4">For current offerings and eligibility, the Campus France and individual university catalogues remain the authoritative sources.</p></div>
 <div className="grid gap-4 lg:grid-cols-3">{sources.map((s,i)=>{const Icon=s.icon;return <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-[240px] flex-col border border-[#173969]/15 bg-[#FBF9F4] p-7 transition-transform hover:-translate-y-1 hover:border-[#B29A72] sm:p-8">
  <div className="flex items-center justify-between gap-4 text-[#A98B61]"><span className="text-[10px] font-semibold uppercase tracking-[.25em]">{s.type} / 0{i+1}</span><Icon size={24} strokeWidth={1.35}/></div>
  <h3 className="mt-9 font-display text-3xl leading-tight text-[#173969]">{s.name}</h3>
  <p className="mt-4 flex-1 text-sm leading-7 text-[#5C6D83]">{s.desc}</p>
  <span className="mt-7 inline-flex min-h-11 items-center gap-2 border-t border-[#173969]/15 pt-3 text-[11px] font-semibold uppercase tracking-[.08em] text-[#173969]">Open Campus France <ArrowUpRight size={16}/></span>
 </a>})}</div>
 <p className="mt-5 text-xs leading-6 text-[#748196]">Althéa is an independent consultancy, not an official Campus France partner. These are outbound source links, not a live proprietary Campus France database connection.</p>
 </div></section>}