import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import UniversityExplorer from "@/components/althea/UniversityExplorer";

export const metadata = pageMetadata("/france/institutions", {
  title: "French Higher Education Institutions",
  description: "Browse the French higher education register and reviewed university programmes in this site.",
});

export default function Directory() {
  return <Page eyebrow="LE PARCOURS · FRANCE" title="French institutions." intro="Browse French higher education institutions, reviewed programme fees and application information here on the site."><UniversityExplorer initialCountry="france" /></Page>;
}
