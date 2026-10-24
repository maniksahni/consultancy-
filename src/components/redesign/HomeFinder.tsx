"use client";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { countries } from "./content";
type FinderSuggestion = { label: string; kind: "course" | "subject" | "university"; country: string };
type FinderEntry = [string, FinderSuggestion["kind"], string];
type CityOption = { city: string; records: number; kind: "institutions" | "courses" };
const countryLabels: Record<string, string> = Object.fromEntries(countries.map((country) => [country.slug, country.name]));
const finderIndexCache: Partial<Record<string, Promise<FinderEntry[]>>> = {};
const normalizeFinderQuery = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
function getFinderIndex(prefix: string) {
  const fileKey = Array.from(new TextEncoder().encode(prefix)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  finderIndexCache[prefix] ||= fetch(`/data/universities/home-search/prefixes/${fileKey}.json`).then((response) => response.ok ? response.json() as Promise<FinderEntry[]> : []);
  return finderIndexCache[prefix]!;
}

/** Course, subject and institution search over the published directory index. */
export default function HomeFinder() {
  const chosenQuery = useRef<string | null>(null);
  const [query, setQuery] = useState("");
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState<FinderEntry[]>([]);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [hint, setHint] = useState("");
  const selectedCityOption = cityOptions.find((item) => item.city === city);
  const filteredSuggestions = useMemo(() => {
    const needle = normalizeFinderQuery(query.trim());
    if (needle.length < 1) return [];
    return suggestionIndex
      .filter(([itemCountry, , label]) => (!country || itemCountry === country) && normalizeFinderQuery(label).startsWith(needle))
      .map(([itemCountry, kind, label]) => ({ country: itemCountry, kind, label }))
      .slice(0, 7);
  }, [country, query, suggestionIndex]);
  function chooseSuggestion(suggestion: FinderSuggestion) {
    chosenQuery.current = suggestion.label;
    setQuery(suggestion.label);
    if (!country) setCountry(suggestion.country);
    setCity("");
    setSuggestionOpen(false);
  }
  useEffect(() => {
    const normalizedQuery = normalizeFinderQuery(query.trim());
    if (query === chosenQuery.current) { setSuggestionOpen(false); return; }
    if (normalizedQuery.length < 1) { setSuggestionOpen(false); return; }
    let active = true;
    const timer = window.setTimeout(async () => {
      try {
        const index = await getFinderIndex(normalizedQuery.slice(0, 1));
        if (active) { setSuggestionIndex(index); if (query !== chosenQuery.current && document.activeElement?.id === "home-course-search") setSuggestionOpen(true); }
      } catch { if (active) setSuggestionIndex([]); }
    }, 110);
    return () => { active = false; window.clearTimeout(timer); };
  }, [query]);
  useEffect(() => {
    if (!country) { setCityOptions([]); return; }
    let active = true;
    fetch(`/data/universities/home-search/${country}-cities.json`).then((response) => response.ok ? response.json() as Promise<CityOption[]> : []).then((items) => { if (active) setCityOptions(items); }).catch(() => { if (active) setCityOptions([]); });
    return () => { active = false; };
  }, [country]);
  /** Require an interest and an explicit destination before opening results. */
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const typed = query.trim();
    if (typed.length >= 2 && country) { setHint(""); return; }
    event.preventDefault();
    setSuggestionOpen(false);
    setHint(typed.length < 2 ? "Tell us your interest: type at least two letters for a course, subject or university." : "Choose a study destination to see options in that country.");
    document.getElementById(typed.length < 2 ? "home-course-search" : "home-study-destination")?.focus();
  }
  return <><form className={`ms-finder${hint ? " has-hint" : ""}`} action="/universities" method="get" role="search" aria-label="Find a course, subject or university" onSubmit={onSubmit} noValidate>
    <input type="hidden" name="view" value={city && selectedCityOption?.kind === "institutions" ? "institutions" : "courses"} />
    <input type="hidden" name="city" value={city} />
    <div className="ms-finder-query">
      <label htmlFor="home-course-search">I want to explore</label>
      <span className="ms-input-icon"><Search size={18} aria-hidden="true" />
        <input id="home-course-search" name="q" autoComplete="off" value={query} onFocus={() => { if (query !== chosenQuery.current && query.trim().length >= 1) setSuggestionOpen(true); }} onChange={(event) => { chosenQuery.current = null; setQuery(event.target.value); setHighlightedSuggestion(-1); setHint(""); }} onKeyDown={(event) => { if (event.key === "ArrowDown" && filteredSuggestions.length) { event.preventDefault(); setSuggestionOpen(true); setHighlightedSuggestion((index) => Math.min(index + 1, filteredSuggestions.length - 1)); } else if (event.key === "ArrowUp" && filteredSuggestions.length) { event.preventDefault(); setHighlightedSuggestion((index) => Math.max(index - 1, 0)); } else if (event.key === "Enter" && suggestionOpen && filteredSuggestions[highlightedSuggestion]) { event.preventDefault(); chooseSuggestion(filteredSuggestions[highlightedSuggestion]); } else if (event.key === "Escape") setSuggestionOpen(false); }} onBlur={() => setSuggestionOpen(false)} aria-label="Course, subject or university" aria-invalid={hint ? true : undefined} aria-describedby={hint ? "home-finder-hint" : undefined} aria-expanded={suggestionOpen && filteredSuggestions.length > 0} aria-controls="home-search-suggestions" aria-activedescendant={suggestionOpen && highlightedSuggestion >= 0 && filteredSuggestions[highlightedSuggestion] ? `home-suggestion-${highlightedSuggestion}` : undefined} role="combobox" aria-autocomplete="list" placeholder="A course, a subject, a university…" />
      </span>
      {hint && <p className="ms-finder-hint" id="home-finder-hint" role="alert">{hint}</p>}
      {suggestionOpen && filteredSuggestions.length > 0 && <div className="ms-finder-suggest" id="home-search-suggestions" role="listbox" aria-label="Search suggestions">{filteredSuggestions.map((suggestion, index) => <button id={`home-suggestion-${index}`} type="button" role="option" aria-selected={highlightedSuggestion === index} className={highlightedSuggestion === index ? "is-highlighted" : ""} key={`${suggestion.country}-${suggestion.kind}-${suggestion.label}`} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setHighlightedSuggestion(index)} onClick={() => chooseSuggestion(suggestion)}><Search size={14} aria-hidden="true" /><span><strong>{suggestion.label}</strong><small>{suggestion.kind} · {countryLabels[suggestion.country]}</small></span><ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>}
    </div>
    <label className="ms-finder-field"><span>Take me to</span><select id="home-study-destination" name="country" aria-label="Study destination" value={country} onChange={(event) => { setCountry(event.target.value); setCity(""); setHint(""); }}><option value="">Choose a country</option>{countries.map((c) => <option value={c.slug} key={c.slug}>{c.name}</option>)}</select></label>
    <label className="ms-finder-field"><span>Or a city</span><select aria-label="Study city" value={city} disabled={!country} onChange={(event) => setCity(event.target.value)}><option value="">Any city</option>{cityOptions.map((item) => <option key={item.city} value={item.city}>{item.city}</option>)}</select></label>
    <button className="ms-btn ms-btn-gold ms-finder-go" type="submit"><span>Find my options</span><ArrowUpRight size={18} aria-hidden="true" /></button>
  </form>
    <div className="lx-quick"><span>Try</span>{["Business", "Data science", "Engineering", "Hospitality", "Design", "Law"].map((interest) => <button key={interest} type="button" onClick={() => { chosenQuery.current = interest; setQuery(interest); setSuggestionOpen(false); setHighlightedSuggestion(-1); setHint(""); document.getElementById("home-course-search")?.focus(); }}>{interest}<ArrowUpRight size={13} aria-hidden="true" /></button>)}</div>
  </>;
}
