"use client";
import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { brand } from "@/config/brand";
import { sanitizeEnquiryValue } from "@/lib/consultation";
import { sendEnquiry } from "@/lib/booking";

/** "Learn French" request: Book saves the details straight to the admin panel; no call is scheduled. */
export default function FrenchEnquiry() {
  const id = useId();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ name: string; email: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string, max = 120) => sanitizeEnquiryValue(data.get(key), max);
    const details = { name: value("name", 80), email: value("email").replace(/\s/g, ""), phone: value("phone", 32), level: value("level", 40), goal: value("goal", 60), availability: value("availability"), message: value("message", 600) };
    if (!details.name || !details.phone || !details.level || !details.goal || !details.message) { setError("Please fill in your name, phone, level, goal and enquiry."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(details.email)) { setError("Enter a valid email, like name@gmail.com."); return; }
    if (!data.get("consent")) { setError("Please agree to be contacted about your request."); return; }
    setError(""); setBusy(true);
    try {
      const result = await sendEnquiry(details, String(data.get("website") ?? ""));
      if (result.ok) setDone({ name: details.name.split(" ")[0], email: details.email });
      else setError(result.error);
    } catch {
      setError(`We couldn't send your request just now. Please try again, or email ${brand.email}.`);
    } finally { setBusy(false); }
  }
  if (done) return <div className="ms-form french-form french-done" role="status" aria-live="polite">
    <CheckCircle2 size={28} aria-hidden="true" />
    <p className="ms-form-title">Merci, {done.name}! You will be contacted soon.</p>
    <p className="ms-muted">Your request is with {brand.person}. She will reach you at <strong>{done.email}</strong> to discuss options, timings and any fees before you commit.</p>
  </div>;
  return <form className="ms-form french-form" onSubmit={submit} onChange={() => setError("")} noValidate>
    <div className="french-form-grid">
      <label className="ms-field" htmlFor={`${id}-name`}><span>Your name *</span><input id={`${id}-name`} name="name" required maxLength={80} autoComplete="name" /></label>
      <label className="ms-field" htmlFor={`${id}-email`}><span>Email *</span><input id={`${id}-email`} name="email" required type="email" maxLength={120} autoComplete="email" /></label>
      <label className="ms-field" htmlFor={`${id}-phone`}><span>Phone / WhatsApp *</span><input id={`${id}-phone`} name="phone" type="tel" required maxLength={32} autoComplete="tel" placeholder="+91 98765 43210" /></label>
      <label className="ms-field" htmlFor={`${id}-level`}><span>Your French level *</span><select id={`${id}-level`} name="level" required defaultValue=""><option value="" disabled>Select your level</option><option>Complete beginner</option><option>A1 / A2 — elementary</option><option>B1 / B2 — intermediate</option><option>C1 / C2 — advanced</option><option>Not sure</option></select></label>
      <label className="ms-field" htmlFor={`${id}-goal`}><span>Your goal *</span><select id={`${id}-goal`} name="goal" required defaultValue=""><option value="" disabled>What would you like to work towards?</option><option>Everyday conversations</option><option>Study in France</option><option>Work and interviews</option><option>Exam preparation</option><option>Other / not sure yet</option></select></label>
      <label className="ms-field" htmlFor={`${id}-availability`}><span>Preferred start / availability</span><input id={`${id}-availability`} name="availability" maxLength={120} placeholder="For example: November, weekday evenings" /></label>
    </div>
    <label className="ms-field" htmlFor={`${id}-message`}><span>Your enquiry *</span><textarea id={`${id}-message`} name="message" required maxLength={600} rows={4} placeholder="Tell us what you want to learn and any questions you have." /></label>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="french-consent"><input type="checkbox" name="consent" required /> <span>I agree to be contacted about my French-learning request. <Link href="/privacy">Privacy policy</Link>.</span></label>
    <button className="ms-btn ms-btn-gold" type="submit" disabled={busy}>{busy ? <><Loader2 size={17} className="bk-spin" aria-hidden="true" /><span>Booking…</span></> : <span>Book</span>}</button>
    <div role="status" aria-live="polite">{error && <p className="ms-field-error">{error}</p>}</div>
  </form>;
}
