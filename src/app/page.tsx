import { brand } from "@/config/brand";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationAtlas from "@/components/althea/DestinationAtlas";
import ChapterConcierge from "@/components/althea/ChapterConcierge";
import Testimonials from "@/components/althea/Testimonials";
import FAQ from "@/components/althea/FAQ";
import { articles } from "@/data/france";

const support = [
  {
    n: "01",
    title: "The possibility",
    accent: "Study.",
    text: "Find the subject, the programme and the place that reflect your ambition.",
    href: "/france/programmes",
    tag: "ACADEMIC DIRECTION & PROGRAMME RESEARCH",
  },
  {
    n: "02",
    title: "The preparation",
    accent: "Settle.",
    text: "Turn big questions into practical next steps, from applications to arrival.",
    href: "/services",
    tag: "APPLICATION SUPPORT & ARRIVAL PLANNING",
  },
  {
    n: "03",
    title: "The bigger picture",
    accent: "Succeed.",
    text: "Think beyond the offer. Build a plan for the life and career you want next.",
    href: "/about",
    tag: "PERSONAL CONVERSATIONS & CAREER DIRECTION",
  },
];
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="edition-home">
        <section className="edition-hero wrap">
          <div className="edition-topline">
            <span>LA MAISON DU NOUVEAU DÉPART</span>
            <span>{brand.location} · INDEPENDENT GUIDANCE</span>
            <span>EST. IN AMBITION</span>
          </div>
          <div className="edition-masthead" aria-hidden="true">
            <span>{brand.shortName}</span>
            <i>✳</i>
          </div>
          <div className="edition-cover">
            <div className="edition-cover-copy">
              <p className="eyebrow">BIENVENUE · STUDY. SETTLE. SUCCEED.</p>
              <h1>
                Votre avenir.
                <br />
                <em>A future in France.</em>
              </h1>
              <p>
                {brand.tagline}
              </p>
              <Link href="/book-consultation" className="button">
                Start your next chapter{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <a className="cover-explore" href="#the-world">
                THE WORLD IS WAITING <MoveDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="edition-cover-art">
              <div className="cover-picture">
                <Image
                  src="/images/paris-eiffel.webp"
                  alt="The Eiffel Tower and the Seine at sunset, a view towards a new life in Paris"
                  fill
                  priority
                  sizes="(max-width:760px) 90vw, 55vw"
                />
                <span className="cover-image-label">
                  01 / A PARISIAN PERSPECTIVE
                </span>
              </div>
              <img className="brand-portrait" src={brand.assets.illustration} alt="Original illustration of the Eiffel Tower, balloon and clouds"/>
              <div className="cover-ticket">
                <span>YOUR NEXT CHAPTER</span>
                <strong>
                  Anywhere.
                  <br />
                  <em>Entirely yours.</em>
                </strong>
                <div>
                  <span>
                    DEPARTURE
                    <br />
                    <b>YOUR AMBITION</b>
                  </span>
                  <ArrowUpRight size={22} />
                  <span>
                    ARRIVAL
                    <br />
                    <b>YOUR FUTURE</b>
                  </span>
                </div>
              </div>
              <span className="cover-roundel" aria-hidden="true">
                LE MONDE
                <br />
                <i>✦</i>
                <br />
                VOUS ATTEND
              </span>
            </div>
          </div>
          <div className="edition-colophon">
            <span>INDEPENDENT GUIDANCE</span>
            <span>FRANCE FIRST</span>
            <span>ONE VERY PERSONAL JOURNEY</span>
          </div>
        </section>
        <section className="edition-manifesto wrap" id="bienvenue">
          <p className="eyebrow">01 / OUR PERSPECTIVE</p>
          <div>
            <h2>
              You’re not just choosing
              <br />a university.
              <br />
              <em>You’re choosing a life.</em>
            </h2>
            <div className="manifesto-bottom">
              <p>
                A subject that excites you. A city that feels like possibility.
                A future you can see yourself in. We connect the academic
                choices with the human ones.
              </p>
              <Link
                href="/about"
                className="circle-link"
                aria-label={`Get to know ${brand.shortName}`}
              >
                <ArrowUpRight size={30} />
                <span>MEET THE MAISON</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="edition-world" id="the-world">
          <div className="wrap">
            <div className="edition-section-heading">
              <div>
                <p className="eyebrow">02 / FRANCE & OTHER DESTINATIONS</p>
                <h2>
                  France, first.
                  <br />
                  <em>The world, next.</em>
                </h2>
              </div>
              <Link className="text-link" href="/destinations">
                Open the destination atlas <ArrowUpRight size={16} />
              </Link>
            </div>
            <DestinationAtlas compact />
          </div>
        </section>
        <section className="edition-support wrap">
          <div className="edition-section-heading">
            <div>
              <p className="eyebrow">03 / LE PARCOURS</p>
              <h2>
                Big dreams.
                <br />
                <em>Considered steps.</em>
              </h2>
            </div>
            <p>
              Thoughtful support.
              <br />
              At the turning points that matter.
            </p>
          </div>
          <div className="support-ledger">
            {support.map((s) => (
              <Link href={s.href} key={s.n}>
                <span className="ledger-number">{s.n}</span>
                <div className="ledger-title">
                  <span>{s.title}</span>
                  <h3>{s.accent}</h3>
                </div>
                <div className="ledger-detail">
                  <p>{s.text}</p>
                  <span>{s.tag}</span>
                </div>
                <ArrowUpRight size={30} strokeWidth={1.2} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
        <section className="edition-interlude">
          <Image
            src="/images/paris-street.webp"
            alt="Evening light over the Seine and the architecture of Paris"
            fill
            sizes="100vw"
          />
          <div className="interlude-shade" />
          <div className="wrap">
            <span className="eyebrow">
              ROOTED IN FRANCE. OPEN TO THE WORLD.
            </span>
            <h2>
              A Parisian heart.
              <br />
              <em>A boundless ambition.</em>
            </h2>
            <Link href="/study-in-france">
              DISCOVER OUR FRENCH CHAPTER <ArrowUpRight size={22} />
            </Link>
          </div>
          <span className="interlude-coordinate">48°51′ N · 2°21′ E</span>
        </section>
        <section className="edition-adviser wrap">
          <div className="adviser-editorial-note">
            <span className="eyebrow">04 / THE PERSON BEHIND THE PLAN</span>
            <span className="editorial-asterisk" aria-hidden="true">
              ✳
            </span>
            <span>{brand.location}</span>
          </div>
          <div className="edition-adviser-copy">
            <h2>
              A human conversation.
              <br />
              <em>A whole new perspective.</em>
            </h2>
            <p>
              Meet {brand.person}, {brand.role}. Begin with your
              questions, your ambitions, and the details that make your journey
              yours.
            </p>
            <div className="adviser-signoff">
              <span>
                {brand.person}<small>{brand.role}</small>
              </span>
              <Link className="text-link" href="/book-consultation">
                Let’s talk <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        <ChapterConcierge />
        <Testimonials />
        <section className="edition-library wrap">
          <div className="edition-section-heading">
            <div>
              <p className="eyebrow">05 / THE READING ROOM</p>
              <h2>
                A little knowledge.
                <br />
                <em>A lot more clarity.</em>
              </h2>
            </div>
            <Link className="text-link" href="/knowledge">
              Enter the knowledge hub <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="reading-room">
            <Link className="reading-feature" href="/france/universities">
              <span className="eyebrow">THE FRANCE COLLECTION</span>
              <span className="reading-flower" aria-hidden="true">
                ✳
              </span>
              <h3>
                Find a place
                <br />
                for your
                <br />
                <em>curiosity.</em>
              </h3>
              <span>
                UNIVERSITIES & PROGRAMMES <ArrowUpRight size={21} />
              </span>
            </Link>
            <div className="reading-stories">
              {articles.map((a, i) => (
                <Link key={a.slug} href={`/insights/${a.slug}`}>
                  <span className="eyebrow">
                    0{i + 1} / {a.category}
                  </span>
                  <h3>{a.title}</h3>
                  <span>
                    READ THE GUIDE <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
              <Link className="reading-source" href="/campus-france-guide">
                Campus France: understand your application path{" "}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        <section className="wrap section faq-section">
          <div>
            <p className="eyebrow">06 / BEFORE YOU BEGIN</p>
            <h2>
              Good questions.
              <br />
              <em>Clearer beginnings.</em>
            </h2>
            <Link className="text-link" href="/faq">
              More answers ↗
            </Link>
          </div>
          <FAQ />
        </section>
        <section className="edition-finale">
          <div className="wrap">
            <p className="eyebrow">EVERY GREAT JOURNEY BEGINS SOMEWHERE.</p>
            <h2>
              Make the
              <br />
              <em>first move.</em>
            </h2>
            <div>
              <p>
                Your world is waiting.
                <br />
                Let’s find your way into it.
              </p>
              <Link className="button" href="/book-consultation">
                Begin with a conversation <ArrowUpRight size={18} />
              </Link>
            </div>
            <span className="finale-flower" aria-hidden="true">
              ✳
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
