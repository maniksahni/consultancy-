import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Page from "@/components/althea/Page";
export const metadata: Metadata = {
  title: "Bienvenue chez Althéa.",
  description:
    "Meet Althéa Consulting and Harshita Kohli, Career Coach & France Expert. A Parisian perspective on a personal journey.",
};
export default function AboutPage() {
  return (
    <Page
      eyebrow="L’ESPRIT DE LA MAISON"
      title="A world of ambition. A very personal maison."
      intro="Parisian at heart. Open to the world. Built around the person behind every application."
    >
      <section className="maison-story">
        <div className="story-photo">
          <Image
            src="/images/paris-street.webp"
            alt="The Seine and Parisian architecture in the soft evening light"
            fill
            sizes="(max-width:760px) 90vw, 45vw"
          />
          <span>PARIS, FRANCE · OUR PERSPECTIVE</span>
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
            Althéa brings these questions into one considered conversation. We
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
          <h2>
            Harshita
            <br />
            <em>Kohli.</em>
          </h2>
          <span>CAREER COACH & FRANCE EXPERT</span>
          <small>PARIS, FRANCE</small>
        </div>
        <div>
          <p className="letter-opening">A personal beginning.</p>
          <p>
            Harshita Kohli is Althéa’s career coach and France expert, based in
            Paris. Your first conversation makes space for your academic
            background, career ambitions and the practical questions that come
            with choosing a new country.
          </p>
          <p>
            We begin by listening. Then we discuss the options, the research and
            the scope of support that makes sense for your plans.
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
          Althéa is an independent advisory service. Universities, Campus France
          and visa authorities manage their own applications and decisions.
          Admission, scholarships and visas are not guaranteed.
        </p>
      </aside>
    </Page>
  );
}
