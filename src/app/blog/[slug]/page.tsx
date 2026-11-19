import { notFound } from "next/navigation";
import CmsArticle from "@/components/cms/CmsArticle";
import { CMS_PLACEHOLDER, blogPosts, cmsDescription, cmsSearchTitle } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  // A static export needs at least one path; with nothing published, build a placeholder that
  // scripts/drop-placeholders.mjs deletes after the build.
  return blogPosts.length ? blogPosts.map((p) => ({ slug: p.slug })) : [{ slug: CMS_PLACEHOLDER }];
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = blogPosts.find((x) => x.slug === params.slug);
  if (!p) return {};
  return pageMetadata(`/blog/${p.slug}`, { title: cmsSearchTitle(p), description: cmsDescription(p) });
}
export default function BlogPost({ params }: { params: { slug: string } }) {
  const p = blogPosts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return <CmsArticle page={p} />;
}
