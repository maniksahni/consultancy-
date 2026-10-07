"use client";

import { useRef, useState, type TouchEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";

const chapters = [
  { title: "Start with your story.", tag: "01 / DISCOVERY", timing: "Weeks 1–2", image: "/images/destinations/uk.webp", caption: "A NEW PERSPECTIVE / LONDON", description: "Your ambitions, academic background, and budget shape the plan. Together, we identify what matters to you and where your profile can take you.", details: ["Academic profile review", "Goals and budget discussion", "A personal application roadmap"], outcome: "Your profile strategy" },
  { title: "Find where you belong.", tag: "02 / DIRECTION", timing: "Weeks 3–4", image: "/images/destinations/usa.webp", caption: "A WORLD OF POSSIBILITY / UNITED STATES", description: "Explore a considered mix of ambitious, target, and safer options. Your shortlist brings academic fit, cost, and career direction into one clear picture.", details: ["Course and university comparison", "Budget and location fit", "A balanced university shortlist"], outcome: "Your university shortlist" },
  { title: "Make your application count.", tag: "03 / APPLICATION", timing: "Weeks 5–8", image: "/images/destinations/germany.webp", caption: "YOUR NEXT CHAPTER / GERMANY", description: "Turn your experience into a thoughtful application. Work with your mentor on your statement, CV, references, and the details that make your story your own.", details: ["Personal statement feedback", "CV and reference preparation", "Application deadline planning"], outcome: "Your application portfolio" },
  { title: "Prepare for the next chapter.", tag: "04 / DEPARTURE", timing: "Pre-departure", image: "/images/destinations/australia.webp", caption: "NEW HORIZONS / SYDNEY", description: "Prepare your documents, practise your interview, and understand the steps ahead. Your mentor helps you approach the transition with clarity and confidence.", details: ["Visa document preparation", "One-to-one mock interviews", "Pre-departure guidance"], outcome: "Your departure checklist" },
];

export default function ScrollJourney() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const chapter = chapters[active];
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    setActive(index => (index + (deltaX < 0 ? 1 : chapters.length - 1)) % chapters.length);
  };
  return (
    <section id="process" className="journey-collection redesign-roadmap" aria-labelledby="journey-title">
      <motion.div className="journey-heading" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}><div><p className="luxury-eyebrow">03 / THE JOURNEY, CONSIDERED</p><h2 id="journey-title">A clear path.<br /><em>A bigger future.</em></h2></div><p>Every ambition begins somewhere.<br />We make each next step feel possible.</p></motion.div>
      <div className="journey-composition">
        <div className="journey-visual" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }} role="group" aria-roledescription="slide" aria-label={`${chapter.tag}: ${chapter.title}`}>
          <div className="redesign-journey-image"><AnimatePresence initial={false}>
            <motion.img key={chapter.image} src={chapter.image} alt="" loading="lazy" initial={reduceMotion ? false : { opacity: 0, scale: 1.07 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.03 }} transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }} />
          </AnimatePresence></div>
          <div className="journey-visual-shade" />
          <div className="journey-visual-top"><span>YOUR JOURNEY / STUDY WITH HARSHITA</span><span>0{active + 1} — 04</span></div>
          <div className="journey-visual-bottom"><span>{chapter.caption}</span><p>From possibility<br /><em>to a personal plan.</em></p><div className="journey-chapter-track" aria-label="Journey chapter progress">{chapters.map((item,index) => <button key={item.tag} type="button" className={index === active ? "active" : ""} aria-label={`Show chapter ${index + 1}: ${item.title}`} aria-current={index === active ? "step" : undefined} onClick={() => setActive(index)} />)}</div><span className="journey-swipe-hint">SWIPE TO EXPLORE THE JOURNEY</span></div>
        </div>
        <div className="journey-chapters">
          <p className="journey-instruction">EXPLORE YOUR FOUR CHAPTERS</p>
          {chapters.map((item,index) => <div className={`journey-chapter ${active === index ? "is-open" : ""}`} key={item.tag}>
            <motion.button whileHover={reduceMotion ? undefined : { x: 3 }} whileTap={reduceMotion ? undefined : { scale: 0.99 }} transition={{ duration: 0.2 }} type="button" id={`chapter-button-${index}`} aria-expanded={active === index} aria-controls={`chapter-panel-${index}`} onClick={() => setActive(index)}><span><small>{item.tag}</small><strong>{item.title}</strong></span>{active === index ? <Minus size={18} /> : <Plus size={18} />}</motion.button>
            <div id={`chapter-panel-${index}`} role="region" aria-labelledby={`chapter-button-${index}`} hidden={active !== index}>
              <motion.div key={`${index}-${active}`} className="journey-chapter-detail" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><span className="journey-timing">{item.timing}</span><p>{item.description}</p><ul>{item.details.map(detail => <li key={detail}><Check size={13} aria-hidden="true" />{detail}</li>)}</ul><div className="journey-takeaway"><span>WHAT YOU LEAVE WITH</span><strong>{item.outcome}</strong></div></motion.div>
            </div>
          </div>)}
          <Link href="/admissions-process" className="journey-roadmap">Explore the full admissions roadmap <ArrowUpRight size={18} /></Link>
        </div>
      </div>
      <div className="journey-bottom-note"><span>ONE MENTOR. EVERY CHAPTER.</span><p>Timelines vary with your profile, deadlines, and destination.</p></div>
    </section>
  );
}
