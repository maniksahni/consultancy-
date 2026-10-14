import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';import UniversityExplorer from '@/components/althea/UniversityExplorer';import Link from 'next/link';
export const metadata=pageMetadata('/france/universities', {title:'French university discovery'});
export default function Universities(){return <Page eyebrow="ACADEMIC POSSIBILITIES" title="An institution. A new perspective." intro="A curated introduction to researched French university programmes, published tuition, entry preparation and application timing. Details stay on this site."><p style={{marginBottom:30}}><Link className="text-link" href="/france/institutions">Browse the in-site institution registry →</Link></p><UniversityExplorer initialCountry="france"/></Page>}
