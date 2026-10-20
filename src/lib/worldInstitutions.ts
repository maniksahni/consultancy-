import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Per-institution pages for Australia and the UK, and per-province PGWP pages for Canada, built at
 * build time from the official registers already published under public/data/universities:
 *   australia*.json  CRICOS export (Australian Government, CC BY 2.5 AU): providers, courses, tuition
 *   uk*.json         Home Office register of student sponsors + Discover Uni 2026 (CC BY 4.0)
 *   canada.json      IRCC designated learning institutions list, with PGWP eligibility
 * Only institutions with enough real data get a page, so every page answers something.
 */
const read = (file: string) => JSON.parse(readFileSync(join(process.cwd(), "public/data/universities", file), "utf8"));
export const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80).replace(/-$/, "");
const title = (s: string) => (s === s.toUpperCase() ? s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase()) : s).trim();
const unique = (items: { slug: string }[]) => { const used = new Set<string>(); for (const i of items) { let s = i.slug, n = 2; while (used.has(s)) s = `${i.slug}-${n++}`; i.slug = s; used.add(s); } };

export type Course = { name: string; level: string; weeks?: number; tuition?: number; currency?: string; city?: string };
export type WorldInstitution = { slug: string; name: string; legalName: string; city: string; region?: string; type: string; isPublic?: boolean; identifier?: string; sponsorStatus?: string; website?: string; courses: Course[]; source: string; sourceDate?: string };

// ---------- Australia (CRICOS) ----------
const AU_HIGHER = new Set(["Bachelor Degree", "Bachelor Honours Degree", "Masters Degree (Coursework)", "Masters Degree (Research)", "Masters Degree (Extended)", "Doctoral Degree", "Diploma", "Advanced Diploma", "Graduate Diploma", "Graduate Certificate", "Associate Degree"]);
const AU_STATES: Record<string, string> = { NSW: "New South Wales", VIC: "Victoria", QLD: "Queensland", WA: "Western Australia", SA: "South Australia", TAS: "Tasmania", ACT: "Australian Capital Territory", NT: "Northern Territory" };
let au: WorldInstitution[] | null = null;
export function australianInstitutions(): WorldInstitution[] {
  if (au) return au;
  const raw = read("australia.json").institutions as { id: string; name: string; tradingName?: string; city: string; region?: string; institutionType: string; identifier: string; website?: string; sourceDate?: string }[];
  const { courses, courseSourceDate } = read("australia-courses.json") as { courses: { institutionId: string; name: string; level: string; durationWeeks?: string; tuition?: number; currency?: string; city?: string }[]; courseSourceDate?: string };
  const by = new Map<string, Course[]>();
  for (const c of courses) by.set(c.institutionId, [...(by.get(c.institutionId) || []), { name: c.name, level: c.level, weeks: Number(c.durationWeeks) || undefined, tuition: c.tuition || undefined, currency: c.currency || "AUD", city: c.city ? title(c.city) : undefined }]);
  au = raw.map((i) => {
    const list = by.get(i.id) || [];
    const higher = list.some((c) => AU_HIGHER.has(c.level));
    const keep = higher && (i.institutionType === "Government" || list.length >= 25);
    if (!keep) return null;
    const trading = (i.tradingName || "").split(/[;,]/)[0].trim();
    const name = (trading && trading.length <= 60 ? trading : i.name).replace(/\s+(Pty\.?\s*)?(Ltd|Limited)\.?$/i, "").replace(/\s+Pty$/i, "").trim();
    return { slug: slugify(name.replace(/\s*\([^)]*\)\s*$/, "")), name, legalName: i.name, city: title(i.city), region: AU_STATES[i.region || ""] || i.region, type: i.institutionType === "Government" ? "Public (government) provider" : "Private provider", isPublic: i.institutionType === "Government", identifier: i.identifier, website: i.website, courses: list, source: "Australian Government CRICOS register", sourceDate: courseSourceDate || i.sourceDate };
  }).filter(Boolean) as WorldInstitution[];
  // The same trading name can be registered by two legal entities; keep the one with more courses.
  const best = new Map<string, WorldInstitution>();
  for (const i of au) { const k = i.name.toLowerCase(); if (!best.has(k) || best.get(k)!.courses.length < i.courses.length) best.set(k, i); }
  au = [...best.values()];
  au.sort((a, b) => a.name.localeCompare(b.name));
  unique(au);
  return au;
}

// ---------- United Kingdom (sponsor register + Discover Uni) ----------
const norm = (s: string) => s.toLowerCase().replace(/\b(the|limited|ltd|plc|of london)\b/g, "").replace(/[^a-z0-9]/g, "");
let uk: WorldInstitution[] | null = null;
export function ukInstitutions(): WorldInstitution[] {
  if (uk) return uk;
  const raw = read("uk.json").institutions as { id: string; name: string; city: string; institutionType: string; sponsorStatus: string; identifier?: string | null; sourceDate?: string }[];
  const { courses, courseSourceDate } = read("uk-courses.json") as { courses: { institutionId: string; name: string; level: string; subject?: string; city?: string }[]; courseSourceDate?: string };
  const by = new Map<string, Course[]>();
  for (const c of courses) by.set(c.institutionId, [...(by.get(c.institutionId) || []), { name: `${c.name}${c.subject ? ` (${c.subject})` : ""}`, level: c.level }]);
  const sponsors = raw.filter((i) => i.sponsorStatus !== "Not matched to sponsor register");
  const byId = new Map(sponsors.filter((i) => i.identifier).map((i) => [i.identifier!, i]));
  const byName = new Map(sponsors.map((i) => [norm(i.name), i]));
  const seen = new Set<string>();
  uk = raw.flatMap((i) => {
    const list = by.get(i.id) || [];
    if (list.length < 10) return [];
    const sponsor = i.sponsorStatus !== "Not matched to sponsor register" ? i : (i.identifier && byId.get(i.identifier)) || byName.get(norm(i.name));
    const name = title(sponsor?.name || i.name);
    if (seen.has(norm(name))) return [];
    seen.add(norm(name));
    return [{ slug: slugify(name), name, legalName: i.name, city: title(sponsor?.city || i.city), type: sponsor?.institutionType && sponsor.institutionType !== "Discover Uni reporting provider" ? sponsor.institutionType : "Higher education provider", identifier: i.identifier || undefined, sponsorStatus: sponsor?.sponsorStatus, courses: list, source: "UK Home Office register of student sponsors and Discover Uni 2026", sourceDate: courseSourceDate || i.sourceDate }];
  });
  uk.sort((a, b) => a.name.localeCompare(b.name));
  unique(uk);
  return uk;
}

// ---------- Canada (DLI list, by province) ----------
export type Dli = { name: string; city: string; campus?: string; dli: string; isPublic: boolean; pgwp: string; postgraduate: string };
export type Province = { slug: string; name: string; dlis: Dli[]; sourceDate?: string };
let ca: Province[] | null = null;
export function canadianProvinces(): Province[] {
  if (ca) return ca;
  const raw = read("canada.json").institutions as { name: string; city: string; region: string; campus?: string; institutionType: string; identifier: string; pgwpEligiblePrograms: string; postgraduateProgram: string; sourceDate?: string }[];
  const map = new Map<string, Province>();
  for (const i of raw) {
    const p = map.get(i.region) || { slug: slugify(i.region), name: i.region, dlis: [], sourceDate: i.sourceDate };
    p.dlis.push({ name: i.name.trim(), city: i.city, campus: i.campus && i.campus.trim() !== i.city ? i.campus : undefined, dli: i.identifier, isPublic: /public/i.test(i.institutionType), pgwp: i.pgwpEligiblePrograms, postgraduate: i.postgraduateProgram });
    map.set(i.region, p);
  }
  ca = [...map.values()].map((p) => ({ ...p, dlis: p.dlis.sort((a, b) => a.name.localeCompare(b.name) || a.city.localeCompare(b.city)) })).sort((a, b) => b.dlis.length - a.dlis.length);
  return ca;
}

/** Courses grouped by level, largest group first. */
export const byLevel = (courses: Course[]) => [...new Set(courses.map((c) => c.level))].map((level) => ({ level, items: courses.filter((c) => c.level === level) })).sort((a, b) => b.items.length - a.items.length);
