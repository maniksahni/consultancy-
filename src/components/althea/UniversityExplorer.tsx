"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw, Search } from "lucide-react";
import { countryPhoto, paris } from "@/lib/paris";
import { studyKnowledge } from "@/data/studyKnowledge";
import { destinations } from "@/data/destinations";
import { programmeResearch, publishedMoney } from "@/data/programmeResearch";
import { createTuitionResolver, type FeeContext } from "@/lib/courseTuition";
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
  tuitionPeriod?: string; tuitionBasis?: string; feeAcademicYear?: string;
  tuitionSource?: string; tuitionSourceUrl?: string;
};
type CountryRegistry = {
  institutions: RegistryInstitution[]; courses: RegistryCourse[]; refreshedAt: string;
  institutionsLoaded: boolean; coursesLoaded: boolean; courseSource?: string; courseSourceDate?: string; feeContext?: FeeContext;
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

export default function UniversityExplorer({ initialCountry = "all" }: { initialCountry?: string }) {
  const [country, setCountry] = useState(initialCountry);
  const [query, setQuery] = useState("");
  const [institutionCityFilter, setInstitutionCityFilter] = useState("");
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
    const requestedQuery = params.get("q")?.trim();
    const requestedSubject = params.get("subject")?.trim();
    const requestedCity = params.get("city")?.trim();
    if (requestedQuery || requestedSubject) setQuery(requestedQuery || requestedSubject || "");
    if (requestedCity && params.get("view") === "courses") setCourseCityFilter(requestedCity);
    else if (requestedCity) setInstitutionCityFilter(requestedCity);
    const degree = params.get("level");
    if (degree === "Bachelor's") setCourseLevelFilter("degree:bachelor");
    if (degree === "Master's") setCourseLevelFilter("degree:master");
    if (degree === "PhD") setCourseLevelFilter("degree:doctorate");
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
    Promise.all([
      fetch(`/data/universities/${path}`).then((r) => r.ok ? r.json() : Promise.reject(new Error("Could not load this country directory."))),
      wantsCourses && ["france", "usa"].includes(country)
        ? fetch(`/data/universities/${country}-fee-context.json`).then((r) => r.ok ? r.json() : Promise.reject(new Error("Could not load sourced fee estimates. Please retry.")))
        : Promise.resolve(undefined),
    ]).then(([data, feeContext]) => ({ ...data, feeContext }))
      .then((data: Partial<CountryRegistry>) => { if (active) setLoaded((old) => ({
        ...old,
        [country]: {
          institutions: data.institutions || old[country]?.institutions || [],
          courses: data.courses || old[country]?.courses || [],
          refreshedAt: data.refreshedAt || old[country]?.refreshedAt || "",
          feeContext: data.feeContext || old[country]?.feeContext,
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
  const courseGuidance = studyKnowledge.filter(entry => entry.country === country && ["Admissions", "Programmes", "Scholarships", "Visa"].includes(entry.topic));
  useEffect(() => {
    const requestedCourses = new URLSearchParams(window.location.search).get("view") === "courses";
    if (requestedCourses && kind === "courses" && directory?.coursesLoaded) {
      document.getElementById("course-finder")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [directory?.coursesLoaded, kind]);
  const courseCities = useMemo(() => [...new Set((directory?.courses || []).map((course) => course.city?.trim()).filter((city): city is string => Boolean(city)))].sort((a, b) => a.localeCompare(b)), [directory]);
  const courseLevels = useMemo(() => [...new Set((directory?.courses || []).map((course) => course.level?.trim()).filter((level): level is string => Boolean(level)))].sort((a, b) => a.localeCompare(b)), [directory]);
  const curated = useMemo(() => programmeResearch.filter((p) => country === "all" || p.country === country), [country]);
  const filteredInstitutions = useMemo(() => (directory?.institutions || []).filter((r) =>
    (!institutionCityFilter || (r.city || "").toLocaleLowerCase() === institutionCityFilter.toLocaleLowerCase()) &&
    `${r.name} ${r.nativeName || ""} ${r.city || ""} ${r.region || ""} ${r.campus || ""} ${r.institutionType || ""} ${r.identifier || ""}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [directory, institutionCityFilter, query]);
  const resolveTuition = useMemo(() => createTuitionResolver(country, directory?.courses || [], directory?.feeContext), [country, directory]);
  const filteredCourses = useMemo(() => (directory?.courses || []).filter((r) =>
    (courseCategoryFilter === "all" || courseCategory(r) === courseCategoryFilter) &&
    (courseCityFilter === "all" || r.city === courseCityFilter) &&
    (courseLevelFilter === "all" || r.level === courseLevelFilter ||
      (courseLevelFilter === "degree:bachelor" && /bachelor|undergraduate|licence|\bBUT\b|\bBTS\b/i.test(r.level || "")) ||
      (courseLevelFilter === "degree:master" && /master|postgraduate/i.test(r.level || "")) ||
      (courseLevelFilter === "degree:doctorate" && /doctor|ph\.?d/i.test(r.level || ""))) &&
    (!courseFeeLimit || (resolveTuition(r).high <= Number(courseFeeLimit))) &&
    `${r.name} ${r.institution} ${r.city || ""} ${r.subject || ""} ${r.level || ""} ${r.language || ""}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [directory, query, courseCategoryFilter, courseCityFilter, courseLevelFilter, courseFeeLimit, resolveTuition]);
  // Derive university choices from the same city, level, budget and search matches as the results.
  const courseInstitutions = useMemo(() => {
    const institutions = new Map<string, { id: string; name: string }>();
    filteredCourses.forEach(course => institutions.set(course.institutionId, { id: course.institutionId, name: course.institution }));
    return [...institutions.values()].sort((a,b) => a.name.localeCompare(b.name));
  }, [filteredCourses]);
  useEffect(() => {
    if (courseInstitutionFilter !== "all" && !courseInstitutions.some(item => item.id === courseInstitutionFilter)) {
      setCourseInstitutionFilter("all"); setPage(0);
    }
  }, [courseInstitutions, courseInstitutionFilter]);
  const matchingCourses = courseInstitutionFilter === "all" ? filteredCourses : filteredCourses.filter(course => course.institutionId === courseInstitutionFilter);
  const courseCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = Object.fromEntries(COURSE_CATEGORIES.map((category) => [category.id, 0]));
    (directory?.courses || []).forEach((course) => { counts[courseCategory(course)] += 1; });
    return counts;
  }, [directory]);
  const records = kind === "institutions" ? filteredInstitutions : matchingCourses;
  const pageCount = Math.ceil(records.length / PAGE_SIZE);
  const currentPageRecords = records.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  // Resolve visible cards from the shared, precomputed fee index.
  const visibleCourseSummaries = useMemo(() => {
    if (kind !== "courses" || !directory) return new Map<string, ReturnType<typeof resolveTuition>>();
    return new Map<string, ReturnType<typeof resolveTuition>>((currentPageRecords as RegistryCourse[]).map((course) => [
      course.id,
      resolveTuition(course),
    ]));
  }, [kind, currentPageRecords, resolveTuition, directory]);

  function chooseCountry(slug: string) {
    setCountry(slug); setQuery(""); setInstitutionCityFilter(""); setPage(0);
    setKind(manifest?.countries[slug]?.courseCount ? "courses" : "institutions");
    setCourseCategoryFilter("all"); setCourseInstitutionFilter("all"); setCourseCityFilter("all"); setCourseLevelFilter("all"); setCourseFeeLimit("");
  }

  const countryName = destinations.find((d) => d.slug === country)?.name;
  const filtersActive = courseCategoryFilter !== "all" || courseInstitutionFilter !== "all" || courseCityFilter !== "all" || courseLevelFilter !== "all" || Boolean(courseFeeLimit) || Boolean(query);
  const resetFilters = () => { setCourseCategoryFilter("all"); setCourseInstitutionFilter("all"); setCourseCityFilter("all"); setCourseLevelFilter("all"); setCourseFeeLimit(""); setQuery(""); setPage(0); };

  return <section className="university-explorer ms-dir" aria-label="University and student cost explorer">
    <div className="ms-kh-bar ms-dir-bar">
      <label className="ms-field"><span>Country</span><select aria-label="University country" value={country} onChange={(e) => chooseCountry(e.target.value)}><option value="all">All countries</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.slug === "france" ? d.name : `${d.name} (coming soon)`}</option>)}</select></label>
      {country !== "all" && <label className="ms-field ms-kh-search"><span>Find by name, subject, city or ID</span><span className="ms-input-icon"><Search size={16} aria-hidden="true" /><input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} placeholder="Search this directory" /></span></label>}
      {country !== "all" && <div className="ms-dir-mode" role="group" aria-label="Choose what to browse">
        <button type="button" aria-pressed={kind === "courses"} disabled={!manifest?.countries[country]?.courseCount && country !== "australia" && country !== "france"} onClick={() => { setKind("courses"); setPage(0); }}>{country === "usa" ? "Fields of study" : "Courses"}</button>
        <button type="button" aria-pressed={kind === "institutions"} onClick={() => { setKind("institutions"); setPage(0); }}>Institutions</button>
      </div>}
    </div>

    {country === "all" && <div className="ms-dir-countries">{destinations.map((d) => {
      const counts = manifest?.countries[d.slug];
      const c = universityCoverage[d.slug];
      const photo = paris(countryPhoto[d.slug]);
      const recordLabel = d.slug === "usa" ? "historical field/credential records" : d.slug === "uk" ? "course/location records" : "course records";
      const browseLabel = d.slug === "usa" ? "Browse U.S. study fields" : "Find a course in " + d.name;
      return <article className="ms-dir-country" key={d.slug}>
        <div className="ms-dir-country-img"><Image src={photo.file} alt={photo.alt} fill sizes="(max-width:760px) 90vw, 30vw" /><span>{d.region}</span></div>
        <div className="ms-dir-country-body">
          <h3>{d.name}</h3><p>{d.focus}</p>
          <button className="ms-btn ms-btn-ink" type="button" onClick={() => chooseCountry(d.slug)}><span>{counts?.courseCount ? browseLabel : "Browse institutions"}</span><ArrowUpRight size={16} aria-hidden="true" /></button>
          <details className="ms-dir-details"><summary>Data coverage & living costs</summary><p>Country-level guidance and sourced study options.</p><p>{c.living}</p><p>Registry listings do not confirm every course, fee or available room.</p></details>
        </div>
      </article>;
    })}</div>}

    {country !== "all" && <div className="ms-dir-layout">
      <aside className="ms-dir-side" aria-label="Country costs and directory information">
        <div className="ms-dir-side-head"><p className="ms-kicker">{countryName?.toUpperCase()} · THE DIRECTORY</p></div>
        {selected && <details className="ms-dir-details">
          <summary>Living costs, accommodation &amp; budget guide</summary>
          <dl className="ms-dir-facts">
            <div><dt>Living-cost guide</dt><dd>{selected.living}<small>{selected.basis}</small></dd></div>
            <div><dt>Accommodation</dt><dd>{selected.housing}<small>{selected.housingNote}</small></dd></div>
            <div><dt>Build the full budget</dt><dd>{selected.planning}<small>Tuition, deposits and housing are separate budget lines.</small></dd></div>
          </dl>
          <p className="ms-muted">Evidence publishers: {selected.source}. Reviewed {selected.reviewed}. Figures can change; city, course, duration and personal circumstances affect the actual amount.</p>
          {selected.sourceUrls && <div className="ms-dir-sources">{selected.sourceUrls.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>}
        </details>}
        {manifest?.countries[country] && <details className="ms-dir-details"><summary>Directory coverage</summary><p><strong>Data scope:</strong> Coverage varies by country and programme. Snapshot retrieved {directory?.refreshedAt || manifest.refreshedAt}.</p></details>}
        {curated.length > 0 && <details className="ms-dir-details"><summary>Reviewed programme guides</summary><div className="ms-dir-curated">{curated.map((p) => <Link key={p.slug} href={`/programmes/${p.slug}`} className="ms-dir-curated-item"><small>{p.level} · {p.city} · {p.duration}</small><strong>{p.title}</strong><span>{p.institution}</span><span className="ms-dir-fee">{publishedMoney(p)} · {p.fee.period} · {p.fee.year}</span><span className="ms-muted">Application timing: {p.deadline.label} ({p.deadline.status}).</span></Link>)}</div></details>}
      </aside>

      <div className="ms-dir-main">
        {directory && <>
          {kind === "courses" && directory.courses.length > 0 && <section id="course-finder" className="ms-dir-finder" style={{ scrollMarginTop: 96 }} aria-label="Browse courses by field">
            <div className="ms-dir-finder-head"><p className="ms-kicker">{country === "usa" ? "STUDY FIELD INDEX" : "COURSE FINDER"} · {selected?.country}</p><h2>What would you like <em>to study?</em></h2><p>Start with a field, then narrow by {country === "uk" ? "delivery location" : "city"}, qualification or tuition budget.</p></div>
            <div className="ms-pills" role="group" aria-label="Course field filters">
              <button type="button" aria-pressed={courseCategoryFilter === "all"} onClick={() => { setCourseCategoryFilter("all"); setPage(0); }}>All courses </button>
              {COURSE_CATEGORIES.filter((category) => courseCategoryCounts[category.id] > 0).map((category) => <button key={category.id} type="button" aria-pressed={courseCategoryFilter === category.id} onClick={() => { setCourseCategoryFilter(category.id); setPage(0); }}>{category.label} </button>)}
            </div>
            <div className="ms-dir-filters">
              <label className="ms-field"><span>{country === "uk" ? "Delivery location" : "City"}</span><select value={courseCityFilter} onChange={(e) => { setCourseCityFilter(e.target.value); setPage(0); }}><option value="all">{country === "uk" ? "All locations" : "All cities"}</option>{courseCities.map((city) => <option key={city} value={city}>{city}</option>)}</select></label>
              <label className="ms-field"><span>Qualification</span><select value={courseLevelFilter} onChange={(e) => { setCourseLevelFilter(e.target.value); setPage(0); }}><option value="all">All levels</option><option value="degree:bachelor">Bachelor’s / Undergraduate</option><option value="degree:master">Master’s / Postgraduate</option><option value="degree:doctorate">PhD / Doctorate</option>{courseLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select></label>
              <label className="ms-field"><span>Maximum tuition / estimate</span><select value={courseFeeLimit} onChange={(e) => { setCourseFeeLimit(e.target.value); setPage(0); }}><option value="">Any tuition budget</option>{[10000, 20000, 30000, 50000, 75000, 100000].map((amount) => <option key={amount} value={amount}>{new Intl.NumberFormat("en-AU", { style: "currency", currency: resolveTuition(directory.courses[0]).currency, maximumFractionDigits: 0 }).format(amount)} or less</option>)}</select></label>
              <label className="ms-field"><span>University</span><select value={courseInstitutionFilter} onChange={(e) => { setCourseInstitutionFilter(e.target.value); setPage(0); }}><option value="all">All universities</option>{courseInstitutions.map((institution) => <option key={institution.id} value={institution.id}>{institution.name}</option>)}</select></label>
            </div>
          </section>}

          <div className="ms-dir-results-head">
            <p role="status">{query || filtersActive ? "Showing matching study options" : "Explore study options"}</p>
            {kind === "courses" && filtersActive && <button className="ms-btn ms-btn-ghost ms-dir-reset" type="button" onClick={resetFilters}><span>Clear filters</span><RotateCcw size={15} aria-hidden="true" /></button>}
          </div>

          {kind === "institutions" ? <div className="ms-dir-grid" role="region" aria-label="Institutions" tabIndex={0}>{(currentPageRecords as RegistryInstitution[]).map((r) => <article key={r.id} className="ms-dir-card" data-spotlight>
            <p className="ms-card-kicker">{r.region || countryName}{r.city ? ` · ${r.city}` : ""}</p>
            <h3>{r.name}</h3>
            {r.nativeName && r.nativeName !== r.name && <p className="ms-dir-native">{r.nativeName}</p>}
            <dl className="ms-dir-facts">
              {r.institutionType && <div><dt>Institution type</dt><dd>{r.institutionType}</dd></div>}
              {r.campus && <div><dt>Campus / additional locations</dt><dd>{r.campus}</dd></div>}
              {r.identifier && <div><dt>Registry ID</dt><dd>{r.identifier}</dd></div>}
              {r.publicPrivate && <div><dt>Sector code</dt><dd>{r.publicPrivate}</dd></div>}
              {r.pgwpEligiblePrograms && <div><dt>PGWP-eligible programmes</dt><dd>{r.pgwpEligiblePrograms}</dd></div>}
              {r.sponsorStatus && <div><dt>Student sponsor status</dt><dd>{r.sponsorStatus}</dd></div>}
              {r.enrolment && <div><dt>Student enrolment</dt><dd>{r.enrolment}<small>2024 reported count</small></dd></div>}
            </dl>
            <p className="ms-dir-source">Source: {r.registrySource} · record date {r.sourceDate}. Current course fees, housing availability and admissions are not part of this institution record.</p>
          </article>)}</div> : directory.courses.length ? <>
            <p className="ms-dir-note">Every course shows a published fee or a sourced approximate tuition budget. “Approx.” amounts are benchmarks, not confirmed course prices. Check the fee status, source year and methodology in Course details. Budget filtering uses the upper estimate; published amounts retain their stated period.</p>
            <div className="ms-dir-grid course-results">{(currentPageRecords as RegistryCourse[]).map((r) => {
              const tuition = visibleCourseSummaries.get(r.id);
              return <article key={r.id} className="ms-dir-card" data-spotlight>
                <p className="ms-card-kicker">{r.city || countryName}{r.level ? ` · ${r.level}` : ""}</p>
                <h3>{r.name}</h3><p className="ms-dir-inst">{r.institution}</p>
                <p className="ms-dir-fee"><strong>{tuition?.headline}</strong>{tuition && <span> · {tuition.period}</span>}</p>
                <details className="ms-dir-details ms-course-details" name="course-details"><summary>Course details</summary><div className="ms-course-body" data-lenis-prevent>
                  <dl className="ms-dir-facts">
                    <div><dt>Tuition / fee source</dt><dd>{tuition?.headline}<small>{tuition?.detail} {tuition?.source}. Estimate methodology checked 16 October 2026.{r.sourceDate || directory.courseSourceDate ? ` · record date ${r.sourceDate || directory.courseSourceDate}` : ""}</small>{tuition?.sourceUrl && <a href={tuition.sourceUrl} target="_blank" rel="noopener noreferrer">View fee source ↗</a>}{directory.feeContext?.courses?.[r.id]?.courseUrl && <a href={directory.feeContext.courses[r.id].courseUrl} target="_blank" rel="noopener noreferrer">Official course fiche ↗</a>}</dd></div>
                    <div><dt>{r.estimatedTotalCost ? "Published total cost" : r.nonTuitionFee ? "Additional charges" : "Budget scope"}</dt><dd>{r.estimatedTotalCost || r.nonTuitionFee || `${tuition?.headline}. Tuition budget only; accommodation, travel, insurance and other charges must be budgeted separately.`}</dd></div>
                    {r.subject && <div><dt>Study field</dt><dd>{r.subject}</dd></div>}
                    {r.durationWeeks && <div><dt>Duration</dt><dd>{r.durationWeeks} weeks</dd></div>}
                    {r.language && <div><dt>Language</dt><dd>{r.language}</dd></div>}
                  </dl>
                  <div className="ms-dir-guidance"><h4>Application & funding preparation</h4><p className="ms-muted">Country-level guidance for planning this course; the institution sets its individual entry requirements and calendar.</p>{courseGuidance.map((entry) => <details className="ms-course-topic" key={entry.id}><summary>{entry.topic}</summary><p>{entry.summary}</p><a href={entry.source} target="_blank" rel="noopener noreferrer">{entry.publisher} · {entry.topic.toLowerCase()} evidence ↗</a></details>)}<p><Link href={`/programmes?country=${country}`}>Compare detailed programme profiles →</Link></p></div>
                  <p className="ms-dir-source">Registry evidence: {r.registrySource || directory.courseSource || (country === "australia" ? "Australian Government CRICOS course export" : "French Ministry of Higher Education · Parcoursup 2026 open-data catalogue")}{r.sourceDate || directory.courseSourceDate ? ` · snapshot ${r.sourceDate || directory.courseSourceDate}` : ""}. This listing does not include accommodation availability or every individual admission condition.</p></div>
                </details>
              </article>;
            })}</div>
          </> : <p className="ms-dir-note">This official institution registry does not provide a line-by-line course and fee catalogue. The reviewed programme records above are the course-level information currently available in this site; no external search link is shown.</p>}

          {pageCount > 1 && <nav className="ms-dir-pages" aria-label="Directory pages"><button type="button" disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="Previous page"><ArrowLeft size={17} aria-hidden="true" /> Previous</button><span>Page {page + 1} of {pageCount}</span><button type="button" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)} aria-label="Next page">Next <ArrowRight size={17} aria-hidden="true" /></button></nav>}
        </>}
        {loading && <div role="status" className="ms-dir-loading"><span /><span /><span />Loading this country’s in-site registry…</div>}
        {loadError && <p role="alert" className="ms-dir-note">{loadError} Try selecting the country again.</p>}
        {directory && kind === "institutions" && !filteredInstitutions.length && <p className="ms-dir-note">No institution records match this search.</p>}
        {directory && kind === "courses" && directory.coursesLoaded && !matchingCourses.length && <p className="ms-dir-note">No registry course records match this search.</p>}
      </div>
    </div>}
  </section>;
}
