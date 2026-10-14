import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';import ProgrammeSearch from '@/components/althea/ProgrammeSearch';
export const metadata=pageMetadata('/france/programmes', {title: 'French Degree Programmes: Research Your Options'});
export default function Programmes(){return <Page eyebrow="THE ACADEMIC COLLECTION" title="Find what moves your mind." intro="Explore official-source-linked programme examples, filter by subject and continue your research with the institution."><ProgrammeSearch/></Page>}
