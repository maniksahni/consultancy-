"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";

export type ResolvedStoryPath = {
  id: string; situation: string; worry: string;
  story: { name: string; initials: string; location: string; badge: string; topic: string; takeaway: string; start: string; detail: string; outcome: string };
  chapters: { path: string; label: string; summary: string }[];
};

/** "Which story sounds like you?" — pick a situation, see the student who was there and the chapters that helped. */
export default function StoryPathFinder({ paths }: { paths: ResolvedStoryPath[] }) {
  const [active, setActive] = useState(paths[0].id);
  const p = paths.find((x) => x.id === active) || paths[0];
  const first = p.story.name.split(" ")[0];
  const whatsapp = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(`Hello Harshita, I read ${first}'s story on the Althéa website. ${p.situation} — can we plan my next steps?`)}`;

  return <div className="ms-pathfinder">
    <div className="ms-pathfinder-choices" role="tablist" aria-label="Your situation">
      {paths.map((x) => <button key={x.id} type="button" role="tab" id={`path-tab-${x.id}`} aria-selected={x.id === active} aria-controls="path-panel" onClick={() => setActive(x.id)}>
        <span>{x.situation}</span>
      </button>)}
    </div>

    <div className="ms-pathfinder-panel" role="tabpanel" id="path-panel" aria-labelledby={`path-tab-${p.id}`} key={p.id}>
      <div className="ms-pathfinder-story">
        <p className="ms-pathfinder-worry">“{p.worry}”</p>
        <p className="ms-pathfinder-lead">{first} asked the same question.</p>
        <div className="ms-pathfinder-who">
          <span className="ms-monogram" aria-hidden="true">{p.story.initials}</span>
          <div><strong>{p.story.name} · {p.story.location}</strong><small>{p.story.badge} · {p.story.topic}</small></div>
        </div>
        <dl className="ms-pathfinder-facts">
          <div><dt>Where it started</dt><dd>{p.story.start}</dd></div>
          <div><dt>What made the difference</dt><dd>{p.story.takeaway}</dd></div>
          <div><dt>Result</dt><dd><BadgeCheck size={15} aria-hidden="true" />{p.story.outcome}</dd></div>
        </dl>
      </div>

      <div className="ms-pathfinder-steps">
        <p className="ms-kicker">YOUR NEXT THREE READS</p>
        <ol>{p.chapters.map((c) => <li key={c.path}><Link href={c.path}><strong>{c.label}</strong><span>{c.summary}</span><ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}</ol>
        <div className="ms-pathfinder-cta">
          <a className="ms-btn ms-btn-gold" href={whatsapp} target="_blank" rel="noopener noreferrer"><span>Plan a path like {first}’s</span><MessageCircle size={16} aria-hidden="true" /></a>
          <Link className="ms-link" href="/book-consultation">Book a consultation</Link>
        </div>
      </div>
    </div>
  </div>;
}
