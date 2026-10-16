import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import CampusFranceContent from "@/components/althea/CampusFranceContent";
export const metadata: Metadata = pageMetadata('/campus-france-guide', {
  title: 'Campus France India Application Guide',
  description:
    "Campus France India (Études en France) step by step: account, documents, ₹20,000 fee, academic interview, offers and visa for 2027 intake.",
});
export default function Content() { return <CampusFranceContent />; }
