import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Btn, Notice, Section, Steps } from "@/components/maison/ui";
import { stages } from "@/data/france";

export const metadata: Metadata = pageMetadata('/mentorship-model', {
  title: "Study Abroad Mentorship Process",
  description:
    "How our six-stage study abroad mentorship works: profile review, course shortlisting, SOP and documents, application route and arrival in France.",
});
const detail = [
  "Discuss your goals, academic background, budget and questions.",
  "Understand the subjects, qualifications and prerequisites that shape your options.",
  "Compare official programme information, costs and practical preferences.",
  "Review your documents and tell your own story with clarity and evidence.",
  "Confirm the relevant institutional and country-specific application instructions.",
  "Use official requirements and prepare a practical arrival checklist.",
];
export default function Content() {
  return (
    <Page path="/mentorship-model" eyebrow="THE MENTORSHIP MODEL" title="A considered path," accent="together." intro="Six stages to organise the conversation — adapted to your circumstances and agreed scope.">
      <Section tone="ivory" kicker="SIX STAGES" title="One conversation," accent="organised." intro="Not every journey needs every stage. We use the ones that help you, in the order that makes sense for your plans." action={<Btn href="/book-consultation">Start with stage one</Btn>}>
        <Steps items={stages.map((s, i) => ({ title: s, body: <p>{detail[i]}</p> }))} />
        <Notice kicker="AGREED SCOPE"><p>Scope and any fee are discussed before work begins. Institutions and authorities make their own decisions.</p></Notice>
      </Section>
    </Page>
  );
}
