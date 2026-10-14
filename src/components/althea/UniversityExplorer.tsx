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
  estimatedTotalCost?: string; sourceDate?: string;
};
type CountryRegistry = {
  institutions: RegistryInstitution[]; courses: RegistryCourse[]; refreshedAt: string;
  institutionsLoaded: boolean; coursesLoaded: boolean;
};
type RegistryManifest = { refreshedAt: string; countries: Record<string, { institutionCount: number; courseCount: number; coverage: string }> };

const PAGE_SIZE = 30;

export default function UniversityExplorer({ initialCountry = "all" }: { initialCountry?: string }) {
  const [country, setCountry] = useState(initialCountry);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"institutions" | "courses">("institutions");
  const [page, setPage] = useState(0);
  const [manifest, setManifest] = useState<RegistryManifest | null>(null);
  const [loaded, setLoaded] = useState<Record<string, CountryRegistry>>({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch("/data/universities/manifest.json").then((r) => r.ok ? r.json() : Promise.reject()).then(setManifest).catch(() => setManifest(null));
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
  const curated = useMemo(() => programmeResearch.filter((p) => country === "all" || p.country === country), [country]);
  const filteredInstitutions = useMemo(() => (directory?.institutions || []).filter((r) =>
    `${r.name} ${r.nativeName || ""} ${r.city || ""} ${r.region || ""} ${r.campus || ""} ${r.institutionType || ""} ${r.identifier || ""}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [directory, query]);
  const filteredCourses = useMemo(() => (directory?.courses || []).filter((r) =>
    `${r.name} ${r.institution} ${r.city || ""} ${r.subject || ""} ${r.level || ""} ${r.language || ""}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [directory, query]);
  const records = kind === "institutions" ? filteredInstitutions : filteredCourses;
  const pageCount = Math.ceil(records.length / PAGE_SIZE);
  const currentPageRecords = records.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function chooseCountry(slug: string) { setCountry(slug); setQuery(""); setPage(0); setKind("institutions"); }

  return <section className="university-explorer" aria-label="University and student cost explorer">
    <p className="snapshot-note">Search the country directories and reviewed course records inside this site. Registry coverage and data dates are stated for each country. A registry listing confirms the source&rsquo;s record; it does not mean every course, fee or room is included.</p>
    <div className="snapshot-filters">
      <label>Country<select aria-label="University country" value={country} onChange={(e) => chooseCountry(e.target.value)}><option value="all">All seven countries</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></label>
      {country !== "all" && <label>Find by name, subject, city or ID<input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} placeholder="Search this directory" /></label>}
    </div>

    {country === "all" && <>
      <p className="snapshot-note" style={{ marginTop: 20 }}>Choose a country to load its line-by-line directory. Each directory is loaded separately so the whole catalogue is not downloaded at once.</p>
      <div className="planning-grid" style={{ margin: "24px 0" }}>{destinations.map((d) => {
        const counts = manifest?.countries[d.slug];
        const c = universityCoverage[d.slug];
        return <article key={d.slug}><p className="eyebrow">{d.region}</p><h3>{d.name}</h3><p><strong>{counts ? `${counts.institutionCount.toLocaleString("en-IN")} institution/campus records` : "Loading directory summary…"}</strong></p><p>{counts?.coverage || "Country-level planning figures and reviewed records are available below."}</p><p>{c.living}</p><button className="text-button" type="button" onClick={() => chooseCountry(d.slug)}>Open {d.name} directory →</button></article>;
      })}</div>
    </>}

    {selected && <article className="content-card" style={{ margin: "28px 0" }}>
      <p className="eyebrow">{selected.country} / STUDENT BUDGET & STAY</p>
      <h2>Plan the cost of living.</h2>
      <dl className="research-facts">
        <div><dt>Living-cost guide</dt><dd>{selected.living}<small>{selected.basis}</small></dd></div>
        <div><dt>Accommodation</dt><dd>{selected.housing}<small>{selected.housingNote}</small></dd></div>
        <div><dt>Build the full budget</dt><dd>{selected.planning}<small>Tuition, deposits and housing are separate budget lines.</small></dd></div>
      </dl>
      <p className="muted">Evidence publishers: {selected.source}. Reviewed {selected.reviewed}. Figures can change; city, course, duration and personal circumstances affect the actual amount.</p>
    </article>}

    {country !== "all" && <>
      {manifest?.countries[country] && <p className="snapshot-note"><strong>Data scope:</strong> {manifest.countries[country].coverage} Snapshot retrieved {directory?.refreshedAt || manifest.refreshedAt}.</p>}
      {curated.length > 0 && <section className="knowledge-grid" style={{ margin: "24px 0" }} aria-label="Reviewed programme records"><h2 style={{ gridColumn: "1 / -1" }}>Reviewed programme records</h2>{curated.map((p) => <article key={p.slug}><p className="eyebrow">{p.level} · {p.city} · {p.duration}</p><h3><Link href={`/programmes/${p.slug}`}>{p.title}</Link></h3><p>{p.institution}</p><p><strong>{publishedMoney(p)}</strong> · {p.fee.period} · {p.fee.year}</p><p>{p.requirements}</p><p className="muted">Published fee category: {p.fee.category}. Application timing: {p.deadline.label} ({p.deadline.status}).</p><Link className="text-link" href={`/programmes/${p.slug}`}>Full in-site record →</Link></article>)}</section>}

      {directory && <>
        <div className="results-heading"><p role="status">{kind === "institutions" ? filteredInstitutions.length : filteredCourses.length} {kind === "institutions" ? "institution/campus records" : "course records"}{query ? " matching this search" : ""}</p>
          <div className="research-actions">
            <label>Show<select aria-label="Directory records" value={kind} onChange={(e) => { setKind(e.target.value as "institutions" | "courses"); setPage(0); }}><option value="institutions">Institutions</option><option value="courses" disabled={!manifest?.countries[country]?.courseCount}>{manifest?.countries[country]?.courseCount ? `Courses (${manifest.countries[country].courseCount.toLocaleString("en-IN")})` : "Courses (not in this registry)"}</option></select></label>
          </div>
        </div>
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
        </article>)}</div> : directory.courses.length ? <div className="knowledge-grid research-grid">{(currentPageRecords as RegistryCourse[]).map((r) => <article key={r.id}>
          <p className="eyebrow">{r.city || destinations.find((d) => d.slug === country)?.name}{r.level ? ` · ${r.level}` : ""}</p>
          <h3>{r.name}</h3><p>{r.institution}</p>
          <dl className="research-facts">
            <div><dt>Published tuition</dt><dd>{r.tuition === null ? "Not published in this record" : new Intl.NumberFormat("en-IN", { style: "currency", currency: r.currency || "AUD", maximumFractionDigits: 0 }).format(r.tuition)}<small>Course fee as shown in CRICOS · snapshot {r.sourceDate}</small></dd></div>
            <div><dt>Additional / total cost</dt><dd>{r.estimatedTotalCost || r.nonTuitionFee || "Not published in this record"}</dd></div>
            {r.subject && <div><dt>Study field</dt><dd>{r.subject}</dd></div>}
            {r.durationWeeks && <div><dt>Duration</dt><dd>{r.durationWeeks} weeks</dd></div>}
            {r.language && <div><dt>Language</dt><dd>{r.language}</dd></div>}
          </dl>
          <p className="muted">Registry evidence: {country === "australia" ? "Australian Government CRICOS course export" : "French Ministry of Higher Education · Parcoursup 2026 open-data catalogue"}. This listing does not include accommodation availability or every individual admission condition.</p>
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
