import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Card, Grid, Section } from "@/components/maison/ui";
import { GuideChapterIndex } from "@/components/guides/GuideChapterPage";
import { indiaGuide } from "@/data/guides/india";
import { countryGuides } from "@/data/guides";

const intro = "A month-by-month timeline, loans, sending money, documents, language tests, packing, scams to avoid, a guide for parents and coming home: the steps every Indian student takes whichever country they choose, answered on one site and checked against official Indian and foreign sources.";
export const metadata = pageMetadata("/from-india", {
  title: "Study Abroad from India: The Essentials",
  description: "Study abroad from India: a month-by-month timeline, education loans, LRS and TCS, apostille, IELTS vs PTE, packing, scams, a parents' guide, coming home.",
});
export default function FromIndia() {
  return <Page path="/from-india" modified={indiaGuide.chapters[0].reviewedAt} eyebrow="FOR INDIAN STUDENTS · EVERY DESTINATION" title="Leaving India" accent="to study, step by step." intro={intro}
    about={{ "@type": "Country", name: "India" }}
    closing={{ kicker: "YOUR OWN PLAN", title: "Questions about", accent: "studying abroad from India?", body: "Bring your profile, budget and timeline. We will turn these chapters into a plan for you.", href: "/book-consultation", action: "Book a consultation" }}>
    <Section tone="ivory" kicker={`THE COMPLETE INDIAN STUDENT GUIDE · ${indiaGuide.chapters.length} CHAPTERS`} title="What every destination" accent="has in common." intro="Each chapter is written for students and parents in India, with Indian rules (RBI, Income Tax, MEA, UGC) and the rules of the country you land in side by side.">
      <GuideChapterIndex guide={indiaGuide} />
    </Section>
    <Section tone="paper" kicker="THEN, YOUR COUNTRY" title="Seven complete" accent="country guides.">
      <Grid cols={3}>
        {countryGuides.map((g) => <Card key={g.country} title={`Study in ${g.prose}`} href={g.hubPath} cta="Open the guide">
          <p>{g.chapters.length} chapters, from admissions and costs to the visa and your first job.</p>
        </Card>)}
      </Grid>
    </Section>
  </Page>;
}
