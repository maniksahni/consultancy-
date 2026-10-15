import SeoPageSchema from "@/components/seo/SeoPageSchema";
import type { Metadata } from "next";
import { guides, getGuide } from "@/data/franceGuides";
import FranceGuidePage from "@/components/althea/FranceGuidePage";
export function generateStaticParams(){ return guides.map(g=>({topic:g.slug})); }
export function generateMetadata({params}:{params:{topic:string}}):Metadata{
 const guide=getGuide(params.topic);
 return {title:guide?guide.title+" "+guide.accent:"Study in France",description:guide?.summary||"Useful, source-backed study in France information.",alternates:{canonical:"/france/"+params.topic}};
}
export default function Topic({params}:{params:{topic:string}}){
 const guide=getGuide(params.topic);
 if(!guide) return <main className="p-10"><h1>Guide not found</h1></main>;
 return <><SeoPageSchema path={"/france/"+guide.slug} title={guide.title+" "+guide.accent} description={guide.summary} breadcrumbs={[{name:"Study in France",path:"/france"},{name:guide.slug.charAt(0).toUpperCase()+guide.slug.slice(1),path:"/france/"+guide.slug}]}/><FranceGuidePage guide={guide}/></>;
}
