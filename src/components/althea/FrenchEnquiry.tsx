"use client";
import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { sanitizeEnquiryValue } from "@/lib/consultation";

export default function FrenchEnquiry() {
  const id = useId();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) return;
    const value = (key: string, max = 120) => sanitizeEnquiryValue(data.get(key), max);
    if (!value("name") || !value("message", 600)) { setError("Please enter your name and enquiry."); return; }
    setError("");
    const body = `Hello Althéa, I would like to learn French.\n\nName: ${value("name", 80)}\nEmail: ${value("email")}\nPhone: ${value("phone", 32)}\nCurrent level: ${value("level")}\nGoal: ${value("goal")}\nPreferred start / availability: ${value("availability")}\n\nMy enquiry: ${value("message", 600)}`;
    setDraft(`mailto:${brand.email}?subject=${encodeURIComponent("Learn French enquiry")}&body=${encodeURIComponent(body)}`);
  }
  return <form className="ms-form french-form" onSubmit={submit} onChange={() => { setDraft(""); setError(""); }}>
    <div className="french-form-grid">
      <label className="ms-field" htmlFor={`${id}-name`}><span>Your name *</span><input id={`${id}-name`} name="name" required maxLength={80} autoComplete="name" pattern=".*\S.*" /></label>
      <label className="ms-field" htmlFor={`${id}-email`}><span>Email *</span><input id={`${id}-email`} name="email" required type="email" maxLength={120} autoComplete="email" /></label>
      <label className="ms-field" htmlFor={`${id}-phone`}><span>Phone / WhatsApp (optional)</span><input id={`${id}-phone`} name="phone" type="tel" maxLength={32} autoComplete="tel" /></label>
      <label className="ms-field" htmlFor={`${id}-level`}><span>Your French level *</span><select id={`${id}-level`} name="level" required defaultValue=""><option value="" disabled>Select your level</option><option>Complete beginner</option><option>A1 / A2 — elementary</option><option>B1 / B2 — intermediate</option><option>C1 / C2 — advanced</option><option>Not sure</option></select></label>
      <label className="ms-field" htmlFor={`${id}-goal`}><span>Your goal *</span><select id={`${id}-goal`} name="goal" required defaultValue=""><option value="" disabled>What would you like to work towards?</option><option>Everyday conversations</option><option>Study in France</option><option>Work and interviews</option><option>Exam preparation</option><option>Other / not sure yet</option></select></label>
      <label className="ms-field" htmlFor={`${id}-availability`}><span>Preferred start / availability</span><input id={`${id}-availability`} name="availability" maxLength={120} placeholder="For example: November, weekday evenings" /></label>
    </div>
    <label className="ms-field" htmlFor={`${id}-message`}><span>Your enquiry *</span><textarea id={`${id}-message`} name="message" required maxLength={600} rows={4} placeholder="Tell us what you want to learn and any questions you have." /></label>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="french-consent"><input type="checkbox" name="consent" required /> <span>I agree to be contacted about my French-learning enquiry. <Link href="/privacy">Privacy policy</Link>.</span></label>
    <p className="ms-muted">This prepares an email to {brand.email}. Review it in your email app and press Send to submit your enquiry.</p>
    <button className="ms-btn ms-btn-gold" type="submit">Prepare my enquiry</button>
    <div role="status" aria-live="polite">{error && <p className="ms-field-error">{error}</p>}{draft && <div className="french-draft"><p>Your enquiry is ready. It has not been sent yet.</p><a className="ms-btn ms-btn-ghost" href={draft}>Open email to review &amp; send</a><p>No email app? Contact <a href={`mailto:${brand.email}`}>{brand.email}</a> directly.</p></div>}</div>
  </form>;
}
