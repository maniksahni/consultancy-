"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Briefcase, Languages, MapPin, MessageCircle, ScanSearch, Wifi, X } from "lucide-react";
import { brand } from "@/config/brand";
import { wordsForJob } from "@/data/frenchJobWords";
import AtsChecker from "./AtsChecker";

export type LiveJob = {
  id: string; country: string; title: string; company: string; location: string; remote: boolean;
  type: string | null; category: string | null; level: string | null; salary: string | null;
  summary: string; lang: "en" | "fr" | "de" | null; posted: string; url: string; source: string; d: string;
};
export type JobTab = "about" | "french" | "ats";

const chunks = new Map<string, Promise<Record<string, string>>>();
/** Descriptions are stored in small files of about 40 jobs; each file is fetched once. */
export function loadDescription(job: LiveJob): Promise<string> {
  if (!chunks.has(job.d)) chunks.set(job.d, fetch(`/data/jobs/desc/${job.d}.json`).then((r) => (r.ok ? r.json() : Promise.reject())).catch((e) => { chunks.delete(job.d); throw e; }));
  return chunks.get(job.d)!.then((all) => all[job.id] || job.summary);
}

const LANG: Record<string, string> = { en: "English", fr: "French", de: "German" };

/** Paragraphs, bullet lists and short headings from the plain-text description. */
function Description({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return <div className="ms-jobdesc">{blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const out: JSX.Element[] = [];
    let list: string[] = [];
    const flush = (k: string) => { if (list.length) { out.push(<ul key={k}>{list.map((l, j) => <li key={j}>{l}</li>)}</ul>); list = []; } };
    lines.forEach((line, j) => {
      if (line.startsWith("•")) { list.push(line.replace(/^•\s*/, "")); return; }
      flush(`${i}-${j}-l`);
      const heading = line.length < 70 && (/:$/.test(line) || (line === line.toUpperCase() && /[A-Z]/.test(line)) || (lines.length > 1 && j === 0 && !/[.!?]$/.test(line)));
      out.push(heading ? <h4 key={`${i}-${j}`}>{line.replace(/:$/, "")}</h4> : <p key={`${i}-${j}`}>{line}</p>);
    });
    flush(`${i}-end`);
    return out;
  })}</div>;
}

export default function JobDrawer({ job, tab, onTab, onClose }: { job: LiveJob | null; tab: JobTab; onTab: (t: JobTab) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [desc, setDesc] = useState<{ id: string; text: string } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // The page's smooth scrolling would otherwise take the wheel away from the drawer.
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (job && !dialog.open) { dialog.showModal(); lenis?.stop(); }
    if (!job && dialog.open) dialog.close();
    if (!job) lenis?.start();
  }, [job]);
  useEffect(() => () => (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start(), []);

  useEffect(() => {
    if (!job) return;
    let live = true;
    setFailed(false);
    loadDescription(job).then((text) => { if (live) setDesc({ id: job.id, text }); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [job]);

  const text = job && desc?.id === job.id ? desc.text : null;
  const words = useMemo(() => (job ? wordsForJob(job.title, text || job.summary, job.category) : null), [job, text]);
  useEffect(() => { ref.current?.querySelector(".ms-jobdrawer-body")?.scrollTo({ top: 0 }); }, [tab, job]);

  const help = job ? `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(`Hello Harshita, I found this job on the Althéa website and would like help applying:\n${job.title} — ${job.company} (${job.location})\n${job.url}`)}` : "#";

  return <dialog ref={ref} className="ms-jobdrawer" aria-labelledby="ms-jobdrawer-title" onClose={onClose} data-lenis-prevent
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    {job && <div className="ms-jobdrawer-panel">
      <header className="ms-jobdrawer-head">
        <div>
          <p className="ms-jobdrawer-company"><Briefcase size={14} aria-hidden="true" />{job.company}</p>
          <h2 id="ms-jobdrawer-title">{job.title}</h2>
          <p className="ms-livejob-meta">{job.remote ? <Wifi size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}{job.location}</p>
          <p className="ms-livejob-tags">
            <span className={job.remote ? "is-remote" : "is-onsite"}>{job.remote ? "Remote" : "On-site"}</span>
            {job.type && <span>{job.type}</span>}
            {job.level && <span>{job.level}</span>}
            {job.lang && <span>Ad in {LANG[job.lang]}</span>}
            {job.salary && <span className="is-salary">{job.salary}</span>}
          </p>
        </div>
        <button type="button" className="ms-jobdrawer-close" onClick={onClose} aria-label="Close job details"><X size={20} aria-hidden="true" /></button>
      </header>

      <div className="ms-jobdrawer-tabs" role="tablist" aria-label="Job details">
        {([["about", "The job", Briefcase], ["french", "French words", Languages], ["ats", "Check my CV", ScanSearch]] as const).map(([id, label, Icon]) =>
          <button key={id} type="button" role="tab" aria-selected={tab === id} aria-controls={`ms-jobtab-${id}`} id={`ms-jobtabbtn-${id}`} onClick={() => onTab(id)}><Icon size={15} aria-hidden="true" />{label}</button>)}
      </div>

      <div className="ms-jobdrawer-body">
        {tab === "about" && <section id="ms-jobtab-about" role="tabpanel" aria-labelledby="ms-jobtabbtn-about">
          {text ? <Description text={text} /> : failed ? <p className="ms-jobdesc">{job.summary} <br /><br />The full description could not load — read it on the original posting.</p> : <p className="ms-jobdesc-loading">Loading the full job description…</p>}
          <p className="ms-jobdrawer-source">Description as published by {job.company} on <a href={job.url} target="_blank" rel="noopener noreferrer nofollow">{job.source}</a>. Check the original posting for the latest version.</p>
        </section>}

        {tab === "french" && words && <section id="ms-jobtab-french" role="tabpanel" aria-labelledby="ms-jobtabbtn-french" className="ms-frwords">
          <p className="ms-frwords-lead">{job.country === "france"
            ? "French you will meet in this application — in the ad, the contract and the interview, even when the job is in English."
            : "Working towards France later? These are the French words for this kind of job."}</p>
          {words.inAd.length > 0 && <><h3>In this job ad</h3>
            <dl>{words.inAd.map((w) => <div key={w.fr} className="is-inad"><dt lang="fr">{w.fr}</dt><dd>{w.en}</dd></div>)}</dl></>}
          {words.more.length > 0 && <><h3>{words.inAd.length ? "Also useful" : "Words to know"}</h3>
            <dl>{words.more.map((w) => <div key={w.fr}><dt lang="fr">{w.fr}</dt><dd>{w.en}</dd></div>)}</dl></>}
          <p className="ms-frwords-tip"><b>Interview tip:</b> even for an English-speaking role, open with a sentence in French — <span lang="fr">« Bonjour, je suis ravi(e) de vous rencontrer »</span> (Hello, I’m delighted to meet you). French recruiters notice the effort.</p>
        </section>}

        {tab === "ats" && <section id="ms-jobtab-ats" role="tabpanel" aria-labelledby="ms-jobtabbtn-ats">
          <AtsChecker title={job.title} company={job.company} url={job.url} description={text || job.summary} />
        </section>}
      </div>

      <footer className="ms-jobdrawer-foot">
        <a className="ms-btn ms-btn-gold" href={job.url} target="_blank" rel="noopener noreferrer nofollow"><span>Apply on {job.source}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
        {tab !== "ats" ? <button type="button" className="ms-livejob-help" onClick={() => onTab("ats")}><ScanSearch size={15} aria-hidden="true" />Check my CV first</button>
          : <a className="ms-livejob-help" href={help} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />Get help applying</a>}
      </footer>
    </div>}
  </dialog>;
}
