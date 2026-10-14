import JsonLd from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import { articles, checked } from "@/data/france";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = articles.find((a) => a.slug === params.slug);
  return pageMetadata(`/insights/${params.slug}`, { title: a?.title || "Journal", description: a?.intro });
}
export default function Article({ params }: { params: { slug: string } }) {
  const a = articles.find((a) => a.slug === params.slug);
  if (!a) notFound();
  return (
    <Page eyebrow={a.category} title={a.title} intro={a.intro}>
      <article className="prose">
        <p className="eyebrow">
          ALTHÉA EDITORIAL · UPDATED {checked.toUpperCase()}
        </p>
        {a.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h2>Continue with the official source.</h2>
        <a href={a.source} target="_blank" rel="noopener noreferrer">
          Official guidance ↗
        </a>
        <p className="muted">
          General orientation. Confirm the current requirements for your own
          circumstances before applying.
        </p>
      </article>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article",
        headline: a.title, description: a.intro, dateModified: "2026-10-14",
        mainEntityOfPage: `${siteUrl}/insights/${a.slug}`,
        author: { "@type": "Organization", name: `${brand.shortName} Editorial`, url: `${siteUrl}/insights` },
        publisher: { "@id": `${siteUrl}/#organization` }, citation: a.source,
      }} />
    </Page>
  );
}
