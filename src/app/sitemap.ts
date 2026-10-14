import { isIndexable, siteUrl } from "@/lib/seo";
import { guides } from "@/data/franceGuides";
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
    "first-30-days-france",
    "destinations",
    "knowledge",
    "france/institutions",
    "france/programmes",
    "france/universities",
    "france/resources",
    ...guides.map(g => `france/${g.slug}`),
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
  ];
  return paths.map((p) => ({ url: `${host.replace(/\/$/, "")}/${p}` }));
}
