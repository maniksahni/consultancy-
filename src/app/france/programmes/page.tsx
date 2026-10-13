import type {Metadata} from "next";
import Link from "next/link";
import {ArrowLeft,ArrowUpRight} from "lucide-react";
import {AltheaHeader,AltheaFooter} from "@/components/althea/SiteChrome";
import ProgrammeSearch from "@/components/althea/ProgrammeSearch";
import FranceNationalProgrammeArchives from "@/components/althea/FranceNationalProgrammeArchives";
import CampusFranceCatalogues from "@/components/althea/CampusFranceCatalogues";
export const metadata:Metadata={title:"Discover Courses in France",description:"Explore verified-source French university programme examples by subject, study level and city. Follow official university listing links for current requirements.",alternates:{canonical:"/france/programmes"}};
export default function ProgrammePage(){return <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]"><AltheaHeader/>
 <section className="bg-[#142E61] px-5 pb-20 pt-12 text-white sm:px-9 sm:py-24 lg:px-14"><div className="mx-auto max-w-[1328px]"><Link href="/france" className="inline-flex min-h-11 items-center gap-2 text-xs tracking-widest text-white/65 hover:text-white"><ArrowLeft size={17}/> Study in France</Link><p className="mt-10 text-[11px] font-semibold uppercase tracking-[.33em] text-[#D8BA8C]">Le catalogue / University courses</p><h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,8.3rem)] leading-[.88] tracking-[-.05em]">What will<br/><em className="font-normal text-[#E4C99B]">you become?</em></h1><p className="mt-8 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">Explore selected Bachelor’s and Master’s programmes featured on the official websites of French universities. Find a direction worth pursuing.</p></div></section>
 <div className="mx-auto flex max-w-[1328px] flex-wrap justify-between gap-4 px-5 py-10 text-xs uppercase tracking-[.15em] text-[#6C7990] sm:px-9 lg:px-14"><span>01 / Discover your subject</span><span>Direct links to university sources</span></div><ProgrammeSearch/>
 <section className="bg-[#F1EBE0] px-5 py-16 sm:px-9 lg:px-14"><div className="mx-auto flex max-w-[1328px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div><p className="text-xs uppercase tracking-[.26em] text-[#A48B65]">Explore beyond these examples</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">So much more to <em>discover.</em></h2></div><a href="https://www.campusfrance.org/en/finding-a-university-programme-France" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 bg-[#173969] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#31558C]">Full official Campus France catalogues <ArrowUpRight size={18}/></a></div></section>
 <CampusFranceCatalogues/>
 <FranceNationalProgrammeArchives/>
 <AltheaFooter/></main>}
