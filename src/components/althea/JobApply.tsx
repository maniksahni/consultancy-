"use client";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { brand } from "@/config/brand";
import { waLink, waMessages } from "@/config/contact";
import { sanitizeEnquiryValue } from "@/lib/consultation";
import { sendJobApplication } from "@/lib/booking";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import type { LiveJob } from "./JobDrawer";

const first = brand.person.split(" ")[0];

/** "Apply with Althéa": a short form saved for Harshita (admin → Enquiries), then one tap to send it on WhatsApp. */
export default function JobApply({ job, onClose }: { job: LiveJob | null; onClose: () => void }) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (job && !dialog.open) { setDone(null); setError(""); dialog.showModal(); }
    if (!job && dialog.open) dialog.close();
  }, [job]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !job) return;
    const data = new FormData(event.currentTarget);
    const value = (key: string, max = 120) => sanitizeEnquiryValue(data.get(key), max);
    const details = {
      name: value("name", 80), email: value("email").replace(/\s/g, ""), phone: value("phone", 32), status: value("status", 80),
      cv: value("cv", 300), message: value("message", 600),
      jobTitle: job.title.slice(0, 160), company: job.company.slice(0, 120), jobUrl: job.url, location: job.location.slice(0, 120),
    };
    if (!details.name || !details.phone) { setError("Please add your name and WhatsApp number."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(details.email)) { setError("Enter a valid email, like name@gmail.com."); return; }
    if (details.cv && !/^https?:\/\//i.test(details.cv)) { setError("Paste the full CV link, starting with https:// (Google Drive, LinkedIn…)."); return; }
    if (!data.get("consent")) { setError(`Please agree that ${first} can contact you about this role.`); return; }
    setError(""); setBusy(true);
    try {
      const result = await sendJobApplication(details, String(data.get("website") ?? ""));
      if (result.ok) setDone(details.name.split(" ")[0]);
      else setError(result.error);
    } catch {
      setError("We couldn't send this just now. Use the WhatsApp button below instead.");
    } finally { setBusy(false); }
  }

  const wa = job ? waLink(waMessages.job(job.title, job.company, job.url)) : "#";
  return <dialog ref={ref} className="ms-apply" aria-labelledby={`${id}-title`} onClose={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    {job && <div className="ms-apply-panel">
      <header>
        <div>
          <p className="ms-kicker">APPLY WITH ALTHÉA</p>
          <h2 id={`${id}-title`}>{job.title}</h2>
          <p className="ms-apply-meta">{job.company} · {job.location}</p>
        </div>
        <button type="button" className="ms-apply-close" onClick={onClose} aria-label="Close"><X size={20} aria-hidden="true" /></button>
      </header>
      {done ? <div className="ms-apply-done" role="status" aria-live="polite">
        <CheckCircle2 size={30} aria-hidden="true" />
        <p className="ms-form-title">Merci, {done}! {first} has your application.</p>
        <p className="ms-muted">She’ll look at your profile for this role and reply on WhatsApp or email. Want a faster answer? Send it on WhatsApp now.</p>
        <a className="ms-btn ms-btn-wa" href={wa} target="_blank" rel="noopener noreferrer" data-wa><span>Send on WhatsApp</span><WhatsAppIcon size={18} /></a>
      </div> : <form className="ms-form ms-apply-form" onSubmit={submit} onChange={() => setError("")} noValidate>
        <p className="ms-muted">{first} checks your profile against this role, helps you tailor your CV in French style and tells you honestly whether to apply. Free for this first look.</p>
        <div className="ms-apply-grid">
          <label className="ms-field" htmlFor={`${id}-name`}><span>Your name *</span><input id={`${id}-name`} name="name" required maxLength={80} autoComplete="name" /></label>
          <label className="ms-field" htmlFor={`${id}-phone`}><span>WhatsApp number *</span><input id={`${id}-phone`} name="phone" type="tel" required maxLength={32} autoComplete="tel" placeholder="+33 6 12 34 56 78" /></label>
          <label className="ms-field" htmlFor={`${id}-email`}><span>Email *</span><input id={`${id}-email`} name="email" type="email" required maxLength={120} autoComplete="email" /></label>
          <label className="ms-field" htmlFor={`${id}-status`}><span>You are…</span><select id={`${id}-status`} name="status" defaultValue=""><option value="">Choose one</option><option>Student in France</option><option>Graduate in France (APS / job-search permit)</option><option>Working in France</option><option>In India, planning to come</option><option>Other</option></select></label>
        </div>
        <label className="ms-field" htmlFor={`${id}-cv`}><span>Link to your CV <em>(Google Drive, Dropbox or LinkedIn)</em></span><input id={`${id}-cv`} name="cv" type="url" maxLength={300} placeholder="https://drive.google.com/…" /></label>
        <label className="ms-field" htmlFor={`${id}-message`}><span>Anything she should know?</span><textarea id={`${id}-message`} name="message" maxLength={600} rows={3} placeholder="Your degree, French level, when you can start…" /></label>
        <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="french-consent"><input type="checkbox" name="consent" required /> <span>{first} can contact me about this role. <Link href="/privacy">Privacy policy</Link>.</span></label>
        <div className="ms-apply-actions">
          <button className="ms-btn ms-btn-gold" type="submit" disabled={busy}>{busy ? <><Loader2 size={17} className="bk-spin" aria-hidden="true" /><span>Sending…</span></> : <span>Send my application</span>}</button>
          <a className="ms-link" href={wa} target="_blank" rel="noopener noreferrer" data-wa>or just WhatsApp {first}</a>
        </div>
        <div role="status" aria-live="polite">{error && <p className="ms-field-error">{error}</p>}</div>
      </form>}
    </div>}
  </dialog>;
}
