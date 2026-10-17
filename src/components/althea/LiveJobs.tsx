"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, Languages, MapPin, MessageCircle, ScanSearch, Search, Wifi } from "lucide-react";
import { brand } from "@/config/brand";
import JobDrawer, { type JobTab, type LiveJob } from "./JobDrawer";

type Feed = { updatedAt: string; sources: string[]; counts: Record<string, number> };

const COUNTRIES: [string, string][] = [["france", "France"], ["uk", "UK"], ["germany", "Germany"], ["ireland", "Ireland"], ["canada", "Canada"], ["usa", "USA"], ["australia", "Australia"]];
const GUIDE: Record<string, string> = { france: "/france/jobs" };
const guidePath = (c: string) => GUIDE[c] || `/destinations/${c}/jobs`;
const ENTRY = /\b(intern|internship|stage|stagiaire|junior|graduate|trainee|apprentice|apprenti|alternance|alternant|werkstudent|working student|entry|débutant)\b/i;
const PAGE = 12;
const PAGE_PHONE = 6; // phones show fewer cards per step so the list stays short

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

const lists = new Map<string, Promise<LiveJob[]>>();
const loadList = (country: string) => {
  if (!lists.has(country)) lists.set(country, fetch(`/data/jobs/list-${country}.json`).then((r) => (r.ok ? r.json() : Promise.reject())).catch((e) => { lists.delete(country); throw e; }));
  return lists.get(country)!;
};

/** A job board built from public listings: full descriptions, French vocabulary and a CV check, then apply on the original posting. */
export default function LiveJobs() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [jobsBy, setJobsBy] = useState<Record<string, LiveJob[]>>({});
  const [error, setError] = useState(false);
  const [country, setCountry] = useState("france");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"all" | "onsite" | "remote">("all");
  const [lang, setLang] = useState<"all" | "en" | "fr" | "de">("all");
  const [entry, setEntry] = useState(false);
  const [page, setPage] = useState(PAGE);
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<LiveJob | null>(null);
  const [tab, setTab] = useState<JobTab>("about");

  useEffect(() => {
    let live = true;
    fetch("/data/jobs/live.json").then((r) => (r.ok ? r.json() : Promise.reject())).then((d: Feed) => { if (live) setFeed(d); }).catch(() => { if (live) setError(true); });
    return () => { live = false; };
  }, []);

  useEffect(() => {
    let live = true;
    loadList(country).then((list) => { if (live) setJobsBy((prev) => ({ ...prev, [country]: list })); }).catch(() => { if (live) setError(true); });
    return () => { live = false; };
  }, [country]);

  // A shared link (#job=france~id) opens that job directly.
  useEffect(() => {
    const m = window.location.hash.match(/^#job=([a-z]+)~(.+)$/);
    if (!m) return;
    const [, c, id] = m;
    if (COUNTRIES.some(([k]) => k === c)) setCountry(c);
    loadList(c).then((list) => { const job = list.find((j) => j.id === decodeURIComponent(id)); if (job) { setOpen(job); document.getElementById("live-jobs")?.scrollIntoView(); } }).catch(() => {});
  }, []);

  useEffect(() => { if (window.matchMedia("(max-width: 640px)").matches) setPage(PAGE_PHONE); }, []);
  useEffect(() => { setShown(page); }, [page, country, query, mode, lang, entry]);

  const openJob = useCallback((job: LiveJob, t: JobTab = "about") => {
    setTab(t); setOpen(job);
    try { history.replaceState(null, "", `#job=${job.country}~${encodeURIComponent(job.id)}`); } catch {}
  }, []);
  const closeJob = useCallback(() => {
    setOpen(null);
    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch {}
  }, []);

  const all = jobsBy[country];
  const jobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (all || []).filter((j) =>
      (mode === "all" || (mode === "remote") === j.remote) &&
      (lang === "all" || j.lang === lang) &&
      (!entry || ENTRY.test(`${j.title} ${j.level || ""} ${j.type || ""}`) || /junior|entry/i.test(j.level || "")) &&
      (!q || `${j.title} ${j.company} ${j.category || ""} ${j.location}`.toLowerCase().includes(q)));
  }, [all, query, mode, lang, entry]);

  const name = COUNTRIES.find(([c]) => c === country)?.[1] || "";
  const updated = feed ? new Date(feed.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;
  const total = feed ? Object.values(feed.counts).reduce((a, b) => a + b, 0) : 0;

  return <div className="ms-livejobs">
    <div className="ms-livejobs-bar">
      <div className="ms-pills ms-livejobs-countries" role="group" aria-label="Country">
        {COUNTRIES.map(([c, label]) => <button key={c} type="button" aria-pressed={country === c} onClick={() => setCountry(c)}>
          {label}{feed ? <span>{feed.counts[c] || 0}</span> : null}
        </button>)}
      </div>
      <div className="ms-livejobs-filters">
        <label className="ms-field ms-livejobs-search"><span className="sr-only">Search jobs</span><span className="ms-input-icon"><Search size={16} aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Role, company or field — e.g. data, marketing" aria-label="Search live jobs" /></span></label>
        <label className="ms-field"><span className="sr-only">Work mode</span>
          <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} aria-label="Work mode">
            <option value="all">On-site and remote</option><option value="onsite">On-site only</option><option value="remote">Remote only</option>
          </select></label>
        <label className="ms-field"><span className="sr-only">Language of the job ad</span>
          <select value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} aria-label="Language of the job ad">
            <option value="all">Any language</option><option value="en">Ads in English</option><option value="fr">Ads in French</option><option value="de">Ads in German</option>
          </select></label>
        <label className="ms-livejobs-check"><input type="checkbox" checked={entry} onChange={(e) => setEntry(e.target.checked)} /> Internships &amp; entry-level</label>
      </div>
    </div>

    <p className="ms-livejobs-status" role="status">
      {error && !all ? "Live jobs could not load right now. Please refresh, or browse the career guide below."
        : !all ? "Loading today’s open jobs…"
        : <><strong>{jobs.length}</strong> open {jobs.length === 1 ? "job" : "jobs"} in {name}{total ? <> · {total.toLocaleString("en-GB")} across seven countries</> : null}{updated ? <> · updated {updated}</> : null}</>}
    </p>

    <div className="ms-livejobs-layout">
      <div className="ms-livejobs-main">
      <ol className="ms-livejobs-list">
        {jobs.slice(0, shown).map((job) => <li key={job.id} className="ms-livejob">
          <div className="ms-livejob-head">
            <h3><button type="button" className="ms-livejob-open" onClick={() => openJob(job)}>{job.title}</button></h3>
            <span className="ms-livejob-when"><Clock size={13} aria-hidden="true" />{ago(job.posted)}</span>
          </div>
          <p className="ms-livejob-meta"><Briefcase size={14} aria-hidden="true" /><strong>{job.company}</strong><span aria-hidden="true">·</span>{job.remote ? <Wifi size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}{job.location}</p>
          <p className="ms-livejob-tags">
            <span className={job.remote ? "is-remote" : "is-onsite"}>{job.remote ? "Remote" : "On-site"}</span>
            {job.type && <span>{job.type}</span>}
            {job.level && !/not applicable|^n\/a$/i.test(job.level) && <span>{job.level}</span>}
            {job.lang === "fr" && <span className="is-fr">Ad in French</span>}
            {job.lang === "de" && <span>Ad in German</span>}
            {job.salary && <span className="is-salary">{job.salary}</span>}
          </p>
          {job.summary && <p className="ms-livejob-summary">{job.summary}</p>}
          <div className="ms-livejob-actions">
            <button type="button" className="ms-btn ms-btn-gold" onClick={() => openJob(job)}><span>View full job</span><ArrowUpRight size={16} aria-hidden="true" /></button>
            <button type="button" className="ms-livejob-tool" onClick={() => openJob(job, "french")}><Languages size={15} aria-hidden="true" />French words</button>
            <button type="button" className="ms-livejob-tool" onClick={() => openJob(job, "ats")}><ScanSearch size={15} aria-hidden="true" />ATS CV check</button>
            <a className="ms-livejob-apply" href={job.url} target="_blank" rel="noopener noreferrer nofollow">Apply on {job.source}<ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </li>)}
      </ol>
      {jobs.length > shown && <button type="button" className="ms-btn ms-btn-ghost ms-livejobs-more" onClick={() => setShown((n) => n + page)}><span>Show more jobs ({jobs.length - shown} left)</span><ArrowUpRight size={16} aria-hidden="true" /></button>}
      </div>

      <aside className="ms-livejobs-help" aria-label="Help with your application">
        <p className="ms-kicker">BEFORE YOU APPLY</p>
        <h3>Read it, learn the words, <em>check your CV.</em></h3>
        <ul>
          <li><b>Full job description</b> for every listing, then apply on the original posting</li>
          <li><b>French words</b> you will meet in that ad, the contract and the interview</li>
          <li><b>ATS check</b> of your CV against the exact job — read on your device, never uploaded</li>
        </ul>
        <a className="ms-btn ms-btn-gold" href={`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Hello Harshita, I would like help with job applications abroad.")}`} target="_blank" rel="noopener noreferrer"><span>Contact us on WhatsApp</span><MessageCircle size={16} aria-hidden="true" /></a>
        <Link className="ms-link" href="/book-consultation">Book a CV and career session</Link>
      </aside>
    </div>

    {all && !jobs.length && <div className="ms-empty"><h3>No jobs match these filters.</h3><p>Try another field or language, include remote roles, or switch off the entry-level filter.</p></div>}

    <p className="ms-livejobs-note">
      Listings come from public job boards{feed?.sources.length ? ` (${feed.sources.join(", ")})` : ""}; descriptions are shown as each company published them and every application happens on the original posting. {brand.shortName} does not post, screen or guarantee these jobs.
      Before applying, check the work rights attached to your visa — see our <Link href={guidePath(country)}>{name} jobs guide</Link>.
    </p>

    <JobDrawer job={open} tab={tab} onTab={setTab} onClose={closeJob} />
  </div>;
}
