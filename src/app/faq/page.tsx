import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import FAQ from "@/components/althea/FAQ";
import { official } from "@/data/france";
export const metadata: Metadata = pageMetadata('/faq', {
  title: 'Study in France FAQ: Admissions, Language & Consultation',
  description: "Clear answers before your first step.",
});
export default function Content() {
  return (
    <Page
      title={"A few good questions."}
      intro={"Clear answers before your first step."}
    >
      <FAQ />
      <div className="prose">
        <h2>Check the official requirements</h2>
        <a href={official.india}>Campus France India ↗</a>
        <br />
        <a href={official.visa}>France-Visas ↗</a>
      </div>
    </Page>
  );
}
