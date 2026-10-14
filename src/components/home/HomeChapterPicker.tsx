"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Compass, GraduationCap, Home } from "lucide-react";

const choices = [
  { id: "study", label: "Study", Icon: GraduationCap, title: "A place to learn—and become.", copy: "Explore study guidance and browse course records across the destinations in our directory.", href: "/study-in-france", action: "Explore study guidance" },
  { id: "settle", label: "Make a home", Icon: Home, title: "Find your feet somewhere new.", copy: "Think through the practical questions of arriving and making everyday life in France feel more familiar.", href: "/settle-in-france", action: "Explore arrival guidance" },
  { id: "career", label: "Build a career", Icon: BriefcaseBusiness, title: "Bring the next move into focus.", copy: "Shape your professional story and consider the direction you want your work to take.", href: "/career-support", action: "Explore career support" },
  { id: "unsure", label: "Still exploring", Icon: Compass, title: "You can begin without the answer.", copy: "Bring the half-formed idea, the open question, or simply the feeling that something might be next.", href: "/book-consultation", action: "Start with a conversation" },
];

export default function HomeChapterPicker() {
  const [active, setActive] = useState(choices[0]);
  return <div className="rv-picker">
    <div className="rv-picker-options" role="group" aria-label="Choose what is on your mind">
      {choices.map(({ id, label, Icon, ...choice }) => <button className={active.id === id ? "rv-picker-choice is-active" : "rv-picker-choice"} key={id} type="button" aria-pressed={active.id === id} onClick={() => setActive({ id, label, Icon, ...choice })}><Icon size={16} strokeWidth={1.65} /><span>{label}</span></button>)}
    </div>
    <div className="rv-picker-result" aria-live="polite" key={active.id}>
      <span className="rv-picker-icon"><active.Icon size={18} strokeWidth={1.5} /></span>
      <div><h3>{active.title}</h3><p>{active.copy}</p><Link href={active.href}>{active.action} <ArrowUpRight size={15} /></Link></div>
    </div>
  </div>;
}
