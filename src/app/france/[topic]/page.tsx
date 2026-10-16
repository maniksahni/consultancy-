import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
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
  costs:"Cost of Studying in France 2026",
  living:"Student Life & Housing in France",
  scholarships:"Scholarships to Study in France",
  visas:"France Student Visa Guide 2026",
  faq:"France Study FAQ",
};
export function generateMetadata({params}:{params:{topic:string}}){const g=guides.find(x=>x.slug===params.topic);return pageMetadata(`/france/${params.topic}`, {title:searchTitles[params.topic] || (g?g.title+' '+g.accent:'France guide'), description: searchDescriptions[params.topic] || g?.summary });}
export default function Guide({params}:{params:{topic:string}}){const g=guides.find(x=>x.slug===params.topic);if(!g)notFound();return <Page path={`/france/${params.topic}`} eyebrow={g.eyebrow} title={g.title+' '+g.accent} intro={g.summary}>{g.questions && <JsonLd data={{
  "@context": "https://schema.org", "@type": "FAQPage",
  "@id": `${absoluteUrl(`/france/${g.slug}`)}#faq`,
  mainEntity: g.questions.map(q => ({ "@type": "Question", name: q.q,
    acceptedAnswer: { "@type": "Answer", text: q.a } })),
}} />}<div className="planning-grid">{g.entries.map((e,i)=><article key={e.title}><p className="eyebrow">0{i+1} / {e.source}</p><h3>{e.title}</h3><p>{e.description}</p><p className="muted">Use this source to confirm the details for your own programme, nationality and academic year.</p><a className="text-link" href={e.url} target="_blank" rel="noreferrer">Open {e.source} ↗</a></article>)}</div>{g.questions&&<div className="prose" style={{marginTop:50}}>{g.questions.map(q=><section key={q.q}><h2>{q.q}</h2><p>{q.a}</p><a className="text-link" href={q.url} target="_blank" rel="noreferrer">Verify with the official source ↗</a></section>)}</div>}<section className="prose" style={{marginTop:50}}><h2>Turn research into a decision.</h2><p>For each option, save the official link, the date you checked it, the entry requirements, teaching language, full cost and deadline. Compare like with like, then contact the institution or authority when a detail is unclear.</p><p className="muted">Guidance checked 14 October 2026. Rules, prices and calendars can change; always follow the current official instructions.</p></section></Page>}
