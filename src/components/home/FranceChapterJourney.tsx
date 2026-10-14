"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Compass, GraduationCap, MapPin } from "lucide-react";

const chapters = [
  {
    id: "study",
    number: "01",
    verb: "LEARN",
    label: "Study in France",
    note: "For the next step in your education",
    title: <>Make room for<br /><em>what comes next.</em></>,
    body: "Compare the possibilities, understand the application landscape and shape a plan around the future you want to build.",
    image: "/images/editorial/sainte-genevieve.webp",
    alt: "The reading room of the Bibliothèque Sainte-Geneviève in Paris",
    caption: "A QUIETER PLACE TO FIND YOUR DIRECTION",
    href: "/study-in-france",
    action: "Explore study guidance",
    Icon: GraduationCap,
  },
  {
    id: "settle",
    number: "02",
    verb: "ARRIVE",
    label: "Settle in France",
    note: "For finding your feet in a new place",
    title: <>Let the new place<br /><em>become yours.</em></>,
    body: "From the first practical questions to the rhythm of everyday life, feel more prepared for the transition ahead.",
    image: "/images/editorial/france-bordeaux.webp",
    alt: "The historic Place de la Bourse in Bordeaux reflected in the Miroir d'eau",
    caption: "A THOUSAND SMALL DETAILS MAKE A HOME",
    href: "/settle-in-france",
    action: "Explore arrival guidance",
    Icon: MapPin,
  },
  {
    id: "career",
    number: "03",
    verb: "GROW",
    label: "Build your career",
    note: "For the work you want to do next",
    title: <>Bring your next<br /><em>move into focus.</em></>,
    body: "Tell your professional story with confidence and make a more considered plan for the opportunities ahead.",
    image: "/images/editorial/notre-dame.webp",
    alt: "The west façade of Notre-Dame de Paris, seen from the historic Île de la Cité",
    caption: "A NEW CITY. A DIFFERENT WAY OF SEEING THINGS.",
    href: "/career-support",
    action: "Explore career guidance",
    Icon: Compass,
  },
];

export default function FranceChapterJourney() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex];
  const ActiveIcon = active.Icon;

  function moveTo(index: number) {
    const next = (index + chapters.length) % chapters.length;
    setActiveId(chapters[next].id);
    document.getElementById(`home-chapter-${chapters[next].id}`)?.focus();
  }

  return (
    <section className="home-pathways home-chapter-studio" id="pathways" aria-labelledby="pathways-title">
      <div className="home-wrap">
        <div className="home-section-head home-chapter-heading">
          <div>
            <p className="home-eyebrow">02 &nbsp; YOUR FRANCE, YOUR WAY</p>
            <h2 id="pathways-title">Where will your<br /><em>story lead?</em></h2>
          </div>
          <div className="home-chapter-intro">
            <p>There is more than one way to begin. Choose the chapter that feels closest, and explore a next step at your own pace.</p>
            <span><i aria-hidden="true" /> INDEPENDENT GUIDANCE · PARIS</span>
          </div>
        </div>

        <div className="home-chapter-tabs" role="tablist" aria-label="Choose where to begin your France journey">
          <svg className="home-chapter-route" viewBox="0 0 1000 94" preserveAspectRatio="none" aria-hidden="true">
            <path d="M82 42 C207 42 222 70 333 56 S450 19 502 41 596 69 691 46 810 20 918 42" />
          </svg>
          {chapters.map((chapter, index) => {
            const Icon = chapter.Icon;
            const selected = active.id === chapter.id;
            return <button
              key={chapter.id}
              id={`home-chapter-${chapter.id}`}
              className={selected ? "home-chapter-tab is-active" : "home-chapter-tab"}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="home-chapter-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(chapter.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); moveTo(index + 1); }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); moveTo(index - 1); }
                if (event.key === "Home") { event.preventDefault(); moveTo(0); }
                if (event.key === "End") { event.preventDefault(); moveTo(chapters.length - 1); }
              }}
            >
              <span className="home-chapter-dot"><Icon size={15} strokeWidth={1.5} /></span>
              <span className="home-chapter-word"><small>{chapter.number} / CHAPTER</small><strong>{chapter.verb}</strong><em>{chapter.label}</em></span>
            </button>;
          })}
          <span className="home-chapter-current" aria-live="polite">{active.number} <i>/</i> 03</span>
        </div>

        <div className="home-chapter-feature" id="home-chapter-panel" role="tabpanel" aria-labelledby={`home-chapter-${active.id}`}>
          <div className="home-chapter-visual">
            <Image key={active.image} src={active.image} alt={active.alt} fill sizes="(max-width: 760px) 100vw, 58vw" className="home-chapter-photo" />
            <div className="home-chapter-image-shade" />
            <div className="home-chapter-image-top"><span>ALTHÉA <i>·</i> FIELD NOTES</span><span>{active.number} / 03</span></div>
            <div className="home-chapter-image-bottom"><p>{active.caption}</p><span>FRANCE <i>—</i> A JOURNEY OF YOUR OWN</span></div>
            <span className="home-chapter-giant" aria-hidden="true">{active.number}</span>
          </div>
          <div className="home-chapter-copy">
            <p className="home-eyebrow"><ActiveIcon size={14} /> {active.note}</p>
            <h3 key={active.id}>{active.title}</h3>
            <p className="home-chapter-body" key={`${active.id}-body`}>{active.body}</p>
            <Link className="home-chapter-link" href={active.href}>{active.action}<ArrowUpRight size={17} /></Link>
            <div className="home-chapter-foot"><span>YOUR CHAPTER, IN YOUR OWN WORDS.</span><span>0{activeIndex + 1} <i>—</i> 03</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
