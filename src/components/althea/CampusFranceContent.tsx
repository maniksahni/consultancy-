import GuideChapterPage from "@/components/guides/GuideChapterPage";
import { franceChapter, franceGuide } from "@/data/guides/france";

export default function CampusFranceContent() {
  return <GuideChapterPage guide={franceGuide} chapter={franceChapter("campus-france")!} />;
}
