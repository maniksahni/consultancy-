"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "@/components/althea/EditorialLink";
import {
  enquirySchema,
  enquiryEnabled,
  submitEnquiry,
} from "@/lib/consultation";
export default function Booking() {
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("destination");
    const countries: Record<string, string> = {
      france: "France",
      uk: "UK",
      usa: "USA",
      canada: "Canada",
      germany: "Germany",
      australia: "Australia",
      ireland: "Ireland",
    };
    const select = document.querySelector<HTMLSelectElement>(
      "select[name=targetCountry]",
    );
    if (select && slug && countries[slug]) select.value = countries[slug];
  }, []);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const parsed = enquirySchema.safeParse({
      ...raw,
      consent: raw.consent === "on",
    });
    if (!parsed.success) {
      setErrors(
        Object.fromEntries(
          parsed.error.issues.map((i) => [i.path[0], i.message]),
        ),
      );
      setStatus("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const id = await submitEnquiry(parsed.data);
      setStatus(
        `Your enquiry was received. Reference: ${id}. A consultation time will be confirmed separately.`,
      );
      setSent(true);
      form.reset();
    } catch {
      setStatus(
        enquiryEnabled
          ? "We could not send your enquiry. Please try again later. No appointment has been confirmed."
          : "Enquiry delivery is not yet enabled. Your request has not been sent.",
      );
    } finally {
      setBusy(false);
    }
  }
  const field = (
    name: string,
    label: string,
    type = "text",
    required = false,
  ) => (
    <label htmlFor={name}>
      {label}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={name === "fullName" || name === "email" ? 100 : 25}
        autoComplete={
          name === "fullName" ? "name" : name === "email" ? "email" : "tel"
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && <span id={`${name}-error`}>{errors[name]}</span>}
    </label>
  );
  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      <p className="eyebrow">CONSULTATION REQUEST</p>
      {!enquiryEnabled && (
        <p className="form-status">
          Online enquiries are being configured. You can prepare your details,
          but they cannot be sent yet.
        </p>
      )}
      {field("fullName", "Full name *", "text", true)}
      {field("email", "Email address *", "email", true)}
      {field("phone", "Phone number (optional)", "tel")}
      <label htmlFor="targetCountry">
        Study destination
        <select name="targetCountry" id="targetCountry">
          {[
            "France",
            "UK",
            "USA",
            "Canada",
            "Germany",
            "Australia",
            "Ireland",
            "Undecided",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label htmlFor="background">
        Academic background (optional)
        <textarea id="background" name="background" maxLength={500} rows={2} />
      </label>
      <label htmlFor="message">
        What would you like to explore? *
        <textarea
          id="message"
          name="message"
          required
          maxLength={1500}
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <span id="message-error">{errors.message}</span>}
      </label>
      <label htmlFor="preferredTime">
        Preferred time & time zone (optional)
        <input
          id="preferredTime"
          name="preferredTime"
          maxLength={100}
          placeholder="e.g. weekday afternoons, India time"
        />
      </label>
      <label className="trap" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={!!errors.consent}
        />
        <span>
          I consent to using these details to respond to my enquiry. Read the{" "}
          <Link href="/privacy" style={{ textDecoration: "underline" }}>
            privacy notice
          </Link>
          .
          {errors.consent && (
            <span style={{ display: "block" }}>{errors.consent}</span>
          )}
        </span>
      </label>
      <button className="button" disabled={busy || sent} type="submit">
        {busy
          ? "Sending…"
          : sent
            ? "Enquiry received"
            : "Request a conversation ↗"}
      </button>
      <p className="muted">
        WhatsApp number and business contact details: Not yet verified. Owner
        confirmation required before publishing a contact link.
      </p>
      <p role="status" className={status ? "form-status" : ""}>
        {status}
      </p>
      <p className="muted">
        No confirmed booking, payment or marketing subscription is created by
        this form.
      </p>
    </form>
  );
}
