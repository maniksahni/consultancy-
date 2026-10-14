import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import { cities } from "@/data/france";
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Studying in ${cities.find((c) => c.slug === params.slug)?.name || "France"}`,
  };
}
export default function City({ params }: { params: { slug: string } }) {
  const c = cities.find((c) => c.slug === params.slug);
  if (!c) notFound();
  return (
    <Page eyebrow="LE CHAPITRE FRANÇAIS" title={c.name} intro={c.tag}>
      <div className="prose">
        <p>{c.text}</p>
        <h2>Plan around your campus.</h2>
        <p>
          Confirm your campus address, compare commuting options and research
          housing with verified providers. Ask the institution about student
          support and accommodation resources. Budget amounts depend on your own
          choices and current availability.
        </p>
        <a href={c.url} target="_blank" rel="noopener noreferrer">
          Official city or university resource ↗
        </a>
        <p className="muted">
          Editorial orientation updated 14 October 2026. No rent, availability
          or cost estimate is guaranteed.
        </p>
      </div>
    </Page>
  );
}
