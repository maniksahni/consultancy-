import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import JobsExplorer from "@/components/althea/JobsExplorer";
import LiveJobs from "@/components/althea/LiveJobs";
import { pageMetadata } from "@/lib/seo";
import { Card, Grid, Section } from "@/components/maison/ui";
import { countryGuides } from "@/data/guides";

export const metadata: Metadata = pageMetadata("/jobs", {
  title: "Jobs Across France and Six Countries",
  description: "Find jobs, internships and work-study pathways across France, the UK, USA, Canada, Germany, Australia and Ireland. Check official work rules.",
});

export default function JobsPage() {
  return (
    <Page
      path="/jobs"
      imagePlacement="/jobs"
      eyebrow="CAREER OPPORTUNITIES · FRANCE & SIX DESTINATIONS"
      title="Your next move"
      accent="starts here."
      intro="Explore roles, internships and work-study pathways across France, the UK, USA, Canada, Germany, Australia and Ireland with official statutory work rights and ATS resume standards."
    >
      <Section tone="ivory" id="live-jobs" kicker="JOB BOARD · 5,000+ OPEN ROLES" title="Real jobs." accent="Apply today." intro="Open roles, internships and alternance in Paris, London, Berlin and beyond — straight from the career pages of Doctolib, Datadog, Ubisoft, Accor, Qonto, Stripe and 70 more companies. Read the full description, learn the French words for each job, check your CV against it with our free ATS checker — then apply on the original posting.">
        <LiveJobs />
      </Section>
      <JobsExplorer />
      <Section tone="paper" kicker="CAREER GUIDES · SEVEN COUNTRIES" title="Jobs, salaries and" accent="work rights, by country." intro="Where graduates get hired, typical starting salaries, where to search, part-time work rules and how to stay after your degree.">
        <Grid cols={3}>{countryGuides.map((g, i) => {
          const jobs = g.chapters.find((c) => c.slug === "jobs")!;
          const after = g.chapters.find((c) => c.slug === "after-graduation")!;
          return <Card key={g.country} index={i + 1} kicker={g.name.toUpperCase()} title={`Jobs in ${g.prose}`} href={jobs.path} cta="Read the jobs guide"><p>{jobs.summary}</p><p className="ms-card-note">{after.facts?.[0] ? `After graduation · ${after.facts[0].label}: ${after.facts[0].value}` : after.label}</p></Card>;
        })}</Grid>
      </Section>
    </Page>
  );
}
