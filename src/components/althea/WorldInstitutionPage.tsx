import Link from "next/link";
import type { ReactNode } from "react";
import Page from "@/components/althea/Page";
import Accordion from "@/components/maison/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { Checklist, Facts, Notice, Prose, Section, Steps } from "@/components/maison/ui";
import { absoluteUrl } from "@/lib/seo";
import { byLevel, type Course, type WorldInstitution } from "@/lib/worldInstitutions";

const PER_LEVEL = 25;

/** A search title of at most 39 characters (the brand suffix is appended), or the name alone when it must be longer. */
export function institutionTitle(name: string): string | { absolute: string } {
  for (const t of [`${name} for Indian Students`, `${name}: Courses & Fees`, `${name} Courses`, name]) if (t.length <= 39) return t;
  return { absolute: name.length <= 60 ? name : `${name.slice(0, 57).replace(/\s+\S*$/, "")}…` };
}
/** A description under 160 characters even after HTML escaping. */
export function institutionDescription(full: string, short: string) {
  const fit = (s: string) => s.length + (s.match(/['"&]/g) || []).length * 5 <= 158;
  return fit(full) ? full : fit(short) ? short : `${short.slice(0, 140).replace(/\s+\S*$/, "")}…`;
}

export const money = (n: number, currency = "AUD") => new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
export const years = (weeks?: number) => (weeks ? `${Math.round((weeks / 52) * 10) / 10} yr` : "");

/** One institution page: facts, programmes by level, money, visa and how to apply, with FAQ data. */
export default function WorldInstitutionPage({ i, path, country, eyebrow, intro, facts, courseNote, courseLine, money: moneyBlock, visa, apply, faqs, sources, searchHref }: {
  i: WorldInstitution; path: string; country: string; eyebrow: string; intro: string;
  facts: { label: string; value: string; note?: string }[];
  courseNote: ReactNode; courseLine: (c: Course) => ReactNode; money: ReactNode; visa: ReactNode;
  apply: { title: string; body: ReactNode }[]; faqs: { q: string; a: string }[]; sources: string; searchHref: string;
}) {
  const levels = byLevel(i.courses);
  return <Page path={path} modified={i.sourceDate} eyebrow={eyebrow} title={i.name} accent="for Indian students." intro={intro}
    about={{ "@type": "CollegeOrUniversity", name: i.name, ...(i.legalName !== i.name ? { legalName: i.legalName } : {}), ...(i.identifier ? { identifier: i.identifier } : {}), address: { "@type": "PostalAddress", addressLocality: i.city, ...(i.region ? { addressRegion: i.region } : {}), addressCountry: country } }}
    closing={{ kicker: "YOUR OWN PLAN", title: `Thinking about ${i.name}?`, accent: "Let’s check the fit.", body: "Bring your marks, budget and timeline. We will tell you honestly whether this institution suits you, and what to apply for alongside it.", href: "/book-consultation", action: "Book a consultation" }}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    <Section tone="ivory">
      <div className="ms-guide-facts"><Facts items={facts} /></div>
      <div className="ms-guide-body">
        <details className="ms-guide-block" open><summary><h2>Programmes at {i.name}</h2></summary><Prose>{courseNote}</Prose></details>
        {levels.map(({ level, items }, n) => <details key={level} className={`ms-guide-block${n > 1 ? " is-more" : ""}`} open={n <= 1}>
          <summary><h2>{level} ({items.length})</h2></summary>
          <Checklist columns={items.length > 6 ? 2 : 1} items={items.slice(0, PER_LEVEL).map((c) => courseLine(c))} />
          {items.length > PER_LEVEL && <Prose><p>And {items.length - PER_LEVEL} more. <Link href={searchHref}>Search all {i.name} courses</Link>.</p></Prose>}
        </details>)}
        <details className="ms-guide-block" open><summary><h2>Fees and money for students from India</h2></summary><Prose>{moneyBlock}</Prose></details>
        <details className="ms-guide-block" open><summary><h2>Visa and work rights</h2></summary><Prose>{visa}</Prose></details>
        <details className="ms-guide-block" open><summary><h2>How to apply from India</h2></summary><Steps items={apply.map((s) => ({ title: s.title, body: <p>{s.body}</p> }))} /></details>
      </div>
    </Section>
    <Section tone="paper" kicker="QUICK ANSWERS" title="Your questions," accent="answered." align="split">
      <Accordion items={faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} />
    </Section>
    <Section tone="ivory"><Notice kicker={`OFFICIAL DATA${i.sourceDate ? ` · ${i.sourceDate}` : ""}`}><p>{sources} Courses, fees and rules change each year, so confirm with {i.name} before applying.</p></Notice></Section>
  </Page>;
}
