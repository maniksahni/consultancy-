"use client";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { buildConsultationWhatsAppUrl, enquiryLimits, enquirySchema } from "@/lib/consultation";

export default function Booking({ defaultCountry = "France" }: { defaultCountry?: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [whatsappUrl, setWhatsAppUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("destination");
    const countries: Record<string, string> = { france: "France", uk: "UK", usa: "USA", canada: "Canada", germany: "Germany", australia: "Australia", ireland: "Ireland" };
    const select = formRef.current?.elements.namedItem("targetCountry") as HTMLSelectElement | null;
    if (select && slug && countries[slug]) select.value = countries[slug];
  }, []);

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
    setStatus("");
    setWhatsAppUrl(url);
    window.location.assign(url);
  }
  const fieldId = (name: string) => `${id}-${name}`;
  const error = (name: string) => errors[name] && <span id={`${fieldId(name)}-error`}>{errors[name]}</span>;
  const field = (name: "fullName" | "phone", label: string, type = "text", required = false) => (
    <label htmlFor={fieldId(name)}>{label}
      <input id={fieldId(name)} name={name} type={type} required={required}
        maxLength={enquiryLimits[name]} autoComplete={name === "fullName" ? "name" : "tel"}
        aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${fieldId(name)}-error` : undefined} />
      {error(name)}
    </label>
  );
  return (
    <form ref={formRef} className="booking-form" onSubmit={submit} noValidate onInput={() => { if (whatsappUrl) setWhatsAppUrl(""); }}>
      <p className="eyebrow">CONSULTATION REQUEST</p>
      {field("fullName", "Full name *", "text", true)}
      {field("phone", "Phone number (optional)", "tel")}
      <label htmlFor={fieldId("targetCountry")}>Study destination
        <select name="targetCountry" id={fieldId("targetCountry")} defaultValue={defaultCountry}>
          {["France", "UK", "USA", "Canada", "Germany", "Australia", "Ireland", "Undecided"].map(country => <option key={country}>{country}</option>)}
        </select>
      </label>
      <label htmlFor={fieldId("background")}>Academic background (optional)
        <textarea id={fieldId("background")} name="background" maxLength={enquiryLimits.background} rows={2} />
      </label>
      <label htmlFor={fieldId("message")}>What would you like to explore? *
        <textarea id={fieldId("message")} name="message" required maxLength={enquiryLimits.message} rows={4}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? `${fieldId("message")}-error` : undefined} />
        {error("message")}
      </label>
      <label htmlFor={fieldId("preferredTime")}>Preferred time & time zone (optional)
        <input id={fieldId("preferredTime")} name="preferredTime" maxLength={enquiryLimits.preferredTime} placeholder="e.g. weekday afternoons, India time" />
      </label>
      <button className="button" type="submit" disabled={!!whatsappUrl}>{whatsappUrl ? "Opening WhatsApp…" : "Request a conversation ↗"}</button>
      <p className="muted">Submitting opens WhatsApp with your details ready to send.</p>
      {whatsappUrl && <a className="text-link whatsapp-fallback" href={whatsappUrl}>Not redirected? Open WhatsApp</a>}
      <p role="status" className={status ? "form-status" : ""}>{status || (whatsappUrl ? "Opening WhatsApp…" : "")}</p>
      <p className="muted">No fee or service commitment is created by this enquiry.</p>
    </form>
  );
}
