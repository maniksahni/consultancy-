import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, UserRound } from "lucide-react";
import Page from "@/components/althea/Page";
import JsonLd from "@/components/seo/JsonLd";
import { Btn, Kicker, Prose, Section } from "@/components/maison/ui";
import { cleanArticleHtml, uploadSize } from "@/lib/cmsHtml";
import { blogPosts, cmsPath, readingTime, type CmsPage } from "@/lib/cms";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { brand } from "@/config/brand";
import { coverFor } from "@/lib/paris";

const dateLabel = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
};

export function CmsImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [w, h] = uploadSize(src) ?? [1600, 900];
  return <Image className="cms-figure-img" src={src} alt={alt} width={w} height={h} sizes="(max-width: 900px) 92vw, 960px" priority={priority} />;
}

/** One published article or page from the admin's content studio, in the site's own design. */
export default function CmsArticle({ page }: { page: CmsPage }) {
  const path = cmsPath(page);
  const isBlog = page.type === "blog";
  const wide = page.layout === "wide" || page.type === "landing";
  const published = page.publishedAt || page.created;
  const related = isBlog ? blogPosts.filter((p) => p.slug !== page.slug).slice(0, 3) : [];
  return (
    <Page path={path} modified={(page.updated || published).slice(0, 10)} eyebrow={(page.category || (isBlog ? "Blog" : brand.shortName)).toUpperCase()} title={page.title} intro={page.excerpt || ""}>
      <Section tone="ivory" narrow={!wide}>
        <div className={`cms-article${wide ? " is-wide" : ""}`}>
          <article className="cms-body">
            {isBlog && <p className="cms-meta">
              <span><UserRound size={14} aria-hidden="true" />{page.author || brand.person}</span>
              {published && <span><CalendarDays size={14} aria-hidden="true" /><time dateTime={published.slice(0, 10)}>{dateLabel(published)}</time></span>}
              <span><Clock size={14} aria-hidden="true" />{readingTime(page)}</span>
            </p>}
            {page.image && page.showHero && <figure className="cms-figure"><CmsImage src={page.image} alt={page.imageAlt || page.title} priority /></figure>}
            <Prose><div dangerouslySetInnerHTML={{ __html: cleanArticleHtml(page.body) }} /></Prose>
          </article>
          {!wide && <aside className="cms-aside" aria-label="Talk to an adviser">
            <Kicker>FREE 15-MINUTE CALL</Kicker>
            <p className="cms-aside-title">Questions about your own plan?</p>
            <p>Talk it through with {brand.person} in Paris and leave with your next steps.</p>
            <Btn href="/book-consultation">Book your consultation</Btn>
          </aside>}
        </div>
        {related.length > 0 && <nav className="cms-related" aria-label="More articles">
          <Kicker>KEEP READING</Kicker>
          <ul>{related.map((p) => <li key={p.slug}><Link href={cmsPath(p)}>{p.title}</Link></li>)}</ul>
        </nav>}
      </Section>
      {isBlog && <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${siteUrl}${path}#article`,
        headline: page.title, description: page.excerpt || page.metaDescription || undefined, articleSection: page.category || undefined, inLanguage: "en",
        datePublished: published.slice(0, 10), dateModified: (page.updated || published).slice(0, 10),
        mainEntityOfPage: { "@id": `${siteUrl}${path}#webpage` },
        image: absoluteUrl(page.image || coverFor(path).file),
        author: { "@id": `${siteUrl}/#adviser` }, publisher: { "@id": `${siteUrl}/#organization` },
      }} />}
    </Page>
  );
}
