"use client";
import { useEffect, useState } from "react";
import Link from "@/components/althea/EditorialLink";
import { destinations } from "@/data/destinations";
import { programmeResearch, publishedMoney } from "@/data/programmeResearch";
export default function ProgrammeResearchFinder() {
  const [country, setCountry] = useState("all");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("country");
  useEffect(() => {
    const c = new URLSearchParams(location.search).get("country");
    if (destinations.some((d) => d.slug === c)) setCountry(c!);
  }, []);
  const rows = programmeResearch
    .filter(
      (p) =>
        (country === "all" || p.country === country) &&
        (level === "all" || p.level === level) &&
        (status === "all" ||
          (status === "upcoming"
            ? p.deadline.status === "Published upcoming" ||
              p.deadline.status === "Recurring window"
            : p.deadline.status === "Closed round" ||
              p.deadline.status === "Conflicting dates")) &&
        (p.title + " " + p.institution + " " + p.city)
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "deadline"
        ? (a.deadline.date || "9999").localeCompare(b.deadline.date || "9999")
        : a.country.localeCompare(b.country),
    );
  function download() {
    const fields = [
      "Programme",
      "University",
      "Country",
      "Published fee",
      "Currency",
      "Fee period",
      "Fee year",
      "Fee category",
      "Deadline",
      "Deadline status",
      "Deadline scope",
      "Fee source",
      "Deadline source",
      "Reviewed",
      "Published additional charges",
    ];
    const vals = rows.map((p) => [
      p.title,
      p.institution,
      p.country,
      p.fee.amount ?? "",
      p.fee.currency,
      p.fee.period,
      p.fee.year,
      p.fee.category,
      p.deadline.label,
      p.deadline.status,
      p.deadline.scope,
      p.fee.source,
      p.deadline.source,
      p.reviewedAt,
      (p.charges || [])
        .map((c) => `${c.label}: ${c.currency} ${c.amount} (${c.period})`)
        .join("; "),
    ]);
    const csv = [fields, ...vals]
      .map((row) =>
        row.map((x) => '"' + String(x).replaceAll('"', '""') + '"').join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "althea-programme-research-2026-10-14.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className="research-finder" data-hydrated="true">
      <div className="knowledge-controls">
        <label>
          <span>Country</span>
          <select
            aria-label="Programme country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="all">All seven countries</option>
            {destinations.map((d) => (
              <option value={d.slug} key={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Study level</span>
          <select
            aria-label="Programme level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="all">All levels</option>
            <option>Master</option>
            <option>Bachelor</option>
          </select>
        </label>
        <label>
          <span>Published calendar</span>
          <select
            aria-label="Application calendar"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All records</option>
            <option value="upcoming">Upcoming / recurring</option>
            <option value="closed">Closed / conflicting round</option>
          </select>
        </label>
        <label className="knowledge-search">
          <span>Find your programme</span>
          <input
            type="search"
            aria-label="Find researched programme"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Subject, university or city"
          />
        </label>
      </div>
      <div className="results-heading">
        <p role="status">
          {rows.length} researched programme records · checked 14 October 2026
        </p>
        <div className="research-actions">
          <label>
            Order
            <select
              aria-label="Programme order"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="country">Country</option>
              <option value="deadline">Published date</option>
            </select>
          </label>
          <button className="text-button" onClick={download}>
            Download results CSV ↓
          </button>
          <button
            className="text-button"
            onClick={() => {
              setCountry("all");
              setQuery("");
              setLevel("all");
              setStatus("all");
            }}
          >
            Reset filters ↺
          </button>
        </div>
      </div>
      <div className="knowledge-grid research-grid">
        {rows.map((p) => (
          <article key={p.slug}>
            <p className="eyebrow">
              {destinations.find((d) => d.slug === p.country)?.name} / {p.level}
            </p>
            <h3>
              <Link href={`/programmes/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>
              {p.institution} · {p.city}
            </p>
            <dl className="research-facts">
              <div>
                <dt>Published tuition</dt>
                <dd>
                  {publishedMoney(p)}
                  <small>
                    {p.fee.period} · {p.fee.year}
                  </small>
                </dd>
              </div>
              <div>
                <dt>Applicant category</dt>
                <dd className="research-small">{p.fee.category}</dd>
              </div>
              <div>
                <dt>Application date</dt>
                <dd className="research-small">
                  {p.deadline.label}
                  <small>{p.deadline.status}</small>
                </dd>
              </div>
            </dl>
            <p className="research-calendar-scope">{p.deadline.scope}</p>
            <div className="knowledge-source">
              <Link href={`/programmes/${p.slug}`}>
                View fees, requirements & evidence →
              </Link>
              <a href={p.fee.source} target="_blank" rel="noopener noreferrer">
                University fee source ↗
              </a>
              <a
                href={p.deadline.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                University deadline source ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      {!rows.length && (
        <div className="empty-state">
          <h3>No matches in this researched collection.</h3>
          <p>Change the search or filters to see other records.</p>
        </div>
      )}
    </section>
  );
}
