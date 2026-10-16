import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import UniversityExplorer from '@/components/althea/UniversityExplorer';
import { Section } from "@/components/maison/ui";
export const metadata=pageMetadata('/universities', {title: 'Universities, Programmes & Student Costs', description: 'Compare researched universities, programmes, tuition and student living guidance across France and six other destinations.'});
export default function Directory(){return <Page path="/universities" eyebrow="THE ALTHÉA UNIVERSITY DIRECTORY" title="Choose with" accent="the full picture." intro="Search university and course records across the destinations where public catalogue data is available. Compare published tuition, entry preparation, application timing and country-level living and accommodation guidance—all here on the site."><Section tone="ivory"><UniversityExplorer/></Section></Page>}
