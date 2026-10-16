import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import GuideChapterPage from "@/components/guides/GuideChapterPage";
import { destinationGuides, guideFor } from "@/data/guides";

export function generateStaticParams() {
  return destinationGuides.flatMap((g) => g.chapters.map((c) => ({ slug: g.country, chapter: c.slug })));
}
export function generateMetadata({ params }: { params: { slug: string; chapter: string } }) {
  const c = guideFor(params.slug)?.chapters.find((x) => x.slug === params.chapter);
  return pageMetadata(`/destinations/${params.slug}/${params.chapter}`, { title: c?.seoTitle || "Study abroad guide", description: c?.description });
}
export default function Chapter({ params }: { params: { slug: string; chapter: string } }) {
  const guide = guideFor(params.slug);
  const chapter = guide?.chapters.find((c) => c.slug === params.chapter);
  if (!guide || !chapter || guide.country === "france") notFound();
  return <GuideChapterPage guide={guide} chapter={chapter} />;
}
