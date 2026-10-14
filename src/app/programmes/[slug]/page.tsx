import { pageMetadata } from "@/lib/seo";
import {notFound} from 'next/navigation';import {programmeResearch} from '@/data/programmeResearch';import ProgrammeEvidence from '@/components/althea/ProgrammeEvidence';
export function generateStaticParams(){return programmeResearch.map(p=>({slug:p.slug}));}
export function generateMetadata({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);return pageMetadata(`/programmes/${params.slug}`, {title:p?.title||'Programme', description: p ? `${p.title} at ${p.institution}, ${p.city}. Review tuition, entry requirements and application deadlines with official sources.` : undefined });}
export default function Programme({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);if(!p)notFound();return <ProgrammeEvidence p={p}/>}
