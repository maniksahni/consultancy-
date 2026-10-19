"use client";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { buildConsultationWhatsAppUrl, enquiryLimits, enquirySchema, referralSources } from "@/lib/consultation";
import { ArrowUpRight, Lock, MessageCircle } from "lucide-react";

export default function Booking({ defaultCountry = "France", defaultMessage }: { defaultCountry?: string; defaultMessage?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [handoff, setHandoff] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("destination");
    const role = params.get("careerRole");
    const service = params.get("service");
    const countries: Record<string, string> = { france: "France", uk: "UK", usa: "USA", canada: "Canada", germany: "Germany", australia: "Australia", ireland: "Ireland" };
    const select = formRef.current?.elements.namedItem("targetCountry") as HTMLSelectElement | null;
    if (select && slug && countries[slug]) select.value = countries[slug];
    const message = formRef.current?.elements.namedItem("message") as HTMLTextAreaElement | null;
    if (message) {
      if (defaultMessage) message.value = defaultMessage;
      else if (service) message.value = `I would like to enquire about ${service.slice(0, 160)}.`;
      else if (role) message.value = `I would like CV assistance for ${role}${slug && countries[slug] ? ` roles in ${countries[slug]}` : ""}.`;
    }
    if (service || location.hash === "#consultation-form") {
      formRef.current?.scrollIntoView({ block: "start" });
      (formRef.current?.elements.namedItem("fullName") as HTMLInputElement | null)?.focus({ preventScroll: true });
    }
  }, [defaultMessage]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = enquirySchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      const fieldErrors = Object.fromEntries(parsed.error.issues.map(issue => [issue.path[0], issue.message]));
      setErrors(fieldErrors);
      setStatus("Please check the highlighted fields.");
      (event.currentTarget.elements.namedItem(String(parsed.error.issues[0].path[0])) as HTMLElement | null)?.focus();
      return;
    }
    const url = buildConsultationWhatsAppUrl(parsed.data);
    setErrors({});
    setStatus("Opening WhatsApp…");
    setHandoff(url);
    window.location.assign(url);
  }
  const fieldId = (name: string) => `${id}-${name}`;
  const error = (name: string) => errors[name] && <span className="ms-field-error" id={`${fieldId(name)}-error`}>{errors[name]}</span>;
  const field = (name: "fullName" | "phone", label: string, type = "text", required = false) => (
    <label className="ms-field" htmlFor={fieldId(name)}><span>{label}</span>
      <input id={fieldId(name)} name={name} type={type} required={required}
        maxLength={enquiryLimits[name]} autoComplete={name === "fullName" ? "name" : "tel"}
        aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${fieldId(name)}-error` : undefined} />
      {error(name)}
    </label>
  );
  return (
    <form id="consultation-form" ref={formRef} className="booking-form ms-form" onSubmit={submit} noValidate>
      <div className="ms-form-head"><span className="ms-form-icon"><MessageCircle size={20} aria-hidden="true" /></span><div><p className="ms-kicker">CONSULTATION REQUEST</p><p className="ms-form-title">Tell us where you are.</p></div></div>
      <div className="ms-form-grid">
      {field("fullName", "Full name *", "text", true)}
      {field("phone", "Phone number (optional)", "tel")}
      <label className="ms-field" htmlFor={fieldId("targetCountry")}><span>Destination</span>
        <select name="targetCountry" id={fieldId("targetCountry")} defaultValue={defaultCountry}>
          {["France", "UK", "USA", "Canada", "Germany", "Australia", "Ireland", "Undecided"].map(country => <option key={country}>{country}</option>)}
        </select>
      </label>
      <label className="ms-field" htmlFor={fieldId("preferredTime")}><span>Preferred time & time zone (optional)</span>
        <input id={fieldId("preferredTime")} name="preferredTime" maxLength={enquiryLimits.preferredTime} placeholder="e.g. weekday afternoons, India time" />
      </label>
      <label className="ms-field ms-field-wide" htmlFor={fieldId("referralSource")}><span>How did you find Althéa? (optional)</span>
        <select id={fieldId("referralSource")} name="referralSource" defaultValue=""><option value="">Prefer not to say</option>{referralSources.map(source => <option key={source}>{source}</option>)}</select>
      </label>
      <label className="ms-field ms-field-wide" htmlFor={fieldId("background")}><span>Academic background (optional)</span>
        <textarea id={fieldId("background")} name="background" maxLength={enquiryLimits.background} rows={2} />
      </label>
      <label className="ms-field ms-field-wide" htmlFor={fieldId("message")}><span>What would you like to explore? *</span>
        <textarea id={fieldId("message")} name="message" required maxLength={enquiryLimits.message} rows={4}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? `${fieldId("message")}-error` : undefined} />
        {error("message")}
      </label>
      </div>
      <button className="ms-btn ms-btn-gold ms-form-submit" type="submit"><span>{handoff ? "Opening WhatsApp…" : "Continue to WhatsApp"}</span><ArrowUpRight size={17} aria-hidden="true" /></button>
      {handoff && <a className="ms-link" href={handoff} target="_blank" rel="noreferrer">Not redirected? Open WhatsApp</a>}
      <p className="ms-form-note">WhatsApp opens with your details filled in. Review the message and press Send there.</p>
      <p role="status" className={status ? "ms-form-status" : "ms-form-status is-empty"}>{status}</p>
      <p className="ms-form-note"><Lock size={13} aria-hidden="true" /> No fee or service commitment is created by this enquiry.</p>
    </form>
  );
}
