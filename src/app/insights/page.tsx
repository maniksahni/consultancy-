import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/france";
import { Section } from "@/components/maison/ui";
import { coverFor } from "@/lib/paris";
export const metadata: Metadata = pageMetadata('/insights', {
  title: "Study in France Blog & Guides",
  description:
    "Study in France blog: choosing a programme, Campus France application steps and student budget planning, each linked to official sources.",
});
export default function Content() {
  return (
    <Page path="/insights" items={articles.map((a) => ({ name: a.title, path: `/insights/${a.slug}` }))} eyebrow="LE JOURNAL" title="Le journal" accent={`${brand.shortName}.`} intro="Practical notes for a thoughtful French chapter, with official sources.">
      <Section tone="ivory" kicker="THE LATEST GUIDES" title="Read slowly." accent="Decide well.">
        <div className="ms-journal">{articles.map((a, i) => { const photo = coverFor(`/insights/${a.slug}`); return (
          <Link key={a.slug} href={`/insights/${a.slug}`} className={`ms-journal-card${i === 0 ? " is-lead" : ""}`} data-cursor="Read">
            <div className="ms-journal-img"><Image src={photo.file} alt={photo.alt} fill sizes="(max-width:900px) 92vw, 50vw" /></div>
            <div className="ms-journal-copy"><p className="ms-card-kicker">{a.category}</p><h3>{a.title}</h3><p>{a.intro}</p><span className="ms-card-cta">Read the guide<ArrowUpRight size={17} aria-hidden="true" /></span></div>
          </Link>); })}</div>
      </Section>
    </Page>
  );
}
