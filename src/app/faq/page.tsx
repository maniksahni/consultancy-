import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import FAQ from "@/components/althea/FAQ";
import { official, faqs } from "@/data/france";
export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "A few good questions.",
  description: "Clear answers before your first step.",
};
export default function Content() {
  return (
    <Page
      title={"A few good questions."}
      intro={"Clear answers before your first step."}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
        "@context":"https://schema.org", "@type":"FAQPage",
        mainEntity:faqs.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))
      })}} />
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
