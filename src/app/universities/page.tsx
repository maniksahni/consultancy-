import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Finder from "@/components/althea/Finder";
export const metadata: Metadata = {
  title: "Find your programme.",
  description:
    "A curated starting point, with official sources and clear review dates. No guaranteed admissions or assumed fees.",
};
export default function Content() {
  return (
    <Page
      title={"Find your programme."}
      intro={
        "A curated starting point, with official sources and clear review dates. No guaranteed admissions or assumed fees."
      }
    >
      <p style={{marginBottom:30}}><a className="text-link" href="/france/institutions">Explore the official French institution registry ↗</a></p>
      <Finder />
      <p className="muted" style={{ marginTop: 25 }}>
        Programme evidence reviewed 14 October 2026. Open the programme detail for published fees, applicant categories and application calendars. Conditional waivers and track-specific requirements are stated separately.
      </p>
    </Page>
  );
}
