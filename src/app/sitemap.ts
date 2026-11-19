import { isIndexable, siteUrl } from "@/lib/seo";
import { franceGuide } from "@/data/guides/france";
import { destinationGuides } from "@/data/guides";
import { indiaGuide } from "@/data/guides/india";
import type { MetadataRoute } from "next";
import {programmeResearch} from "@/data/programmeResearch";
import { articles, checked, cities } from "@/data/france";
import { isoDate } from "@/lib/trail";
import { frenchInstitutions } from "@/lib/frenchInstitutions";
import { australianInstitutions, canadianProvinces, ukInstitutions } from "@/lib/worldInstitutions";
import { blogPosts, cmsPath, sitePages } from "@/lib/cms";
import { readdirSync } from "node:fs";

// The date each page's facts were last checked; jobs refresh with every daily build.
const siteReviewed = "2026-10-17";
const reviewed: Record<string, string | undefined> = Object.fromEntries([
  ["from-india", isoDate(indiaGuide.chapters[0].reviewedAt)],
  ...destinationGuides.concat(franceGuide, indiaGuide).flatMap(g => g.chapters.map(c => [c.path.slice(1), isoDate(c.reviewedAt)])),
  ...programmeResearch.map(p => [`programmes/${p.slug}`, isoDate(p.reviewedAt)]),
  ...articles.map(a => [`insights/${a.slug}`, isoDate(checked)]),
  ...cities.map(c => [`cities/${c.slug}`, isoDate(checked)]),
  ...frenchInstitutions().map(i => [`france/universities/${i.slug}`, i.sourceDate]),
  ...australianInstitutions().map(i => [`universities/australia/${i.slug}`, i.sourceDate]),
  ...ukInstitutions().map(i => [`universities/uk/${i.slug}`, i.sourceDate]),
  ...canadianProvinces().map(p => [`universities/canada/${p.slug}`, p.sourceDate]),
  ["jobs", new Date().toISOString().slice(0, 10)],
  ...[...blogPosts, ...sitePages].map(p => [cmsPath(p).slice(1), (p.updated || p.publishedAt).slice(0, 10)]),
  ["blog", blogPosts[0] ? (blogPosts[0].updated || blogPosts[0].publishedAt).slice(0, 10) : undefined],
]);
// Admin pages at the root are published only where they do not shadow a page of the site (see app/[slug]).
const taken = new Set([...readdirSync("src/app"), ...readdirSync("public")].map((name) => name.replace(/\.\w+$/, "")));
export default function sitemap(): MetadataRoute.Sitemap {
  const host = isIndexable ? siteUrl : undefined;
  if (!host) return [];
  const paths = [
    "",
    "study-in-france",
    "learn-french",
    "in-france",
    "pr-in-france",
    "partnerships",
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
    ...frenchInstitutions().map((i) => `france/universities/${i.slug}`),
    "france/resources",
    ...franceGuide.chapters.filter(c => c.path.startsWith("/france/")).map(c => c.path.slice(1)),
    "universities",
    "universities/australia", ...australianInstitutions().map((i) => `universities/australia/${i.slug}`),
    "universities/uk", ...ukInstitutions().map((i) => `universities/uk/${i.slug}`),
    "universities/canada", ...canadianProvinces().map((p) => `universities/canada/${p.slug}`),
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
    "site-map",
    ...cities.map((c) => `cities/${c.slug}`),
    ...programmeResearch.map((p) => `programmes/${p.slug}`),
    ...articles.map((a) => `insights/${a.slug}`),
    ...["uk", "usa", "canada", "germany", "australia", "ireland"].map(
      (s) => `destinations/${s}`,
    ),
    ...destinationGuides.flatMap(g => g.chapters.map(c => c.path.slice(1))),
    "from-india",
    ...indiaGuide.chapters.map(c => c.path.slice(1)),
    ...(blogPosts.length ? ["blog"] : []),
    ...blogPosts.map(p => cmsPath(p).slice(1)),
    ...sitePages.filter(p => !taken.has(p.slug)).map(p => p.slug),
  ];
  const canonicalHost = host.replace(/\/$/, "");
  return paths.map((p) => ({ url: p ? `${canonicalHost}/${p}` : canonicalHost, lastModified: reviewed[p] || siteReviewed }));
}
