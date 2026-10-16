import Page from "@/components/althea/Page";
import Accordion from "@/components/maison/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { Checklist, Facts, Notice, Prose, Section, Steps } from "@/components/maison/ui";
import { absoluteUrl } from "@/lib/seo";
import type { CountryGuide, GuideChapter } from "@/data/guides/types";
import Link from "next/link";
import GuideTocScroll from "./GuideTocScroll";

/** Renders one chapter of a country guide, with the full answer on the page and sources as small citations. */
export default function GuideChapterPage({ guide, chapter }: { guide: CountryGuide; chapter: GuideChapter }) {
  const index = guide.chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = guide.chapters[index - 1];
  const next = guide.chapters[index + 1];
  return (
    <Page path={chapter.path} eyebrow={chapter.eyebrow} title={chapter.title} accent={chapter.accent} intro={chapter.summary}
      closing={{ kicker: "YOUR OWN PLAN", title: "Questions about", accent: `${guide.prose}?`, body: "Bring your profile, budget and timeline. We will turn this guide into a plan for you.", href: `/book-consultation?destination=${guide.country}`, action: "Book a consultation" }}>
      {chapter.faqs?.length ? <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(chapter.path)}#faq`,
        mainEntity: chapter.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} /> : null}
      <Section tone="ivory">
        <nav className="ms-guide-toc" aria-label={`${guide.name} guide chapters`}>
          <p className="ms-kicker">THE COMPLETE {guide.name.toUpperCase()} GUIDE · CHAPTER {index + 1} OF {guide.chapters.length}</p>
          <ol>{guide.chapters.map((c) => <li key={c.slug}>{c.slug === chapter.slug
            ? <span aria-current="page">{c.label}</span>
            : <Link href={c.path}>{c.label}</Link>}</li>)}</ol>
        </nav>
        <GuideTocScroll />
        {chapter.facts?.length ? <div className="ms-guide-facts"><Facts items={chapter.facts} /></div> : null}
        <div className="ms-guide-body">
          {chapter.blocks.map((block) => (
            <details key={block.heading} className="ms-guide-block" open>
              <summary><h2>{block.heading}</h2></summary>
              {block.paragraphs?.length ? <Prose>{block.paragraphs.map((p) => <p key={p}>{p}</p>)}</Prose> : null}
              {block.steps?.length ? <Steps items={block.steps.map((s) => ({ title: s.title, body: <p>{s.body}</p> }))} /> : null}
              {block.checklist?.length ? <Checklist columns={block.checklist.length > 6 ? 2 : 1} items={block.checklist} /> : null}
              {block.table ? <div className="ms-guide-table" role="region" aria-label={block.table.caption || block.heading} tabIndex={0}>
                <table>
                  {block.table.caption && <caption>{block.table.caption}</caption>}
                  <thead><tr>{block.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                  <tbody>{block.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div> : null}
            </details>
          ))}
        </div>
      </Section>
      {chapter.faqs?.length ? <Section tone="paper" kicker="QUICK ANSWERS" title="Your questions," accent="answered." align="split">
        <Accordion items={chapter.faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} />
      </Section> : null}
      <Section tone="ivory">
        <Notice kicker={`REVIEWED ${chapter.reviewedAt.toUpperCase()}`}>
          <p>Everything you need is on this page. Rules, fees and dates change, so we re-check them against the official publications below before every intake.</p>
          <p className="ms-guide-sources">Sources: {chapter.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.label}</a></span>)}</p>
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
