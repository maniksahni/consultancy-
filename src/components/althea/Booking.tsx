"use client";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarCheck, CalendarPlus, Check, Clock, Loader2, Lock, MessageCircle, Video } from "lucide-react";
import { brand } from "@/config/brand";
import { meetingMinutes } from "@/config/booking";
import { assistanceOptions, bookingSchema, buildConsultationEmailUrl, currentStatuses, enquiryLimits, referralSources, type BookingDetails } from "@/lib/consultation";
import { isComingSoon } from "@/lib/comingSoon";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { commonHomeCountries, otherHomeCountries } from "@/lib/countries";
import { bookSlot, bookingMode, fetchSlots, formatIn, googleCalendarUrl, visitorTimeZone, zoneLabel, type BookingMode } from "@/lib/booking";

type Step = 0 | 1;
type Booked = { id: string; start: string; end: string; meetLink: string; email: string; firstName: string; confirmationSent: boolean };

const STEP_FIELDS: (keyof BookingDetails)[][] = [
  ["fullName", "email", "phone", "homeCountry", "targetCountry", "currentStatus", "message", "referralSource"],
  [],
];
const STEPS = ["Your details", "Book your call"];
const COUNTRIES = ["France", "UK", "USA", "Canada", "Germany", "Australia", "Ireland", "Undecided"];
const COUNTRY_SLUGS: Record<string, string> = { france: "France", uk: "UK", usa: "USA", canada: "Canada", germany: "Germany", australia: "Australia", ireland: "Ireland" };
/**
 * Two-step consultation booking: your details and the help you need, then a free 15-minute slot.
 * "Book now" books the slot through the Apps Script backend (Calendar event + Meet link + emails + sheet row).
 * Without a backend, or if it is unreachable, "Book now" opens an email with the same details so no enquiry is lost.
 */
export default function Booking({ defaultCountry = "France", defaultMessage }: { defaultCountry?: string; defaultMessage?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState<Step>(0);
  const [mode, setMode] = useState<BookingMode>("off");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [slotsError, setSlotsError] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [busy, setBusy] = useState(false);
  const [booked, setBooked] = useState<Booked | null>(null);
  const [handoff, setHandoff] = useState("");
  /** Context from the link that opened the form (a service, a job role), added after the chosen help. */
  const [context, setContext] = useState("");
  const tz = useMemo(() => (typeof window === "undefined" ? "Asia/Kolkata" : visitorTimeZone()), []);
  /** Harshita's live switches: which countries are open for booking, and whether booking is paused. */
  const site = useSiteSettings();
  const SOON = Object.entries(COUNTRY_SLUGS).filter(([slug]) => !site.liveCountries.includes(slug)).map(([, label]) => label);

  useEffect(() => {
    setMode(bookingMode());
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("destination");
    const role = params.get("careerRole");
    const service = params.get("service");
    const countries = COUNTRY_SLUGS;
    const select = formRef.current?.elements.namedItem("targetCountry") as HTMLSelectElement | null;
    if (select && slug && countries[slug] && !isComingSoon(slug)) select.value = countries[slug];
    if (defaultMessage) setContext(defaultMessage);
    else if (service) setContext(`About ${service.slice(0, 160)}`);
    else if (role) {
      setContext(`For ${role}${slug && countries[slug] ? ` roles in ${countries[slug]}` : ""}`);
      const cv = formRef.current?.querySelector<HTMLInputElement>('input[name="assistance"][value="CV review"]');
      if (cv) cv.checked = true;
    }
    if (service || location.hash === "#consultation-form") {
      formRef.current?.scrollIntoView({ block: "start" });
      (formRef.current?.elements.namedItem("fullName") as HTMLInputElement | null)?.focus({ preventScroll: true });
    }
  }, [defaultMessage]);

  const loadSlots = () => {
    setSlots(null); setSlotsError(""); setSlot("");
    fetchSlots().then(list => {
      setSlots(list);
      setDay(current => (current && list.some(s => dayKey(s) === current) ? current : list[0] ? dayKey(list[0]) : ""));
    }).catch(() => { setSlots([]); setSlotsError("We couldn't load Harshita's calendar just now. Book now opens an email with your details, and she will reply with a time."); });
  };
  useEffect(() => { if (step === 1 && slots === null && mode !== "off") loadSlots(); }, [step, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const dayKey = (iso: string) => formatIn(iso, tz, { year: "numeric", month: "2-digit", day: "2-digit" });
  const days = useMemo(() => {
    const groups = new Map<string, string[]>();
    for (const s of slots ?? []) groups.set(dayKey(s), [...(groups.get(dayKey(s)) ?? []), s]);
    return [...groups.entries()];
  }, [slots]); // eslint-disable-line react-hooks/exhaustive-deps
  const daySlots = days.find(([key]) => key === day)?.[1] ?? [];
  const zone = zoneLabel(tz);
  const longWhen = (iso: string) => `${formatIn(iso, tz, { weekday: "short", day: "numeric", month: "short" })}, ${formatIn(iso, tz, { hour: "2-digit", minute: "2-digit", hour12: false })} ${zone}`;
  const parisWhen = (iso: string) => `${formatIn(iso, "Europe/Paris", { hour: "2-digit", minute: "2-digit", hour12: false })} Paris`;

  /** Form values, with the ticked help options (and any link context) sent as the message. */
  function values() {
    const data = new FormData(formRef.current!);
    const help = data.getAll("assistance").map(String).join(", ");
    const out = Object.fromEntries(data) as Record<string, string>;
    delete out.assistance;
    out.message = help ? (context ? `${help} — ${context}` : help) : "";
    return out;
  }

  /** Validates only the fields of the given step and focuses the first problem. */
  function check(upTo: Step) {
    const fields = STEP_FIELDS.slice(0, upTo + 1).flat();
    const parsed = bookingSchema.safeParse(values());
    const issues = parsed.success ? [] : parsed.error.issues.filter(issue => fields.includes(issue.path[0] as keyof BookingDetails));
    const next = Object.fromEntries(issues.map(issue => [String(issue.path[0]), issue.message]));
    setErrors(next);
    if (issues.length) {
      setStatus("Please check the highlighted fields.");
      const first = String(issues[0].path[0]);
      const firstStep = STEP_FIELDS.findIndex(group => group.includes(first as keyof BookingDetails)) as Step;
      if (firstStep !== step) setStep(firstStep);
      requestAnimationFrame(() => (first === "message"
        ? formRef.current?.querySelector<HTMLInputElement>('input[name="assistance"]')
        : formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus());
      return null;
    }
    setStatus("");
    // Earlier steps pass once their own fields are valid; the final step needs the whole form.
    if (parsed.success) return parsed.data;
    return upTo < 1 ? ({} as BookingDetails) : null;
  }

  function go(to: Step) {
    if (to > step && !check(step)) return;
    setStep(to);
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
  }

  function toEmail(details: BookingDetails) {
    const url = buildConsultationEmailUrl(details);
    setHandoff(url);
    setStatus("Opening your email app…");
    window.location.assign(url);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 1) return go(1);
    const details = check(1);
    if (!details || busy) return;
    if (mode !== "off" && !slotsError && slots === null) { setStatus("Harshita’s free times are still loading…"); return; }
    const live = mode !== "off" && !slotsError && (slots?.length ?? 0) > 0;
    if (!live) return toEmail(details);
    if (!slot) { setStatus("Choose a time for your call."); return; }
    setBusy(true); setStatus("Booking your call…");
    try {
      const result = await bookSlot(details, slot, values().website ?? "");
      if (!result.ok) {
        setStatus(result.error);
        if (result.code === "slot-taken") loadSlots();
        return;
      }
      setBooked({ id: result.id, start: result.start, end: result.end, meetLink: result.meetLink, email: details.email, firstName: details.fullName.split(" ")[0], confirmationSent: result.confirmationSent ?? true });
      setStatus("");
      requestAnimationFrame(() => doneRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    } catch {
      setStatus("Booking failed to connect. Your email app is opening with your details so Harshita can confirm a time.");
      toEmail(details);
    } finally { setBusy(false); }
  }

  const fieldId = (name: string) => `${id}-${name}`;
  const described = (name: string) => (errors[name] ? `${fieldId(name)}-error` : undefined);
  const error = (name: string) => errors[name] && <span className="ms-field-error" id={`${fieldId(name)}-error`}>{errors[name]}</span>;
  const input = (name: keyof BookingDetails, label: string, opts: { type?: string; required?: boolean; hint?: string; autoComplete?: string; placeholder?: string; wide?: boolean } = {}) => (
    <label className={`ms-field${opts.wide ? " ms-field-wide" : ""}`} htmlFor={fieldId(name)}><span>{label}{opts.required ? " *" : ""}</span>
      <input id={fieldId(name)} name={name} type={opts.type ?? "text"} required={opts.required} maxLength={enquiryLimits[name as keyof typeof enquiryLimits]}
        autoComplete={opts.autoComplete} placeholder={opts.placeholder} inputMode={opts.type === "tel" ? "tel" : undefined}
        aria-invalid={!!errors[name]} aria-describedby={described(name)} />
      {opts.hint && !errors[name] && <small className="bk-hint">{opts.hint}</small>}
      {error(name)}
    </label>
  );
  const select = (name: keyof BookingDetails, label: string, options: readonly string[], opts: { required?: boolean; placeholder?: string; defaultValue?: string; wide?: boolean; disabled?: readonly string[] } = {}) => (
    <label className={`ms-field${opts.wide ? " ms-field-wide" : ""}`} htmlFor={fieldId(name)}><span>{label}{opts.required ? " *" : ""}</span>
      <select id={fieldId(name)} name={name} defaultValue={opts.defaultValue ?? ""} aria-invalid={!!errors[name]} aria-describedby={described(name)}>
        {opts.placeholder !== undefined && <option value="">{opts.placeholder}</option>}
        {options.map(option => opts.disabled?.includes(option)
          ? <option key={option} value={option} disabled>{option} (coming soon)</option>
          : <option key={option}>{option}</option>)}
      </select>
      {error(name)}
    </label>
  );

  if (site.bookingPaused) return (
    <section id="consultation-form" className="booking-form ms-form bk-done" aria-live="polite">
      <p className="ms-kicker">BOOKINGS ARE PAUSED</p>
      <h3 className="bk-done-title">We’re not taking new calls <em>right now.</em></h3>
      <p className="ms-muted">{site.bookingPausedMessage || "Please check back soon, or email us and we’ll get back to you."}</p>
      <a className="ms-btn ms-btn-gold" href={`mailto:${brand.email}`}><span>Email {brand.person}</span></a>
    </section>
  );

  if (booked) return (
    <section id="consultation-form" ref={doneRef} className="booking-form ms-form bk-done" aria-live="polite">
      <div className="bk-done-badge"><CalendarCheck size={26} aria-hidden="true" /></div>
      <p className="ms-kicker">YOU ARE BOOKED</p>
      <h3 className="bk-done-title">See you soon, <em>{booked.firstName}.</em></h3>
      <div className="bk-when">
        <strong>{formatIn(booked.start, tz, { weekday: "long", day: "numeric", month: "long" })}</strong>
        <span>{formatIn(booked.start, tz, { hour: "2-digit", minute: "2-digit", hour12: false })}–{formatIn(booked.end, tz, { hour: "2-digit", minute: "2-digit", hour12: false })} {zone} · {parisWhen(booked.start)}</span>
        <small><Video size={14} aria-hidden="true" /> Google Meet · {meetingMinutes} minutes · Booking {booked.id}</small>
      </div>
      <div className="bk-actions">
        <a className="ms-btn ms-btn-gold" href={booked.meetLink} target="_blank" rel="noreferrer"><span>Open your Meet link</span><ArrowUpRight size={17} aria-hidden="true" /></a>
        <a className="ms-btn ms-btn-ghost" href={googleCalendarUrl(booked.start, booked.end, booked.meetLink, brand.person)} target="_blank" rel="noreferrer"><CalendarPlus size={17} aria-hidden="true" /><span>Add to calendar</span></a>
      </div>
      <p className="bk-sent">{booked.confirmationSent ? <>We’ve emailed your Meet link and a preparation guide to <strong>{booked.email}</strong>. A Google Calendar invite is on its way too.</> : <>Your Google Calendar invite is on its way. We couldn’t send the branded confirmation email, so use the Meet link above and reply to Harshita by email if you need help.</>}</p>
      <div className="bk-prep">
        <p className="bk-prep-title">Before your call, be ready with</p>
        <ol>
          <li><strong>Your current status:</strong> studying, working or a gap year, and when you want to start.</li>
          <li><strong>Your education background:</strong> degree, university, year, grades, any backlogs.</li>
          <li><strong>Your experience:</strong> internships, jobs, projects, achievements.</li>
          <li><strong>The problems you are facing:</strong> what is blocking you right now.</li>
          <li><strong>Your top three questions,</strong> written down.</li>
        </ol>
      </div>
    </section>
  );

  const progress = ((step + 1) / STEPS.length) * 100;
  return (
    <form id="consultation-form" ref={formRef} className="booking-form ms-form bk-form" onSubmit={submit} noValidate data-step={step}>
      {site.bannerMessage && <p className="bk-banner">{site.bannerMessage}</p>}
      <div className="ms-form-head"><span className="ms-form-icon"><CalendarCheck size={20} aria-hidden="true" /></span><div><p className="ms-kicker">FREE {meetingMinutes}-MINUTE CALL</p><p className="ms-form-title">{["Tell us what you need.", "Book your call."][step]}</p></div></div>

      <ol className="bk-steps" aria-label="Booking steps">
        {STEPS.map((label, i) => <li key={label} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
          <button type="button" onClick={() => i < step && go(i as Step)} disabled={i > step} tabIndex={i < step ? 0 : -1}><span>{i < step ? <Check size={13} aria-hidden="true" /> : i + 1}</span>{label}</button>
        </li>)}
      </ol>
      <div className="bk-bar" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      <fieldset className="bk-pane" hidden={step !== 0}>
        <legend className="sr-only">Your details</legend>
        <div className="ms-form-grid">
          {input("fullName", "Full name", { required: true, autoComplete: "name" })}
          {input("phone", "WhatsApp number", { type: "tel", required: true, autoComplete: "tel", placeholder: "+91 98765 43210" })}
          {input("email", "Email", { type: "email", required: true, autoComplete: "email", placeholder: "name@gmail.com", hint: "Your Google Meet link is sent here.", wide: true })}
          <label className="ms-field" htmlFor={fieldId("homeCountry")}><span>Which country are you from? *</span>
            <select id={fieldId("homeCountry")} name="homeCountry" defaultValue="" autoComplete="country-name" aria-invalid={!!errors.homeCountry} aria-describedby={described("homeCountry")}>
              <option value="">Choose your country</option>
              <optgroup label="Most of our students">{commonHomeCountries.map(c => <option key={c}>{c}</option>)}</optgroup>
              <optgroup label="All countries">{otherHomeCountries.map(c => <option key={c}>{c}</option>)}</optgroup>
            </select>
            {error("homeCountry")}
          </label>
          {select("targetCountry", "Destination", COUNTRIES, { defaultValue: SOON.includes(defaultCountry) ? "France" : defaultCountry, disabled: SOON })}
          {select("currentStatus", "Where are you right now?", currentStatuses, { required: true, placeholder: "Choose one" })}
          <fieldset className="ms-field ms-field-wide bk-choices" aria-invalid={!!errors.message} aria-describedby={described("message")}>
            <legend>What help do you need? *</legend>
            <div>{assistanceOptions.map(option => <label key={option} className="bk-choice"><input type="checkbox" name="assistance" value={option} /><span>{option}</span></label>)}</div>
            {error("message")}
          </fieldset>
          {select("referralSource", "How did you find Althéa?", referralSources, { placeholder: "Prefer not to say", wide: true })}
        </div>
      </fieldset>

      <fieldset className="bk-pane" hidden={step !== 1}>
        <legend className="sr-only">Pick a time</legend>
        {mode === "preview" && <p className="bk-preview">Preview: these are sample times. Nothing is booked or sent.</p>}
        {mode !== "off" && !slotsError ? <>
          <p className="bk-zone"><Clock size={14} aria-hidden="true" /> Times in your time zone ({zone}). Each call is {meetingMinutes} minutes on Google Meet.</p>
          {slots === null ? <div className="bk-loading" role="status"><Loader2 size={18} className="bk-spin" aria-hidden="true" /> Loading Harshita’s free times…</div>
            : !days.length ? <p className="bk-empty">No free times in the next few weeks. Book now opens an email with your details and Harshita will find a time with you.</p>
            : <>
              <div className="bk-days" role="radiogroup" aria-label="Day">
                {days.map(([key, list]) => <button type="button" key={key} role="radio" aria-checked={key === day} className={key === day ? "is-on" : ""} onClick={() => { setDay(key); setSlot(""); }}>
                  <small>{formatIn(list[0], tz, { weekday: "short" })}</small><strong>{formatIn(list[0], tz, { day: "numeric" })}</strong><small>{formatIn(list[0], tz, { month: "short" })}</small><em>{list.length} free</em>
                </button>)}
              </div>
              <div className="bk-times" role="radiogroup" aria-label="Time">
                {daySlots.map(s => <button type="button" key={s} role="radio" aria-checked={s === slot} className={s === slot ? "is-on" : ""} onClick={() => setSlot(s)}>
                  <strong>{formatIn(s, tz, { hour: "2-digit", minute: "2-digit", hour12: false })}</strong><small>{parisWhen(s)}</small>
                </button>)}
              </div>
              {slot && <p className="bk-picked"><Check size={15} aria-hidden="true" /> {longWhen(slot)} · {parisWhen(slot)}</p>}
            </>}
        </> : <>
          {slotsError ? <p className="bk-empty">{slotsError}</p> : <p className="bk-note">Online booking is being switched on. Tell us when suits you, and Harshita will confirm your call by email.</p>}
          <div className="ms-form-grid">
            <label className="ms-field ms-field-wide" htmlFor={fieldId("preferredTime")}><span>When suits you? (optional)</span>
              <input id={fieldId("preferredTime")} name="preferredTime" maxLength={enquiryLimits.preferredTime} placeholder="Weekday afternoons, India time" />
            </label>
          </div>
        </>}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="bk-honey" aria-hidden="true" />
      </fieldset>

      <div className="bk-nav">
        {step > 0 && <button type="button" className="ms-btn ms-btn-ghost bk-back" onClick={() => go((step - 1) as Step)}><ArrowLeft size={17} aria-hidden="true" /><span>Back</span></button>}
        <button className="ms-btn ms-btn-gold ms-form-submit" type="submit" disabled={busy}>
          {busy ? <><Loader2 size={17} className="bk-spin" aria-hidden="true" /><span>Booking…</span></>
            : step < 1 ? <><span>Continue</span><ArrowRight size={17} aria-hidden="true" /></>
            : <><span>Book now</span><ArrowUpRight size={17} aria-hidden="true" /></>}
        </button>
      </div>
      {handoff && <a className="ms-link" href={handoff} target="_blank" rel="noreferrer">Email app didn’t open? Write to {brand.email}</a>}
      <p role="status" className={status ? "ms-form-status" : "ms-form-status is-empty"}>{status}</p>
      <p className="ms-form-note"><Lock size={13} aria-hidden="true" /> Free, no commitment. Your details go only to {brand.person}.</p>
    </form>
  );
}
