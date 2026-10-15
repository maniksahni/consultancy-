import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import UniversityExplorer from "@/components/althea/UniversityExplorer";
export const metadata:Metadata={title:"Find French Universities by City & Subject",description:"Explore a curated directory of French universities linked directly to their official programme catalogues. Filter by city or field and verify admissions at the source.",alternates:{canonical:"/france/universities"}};
export default function UniversityDirectory(){return <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]">
 <AltheaHeader/>
 <section className="relative overflow-hidden bg-[#122E60] px-5 pb-16 pt-14 text-[#FAF8F3] sm:px-9 sm:pb-24 sm:pt-20 lg:px-14">
  <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 h-[550px] w-[550px] rounded-full border border-white/10"/>
  <div className="relative mx-auto max-w-[1328px]"><Link href="/france" className="inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[.2em] text-white/65 hover:text-white"><ArrowLeft size={16}/>Study in France</Link>
  <p className="mt-12 text-xs uppercase tracking-[.38em] text-[#DCC39A]">Althéa / Le répertoire</p>
  <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.6rem,9vw,8.5rem)] leading-[.88] tracking-[-.05em]">Find a place<br/><em className="font-normal text-[#E5C99D]">to belong.</em></h1>
  <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">France has a world of academic possibilities. Begin with a source-linked selection of universities — then explore the details that matter for your goals.</p>
  </div>
 </section>
 <div className="mx-auto flex max-w-[1328px] flex-col justify-between gap-4 px-5 py-9 text-xs text-[#69768A] sm:flex-row sm:px-9 lg:px-14"><span>01 / University discovery</span><span>Official university links · Curated starting collection · No fabricated fees</span></div>
 <UniversityExplorer/>
 <section className="bg-[#EEE9DF] px-5 py-16 sm:px-9 lg:px-14"><div className="mx-auto flex max-w-[1328px] flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs uppercase tracking-[.25em] text-[#AA8E60]">Continue your research</p><h2 className="mt-3 font-display text-4xl text-[#163665] sm:text-5xl">Looking for more programmes?</h2><p className="mt-3 max-w-xl text-sm leading-7 text-[#56677E]">Campus France offers wider national catalogues. Confirm the chosen institution's application process and latest requirements before applying.</p></div><a className="inline-flex min-h-12 shrink-0 items-center gap-3 bg-[#173969] px-7 py-4 text-xs font-semibold uppercase tracking-[.12em] text-white hover:bg-[#31558C]" href="https://www.campusfrance.org/en/finding-a-university-programme-France" target="_blank" rel="noopener noreferrer">Official Campus France catalogues <ArrowUpRight size={17}/></a></div></section>
 <section className="mx-auto max-w-[1328px] px-5 py-16 sm:px-9 lg:px-14"><div className="border border-[#173969]/15 bg-white p-7 sm:p-10"><p className="text-xs uppercase tracking-[.25em] text-[#A48B65]">Beyond the curated selection</p><h2 className="mt-4 font-display text-4xl text-[#173969] sm:text-5xl">Explore the full <em>official register.</em></h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#596980]">Search major French higher-education institutions by name, city and region using the ministry’s openly licensed reference dataset. The register is not a course catalogue.</p><Link href="/france/institutions" className="mt-6 inline-flex min-h-12 items-center gap-3 bg-[#173969] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white">Open institution register <ArrowUpRight size={17}/></Link></div></section>
 <AltheaFooter/>
 </main>}