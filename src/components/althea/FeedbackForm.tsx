"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, Loader2 } from "lucide-react";
import { brand } from "@/config/brand";
import { bookingMode, sendFeedback } from "@/lib/booking";

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

/** The page behind the "How was your call?" email: a 1–5 rating (pre-selected from the email) and a comment. */
export default function FeedbackForm() {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [thanked, setThanked] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setId(p.get("id") ?? ""); setToken(p.get("t") ?? "");
    const r = Number(p.get("r")); if (r >= 1 && r <= 5) setRating(r);
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!rating) { setStatus("Choose a rating from 1 to 5."); return; }
    if (!(id && token) && bookingMode() !== "preview") { setStatus("This feedback link is incomplete. Please use the link from your email."); return; }
    setBusy(true); setStatus("");
    try {
      const result = await sendFeedback(id, token, rating, comment);
      if (result.ok) setThanked(result.firstName ?? ""); else setStatus(result.error ?? "Couldn't send your feedback.");
    } catch { setStatus("Couldn't send your feedback. Please try again."); }
    finally { setBusy(false); }
  }

  if (thanked !== null) return (
    <div className="ms-form fb" role="status">
      <span className="bk-done-badge"><Heart size={24} aria-hidden="true" /></span>
      <p className="ms-form-title">Merci{thanked ? `, ${thanked}` : ""}. Your feedback reached {brand.person}.</p>
      <p className="ms-form-note">If you would like Althéa’s help with your applications, visa or move, we’re one message away.</p>
      <div className="bk-actions">
        <a className="ms-btn ms-btn-gold" href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer"><span>Message on WhatsApp</span><ArrowUpRight size={17} aria-hidden="true" /></a>
        <Link className="ms-btn ms-btn-ghost" href="/study-in-france"><span>Read the France guide</span></Link>
      </div>
    </div>
  );

  return (
    <form className="ms-form fb" onSubmit={submit} noValidate>
      {bookingMode() === "preview" && <p className="bk-preview">Preview: nothing is sent.</p>}
      <p className="ms-form-title">How was your call with {brand.person}?</p>
      <div>
        <div className="fb-stars" role="radiogroup" aria-label="Rating from 1 to 5">
          {[1, 2, 3, 4, 5].map(n => <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} – ${LABELS[n]}`} onClick={() => setRating(n)}>{n}</button>)}
        </div>
        <p className="fb-scale" aria-live="polite">{rating ? <>You chose <strong>{rating} · {LABELS[rating]}</strong></> : "1 is poor, 5 is excellent."}</p>
      </div>
      <label className="ms-field"><span>Tell us about your meeting (optional)</span>
        <textarea rows={4} maxLength={1000} value={comment} onChange={e => setComment(e.target.value)} placeholder="What was most useful? What could be better?" />
      </label>
      <button className="ms-btn ms-btn-gold ms-form-submit" type="submit" disabled={busy}>{busy ? <Loader2 size={17} className="bk-spin" aria-hidden="true" /> : null}<span>Send feedback</span></button>
      <p role="status" className={status ? "ms-form-status" : "ms-form-status is-empty"}>{status}</p>
    </form>
  );
}
