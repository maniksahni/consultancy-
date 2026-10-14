import { notFound } from "next/navigation";
import Link from "@/components/althea/EditorialLink";
import Page from "@/components/althea/Page";
import { articles, checked } from "@/data/france";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  return {
    title: article?.title,
    description: article?.intro,
    alternates: { canonical: `/knowledge/${params.slug}` },
  };
}
export default function Article({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();
  return (
    <Page
      eyebrow={article.category}
      title={article.title}
      intro={article.intro}
    >
      <nav className="country-tabs" aria-label="Article breadcrumb">
        <Link href="/knowledge">Knowledge hub</Link>
        <span aria-current="page">{article.category}</span>
      </nav>
      <article className="prose">
        <p className="eyebrow">EDITORIAL ORIENTATION · UPDATED {checked}</p>
        {article.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h2>Continue with the official source.</h2>
        <a
          className="text-link"
          href={article.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read official guidance ↗
        </a>
        <p>
          Programme-specific fees and application calendars are recorded
          separately in the programme desk.
        </p>
        <Link href="/programmes" className="text-link">
          Explore published course evidence ↗
        </Link>
      </article>
      <section className="prose">
        <h2>Continue reading.</h2>
        {articles
          .filter((a) => a.slug !== article.slug)
          .map((a) => (
            <p key={a.slug}>
              <Link href={`/knowledge/${a.slug}`}>{a.title} ↗</Link>
            </p>
          ))}
      </section>
    </Page>
  );
}
