import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import GuideChapterPage from "@/components/guides/GuideChapterPage";
import { indiaGuide } from "@/data/guides/india";

const chapterFor = (slug: string) => indiaGuide.chapters.find((c) => c.slug === slug);
export function generateStaticParams() { return indiaGuide.chapters.map((c) => ({ chapter: c.slug })); }
export function generateMetadata({ params }: { params: { chapter: string } }) {
  const c = chapterFor(params.chapter);
  return pageMetadata(`/from-india/${params.chapter}`, { title: c?.seoTitle || "Study abroad from India", description: c?.description });
}
export default function Chapter({ params }: { params: { chapter: string } }) {
  const chapter = chapterFor(params.chapter);
  if (!chapter) notFound();
  return <GuideChapterPage guide={indiaGuide} chapter={chapter} />;
}
