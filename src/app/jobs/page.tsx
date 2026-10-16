import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import JobsExplorer from "@/components/althea/JobsExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/jobs", {
  title: "Jobs in France and Six Other Countries | Althéa Consulting",
  description: "Explore job, internship and work-study pathways in France, the UK, USA, Canada, Germany, Australia and Ireland with legal work frameworks and statutory minimums.",
});

export default function JobsPage() {
  return (
    <Page
      path="/jobs"
      image="/images/editorial/france-campus.webp"
      imagePlacement="/jobs"
      eyebrow="CAREER OPPORTUNITIES · FRANCE & SIX DESTINATIONS"
      title="Your next move starts here."
      intro="Explore roles, internships and work-study pathways across France, the UK, USA, Canada, Germany, Australia and Ireland with official statutory work rights and ATS resume standards."
    >
      <JobsExplorer />
    </Page>
  );
}
