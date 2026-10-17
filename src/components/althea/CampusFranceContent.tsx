import GuideChapterPage from "@/components/guides/GuideChapterPage";
import { franceChapterFull as franceChapter, franceGuideFull as franceGuide } from "@/data/guides";

export default function CampusFranceContent() {
  return <GuideChapterPage guide={franceGuide} chapter={franceChapter("campus-france")!} />;
}
