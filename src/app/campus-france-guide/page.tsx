import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Procedure from "@/components/althea/Procedure";
export const metadata: Metadata = {
  alternates: { canonical: "/campus-france-guide" },
  title: "The official path. Made clearer.",
  description:
    "Start with your country of residence and the requirements of your chosen programme.",
};
export default function Content() {
  return (
    <Page
      title={"The official path. Made clearer."}
      intro={
        "Start with your country of residence and the requirements of your chosen programme."
      }
    >
      <Procedure />
    </Page>
  );
}
