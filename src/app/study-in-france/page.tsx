import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import StudyFranceContent from "@/components/althea/StudyFranceContent";
export const metadata: Metadata = pageMetadata('/study-in-france', {
  title: 'Study in France from India: 2027 Guide',
  description: `Study in France from India: shortlist French universities and courses, follow the Campus France process, plan fees and student visa with ${brand.shortName}.`,
});
export default function Content() { return <StudyFranceContent />; }
