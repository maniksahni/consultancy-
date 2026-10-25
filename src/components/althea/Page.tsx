import { BrandMark } from "@/components/brand/BrandLockup";
import PageIdentity from "@/components/seo/PageIdentity";
import { brand } from "@/config/brand";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Closing, Section, TextLink } from "@/components/maison/ui";
import Accordion from "@/components/maison/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import type { QuickAnswer } from "@/data/quickAnswers";
import NextSteps from "@/components/althea/NextSteps";
import Link from "next/link";
import Image from "next/image";
import { Fragment, type ComponentProps, type ReactNode } from "react";
import { trailFor } from "@/lib/trail";
import { coverFor, photoPlace, paris, type ParisSlug } from "@/lib/paris";
import { comingSoonFor, countryProse } from "@/lib/comingSoon";

/** The shell for every inner page: cinematic cover, page body, closing invitation. */
export default function Page({
  path,
  imagePlacement,
  photo,
  eyebrow = "A PERSONAL WAY FORWARD",
  title,
  accent,
  intro,
  headerActions,
  closing,
  modified,
  about,
  faqs,
  items,
  soonCountry,
  children,
}: {
  path?: string;
  imagePlacement?: string;
  photo?: ParisSlug;
  eyebrow?: string;
  title: string;
  accent?: string;
  /** @deprecated covers come from the Paris collection; kept so older call sites compile. */
  image?: string;
  intro: string;
  headerActions?: ReactNode;
  closing?: false | ComponentProps<typeof Closing>;
  /** When the page's facts were last checked; published as dateModified. */
  modified?: string;
  /** Structured-data entity the page is about. */
  about?: Record<string, unknown>;
  /** Direct answers shown above the closing and published as FAQPage. */
  faqs?: QuickAnswer[];
  /** Pages this one lists, published as an ItemList. */
  items?: { name: string; path: string }[];
  /** A coming-soon destination this page is about, when the path alone does not say so (e.g. a programme). */
  soonCountry?: string;
  children: ReactNode;
}) {
  const cover = photo ? paris(photo) : coverFor(imagePlacement || path);
  const pageImage = cover.file;
  const imageAlt = cover.alt;
  const heading = accent ? `${title} ${accent}` : title;
  const soonSlug = soonCountry ?? (path ? comingSoonFor(path) : undefined);
  const soon = soonSlug ? countryProse(soonSlug) : undefined;
  const trail = path ? trailFor(path, heading) : [{ path: "/", name: "Home" }, { path: "", name: heading }];
  return (
    <>
      {path && <PageIdentity path={path} title={heading} description={intro} image={pageImage} imageAlt={imageAlt} modified={modified} about={about} items={items} />}
      <Navbar />
      <main id="main-content" className="ms-page">
        <header className="ms-cover">
          <figure className="ms-cover-media">
            <Image src={pageImage} alt={imageAlt} fill priority sizes="100vw" />
            <figcaption>{photoPlace(cover)}</figcaption>
          </figure>
          <div className="ms-cover-shade" aria-hidden="true" />
          <div className="ms-wrap ms-cover-copy">
            <nav className="ms-crumbs" aria-label="Breadcrumb">
              <Link href="/"><BrandMark size={18} /> {brand.shortName}</Link>
              {trail.slice(1).map((c, i, rest) => <Fragment key={c.path}>
                <span aria-hidden="true">/</span>
                {i === rest.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
              </Fragment>)}
            </nav>
            <p className="ms-kicker">{eyebrow}</p>
            <h1><span className="ms-cover-line"><span>{title}</span></span>{accent && <span className="ms-cover-line"><em>{accent}</em></span>}</h1>
            <p className="ms-cover-intro">{intro}</p>
            {headerActions && <div className="ms-cover-actions">{headerActions}</div>}
          </div>
          <div className="ms-cover-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
        </header>
        <div className="ms-page-body">
          {soon && <aside className="ms-soon" aria-label="Coming soon">
            <span className="ms-soon-tag">Coming soon</span>
            <p><strong>Althéa’s personal support for {soon} is coming soon.</strong> Today we help students coming to study in France, and everyone already living in France with internships, jobs and paperwork. This guide stays open for your research.</p>
            <Link href="/study-in-france">Study in France</Link>
          </aside>}
          {children}
          {faqs?.length ? <Section tone="paper" kicker="QUICK ANSWERS" title="Your questions," accent="answered." align="split">
            <Accordion items={faqs.map((f) => ({ q: f.q, a: <><p>{f.a}</p>{f.href && <TextLink href={f.href}>Read the full chapter</TextLink>}</> }))} />
          </Section> : null}
        </div>
        {path && faqs?.length ? <JsonLd data={{
          "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(path)}#faq`,
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }} /> : null}
        {path && <NextSteps path={path} />}
        {soon
          ? <Closing kicker="COMING SOON" title={`Support for ${soon}`} accent="opens soon." body={`Althéa’s personal support for ${soon} is coming soon. Today we help students coming to study in France, and everyone already living in France.`} soon />
          : closing !== false && <Closing {...(closing || {})} />}
      </main>
      <Footer />
    </>
  );
}
