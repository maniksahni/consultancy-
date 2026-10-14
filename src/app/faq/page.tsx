import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import FAQ from "@/components/althea/FAQ";
import { official } from "@/data/france";
export const metadata: Metadata = pageMetadata('/faq', {
  title: 'France Arrival, Career & Study Support FAQ',
  description: "Clear answers about practical France support, career guidance and independent study admissions preparation.",
});
export default function Content() {
  return (
    <Page
      eyebrow="SETTLING · CAREER · STUDY"
      title={"Clear answers before your next step."}
      intro={"What Althéa can help with, what remains with official providers, and how support works."}
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
