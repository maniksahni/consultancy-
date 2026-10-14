import {notFound} from 'next/navigation';import {programmeResearch} from '@/data/programmeResearch';import ProgrammeEvidence from '@/components/althea/ProgrammeEvidence';
export function generateStaticParams(){return programmeResearch.map(p=>({slug:p.slug}));}
export function generateMetadata({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);return {alternates: {canonical: `/programmes/${params.slug}`},title:p?.title||'Programme'};}
export default function Programme({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);if(!p)notFound();return <ProgrammeEvidence p={p}/>}
