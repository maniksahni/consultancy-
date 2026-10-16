import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import UniversityExplorer from "@/components/althea/UniversityExplorer";
import { Section } from "@/components/maison/ui";

export const metadata = pageMetadata("/france/institutions", {
  title: "French Higher Education Institutions",
  description: "Browse the French higher education register and reviewed university programmes in this site.",
});

export default function Directory() {
  return <Page path="/france/institutions" eyebrow="LE PARCOURS · FRANCE" title="French" accent="institutions." intro="Browse French higher education institutions, reviewed programme fees and application information here on the site."><Section tone="ivory"><UniversityExplorer initialCountry="france" /></Section></Page>;
}
