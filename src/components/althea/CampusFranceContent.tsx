import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Procedure from "@/components/althea/Procedure";
export default function CampusFranceContent({ imagePlacement = "/campus-france-guide" }: { imagePlacement?: string }) {
  return (
    <Page path="/campus-france-guide" imagePlacement={imagePlacement}
      title={"The Campus France application route."}
      intro={
        "Start with your country of residence and the requirements of your chosen programme."
      }
    >
      <Procedure />
    </Page>
  );
}
