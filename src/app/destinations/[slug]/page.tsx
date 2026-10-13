import type {Metadata} from "next";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {AltheaHeader,AltheaFooter} from "@/components/althea/SiteChrome";
const destinations:{[key:string]:string}={uk:"United Kingdom",usa:"United States",canada:"Canada",australia:"Australia",germany:"Germany",ireland:"Ireland"};
export function generateStaticParams(){return Object.keys(destinations).map(slug=>({slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{
 return {title:(destinations[params.slug]||"Study destinations")+" | Althéa Consulting",description:"Althéa Consulting is presently focused on helping students explore study opportunities in France.",robots:{index:false,follow:true}};
}
export default function DestinationPage({params}:{params:{slug:string}}){const name=destinations[params.slug]||"this destination";return <main className="min-h-screen bg-[#FCFAF6] text-[#173969]"><AltheaHeader/>
 <section className="bg-[#142E61] px-5 py-20 text-white sm:px-9 lg:px-14 lg:py-32"><div className="mx-auto max-w-[1328px]"><p className="text-xs uppercase tracking-[.28em] text-[#E2C596]">Althéa / France specialists</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(3.7rem,8vw,7rem)] leading-[.94]">Your next chapter <br/><em className="text-[#E2C596]">in France.</em></h1><p className="mt-8 max-w-2xl text-base leading-8 text-white/75">You opened an earlier {name} destination guide. Althéa now focuses its published research and guidance on studying in France, so this legacy destination guide is no longer maintained.</p><Link href="/france" className="mt-8 inline-flex min-h-12 items-center gap-3 bg-[#E2C596] px-7 py-3 text-xs font-semibold uppercase tracking-[.13em] text-[#173969]">Explore France <ArrowRight size={18}/></Link></div></section><AltheaFooter/></main>;}