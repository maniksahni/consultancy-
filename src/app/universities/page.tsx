import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import UniversityExplorer from '@/components/althea/UniversityExplorer';
export const metadata=pageMetadata('/universities', {title: 'Universities, Programmes & Student Costs', description: 'Search reviewed universities and programme records across France, the UK, USA, Canada, Germany, Australia and Ireland. Compare published tuition and student living guidance in one place.'});
export default function Directory(){return <Page eyebrow="THE ALTHÉA UNIVERSITY DIRECTORY" title="Choose with the full picture." intro="Search universities and researched programmes across all seven study destinations. Compare published tuition, entry preparation, application timing and country-level living and accommodation guidance—all here on the site."><UniversityExplorer/></Page>}
