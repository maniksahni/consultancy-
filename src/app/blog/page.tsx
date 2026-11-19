import Link from "next/link";
import { notFound } from "next/navigation";
import Page from "@/components/althea/Page";
import { Card, Grid, Section, TextLink } from "@/components/maison/ui";
import { CmsImage } from "@/components/cms/CmsArticle";
import { blogPosts, cmsPath, cmsSeo, readingTime } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/blog", {
  title: cmsSeo.blogTitle.length <= 40 ? cmsSeo.blogTitle : "Study in France journal",
  description: cmsSeo.blogIntro.slice(0, 160),
});

export default function Blog() {
  // No articles yet: no blog page (scripts/drop-placeholders.mjs removes the empty export).
  if (!blogPosts.length) notFound();
  const [lead, ...rest] = blogPosts;
  return (
    <Page path="/blog" eyebrow="FROM PARIS" title={cmsSeo.blogTitle} intro={cmsSeo.blogIntro} items={blogPosts.map((p) => ({ name: p.title, path: cmsPath(p) }))}>
      <Section tone="ivory">
        {!lead && <div className="cms-empty"><p>New articles are on their way. Meanwhile, the reviewed guides cover the essentials.</p><TextLink href="/knowledge">Read the study abroad guide</TextLink></div>}
        {lead && <Link href={cmsPath(lead)} className="cms-lead">
          {lead.image && <CmsImage src={lead.image} alt={lead.imageAlt || lead.title} priority />}
          <div><p className="ms-kicker">{(lead.category || "Latest").toUpperCase()} · {readingTime(lead).toUpperCase()}</p><h2>{lead.title}</h2>{lead.excerpt && <p>{lead.excerpt}</p>}</div>
        </Link>}
        {rest.length > 0 && <Grid cols={3}>{rest.map((p) => <Card key={p.slug} kicker={`${(p.category || "Article").toUpperCase()} · ${readingTime(p).toUpperCase()}`} title={p.title} href={cmsPath(p)} cta="Read the article">{p.excerpt && <p>{p.excerpt}</p>}</Card>)}</Grid>}
      </Section>
    </Page>
  );
}
