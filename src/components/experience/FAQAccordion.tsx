"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Check, MessageCircle, Compass, Files, Wallet, Calendar } from "lucide-react";
import { faqItems } from "@/data/editorial";

const categories = ["All questions", ...Array.from(new Set(faqItems.map(item => item.category)))];
const guides = [
  { icon: Compass, title: "Find your direction", text: "Explore six destinations and build a shortlist around your goals.", href: "/#destinations", colour: "mint" },
  { icon: Files, title: "Map your next steps", text: "Understand the journey from profile review to visa preparation.", href: "/admissions-process", colour: "lavender" },
  { icon: Wallet, title: "Explore funding", text: "Discover scholarship opportunities and plan your study budget.", href: "/scholarships", colour: "peach" },
];

export default function FAQAccordion() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All questions");
  const filtered = faqItems.filter(item => (category === "All questions" || item.category === category) && `${item.question} ${item.answer} ${item.checklist.join(" ")}`.toLowerCase().includes(query.toLowerCase().trim()));

  return (
    <div className="faq-hub">
      <div className="faq-guides">{guides.map(guide => <Link className={`faq-guide ${guide.colour}`} href={guide.href} key={guide.title}><guide.icon size={25} /><ArrowUpRight className="guide-arrow" size={20} /><h2>{guide.title}</h2><p>{guide.text}</p><span>Explore guide →</span></Link>)}</div>
      <div className="faq-workspace">
        <aside className="faq-sidebar"><span className="faq-kicker">A LITTLE CLARITY GOES A LONG WAY</span><h2>Let’s untangle <br />your questions.</h2><p>From the first conversation to your next big move, find the details that help you plan.</p><div className="faq-help"><MessageCircle size={25} /><h3>Your situation is unique.</h3><p>Talk through your profile, budget, and goals with a dedicated mentor.</p><Link href="/#booking">Ask your mentor <ArrowUpRight size={17} /></Link></div><div className="faq-prep"><Calendar size={20} /><strong>Before your first call</strong><p>Have your grades, preferred intake, and a rough budget ready. We’ll take it from there.</p></div></aside>
        <div className="faq-results"><label className="faq-search"><Search size={20} aria-hidden="true" /><span className="sr-only">Search questions and answers</span><input type="search" placeholder="Search scholarships, documents, visas…" value={query} onChange={event => setQuery(event.target.value)} /></label>
          <div className="faq-filters" aria-label="Filter questions by topic">{categories.map(value => <button key={value} onClick={() => setCategory(value)} aria-pressed={category === value} className={category === value ? "selected" : ""}>{value}</button>)}</div>
          <p className="faq-result-count" role="status">{filtered.length} {filtered.length === 1 ? "question" : "questions"}{query ? ` matching “${query}”` : " to help you move forward"}</p>
          <div className="faq-question-list">{filtered.map(item => <details key={item.question} className="faq-question"><summary><span><small>{item.category}</small>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><div className="faq-answer"><p>{item.answer}</p><div className="faq-checklist"><strong>Your next steps</strong><ul>{item.checklist.map(step => <li key={step}><Check size={16} aria-hidden="true" /><span>{step}</span></li>)}</ul></div></div></details>)}</div>
          {filtered.length === 0 && <div className="faq-empty"><Search size={30} /><h3>No matching questions yet.</h3><p>Try a broader search or browse all topics.</p><button onClick={() => { setQuery(""); setCategory("All questions"); }}>Show all questions</button></div>}
        </div>
      </div>
    </div>
  );
}
