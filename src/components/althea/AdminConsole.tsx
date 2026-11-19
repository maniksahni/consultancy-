"use client";
import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import { CalendarClock, CalendarDays, ExternalLink, FileText, Gauge, Globe2, Images, LayoutDashboard, Loader2, LogOut, Mail, Menu, MessageCircle, Moon, Plus, RefreshCw, Search, Send, Settings2, SlidersHorizontal, Star, Sun, Trash2, Users, Video, Bot, Map as MapIcon } from "lucide-react";
import { adminCall, bookingMode, formatIn, zoneLabel, type AdminBooking, type AdminData, type Availability, type Blocked, type BookingSettings, type StudioData, type StudioPage } from "@/lib/booking";
import { BrandMark } from "@/components/brand/BrandLockup";
import { ContentStudio, MediaGallery, PublishBadge, RobotsPanel, SeoEngine, SitemapPanel, pathOf, usePublishState } from "@/components/althea/admin/Studio";

const KEY = "althea-admin-key";
const THEME = "althea-admin-theme";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type Section = "dashboard" | "control" | "content" | "media" | "consultations" | "availability" | "feedback" | "seo" | "sitemap" | "robots" | "general";
type ClientTab = "upcoming" | "enquiries" | "clients";
const COUNTRY_OPTIONS: [string, string][] = [["france", "France"], ["uk", "United Kingdom"], ["usa", "USA"], ["canada", "Canada"], ["germany", "Germany"], ["ireland", "Ireland"], ["australia", "Australia"]];
/** Requests saved without a call (e.g. Learn French): they have no call time. */
const isEnquiry = (b: AdminBooking) => !b.start;
/** A call that has ended and was not cancelled or missed: its feedback email (with the package) is sent from admin. */
const needsFeedbackMail = (b: AdminBooking) => !isEnquiry(b) && b.status !== "Cancelled" && b.status !== "No-show" && new Date(b.end).getTime() <= Date.now();
/** Any past, non-cancelled call: covers a no-show as much as one she hasn't updated the status of yet. */
const canReschedule = (b: AdminBooking) => !isEnquiry(b) && b.status !== "Cancelled" && new Date(b.end).getTime() <= Date.now();
/** From the moment a call starts — mid-call included — so she can type the package and send it right away, not just after. */
const canSendPackage = (b: AdminBooking) => !isEnquiry(b) && b.status !== "Cancelled" && new Date(b.start).getTime() <= Date.now();

const SECTION_TITLES: Record<Section, string> = {
  dashboard: "Dashboard", control: "Site control options", content: "Pages & blog", media: "Media gallery", consultations: "Consultations",
  availability: "Availability", feedback: "Feedback & ratings", seo: "SEO & AEO engine", sitemap: "Sitemap.xml", robots: "Robots.txt", general: "General settings",
};

/**
 * Private admin for Harshita: bookings and clients, availability, the website's own switches, and a content
 * studio (pages, blog, media, SEO) that publishes real pages to the site. Everything lives in her Google Sheet
 * and Drive; this page reads and writes it through the booking backend with the admin key.
 */
export default function AdminConsole() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [studio, setStudio] = useState<StudioData | null>(null);
  const [studioError, setStudioError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<Section>("dashboard");
  const [clientTab, setClientTab] = useState<ClientTab>("upcoming");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [navOpen, setNavOpen] = useState(false);
  const [startNew, setStartNew] = useState<StudioPage["type"] | null>(null);
  const publish = usePublishState(studio?.version);

  async function loadStudio(withKey = key) {
    try {
      const r = await adminCall<StudioData | { ok: false; error: string }>("admin.cms", withKey);
      if (r.ok) { setStudio(r); setStudioError(""); } else setStudioError(r.error);
    } catch { setStudioError("Couldn't load the content studio."); }
  }
  async function load(withKey = key, withStudio = false) {
    setLoading(true); setError("");
    try {
      const result = await adminCall<AdminData | { ok: false; error: string; code?: string }>("admin.data", withKey);
      if (!result.ok) { setError(result.error); if ("code" in result && result.code === "unauthorized") { sessionStorage.removeItem(KEY); setData(null); } return; }
      setData(result); sessionStorage.setItem(KEY, withKey);
      if (withStudio) await loadStudio(withKey);
    } catch { setError("Couldn't reach the booking backend. Check your connection and try again."); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    const saved = bookingMode() === "preview" ? "preview" : sessionStorage.getItem(KEY);
    if (saved) { setKey(saved); load(saved, true); }
    try { if (localStorage.getItem(THEME) === "light") setTheme("light"); } catch { /* private mode */ }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep this screen in step with whatever just changed the Google Sheet - a direct edit there, or
  // another tab/device saving from this same admin - without Harshita having to remember to hit Refresh.
  useEffect(() => {
    if (!data) return;
    const tick = () => { if (document.visibilityState === "visible") load(); };
    const id = setInterval(tick, 45000);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", tick); window.removeEventListener("focus", tick); };
  }, [Boolean(data), key]); // eslint-disable-line react-hooks/exhaustive-deps

  const now = Date.now();
  const bookings = useMemo(() => data?.bookings ?? [], [data]);
  const upcoming = useMemo(() => bookings.filter(b => b.status === "Booked" && new Date(b.end).getTime() > now).sort((a, b) => a.start.localeCompare(b.start)), [bookings, now]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? bookings.filter(b => [b.name, b.email, b.phone, b.homeCountry, b.destination, b.currentStatus, b.id, b.source].join(" ").toLowerCase().includes(q)) : bookings;
  }, [bookings, query]);
  const rated = bookings.filter(b => Number(b.rating) > 0);
  const enquiries = bookings.filter(isEnquiry);
  const newEnquiries = enquiries.filter(b => b.status === "New enquiry").length;
  const month = new Date().toISOString().slice(0, 7);
  const sources = Object.entries(bookings.reduce<Record<string, number>>((acc, b) => { if (b.source) acc[b.source] = (acc[b.source] ?? 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]);
  const feedbackDue = bookings.filter(b => needsFeedbackMail(b) && !b.feedbackSent).length;

  const update = (id: string, patch: Partial<AdminBooking>) => setData(d => d && { ...d, bookings: d.bookings.map(b => (b.id === id ? { ...b, ...patch } : b)) });
  const go = (s: Section) => { setSection(s); setNavOpen(false); if (s !== "content") setStartNew(null); window.scrollTo({ top: 0 }); };
  const toggleTheme = () => setTheme(t => { const next = t === "dark" ? "light" : "dark"; try { localStorage.setItem(THEME, next); } catch { /* ignore */ } return next; });

  if (!data) return (
    <div className="adm-gate">
      <form className="adm-card adm-login" onSubmit={(e: FormEvent) => { e.preventDefault(); load(key, true); }}>
        <h1 className="sr-only">Althéa admin sign-in</h1>
        <span className="adm-gate-brand"><BrandMark /><strong>Althéa Consulting</strong><em>Admin</em></span>
        <p className="ms-form-title">Sign in</p>
        <label className="ms-field"><span>Admin key</span><input type="password" value={key} onChange={e => setKey(e.target.value)} autoComplete="current-password" required /></label>
        <button className="ms-btn ms-btn-gold" type="submit" disabled={loading || !key}>{loading ? <Loader2 size={17} className="bk-spin" aria-hidden="true" /> : null}<span>Open admin</span></button>
        {error && <p className="ms-form-status" role="alert">{error}</p>}
      </form>
    </div>
  );

  const pages = studio?.pages ?? [];
  const nav: { group: string; items: { id: Section; label: string; icon: ReactNode; count?: number | string }[] }[] = [
    { group: "Overview", items: [{ id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> }] },
    { group: "Website customizer", items: [{ id: "control", label: "Site control options", icon: <SlidersHorizontal size={17} /> }] },
    { group: "Content studio", items: [{ id: "content", label: "Pages & blog", icon: <FileText size={17} />, count: pages.length || undefined }, { id: "media", label: "Media gallery", icon: <Images size={17} />, count: studio?.media.length || undefined }] },
    { group: "Client relations", items: [{ id: "consultations", label: "Consultations", icon: <Users size={17} />, count: upcoming.length || undefined }, { id: "availability", label: "Availability", icon: <CalendarDays size={17} /> }, { id: "feedback", label: "Feedback & ratings", icon: <Star size={17} />, count: rated.length || undefined }] },
    { group: "Search & technical", items: [{ id: "seo", label: "SEO & AEO engine", icon: <Bot size={17} /> }, { id: "sitemap", label: "Sitemap.xml", icon: <MapIcon size={17} /> }, { id: "robots", label: "Robots.txt", icon: <Globe2 size={17} /> }] },
    { group: "Settings", items: [{ id: "general", label: "General settings", icon: <Settings2 size={17} /> }] },
  ];
  const needsStudio = ["content", "media", "seo", "sitemap", "robots"].includes(section);

  return (
    <div className="adm-app" data-adm-theme={theme}>
      <aside className={`adm-side${navOpen ? " is-open" : ""}`} aria-label="Admin sections">
        <div className="adm-side-brand"><BrandMark /><strong>Althéa</strong><span>Admin</span></div>
        <nav>{nav.map(g => <div key={g.group} className="adm-side-group"><p>{g.group}</p>
          {g.items.map(it => <button key={it.id} type="button" className={section === it.id ? "is-on" : ""} aria-current={section === it.id ? "page" : undefined} onClick={() => go(it.id)}>{it.icon}<span>{it.label}</span>{it.count !== undefined && <em>{it.count}</em>}</button>)}
        </div>)}</nav>
        <div className="adm-side-foot">
          <button type="button" className="adm-side-theme" onClick={toggleTheme}>{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}<span>{theme === "dark" ? "Light mode" : "Dark mode"}</span></button>
          <div className="adm-side-user"><span className="adm-avatar">{(data.settings.ownerName || "H").slice(0, 1)}</span><span><strong>{data.settings.ownerName}</strong><a href="/" target="_blank" rel="noreferrer">View site ↗</a></span>
            <button type="button" className="adm-logout" onClick={() => { sessionStorage.removeItem(KEY); setData(null); setStudio(null); setKey(""); }} aria-label="Sign out"><LogOut size={16} /></button></div>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-bar">
          <button type="button" className="adm-burger" onClick={() => setNavOpen(o => !o)} aria-label="Open the admin menu" aria-expanded={navOpen}><Menu size={20} /></button>
          <h1>{SECTION_TITLES[section]}</h1>
          {studio && <PublishBadge state={publish} />}
          <span className="adm-bar-actions">
            <button type="button" className="stu-btn is-small" onClick={() => load(key, true)} disabled={loading}><RefreshCw size={14} className={loading ? "bk-spin" : ""} aria-hidden="true" />Refresh</button>
            <a className="stu-btn is-small" href={data.sheetUrl} target="_blank" rel="noreferrer"><ExternalLink size={14} aria-hidden="true" />Google Sheet</a>
            <a className="stu-btn is-small is-dark" href="/" target="_blank" rel="noreferrer">View live site ↗</a>
          </span>
        </header>
        {bookingMode() === "preview" && <p className="bk-preview">Preview with sample data. Nothing here is real.</p>}
        {error && <p className="ms-form-status" role="alert">{error}</p>}
        {needsStudio && !studio && <div className="stu-empty">{studioError ? <><p>{studioError}</p><button type="button" className="stu-btn" onClick={() => loadStudio()}>Try again</button></> : <Loader2 size={22} className="bk-spin" aria-label="Loading" />}</div>}

        <div className="adm-content">
          {section === "dashboard" && <div className="stu-stack">
            <div className="adm-hello"><div><h2>Hello, {(data.settings.ownerName || "Harshita").split(" ")[0]}</h2><p>Here’s what needs you today.</p></div>
              <div className="stu-actions">
                <button type="button" className="stu-btn is-primary" onClick={() => { setStartNew("blog"); go("content"); setStartNew("blog"); }}><Plus size={15} aria-hidden="true" />New blog article</button>
                <button type="button" className="stu-btn" onClick={() => go("media")}><Images size={15} aria-hidden="true" />Upload photos</button>
              </div></div>
            <div className="adm-stats">
              <button type="button" className="adm-stat" onClick={() => { setClientTab("upcoming"); go("consultations"); }}><small>Upcoming calls</small><strong>{upcoming.length}</strong></button>
              <button type="button" className="adm-stat" onClick={() => { setClientTab("enquiries"); go("consultations"); }}><small>New enquiries</small><strong>{newEnquiries}</strong></button>
              <button type="button" className="adm-stat" onClick={() => { setClientTab("clients"); go("consultations"); }}><small>Feedback emails to send</small><strong>{feedbackDue}</strong></button>
              <div className="adm-stat"><small>Booked this month</small><strong>{bookings.filter(b => b.bookedOn.startsWith(month)).length}</strong></div>
              <div className="adm-stat"><small>All clients</small><strong>{bookings.length}</strong></div>
              <div className="adm-stat"><small>Average rating</small><strong>{rated.length ? (rated.reduce((s, b) => s + Number(b.rating), 0) / rated.length).toFixed(1) : "—"}</strong></div>
              <div className="adm-stat"><small>Top source</small><strong style={{ fontSize: 18 }}>{sources[0]?.[0] ?? "—"}</strong></div>
              <button type="button" className="adm-stat" onClick={() => go("content")}><small>Published articles &amp; pages</small><strong>{pages.filter(p => p.status === "Published").length}</strong></button>
              <button type="button" className="adm-stat" onClick={() => go("content")}><small>Drafts</small><strong>{pages.filter(p => p.status === "Draft").length}</strong></button>
            </div>
            <div className="stu-grid-2">
              <section className="stu-card"><div className="stu-card-head"><p className="stu-label">Next calls</p><button type="button" className="stu-link" onClick={() => { setClientTab("upcoming"); go("consultations"); }}>All consultations →</button></div>
                {upcoming.length ? <ul className="adm-mini">{upcoming.slice(0, 4).map(b => <li key={b.id}><strong>{b.name}</strong><span>{formatIn(b.start, "Europe/Paris", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} Paris · {b.destination}</span>{b.meetLink && <a className="stu-link" href={b.meetLink} target="_blank" rel="noreferrer">Join Meet</a>}</li>)}</ul> : <p className="stu-muted">No calls booked yet.</p>}
              </section>
              <section className="stu-card"><div className="stu-card-head"><p className="stu-label">Recent content</p><button type="button" className="stu-link" onClick={() => go("content")}>Pages &amp; blog →</button></div>
                {pages.length ? <ul className="adm-mini">{[...pages].sort((a, b) => (b.updated || "").localeCompare(a.updated || "")).slice(0, 4).map(p => <li key={p.slug}><strong>{p.title}</strong><span>{pathOf(p)} · <span className={`stu-status is-${p.status.toLowerCase()}`}>{p.status}</span></span></li>)}</ul> : <p className="stu-muted">{studio ? "No articles yet — your first one takes five minutes." : studioError || "Loading…"}</p>}
              </section>
            </div>
            <section className="stu-card adm-tip"><Gauge size={18} aria-hidden="true" /><p>Published articles and pages go live on the website by themselves, about 10–20 minutes after you save. The badge at the top says when the website has caught up.</p></section>
          </div>}

          {section === "control" && <SiteSettingsEditor adminKey={key} initial={data} onSaved={() => load()} part="control" />}
          {section === "general" && <SiteSettingsEditor adminKey={key} initial={data} onSaved={() => load()} part="general" />}
          {section === "content" && studio && <ContentStudio adminKey={key} studio={studio} onChange={setStudio} startNew={startNew} />}
          {section === "media" && studio && <div className="stu-stack"><div className="stu-head"><div><h2>Media gallery</h2><p>Photos for your articles and pages. Stored in your Google Drive; the website serves fast, resized copies.</p></div></div>
            <MediaGallery adminKey={key} media={studio.media} onChange={(media) => setStudio(s => s && { ...s, media })} /></div>}
          {section === "seo" && studio && <SeoEngine adminKey={key} studio={studio} onChange={setStudio} />}
          {section === "sitemap" && studio && <SitemapPanel studio={studio} />}
          {section === "robots" && studio && <RobotsPanel adminKey={key} studio={studio} onChange={setStudio} />}
          {section === "availability" && <AvailabilityEditor adminKey={key} initial={data} onSaved={() => load()} />}

          {section === "consultations" && <div className="stu-stack">
            <div className="adm-tabs" role="tablist">
              {([["upcoming", `Upcoming (${upcoming.length})`], ["enquiries", `Enquiries (${enquiries.length})`], ["clients", `All clients (${bookings.length})`]] as [ClientTab, string][]).map(([id, label]) =>
                <button key={id} type="button" role="tab" aria-selected={clientTab === id} onClick={() => setClientTab(id)}>{label}</button>)}
            </div>
            {clientTab === "upcoming" && <div className="adm-list">
              {upcoming.length ? upcoming.map(b => <BookingItem key={b.id} b={b} adminKey={key} statuses={data.statuses} onChange={update} open />) : <p className="bk-empty">No upcoming calls yet.</p>}
            </div>}
            {clientTab === "enquiries" && <div className="adm-list">
              {enquiries.length ? enquiries.map(b => <BookingItem key={b.id} b={b} adminKey={key} statuses={data.statuses} onChange={update} open={b.status === "New enquiry"} />) : <p className="bk-empty">No enquiries yet. Learn French requests and job applications appear here.</p>}
            </div>}
            {clientTab === "clients" && <div className="adm-list">
              <label className="ms-field adm-search"><span><Search size={13} aria-hidden="true" /> Search</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Name, email, phone, country, booking ID" /></label>
              {filtered.length ? filtered.map(b => <BookingItem key={b.id} b={b} adminKey={key} statuses={data.statuses} onChange={update} />) : <p className="bk-empty">No clients match.</p>}
            </div>}
          </div>}

          {section === "feedback" && <div className="adm-list">
            {rated.length ? rated.map(b => <article key={b.id} className="adm-item">
              <div className="adm-item-head"><h3>{b.name}</h3><span className="adm-stars" aria-label={`${b.rating} out of 5`}>{"★".repeat(Number(b.rating))}{"☆".repeat(5 - Number(b.rating))}</span></div>
              {b.feedback && <p style={{ margin: 0 }}>“{b.feedback}”</p>}
              <small className="adm-when">{b.start ? formatIn(b.start, "Europe/Paris", { day: "numeric", month: "short", year: "numeric" }) : b.bookedOn} · {b.destination}</small>
            </article>) : <p className="bk-empty">Feedback appears here after calls. Send each client’s feedback email, with their package, from their card under Consultations once the call has ended.</p>}
          </div>}
        </div>
        <footer className="adm-foot"><span>© {new Date().getFullYear()} Althéa Consulting · Admin</span><span><a href="/sitemap.xml" target="_blank" rel="noreferrer">sitemap.xml</a><a href="/robots.txt" target="_blank" rel="noreferrer">robots.txt</a></span></footer>
      </div>
      {navOpen && <button type="button" className="adm-scrim" aria-label="Close menu" onClick={() => setNavOpen(false)} />}
    </div>
  );
}

function BookingItem({ b, adminKey, statuses, onChange, open = false }: { b: AdminBooking; adminKey: string; statuses: string[]; onChange: (id: string, patch: Partial<AdminBooking>) => void; open?: boolean }) {
  const [expanded, setExpanded] = useState(open);
  const [notes, setNotes] = useState(b.notes);
  const [saving, setSaving] = useState("");
  const digits = b.phone.replace(/\D/g, "");
  const enquiry = isEnquiry(b);
  const paris = enquiry ? "" : `${formatIn(b.start, "Europe/Paris", { weekday: "short", day: "numeric", month: "short" })}, ${formatIn(b.start, "Europe/Paris", { hour: "2-digit", minute: "2-digit", hour12: false })} Paris`;
  const client = enquiry ? "" : `${formatIn(b.start, b.timeZone, { hour: "2-digit", minute: "2-digit", hour12: false })} ${zoneLabel(b.timeZone, b.start)} for ${b.firstName}`;
  const soon = !enquiry && b.status === "Booked" && new Date(b.start).getTime() - Date.now() < 30 * 60000 && new Date(b.end).getTime() > Date.now();

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
  async function sendReschedule() {
    if (!confirm(`Send ${b.firstName} an email to pick a new time?`)) return;
    setSaving("Sending…");
    const result = await adminCall<{ ok: boolean; error?: string; sentOn?: string }>("admin.sendReschedule", adminKey, { id: b.id });
    setSaving(result.ok ? `Reschedule email sent to ${b.email}` : result.error ?? "Couldn't send.");
    if (result.ok) onChange(b.id, { rescheduleSent: result.sentOn ?? "yes" });
  }

  return (
    <article className="adm-item">
      <div className="adm-item-head">
        <h3>{b.name}</h3>
        <span className="adm-pill" data-s={b.status}>{b.status}</span>
      </div>
      <p className="adm-when" style={{ margin: 0 }}><CalendarClock size={14} aria-hidden="true" /> {enquiry ? <>{b.destination} enquiry · received {b.bookedOn} <small>· {b.id}</small></> : <>{paris} <small>· {client} · {b.id}</small></>}</p>
      <div className="adm-row">
        {b.meetLink && b.status === "Booked" && <a className={`ms-btn ${soon ? "ms-btn-gold" : "ms-btn-ghost"}`} href={b.meetLink} target="_blank" rel="noreferrer"><Video size={15} aria-hidden="true" /><span>Join Meet</span></a>}
        {digits && <a className="ms-btn ms-btn-ghost" href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" /><span>WhatsApp</span></a>}
        <a className="ms-btn ms-btn-ghost" href={`mailto:${b.email}`}><span>Email</span></a>
        <select aria-label="Status" value={b.status} onChange={e => save({ status: e.target.value })}>{statuses.map(s => <option key={s}>{s}</option>)}</select>
        {b.status === "Booked" && <button type="button" className="ms-btn ms-btn-ghost" onClick={cancel}><span>Cancel call</span></button>}
        {canReschedule(b) && <button type="button" className="ms-btn ms-btn-ghost" onClick={sendReschedule}><Send size={15} aria-hidden="true" /><span>{b.rescheduleSent ? "Resend reschedule email" : "Send reschedule email"}</span></button>}
        <button type="button" className="ms-btn ms-btn-ghost" onClick={() => setExpanded(x => !x)} aria-expanded={expanded}><span>{expanded ? "Hide profile" : "Full profile"}</span></button>
        {saving && <small className="adm-when" role="status">{saving}</small>}
      </div>
      {canSendPackage(b) && !needsFeedbackMail(b) && <PackageSender b={b} adminKey={adminKey} onChange={onChange} />}
      {needsFeedbackMail(b) && <FeedbackMailer b={b} adminKey={adminKey} onChange={onChange} />}
      {expanded && <>
        <dl className="adm-profile">
          {(enquiry
            ? [["Email", b.email], ["WhatsApp", b.phone], ["Request", b.destination], ["French level", b.level], ["Preferred start", b.intake], ["Goal and enquiry", b.message], ["Received", b.bookedOn]]
            : [["Email", b.email], ["WhatsApp", b.phone], ["From", b.homeCountry ?? ""], ["Destination", b.destination], ["Level", b.level], ["Intake", b.intake], ["Current status", b.currentStatus],
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

/** From when the call starts — mid-call included — so she can type the package and send it immediately, not wait till it ends. */
function PackageSender({ b, adminKey, onChange }: { b: AdminBooking; adminKey: string; onChange: (id: string, patch: Partial<AdminBooking>) => void }) {
  const sent = b.packageSent ?? "";
  const [open, setOpen] = useState(!sent);
  const [pkg, setPkg] = useState(b.package ?? "");
  const [status, setStatus] = useState("");

  async function send() {
    if (!pkg.trim()) { setStatus("Write the package first."); return; }
    setStatus("Sending…");
    const result = await adminCall<{ ok: boolean; error?: string; sentOn?: string }>("admin.sendPackage", adminKey, { id: b.id, package: pkg });
    if (!result.ok) return setStatus(result.error ?? "Couldn't send. Please try again.");
    setStatus(`Sent to ${b.email}`);
    setOpen(false);
    onChange(b.id, { packageSent: result.sentOn ?? "yes", package: pkg.trim() });
  }

  if (!open) return (
    <div className="adm-row adm-feedback-mail">
      <small className="adm-when"><Mail size={14} aria-hidden="true" /> Package sent{sent && sent !== "yes" ? ` ${sent}` : ""}{status ? ` · ${status}` : ""}</small>
      <button type="button" className="ms-btn ms-btn-ghost" onClick={() => { setOpen(true); setStatus(""); }}><span>Edit and resend</span></button>
    </div>
  );
  return (
    <div className="adm-feedback-mail">
      <label className="ms-field adm-note"><span>Package for {b.firstName} — send it now, mid-call or any time</span>
        <textarea rows={5} value={pkg} onChange={e => setPkg(e.target.value)} maxLength={3000}
          placeholder={"e.g. Complete France application package: €___\nIncludes: shortlist, SOP and CV review, Campus France and visa guidance\nValid until: ___"} />
      </label>
      <div className="adm-row">
        <button type="button" className="ms-btn ms-btn-gold" onClick={send} disabled={status === "Sending…"}><Mail size={15} aria-hidden="true" /><span>{sent ? "Resend package" : "Send package now"}</span></button>
        {sent && <button type="button" className="ms-btn ms-btn-ghost" onClick={() => setOpen(false)}><span>Close</span></button>}
        {status && <small className="adm-when" role="status">{status}</small>}
      </div>
    </div>
  );
}

/** After a call: Harshita writes this student's package, then sends the feedback email that carries it. */
function FeedbackMailer({ b, adminKey, onChange }: { b: AdminBooking; adminKey: string; onChange: (id: string, patch: Partial<AdminBooking>) => void }) {
  const sent = b.feedbackSent ?? "";
  const [open, setOpen] = useState(!sent);
  const [pkg, setPkg] = useState(b.package ?? "");
  const [status, setStatus] = useState("");

  async function send() {
    if (!pkg.trim() && !confirm(`Send ${b.firstName}'s feedback email without a package?`)) return;
    setStatus("Sending…");
    const result = await adminCall<{ ok: boolean; error?: string; sentOn?: string }>("admin.sendFeedback", adminKey, { id: b.id, package: pkg });
    if (!result.ok) return setStatus(result.error ?? "Couldn't send. Please try again.");
    setStatus(`Sent to ${b.email}`);
    setOpen(false);
    onChange(b.id, { feedbackSent: result.sentOn ?? "yes", package: pkg.trim(), status: b.status === "Booked" ? "Completed" : b.status });
  }

  if (!open) return (
    <div className="adm-row adm-feedback-mail">
      <small className="adm-when"><Mail size={14} aria-hidden="true" /> Feedback email sent{sent && sent !== "yes" ? ` ${sent}` : ""}{status ? ` · ${status}` : ""}</small>
      <button type="button" className="ms-btn ms-btn-ghost" onClick={() => { setOpen(true); setStatus(""); }}><span>Edit package and resend</span></button>
    </div>
  );
  return (
    <div className="adm-feedback-mail">
      <label className="ms-field adm-note"><span>Package for {b.firstName} (goes in the feedback email)</span>
        <textarea rows={5} value={pkg} onChange={e => setPkg(e.target.value)} maxLength={3000}
          placeholder={"e.g. Complete France application package: €___\nIncludes: shortlist, SOP and CV review, Campus France and visa guidance\nValid until: ___"} />
      </label>
      <div className="adm-row">
        <button type="button" className="ms-btn ms-btn-gold" onClick={send} disabled={status === "Sending…"}><Mail size={15} aria-hidden="true" /><span>{sent ? "Resend feedback email" : "Send feedback email"}</span></button>
        {sent && <button type="button" className="ms-btn ms-btn-ghost" onClick={() => setOpen(false)}><span>Close</span></button>}
        {status && <small className="adm-when" role="status">{status}</small>}
      </div>
    </div>
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

/**
 * Everything else Harshita can change herself, no code or redeploy needed: which countries are open for
 * booking, pausing bookings or Learn French requests (with her own message), her name and WhatsApp shown
 * in emails, and a short announcement banner. Changes here take effect on the live site within a minute.
 */
function SiteSettingsEditor({ adminKey, initial, onSaved, part }: { adminKey: string; initial: AdminData; onSaved: () => void; part: "control" | "general" }) {
  const s = initial.settings;
  const [countries, setCountries] = useState<string[]>(s.liveCountries.length ? s.liveCountries : ["france"]);
  const [bookingPaused, setBookingPaused] = useState(s.bookingPaused);
  const [bookingPausedMessage, setBookingPausedMessage] = useState(s.bookingPausedMessage);
  const [frenchPaused, setFrenchPaused] = useState(s.frenchPaused);
  const [frenchPausedMessage, setFrenchPausedMessage] = useState(s.frenchPausedMessage);
  const [bannerMessage, setBannerMessage] = useState(s.bannerMessage);
  const [ownerName, setOwnerName] = useState(s.ownerName);
  const [ownerRole, setOwnerRole] = useState(s.ownerRole);
  const [whatsapp, setWhatsapp] = useState(s.whatsapp);
  const [status, setStatus] = useState("");

  function toggleCountry(slug: string) {
    setCountries(list => list.includes(slug) ? list.filter(c => c !== slug) : [...list, slug]);
  }
  async function save() {
    setStatus("Saving…");
    const result = await adminCall("admin.saveSettings", adminKey, {
      settings: { liveCountries: countries.length ? countries : ["france"], bookingPaused, bookingPausedMessage, frenchPaused, frenchPausedMessage, bannerMessage, ownerName, ownerRole, whatsapp },
    });
    setStatus(result.ok ? "Saved. Live on the website within a minute." : result.error ?? "Couldn't save.");
    if (result.ok) onSaved();
  }

  return (
    <div className="adm-list">
      {part === "control" && <>
      <section className="adm-card">
        <p className="ms-form-title" style={{ fontSize: 20, marginBottom: 4 }}>Countries open for booking</p>
        <p className="adm-when" style={{ marginBottom: 12 }}>Students can book a call, see jobs and courses for a ticked country. Unticked countries still show their information pages, but every action says “Coming soon”.</p>
        <div className="adm-countries">
          {COUNTRY_OPTIONS.map(([slug, label]) => <label key={slug} className="bk-choice"><input type="checkbox" checked={countries.includes(slug)} onChange={() => toggleCountry(slug)} /><span>{label}</span></label>)}
        </div>
      </section>

      <section className="adm-card">
        <p className="ms-form-title" style={{ fontSize: 20, marginBottom: 12 }}>Pause new requests</p>
        <div className="adm-settings">
          <div className="ms-field"><span>Booking calls</span>
            <label className="bk-choice"><input type="checkbox" checked={bookingPaused} onChange={e => setBookingPaused(e.target.checked)} /><span>Pause — hides the booking form everywhere</span></label>
          </div>
          <label className="ms-field ms-field-wide"><span>Message shown instead</span>
            <input value={bookingPausedMessage} onChange={e => setBookingPausedMessage(e.target.value)} maxLength={300} placeholder="e.g. Back from 5 November. Email us and we'll get back to you." />
          </label>
          <div className="ms-field"><span>Learn French requests</span>
            <label className="bk-choice"><input type="checkbox" checked={frenchPaused} onChange={e => setFrenchPaused(e.target.checked)} /><span>Pause — hides the Learn French form</span></label>
          </div>
          <label className="ms-field ms-field-wide"><span>Message shown instead</span>
            <input value={frenchPausedMessage} onChange={e => setFrenchPausedMessage(e.target.value)} maxLength={300} placeholder="e.g. Taking a short break, back soon." />
          </label>
        </div>
      </section>

      <section className="adm-card">
        <p className="ms-form-title" style={{ fontSize: 20, marginBottom: 4 }}>Announcement banner</p>
        <p className="adm-when" style={{ marginBottom: 12 }}>An optional short line shown above the booking form. Leave empty to show nothing.</p>
        <label className="ms-field ms-field-wide"><span>Banner text</span>
          <input value={bannerMessage} onChange={e => setBannerMessage(e.target.value)} maxLength={200} placeholder="e.g. Limited slots this week — book early." />
        </label>
      </section>

      </>}
      {part === "general" && <>
      <section className="adm-card">
        <p className="ms-form-title" style={{ fontSize: 20, marginBottom: 12 }}>Your details in emails</p>
        <div className="adm-settings">
          <label className="ms-field"><span>Your name</span><input value={ownerName} onChange={e => setOwnerName(e.target.value)} maxLength={80} /></label>
          <label className="ms-field"><span>Your title</span><input value={ownerRole} onChange={e => setOwnerRole(e.target.value)} maxLength={80} /></label>
          <label className="ms-field"><span>Partnerships WhatsApp</span><input value={whatsapp} onChange={e => setWhatsapp(e.target.value.replace(/[^\d]/g, ""))} maxLength={20} placeholder="33755749029" />
            <small className="bk-hint">Digits only, with country code — no + or spaces.</small>
          </label>
        </div>
      </section>
      <section className="adm-card">
        <p className="ms-form-title" style={{ fontSize: 20, marginBottom: 4 }}>Security</p>
        <p className="adm-when" style={{ margin: 0 }}>Your admin key lives in the Apps Script project (Project settings → Script properties → ADMIN_KEY). Change it there if you ever think someone else has it; this page signs out everywhere it was used. After 20 wrong attempts, sign-in pauses for 15 minutes.</p>
      </section>
      </>}

      <div className="adm-row"><button type="button" className="ms-btn ms-btn-gold" onClick={save}><span>{part === "control" ? "Save site controls" : "Save settings"}</span></button>{status && <span className="adm-when" role="status">{status}</span>}</div>
    </div>
  );
}
