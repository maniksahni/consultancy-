import { isIndexable, siteUrl } from "@/lib/seo";
import { franceGuide } from "@/data/guides/france";
import { destinationGuides } from "@/data/guides";
import type { MetadataRoute } from "next";
import {programmeResearch} from "@/data/programmeResearch";
import { articles, cities } from "@/data/france";
export default function sitemap(): MetadataRoute.Sitemap {
  const host = isIndexable ? siteUrl : undefined;
  if (!host) return [];
  const paths = [
    "",
    "study-in-france",
    "settle-in-france",
    "career-support",
    "jobs",
    "first-30-days-france",
    "destinations",
    "compare",
    "knowledge",
    "france/institutions",
    "france/programmes",
    "france/universities",
    "france/resources",
    ...franceGuide.chapters.filter(c => c.path.startsWith("/france/")).map(c => c.path.slice(1)),
    "universities",
    "programmes",
    "campus-france-guide",
    "services",
    "about",
    "reviews",
    "mentorship-model",
    "insights",
    "book-consultation",
    "faq",
    "privacy",
    "terms",
    "acknowledgements",
    "scholarships",
    "outcomes",
    "admissions-process",
    ...cities.map((c) => `cities/${c.slug}`),
    ...programmeResearch.map((p) => `programmes/${p.slug}`),
    ...articles.map((a) => `insights/${a.slug}`),
    ...["uk", "usa", "canada", "germany", "australia", "ireland"].map(
      (s) => `destinations/${s}`,
    ),
    ...destinationGuides.flatMap(g => g.chapters.map(c => c.path.slice(1))),
  ];
  const canonicalHost = host.replace(/\/$/, "");
  return paths.map((p) => ({ url: p ? `${canonicalHost}/${p}` : canonicalHost }));
}
