"use client";
import { useState } from "react";
import Link from "@/components/althea/EditorialLink";
import { programmeResearch, publishedMoney } from "@/data/programmeResearch";
import { programmes } from "@/data/france";
export default function Finder() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const fields = [
    {
      key: "degreeLevel",
      label: "Degree",
      values: ["Bachelor", "Master", "PhD"],
    },
    {
      key: "city",
      label: "City",
      values: ["Paris", "Toulouse", "Lyon", "Lille", "Bordeaux", "Nice"],
    },
    {
      key: "discipline",
      label: "Discipline",
      values: ["Computer science", "Economics"],
    },
    { key: "language", label: "Language", values: ["English", "French"] },
    {
      key: "institutionType",
      label: "Institution",
      values: ["Public", "Private"],
    },
    {
      key: "cost",
      label: "Tuition",
      values: ["Confirmed fees", "Not confirmed"],
    },
    {
      key: "intake",
      label: "Intake",
      values: ["Confirmed intake", "Not confirmed"],
    },
  ];
  const results = programmes.filter(
    (p) =>
      (p.title + " " + p.institution)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      Object.entries(filters).every(
        ([k, v]) =>
          !v ||
          (k === "language"
            ? p.teachingLanguages.includes(v)
            : k === "cost"
              ? v === "Not confirmed"
                ? p.tuitionAmount === null
                : p.tuitionAmount !== null
              : k === "intake"
                ? v === "Not confirmed"
                  ? p.intakePeriod === null
                  : p.intakePeriod !== null
                : p[k as keyof typeof p] === v),
      ),
  );
  return (
    <>
      <div className="finder-filters">
        <label className="search-field">
          Search programmes
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Subject or university"
          />
        </label>
        {fields.map((f) => (
          <label key={f.key}>
            {f.label}
            <select
              aria-label={f.label}
              value={filters[f.key] || ""}
              onChange={(e) =>
                setFilters({ ...filters, [f.key]: e.target.value })
              }
            >
              <option value="">Any {f.label.toLowerCase()}</option>
              {f.values.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="results-heading">
        <p role="status">
          {results.length} curated{" "}
          {results.length === 1 ? "listing" : "listings"}
        </p>
        <button
          className="text-button"
          onClick={() => {
            setFilters({});
            setQuery("");
          }}
        >
          Reset filters ↺
        </button>
      </div>
      <div className="programme-grid">
        {results.map((p) => (
          <article className="programme-card" key={p.slug}>
            <p className="eyebrow">
              {p.city} · {p.degreeLevel} · {p.institutionType}
            </p>
            <h3>
              <Link href={`/programmes/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>{p.institution}</p>
            <p className="programme-meta">
              {p.teachingLanguages.join(" / ")} · {p.duration}
            </p>
            <p className="muted">
              {(() => {
                const e = programmeResearch.find((e) => e.slug === p.slug);
                return e
                  ? `${publishedMoney(e)} · ${e.fee.year} · ${e.fee.period}`
                  : "Programme fee not yet researched";
              })()}
            </p>
            <p className="muted">
              {programmeResearch.find((e) => e.slug === p.slug)?.deadline.label}
            </p>
            <span className="source-badge">
              {p.reviewStatus === "verified"
                ? "Published fee evidence reviewed"
                : "Published fee evidence reviewed"}{" "}
              · {p.lastVerifiedAt}
            </span>
            <div className="card-links">
              <Link href={`/programmes/${p.slug}`}>Explore programme →</Link>
              <a
                href={p.programmeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official source ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <h3>No curated matches yet.</h3>
          <p>
            This is a small starting collection, not a complete catalogue of
            France. Try broader filters or explore the official Campus France
            catalogue.
          </p>
          <a href="https://www.campusfrance.org/en/finding-a-university-programme-France">
            Official programme resources ↗
          </a>
        </div>
      )}
    </>
  );
}
