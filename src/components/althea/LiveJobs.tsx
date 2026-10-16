"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, MapPin, MessageCircle, Search, Wifi } from "lucide-react";
import { brand } from "@/config/brand";

type LiveJob = {
  id: string; country: string; title: string; company: string; location: string; remote: boolean;
  type: string | null; category: string | null; level: string | null; salary: string | null;
  summary: string; posted: string; url: string; source: string;
};
type Feed = { updatedAt: string; sources: string[]; countries: Record<string, LiveJob[]> };

const COUNTRIES: [string, string][] = [["france", "France"], ["uk", "UK"], ["germany", "Germany"], ["ireland", "Ireland"], ["canada", "Canada"], ["usa", "USA"], ["australia", "Australia"]];
const GUIDE: Record<string, string> = { france: "/france/jobs" };
const guidePath = (c: string) => GUIDE[c] || `/destinations/${c}/jobs`;
const ENTRY = /\b(intern|internship|stage|stagiaire|junior|graduate|trainee|apprentice|alternance|werkstudent|working student|entry)\b/i;
const PAGE = 12;

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

const helpLink = (job: LiveJob) => `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  `Hello Harshita, I found this job on the Althéa website and would like help applying:\n${job.title} — ${job.company} (${job.location})\n${job.url}`,
)}`;

/** Real, open listings from public job boards; every job links to where it is posted. */
export default function LiveJobs() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [error, setError] = useState(false);
  const [country, setCountry] = useState("france");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"all" | "onsite" | "remote">("all");
  const [entry, setEntry] = useState(false);
  const [shown, setShown] = useState(PAGE);

  useEffect(() => {
    let live = true;
    fetch("/data/jobs/live.json").then((r) => (r.ok ? r.json() : Promise.reject())).then((d: Feed) => { if (live) setFeed(d); }).catch(() => { if (live) setError(true); });
    return () => { live = false; };
  }, []);
  useEffect(() => { setShown(PAGE); }, [country, query, mode, entry]);

  const jobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (feed?.countries[country] || []).filter((j) =>
      (mode === "all" || (mode === "remote") === j.remote) &&
      (!entry || ENTRY.test(`${j.title} ${j.level || ""}`) || /junior|entry/i.test(j.level || "")) &&
      (!q || `${j.title} ${j.company} ${j.category || ""} ${j.location}`.toLowerCase().includes(q)));
  }, [feed, country, query, mode, entry]);

  const name = COUNTRIES.find(([c]) => c === country)?.[1] || "";
  const updated = feed ? new Date(feed.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;

  return <div className="ms-livejobs">
    <div className="ms-livejobs-bar">
      <div className="ms-pills ms-livejobs-countries" role="group" aria-label="Country">
        {COUNTRIES.map(([c, label]) => <button key={c} type="button" aria-pressed={country === c} onClick={() => setCountry(c)}>
          {label}{feed ? <span>{feed.countries[c]?.length || 0}</span> : null}
        </button>)}
      </div>
      <div className="ms-livejobs-filters">
        <label className="ms-field ms-livejobs-search"><span className="sr-only">Search jobs</span><span className="ms-input-icon"><Search size={16} aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Role, company or field — e.g. data, marketing" aria-label="Search live jobs" /></span></label>
        <label className="ms-field"><span className="sr-only">Work mode</span>
          <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} aria-label="Work mode">
            <option value="all">On-site and remote</option><option value="onsite">On-site only</option><option value="remote">Remote only</option>
          </select></label>
        <label className="ms-livejobs-check"><input type="checkbox" checked={entry} onChange={(e) => setEntry(e.target.checked)} /> Internships &amp; entry-level</label>
      </div>
    </div>

    <p className="ms-livejobs-status" role="status">
      {error ? "Live jobs could not load right now. Please refresh, or browse the career guide below."
        : !feed ? "Loading today’s open jobs…"
        : <><strong>{jobs.length}</strong> open {jobs.length === 1 ? "job" : "jobs"} in {name}{updated ? <> · updated {updated}</> : null}</>}
    </p>

    <div className="ms-livejobs-layout">
      <ol className="ms-livejobs-list">
        {jobs.slice(0, shown).map((job) => <li key={job.id} className="ms-livejob">
          <div className="ms-livejob-head">
            <h3><a href={job.url} target="_blank" rel="noopener noreferrer nofollow">{job.title}</a></h3>
            <span className="ms-livejob-when"><Clock size={13} aria-hidden="true" />{ago(job.posted)}</span>
          </div>
          <p className="ms-livejob-meta"><Briefcase size={14} aria-hidden="true" /><strong>{job.company}</strong><span aria-hidden="true">·</span>{job.remote ? <Wifi size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}{job.location}</p>
          <p className="ms-livejob-tags">
            <span className={job.remote ? "is-remote" : "is-onsite"}>{job.remote ? "Remote" : "On-site"}</span>
            {job.type && <span>{job.type}</span>}
            {job.level && <span>{job.level}</span>}
            {job.category && <span>{job.category}</span>}
            {job.salary && <span className="is-salary">{job.salary}</span>}
          </p>
          {job.summary && <p className="ms-livejob-summary">{job.summary}</p>}
          <div className="ms-livejob-actions">
            <a className="ms-btn ms-btn-gold" href={job.url} target="_blank" rel="noopener noreferrer nofollow"><span>Apply on {job.source}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="ms-livejob-help" href={helpLink(job)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />Get help applying</a>
          </div>
        </li>)}
      </ol>

      <aside className="ms-livejobs-help" aria-label="Help with your application">
        <p className="ms-kicker">NEED HELP APPLYING?</p>
        <h3>Found a job? <em>Let’s make your application count.</em></h3>
        <ul>
          <li>CV and cover letter rewritten for the country and the role</li>
          <li>Check of your work rights and visa route for this job</li>
          <li>Interview preparation with someone who lives in Paris</li>
        </ul>
        <a className="ms-btn ms-btn-gold" href={`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Hello Harshita, I would like help with job applications abroad.")}`} target="_blank" rel="noopener noreferrer"><span>Contact us on WhatsApp</span><MessageCircle size={16} aria-hidden="true" /></a>
        <Link className="ms-link" href="/book-consultation">Book a career consultation</Link>
      </aside>
    </div>

    {jobs.length > shown && <button type="button" className="ms-btn ms-btn-ghost ms-livejobs-more" onClick={() => setShown((n) => n + PAGE)}><span>Show more jobs</span><ArrowUpRight size={16} aria-hidden="true" /></button>}
    {feed && !jobs.length && !error && <div className="ms-empty"><h3>No jobs match these filters.</h3><p>Try another field, include remote roles, or switch off the entry-level filter.</p></div>}

    <p className="ms-livejobs-note">
      Listings come from public job boards{feed?.sources.length ? ` (${feed.sources.join(", ")})` : ""} and open on the original posting. {brand.shortName} does not post, screen or guarantee these jobs.
      Before applying, check the work rights attached to your visa — see our <Link href={guidePath(country)}>{name} jobs guide</Link>.
    </p>
  </div>;
}
