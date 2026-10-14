import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Procedure from "@/components/althea/Procedure";
export const metadata: Metadata = pageMetadata('/campus-france-guide', {
  title: 'Campus France Application Guide',
  description:
    "Start with your country of residence and the requirements of your chosen programme.",
});
export default function Content() {
  return (
    <Page
      title={"The Campus France application route."}
      intro={
        "Start with your country of residence and the requirements of your chosen programme."
      }
    >
      <Procedure />
    </Page>
  );
}
