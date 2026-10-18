import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * French higher-education institutions for the per-institution pages, read at build time from the
 * official registers already published under public/data/universities:
 *   france.json         French Ministry of Higher Education register (Open Licence 2.0)
 *   france-courses.json Parcoursup 2026 open-data catalogue (first-year programmes)
 * Only institutions located in France with courses listed, plus every university and grand établissement, get a page.
 */
type RawInstitution = { id: string; name: string; nativeName?: string; city: string; region?: string; institutionType: string; publicPrivate: string; identifier: string; enrolmentYear?: string; enrolment?: number; registrySource: string; sourceDate: string };
type RawCourse = { id: string; institutionId: string; name: string; city?: string; level: string; subject?: string };

export type Institution = RawInstitution & { slug: string; isPublic: boolean; typeLabel: string; courses: { name: string; level: string; city?: string; url?: string; apprenticeship?: boolean }[] };

const read = (file: string) => JSON.parse(readFileSync(join(process.cwd(), "public/data/universities", file), "utf8"));
const TYPE: Record<string, string> = { "Université": "University", "École": "School (école)", "Grand établissement": "Grand établissement (major public institution)", "Autre établissement": "Other higher-education institution" };
const ABROAD = new Set(["Étranger"]);

const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

let cache: Institution[] | null = null;
export function frenchInstitutions(): Institution[] {
  if (cache) return cache;
  const raw: RawInstitution[] = read("france.json").institutions;
  const { courses }: { courses: RawCourse[] } = read("france-courses.json");
  const context: Record<string, { apprenticeship?: boolean; courseUrl?: string }> = read("france-fee-context.json").courses;
  const byUai = new Map<string, RawCourse[]>();
  for (const c of courses) { const k = c.institutionId.replace(/^fr-uai-/, ""); byUai.set(k, [...(byUai.get(k) || []), c]); }
  const used = new Set<string>();
  cache = raw
    .filter((i) => !ABROAD.has(i.region || "") && (byUai.has(i.identifier) || i.institutionType === "Université" || i.institutionType === "Grand établissement"))
    .map((i) => {
      let slug = slugify(i.name);
      if (used.has(slug)) slug = `${slug}-${slugify(i.city)}`;
      used.add(slug);
      const list = (byUai.get(i.identifier) || []).map((c) => ({ name: c.name, level: c.level.replace(/,(?=\S)/g, ", "), city: c.city, url: context[c.id]?.courseUrl, apprenticeship: context[c.id]?.apprenticeship }));
      return { ...i, slug, isPublic: i.publicPrivate === "public", typeLabel: TYPE[i.institutionType] || i.institutionType, courses: list };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  return cache;
}
export const frenchInstitution = (slug: string) => frenchInstitutions().find((i) => i.slug === slug);

/** The site's own city guide for an institution's city, when one exists. */
const CITY_GUIDES = ["paris", "lyon", "toulouse", "lille", "bordeaux", "nice"];
export function cityGuideFor(city: string) {
  const base = slugify(city.replace(/\s+\d+e$/, ""));
  return CITY_GUIDES.includes(base) ? `/cities/${base}` : undefined;
}
