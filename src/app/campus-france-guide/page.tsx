import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import CampusFranceContent from "@/components/althea/CampusFranceContent";
export const metadata: Metadata = pageMetadata('/campus-france-guide', {
  title: 'Campus France Application Guide',
  description:
    "Start with your country of residence and the requirements of your chosen programme.",
});
export default function Content() { return <CampusFranceContent />; }
