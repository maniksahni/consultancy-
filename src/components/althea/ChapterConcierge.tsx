"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
const chapters = [
  {
    label: "Just exploring",
    number: "01",
    title: "A little curiosity. A world to explore.",
    text: "You don’t need all the answers to start. Begin with the things that matter to you.",
    steps: [
      "Bring your subject interests and academic background",
      "Think about your preferred cities and budget",
      "Explore teaching languages and course requirements",
    ],
    href: "/destinations",
    action: "Find your destination",
    note: "YOUR FIRST POSSIBILITY",
  },
  {
    label: "Ready to apply",
    number: "02",
    title: "Turn your shortlist into a considered plan.",
    text: "Give every decision a reason, and every application a clear next step.",
    steps: [
      "Verify eligibility on the official programme page",
      "Map application routes and current deadlines",
      "Prepare your CV, written materials and documents",
    ],
    href: "/services",
    action: "Explore application support",
    note: "YOUR NEXT DECISION",
  },
  {
    label: "Planning my arrival",
    number: "03",
    title: "An offer is a beginning. Plan the life ahead.",
    text: "From paperwork to your first neighbourhood, make room for the practical details.",
    steps: [
      "Confirm the official visa procedure for your destination",
      "Research housing, deposits and your arrival budget",
      "Create a personal checklist before travelling",
    ],
    href: "/knowledge",
    action: "Read the practical guides",
    note: "YOUR NEW CHAPTER",
  },
];
export default function ChapterConcierge() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  return (
    <section
      className="chapter-concierge wrap"
      aria-labelledby="chapter-heading"
    >
      <div className="chapter-heading">
        <div>
          <p className="eyebrow">A LITTLE GUIDANCE, RIGHT WHERE YOU ARE</p>
          <h2 id="chapter-heading">
            Every beginning
            <br />
            <em>looks a little different.</em>
          </h2>
        </div>
        <p>
          Choose where you are in the journey.
          <br />
          We’ll help you find a useful next step.
        </p>
      </div>
      <div className="chapter-tabs" aria-label="Your stage of study planning">
        {chapters.map((c, i) => (
          <button
            key={c.label}
            aria-pressed={active === i}
            aria-controls="chapter-panel"
            onClick={() => setActive(i)}
          >
            <span>{c.number}</span>
            {c.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="chapter-panel" id="chapter-panel">
        <div className="chapter-passport" aria-hidden="true">
          <span>
            ALTHÉA
            <br />
            CONSULTING
          </span>
          <span className="passport-flower">✳</span>
          <span className="passport-title">
            The world
            <br />
            is yours.
          </span>
          <span className="passport-bottom">LE PASSEPORT DES POSSIBILITÉS</span>
        </div>
        <div className="chapter-details" key={chapter.number}>
          <p className="eyebrow">{chapter.note}</p>
          <h3>{chapter.title}</h3>
          <p>{chapter.text}</p>
          <ul>
            {chapter.steps.map((s) => (
              <li key={s}>
                <Check size={15} aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <Link className="text-link" href={chapter.href}>
            {chapter.action}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
