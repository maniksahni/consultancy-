import { countryGuides } from "@/data/guides";
import { comingSoonFor } from "@/lib/comingSoon";
import { indiaGuide } from "@/data/guides/india";
import { pageName } from "@/lib/trail";

/** A link in a page's "Where to go next" section: where it goes and what the reader will find there. */
export type NextStep = { href: string; title: string; see: string; kind: string };

/** What each main page answers, in one line, so a reader knows why to open it. */
const about: Record<string, [kind: string, see: string]> = {
  "/study-in-france": ["FRANCE", "The full France guide: degrees, fees, Campus France, visa, housing and work, chapter by chapter."],
  "/in-france": ["IN FRANCE", "Already in France: internships, alternance, your first job, CAF, housing and your titre de séjour."],
  "/pr-in-france": ["PR", "From student to resident: job-search permit, work permit, the 10-year card and French nationality."],
  "/settle-in-france": ["FRANCE", "Housing, residence permit, bank, health cover and daily life once you land in France."],
  "/career-support": ["CAREERS", "How we help with CVs, interviews, internships and your first job in France."],
  "/jobs": ["JOBS", "Thousands of real, open jobs, internships and alternance, with the French words for each job."],
  "/first-30-days-france": ["FRANCE", "Your first month in France, day by day: permit validation, bank, SIM, CAF and transport."],
  "/destinations": ["DESTINATIONS", "France today, with six more countries coming soon: each has a complete research guide."],
  "/compare": ["TOOL", "Compare countries on fees, living costs, visa rules and post-study work, in one table."],
  "/knowledge": ["TOOL", "Search every study-abroad answer by topic, plus a budget planner for your city."],
  "/universities": ["DIRECTORY", "Search real universities and courses by subject, country and city."],
  "/programmes": ["PROGRAMMES", "Researched programmes with published fees, deadlines and entry requirements."],
  "/campus-france-guide": ["FRANCE", "The Études en France and Campus France procedure, step by step, with dates and fees."],
  "/services": ["ALTHÉA", "What we do for you, from shortlist to settling in, and how it works."],
  "/about": ["ALTHÉA", "Who Harshita Kohli is and why Althéa advises Indian students from Paris."],
  "/reviews": ["STORIES", "What students say about working with us, in their own words."],
  "/mentorship-model": ["ALTHÉA", "How our one-to-one mentorship runs, stage by stage."],
  "/insights": ["JOURNAL", "Short reads on French study, careers and life in Paris."],
  "/book-consultation": ["NEXT STEP", "Book a consultation and get a plan built around your profile, budget and timeline."],
  "/faq": ["ANSWERS", "Quick answers to the questions students and parents ask us most."],
  "/scholarships": ["FUNDING", "Scholarships you can apply for, who qualifies and when to apply."],
  "/outcomes": ["ALTHÉA", "What a consultation with us leaves you with."],
  "/admissions-process": ["ADMISSIONS", "How applications work, from shortlist to offer, and where students go wrong."],
  "/from-india": ["FROM INDIA", "Loans, sending money, documents, tests, packing, scams and coming home, for every country."],
  "/site-map": ["EVERY PAGE", "Every page on the site, grouped by topic, so you can jump straight to what you need."],
  "/france/universities": ["FRANCE", "Universities in France, with what each is known for."],
  "/france/programmes": ["FRANCE", "Programmes in France across subjects and levels."],
  "/france/institutions": ["FRANCE", "French universities, grandes écoles and business schools explained."],
  "/france/resources": ["FRANCE", "The official French services and portals you will use, explained."],
};

const chapters = [...countryGuides, indiaGuide].flatMap((g) => g.chapters.map((c) => ({ ...c, guide: g })));
const chapterAt = new Map(chapters.map((c) => [c.path, c]));
const guideSlug = (country: string, slug: string) => {
  const g = countryGuides.find((x) => x.country === country);
  const fr: Record<string, string> = { visa: "visas", housing: "living", "why-study": "why-france", "application-process": "campus-france" };
  return g?.chapters.find((c) => c.slug === (country === "france" ? fr[slug] || slug : slug))?.path;
};

/** For each chapter topic: the same guide's related chapters, then pages elsewhere on the site. */
const related: Record<string, { same: string[]; also: string[] }> = {
  "why-study": { same: ["education-system", "costs"], also: ["/compare", "/from-india/timeline"] },
  "education-system": { same: ["admissions", "costs"], also: ["/universities", "/programmes"] },
  admissions: { same: ["application-process", "language-tests", "sop-lor-cv"], also: ["/from-india/timeline", "/from-india/documents-attestation"] },
  "application-process": { same: ["sop-lor-cv", "visa"], also: ["/from-india/documents-attestation", "/from-india/timeline"] },
  "language-tests": { same: ["admissions"], also: ["/from-india/language-tests", "/from-india/timeline"] },
  "sop-lor-cv": { same: ["application-process", "admissions"], also: ["/admissions-process", "/book-consultation"] },
  costs: { same: ["scholarships", "funding-loans", "housing"], also: ["/knowledge", "/from-india/sending-money-abroad"] },
  scholarships: { same: ["funding-loans", "costs"], also: ["/scholarships", "/from-india/education-loans"] },
  "funding-loans": { same: ["visa", "costs"], also: ["/from-india/education-loans", "/from-india/sending-money-abroad"] },
  visa: { same: ["funding-loans", "pre-departure"], also: ["/from-india/documents-attestation", "/from-india/scams-emergencies"] },
  "pre-departure": { same: ["arrival", "housing"], also: ["/from-india/packing-customs", "/from-india/timeline"] },
  arrival: { same: ["housing", "health-banking", "safety-wellbeing"], also: ["/first-30-days-france", "/from-india/scams-emergencies"] },
  housing: { same: ["arrival", "costs", "safety-wellbeing"], also: ["/from-india/scams-emergencies", "/settle-in-france"] },
  "health-banking": { same: ["arrival", "safety-wellbeing", "part-time-work"], also: ["/from-india/sending-money-abroad"] },
  "part-time-work": { same: ["jobs", "after-graduation"], also: ["/jobs", "/career-support"] },
  "after-graduation": { same: ["jobs"], also: ["/jobs", "/from-india/coming-back", "/career-support"] },
  jobs: { same: ["after-graduation", "part-time-work"], also: ["/jobs", "/career-support"] },
  "safety-wellbeing": { same: ["health-banking", "arrival"], also: ["/from-india/scams-emergencies", "/from-india/parents-guide"] },
  faq: { same: ["why-study", "costs", "visa"], also: ["/faq", "/from-india/parents-guide"] },
};
const france: Record<string, string> = { "why-france": "why-study", "campus-france": "application-process", visas: "visa", living: "housing" };

/** From India chapters: what to read next, in France and in the other guides. */
const india: Record<string, string[]> = {
  timeline: ["/compare", "/destinations", "/from-india/documents-attestation", "/admissions-process"],
  "education-loans": ["/from-india/sending-money-abroad", "/scholarships", "/france/funding-loans", "/from-india/parents-guide"],
  "sending-money-abroad": ["/from-india/education-loans", "/france/costs", "/knowledge", "/from-india/parents-guide"],
  "documents-attestation": ["/from-india/timeline", "/campus-france-guide", "/france/visas", "/from-india/scams-emergencies"],
  "language-tests": ["/france/language-tests", "/destinations/uk/language-tests", "/from-india/timeline", "/admissions-process"],
  "packing-customs": ["/france/pre-departure", "/first-30-days-france", "/from-india/timeline", "/france/arrival"],
  "scams-emergencies": ["/france/safety-wellbeing", "/destinations/uk/safety-wellbeing", "/from-india/parents-guide", "/from-india/documents-attestation"],
  "parents-guide": ["/from-india/education-loans", "/from-india/sending-money-abroad", "/from-india/scams-emergencies", "/reviews"],
  "coming-back": ["/france/after-graduation", "/jobs", "/from-india/documents-attestation", "/career-support"],
};

/** Hand-picked next pages for the main pages and page families. */
function pathsFor(path: string): string[] {
  const fixed: Record<string, string[]> = {
    "/study-in-france": ["/france/costs", "/campus-france-guide", "/universities", "/france/visas", "/jobs", "/from-india/timeline"],
    "/settle-in-france": ["/first-30-days-france", "/france/arrival", "/france/living", "/france/health-banking", "/france/safety-wellbeing", "/france/part-time-work"],
    "/career-support": ["/jobs", "/france/jobs", "/france/after-graduation", "/france/part-time-work", "/france/sop-lor-cv", "/book-consultation"],
    "/jobs": ["/career-support", "/france/jobs", "/france/part-time-work", "/france/after-graduation", "/from-india/coming-back", "/destinations"],
    "/first-30-days-france": ["/france/arrival", "/settle-in-france", "/france/health-banking", "/france/living", "/france/safety-wellbeing", "/from-india/packing-customs"],
    "/destinations": ["/compare", "/from-india/timeline", "/from-india", "/scholarships", "/universities", "/jobs"],
    "/compare": ["/destinations", "/from-india/timeline", "/scholarships", "/knowledge", "/jobs", "/book-consultation"],
    "/knowledge": ["/from-india/timeline", "/compare", "/faq", "/from-india", "/scholarships", "/site-map"],
    "/universities": ["/programmes", "/study-in-france", "/france/admissions", "/compare", "/scholarships", "/from-india/timeline"],
    "/programmes": ["/universities", "/france/admissions", "/campus-france-guide", "/scholarships", "/france/costs", "/study-in-france"],
    "/campus-france-guide": ["/france/admissions", "/france/sop-lor-cv", "/france/visas", "/from-india/documents-attestation", "/from-india/timeline", "/book-consultation"],
    "/scholarships": ["/france/scholarships", "/from-india/education-loans", "/france/costs", "/compare", "/from-india/sending-money-abroad", "/book-consultation"],
    "/admissions-process": ["/from-india/timeline", "/campus-france-guide", "/france/admissions", "/france/sop-lor-cv", "/from-india/documents-attestation", "/book-consultation"],
    "/faq": ["/from-india/parents-guide", "/knowledge", "/from-india/timeline", "/compare", "/reviews", "/book-consultation"],
    "/from-india": ["/from-india/timeline", "/destinations", "/compare", "/study-in-france", "/scholarships", "/book-consultation"],
    "/book-consultation": ["/services", "/reviews", "/about", "/from-india/timeline", "/faq", "/outcomes"],
    "/site-map": ["/from-india/timeline", "/study-in-france", "/destinations", "/jobs", "/faq", "/book-consultation"],
  };
  if (fixed[path]) return fixed[path];
  if (["/services", "/about", "/reviews", "/mentorship-model", "/outcomes"].includes(path)) return ["/book-consultation", "/services", "/reviews", "/about", "/mentorship-model", "/from-india/timeline"];
  if (["/privacy", "/terms", "/acknowledgements"].includes(path)) return ["/about", "/faq", "/site-map", "/book-consultation"];
  if (path.startsWith("/france/universities/")) return ["/france/admissions", "/campus-france-guide", "/france/costs", "/france/visas", "/france/scholarships", "/france/universities"];
  if (path.startsWith("/universities/australia")) return ["/destinations/australia/costs", "/destinations/australia/visa", "/destinations/australia/admissions", "/destinations/australia/after-graduation", "/universities/australia", "/from-india/education-loans"];
  if (path.startsWith("/universities/uk")) return ["/destinations/uk/costs", "/destinations/uk/visa", "/destinations/uk/application-process", "/destinations/uk/after-graduation", "/universities/uk", "/from-india/education-loans"];
  if (path.startsWith("/universities/canada")) return ["/destinations/canada/after-graduation", "/destinations/canada/visa", "/destinations/canada/costs", "/destinations/canada/education-system", "/universities/canada", "/from-india/timeline"];
  if (path.startsWith("/cities/")) return ["/study-in-france", "/france/living", "/france/costs", "/first-30-days-france", "/universities", "/jobs"];
  if (path.startsWith("/programmes/")) return ["/programmes", "/france/admissions", "/campus-france-guide", "/scholarships", "/france/costs", "/universities"];
  if (path.startsWith("/insights")) return ["/study-in-france", "/knowledge", "/insights", "/from-india/timeline", "/jobs", "/book-consultation"];
  const hub = countryGuides.find((g) => g.hubPath === path);
  if (hub) return [guideSlug(hub.country, "admissions"), guideSlug(hub.country, "costs"), guideSlug(hub.country, "visa"), "/compare", "/from-india/timeline", "/jobs"].filter(Boolean) as string[];
  const chapter = chapterAt.get(path);
  if (chapter && chapter.guide.country === "india") return india[chapter.slug] || ["/from-india/timeline", "/destinations"];
  if (chapter) {
    const topic = related[france[chapter.slug] || chapter.slug] || related.faq;
    return [...topic.same.map((s) => guideSlug(chapter.guide.country, s)).filter(Boolean) as string[], ...topic.also, "/compare"];
  }
  if (path.startsWith("/france/")) return ["/study-in-france", "/france/admissions", "/campus-france-guide", "/scholarships", "/compare", "/universities"];
  return ["/from-india/timeline", "/study-in-france", "/destinations", "/jobs", "/faq", "/book-consultation"];
}

/** Up to six pages worth opening after this one, each with what the reader will find there. */
export function nextStepsFor(path: string, limit = 6): NextStep[] {
  // Coming-soon destinations offer no booking; point those readers to France instead.
  const soon = Boolean(comingSoonFor(path));
  const seen = new Set(soon ? [path, "/book-consultation"] : [path]);
  const out: NextStep[] = [];
  for (const href of soon ? [...pathsFor(path), "/study-in-france"] : pathsFor(path)) {
    if (seen.has(href) || out.length >= limit) continue;
    seen.add(href);
    const c = chapterAt.get(href);
    if (c) { out.push({ href, title: c.label, see: c.description, kind: c.guide.country === "india" ? "FROM INDIA" : `${c.guide.name.toUpperCase()} GUIDE` }); continue; }
    const [kind, see] = about[href] || ["GUIDE", ""];
    out.push({ href, title: pageName(href), see, kind });
  }
  return out;
}
