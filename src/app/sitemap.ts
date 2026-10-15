import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/siteSeo";
import { guides } from "@/data/franceGuides";

// Only index content with a unique canonical; aliases and unverified outcome claims are excluded.
const routes=[
  "/", "/france", "/france/universities", "/france/programmes", "/france/institutions",
  "/france/campus-france", "/france/resources", "/admissions-process", "/mentorship-model",
  ...guides.map(guide=>"/france/"+guide.slug),
];
export default function sitemap():MetadataRoute.Sitemap{
 return Array.from(new Set(routes)).map(path=>({
  url:absoluteUrl(path),
  changeFrequency:path==="/"?"weekly" as const:"monthly" as const,
  priority:path==="/"?1:path==="/france"?.9:.6,
 }));
}
