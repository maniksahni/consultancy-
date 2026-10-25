import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Section } from "@/components/maison/ui";
import { countryGuides } from "@/data/guides";
import { indiaGuide } from "@/data/guides/india";
import { articles, cities } from "@/data/france";
import { programmeResearch } from "@/data/programmeResearch";
import { pageName } from "@/lib/trail";

type Item = { href: string; title: string; note?: string };
const page = (href: string, note?: string): Item => ({ href, title: pageName(href), note });

const intro = "Every page on Althéa, grouped by what you are trying to do: plan, apply, pay, fly, settle, work or come home. Open a group and go straight to the page you need.";
export const metadata = pageMetadata("/site-map", {
  title: "Site Map: Every Study Abroad Page",
  description: "Every page on the Althéa Consulting site in one place: country guides, From India chapters, France, jobs, tools, programmes, cities and the journal.",
});

const groups: { title: string; accent: string; items: Item[] }[] = [
  { title: "Start here:", accent: "plan your move.", items: [
    page("/from-india/timeline", "Month-by-month plan from 18 months out to arrival"),
    page("/destinations", "France today; six more countries coming soon"), page("/compare", "Countries side by side"),
    page("/knowledge", "Search every answer, plus the budget planner"), page("/faq", "Quick answers"),
    page("/admissions-process", "How applications work"), page("/book-consultation", "Talk to Harshita"),
  ] },
  { title: "Courses", accent: "and universities.", items: [
    page("/universities", "Search courses and institutions"), page("/programmes", "Researched programmes with fees and deadlines"),
    page("/france/universities", "Every French institution, A–Z"), page("/universities/australia", "Every Australian provider, A–Z"), page("/universities/uk", "Every UK provider, A–Z"), page("/universities/canada", "PGWP-eligible colleges by province"),
    ...programmeResearch.map((p) => ({ href: `/programmes/${p.slug}`, title: `${p.title}`, note: `${p.institution} · ${p.city}` })),
    page("/scholarships", "Funding you can apply for"),
  ] },
  ...countryGuides.map((g) => ({ title: `Study in ${g.prose}:`, accent: "the complete guide.", items: [
    { href: g.hubPath, title: `${g.name} overview` },
    ...g.chapters.map((c) => ({ href: c.path, title: c.label })),
  ] })),
  { title: "France,", accent: "beyond the guide.", items: [
    page("/campus-france-guide", "Études en France step by step"), page("/first-30-days-france", "Your first month, day by day"),
    page("/in-france", "Already in France: internships, jobs, papers"), page("/pr-in-france", "PR in France for Indian students"), page("/settle-in-france", "Housing, permit, bank, health"), page("/france/universities"), page("/france/programmes"), page("/france/institutions"), page("/france/resources"),
    ...cities.map((c) => ({ href: `/cities/${c.slug}`, title: `Study in ${c.name}` })),
  ] },
  { title: "From India:", accent: "every destination.", items: [{ href: "/from-india", title: "From India overview" }, ...indiaGuide.chapters.map((c) => ({ href: c.path, title: c.label }))] },
  { title: "Jobs", accent: "and careers.", items: [page("/jobs", "Live jobs and internships with French words for each job"), page("/career-support", "CV, interviews and internships")] },
  { title: "The journal.", accent: "Short reads.", items: [page("/insights"), ...articles.map((a) => ({ href: `/insights/${a.slug}`, title: a.title.replace(/\.$/, "") }))] },
  { title: "About", accent: "Althéa.", items: [page("/about"), page("/services"), page("/mentorship-model"), page("/reviews"), page("/outcomes"), page("/acknowledgements"), page("/privacy"), page("/terms")] },
];

export default function SiteMap() {
  return <Page path="/site-map" eyebrow="EVERY PAGE · ONE PLACE" title="Find any page" accent="in one place." intro={intro}>
    {groups.map((g, i) => <Section key={g.title} tone={i % 2 ? "paper" : "ivory"} title={g.title} accent={g.accent}>
      <ol className="ms-guide-index">{g.items.map((item, n) => <li key={item.href}><Link href={item.href}>
        <span className="ms-guide-index-num">{String(n + 1).padStart(2, "0")}</span>
        <span><strong>{item.title}</strong>{item.note && <small>{item.note}</small>}</span>
      </Link></li>)}</ol>
    </Section>)}
  </Page>;
}
