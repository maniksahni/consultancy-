import { brand } from "@/config/brand";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import { articles, checked } from "@/data/france";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = articles.find((a) => a.slug === params.slug);
  return { title: a?.title || "Journal", description: a?.intro };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.intro,
            dateModified: "2026-10-14",
            author: { "@type": "Organization", name: `${brand.shortName} Editorial` },
          }),
        }}
      />
    </Page>
  );
}
