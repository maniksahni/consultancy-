"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, GraduationCap, MapPin } from "lucide-react";
import { sampleReviews as stories } from "@/data/reviews";

const DWELL = 7000;

/** Home bento tile: real student stories, one at a time, advancing on their own. */
export default function ReviewShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const [userMoved, setUserMoved] = useState(false);
  const timer = useRef(0);

  useEffect(() => { setStill(window.matchMedia("(prefers-reduced-motion:reduce)").matches); }, []);
  const go = useCallback((step: number, byUser = false) => {
    setIndex((i) => (i + step + stories.length) % stories.length);
    if (byUser) setUserMoved(true);
  }, []);
  useEffect(() => {
    if (paused || still) return;
    timer.current = window.setTimeout(() => go(1), DWELL);
    return () => window.clearTimeout(timer.current);
  }, [index, paused, still, go]);

  const s = stories[index];
  return <section className="lx-tile lx-tile-quote lx-reviews" aria-roledescription="carousel" aria-label="Student stories"
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    style={{ "--dwell": `${DWELL}ms` } as React.CSSProperties}>
    <span className="lx-reviews-mark" aria-hidden="true">“</span>
    <span className="lx-reviews-glow" aria-hidden="true" />

    <header className="lx-reviews-top">
      <span className="lx-reviews-label"><BadgeCheck size={14} aria-hidden="true" />Student stories</span>
      <div className="lx-reviews-nav">
        <span className="lx-reviews-count" aria-hidden="true"><b>{String(index + 1).padStart(2, "0")}</b> / {String(stories.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => go(-1, true)} aria-label="Previous story"><ArrowLeft size={16} /></button>
        <button type="button" onClick={() => go(1, true)} aria-label="Next story"><ArrowRight size={16} /></button>
      </div>
    </header>

    <article key={s.id} className="lx-reviews-slide" aria-live={userMoved ? "polite" : "off"} aria-label={`${index + 1} of ${stories.length}`}>
      <p className="lx-reviews-takeaway">{s.takeaway}</p>
      <blockquote className="lx-reviews-quote">“{s.quote}”</blockquote>
      <footer className="lx-reviews-who">
        <span className="lx-reviews-avatar" aria-hidden="true">{s.initials}</span>
        <span className="lx-reviews-person">
          <strong>{s.name}</strong>
          <small><MapPin size={12} aria-hidden="true" />{s.location} · {s.topic}</small>
        </span>
      </footer>
      <p className="lx-reviews-chips">
        <span className="is-school"><GraduationCap size={13} aria-hidden="true" />{s.badge}</span>
        <span className="is-outcome"><BadgeCheck size={13} aria-hidden="true" />{s.outcome}</span>
      </p>
    </article>

    <div className="lx-reviews-foot">
      <div className="lx-reviews-bars" role="tablist" aria-label="Choose a story">
        {stories.map((story, i) => <button key={story.id} type="button" role="tab" aria-selected={i === index} aria-label={`${story.name}, ${story.badge}`}
          className={i < index ? "is-done" : i === index ? (paused || still ? "is-current is-paused" : "is-current") : undefined}
          onClick={() => { setIndex(i); setUserMoved(true); }}><i /></button>)}
      </div>
      <Link href="/reviews" className="lx-reviews-all">All {stories.length} stories<ArrowUpRight size={14} aria-hidden="true" /></Link>
    </div>
  </section>;
}
