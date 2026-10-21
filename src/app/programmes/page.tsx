import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import { programmeResearch } from "@/data/programmeResearch";
import ProgrammeResearchFinder from '@/components/althea/ProgrammeResearchFinder';
import { Section } from "@/components/maison/ui";
export const metadata=pageMetadata('/programmes', {title: "Master's Programmes Abroad: Fees & Dates", description: 'Search in-site programme records with published tuition, entry requirements and application dates, with official sources and labelled planning estimates.'});
export default function Directory(){return <Page path="/programmes" items={programmeResearch.map((p) => ({ name: `${p.title}, ${p.institution}`, path: `/programmes/${p.slug}` }))} eyebrow="THE GLOBAL PROGRAMME COLLECTION" title="Find your" accent="programme." intro="Compare study options across seven destinations with tuition, application timing, entry preparation and clear source links."><Section tone="ivory"><ProgrammeResearchFinder/></Section></Page>}
