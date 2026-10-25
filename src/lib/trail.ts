import { countryGuides } from "@/data/guides";
import { indiaGuide } from "@/data/guides/india";
import { programmeResearch } from "@/data/programmeResearch";
import { articles, cities } from "@/data/france";
import { destinations } from "@/data/destinations";
import { frenchInstitutions } from "@/lib/frenchInstitutions";
import { australianInstitutions, canadianProvinces, ukInstitutions } from "@/lib/worldInstitutions";

export type Crumb = { name: string; path: string };

/** Plain, searchable names for every page, used by breadcrumbs (visible and structured). */
const names: Record<string, string> = {
  "/": "Home",
  "/study-in-france": "Study in France",
  "/in-france": "Already in France",
  "/pr-in-france": "PR in France",
  "/settle-in-france": "Settle in France",
  "/career-support": "Career support in France",
  "/jobs": "Jobs & careers",
  "/first-30-days-france": "First 30 days in France",
  "/destinations": "Destinations",
  "/compare": "Compare countries",
  "/knowledge": "Study abroad guide",
  "/france": "Study in France",
  "/france/institutions": "French institutions",
  "/france/programmes": "French programmes",
  "/france/universities": "Universities in France",
  "/france/resources": "France resources",
  "/universities": "University directory",
  "/programmes": "Programmes",
  "/campus-france-guide": "Campus France process",
  "/services": "Services",
  "/about": "About",
  "/reviews": "Student reviews",
  "/mentorship-model": "Mentorship model",
  "/insights": "Journal",
  "/book-consultation": "Book a consultation",
  "/faq": "FAQ",
  "/privacy": "Privacy policy",
  "/terms": "Terms of use",
  "/acknowledgements": "Sources & credits",
  "/scholarships": "Scholarships",
  "/outcomes": "Consultation outcomes",
  "/admissions-process": "Admissions process",
  "/from-india": "From India",
  "/site-map": "Site map",
};
for (const g of countryGuides) if (g.hubPath.startsWith("/destinations/")) names[g.hubPath] = `Study in ${g.prose}`;
for (const d of destinations) names[`/destinations/${d.slug}`] ??= `Study in ${d.name}`;
for (const c of cities) names[`/cities/${c.slug}`] = `Study in ${c.name}`;
for (const p of programmeResearch) names[`/programmes/${p.slug}`] = `${p.title}, ${p.institution}`;
for (const a of articles) names[`/insights/${a.slug}`] = a.title.replace(/\.$/, "");
for (const g of [...countryGuides, indiaGuide]) for (const c of g.chapters) names[c.path] ??= c.label;
for (const i of frenchInstitutions()) names[`/france/universities/${i.slug}`] = i.name;
names["/universities/australia"] = "Australian universities";
names["/universities/uk"] = "UK universities";
names["/universities/canada"] = "Canada PGWP colleges";
for (const i of australianInstitutions()) names[`/universities/australia/${i.slug}`] = i.name;
for (const i of ukInstitutions()) names[`/universities/uk/${i.slug}`] = i.name;
for (const p of canadianProvinces()) names[`/universities/canada/${p.slug}`] = `PGWP colleges in ${p.name}`;

/** Pages whose parent is not the URL's own parent folder (or whose folder has no page). */
const parents: Record<string, string> = {};
for (const g of countryGuides) for (const c of g.chapters) parents[c.path] ??= g.hubPath;
for (const c of cities) parents[`/cities/${c.slug}`] = "/study-in-france";

function parentOf(path: string): string | undefined {
  if (path === "/") return undefined;
  if (parents[path]) return parents[path];
  const folder = path.slice(0, path.lastIndexOf("/")) || "/";
  const up = folder === "/france" ? "/study-in-france" : folder; // /france renders the canonical /study-in-france
  return up === "/" || names[up] ? up : parentOf(up);
}

export const pageName = (path: string, fallback?: string) => names[path] || fallback || path;

/** Home → section → page, for both the visible breadcrumb and BreadcrumbList. */
export function trailFor(path: string, leafFallback?: string): Crumb[] {
  const chain: Crumb[] = [];
  for (let p: string | undefined = path; p; p = parentOf(p)) chain.unshift({ path: p, name: pageName(p, p === path ? leafFallback : undefined) });
  return chain;
}

/** "17 October 2026" or "2026-10-17" → "2026-10-17". */
export function isoDate(value?: string) {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(`${value} 12:00 UTC`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}
