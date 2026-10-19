import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import UniversityExplorer from '@/components/althea/UniversityExplorer';
import { Card, Grid, Section } from "@/components/maison/ui";
export const metadata=pageMetadata('/universities', {title: 'University Finder: Fees & Courses Abroad', description: 'Compare researched universities, programmes, tuition and student living guidance across France and six other destinations.'});
export default function Directory(){return <Page path="/universities" eyebrow="THE ALTHÉA UNIVERSITY DIRECTORY" title="Choose with" accent="the full picture." intro="Search university and course records across the destinations where public catalogue data is available. Compare published tuition, entry preparation, application timing and country-level living and accommodation guidance—all here on the site."><Section tone="ivory"><UniversityExplorer/></Section><Section tone="paper" kicker="BEFORE YOU APPLY" title="Turn your shortlist" accent="into a checked plan."><Grid cols={3}>
  <Card title="French universities, A–Z" href="/france/universities" cta="Read institution profiles"><p>Explore individual French institutions, their recorded programmes and the limits of catalogue data.</p></Card>
  <Card title="Choose the correct application route" href="/campus-france-guide" cta="Read the Campus France guide"><p>Separate course discovery from the portal and steps that apply to your own profile.</p></Card>
  <Card title="Compare total cost" href="/france/costs" cta="Plan your France budget"><p>Check fee category, academic year and city living costs before comparing course prices.</p></Card>
</Grid></Section></Page>}
