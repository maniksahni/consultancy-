import Link from "next/link";
import {ArrowUpRight,BookOpen,ClipboardCheck,PlaneTakeoff} from "lucide-react";
const services=[
 {number:"01",eyebrow:"The discovery",title:"Find a direction.",italic:"Then make it yours.",body:"Go beyond glossy university names. Search official programme records, understand the city and discipline, and make a shortlist you can explain.",caption:"CURATED RESEARCH / OFFICIAL SOURCE LINKS",cta:"Explore French programmes",href:"/france/programmes",image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1100&q=78",alt:"Parisian rooftops and historic architecture",icon:BookOpen},
 {number:"02",eyebrow:"The application",title:"Every detail.",italic:"Considered.",body:"The right Campus France pathway, clear documentation, scholarship research and consistent application information. A considered process, never a guaranteed outcome.",caption:"CAMPUS FRANCE / ÉTUDES EN FRANCE",cta:"Understand the application route",href:"/france/campus-france",image:"https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1100&q=78",alt:"Eiffel Tower rising above Paris",icon:ClipboardCheck},
 {number:"03",eyebrow:"The arrival",title:"Beyond the offer.",italic:"Into a new life.",body:"Prepare for France with realistic research into visa steps, the student budget, accommodation and the everyday practicalities of a new city.",caption:"VISAS / HOUSING / STUDENT LIFE",cta:"Explore student resources",href:"/france/resources",image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1100&q=78",alt:"A classic Parisian street",icon:PlaneTakeoff},
];
export default function AltheaAtelierServices(){return <section aria-labelledby="services-heading" className="bg-[#F1ECE4] px-5 py-20 text-[#173565] sm:px-9 lg:px-14 lg:py-28">
 <div className="mx-auto max-w-[1328px]">
  <div className="mb-12 grid gap-6 border-b border-[#173565]/15 pb-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#9B805B]">02 / L'accompagnement</p><h2 id="services-heading" className="mt-5 font-display text-[clamp(3.3rem,7vw,6.8rem)] leading-[.94] tracking-[-.045em]">Designed around<br/><em>your ambition.</em></h2></div><p className="max-w-md text-sm leading-8 text-[#576981] lg:col-span-4">Three thoughtful chapters, one clear purpose: informed decisions for a future in France.</p></div>
  <div className="space-y-7 lg:space-y-12">{services.map((item,i)=>{
   const Icon=item.icon;
   return <article key={item.number} className={"grid min-w-0 items-stretch overflow-hidden border border-[#173565]/15 bg-[#FCFAF6] lg:min-h-[480px] lg:grid-cols-12 "+(i%2===1?"lg:[&_.chapter-visual]:order-1 lg:[&_.chapter-content]:order-2":"")}>
    <div className="chapter-content flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-12 lg:col-span-6 xl:px-14 xl:py-14">
     <div><div className="flex items-start justify-between gap-4"><span className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#A58B62]">Chapitre {item.number} / {item.eyebrow}</span><Icon size={26} strokeWidth={1.3} className="shrink-0 text-[#A58B62]"/></div><h3 className="mt-10 font-display text-[clamp(2.9rem,5.1vw,5.5rem)] leading-[.95] tracking-[-.04em]">{item.title}<br/><em>{item.italic}</em></h3><p className="mt-7 max-w-md text-sm leading-8 text-[#566A82]">{item.body}</p></div>
     <Link href={item.href} className="group mt-10 inline-flex min-h-12 w-fit items-center gap-3 border-b border-[#173565] py-3 text-[11px] font-semibold uppercase tracking-[.1em]">{item.cta}<ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link>
    </div>
    <div className="chapter-visual relative min-h-[260px] overflow-hidden bg-[#2D5289] sm:min-h-[390px] lg:col-span-6 lg:min-h-[480px]">
     <img src={item.image} alt={item.alt} width={1150} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.035]"/>
     <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091F45]/65 via-transparent to-transparent"/>
     <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3 text-white sm:bottom-9 sm:left-9 sm:right-9">
      <p className="max-w-[80%] text-[10px] font-semibold uppercase tracking-[.2em] leading-6">{item.caption}</p>
      <span className="font-display text-5xl italic text-[#E8CFA5] sm:text-6xl">{item.number}</span>
     </div>
    </div>
   </article>;
  })}</div>
 </div>
 </section>}
