import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import StudyFranceContent from "@/components/althea/StudyFranceContent";
export const metadata: Metadata = pageMetadata('/study-in-france', {
  title: 'Study in France Admissions Guide',
  description: `Plan a French university application with independent programme guidance, official application routes and practical arrival advice from ${brand.shortName}.`,
});
export default function Content() { return <StudyFranceContent />; }
