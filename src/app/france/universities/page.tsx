import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import UniversityExplorer from "@/components/althea/UniversityExplorer";
import { Checklist, Section, TextLink } from "@/components/maison/ui";
import { frenchInstitutions } from "@/lib/frenchInstitutions";

export const metadata = pageMetadata("/france/universities", { title: "Universities in France: Fees & Courses", description: "Explore universities in France for international students: researched programmes, published tuition fees, entry requirements and application timing." });

export default function Universities() {
  const all = frenchInstitutions();
  const regions = [...new Set(all.map((i) => i.region || "Other"))].sort((a, b) => a.localeCompare(b));
  return <Page path="/france/universities" eyebrow="ACADEMIC POSSIBILITIES" title="An institution." accent="A new perspective." intro="A curated introduction to researched French university programmes, published tuition, entry preparation and application timing. Details stay on this site.">
    <Section tone="ivory"><div style={{ marginBottom: 24 }}><TextLink href="/france/institutions">Browse the in-site institution registry</TextLink></div><UniversityExplorer initialCountry="france" /></Section>
    <Section tone="paper" kicker={`EVERY INSTITUTION · ${all.length} PAGES`} title="French universities and schools," accent="A to Z, by region." intro="Each page covers the institution’s programmes, fees for students from India and how to apply, from the official French registers.">
      <div className="ms-guide-body">{regions.map((region) => {
        const list = all.filter((i) => (i.region || "Other") === region);
        return <details key={region} className="ms-guide-block is-more"><summary><h2>{region} ({list.length})</h2></summary>
          <Checklist columns={list.length > 6 ? 2 : 1} items={list.map((i) => <Link key={i.slug} href={`/france/universities/${i.slug}`}>{i.name} · {i.city.replace(/\s+\d+e$/, "")}</Link>)} />
        </details>;
      })}</div>
    </Section>
  </Page>;
}
