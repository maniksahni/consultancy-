import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Card, Grid, Section } from "@/components/maison/ui";
import { canadianProvinces } from "@/lib/worldInstitutions";

export const metadata = pageMetadata("/universities/canada", { title: "PGWP-Eligible Colleges in Canada", description: "Every Canadian designated learning institution by province, with whether it offers PGWP-eligible programmes, from the IRCC list. Check before you pay a deposit." });

export default function Canada() {
  const all = canadianProvinces();
  const total = all.reduce((n, p) => n + p.dlis.length, 0);
  return <Page path="/universities/canada" eyebrow="CANADA · IRCC DESIGNATED LEARNING INSTITUTIONS" title="PGWP-eligible colleges," accent="province by province." intro={`All ${total} designated learning institutions (DLIs) in Canada, grouped by province, with whether each offers programmes that lead to a post-graduation work permit. From the official IRCC list.`}>
    <Section tone="ivory"><Grid cols={3}>{all.map((p) => <Card key={p.slug} kicker={`${p.dlis.length} DLIs`} title={p.name} href={`/universities/canada/${p.slug}`} cta="See every DLI"><p>{p.dlis.filter((d) => d.pgwp === "Yes").length} offer PGWP-eligible programmes; {p.dlis.filter((d) => d.isPublic).length} are public.</p></Card>)}</Grid></Section>
  </Page>;
}
