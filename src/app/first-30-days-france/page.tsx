import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Card, Checklist, Grid, Kicker, Notice, Section, TextLink } from "@/components/maison/ui";
import { ArrowDownToLine } from "lucide-react";

export const metadata = pageMetadata("/first-30-days-france", {
  title: "First 30 Days in France Checklist",
  description: "Your first 30 days in France as a student, step by step: validate your VLS-TS, open a bank account, get a SIM, apply for CAF, health cover and transport.",
});

const groups = [
  ["Before and just after arrival", "Keep passport, admission and accommodation records together", "Save emergency and university contact details", "Arrange a French SIM or other reliable way to stay connected", "Check local transport options and passes"],
  ["First two weeks", "Ask your bank what documents it needs; requirements vary", "Check your institution’s arrival and enrolment instructions", "Review health insurance and student administration steps", "Keep copies and dates for official paperwork and appointments"],
  ["First month", "If eligible, read current CAF housing-aid information and gather questions", "Learn the local routines: shops, healthcare access and transport", "Update your CV and LinkedIn with a France-ready direction", "Choose one realistic study, language or career goal for the next month"],
];

export default function FirstThirtyDaysPage() {
  return <Page path="/first-30-days-france" eyebrow="FREE STUDENT RESOURCE" title="Your first 30 days" accent="in France." intro="A simple checklist for the practical things that can make settling into a new country feel more manageable.">
    <Section tone="ivory" kicker="KEEP IT HANDY" title="Take the checklist" accent="with you." intro="Download a plain, printable copy and work through it at your own pace. Some steps depend on your city, status and individual circumstances—always confirm requirements with the relevant official service." action={<a className="ms-btn ms-btn-gold" href="/downloads/first-30-days-france-checklist.txt" download><span>Download the free checklist</span><ArrowDownToLine size={17} aria-hidden="true" /></a>}>
      <Grid cols={3}>{groups.map(([title, ...items], i) => <Card key={title} index={i + 1} title={title}><Checklist items={items} /></Card>)}</Grid>
      <Notice kicker="WANT PERSONAL GUIDANCE?"><p className="ms-notice-title">Get help with the steps <em>that matter to you.</em></p><TextLink href="/settle-in-france">Explore Settle in France packages</TextLink></Notice>
    </Section>
  </Page>;
}
