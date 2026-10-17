import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Procedure from "@/components/althea/Procedure";
export const metadata: Metadata = pageMetadata('/admissions-process', {
  title: 'Study Abroad Admissions Process',
  description:
    "How study abroad admissions work, step by step: shortlisting, documents, Campus France or direct applications, offers and visa planning for Indian students.",
});
export default function Content() {
  return (
    <Page path="/admissions-process"
      eyebrow="THE ADMISSIONS PROCESS"
      title="Your application,"
      accent="organised."
      intro={"Follow the programme and country-specific official instructions."}
    >
      <Procedure />
    </Page>
  );
}
