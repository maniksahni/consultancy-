"use client";
import { useEffect, useMemo, useState } from "react";
import { isComingSoon } from "@/lib/comingSoon";
import Link from "next/link";
import { ArrowUpRight, CalendarPlus, Check, MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";
import { plannerCountries, plannerLink, type PlannerCountry } from "@/data/movePlanner";

type Intake = { key: string; label: string; date: Date };
const DAY = 864e5;
const monthLabel = (d: Date) => d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });

/** The next few intakes for a country, soonest first, at least six weeks away. */
function upcomingIntakes(country: PlannerCountry, now: Date): Intake[] {
  const out: Intake[] = [];
  for (let year = now.getFullYear(); year <= now.getFullYear() + 2; year++) {
    for (const i of country.intakes) {
      const date = new Date(year, i.month, i.day);
      if (date.getTime() - now.getTime() > 42 * DAY) out.push({ key: `${year}-${String(i.month + 1).padStart(2, "0")}-${String(i.day).padStart(2, "0")}`, label: `${i.label.split(" (")[0]} ${year}`, date });
    }
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 4);
}

const stepDate = (intake: Date, months: number) => new Date(intake.getFullYear(), intake.getMonth() - months, 1);
const ics = (text: string) => text.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
const stamp = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;

/** "Your move, month by month": a dated plan from today to arrival, for the student's country and intake. */
export default function MovePlanner() {
  const [now, setNow] = useState<Date | null>(null);
  const [countryId, setCountryId] = useState("france");
  const [intakeKey, setIntakeKey] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setNow(new Date()); }, []);
  const country = plannerCountries.find((c) => c.id === countryId)!;
  const intakes = useMemo(() => (now ? upcomingIntakes(country, now) : []), [country, now]);
  // Default to the first intake that leaves at least six months to prepare.
  const intake = intakes.find((i) => i.key === intakeKey) || intakes.find((i) => now && i.date.getTime() - now.getTime() > 180 * DAY) || intakes[0];
  const storeKey = intake ? `althea-planner:${country.id}:${intake.key}` : "";

  useEffect(() => {
    if (!storeKey) return;
    try { setDone(JSON.parse(localStorage.getItem(storeKey) || "{}")); } catch { setDone({}); }
  }, [storeKey]);
  const toggle = (title: string) => setDone((prev) => {
    const next = { ...prev, [title]: !prev[title] };
    try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch {}
    return next;
  });

  const steps = useMemo(() => intake ? [...country.steps].sort((a, b) => b.months - a.months).map((s) => ({ ...s, date: stepDate(intake.date, s.months) })) : [], [country, intake]);
  const days = intake && now ? Math.max(0, Math.ceil((intake.date.getTime() - now.getTime()) / DAY)) : null;
  const completed = steps.filter((s) => done[s.title]).length;
  const pct = steps.length ? completed / steps.length : 0;
  const thisMonth = now ? new Date(now.getFullYear(), now.getMonth(), 1).getTime() : 0;

  const downloadCalendar = () => {
    if (!intake) return;
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Althea Consulting//Departure planner//EN", "CALSCALE:GREGORIAN"];
    for (const s of steps) {
      const start = s.date.getTime() < thisMonth ? new Date(thisMonth) : s.date;
      const end = new Date(start.getTime() + DAY);
      lines.push("BEGIN:VEVENT", `UID:${country.id}-${intake.key}-${s.months}-${s.title.replace(/\W+/g, "-")}@altheaconsulting.in`, `DTSTAMP:${stamp(new Date())}T000000Z`,
        `DTSTART;VALUE=DATE:${stamp(start)}`, `DTEND;VALUE=DATE:${stamp(end)}`, `SUMMARY:${ics(`${s.title} — ${country.name} ${intake.label}`)}`,
        `DESCRIPTION:${ics(`${s.detail}\nGuide: https://altheaconsulting.in${plannerLink(country.id, s.chapter)}`)}`, "END:VEVENT");
    }
    lines.push("END:VCALENDAR");
    const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url; a.download = `althea-plan-${country.id}-${intake.key}.ics`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const whatsapp = intake ? `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(`Hello Harshita, I'm planning to study in ${country.name} for the ${intake.label} intake. I've done ${completed} of ${steps.length} steps on the Althéa planner — can you check my timeline?`)}` : "#";

  return <section className="lx-section lx-planner" id="planner" aria-labelledby="lx-planner-title">
    <div className="lx-wrap">
      <div className="lx-head"><div><p className="ms-kicker">THE DEPARTURE PLANNER</p><h2 id="lx-planner-title" className="lx-title">Your move, <em>month by month.</em></h2></div>
        <p className="lx-lead">Choose where and when. Get every deadline from today to arrival — dated, in order, with the guide for each step.</p></div>

      <div className="lx-planner-controls">
        <div className="ms-pills lx-planner-countries" role="group" aria-label="Destination">
          {plannerCountries.map((c) => { const label = c.name.replace(/^the /, "").replace(/^(uk|usa)$/i, (m) => m.toUpperCase()); return isComingSoon(c.id)
            ? <button key={c.id} type="button" disabled aria-disabled="true" className="ms-pill-soon" title="Coming soon">{label}<span>Soon</span></button>
            : <button key={c.id} type="button" aria-pressed={c.id === countryId} onClick={() => { setCountryId(c.id); setIntakeKey(null); }}>{label}</button>; })}
        </div>
        <label className="ms-field lx-planner-intake"><span>Intake</span>
          <select value={intake?.key || ""} onChange={(e) => setIntakeKey(e.target.value)} aria-label="Intake">
            {intakes.map((i) => <option key={i.key} value={i.key}>{i.label}</option>)}
          </select></label>
      </div>

      <div className="lx-planner-grid">
        <aside className="lx-planner-summary">
          <div className="lx-planner-count">
            <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" className="track" /><circle cx="60" cy="60" r="52" className="fill" style={{ strokeDashoffset: 327 * (1 - pct) }} /></svg>
            <div><strong>{days ?? "—"}</strong><span>days to go</span></div>
          </div>
          <p className="lx-planner-where">{intake ? <>Until your <b>{intake.label}</b> start in <b>{country.city}</b>.</> : "Loading your plan…"}</p>
          <p className="lx-planner-progress"><b>{completed}</b> of {steps.length} steps done</p>
          <dl className="lx-planner-money">{country.money.map((m) => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>
          <div className="lx-planner-actions">
            <button type="button" className="ms-btn ms-btn-gold" onClick={downloadCalendar} disabled={!intake}><span>Add all dates to my calendar</span><CalendarPlus size={17} aria-hidden="true" /></button>
            <a className="lx-planner-help" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />Ask Harshita to check my timeline</a>
          </div>
        </aside>

        <ol className={`lx-planner-steps${expanded ? "" : " is-collapsed"}`} id="lx-planner-steps" aria-label={`Plan for ${country.name}`}>
          {steps.map((s) => {
            const isDone = !!done[s.title];
            const t = s.date.getTime();
            const status = isDone ? "done" : t < thisMonth ? "late" : t === thisMonth ? "now" : "next";
            const statusText = { done: "Done", late: "Catch up now", now: "This month", next: "Upcoming" }[status];
            return <li key={s.title} className={`is-${status}`}>
              <span className="lx-planner-when">{monthLabel(s.date)}</span>
              <div className="lx-planner-body">
                <div className="lx-planner-row">
                  <h3>{s.title}</h3>
                  <span className="lx-planner-status">{statusText}</span>
                </div>
                <p>{s.detail}</p>
                <div className="lx-planner-row">
                  <Link href={plannerLink(country.id, s.chapter)} className="lx-planner-read">Read the guide<ArrowUpRight size={14} aria-hidden="true" /></Link>
                  <button type="button" className="lx-planner-tick" aria-pressed={isDone} onClick={() => toggle(s.title)}><Check size={14} aria-hidden="true" />{isDone ? "Done" : "Mark done"}</button>
                </div>
              </div>
            </li>;
          })}
        </ol>
        {!expanded && steps.length > 4 && <button type="button" className="ms-btn ms-btn-ghost lx-planner-more" aria-controls="lx-planner-steps" aria-expanded={expanded} onClick={() => setExpanded(true)}><span>Show the full plan ({steps.length} steps)</span></button>}
      </div>
      <p className="lx-planner-note">A planning guide based on typical deadlines; every programme publishes its own. Your ticks are saved only in this browser.</p>
    </div>
  </section>;
}
