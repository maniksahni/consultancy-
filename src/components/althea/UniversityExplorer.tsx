"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { programmeResearch, publishedMoney } from "@/data/programmeResearch";
import { universityCoverage } from "@/data/universityCoverage";

export default function UniversityExplorer({ initialCountry = "all" }: { initialCountry?: string }) {
  const [country, setCountry] = useState(initialCountry);
  const [query, setQuery] = useState("");
  const rows = useMemo(() => programmeResearch.filter((p) =>
    (country === "all" || p.country === country) &&
    `${p.institution} ${p.title} ${p.city} ${p.requirements}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [country, query]);
  const institutions = useMemo(() => {
    const grouped = new Map<string, typeof rows>();
    for (const row of rows) grouped.set(row.institution, [...(grouped.get(row.institution) || []), row]);
    return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [rows]);
  const selected = country === "all" ? null : universityCoverage[country];

  return <section className="university-explorer" aria-label="University and student cost explorer">
    <p className="snapshot-note">This section stays on this website. It brings together the university and programme records reviewed so far. The collection is not a complete register of every college or course; missing figures are not guessed.</p>
    <div className="snapshot-filters">
      <label>Country<select aria-label="University country" value={country} onChange={(e) => setCountry(e.target.value)}><option value="all">All seven countries</option>{destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></label>
      <label>Find a university or course<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="University, subject or city" /></label>
    </div>
    <p role="status">{institutions.length} universities · {rows.length} researched programme records in this view</p>

    {selected && <article className="content-card" style={{ margin: "28px 0" }}>
      <p className="eyebrow">{selected.country} / STUDENT BUDGET & STAY</p>
      <h2>Plan the cost of living.</h2>
      <dl className="research-facts">
        <div><dt>Living-cost guide</dt><dd>{selected.living}<small>{selected.basis}</small></dd></div>
        <div><dt>Accommodation</dt><dd>{selected.housing}<small>{selected.housingNote}</small></dd></div>
        <div><dt>Build the full budget</dt><dd>{selected.planning}<small>Tuition, deposits and housing are not interchangeable; add each once.</small></dd></div>
      </dl>
      <p className="muted">Evidence: {selected.source}. Reviewed {selected.reviewed}. Figures can change; city, course, duration and personal circumstances affect the actual amount.</p>
    </article>}
    {country === "all" && <div className="planning-grid" style={{ margin: "24px 0" }}>{destinations.map((d) => { const c = universityCoverage[d.slug]; return <article key={d.slug}><p className="eyebrow">{d.region}</p><h3>{d.name}</h3><p><strong>{c.living}</strong></p><p>{c.basis}</p><button className="text-button" type="button" onClick={() => setCountry(d.slug)}>View {d.name} universities and stay information →</button></article>; })}</div>}

    {institutions.map(([name, courses]) => <article className="snapshot-record" key={name}>
      <p className="eyebrow">{destinations.find((d) => d.slug === courses[0].country)?.name} · {courses[0].city}</p>
      <h2>{name}</h2>
      <p>{courses.length} researched programme{courses.length === 1 ? "" : "s"} in this collection. This is not the institution&apos;s complete course catalogue.</p>
      <div className="knowledge-grid">{courses.map((p) => <article key={p.slug}>
        <p className="eyebrow">{p.level} · {p.duration}</p>
        <h3><Link href={`/programmes/${p.slug}`}>{p.title}</Link></h3>
        <dl className="research-facts">
          <div><dt>Published tuition</dt><dd>{publishedMoney(p)}<small>{p.fee.period} · {p.fee.year}</small></dd></div>
          <div><dt>Fee category</dt><dd className="research-small">{p.fee.category}<small>{p.fee.note}</small></dd></div>
          <div><dt>Application timing</dt><dd className="research-small">{p.deadline.label}<small>{p.deadline.status} · {p.deadline.scope}</small></dd></div>
          <div><dt>Entry preparation</dt><dd className="research-small">{p.requirements}</dd></div>
        </dl>
        {p.charges?.length ? <details><summary>Published fee breakdown</summary><ul>{p.charges.map((charge) => <li key={charge.label}>{charge.label}: {new Intl.NumberFormat("en-IN", { style: "currency", currency: charge.currency }).format(charge.amount)} · {charge.period}</li>)}</ul></details> : null}
        <p className="muted">Evidence publishers: fees — {new URL(p.fee.source).hostname}; application — {new URL(p.deadline.source).hostname}. Reviewed {p.reviewedAt}. Details shown here; no external link.</p>
        <Link className="text-link" href={`/programmes/${p.slug}`}>View full in-site record →</Link>
      </article>)}</div>
    </article>)}
    {!rows.length && <p className="snapshot-note">No researched programme records match this search. Try another country or search term. This site does not send you to another website from this section.</p>}
  </section>;
}
