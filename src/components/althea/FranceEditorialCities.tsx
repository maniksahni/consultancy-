import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
const cities=[
 {name:"Paris",quote:"Culture, intellect & possibility.",image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1100&q=75",alt:"Paris avenue and Eiffel Tower",tag:"Île-de-France",span:"lg:col-span-6"},
 {name:"Lyon",quote:"A city to learn and grow.",image:"https://images.unsplash.com/photo-1524396309943-e03f5249f002?auto=format&fit=crop&w=1100&q=75",alt:"French old-town architecture",tag:"Auvergne-Rhône-Alpes",span:"lg:col-span-6"},
 {name:"Bordeaux",quote:"Where heritage meets new ideas.",image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1100&q=75",alt:"French urban rooftops",tag:"Nouvelle-Aquitaine",span:"lg:col-span-5"},
 {name:"Grenoble",quote:"Innovation against the Alps.",image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=75",alt:"Mountain scenery representing the Alpine region",tag:"Auvergne-Rhône-Alpes",span:"lg:col-span-7"}
];
export default function FranceEditorialCities(){
 return <section aria-labelledby="althea-city-heading" className="bg-[#F6F2EA] px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
  <div className="mx-auto max-w-[1328px]">
   <div className="mb-10 grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#AB9065]">03 / Les destinations</p><h2 id="althea-city-heading" className="mt-5 max-w-3xl font-display text-[clamp(3.2rem,6vw,6rem)] leading-[.93] tracking-tight text-[#163463]">Find a place to <em>belong.</em></h2></div><div className="lg:col-span-4"><p className="text-sm leading-8 text-[#607089]">France isn't one experience. Explore distinctive student cities and discover universities through official institutional sources.</p><Link href="/france/universities" className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-[#173969] text-xs font-semibold text-[#173969]">Find your university <ArrowUpRight size={17}/></Link></div></div>
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">{cities.map((city,index)=>
    <Link href="/france/universities" key={city.name} className={"group relative isolate flex min-h-[280px] min-w-0 flex-col justify-between overflow-hidden border border-[#163463]/10 bg-[#254C83] p-6 text-white transition-transform duration-300 hover:-translate-y-1 sm:min-h-[340px] sm:p-8 lg:min-h-[430px] "+city.span}>
     <img src={city.image} alt={city.alt} width={1024} height={720} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"/>
     <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071E42]/55 via-[#071E42]/5 to-[#071E42]/75"/>
     <div className="flex flex-wrap items-start justify-between gap-4"><span className="border border-white/50 bg-[#061D40]/20 px-3 py-2 text-[10px] uppercase tracking-[.2em] backdrop-blur-sm">0{index+1} / {city.tag}</span><ArrowUpRight size={20} strokeWidth={1.5}/></div>
     <div><h3 className="font-display text-5xl leading-[.95] tracking-[-.02em] sm:text-6xl">{city.name}</h3><p className="mt-3 max-w-md text-sm text-white/85">{city.quote}</p><span className="mt-5 inline-block border-b border-[#E7CCA0]/70 pb-2 text-[10px] font-semibold uppercase tracking-[.2em]">Explore institutions ↗</span></div>
    </Link>
   )}</div>
   <p className="mt-4 text-xs leading-6 text-[#6D798E]">Editorial photography is illustrative; always check the university's actual location before applying.</p>
  </div>
 </section>;
}