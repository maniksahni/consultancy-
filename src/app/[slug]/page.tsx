import { readdirSync } from "node:fs";
import { notFound } from "next/navigation";
import CmsArticle from "@/components/cms/CmsArticle";
import { CMS_PLACEHOLDER, cmsDescription, cmsSearchTitle, sitePages } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

// Pages written in the admin's content studio live at the site root (/privacy-policy). Never one that
// would shadow an existing page of the site.
const taken = new Set([...readdirSync("src/app"), ...readdirSync("public")].map((name) => name.replace(/\.\w+$/, "")));
const pages = sitePages.filter((p) => !taken.has(p.slug));

export const dynamicParams = false;
export function generateStaticParams() {
  // A static export needs at least one path; with nothing published, build a placeholder that
  // scripts/drop-placeholders.mjs deletes after the build.
  return pages.length ? pages.map((p) => ({ slug: p.slug })) : [{ slug: CMS_PLACEHOLDER }];
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = pages.find((x) => x.slug === params.slug);
  if (!p) return {};
  return pageMetadata(`/${p.slug}`, { title: cmsSearchTitle(p), description: cmsDescription(p) });
}
export default function CmsSitePage({ params }: { params: { slug: string } }) {
  const p = pages.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return <CmsArticle page={p} />;
}
