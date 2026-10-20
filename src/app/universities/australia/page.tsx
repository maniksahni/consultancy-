import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Checklist, Section } from "@/components/maison/ui";
import { australianInstitutions } from "@/lib/worldInstitutions";

export const metadata = pageMetadata("/universities/australia", { title: "Australian Universities A–Z for Indians", description: "Every Australian university, TAFE and major private college open to international students, with CRICOS courses, registered tuition and how to apply from India." });

export default function Australia() {
  const all = australianInstitutions();
  const states = [...new Set(all.map((i) => i.region || "Other"))].sort();
  return <Page path="/universities/australia" eyebrow="AUSTRALIA · CRICOS REGISTER" title="Australian universities and colleges," accent="A to Z." intro={`${all.length} Australian providers with degree and diploma courses registered for international students: universities, TAFEs and major private colleges. Each page lists its CRICOS courses, the tuition it registers and how students from India apply.`}>
    <Section tone="ivory"><div className="ms-guide-body">{states.map((st, n) => {
      const list = all.filter((i) => (i.region || "Other") === st);
      return <details key={st} className={`ms-guide-block${n > 2 ? " is-more" : ""}`} open={n <= 2}><summary><h2>{st} ({list.length})</h2></summary>
        <Checklist columns={list.length > 6 ? 2 : 1} items={list.map((i) => <Link key={i.slug} href={`/universities/australia/${i.slug}`}>{i.name} · {i.city}{i.isPublic ? " · public" : ""}</Link>)} /></details>;
    })}</div></Section>
  </Page>;
}
