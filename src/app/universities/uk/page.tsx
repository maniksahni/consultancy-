import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Checklist, Section } from "@/components/maison/ui";
import { ukInstitutions } from "@/lib/worldInstitutions";

export const metadata = pageMetadata("/universities/uk", { title: "UK Universities A–Z for Indian Students", description: "UK universities and colleges: undergraduate courses, Student visa sponsor status, fees and the Graduate visa, from Discover Uni and the Home Office." });

export default function Uk() {
  const all = ukInstitutions();
  const letters = [...new Set(all.map((i) => i.name.replace(/^(The|University of)\s+/i, "")[0].toUpperCase()))].sort();
  const key = (n: string) => n.replace(/^(The|University of)\s+/i, "")[0].toUpperCase();
  return <Page path="/universities/uk" eyebrow="UNITED KINGDOM · DISCOVER UNI + HOME OFFICE" title="UK universities and colleges," accent="A to Z." intro={`${all.length} UK higher education providers with their undergraduate courses and whether they hold a Student sponsor licence, the thing you need for a Student visa. Each page explains costs, the visa and how students from India apply.`}>
    <Section tone="ivory"><div className="ms-guide-body">{letters.map((l, n) => {
      const list = all.filter((i) => key(i.name) === l);
      return <details key={l} className={`ms-guide-block${n > 2 ? " is-more" : ""}`} open={n <= 2}><summary><h2>{l} ({list.length})</h2></summary>
        <Checklist columns={list.length > 6 ? 2 : 1} items={list.map((i) => <Link key={i.slug} href={`/universities/uk/${i.slug}`}>{i.name} · {i.city}</Link>)} /></details>;
    })}</div></Section>
  </Page>;
}
