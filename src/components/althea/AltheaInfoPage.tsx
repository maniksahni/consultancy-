import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
type Row={title:string,description:string,href:string,label:string};
export default function AltheaInfoPage({eyebrow,title,accent,intro,rows}:{eyebrow:string,title:string,accent:string,intro:string,rows:Row[]}){
 return <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]"><AltheaHeader/>
  <section className="bg-[#142E61] px-5 pb-20 pt-12 text-white sm:px-9 sm:py-24 lg:px-14"><div className="mx-auto max-w-[1328px]"><Link href="/" className="inline-flex min-h-11 items-center gap-2 text-xs text-white/65"><ArrowLeft size={17}/> Althéa home</Link><p className="mt-10 text-xs font-semibold uppercase tracking-[.27em] text-[#E5C99D]">{eyebrow}</p><h1 className="mt-6 font-display text-[clamp(3.8rem,8vw,7rem)] leading-[.92] tracking-[-.04em]">{title}<br/><em className="text-[#E5C99D]">{accent}</em></h1><p className="mt-8 max-w-2xl text-base leading-8 text-white/75">{intro}</p></div></section>
  <section className="mx-auto max-w-[1328px] px-5 py-20 sm:px-9 lg:px-14 lg:py-28"><div className="grid gap-5 md:grid-cols-2">{rows.map((r,i)=><article className="flex flex-col border border-[#173969]/15 bg-[#F2EDE5] p-7 sm:p-9" key={r.title}><span className="text-[11px] tracking-[.24em] text-[#A68C63]">{String(i+1).padStart(2,"0")}</span><h2 className="mt-8 font-display text-3xl leading-tight sm:text-4xl">{r.title}</h2><p className="mt-4 flex-1 text-sm leading-8 text-[#5A6A80]">{r.description}</p><Link href={r.href} className="mt-7 inline-flex min-h-12 items-center gap-3 border-t border-[#173969]/15 pt-4 text-xs font-semibold text-[#274C7B]">{r.label} <ArrowUpRight size={17}/></Link></article>)}</div></section>
  <AltheaFooter/>
 </main>;
}