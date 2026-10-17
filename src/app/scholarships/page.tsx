import { pageMetadata } from "@/lib/seo";
import { studyKnowledge } from "@/data/studyKnowledge";
import { chapterForTopic } from "@/data/guides/paths";
import { destinations } from "@/data/destinations";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Card, Checklist, Grid, Notice, Section, Steps, TextLink } from "@/components/maison/ui";

export const metadata: Metadata = pageMetadata('/scholarships', {
  title: 'Study Abroad Scholarships & Funding',
  description:
    "Study abroad scholarships for Indian students: France Eiffel, DAAD and university awards, with eligibility, coverage and deadlines from official sources.",
});
export default function Content() {
  const awards = studyKnowledge.filter(entry => entry.topic === "Scholarships");
  return (
    <Page path="/scholarships" eyebrow="FUNDING, CAREFULLY RESEARCHED" title="Research" accent="your funding." intro="Use official award information and plan without assuming an award.">
      <Section tone="ivory" kicker="SEVEN DESTINATIONS" title="Where funding" accent="is published." intro="Each card opens the full scholarships chapter for that country: who can apply, what is covered and when to apply.">
        <Grid cols={3}>{awards.map(entry => <Card key={entry.id} kicker={destinations.find(d => d.slug === entry.country)?.name} title={entry.title} href={chapterForTopic(entry.country, "Scholarships")} cta={`Read the ${destinations.find(d => d.slug === entry.country)?.name} scholarships chapter`}>
          <p>{entry.summary}</p>
          <p className="ms-card-note">{entry.effective || "Award eligibility, coverage and deadlines follow the individual competition."}</p>
        </Card>)}</Grid>
      </Section>
      <Section tone="ink" kicker="A METHOD THAT HOLDS UP" title="From eligibility" accent="to a realistic plan." align="split">
        <Steps items={[
          { title: "Start with eligibility", body: <p>Scholarships have their own eligibility criteria and application calendars. Check your nationality, chosen degree, academic background and whether an institution must nominate you.</p> },
          { title: "Check who needs to act", body: <><p>Some awards accept a student application; others require a French institution to nominate the candidate. For the France Excellence Eiffel programme, the institution submits the nomination, so contact its international or scholarship office early and ask for its internal deadline.</p><TextLink href="/france/scholarships">Explore scholarship guidance</TextLink></> },
          { title: "Build a realistic plan", body: <p>Record deadlines, required evidence and the awarding organisation. Confirm whether the funding covers tuition, living costs or a limited contribution.</p> },
          { title: "Compare the funding with your real costs", body: <p>Write down what the award covers, how long it lasts, when payments begin, whether renewal depends on academic progress and which expenses remain yours. Confirm whether funding can be combined with other support, and keep a backup plan until the awarding body confirms the result in writing.</p> },
        ]} />
      </Section>
      <Section tone="paper" kicker="YOUR FUNDING CHECKLIST" title="Four questions" accent="for every award.">
        <Checklist columns={2} items={["Eligibility: nationality, degree level, subject and academic record.", "Application path: direct application, university nomination or another route.", "Coverage: tuition, living allowance, travel or a limited contribution.", "Timing: student deadline, internal nomination deadline and result date."]} />
        <Notice kicker="INDEPENDENT GUIDANCE"><p>Althéa can help you organise research and questions. Awarding bodies and institutions decide eligibility and funding.</p></Notice>
      </Section>
    </Page>
  );
}
