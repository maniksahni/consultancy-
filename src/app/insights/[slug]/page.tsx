import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { isoDate } from "@/lib/trail";
import { coverFor } from "@/lib/paris";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import { Notice, Prose, Section, TextLink } from "@/components/maison/ui";
import { articles, checked } from "@/data/france";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = articles.find((a) => a.slug === params.slug);
  const searchTitles: Record<string, string> = {
    "choosing-your-programme": "Choosing Your French Study Programme",
    "understanding-campus-france": "Études en France Application Steps",
    "planning-your-france-budget": "France Student Budget Guide",
  };
  return pageMetadata(`/insights/${params.slug}`, { title: searchTitles[params.slug] || a?.title || "Journal", description: a?.intro });
}
export default function Article({ params }: { params: { slug: string } }) {
  const a = articles.find((a) => a.slug === params.slug);
  if (!a) notFound();
  return (
    <Page path={`/insights/${params.slug}`} modified={checked} eyebrow={a.category} title={a.title} intro={a.intro} closing={{ kicker: "KEEP READING", title: "Your questions,", accent: "answered in person.", body: "Turn what you have read into a plan that fits your own circumstances." }}>
      <Section tone="ivory" narrow>
        <p className="ms-kicker" style={{ marginBottom: 30 }}>ALTHÉA EDITORIAL · UPDATED {checked.toUpperCase()}</p>
        <Prose>
          {a.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <h2>Continue with the official source.</h2>
        </Prose>
        <div className="ms-row" style={{ marginTop: 10 }}><TextLink href={a.source}>Read the official source</TextLink><TextLink href="/knowledge">Explore the reviewed guidance library</TextLink></div>
        <Notice kicker="GENERAL ORIENTATION"><p>Confirm the current requirements for your own circumstances before applying.</p></Notice>
      </Section>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", "@id": `${siteUrl}/insights/${a.slug}#article`,
        headline: a.title, description: a.intro, articleSection: a.category, inLanguage: "en",
        datePublished: isoDate(checked), dateModified: isoDate(checked),
        mainEntityOfPage: { "@id": `${siteUrl}/insights/${a.slug}#webpage` },
        image: absoluteUrl(coverFor(`/insights/${a.slug}`).file),
        author: { "@id": `${siteUrl}/#adviser` },
        publisher: { "@id": `${siteUrl}/#organization` }, citation: { "@type": "CreativeWork", url: a.source },
      }} />
    </Page>
  );
}
