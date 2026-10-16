import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Image from "next/image";
import { photoFor, photoCaption } from "@/lib/photography";
import Link from "next/link";
import Page from "@/components/althea/Page";
import { ArrowUpRight, Globe, Mail, MapPin, ShieldCheck, User } from "lucide-react";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About Althéa Consulting & Harshita Kohli",
  description: `Meet ${brand.name} and ${brand.person}, ${brand.role}. A Parisian perspective on a personal journey.`,
});

export default function AboutPage() {
  return (
    <Page
      path="/about"
      image="/images/editorial/france-campus.webp"
      eyebrow="L’ESPRIT DE LA MAISON"
      title="About Althéa Consulting & Harshita Kohli"
      intro="France-based, shaped by lived experience and focused on the practical realities of studying, settling and building a career here."
    >
      {/* ── 1. Althéa Consulting at a Glance Dossier Card ── */}
      <section className="about-glance-card" aria-labelledby="althea-facts-title">
        <div className="about-glance-header">
          <span className="about-glance-eyebrow">
            <ShieldCheck size={13} /> MAISON IDENTITY · PARIS, FRANCE
          </span>
          <h2 id="althea-facts-title">Althéa Consulting at a glance</h2>
          <p className="about-glance-lead">
            Althéa Consulting is an independent advisory based in Paris, France, founded by Harshita Kohli.
            We support international students and young professionals with study planning, settling into life in France, and career preparation.
          </p>
        </div>

        <div className="about-specs-grid">
          <div className="about-spec-item">
            <span className="about-spec-label">
              <User size={13} /> Founder & Adviser
            </span>
            <span className="about-spec-val">
              {brand.person}
              <small style={{ display: "block", fontSize: 11, color: "#6a7c85", fontWeight: 400, marginTop: 2 }}>
                Career Coach & France Expert
              </small>
            </span>
          </div>

          <div className="about-spec-item">
            <span className="about-spec-label">
              <MapPin size={13} /> Headquarters
            </span>
            <span className="about-spec-val">
              {brand.location}
              <small style={{ display: "block", fontSize: 11, color: "#6a7c85", fontWeight: 400, marginTop: 2 }}>
                Île-de-France, France
              </small>
            </span>
          </div>

          <div className="about-spec-item">
            <span className="about-spec-label">
              <Globe size={13} /> Official Portal
            </span>
            <span className="about-spec-val">
              <a href={brand.canonicalUrl} target="_blank" rel="noreferrer">
                altheaconsulting.in
              </a>
              <small style={{ display: "block", fontSize: 11, color: "#6a7c85", fontWeight: 400, marginTop: 2 }}>
                Verified Official Domain
              </small>
            </span>
          </div>

          <div className="about-spec-item">
            <span className="about-spec-label">
              <Mail size={13} /> Direct Contact
            </span>
            <span className="about-spec-val">
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <small style={{ display: "block", fontSize: 11, color: "#6a7c85", fontWeight: 400, marginTop: 2 }}>
                Advisory Correspondence
              </small>
            </span>
          </div>
        </div>

        <div className="about-glance-pillars">
          <span>Pillars of Guidance:</span>
          <Link href="/study-in-france" className="about-pillar-pill">
            Study Guidance <ArrowUpRight size={13} />
          </Link>
          <Link href="/settle-in-france" className="about-pillar-pill">
            Settling Support <ArrowUpRight size={13} />
          </Link>
          <Link href="/jobs" className="about-pillar-pill">
            Career Preparation <ArrowUpRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── 2. Maison Philosophy ── */}
      <section className="maison-story">
        <div className="story-photo">
          <Image
            src={photoFor("/about/body/philosophy")!.file}
            alt={photoCaption(photoFor("/about/body/philosophy")!)}
            fill
            sizes="(max-width:760px) 90vw, 45vw"
          />
          <span>{photoCaption(photoFor("/about/body/philosophy")!)}</span>
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

      {/* ── 3. Founder Letter ── */}
      <section className="founder-letter">
        <div className="founder-letter-heading">
          <p className="eyebrow">MEET YOUR ADVISER</p>
          <div className="founder-paris-photo">
            <Image
              src={photoFor("/about/body/adviser")!.file}
              alt={photoCaption(photoFor("/about/body/adviser")!)}
              fill
              sizes="(max-width:760px) 90vw, 40vw"
            />
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

      {/* ── 4. Maison Values ── */}
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

      {/* ── 5. Independence Note ── */}
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
