import { brand } from "@/config/brand";
import type { MetadataRoute } from "next";
import {programmeResearch} from "@/data/programmeResearch";
import { articles, cities, programmes } from "@/data/france";
export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL ? brand.canonicalUrl : undefined;
  if (!host) return [];
  const paths = [
    "",
    "study-in-france",
    "destinations",
    "knowledge",
    "france/institutions",
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
