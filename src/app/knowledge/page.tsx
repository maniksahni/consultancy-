import Link from "next/link";
import { countryGuides } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import KnowledgeHub from '@/components/althea/KnowledgeHub';
import BudgetPlanner from '@/components/althea/BudgetPlanner';
import { planningChecklist } from '@/data/studyKnowledge';
import { Card, Checklist, Grid, Section } from "@/components/maison/ui";
export const metadata=pageMetadata('/knowledge', {title:'Study Abroad Guide 2026: 7 Countries',description:'Source-reviewed guidance for seven countries: applications, costs, scholarships, visas, employment, graduation and practical checklists.'});
export default function Knowledge() {
  return <Page path="/knowledge" eyebrow="THE OCTOBER 2026 EDITION" title="Better information." accent="Better decisions." intro="Explore the requirements behind the dream. Start with France (six more countries coming soon), follow the official evidence and build your own practical study plan.">
    <Section tone="ivory" kicker="SEVEN COUNTRIES · ONE LIBRARY" title="The guidance," accent="properly sourced." intro="Choose a destination and a chapter, search for what matters and download the results as your own plan.">
      <KnowledgeHub />
    </Section>
    <Section tone="paper" kicker="READ BY DESTINATION" title="Find the right guide" accent="for your next decision." intro="Application routes, tuition planning and visa preparation, with official sources inside each guide.">
      <Grid cols={3}>{countryGuides.map(guide => <Card key={guide.country} title={`Study in ${guide.prose}`}>
        <p><Link href={guide.hubPath}>Read the complete {guide.name} guide</Link></p>
        <ul>{["admissions", "costs", guide.country === "france" ? "visas" : "visa"].map(slug => guide.chapters.find(chapter => chapter.slug === slug)).filter(chapter => chapter !== undefined).map(chapter => <li key={chapter.path}><Link href={chapter.path}>{chapter.label}</Link></li>)}</ul>
      </Card>)}</Grid>
    </Section>
    <Section tone="paper"><BudgetPlanner /></Section>
    <Section tone="ink" kicker="YOUR APPLICATION WORKSPACE" title="Prepare" accent="with purpose." intro="An adaptable planning checklist. The institution and immigration authority provide your exact required documents.">
      <Grid cols={3}>{planningChecklist.map((g, i) => <Card key={g.title} index={i + 1} title={g.title}><Checklist items={g.items} /></Card>)}</Grid>
    </Section>
    <Section tone="ivory" id="coverage" kicker="TRANSPARENT BY DESIGN" title="What this review" accent="covers.">
      <Grid cols={3}>{[['Country guidance','Official-source summaries checked on 14 October 2026. Page reviews, official search listings and planning advice are labelled separately. A reviewed date is not the effective date of a rule.'],['University data','Search French institution and course records (more destinations coming soon), with sourced course listings and detailed programme profiles. Coverage and source dates are stated by country; registry coverage differs from live admission availability.'],['Costs & deadlines','Published visa thresholds include their conditions. The programme research desk lists university-published fees and calendars directly. Every listed course has a published tuition figure or a sourced planning estimate. Calendar planning, historical evidence and confirmed dates are labelled separately, with practical preparation steps.']].map(([t,p],i)=><Card key={t} index={i+1} title={t}><p>{p}</p></Card>)}</Grid>
    </Section>
  </Page>;
}
