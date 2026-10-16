"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, X } from "lucide-react";
import { destinations, destinationHref } from "@/data/destinations";
import { countryPhoto, paris } from "@/lib/paris";

/** The destination atlas: choose a country, save up to three and compare them side by side. */
export default function DestinationAtlas({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("france");
  const [region, setRegion] = useState("All destinations");
  const [saved, setSaved] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => { try { const a = JSON.parse(localStorage.getItem("althea-destinations") || "[]"); if (Array.isArray(a)) setSaved(a.filter((x) => typeof x === "string" && destinations.some((d) => d.slug === x)).slice(0, 3)); } catch {} }, []);
  function toggle(slug: string) { const next = saved.includes(slug) ? saved.filter((x) => x !== slug) : saved.length < 3 ? [...saved, slug] : saved; setSaved(next); try { localStorage.setItem("althea-destinations", JSON.stringify(next)); } catch {} }
  const options = destinations.filter((d) => region === "All destinations" || d.region === region);
  const d = destinations.find((x) => x.slug === active)!;

  return <div className="ms-atlas" data-hydrated="true">
    <div className="ms-atlas-bar">
      <div className="ms-pills" role="group" aria-label="Filter destinations">{["All destinations", "Europe", "North America", "Oceania"].map((r) => <button type="button" key={r} aria-pressed={region === r} onClick={() => { setRegion(r); const first = destinations.find((x) => r === "All destinations" || x.region === r)!; setActive(first.slug); }}>{r}</button>)}</div>
      <button type="button" className="ms-btn ms-btn-ink" disabled={saved.length < 2} onClick={() => router.push(`/compare?destinations=${saved.join(",")}`)}><span>{`Compare shortlist (${saved.length}/3)`}</span><ArrowUpRight size={16} aria-hidden="true" /></button>
    </div>
    <div className="ms-atlas-layout">
      <div className="ms-atlas-index" role="group" aria-label="Choose a destination">{options.map((x, i) => <button type="button" key={x.slug} aria-pressed={active === x.slug} onClick={() => setActive(x.slug)} onMouseEnter={() => setActive(x.slug)}>
        <span className="ms-atlas-num">{String(i + 1).padStart(2, "0")}</span><span className="ms-atlas-name">{x.name}<small>{x.city}</small></span>{saved.includes(x.slug) && <Check size={16} aria-label="Saved" />}
      </button>)}</div>
      <article className="ms-atlas-feature">
        {destinations.map((x) => { const photo = paris(countryPhoto[x.slug]); return <div key={x.slug} className={`ms-atlas-photo${x.slug === active ? " is-active" : ""}`} aria-hidden={x.slug !== active}><Image src={photo.file} alt={photo.alt} fill sizes="(max-width:900px) 100vw, 62vw" /></div>; })}
        <div className="ms-atlas-shade" />
        <span className="ms-atlas-corner">THE DESTINATION ATLAS · {d.region.toUpperCase()}</span>
        <div className="ms-atlas-copy" key={d.slug}>
          <p className="ms-kicker">YOUR NEXT CHAPTER · {d.focus}</p>
          <h3>{d.name}<em>.</em></h3>
          <p>{d.mood}</p>
          <div className="ms-row">
            <Link className="ms-btn ms-btn-gold" href={destinationHref(d.slug)}><span>Explore {d.name}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
            <button type="button" className="ms-btn ms-btn-light" aria-pressed={saved.includes(d.slug)} disabled={saved.length === 3 && !saved.includes(d.slug)} onClick={() => toggle(d.slug)}><span>{saved.includes(d.slug) ? "Saved to shortlist" : saved.length === 3 ? "Shortlist full" : "Save destination"}</span>{saved.includes(d.slug) ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}</button>
          </div>
          <small className="ms-atlas-credit">{d.city}</small>
        </div>
      </article>
    </div>
    <div className="ms-atlas-foot"><span>Seven destinations. One considered decision.</span><span role="status">{saved.length === 3 ? "Three saved. Remove one to explore another combination." : "Save up to three destinations to compare your next steps."}</span></div>
    {!compact && <p className="ms-muted ms-atlas-note">France is our specialist focus. For other countries, discuss the scope and availability of personal support with your adviser.</p>}
  </div>;
}
