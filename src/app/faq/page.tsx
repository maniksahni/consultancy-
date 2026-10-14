import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import FAQ from "@/components/althea/FAQ";
export const metadata: Metadata = pageMetadata('/faq', {
  title: 'France Study & Arrival FAQ',
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
        <Link href="/campus-france-guide">Application procedure guide ↗</Link>
        <br />
        <Link href="/france/visas">Student visa guide ↗</Link>
      </div>
    </Page>
  );
}
