import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import JobsExplorer from "@/components/althea/JobsExplorer";
import LiveJobs from "@/components/althea/LiveJobs";
import { pageMetadata } from "@/lib/seo";
import { Card, Grid, Section } from "@/components/maison/ui";
import { countryGuides } from "@/data/guides";
import { quickAnswers } from "@/data/quickAnswers";
import { isLive } from "@/lib/comingSoon";

export const metadata: Metadata = pageMetadata("/jobs", {
  title: "Live Jobs in France for Internationals",
  description: "Thousands of live jobs, internships and alternance in France, updated daily, with the French words for each job and a free CV check. More countries soon.",
});

export default function JobsPage() {
  return (
    <Page
      path="/jobs" faqs={quickAnswers["/jobs"]}
      imagePlacement="/jobs"
      eyebrow="CAREER OPPORTUNITIES · FRANCE"
      title="Your next move"
      accent="starts here."
      intro="Explore roles, internships and work-study pathways across France, with official work rights and ATS resume standards. Six more countries are coming soon."
    >
      <Section tone="ivory" id="live-jobs" kicker="JOB BOARD · 14,000+ OPEN ROLES" title="Real jobs." accent="Apply today." intro="Open roles, internships and alternance in Paris, Lyon, Toulouse and across France — straight from the career pages of Sanofi, Airbus, Thales, Doctolib, Ubisoft, Accor, Qonto and 290 more employers, plus recruitment agencies hiring for their clients in France, such as Hays and Robert Half. Read the full description, learn the French words you need to know for each job, check your CV against it with our free ATS checker — then apply on the original posting.">
        <LiveJobs />
      </Section>
      <JobsExplorer />
      <Section tone="paper" kicker="CAREER GUIDE · FRANCE" title="Jobs, salaries and" accent="work rights in France." intro="Where graduates get hired, typical starting salaries, where to search, part-time work rules and how to stay after your degree. Guides for six more countries are coming soon.">
        <Grid cols={3}>{countryGuides.filter((g) => isLive(g.country)).map((g, i) => {
          const jobs = g.chapters.find((c) => c.slug === "jobs")!;
          const after = g.chapters.find((c) => c.slug === "after-graduation")!;
          return <Card key={g.country} index={i + 1} kicker={g.name.toUpperCase()} title={`Jobs in ${g.prose}`} href={jobs.path} cta="Read the jobs guide"><p>{jobs.summary}</p><p className="ms-card-note">{after.facts?.[0] ? `After graduation · ${after.facts[0].label}: ${after.facts[0].value}` : after.label}</p></Card>;
        })}</Grid>
      </Section>
    </Page>
  );
}
