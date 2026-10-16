import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import GuideChapterPage from "@/components/guides/GuideChapterPage";
import { franceChapter, franceGuide } from "@/data/guides/france";

const topicChapters = franceGuide.chapters.filter((c) => c.path.startsWith("/france/"));
export function generateStaticParams() { return topicChapters.map((c) => ({ topic: c.slug })); }
export function generateMetadata({ params }: { params: { topic: string } }) {
  const c = franceChapter(params.topic);
  return pageMetadata(`/france/${params.topic}`, { title: c?.seoTitle || "France guide", description: c?.description });
}
export default function Guide({ params }: { params: { topic: string } }) {
  const chapter = topicChapters.find((c) => c.slug === params.topic);
  if (!chapter) notFound();
  return <GuideChapterPage guide={franceGuide} chapter={chapter} />;
}
