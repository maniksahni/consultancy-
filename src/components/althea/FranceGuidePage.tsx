import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import type { FrenchGuide } from "@/data/franceGuides";

export default function FranceGuidePage({guide}:{guide:FrenchGuide}){
 return <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]">
  <AltheaHeader/>
  <section className="relative overflow-hidden bg-[#142E61] px-5 pb-20 pt-12 text-white sm:px-9 sm:py-24 lg:px-14"><div aria-hidden className="pointer-events-none absolute -right-[8rem] -top-[6rem] h-[38rem] w-[38rem] rounded-full border border-white/10 shadow-[0_0_0_80px_rgba(255,255,255,.015)]"/><div className="relative mx-auto max-w-[1328px]">
   <Link href="/france" className="inline-flex min-h-11 items-center gap-2 text-xs text-white/65 hover:text-white"><ArrowLeft size={17}/> Back to France</Link>
   <p className="mt-9 text-[11px] font-semibold uppercase tracking-[.28em] text-[#D7BA87]">{guide.eyebrow}</p>
   <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.6rem,9vw,8rem)] leading-[.89] tracking-[-.05em]">{guide.title}<br/><em className="font-normal text-[#E4C99B]">{guide.accent}</em></h1>
   <p className="mt-8 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">{guide.summary}</p>
  </div></section>
  <section className="mx-auto max-w-[1328px] px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
   <div className="mb-10 grid gap-6 border-b border-[#153663]/15 pb-10 md:grid-cols-2"><div><p className="text-xs uppercase tracking-[.28em] text-[#A88C64]">Independent guidance / Sources</p><h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">Go straight to the <em>official source.</em></h2></div><p className="max-w-lg self-end text-sm leading-8 text-[#64728A]">Althéa is not affiliated with the organisations below. Official policy and eligibility may change; refer to the linked authority or university before applying or paying.</p></div>
   <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{guide.entries.map((entry,i)=><article key={entry.url} className="flex min-h-[300px] flex-col border border-[#173969]/15 bg-[#F2EDE5] p-7 transition-all hover:-translate-y-1 hover:border-[#B79D74] hover:shadow-lg">
    <div className="flex items-start justify-between"><span className="text-xs tracking-[.25em] text-[#A38A62]">{String(i+1).padStart(2,"0")}</span><BookOpen size={22} strokeWidth={1.3} aria-hidden/></div>
    <h3 className="mt-10 font-display text-3xl leading-tight sm:text-4xl">{entry.title}</h3><p className="mt-4 flex-1 text-sm leading-7 text-[#566981]">{entry.description}</p><a target="_blank" rel="noopener noreferrer" href={entry.url} className="mt-7 inline-flex min-h-12 items-center justify-between gap-3 border-t border-[#173969]/15 pt-4 text-[11px] font-semibold uppercase tracking-[.09em] text-[#244878]">{entry.source}<ArrowUpRight size={18} className="shrink-0"/></a>
   </article>)}</div>
  </section>
  {guide.questions&&<section className="bg-[#F1EBDF] px-5 py-20 sm:px-9 lg:px-14"><div className="mx-auto max-w-[1328px]"><p className="text-xs uppercase tracking-[.28em] text-[#A38A62]">Answers / Verified source links</p><h2 className="mt-5 font-display text-5xl sm:text-6xl">A little more <em>clarity.</em></h2><div className="mt-10 grid gap-4 md:grid-cols-2">{guide.questions.map((item,i)=><article className="bg-white p-6 sm:p-8" key={item.q}><span className="text-[11px] tracking-[.22em] text-[#A38A62]">{String(i+1).padStart(2,"0")}</span><h3 className="mt-4 font-display text-3xl">{item.q}</h3><p className="mt-4 text-sm leading-8 text-[#57677C]">{item.a}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#315587] underline underline-offset-4">Official source <ArrowUpRight size={17}/></a></article>)}</div></div></section>}
  <section className="bg-[#153363] px-5 py-16 text-white sm:px-9 lg:px-14"><div className="mx-auto flex max-w-[1328px] flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#E2C596]">Further reading</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Explore the whole <em>journey.</em></h2></div><Link className="inline-flex min-h-12 shrink-0 items-center gap-3 bg-[#E5C99D] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#173969]" href="/france">Study in France <ChevronRight size={18}/></Link></div></section>
  <AltheaFooter/>
 </main>;
}
