import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import Link from "next/link";
import { cities } from "@/data/france";
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const city = cities.find((c) => c.slug === params.slug);
  return pageMetadata(`/cities/${params.slug}`, {
    title: `Study in ${city?.name || "France"}`,
    description: city ? `Explore student life in ${city.name}, France. Compare campus locations, transport, housing research and official local resources.` : "Explore student life and practical study resources in France." });
}
export default function City({ params }: { params: { slug: string } }) {
  const c = cities.find((c) => c.slug === params.slug);
  if (!c) notFound();
  return (
    <Page path={`/cities/${params.slug}`} eyebrow="LE CHAPITRE FRANÇAIS" title={c.name} intro={c.tag}>
      <div className="prose">
        <p>{c.text}</p>
        <h2>Plan around your campus.</h2>
        <p>
          Confirm your campus address, compare commuting options and research
          housing with verified providers. Ask the institution about student
          support and accommodation resources. Budget amounts depend on your own
          choices and current availability.
        </p>
        <h2>Build a city shortlist around real details.</h2>
        <p>For each programme, note the teaching site or campus—not only the institution’s main address. Check the first and last public-transport connections you would use, whether classes are split across sites, and what student services are available near your campus. Ask the institution about its own housing guidance and arrival dates.</p>
        <h2>Questions to answer before you commit</h2>
        <ul>
          <li>Which campus will host most of your teaching, and can you reach it from likely housing areas?</li>
          <li>What is included in the published tuition, and what additional costs should you budget for?</li>
          <li>Where does the institution publish current accommodation, transport and international-student guidance?</li>
        </ul>
        <p><a href={c.url} target="_blank" rel="noreferrer">Visit the official {c.name} or university resource ↗</a></p>
        <p><Link href={`/universities?country=france&view=courses#course-finder`}>Search published France programme records ↗</Link></p>
        <Link href="/study-in-france">Explore the France destination guide ↗</Link>
        <br/><Link href="/first-30-days-france">Open the first 30 days checklist ↗</Link>
        <p className="muted">
          Editorial orientation updated 14 October 2026. No rent, availability
          or cost estimate is guaranteed.
        </p>
      </div>
    </Page>
  );
}
