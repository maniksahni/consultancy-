"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sampleReviews } from "@/data/reviews";
import { Kicker, TextLink } from "@/components/maison/ui";

/** Student stories: a featured stage that turns on its own, plus the full collection. */
export default function Testimonials({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = sampleReviews[active];
  const move = (step: number) => setActive((current) => (current + step + sampleReviews.length) % sampleReviews.length);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % sampleReviews.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return <section className="ms-section ms-tone-ink ms-stories" aria-labelledby="voices-heading">
    <div className="ms-wrap">
      <div className="ms-stories-grid">
        <div className="ms-stories-intro">
          <Kicker>STUDENT SUCCESS STORIES</Kicker>
          <h2 id="voices-heading" className="ms-title">Behind every journey, <em>there’s a story.</em></h2>
          <p>Personal guidance is about how you feel along the way: heard, understood, and supported at every single step.</p>
          <p className="ms-stories-verified"><span aria-hidden="true" />Shared with each student’s permission.</p>
          {!full && <TextLink href="/reviews">Explore all student reviews</TextLink>}
        </div>
        <div className={`ms-stage${paused ? " is-paused" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <figure className="ms-stage-card" key={review.id}>
            <div className="ms-stage-top"><span className="ms-stage-badge">{review.badge}</span><span>{review.stage} · {review.topic}</span></div>
            <blockquote>{review.quote}</blockquote>
            <figcaption><span className="ms-monogram" aria-hidden="true">{review.initials}</span><div><strong>{review.name} · <span>{review.location}</span></strong><small>{review.detail}</small></div></figcaption>
          </figure>
          <div className="ms-stage-controls">
            <p role="status" aria-live="polite">Review {String(active + 1).padStart(2, "0")} <span>/ {String(sampleReviews.length).padStart(2, "0")}</span></p>
            <div className="ms-stage-dots" role="group" aria-label="Choose a student review">{sampleReviews.map((r, i) => <button type="button" key={r.id} aria-label={`Show review by ${r.name}`} aria-pressed={active === i} onClick={() => setActive(i)}><span key={active === i ? `on-${active}` : "off"} /></button>)}</div>
            <div className="ms-stage-arrows"><button type="button" onClick={() => move(-1)} aria-label="Previous student review"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} aria-label="Next student review"><ArrowRight size={18} /></button></div>
          </div>
        </div>
      </div>
      {full && <div className="ms-story-notes">{sampleReviews.map((r, i) => <article key={r.id} className="ms-card" data-spotlight>
        <div className="ms-card-top"><span className="ms-card-kicker">{r.badge} · {r.stage}</span><span className="ms-card-index">{String(i + 1).padStart(2, "0")}</span></div>
        <h3>{r.takeaway}</h3>
        <div className="ms-card-body"><p>{r.outcome}</p><p className="ms-story-who"><strong>{r.name}</strong> · {r.location} · {r.topic}</p></div>
      </article>)}</div>}
    </div>
  </section>;
}
