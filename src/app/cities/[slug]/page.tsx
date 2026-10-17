import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import { Card, Chips, Grid, Notice, Section, Steps } from "@/components/maison/ui";
import { cities } from "@/data/france";
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const city = cities.find((c) => c.slug === params.slug);
  return pageMetadata(`/cities/${params.slug}`, {
    title: `Study in ${city?.name || "France"}: Student City Guide`,
    description: city ? `Study in ${city.name}, France as an international or Indian student: universities and campuses, transport, student housing and official city resources.` : "Explore student life and practical study resources in France." });
}
export default function City({ params }: { params: { slug: string } }) {
  const c = cities.find((c) => c.slug === params.slug);
  if (!c) notFound();
  return (
    <Page path={`/cities/${params.slug}`} eyebrow="LE CHAPITRE FRANÇAIS" title={c.name} accent="as your campus." intro={c.tag}
      modified="14 October 2026" about={{ "@type": "City", name: c.name, sameAs: c.url, containedInPlace: { "@type": "Country", name: "France" } }}>
      <Section tone="ivory" kicker={`STUDENT LIFE IN ${c.name.toUpperCase()}`} title="Picture the" accent="everyday." intro={c.text}>
        <Grid cols={2}>
          <Card index={1} title="Plan around your campus."><p>Confirm your campus address, compare commuting options and research housing with verified providers. Ask the institution about student support and accommodation resources. Budget amounts depend on your own choices and current availability.</p></Card>
          <Card index={2} title="Build a city shortlist around real details."><p>For each programme, note the teaching site or campus—not only the institution’s main address. Check the first and last public-transport connections you would use, whether classes are split across sites, and what student services are available near your campus. Ask the institution about its own housing guidance and arrival dates.</p></Card>
        </Grid>
      </Section>
      <Section tone="ink" kicker="BEFORE YOU COMMIT" title="Questions" accent="to answer first." align="split">
        <Steps items={[
          { title: "Which campus will host most of your teaching?", body: <p>And can you reach it from likely housing areas?</p> },
          { title: "What is included in the published tuition?", body: <p>And what additional costs should you budget for?</p> },
          { title: "Where does the institution publish its guidance?", body: <p>Look for current accommodation, transport and international-student guidance.</p> },
        ]} />
      </Section>
      <Section tone="paper" kicker="KEEP EXPLORING" title="Your next" accent="research steps." align="split">
        <Chips items={[{ label: `Official ${c.name} or university resource`, href: c.url }, { label: "Search published France programme records", href: "/universities?country=france&view=courses#course-finder" }, { label: "The France destination guide", href: "/study-in-france" }, { label: "First 30 days checklist", href: "/first-30-days-france" }]} />
        <Notice kicker="EDITORIAL ORIENTATION"><p>Updated 14 October 2026. No rent, availability or cost estimate is guaranteed.</p></Notice>
      </Section>
    </Page>
  );
}
