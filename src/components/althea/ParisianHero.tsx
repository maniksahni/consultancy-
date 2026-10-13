import Link from "next/link";
import {ArrowDownRight,ArrowUpRight,Compass,MapPin} from "lucide-react";

/**
 * Art direction: modern Paris editorial, not WebGL decoration.
 * Desktop has a photographic diptych and tactile atelier-style notes.
 * Mobile reflows into a full editorial photograph; no absolute text clipping.
 */
export default function ParisianHero(){
 return <section className="relative isolate overflow-hidden bg-[#122A5B] text-[#FEFCF7]">
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50" style={{backgroundImage:"radial-gradient(ellipse 65% 40% at 95% 15%,rgba(185,158,112,.16),transparent 70%),linear-gradient(120deg,#122A5B,#1B3B75 70%,#122A5B)"}}/>
  <div className="pointer-events-none absolute -right-32 top-[-130px] h-[520px] w-[520px] rounded-full border border-[#DFCAA6]/15 lg:h-[820px] lg:w-[820px]"/>
  <div className="relative mx-auto grid min-h-[680px] w-full max-w-[1536px] gap-10 px-5 pb-11 pt-10 sm:px-9 sm:pt-16 lg:min-h-[795px] lg:grid-cols-12 lg:gap-10 lg:px-14 lg:pb-14 lg:pt-20 xl:gap-14">
   <div className="z-10 flex flex-col justify-between lg:col-span-6 lg:py-7 xl:col-span-6">
    <div>
     <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[.21em] text-[#D9BB87] sm:tracking-[.32em]"><span className="h-px w-10 bg-[#D9BB87]"/> Althéa Consulting · La France <span aria-hidden className="ml-1 inline-flex h-2.5 gap-[2px]"><span className="w-1.5 bg-[#346CD0]"/><span className="w-1.5 bg-white"/><span className="w-1.5 bg-[#D65A5A]"/></span></div>
     <h1 className="mt-8 max-w-[800px] font-display text-[clamp(3.6rem,10vw,8.5rem)] leading-[.88] tracking-[-.053em] sm:mt-10 lg:text-[clamp(4.5rem,7.1vw,8rem)]">
      Your future,<br/><em className="font-normal text-[#E9CEA1]">en France.</em>
     </h1>
     <p className="mt-7 max-w-xl text-[15px] leading-[1.9] text-white/78 sm:mt-8 sm:text-[17px]">Your trusted guide for studying, settling, and succeeding in France. Discover programmes, navigate Campus France and plan your next chapter with thoughtful, personal support.</p>
     <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
      <Link href="/france/programmes" className="group inline-flex min-h-[54px] items-center justify-between gap-4 bg-[#E8D0A8] px-6 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-[#122B58] transition-all hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E8D0A8] sm:justify-center">
       Explore programmes <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
      </Link>
      <Link href="/#consultation" className="inline-flex min-h-[54px] items-center justify-center gap-3 border border-white/30 px-6 py-4 text-[11px] font-semibold uppercase tracking-[.13em] text-white transition-colors hover:bg-white/10">Personal consultation <ArrowUpRight size={17}/></Link>
     </div>
    </div>
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-6 text-[10px] font-semibold uppercase tracking-[.14em] text-white/65 sm:mt-14"><span className="inline-flex items-center gap-2"><Compass size={14} className="text-[#E8D0A8]"/> Official-source research</span><span>Thoughtful guidance</span><span>France / Europe</span></div>
   </div>
   <div className="relative grid min-h-[360px] grid-cols-12 gap-3 sm:min-h-[560px] sm:gap-4 lg:col-span-6 lg:min-h-[610px] xl:col-span-6" aria-label="Editorial images of Paris">
    <div aria-hidden className="absolute -left-4 -top-4 hidden h-[72%] w-[75%] border border-[#E7CCA0]/40 lg:block"/>
    <div className="relative col-span-9 row-span-5 overflow-hidden border-[5px] border-white/15 bg-[#315286] shadow-[0_35px_80px_rgba(1,13,35,.36)] sm:col-span-8 sm:border-[7px]">
     <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1100&q=82" alt="A Paris street looking toward the Eiffel Tower" width={1100} height={1420} className="h-full w-full object-cover object-center" fetchPriority="high"/>
     <div className="absolute inset-0 bg-gradient-to-t from-[#071C3F]/45 via-transparent to-transparent"/>
     <div className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-[.26em] text-white/90 sm:bottom-8 sm:left-8">Paris · 48° 51′ N</div>
    </div>
    <div className="relative col-span-3 row-span-2 mt-[38%] flex min-w-0 items-center justify-center border border-[#D9BC8B]/45 bg-[#18386E] p-1 sm:col-span-4 sm:mt-[30%] sm:p-4">
     <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 border border-[#E3CBA6]/40 p-2 text-center sm:gap-4 sm:p-4">
      <span className="font-display text-[clamp(2rem,4vw,4rem)] italic leading-none text-[#E6CDA5]">A.</span>
      <span className="hidden text-[9px] uppercase tracking-[.22em] text-white/60 sm:block">L’art de choisir</span>
     </div>
    </div>
    <div className="relative col-span-3 row-span-3 min-h-0 overflow-hidden border-[3px] border-white/20 bg-[#325288] sm:col-span-4 sm:border-[6px]">
     <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=750&q=80" alt="Paris city rooftops and architecture" width={580} height={760} loading="lazy" className="h-full w-full object-cover"/>
    </div>
    <div className="relative col-span-12 flex min-w-0 flex-col justify-center border-l-[3px] border-[#E8D0A8] bg-[#F8F1E4] px-5 py-4 text-[#143263] shadow-[0_10px_38px_rgba(3,17,42,.19)] sm:col-span-8 sm:-mt-5 sm:ml-9 sm:px-7 sm:py-5 lg:absolute lg:bottom-7 lg:left-3 lg:right-[-12px] lg:ml-0">
     <p className="text-[9px] font-semibold uppercase tracking-[.24em] text-[#9B805B]">Bienvenue à Paris · Votre histoire commence ici</p>
     <div className="mt-1 flex items-end justify-between gap-3"><span className="font-display text-[clamp(1.8rem,4vw,3.2rem)] italic leading-none tracking-tight">A beautiful beginning.</span><ArrowDownRight size={23} className="shrink-0 text-[#987C59]" strokeWidth={1.4}/></div>
    </div>
   </div>
  </div>
  <div className="relative z-10 border-t border-white/10 bg-[#0E264F] px-5 py-4 text-white/65 sm:px-9 lg:px-14">
   <div className="mx-auto flex max-w-[1430px] flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[.18em]"><span>Parisian spirit · Global ambition</span><span className="inline-flex items-center gap-2"><MapPin size={13}/> France awaits</span></div>
  </div>
 </section>;
}
