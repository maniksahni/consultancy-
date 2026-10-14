import { pageMetadata } from "@/lib/seo";
import {notFound} from 'next/navigation';import Page from '@/components/althea/Page';import {guides} from '@/data/franceGuides';
export function generateStaticParams(){return guides.map(g=>({topic:g.slug}));}
const searchDescriptions:Record<string,string>={
  costs:"Compare tuition, accommodation and living costs in France. Fees vary by institution, programme, nationality and exemption eligibility.",
  living:"Plan student accommodation, transport and daily life in France. Research housing early and use trusted official resources.",
  scholarships:"Explore French scholarships by nationality, field and degree level. Confirm eligibility, deadlines and application steps with each award provider.",
  visas:"French student visa requirements depend on nationality, residence and course. Confirm current documents and rules through France-Visas.",
  faq:"Clear answers about French universities, application procedures, scholarships, fees and student visas, with official sources to check next.",
};
const searchTitles:Record<string,string>={
  costs:"Study Costs in France",
  living:"Student Life in France",
  scholarships:"France Scholarships Guide",
  visas:"France Student Visa Guide",
  faq:"France Study FAQ",
};
export function generateMetadata({params}:{params:{topic:string}}){const g=guides.find(x=>x.slug===params.topic);return pageMetadata(`/france/${params.topic}`, {title:searchTitles[params.topic] || (g?g.title+' '+g.accent:'France guide'), description: searchDescriptions[params.topic] || g?.summary });}
export default function Guide({params}:{params:{topic:string}}){const g=guides.find(x=>x.slug===params.topic);if(!g)notFound();return <Page eyebrow={g.eyebrow} title={g.title+' '+g.accent} intro={g.summary}><div className="planning-grid">{g.entries.map((e,i)=><article key={e.title}><p className="eyebrow">0{i+1} / {e.source}</p><h3>{e.title}</h3><p>{e.description}</p><a href={e.url} target="_blank" rel="noopener noreferrer">Official resource ↗</a></article>)}</div>{g.questions&&<div className="prose" style={{marginTop:50}}>{g.questions.map(q=><section key={q.q}><h2>{q.q}</h2><p>{q.a}</p><a href={q.url} target="_blank" rel="noopener noreferrer">Read the official guidance ↗</a></section>)}</div>}</Page>}
