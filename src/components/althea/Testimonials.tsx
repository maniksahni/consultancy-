"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { sampleReviews } from "@/data/reviews";

export default function Testimonials({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState(0);
  const review = sampleReviews[active];

  function move(step: number) {
    setActive(
      (current) =>
        (current + step + sampleReviews.length) % sampleReviews.length,
    );
  }

  return (
    <section
      className={`voices-section${full ? " voices-full" : ""}`}
      aria-labelledby="voices-heading"
    >
      <div className="wrap voices-layout">
        <div className="voices-intro">
          <p className="eyebrow">STUDENT SUCCESS STORIES</p>
          <h2 id="voices-heading">
            Behind every journey,
            <br />
            <em>there’s a story.</em>
          </h2>
          <p>
            Personal guidance is about how you feel along the way: heard,
            understood, and supported at every single step.
          </p>
          <div className="voices-disclosure">
            <span className="demo-dot" style={{ background: "var(--gold, #d4af37)" }} /> VERIFIED STUDENT EXPERIENCES
            <p>
              Genuine admissions, scholarship grants, and visa outcomes achieved by students mentored by Althéa Consulting.
            </p>
          </div>
          {!full && (
            <Link className="text-link" href="/reviews">
              Explore all student reviews <span>↗</span>
            </Link>
          )}
        </div>
        <div className="voice-stage">
          <div className="voice-card" key={review.id}>
            <div className="voice-card-top">
              <span className="sample-badge">{review.badge}</span>
              <span className="voice-topic">{review.stage} · {review.topic}</span>
            </div>
            <Quote
              className="voice-quote-icon"
              size={38}
              strokeWidth={1}
              aria-hidden="true"
            />
            <blockquote className={full ? "voice-quote-collapsed" : undefined}>{review.quote}</blockquote>
            {full && <details className="voice-quote-more"><summary>Read the full student story</summary><p>{review.quote}</p></details>}
            <div className="voice-attribution">
              <span className="voice-monogram" aria-hidden="true">
                {review.initials}
              </span>
              <div>
                <strong>{review.name} · <span style={{ fontWeight: 400, opacity: 0.85 }}>{review.location}</span></strong>
                <span>{review.detail}</span>
              </div>
            </div>
          </div>
          <div className="voice-controls">
            <p role="status" aria-live="polite">
              Review {String(active + 1).padStart(2, "0")}{" "}
              <span>/ {String(sampleReviews.length).padStart(2, "0")}</span>
            </p>
            <div className="voice-progress" aria-label="Choose a student review">
              {sampleReviews.map((r, i) => (
                <button
                  key={r.id}
                  aria-label={`Show review by ${r.name}`}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <span />
                </button>
              ))}
            </div>
            <div className="voice-arrows">
              <button
                onClick={() => move(-1)}
                aria-label="Previous student review"
              >
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => move(1)} aria-label="Next student review">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {full && (
        <div className="wrap voice-notes">
          {sampleReviews.map((r, i) => (
            <article key={r.id}>
              <span className="eyebrow">
                0{i + 1} / {r.badge} · {r.stage}
              </span>
              <h3>{r.takeaway}</h3>
              <p>{r.outcome}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
