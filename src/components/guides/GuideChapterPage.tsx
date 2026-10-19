import { brand } from "@/config/brand";
import Page from "@/components/althea/Page";
import Accordion from "@/components/maison/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { Checklist, Facts, Notice, Prose, Section, Steps } from "@/components/maison/ui";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { isoDate } from "@/lib/trail";
import { coverFor } from "@/lib/paris";
import type { CountryGuide, GuideChapter } from "@/data/guides/types";
import Link from "next/link";
import { Fragment } from "react";
import GuideTocScroll from "./GuideTocScroll";

const countryNames: Record<string, string> = { uk: "United Kingdom", usa: "United States", india: "India" };

/** Country chapters that point to the shared "From India" chapters. */
const fromIndia: Record<string, [string, string][]> = {
  "funding-loans": [["Education loans from India", "/from-india/education-loans"], ["Sending money abroad: LRS and TCS", "/from-india/sending-money-abroad"]],
  "pre-departure": [["Packing and customs from India", "/from-india/packing-customs"], ["Documents and attestation", "/from-india/documents-attestation"]],
};

/** Renders one chapter of a country guide, with the full answer on the page and sources as small citations. */
export default function GuideChapterPage({ guide, chapter }: { guide: CountryGuide; chapter: GuideChapter }) {
  const index = guide.chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = guide.chapters[index - 1];
  const next = guide.chapters[index + 1];
  return (
    <Page path={chapter.path} modified={chapter.reviewedAt} eyebrow={chapter.eyebrow} title={chapter.title} accent={chapter.accent} intro={chapter.summary}
      closing={{ kicker: "YOUR OWN PLAN", title: "Questions about", accent: `${guide.prose}?`, body: "Bring your profile, budget and timeline. We will turn this guide into a plan for you.", href: `/book-consultation?destination=${guide.country}`, action: "Book a consultation" }}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", "@id": `${absoluteUrl(chapter.path)}#article`,
        headline: chapter.seoTitle, alternativeHeadline: `${chapter.title} ${chapter.accent}`.trim(),
        description: chapter.description, abstract: chapter.summary, inLanguage: "en",
        mainEntityOfPage: { "@id": `${absoluteUrl(chapter.path)}#webpage` },
        image: absoluteUrl(coverFor(chapter.path).file),
        dateModified: isoDate(chapter.reviewedAt),
        author: { "@id": `${siteUrl}/#adviser` }, publisher: { "@id": `${siteUrl}/#organization` },
        isPartOf: { "@type": "CreativeWorkSeries", name: `The complete ${guide.name} study guide`, url: absoluteUrl(guide.hubPath) },
        position: index + 1,
        about: { "@type": "Country", name: countryNames[guide.country] ?? guide.prose },
        audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "International students, including students from India" },
        articleSection: chapter.blocks.map((b) => b.heading),
        citation: chapter.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
      }} />
      {chapter.faqs?.length ? <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(chapter.path)}#faq`,
        mainEntity: chapter.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} /> : null}
      <Section tone="ivory">
        <div className="ms-guide-editorial">
          <p>Published by <Link href="/about">{brand.name}</Link> · Adviser: <Link href="/about">{brand.person}</Link></p>
          <p>Source review: <time dateTime={isoDate(chapter.reviewedAt)}>{chapter.reviewedAt}</time> · <Link href="/acknowledgements#editorial-standards">How to use our guides</Link></p>
        </div>
        <nav className="ms-guide-jumps" aria-label="On this page">
          <p className="ms-kicker">ON THIS PAGE</p>
          <ul>{chapter.blocks.map((block, i) => <li key={block.heading}><a href={`#guide-topic-${i + 1}`}>{block.heading}</a></li>)}<li><a href="#guide-sources">Official sources</a></li></ul>
        </nav>
        <nav className="ms-guide-toc" aria-label={`${guide.name} guide chapters`}>
          <p className="ms-kicker">THE COMPLETE {guide.name.toUpperCase()} GUIDE · CHAPTER {index + 1} OF {guide.chapters.length}</p>
          <ol>{guide.chapters.map((c) => <li key={c.slug}>{c.slug === chapter.slug
            ? <span aria-current="page">{c.label}</span>
            : <Link href={c.path}>{c.label}</Link>}</li>)}</ol>
        </nav>
        <GuideTocScroll />
        {chapter.facts?.length ? <div className="ms-guide-facts"><Facts items={chapter.facts} /></div> : null}
        <div className="ms-guide-body">
          {chapter.blocks.map((block, i) => (
            <Fragment key={block.heading}>
            {block.more && !chapter.blocks[i - 1]?.more ? <p className="ms-kicker ms-guide-more-kicker">IN DEPTH · TAP A TOPIC TO OPEN</p> : null}
            <details id={`guide-topic-${i + 1}`} className={`ms-guide-block${block.more ? " is-more" : ""}`} open={!block.more}>
              <summary><h2>{block.heading}</h2></summary>
              {block.paragraphs?.length ? <Prose>{block.paragraphs.map((p) => <p key={p}>{p}</p>)}</Prose> : null}
              {block.steps?.length ? <Steps items={block.steps.map((s) => ({ title: s.title, body: <p>{s.body}</p> }))} /> : null}
              {block.checklist?.length ? <Checklist columns={block.checklist.length > 6 ? 2 : 1} items={block.checklist} /> : null}
              {block.table ? <div className="ms-guide-table" role="region" aria-label={block.table.caption || block.heading} tabIndex={0}>
                <table>
                  {block.table.caption && <caption>{block.table.caption}</caption>}
                  <thead><tr>{block.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                  <tbody>{block.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i} data-label={block.table!.head[i]}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div> : null}
            </details>
            </Fragment>
          ))}
        </div>
        {guide.country !== "india" && fromIndia[chapter.slug] ? <Notice kicker="FROM INDIA">
          <p>The Indian side of this step, for every destination: {fromIndia[chapter.slug].map(([label, href], i) => <span key={href}>{i > 0 && " · "}<Link href={href}>{label}</Link></span>)} · <Link href="/from-india">All From India chapters</Link></p>
        </Notice> : null}
      </Section>
      {chapter.faqs?.length ? <Section tone="paper" kicker="QUICK ANSWERS" title="Your questions," accent="answered." align="split">
        <Accordion items={chapter.faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} />
      </Section> : null}
      <Section tone="ivory" id="guide-sources">
        <Notice kicker={`REVIEWED ${chapter.reviewedAt.toUpperCase()}`}>
          <p>The review date describes the source review recorded for this guide. It is not a promise that every rule remains current. Use the official publications below to confirm the requirements for your own application.</p>
          <p className="ms-guide-sources">Sources: {chapter.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></span>)}</p>
        </Notice>
        <nav className="ms-guide-pager" aria-label="Chapter navigation">
          {prev ? <Link href={prev.path} rel="prev"><small>Previous chapter</small>{prev.label}</Link> : <Link href={guide.hubPath}><small>Back to</small>{guide.name} overview</Link>}
          {next ? <Link href={next.path} rel="next"><small>Next chapter</small>{next.label}</Link> : <Link href={`/book-consultation?destination=${guide.country}`}><small>Next step</small>Book a consultation</Link>}
        </nav>
      </Section>
    </Page>
  );
}

/** Chapter index for a country hub page. */
export function GuideChapterIndex({ guide }: { guide: CountryGuide }) {
  return <ol className="ms-guide-index">{guide.chapters.map((c, i) => (
    <li key={c.slug}><Link href={c.path}><span className="ms-guide-index-num">{String(i + 1).padStart(2, "0")}</span><span><strong>{c.label}</strong><small>{c.description}</small></span></Link></li>
  ))}</ol>;
}
