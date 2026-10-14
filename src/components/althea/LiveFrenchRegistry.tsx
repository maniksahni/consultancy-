"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Database, Search, Loader2 } from "lucide-react";

type Row = {
  id: string;
  name: string;
  city: string;
  region: string;
  type: string;
  sector: string;
  website: string;
};
const source =
  "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-principaux-etablissements-enseignement-superieur/";
const input =
  "min-h-12 w-full border border-[var(--color23)]/20 bg-white px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color41)]";
export default function LiveFrenchRegistry() {
  const [records, setRecords] = useState<Row[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const [page, setPage] = useState(0);
  async function load() {
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/data/institutions.json", {
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok)
        throw new Error("The reviewed institution snapshot is unavailable.");
      const snapshot = await response.json();
      if (!snapshot.review || !Array.isArray(snapshot.records))
        throw new Error("Institution snapshot has not been reviewed.");
      setRecords(snapshot.records);
      setPage(0);
      setState("ready");
      setMessage(
        `Official registry snapshot reviewed ${snapshot.review.reviewedAt.slice(0, 10)}. Programme fees and eligibility: Not yet verified.`,
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load institution records.",
      );
    }
  }
  const regions = useMemo(
    () =>
      [
        "All",
        ...Array.from(
          new Set<string>(records.map((r) => r.region).filter(Boolean)),
        ),
      ].sort(),
    [records],
  );
  const filtered = useMemo(
    () =>
      records.filter((r) => {
        const haystack = [r.name, r.city, r.region, r.type, r.sector]
          .join(" ")
          .toLocaleLowerCase();
        return (
          haystack.includes(q.trim().toLocaleLowerCase()) &&
          (region === "All" || r.region === region)
        );
      }),
    [records, q, region],
  );
  const displayed = filtered.slice(page * 24, (page + 1) * 24);
  return (
    <div className="mx-auto max-w-[1328px] px-5 pb-24 sm:px-9 lg:px-14">
      {state === "idle" || state === "error" ? (
        <div className="border border-[var(--color23)]/15 bg-[var(--color42)] px-6 py-12 sm:px-10">
          <Database size={28} className="text-[var(--color43)]" />
          <h2 className="mt-6 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            Explore France’s official <em>institution register.</em>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[var(--color44)]">
            Load a reviewed, locally cached snapshot of the openly licensed
            dataset published by the French Ministry of Higher Education. It
            identifies institutions and locations, but does not prove course
            availability or admissions eligibility.
          </p>
          <button
            type="button"
            onClick={load}
            className="mt-6 inline-flex min-h-12 items-center gap-3 bg-[var(--color39)] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Load official institutions <ArrowUpRight size={17} />
          </button>
          {state === "error" && (
            <p role="alert" className="mt-4 text-sm text-[var(--color45)]">
              {message}{" "}
              <a
                className="underline"
                href={source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open original dataset
              </a>
            </p>
          )}
        </div>
      ) : null}
      {state === "loading" && (
        <div
          role="status"
          className="flex min-h-56 flex-col items-center justify-center gap-5 border border-[var(--color23)]/15 bg-[var(--color42)] p-10 text-sm text-[var(--color39)]"
        >
          <Loader2 className="animate-spin" size={28} />
          Retrieving official institution records…
        </div>
      )}
      {state === "ready" && (
        <div>
          <div className="border border-[var(--color23)]/15 bg-[var(--color42)] p-6 sm:p-8">
            <div className="flex flex-wrap justify-between gap-4">
              <h2 className="font-display text-3xl">Filter official records</h2>
              <p className="text-sm">{message}</p>
              <span className="self-center text-xs text-[var(--color46)]">
                {records.length} institution records loaded
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-xs">Name / city / type</span>
                <span className="relative block">
                  <Search
                    size={17}
                    className="pointer-events-none absolute left-3 top-4 text-[var(--color47)]"
                  />
                  <input
                    type="search"
                    className={input + " pl-10"}
                    value={q}
                    placeholder="Search official registry"
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(0);
                    }}
                  />
                </span>
              </label>
              <label>
                <span className="mb-2 block text-xs">Region</span>
                <select
                  className={input}
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setPage(0);
                  }}
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r === "All" ? "All regions" : r}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="mb-7 mt-8 flex flex-wrap justify-between gap-3 border-b border-[var(--color23)]/15 pb-5">
            <h2 aria-live="polite" className="font-display text-2xl">
              {filtered.length} matching institutions
            </h2>
            <span className="text-xs text-[var(--color46)]">
              Registry data may contain schools without international degree
              programmes.
            </span>
          </div>
          {message && (
            <p className="mb-5 text-sm text-[var(--color45)]">{message}</p>
          )}
          {displayed.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {displayed.map((u) => (
                <article
                  key={u.id}
                  className="flex flex-col border border-[var(--color23)]/15 bg-white p-6"
                >
                  <span className="text-[10px] uppercase tracking-[.18em] text-[var(--color48)]">
                    {u.region || "France"}
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight">
                    {u.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color44)]">
                    {u.city}
                    {u.type ? " · " + u.type : ""}
                  </p>
                  <a
                    className="mt-5 inline-flex min-h-11 items-center gap-2 border-t border-[var(--color23)]/15 pt-3 text-xs font-semibold text-[var(--color49)]"
                    href={u.website || source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {u.website ? "Institution website" : "Official dataset"}{" "}
                    <ArrowUpRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-10 text-sm text-[var(--color44)]">
              No records match this search. Try another location or name.
            </p>
          )}
          {filtered.length > 24 && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="min-h-11 border border-[var(--color23)]/20 px-5 text-xs disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-[var(--color44)]">
                Page {page + 1} of {Math.ceil(filtered.length / 24)}
              </span>
              <button
                type="button"
                disabled={(page + 1) * 24 >= filtered.length}
                onClick={() => setPage((p) => p + 1)}
                className="min-h-11 bg-[var(--color39)] px-5 text-xs text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      <p className="mt-7 max-w-3xl text-xs leading-7 text-[var(--color50)]">
        Source: French Ministry of Higher Education open data, “Principaux
        établissements d’enseignement supérieur”, Licence Ouverte / Open Licence
        2.0. This registry is not the Campus France course catalogue. No
        affiliation or official endorsement implied.{" "}
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          View source and licence ↗
        </a>
      </p>
    </div>
  );
}
