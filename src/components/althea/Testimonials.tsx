"use client";
import { useState } from "react";
import Link from "@/components/althea/EditorialLink";
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
          <p className="eyebrow">LES VOIX DU VOYAGE</p>
          <h2 id="voices-heading">
            Behind every journey,
            <br />
            <em>there’s a story.</em>
          </h2>
          <p>
            Personal guidance is about how you feel along the way: heard,
            understood, and ready for your next step.
          </p>
          <div className="voices-disclosure">
            <span className="demo-dot" /> SAMPLE REVIEW COLLECTION
            <p>
              These illustrative examples show the review format. They are not
              published client testimonials or reported outcomes.
            </p>
          </div>
          {!full && (
            <Link className="text-link" href="/reviews">
              Explore the review collection <span>↗</span>
            </Link>
          )}
        </div>
        <div className="voice-stage">
          <div className="voice-card" key={review.id}>
            <div className="voice-card-top">
              <span className="sample-badge">Sample review</span>
              <span className="voice-topic">{review.topic}</span>
            </div>
            <Quote
              className="voice-quote-icon"
              size={38}
              strokeWidth={1}
              aria-hidden="true"
            />
            <blockquote>{review.quote}</blockquote>
            <div className="voice-attribution">
              <span className="voice-monogram" aria-hidden="true">
                A.
              </span>
              <div>
                <strong>Illustrative student perspective</strong>
                <span>{review.detail}</span>
              </div>
            </div>
          </div>
          <div className="voice-controls">
            <p role="status" aria-live="polite">
              Example {String(active + 1).padStart(2, "0")}{" "}
              <span>/ {String(sampleReviews.length).padStart(2, "0")}</span>
            </p>
            <div className="voice-progress" aria-label="Choose a sample review">
              {sampleReviews.map((r, i) => (
                <button
                  key={r.id}
                  aria-label={`Show sample review ${i + 1}`}
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
                aria-label="Previous sample review"
              >
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => move(1)} aria-label="Next sample review">
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
                0{i + 1} / {r.topic}
              </span>
              <h3>{r.takeaway}</h3>
              <p>Sample review · Illustrative content</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
