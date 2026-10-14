import { pageMetadata } from "@/lib/seo";
import {notFound} from 'next/navigation';import {programmeResearch} from '@/data/programmeResearch';import ProgrammeEvidence from '@/components/althea/ProgrammeEvidence';
export function generateStaticParams(){return programmeResearch.map(p=>({slug:p.slug}));}
const searchTitles:Record<string,string>={
  "bath-operations-logistics":"Bath MSc Operations & Supply Chain",
  "tse-international-economics":"TSE International Economics MSc",
  "melbourne-data-science":"Melbourne Data Science MSc",
  "rmit-data-science":"RMIT Data Science Master's",
  "uci-data-science":"UC Irvine Data Science Master's",
};
export function generateMetadata({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);const description=p?(p.slug==="bath-operations-logistics"?"Bath MSc in operations and supply chain: published tuition, entry requirements and application timing.":`${p.title} at ${p.institution}: published tuition, requirements and application timing.`):undefined;return pageMetadata(`/programmes/${params.slug}`, {title:searchTitles[params.slug]||p?.title||'Programme', description });}
export default function Programme({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);if(!p)notFound();return <ProgrammeEvidence p={p}/>}
