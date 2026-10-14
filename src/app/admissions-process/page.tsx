import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Procedure from "@/components/althea/Procedure";
export const metadata: Metadata = pageMetadata('/admissions-process', {
  title: 'Study Abroad Admissions Process',
  description:
    "Follow the programme and country-specific official instructions.",
});
export default function Content() {
  return (
    <Page
      title={"Your application, organised."}
      intro={"Follow the programme and country-specific official instructions."}
    >
      <Procedure />
    </Page>
  );
}
