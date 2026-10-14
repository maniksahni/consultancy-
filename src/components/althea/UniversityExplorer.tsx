"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { programmeResearch, publishedMoney } from "@/data/programmeResearch";
import { universityCoverage } from "@/data/universityCoverage";

type RegistryInstitution = {
  id: string; country: string; name: string; nativeName?: string; city?: string; region?: string;
  campus?: string; institutionType?: string; publicPrivate?: string; identifier?: string;
  postgraduateProgram?: string; pgwpEligiblePrograms?: string; sponsorStatus?: string;
  registrySource?: string; sourceDate?: string; enrolment?: string | number;
};
type RegistryCourse = {
  id: string; institutionId: string; institution: string; name: string; city?: string;
  level?: string; subject?: string; language?: string; durationWeeks?: string;
  tuition: number | null; currency: string | null; nonTuitionFee?: string;
  estimatedTotalCost?: string; sourceDate?: string; registrySource?: string;
};
type CountryRegistry = {
  institutions: RegistryInstitution[]; courses: RegistryCourse[]; refreshedAt: string;
  institutionsLoaded: boolean; coursesLoaded: boolean; courseSource?: string; courseSourceDate?: string;
};
type RegistryManifest = { refreshedAt: string; countries: Record<string, { institutionCount: number; uniqueInstitutionCount?: number; courseCount: number; coverage: string }> };

const PAGE_SIZE = 30;
const COURSE_CATEGORIES = [
  { id: "technology", label: "Technology & IT", match: /computer|information technolog|information systems|cyber|software|data science|artificial intelligence|network|digital|informatique|numérique|cybersécurité|électronique/i },
  { id: "business", label: "Business & Management", match: /business|management|account|finance|marketing|commerce|entrepreneur|gestion|comptabil|économie|administration/i },
  { id: "engineering", label: "Engineering", match: /engineering|engineer|civil|mechanical|electrical|automotive|construction|maintenance|ingénieur|électrotechnique|bâtiment/i },
  { id: "health", label: "Health & Medicine", match: /health|medical|medicine|nursing|nurse|care|pharmacy|dent|infirm|santé|paramedic|welfare/i },
  { id: "education", label: "Education", match: /education|teaching|teacher|school|éducation|professorat|pédagog/i },
  { id: "law", label: "Law & Society", match: /law|legal|justice|social|humanit|society|psycholog|politic|droit|travail social|sciences humaines/i },
  { id: "creative", label: "Arts, Design & Media", match: /art|design|creative|media|communication|film|music|fashion|journal|audiovisual|spectacle|culture|graphique/i },
  { id: "hospitality", label: "Hospitality & Tourism", match: /hospitality|tourism|travel|hotel|restaurant|culinary|food|hôtellerie|tourisme|restauration/i },
  { id: "science", label: "Science & Environment", match: /science|biology|chemistry|physics|environment|agricultur|veterinary|math|scientifique|biologie|agronom/i },
  { id: "architecture", label: "Architecture & Building", match: /architecture|building|urban|interior|construction|bâtiment|urbanisme/i },
  { id: "other", label: "Other fields", match: /.*/ },
];

function courseCategory(course: RegistryCourse) {
  const haystack = `${course.name} ${course.subject || ""} ${course.level || ""}`;
  return COURSE_CATEGORIES.find((category) => category.id !== "other" && category.match.test(haystack))?.id || "other";
}

function tuitionUnavailableText(country: string) {
  if (country === "france") return "Tuition varies by institution and fee status; Parcoursup does not publish a course fee here.";
  if (country === "uk") return "Tuition varies by provider and fee status; this course source does not include the fee amount.";
  if (country === "usa") return "This is historical field and award data; current programme tuition is not included.";
  if (country === "australia") return "The provider did not publish a tuition amount in this CRICOS record.";
  return "The source does not provide a course-level tuition amount.";
}

function courseTuitionSummary(course: RegistryCourse, country: string, records: RegistryCourse[]) {
  const money = (amount: number) => new Intl.NumberFormat("en-IN", {
    style: "currency", currency: course.currency || "AUD", maximumFractionDigits: 0,
  }).format(amount);
  if (course.tuition === null && country === "australia") {
    const priced = records.filter((record) => record.tuition !== null && Number(record.durationWeeks) > 0);
    const comparable = priced.filter((record) => record.level === course.level && record.subject === course.subject);
    const levelMatches = priced.filter((record) => record.level === course.level);
    const peers = comparable.length >= 5 ? comparable : levelMatches.length >= 5 ? levelMatches : priced;
    const yearly = peers.map((record) => record.tuition! * 52 / Number(record.durationWeeks)).sort((a, b) => a - b);
    if (yearly.length) {
      const low = yearly[Math.floor((yearly.length - 1) * 0.1)];
      const high = yearly[Math.ceil((yearly.length - 1) * 0.9)];
      return {
        headline: `${money(low)}–${money(high)} estimated per year`,
        detail: `Planning estimate from the 10th–90th percentile of ${peers === comparable ? "matching CRICOS level and study field" : peers === levelMatches ? "matching CRICOS course level" : "all priced CRICOS course records"} (${yearly.length.toLocaleString("en-IN")} comparisons). Half-year equivalent: ${money(low / 2)}–${money(high / 2)}. Provider has no fee amount in this CRICOS record; ask the provider for its current quote.`,
        period: "CRICOS peer estimate · not a provider quote",
      };
    }
  }
  if (course.tuition === null && country === "uk") return {
    headline: "£11,400–£38,000 per year estimated",
    detail: "British Council international undergraduate tuition range across UK courses; not this provider’s quoted fee. Verify the course fee with the university.",
    period: "UK international undergraduate range · 2026 guide",
  };
  if (course.tuition === null && country === "france") return {
    headline: "€2,902–€3,950 per year public-sector reference",
    detail: "2026–27 standard non-EU registration rates for public Bachelor/Master study. Exemptions, engineering routes, private schools and institution-specific fees can differ; this is not a course quote.",
    period: "French public-fee schedule · annual reference",
  };
  if (course.tuition === null && country === "usa") return {
    headline: "$9,041–$19,534 yearly public-college reference",
    detail: "NCES 2024–25 average tuition and required fees for public out-of-state students at two-year and four-year institutions, in constant 2024 dollars. This historical study-field record has no current programme quote; private and international prices may differ.",
    period: "U.S. national institutional average · 2024–25",
  };
  if (course.tuition === null) return null;
  if (country === "australia") {
    const weeks = Number(course.durationWeeks);
    const annual = weeks > 0 ? course.tuition * 52 / weeks : null;
    return {
      headline: `${money(course.tuition)} total published course tuition`,
      detail: annual ? `About ${money(annual)} per 52 weeks / ${money(annual / 2)} per half-year, pro-rated from the registered ${weeks}-week course duration.` : "Published CRICOS tuition for the registered course; duration is not available to calculate an annual equivalent.",
      period: "CRICOS registered-course total",
    };
  }
  return { headline: `${money(course.tuition)} published tuition`, detail: "The source does not specify a comparable annual or semester period.", period: "Source period not stated" };
}

export default function UniversityExplorer({ initialCountry = "all" }: { initialCountry?: string }) {
  const [country, setCountry] = useState(initialCountry);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"institutions" | "courses">("institutions");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState("all");
  const [courseInstitutionFilter, setCourseInstitutionFilter] = useState("all");
  const [courseCityFilter, setCourseCityFilter] = useState("all");
  const [courseLevelFilter, setCourseLevelFilter] = useState("all");
  const [courseFeeLimit, setCourseFeeLimit] = useState("");
  const [page, setPage] = useState(0);
  const [manifest, setManifest] = useState<RegistryManifest | null>(null);
  const [loaded, setLoaded] = useState<Record<string, CountryRegistry>>({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch("/data/universities/manifest.json").then((r) => r.ok ? r.json() : Promise.reject()).then(setManifest).catch(() => setManifest(null));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCountry = params.get("country");
    if (requestedCountry && (requestedCountry === "all" || destinations.some((destination) => destination.slug === requestedCountry))) {
      setCountry(requestedCountry);
    }
    if (params.get("view") === "courses") setKind("courses");
  }, []);

  useEffect(() => {
    setPage(0);
    if (country === "all") return;
    const current = loaded[country];
    const wantsCourses = kind === "courses";
    if (current && (wantsCourses ? current.coursesLoaded : current.institutionsLoaded)) return;
    if (wantsCourses && manifest?.countries[country]?.courseCount === 0) return;
    let active = true;
    setLoading(true); setLoadError("");
    const path = wantsCourses ? `${country}-courses.json` : `${country}.json`;
    fetch(`/data/universities/${path}`)
      .then((r) => r.ok ? r.json() : Promise.reject(new Error("Could not load this country directory.")))
      .then((data: Partial<CountryRegistry>) => { if (active) setLoaded((old) => ({
        ...old,
        [country]: {
          institutions: data.institutions || old[country]?.institutions || [],
          courses: data.courses || old[country]?.courses || [],
          refreshedAt: data.refreshedAt || old[country]?.refreshedAt || "",
          courseSource: data.courseSource || old[country]?.courseSource,
          courseSourceDate: data.courseSourceDate || old[country]?.courseSourceDate,
          institutionsLoaded: data.institutions !== undefined || old[country]?.institutionsLoaded || false,
          coursesLoaded: data.courses !== undefined || old[country]?.coursesLoaded || false,
        },
      })); })
      .catch((error: Error) => { if (active) setLoadError(error.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [country, kind, loaded, manifest]);

  const selected = country === "all" ? null : universityCoverage[country];
  const directory = loaded[country];
  useEffect(() => {
    const requestedCourses = new URLSearchParams(window.location.search).get("view") === "courses";
    if (requestedCourses && kind === "courses" && directory?.coursesLoaded) {
      document.getElementById("course-finder")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [directory?.coursesLoaded, kind]);
  const courseCities = useMemo(() => [...new Set((directory?.courses || []).map((course) => course.city?.trim()).filter((city): city is string => Boolean(city)))].sort((a, b) => a.localeCompare(b)), [directory]);
  const courseLevels = useMemo(() => [...new Set((directory?.courses || []).map((course) => course.level?.trim()).filter((level): level is string => Boolean(level)))].sort((a, b) => a.localeCompare(b)), [directory]);
  const courseInstitutions = useMemo(() => {
    const institutions = new Map<string, { id: string; name: string; count: number }>();
    (directory?.courses || []).forEach((course) => {
      const entry = institutions.get(course.institutionId);
      if (entry) entry.count += 1;
      else institutions.set(course.institutionId, { id: course.institutionId, name: course.institution, count: 1 });
    });
    return [...institutions.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [directory]);
  const curated = useMemo(() => programmeResearch.filter((p) => country === "all" || p.country === country), [country]);
  const filteredInstitutions = useMemo(() => (directory?.institutions || []).filter((r) =>
    `${r.name} ${r.nativeName || ""} ${r.city || ""} ${r.region || ""} ${r.campus || ""} ${r.institutionType || ""} ${r.identifier || ""}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [directory, query]);
  const filteredCourses = useMemo(() => (directory?.courses || []).filter((r) =>
    (courseCategoryFilter === "all" || courseCategory(r) === courseCategoryFilter) &&
    (courseInstitutionFilter === "all" || r.institutionId === courseInstitutionFilter) &&
    (courseCityFilter === "all" || r.city === courseCityFilter) &&
    (courseLevelFilter === "all" || r.level === courseLevelFilter) &&
    (!courseFeeLimit || (r.tuition !== null && r.tuition <= Number(courseFeeLimit))) &&
    `${r.name} ${r.institution} ${r.city || ""} ${r.subject || ""} ${r.level || ""} ${r.language || ""}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [directory, query, courseCategoryFilter, courseInstitutionFilter, courseCityFilter, courseLevelFilter, courseFeeLimit]);
  const courseCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = Object.fromEntries(COURSE_CATEGORIES.map((category) => [category.id, 0]));
    (directory?.courses || []).forEach((course) => { counts[courseCategory(course)] += 1; });
    return counts;
  }, [directory]);
  const records = kind === "institutions" ? filteredInstitutions : filteredCourses;
  const pageCount = Math.ceil(records.length / PAGE_SIZE);
  const currentPageRecords = records.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function chooseCountry(slug: string) {
    setCountry(slug); setQuery(""); setPage(0);
    setKind(manifest?.countries[slug]?.courseCount ? "courses" : "institutions");
    setCourseCategoryFilter("all"); setCourseInstitutionFilter("all"); setCourseCityFilter("all"); setCourseLevelFilter("all"); setCourseFeeLimit("");
  }

    return <section className="university-explorer" aria-label="University and student cost explorer">
    <p className="snapshot-note">Search the country directories and reviewed course records inside this site. Registry coverage and data dates are stated for each country. A registry listing confirms the source&rsquo;s record; it does not mean every course, fee or room is included.</p>
    <div className="snapshot-filters">
      <label>Country<select aria-label="University country" value={country} onChange={(e) => chooseCountry(e.target.value)}><option value="all">All seven countries</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></label>
      {country !== "all" && <label>Find by name, subject, city or ID<input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} placeholder="Search this directory" /></label>}
    </div>

    {country !== "all" && <div className="directory-mode-switch" role="group" aria-label="Choose what to browse">
      <button type="button" className={kind === "courses" ? "active" : ""} aria-pressed={kind === "courses"} disabled={!manifest?.countries[country]?.courseCount && country !== "australia" && country !== "france"} onClick={() => { setKind("courses"); setPage(0); }}>{country === "usa" ? "Browse fields of study" : "Find a course"} <span>{(manifest?.countries[country]?.courseCount || 0).toLocaleString("en-IN")}</span></button>
      <button type="button" className={kind === "institutions" ? "active" : ""} aria-pressed={kind === "institutions"} onClick={() => { setKind("institutions"); setPage(0); }}>Browse institutions <span>{(manifest?.countries[country]?.institutionCount || 0).toLocaleString("en-IN")}</span></button>
    </div>}

    {country === "all" && <>
      <p className="snapshot-note" style={{ marginTop: 20 }}>Choose a country to load its line-by-line directory. Each directory is loaded separately so the whole catalogue is not downloaded at once.</p>
      <div className="planning-grid" style={{ margin: "24px 0" }}>{destinations.map((d) => {
        const counts = manifest?.countries[d.slug];
        const c = universityCoverage[d.slug];
        const recordLabel = d.slug === "usa" ? "historical field/credential records" : d.slug === "uk" ? "course/location records" : "course records";
        const browseLabel = d.slug === "usa" ? "Browse U.S. study fields" : "Find a course in " + d.name;
        return <article key={d.slug}><p className="eyebrow">{d.region}</p><h3>{d.name}</h3><p><strong>{counts ? `${(counts.uniqueInstitutionCount ?? counts.institutionCount).toLocaleString("en-IN")} listed institution names` : "Loading directory summary…"}</strong><small className="directory-record-note">Across {counts?.institutionCount.toLocaleString("en-IN") || "…"} source records/campuses</small></p>{Boolean(counts?.courseCount) && <p><strong>{counts!.courseCount.toLocaleString("en-IN")} {recordLabel}</strong></p>}<p>{counts?.coverage || "Country-level planning figures and reviewed records are available below."}</p><p>{c.living}</p><button className="text-button" type="button" onClick={() => chooseCountry(d.slug)}>{counts?.courseCount ? `${browseLabel} →` : `Browse ${d.name} institutions →`}</button></article>;
      })}</div>
    </>}

    {selected && <details className="directory-extra-info" style={{ margin: "18px 0" }}>
      <summary>Living costs, accommodation &amp; budget guide</summary>
      <article className="content-card" style={{ margin: "18px 0" }}>
      <p className="eyebrow">{selected.country} / STUDENT BUDGET & STAY</p>
      <h2>Plan the cost of living.</h2>
      <dl className="research-facts">
        <div><dt>Living-cost guide</dt><dd>{selected.living}<small>{selected.basis}</small></dd></div>
        <div><dt>Accommodation</dt><dd>{selected.housing}<small>{selected.housingNote}</small></dd></div>
        <div><dt>Build the full budget</dt><dd>{selected.planning}<small>Tuition, deposits and housing are separate budget lines.</small></dd></div>
      </dl>
      <p className="muted">Evidence publishers: {selected.source}. Reviewed {selected.reviewed}. Figures can change; city, course, duration and personal circumstances affect the actual amount.</p>
      </article>
    </details>}

    {country !== "all" && <>
      {manifest?.countries[country] && <p className="snapshot-note"><strong>Data scope:</strong> {manifest.countries[country].coverage} Snapshot retrieved {directory?.refreshedAt || manifest.refreshedAt}.</p>}
      {curated.length > 0 && <details className="directory-extra-info reviewed-programmes" style={{ margin: "18px 0" }}><summary>Reviewed programme guides ({curated.length})</summary><section className="knowledge-grid" style={{ margin: "18px 0" }} aria-label="Reviewed programme records">{curated.map((p) => <article key={p.slug}><p className="eyebrow">{p.level} · {p.city} · {p.duration}</p><h3><Link href={`/programmes/${p.slug}`}>{p.title}</Link></h3><p>{p.institution}</p><p><strong>{publishedMoney(p)}</strong> · {p.fee.period} · {p.fee.year}</p><p>{p.requirements}</p><p className="muted">Published fee category: {p.fee.category}. Application timing: {p.deadline.label} ({p.deadline.status}).</p><Link className="text-link" href={`/programmes/${p.slug}`}>Full in-site record →</Link></article>)}</section></details>}

      {directory && <>
        <div className="results-heading"><p role="status">{kind === "institutions" ? filteredInstitutions.length : filteredCourses.length} {kind === "institutions" ? "institution/campus records" : country === "usa" ? "historical field/credential records" : country === "uk" ? "course/location records" : "course records"}{query || (kind === "courses" && (courseCategoryFilter !== "all" || courseInstitutionFilter !== "all" || courseCityFilter !== "all" || courseLevelFilter !== "all" || courseFeeLimit)) ? " matching your filters" : ""}</p></div>
        {kind === "courses" && directory.courses.length > 0 && <section id="course-finder" className="course-category-picker" style={{ scrollMarginTop: 28 }} aria-label="Browse courses by field">
          <div className="course-category-heading"><div><p className="eyebrow">{country === "usa" ? "STUDY FIELD INDEX" : "COURSE FINDER"} · {selected?.country}</p><h2>What would you like to study?</h2></div><p>Start with a field, then narrow by {country === "uk" ? "delivery location" : "city"}, qualification or published course fee.</p></div>
          <div className="course-category-chips" role="group" aria-label="Course field filters">
            <button type="button" className={courseCategoryFilter === "all" ? "active" : ""} aria-pressed={courseCategoryFilter === "all"} onClick={() => { setCourseCategoryFilter("all"); setPage(0); }}>All courses <span>{directory.courses.length.toLocaleString("en-IN")}</span></button>
            {COURSE_CATEGORIES.filter((category) => courseCategoryCounts[category.id] > 0).map((category) => <button key={category.id} type="button" className={courseCategoryFilter === category.id ? "active" : ""} aria-pressed={courseCategoryFilter === category.id} onClick={() => { setCourseCategoryFilter(category.id); setPage(0); }}>{category.label} <span>{courseCategoryCounts[category.id].toLocaleString("en-IN")}</span></button>)}
          </div>
          <div className="course-quick-filters">
            <label>{country === "uk" ? "Delivery location" : "City"}<select value={courseCityFilter} onChange={(e) => { setCourseCityFilter(e.target.value); setPage(0); }}><option value="all">{country === "uk" ? "All locations" : "All cities"}</option>{courseCities.map((city) => <option key={city} value={city}>{city}</option>)}</select></label>
            <label>Qualification<select value={courseLevelFilter} onChange={(e) => { setCourseLevelFilter(e.target.value); setPage(0); }}><option value="all">All levels</option>{courseLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select></label>
            {directory.courses.some((course) => course.tuition !== null) && <label>Maximum published tuition<select value={courseFeeLimit} onChange={(e) => { setCourseFeeLimit(e.target.value); setPage(0); }}><option value="">Any published fee</option>{[10000, 20000, 30000, 50000, 75000, 100000].map((amount) => <option key={amount} value={amount}>{new Intl.NumberFormat("en-AU", { style: "currency", currency: directory.courses.find((course) => course.currency)?.currency || "AUD", maximumFractionDigits: 0 }).format(amount)} or less</option>)}</select></label>}
            <label>University ({courseInstitutions.length} with records)<select value={courseInstitutionFilter} onChange={(e) => { setCourseInstitutionFilter(e.target.value); setPage(0); }}><option value="all">All universities · {directory.courses.length.toLocaleString("en-IN")} records</option>{courseInstitutions.map((institution) => <option key={institution.id} value={institution.id}>{institution.name} · {institution.count.toLocaleString("en-IN")} {country === "usa" ? "fields" : country === "uk" ? "course/location records" : "courses"}</option>)}</select></label>
            {(courseCategoryFilter !== "all" || courseInstitutionFilter !== "all" || courseCityFilter !== "all" || courseLevelFilter !== "all" || courseFeeLimit || query) && <button className="course-reset-button" type="button" onClick={() => { setCourseCategoryFilter("all"); setCourseInstitutionFilter("all"); setCourseCityFilter("all"); setCourseLevelFilter("all"); setCourseFeeLimit(""); setQuery(""); setPage(0); }}>Clear filters</button>}
          </div>
        </section>}
        {kind === "institutions" ? <div className="knowledge-grid research-grid">{(currentPageRecords as RegistryInstitution[]).map((r) => <article key={r.id}>
          <p className="eyebrow">{r.region || destinations.find((d) => d.slug === country)?.name}{r.city ? ` · ${r.city}` : ""}</p>
          <h3>{r.name}</h3>
          {r.nativeName && r.nativeName !== r.name && <p>{r.nativeName}</p>}
          <dl className="research-facts">
            {r.institutionType && <div><dt>Institution type</dt><dd>{r.institutionType}</dd></div>}
            {r.campus && <div><dt>Campus / additional locations</dt><dd>{r.campus}</dd></div>}
            {r.identifier && <div><dt>Registry ID</dt><dd>{r.identifier}</dd></div>}
            {r.publicPrivate && <div><dt>Sector code</dt><dd>{r.publicPrivate}</dd></div>}
            {r.pgwpEligiblePrograms && <div><dt>PGWP-eligible programmes</dt><dd>{r.pgwpEligiblePrograms}</dd></div>}
            {r.sponsorStatus && <div><dt>Student sponsor status</dt><dd>{r.sponsorStatus}</dd></div>}
            {r.enrolment && <div><dt>Student enrolment</dt><dd>{r.enrolment}<small>2024 reported count</small></dd></div>}
          </dl>
          <p className="muted">Source: {r.registrySource} · record date {r.sourceDate}. Current course fees, housing availability and admissions are not part of this institution record.</p>
        </article>)}</div> : directory.courses.length ? <div className="knowledge-grid research-grid course-results">{(currentPageRecords as RegistryCourse[]).map((r) => <article key={r.id}>
          <p className="eyebrow">{r.city || destinations.find((d) => d.slug === country)?.name}{r.level ? ` · ${r.level}` : ""}</p>
          <h3>{r.name}</h3><p>{r.institution}</p>
          <p className="course-result-fee"><strong>{courseTuitionSummary(r, country, directory.courses)?.headline || tuitionUnavailableText(country)}</strong>{courseTuitionSummary(r, country, directory.courses) && <span> · {courseTuitionSummary(r, country, directory.courses)?.period}</span>}</p>
          <details className="course-result-details"><summary>Course details</summary><dl className="research-facts">
            <div><dt>{country === "australia" ? "Tuition / budget period" : "Tuition estimate / source"}</dt><dd>{courseTuitionSummary(r, country, directory.courses)?.headline || tuitionUnavailableText(country)}<small>{courseTuitionSummary(r, country, directory.courses)?.detail || "No numeric amount is present in the underlying course record."} {country === "australia" ? `CRICOS snapshot ${r.sourceDate || directory.courseSourceDate}` : country === "france" ? "Campus France 2026–27 rates · Parcoursup 2026 course record" : country === "uk" ? "British Council Study UK fee guide · Discover Uni 2026 course record" : country === "usa" ? "NCES IPEDS 2024–25 benchmark · College Scorecard historical award field" : "Source does not provide a course-level fee"}</small></dd></div>
            <div><dt>Additional / total cost</dt><dd>{r.estimatedTotalCost || r.nonTuitionFee || "Not published in this record"}</dd></div>
            {r.subject && <div><dt>Study field</dt><dd>{r.subject}</dd></div>}
            {r.durationWeeks && <div><dt>Duration</dt><dd>{r.durationWeeks} weeks</dd></div>}
            {r.language && <div><dt>Language</dt><dd>{r.language}</dd></div>}
          </dl><p className="muted">Registry evidence: {r.registrySource || directory.courseSource || (country === "australia" ? "Australian Government CRICOS course export" : "French Ministry of Higher Education · Parcoursup 2026 open-data catalogue")}{r.sourceDate || directory.courseSourceDate ? ` · snapshot ${r.sourceDate || directory.courseSourceDate}` : ""}. This listing does not include accommodation availability or every individual admission condition.</p></details>
        </article>)}</div> : <p className="snapshot-note">This official institution registry does not provide a line-by-line course and fee catalogue. The reviewed programme records above are the course-level information currently available in this site; no external search link is shown.</p>}
        {pageCount > 1 && <nav className="research-actions" aria-label="Directory pages" style={{ justifyContent: "center", marginTop: 28 }}><button className="text-button" disabled={page === 0} onClick={() => setPage(page - 1)}>← Previous</button><span>Page {page + 1} of {pageCount}</span><button className="text-button" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Next →</button></nav>}
      </>}
      {loading && <p role="status" className="snapshot-note">Loading this country’s in-site registry…</p>}
      {loadError && <p role="alert" className="snapshot-note">{loadError} Try selecting the country again.</p>}
      {directory && kind === "institutions" && !filteredInstitutions.length && <p className="snapshot-note">No institution records match this search.</p>}
      {directory && kind === "courses" && directory.coursesLoaded && !filteredCourses.length && <p className="snapshot-note">No registry course records match this search.</p>}
    </>}
  </section>;
}
