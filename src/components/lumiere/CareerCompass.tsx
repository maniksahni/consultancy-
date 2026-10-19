"use client";

import { useState, type KeyboardEvent, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import { careerRoles } from "@/data/careerRoles";
import { paris, type ParisSlug } from "@/lib/paris";

const directions: { id: string; label: string; word: string; line: string; subjects: string[]; photo: ParisSlug; roles: string[] }[] = [
  { id: "technology", label: "Data & technology", word: "Build.", line: "Turn curiosity into things that work.", subjects: ["Computer science", "Data science", "Cybersecurity"], photo: "la-defense-skyline", roles: ["software-developer", "data-analyst", "cybersecurity-analyst"] },
  { id: "business", label: "Business & finance", word: "Lead.", line: "Understand the numbers. Shape the decisions.", subjects: ["Finance", "Business analytics", "Supply chain"], photo: "la-defense-walk", roles: ["financial-analyst", "business-analyst", "supply-chain-analyst"] },
  { id: "engineering", label: "Engineering & research", word: "Solve.", line: "Give big questions a practical answer.", subjects: ["Mechanical engineering", "Civil engineering", "Research"], photo: "bnf-salle-ovale", roles: ["mechanical-engineer", "civil-engineer", "research-assistant"] },
  { id: "creative", label: "Design & marketing", word: "Create.", line: "Make something people connect with.", subjects: ["Interaction design", "Digital marketing", "Communication"], photo: "paris-bookshop", roles: ["ux-designer", "marketing-specialist"] },
];

export default function CareerCompass() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(directions[0].roles[0]);
  const direction = directions[active];
  const photo = paris(direction.photo);
  function choose(index: number) { setActive(index); setSelected(directions[index].roles[0]); }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % directions.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + directions.length) % directions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = directions.length - 1;
    else return;
    event.preventDefault(); choose(next); document.getElementById(`compass-tab-${next}`)?.focus();
  }
  return <section className="lx-section cc-section" id="career-compass" aria-labelledby="compass-heading" style={{ "--cc-accent": ["#f1b799", "#b9d4e4", "#c6b9ed", "#d5dbab"][active] } as CSSProperties}>
    <div className="lx-wrap">
      <header className="cc-heading">
        <div><p className="ms-kicker">THE CAREER COMPASS</p><h2 id="compass-heading">More than a degree.<br /><em>A direction.</em></h2></div>
        <div className="cc-heading-note"><span aria-hidden="true">↘</span><p>You’re choosing more than what to study.<br />Explore who you could become.</p></div>
      </header>
      <div className="cc-tabs" role="tablist" aria-label="Choose your field of interest">{directions.map((item, index) => <button id={`compass-tab-${index}`} key={item.id} type="button" role="tab" aria-label={item.label} aria-selected={index === active} aria-controls="compass-panel" tabIndex={index === active ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => navigate(event, index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ArrowUpRight size={17} aria-hidden="true" /></button>)}</div>
      <div className="cc-panel" id="compass-panel" role="tabpanel" aria-labelledby={`compass-tab-${active}`}>
        <div className="cc-scene" key={direction.id}>
          <Image src={photo.file} alt={photo.alt} fill sizes="(max-width:800px) 95vw, 50vw" />
          <div className="cc-scene-top"><span>FRANCE / YOUR NEXT CHAPTER</span><span>{String(active + 1).padStart(2, "0")} — 04</span></div>
          <div className="cc-orbit" aria-hidden="true"><svg viewBox="0 0 240 240"><circle cx="120" cy="120" r="114" /><circle cx="120" cy="120" r="85" /><path d="M120 0v240M0 120h240" /><path className="cc-needle" d="M120 35l15 85-15 85-15-85z" style={{ transform: `rotate(${active * 55 + 30}deg)` }} /><circle cx="120" cy="120" r="4" /></svg><span>FOLLOW YOUR CURIOSITY</span></div>
          <div className="cc-scene-copy"><p>{direction.word}</p><h3>{direction.line}</h3></div>
          <div className="cc-subjects"><span>IT COULD START WITH</span><div>{direction.subjects.map(subject => <Link key={subject} href={`/universities?country=france&view=courses&q=${encodeURIComponent(subject)}`}>{subject}<ArrowUpRight size={12} aria-hidden="true" /></Link>)}</div></div>
        </div>
        <div className="cc-careers">
          <div className="cc-careers-top"><span>WHERE IT COULD TAKE YOU</span><span>{String(direction.roles.length).padStart(2, "0")} POSSIBLE PATHS</span></div>
          <div className="cc-roles">{direction.roles.map((slug, index) => {
            const role = careerRoles.find(candidate => candidate.slug === slug)!;
            const open = selected === slug;
            return <article className={`cc-role${open ? " is-open" : ""}`} key={slug}>
              <h3><button id={`role-button-${slug}`} type="button" aria-expanded={open} aria-controls={`role-panel-${slug}`} onClick={() => setSelected(open ? "" : slug)}><span className="cc-role-number">0{index + 1}</span><span>{role.title}</span><span className="cc-role-toggle">{open ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}</span></button></h3>
              <div id={`role-panel-${slug}`} role="region" aria-labelledby={`role-button-${slug}`} hidden={!open} className="cc-role-detail">
                <p>{role.summary}</p>
                <div className="cc-skills"><span>SKILLS TO BUILD</span><ul>{role.skills.map(skill => <li key={skill}><ArrowUpRight size={13} aria-hidden="true" />{skill}</li>)}</ul></div>
                <Link className="cc-path-link" href={`/book-consultation?service=${encodeURIComponent(`career planning for ${role.title}`)}&destination=france`}>Talk about this path<ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </article>;
          })}</div>
          <div className="cc-careers-bottom"><span className="cc-small-orbit" aria-hidden="true">✳</span><p>Your interests are the starting point.<br />Your path doesn’t have to be a straight line.</p><Link href="/jobs" aria-label="Explore the career hub"><ArrowUpRight size={24} aria-hidden="true" /></Link></div>
        </div>
      </div>
      <footer className="cc-bottom"><p>Explore the possibilities. Requirements, experience and language needs vary by role.</p><Link href="/career-support">Build your next chapter with Althéa<ArrowUpRight size={15} aria-hidden="true" /></Link></footer>
    </div>
  </section>;
}
