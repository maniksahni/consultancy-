import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Page from "@/components/althea/Page";
export const metadata: Metadata = pageMetadata('/about', {
  title: 'About Althéa Consulting & Harshita Kohli',
  description:
    `Meet ${brand.name} and ${brand.person}, ${brand.role}. A Parisian perspective on a personal journey.`,
});
export default function AboutPage() {
  return (
    <Page
      image="/images/editorial/france-campus.webp"
      eyebrow="L’ESPRIT DE LA MAISON"
      title="A world of ambition. A very personal maison."
      intro="France-based, shaped by lived experience and focused on the practical realities of studying, settling and building a career here."
    >
      <section className="maison-story">
        <div className="story-photo">
          <Image
            src="/images/editorial/france-bordeaux.webp"
            alt="The Place de la Bourse and Water Mirror in Bordeaux"
            fill
            sizes="(max-width:760px) 90vw, 45vw"
          />
          <span>BORDEAUX · PLACE DE LA BOURSE</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">THE ALTHÉA PHILOSOPHY</p>
          <h2>
            Big ambitions.
            <br />
            <em>Human conversations.</em>
          </h2>
          <p>
            A new country is more than an application. It’s the subject you’ll
            study, the neighbourhood you’ll discover, and the future you’re
            hoping to build.
          </p>
          <p>
            {brand.shortName} brings these questions into one considered conversation. We
            help you explore academic options alongside the practical details,
            so your next step has a reason behind it.
          </p>
          <Link className="text-link" href="/services">
            Discover our support ↗
          </Link>
        </div>
      </section>
      <section className="founder-letter">
        <div className="founder-letter-heading">
          <p className="eyebrow">MEET YOUR ADVISER</p>
          <div className="founder-paris-photo">
            <Image src="/images/editorial/sainte-genevieve.webp" alt="The reading room of the Bibliothèque Sainte-Geneviève in Paris" fill sizes="(max-width:760px) 90vw, 40vw" />
            <span className="founder-postcard">Bibliothèque Sainte-Geneviève · Paris</span>
          </div>
          <h2>{brand.person}</h2>
          <span>{brand.role}</span>
          <small>{brand.location}</small>
        </div>
        <div>
          <p className="letter-opening">A personal beginning.</p>
          <p>
            I’m {brand.person}—France-based career coach and former
            international student, helping you navigate the realities of life
            and career in France. I know that arriving is the beginning of a
            new set of practical questions, not the end of the journey.
          </p>
          <p>
            We begin by listening. Then we agree the practical next steps, the
            scope of support and the fee before we start. For study applications,
            I offer independent guidance and partner-supported application
            assistance where appropriate; I do not represent a university.
          </p>
          <Link className="button" href="/book-consultation">
            Let’s talk about your next chapter <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="maison-values">
        <p className="eyebrow">THE WAY WE WORK</p>
        <h2>
          Care in the details.
          <br />
          <em>Clarity in the decisions.</em>
        </h2>
        <div className="value-grid">
          {[
            [
              "01",
              "Personal attention",
              "Your questions, constraints and ambitions shape the conversation.",
            ],
            [
              "02",
              "Considered research",
              "Official information helps you compare options and understand the requirements.",
            ],
            [
              "03",
              "Clear expectations",
              "Agree the support, deliverables and fees before deciding to go further.",
            ],
          ].map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <aside className="independence-note">
        <span className="eyebrow">INDEPENDENT BY DESIGN</span>
        <p>
          {brand.shortName} is an independent advisory service. Universities, Campus France
          and visa authorities manage their own applications and decisions.
          Admission, scholarships and visas are not guaranteed.
        </p>
      </aside>
    </Page>
  );
}
