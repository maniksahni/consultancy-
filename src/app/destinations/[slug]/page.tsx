import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import KnowledgeHub from "@/components/althea/KnowledgeHub";
import { Btn, Card, Chips, Grid, Section, Steps, TextLink } from "@/components/maison/ui";
import { destinations } from "@/data/destinations";
import { GuideChapterIndex } from "@/components/guides/GuideChapterPage";
import { guideFor } from "@/data/guides";
export function generateStaticParams(){return destinations.filter(d=>d.slug!=='france').map(d=>({slug:d.slug}));}
export function generateMetadata({params}:{params:{slug:string}}){return pageMetadata(`/destinations/${params.slug}`, {title:`Study in ${destinations.find(d=>d.slug===params.slug)?.name||'your destination'}`, description: destinations.find(d=>d.slug===params.slug)?.application });}
export default function Destination({ params }: { params: { slug: string } }) {
  const d = destinations.find((d) => d.slug === params.slug);
  if (!d || d.slug === "france") notFound();
  return <Page path={`/destinations/${d.slug}`} eyebrow={`${d.region.toUpperCase()} · ${d.city.toUpperCase()}`} title="Bonjour," accent={`${d.name}.`} intro={d.mood}
    headerActions={<><a href={`#${d.slug}-admissions`}>Admissions</a><a href={`#${d.slug}-costs`}>Costs</a><a href={`#${d.slug}-visa`}>Visa</a><a href="/destinations">← The destination atlas</a></>}
    closing={{ kicker: "LET’S EXPLORE THE POSSIBILITIES", title: "Your future.", accent: "Thoughtfully guided.", body: `Talk through your plans and confirm the support available for ${d.name}.`, href: `/book-consultation?destination=${d.slug}`, action: "Start a conversation" }}>
    <Section tone="ivory" kicker="YOUR OWN WAY FORWARD" title="A destination is only" accent="the beginning." intro={d.planning} action={<TextLink href="/knowledge">Explore our reviewed destination guidance</TextLink>} />
    {guideFor(d.slug) && <Section tone="paper" kicker={`THE COMPLETE ${d.name.toUpperCase()} GUIDE · ${guideFor(d.slug)!.chapters.length} CHAPTERS`} title="Everything, A to Z." accent="On one site." intro={`From choosing a course to your first job in ${guideFor(d.slug)!.prose}: admissions, costs, scholarships, visa, housing, work rights and post-study options, checked against official sources in October 2026.`}>
      <GuideChapterIndex guide={guideFor(d.slug)!} />
    </Section>}
    <Section tone="ivory" kicker="THE OCTOBER 2026 COUNTRY GUIDE" title="Your questions." accent="Properly researched." action={<Btn href={`/programmes?country=${d.slug}`}>Research published programme fees & deadlines</Btn>}>
      <div style={{ marginBottom: 26 }}><Chips items={[["Admissions","admissions"],["Costs","costs"],["Scholarships","scholarships"],["Visa","visa"],["Work & graduation","work-graduation"],["Arrival","arrival-housing"]].map(([label, id]) => ({ label, href: `#${d.slug}-${id}` })).concat([{ label: "Build your budget", href: "/knowledge#budget" }])} /></div>
      <KnowledgeHub country={d.slug} />
    </Section>
    <Section tone="ink" kicker="OFFICIAL RESOURCES FIRST. A PERSONAL PLAN NEXT." title="Make the next step" accent="a considered one.">
      <Grid cols={3}>
        <Card index={1} kicker="FIND YOUR FIT" title="Study & research" href="/knowledge" cta="Explore study guidance"><p>{d.focus}. Start with the programme curriculum, teaching language and entry requirements.</p></Card>
        <Card index={2} kicker="BUILD YOUR PLAN" title="Applications"><p>{d.application}</p></Card>
        <Card index={3} kicker="PREPARE YOUR LIFE" title="Funding & arrival"><p>Ask the institution about tuition and scholarships. Plan accommodation, insurance and travel, and check current immigration requirements through the official government source.</p></Card>
      </Grid>
    </Section>
    <Section tone="ivory" kicker="BRING THESE TO YOUR CONVERSATION" title="Your ambition." accent="A clearer direction." align="split">
      <Steps items={['Your qualifications and subject interests','Your preferred intake and study level','Your budget, including daily living costs','Your language preparation and open questions'].map((s) => ({ title: s, body: null }))} />
    </Section>
  </Page>;
}
