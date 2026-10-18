import JsonLd from "@/components/seo/JsonLd";
import { faqs } from "@/data/france";
import { absoluteUrl } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import { Chips, Section } from "@/components/maison/ui";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import FAQ from "@/components/althea/FAQ";
export const metadata: Metadata = pageMetadata('/faq', {
  title: 'Study Abroad FAQ: Students & Parents',
  description: "Straight answers on studying in France from India: fees, Campus France, student visa, housing, part-time work, jobs after graduation and how Althéa helps.",
});
export default function Content() {
  return (
    <Page path="/faq" eyebrow="SETTLING · CAREER · STUDY" title="Clear answers" accent="before your next step." intro="What Althéa can help with, what remains with official providers, and how support works.">
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        "@id": `${absoluteUrl("/faq")}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }} />
      <Section tone="ivory" kicker="YOUR QUESTIONS" title="Good questions." accent="Honest answers." align="split" intro="Still unsure? Bring your question to a first conversation.">
        <FAQ />
      </Section>
      <Section tone="paper" kicker="CHECK THE OFFICIAL REQUIREMENTS" title="Go to the source." accent="Then decide." align="split">
        <Chips items={[{ label: "Application procedure guide", href: "/campus-france-guide" }, { label: "Student visa guide", href: "/france/visas" }, { label: "Scholarships", href: "/scholarships" }, { label: "Costs in France", href: "/france/costs" }]} />
      </Section>
    </Page>
  );
}
