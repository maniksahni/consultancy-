"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarClock, ExternalLink, Loader2, LogOut, MessageCircle, Plus, RefreshCw, Search, Trash2, Video } from "lucide-react";
import { adminCall, bookingMode, formatIn, zoneLabel, type AdminBooking, type AdminData, type Availability, type Blocked, type BookingSettings } from "@/lib/booking";

const KEY = "althea-admin-key";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type Tab = "upcoming" | "clients" | "availability" | "feedback";

/**
 * Private admin for Harshita: every client and their preparation profile, upcoming calls,
 * statuses and notes, feedback, and the weekly hours and blocked dates that drive the booking slots.
 * Data lives in her Google Sheet; this page reads and writes it through the booking backend with the admin key.
 */
export default function AdminConsole() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [query, setQuery] = useState("");

  async function load(withKey = key) {
    setLoading(true); setError("");
    try {
      const result = await adminCall<AdminData | { ok: false; error: string; code?: string }>("admin.data", withKey);
      if (!result.ok) { setError(result.error); if ("code" in result && result.code === "unauthorized") { sessionStorage.removeItem(KEY); setData(null); } return; }
      setData(result); sessionStorage.setItem(KEY, withKey);
    } catch { setError("Couldn't reach the booking backend. Check your connection and try again."); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    const saved = bookingMode() === "preview" ? "preview" : sessionStorage.getItem(KEY);
    if (saved) { setKey(saved); load(saved); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const now = Date.now();
  const bookings = data?.bookings ?? [];
  const upcoming = useMemo(() => bookings.filter(b => b.status === "Booked" && new Date(b.end).getTime() > now).sort((a, b) => a.start.localeCompare(b.start)), [bookings, now]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? bookings.filter(b => [b.name, b.email, b.phone, b.destination, b.currentStatus, b.id, b.source].join(" ").toLowerCase().includes(q)) : bookings;
  }, [bookings, query]);
  const rated = bookings.filter(b => Number(b.rating) > 0);
  const month = new Date().toISOString().slice(0, 7);
  const sources = Object.entries(bookings.reduce<Record<string, number>>((acc, b) => { if (b.source) acc[b.source] = (acc[b.source] ?? 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]);

  const update = (id: string, patch: Partial<AdminBooking>) => setData(d => d && { ...d, bookings: d.bookings.map(b => (b.id === id ? { ...b, ...patch } : b)) });

  if (!data) return (
    <form className="adm-card adm-login" onSubmit={(e: FormEvent) => { e.preventDefault(); load(); }}>
      <p className="ms-kicker">PRIVATE</p>
      <p className="ms-form-title">Sign in to your bookings</p>
      <label className="ms-field"><span>Admin key</span><input type="password" value={key} onChange={e => setKey(e.target.value)} autoComplete="current-password" required /></label>
      <button className="ms-btn ms-btn-gold" type="submit" disabled={loading || !key}>{loading ? <Loader2 size={17} className="bk-spin" aria-hidden="true" /> : null}<span>Open admin</span></button>
      {error && <p className="ms-form-status" role="alert">{error}</p>}
      <p className="ms-form-note">The key is shown once when the booking script is set up (booking/SETUP.md).</p>
    </form>
  );

  return (
    <div className="adm">
      <div className="adm-top">
        <div className="adm-row">
          <button type="button" className="ms-btn ms-btn-ghost" onClick={() => load()} disabled={loading}><RefreshCw size={15} className={loading ? "bk-spin" : ""} aria-hidden="true" /><span>Refresh</span></button>
          <a className="ms-btn ms-btn-ghost" href={data.sheetUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} aria-hidden="true" /><span>Google Sheet</span></a>
        </div>
        <button type="button" className="ms-btn ms-btn-ghost" onClick={() => { sessionStorage.removeItem(KEY); setData(null); setKey(""); }}><LogOut size={15} aria-hidden="true" /><span>Sign out</span></button>
      </div>
      {bookingMode() === "preview" && <p className="bk-preview">Preview with sample clients. Nothing here is real.</p>}
      {error && <p className="ms-form-status" role="alert">{error}</p>}

      <div className="adm-stats">
        <div className="adm-stat"><small>Upcoming calls</small><strong>{upcoming.length}</strong></div>
        <div className="adm-stat"><small>Booked this month</small><strong>{bookings.filter(b => b.bookedOn.startsWith(month)).length}</strong></div>
        <div className="adm-stat"><small>All clients</small><strong>{bookings.length}</strong></div>
        <div className="adm-stat"><small>Average rating</small><strong>{rated.length ? (rated.reduce((s, b) => s + Number(b.rating), 0) / rated.length).toFixed(1) : "—"}</strong></div>
        <div className="adm-stat"><small>Top source</small><strong style={{ fontSize: 18 }}>{sources[0]?.[0] ?? "—"}</strong></div>
      </div>

      <div className="adm-tabs" role="tablist">
        {([["upcoming", `Upcoming (${upcoming.length})`], ["clients", `All clients (${bookings.length})`], ["availability", "Availability"], ["feedback", `Feedback (${rated.length})`]] as [Tab, string][]).map(([id, label]) =>
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>)}
      </div>

      {tab === "upcoming" && <div className="adm-list">
        {upcoming.length ? upcoming.map(b => <BookingItem key={b.id} b={b} adminKey={key} statuses={data.statuses} onChange={update} open />) : <p className="bk-empty">No upcoming calls yet.</p>}
      </div>}

      {tab === "clients" && <div className="adm-list">
        <label className="ms-field adm-search"><span><Search size={13} aria-hidden="true" /> Search</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Name, email, phone, country, booking ID" /></label>
        {filtered.length ? filtered.map(b => <BookingItem key={b.id} b={b} adminKey={key} statuses={data.statuses} onChange={update} />) : <p className="bk-empty">No clients match.</p>}
      </div>}

      {tab === "availability" && <AvailabilityEditor adminKey={key} initial={data} onSaved={() => load()} />}

      {tab === "feedback" && <div className="adm-list">
        {rated.length ? rated.map(b => <article key={b.id} className="adm-item">
          <div className="adm-item-head"><h3>{b.name}</h3><span className="adm-stars" aria-label={`${b.rating} out of 5`}>{"★".repeat(Number(b.rating))}{"☆".repeat(5 - Number(b.rating))}</span></div>
          {b.feedback && <p style={{ margin: 0 }}>“{b.feedback}”</p>}
          <small className="adm-when">{formatIn(b.start, "Europe/Paris", { day: "numeric", month: "short", year: "numeric" })} · {b.destination}</small>
        </article>) : <p className="bk-empty">Feedback appears here after calls. Clients get the request automatically when a call ends.</p>}
      </div>}
    </div>
  );
}

function BookingItem({ b, adminKey, statuses, onChange, open = false }: { b: AdminBooking; adminKey: string; statuses: string[]; onChange: (id: string, patch: Partial<AdminBooking>) => void; open?: boolean }) {
  const [expanded, setExpanded] = useState(open);
  const [notes, setNotes] = useState(b.notes);
  const [saving, setSaving] = useState("");
  const digits = b.phone.replace(/\D/g, "");
  const paris = `${formatIn(b.start, "Europe/Paris", { weekday: "short", day: "numeric", month: "short" })}, ${formatIn(b.start, "Europe/Paris", { hour: "2-digit", minute: "2-digit", hour12: false })} Paris`;
  const client = `${formatIn(b.start, b.timeZone, { hour: "2-digit", minute: "2-digit", hour12: false })} ${zoneLabel(b.timeZone, b.start)} for ${b.firstName}`;
  const soon = b.status === "Booked" && new Date(b.start).getTime() - Date.now() < 30 * 60000 && new Date(b.end).getTime() > Date.now();

  async function save(patch: { status?: string; notes?: string }) {
    setSaving("Saving…");
    const result = await adminCall("admin.update", adminKey, { id: b.id, ...patch });
    setSaving(result.ok ? "Saved" : result.error ?? "Couldn't save");
    if (result.ok) onChange(b.id, patch);
  }
  async function cancel() {
    if (!confirm(`Cancel ${b.name}'s call on ${paris}? Google will email them the cancellation.`)) return;
    setSaving("Cancelling…");
    const result = await adminCall("admin.cancel", adminKey, { id: b.id });
    setSaving(result.ok ? "Cancelled" : result.error ?? "Couldn't cancel");
    if (result.ok) onChange(b.id, { status: "Cancelled" });
  }

  return (
    <article className="adm-item">
      <div className="adm-item-head">
        <h3>{b.name}</h3>
        <span className="adm-pill" data-s={b.status}>{b.status}</span>
      </div>
      <p className="adm-when" style={{ margin: 0 }}><CalendarClock size={14} aria-hidden="true" /> {paris} <small>· {client} · {b.id}</small></p>
      <div className="adm-row">
        {b.meetLink && b.status === "Booked" && <a className={`ms-btn ${soon ? "ms-btn-gold" : "ms-btn-ghost"}`} href={b.meetLink} target="_blank" rel="noreferrer"><Video size={15} aria-hidden="true" /><span>Join Meet</span></a>}
        {digits && <a className="ms-btn ms-btn-ghost" href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" /><span>WhatsApp</span></a>}
        <a className="ms-btn ms-btn-ghost" href={`mailto:${b.email}`}><span>Email</span></a>
        <select aria-label="Status" value={b.status} onChange={e => save({ status: e.target.value })}>{statuses.map(s => <option key={s}>{s}</option>)}</select>
        {b.status === "Booked" && <button type="button" className="ms-btn ms-btn-ghost" onClick={cancel}><span>Cancel call</span></button>}
        <button type="button" className="ms-btn ms-btn-ghost" onClick={() => setExpanded(x => !x)} aria-expanded={expanded}><span>{expanded ? "Hide profile" : "Full profile"}</span></button>
        {saving && <small className="adm-when" role="status">{saving}</small>}
      </div>
      {expanded && <>
        <dl className="adm-profile">
          {([["Email", b.email], ["WhatsApp", b.phone], ["Destination", b.destination], ["Level", b.level], ["Intake", b.intake], ["Current status", b.currentStatus],
            ["Education", b.background], ["Experience", b.experience || "—"], ["Challenges", b.challenges], ["Wants from the call", b.message], ["Found us via", b.source || "—"], ["Booked on", b.bookedOn]] as [string, string][])
            .map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || "—"}</dd></div>)}
          {b.rating && <div><dt>Feedback</dt><dd><span className="adm-stars">{"★".repeat(Number(b.rating))}</span> {b.feedback}</dd></div>}
        </dl>
        <label className="ms-field adm-note"><span>Your notes</span>
          <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} onBlur={() => notes !== b.notes && save({ notes })} placeholder="Private notes, saved when you click away" />
        </label>
      </>}
    </article>
  );
}

function AvailabilityEditor({ adminKey, initial, onSaved }: { adminKey: string; initial: AdminData; onSaved: () => void }) {
  const [hours, setHours] = useState<Availability[]>(initial.availability);
  const [blocked, setBlocked] = useState<Blocked[]>(initial.blocked);
  const [settings, setSettings] = useState<BookingSettings>(initial.settings);
  const [status, setStatus] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");

  async function save() {
    setStatus("Saving…");
    const result = await adminCall("admin.saveAvailability", adminKey, { availability: hours, blocked, settings });
    setStatus(result.ok ? "Saved. New slots are live on the website." : result.error ?? "Couldn't save.");
    if (result.ok) onSaved();
  }
  const number = (k: keyof BookingSettings, label: string, hint: string) => (
    <label className="ms-field"><span>{label}</span>
      <input type="number" min={0} max={240} value={settings[k] as number} onChange={e => setSettings(s => ({ ...s, [k]: Number(e.target.value) }))} />
      <small className="bk-hint">{hint}</small>
    </label>
  );

  return (
    <div className="adm-list">
      <section className="adm-card adm-hours">
        <p className="ms-form-title" style={{ fontSize: 20 }}>Weekly hours <small className="adm-when">(Paris time)</small></p>
        {hours.map((h, i) => <div className="adm-hour" key={i}>
          <select aria-label="Day" value={h.day} onChange={e => setHours(list => list.map((x, j) => j === i ? { ...x, day: e.target.value } : x))}>{DAYS.map(d => <option key={d}>{d}</option>)}</select>
          <input type="time" aria-label="From" value={h.start} onChange={e => setHours(list => list.map((x, j) => j === i ? { ...x, start: e.target.value } : x))} />
          <input type="time" aria-label="To" value={h.end} onChange={e => setHours(list => list.map((x, j) => j === i ? { ...x, end: e.target.value } : x))} />
          <button type="button" className="ms-btn ms-btn-ghost" aria-label={`Remove ${h.day} ${h.start}–${h.end}`} onClick={() => setHours(list => list.filter((_, j) => j !== i))}><Trash2 size={15} aria-hidden="true" /></button>
        </div>)}
        <div className="adm-row"><button type="button" className="ms-btn ms-btn-ghost" onClick={() => setHours(list => [...list, { day: "Sat", start: "10:00", end: "13:00" }])}><Plus size={15} aria-hidden="true" /><span>Add hours</span></button></div>
      </section>

      <section className="adm-card adm-hours">
        <p className="ms-form-title" style={{ fontSize: 20 }}>Blocked dates <small className="adm-when">(holidays, travel)</small></p>
        {blocked.map((b, i) => <div className="adm-row" key={`${b.date}-${i}`}><strong>{b.date}</strong><span className="adm-when">{b.reason}</span>
          <button type="button" className="ms-btn ms-btn-ghost" aria-label={`Unblock ${b.date}`} onClick={() => setBlocked(list => list.filter((_, j) => j !== i))}><Trash2 size={15} aria-hidden="true" /></button></div>)}
        <div className="adm-row">
          <input type="date" aria-label="Date to block" value={newDate} onChange={e => setNewDate(e.target.value)} />
          <input aria-label="Reason" placeholder="Reason (optional)" value={newReason} onChange={e => setNewReason(e.target.value)} />
          <button type="button" className="ms-btn ms-btn-ghost" disabled={!newDate} onClick={() => { setBlocked(list => [...list, { date: newDate, reason: newReason }]); setNewDate(""); setNewReason(""); }}><Plus size={15} aria-hidden="true" /><span>Block date</span></button>
        </div>
      </section>

      <section className="adm-card">
        <p className="ms-form-title" style={{ fontSize: 20, marginBottom: 12 }}>Booking rules</p>
        <div className="adm-settings">
          {number("slotMinutes", "Call length (minutes)", "Each consultation, e.g. 15.")}
          {number("bufferMinutes", "Break between calls (minutes)", "Kept free around other events.")}
          {number("maxPerDay", "Maximum calls a day", "Days fill up after this.")}
          {number("minNoticeHours", "Minimum notice (hours)", "No last-minute bookings.")}
          {number("windowDays", "Book up to (days ahead)", "How far ahead clients can book.")}
        </div>
      </section>

      <div className="adm-row"><button type="button" className="ms-btn ms-btn-gold" onClick={save}><span>Save availability</span></button>{status && <span className="adm-when" role="status">{status}</span>}</div>
    </div>
  );
}
