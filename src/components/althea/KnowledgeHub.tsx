"use client";
import { brand } from "@/config/brand";
import { useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, RotateCcw, Search } from "lucide-react";
import { destinations } from "@/data/destinations";
import { studyKnowledge, knowledgeReviewedAt, knowledgeUpdatedAt, planningChecklist } from "@/data/studyKnowledge";
import { chapterForTopic } from "@/data/guides/paths";

/** Source-reviewed guidance for seven countries, filterable and downloadable as a plain-text plan. */
export default function KnowledgeHub({ country, compact = false }: { country?: string; compact?: boolean }) {
  const [selected, setSelected] = useState(country || "france");
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const topics = Array.from(new Set(studyKnowledge.filter((e) => selected === "all" || e.country === selected).map((e) => e.topic)));
  const results = studyKnowledge.filter((e) => (selected === "all" || e.country === selected) && (topic === "all" || e.topic === topic) && (e.title + " " + e.summary + " " + e.publisher).toLowerCase().includes(query.toLowerCase()));

  function download() {
    const name = destinations.find((d) => d.slug === selected)?.name || "Global";
    const text = `${brand.shortName} · ${name} study planning\nSource review: ${knowledgeReviewedAt}; updated ${knowledgeUpdatedAt}\nGeneral guidance; recheck the official source before applying.\n\n` + results.map((e) => `${e.topic} · ${e.title}\n${e.summary}\n${e.effective ? "Applies: " + e.effective + "\n" : ""}Source: ${e.source}\nEvidence: ${e.basis}; reviewed ${e.reviewedAt || knowledgeReviewedAt}\n`).join("\n") + "\nPreparation checklist\n" + planningChecklist.map((g) => g.title + "\n" + g.items.map((x) => "[ ] " + x).join("\n")).join("\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `althea-${selected}-study-plan-2026-10-16.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="ms-kh" id="country-knowledge">
    <div className="ms-kh-review"><span className="mx-live" />Source review · {knowledgeReviewedAt} · updated {knowledgeUpdatedAt}<span>Manual review · recheck before applying</span></div>
    {!compact && <details className="ms-kh-scope"><summary>How this source review works</summary><p>These country summaries draw on official pages and clearly labelled search listings. The programme research desk provides published tuition and dates. Individual admission decisions, fee exceptions and visa eligibility depend on the applicable requirements. This is a dated editorial review, not a live sync of every university catalogue.</p><Link href="/knowledge#coverage">See coverage and review limits ↗</Link></details>}
    <div className="ms-kh-bar">
      {!country && <label className="ms-field"><span>Destination</span><select aria-label="Destination" value={selected} onChange={(e) => { setSelected(e.target.value); setTopic("all"); }}><option value="all">All countries</option>{destinations.map((d) => <option value={d.slug} key={d.slug}>{d.name}</option>)}</select></label>}
      <label className="ms-field ms-kh-search"><span>Search guidance</span><span className="ms-input-icon"><Search size={16} aria-hidden="true" /><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Scholarships, funds, APS, visa…" /></span></label>
      <button type="button" className="ms-btn ms-btn-ink" onClick={download}><span>Download your guide</span><ArrowDownToLine size={17} aria-hidden="true" /></button>
    </div>
    <div className="ms-pills" role="group" aria-label="Topic">
      <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")}>Every chapter</button>
      {topics.map((t) => <button type="button" key={t} aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</button>)}
    </div>
    <p role="status" className="ms-kh-count">{results.length} {results.length === 1 ? "guide" : "guides"} · source checks {knowledgeReviewedAt} · updates {knowledgeUpdatedAt}</p>
    <div className="ms-kh-grid" role="region" aria-label="Study guidance articles">{results.map((e) => <article id={e.id} key={e.id} className="ms-card ms-kh-card" data-spotlight>
      <p className="ms-card-kicker">{destinations.find((d) => d.slug === e.country)?.name} / {e.topic}</p>
      <h3>{e.title}</h3>
      {e.effective && <p className="ms-kh-applies">Applies · {e.effective}</p>}
      <div className="ms-card-body"><p>{e.summary}</p></div>
      <div className="ms-kh-source"><Link href={chapterForTopic(e.country, e.topic)}>Read the full chapter<ArrowUpRight size={14} aria-hidden="true" /></Link><span>Reviewed {e.reviewedAt || knowledgeReviewedAt} · Source: <a className="ms-kh-cite" href={e.source} target="_blank" rel="noopener noreferrer nofollow">{e.publisher}</a></span></div>
    </article>)}</div>
    {!results.length && <div className="ms-empty"><h3>No matching guidance.</h3><p>Try another subject or a broader keyword.</p><button type="button" className="ms-btn ms-btn-ghost" onClick={() => { setQuery(""); setTopic("all"); }}><span>Reset search</span><RotateCcw size={16} aria-hidden="true" /></button></div>}
  </div>;
}
