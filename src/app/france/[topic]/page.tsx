import type { Metadata } from "next";
import { guides, getGuide } from "@/data/franceGuides";
import FranceGuidePage from "@/components/althea/FranceGuidePage";
export function generateStaticParams(){ return guides.map(g=>({topic:g.slug})); }
export function generateMetadata({params}:{params:{topic:string}}):Metadata{
 const guide=getGuide(params.topic);
 return {title:guide?guide.title+" "+guide.accent+" | Althéa Consulting":"Study in France | Althéa Consulting",description:guide?.summary||"Useful, source-backed study in France information.",alternates:{canonical:"/france/"+params.topic}};
}
export default function Topic({params}:{params:{topic:string}}){
 const guide=getGuide(params.topic);
 if(!guide) return <main className="p-10"><h1>Guide not found</h1></main>;
 return <FranceGuidePage guide={guide}/>;
}
