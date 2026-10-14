import { notFound } from "next/navigation";
import Image from "@/components/althea/EditorialImage";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import KnowledgeHub from "@/components/althea/KnowledgeHub";
import Footer from "@/components/layout/Footer";
import { destinations } from "@/data/destinations";
export function generateStaticParams() {
  return destinations
    .filter((d) => d.slug !== "france")
    .map((d) => ({ slug: d.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    alternates: { canonical: `/destinations/${params.slug}` },
    title: `Study in ${destinations.find((d) => d.slug === params.slug)?.name || "your destination"}`,
  };
}
export default function Destination({ params }: { params: { slug: string } }) {
  const d = destinations.find((d) => d.slug === params.slug);
  if (!d || d.slug === "france") notFound();
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="country-hero">
          <Image
            src={d.image}
            alt={`${d.name} city landscape`}
            fill
            priority
            sizes="100vw"
          />
          <div className="country-shade" />
          <div className="wrap">
            <Link href="/destinations" className="country-back">
              ← The destination atlas
            </Link>
            <p className="eyebrow">{d.region} / A NEW PERSPECTIVE</p>
            <h1>
              Bonjour,
              <br />
              <em>{d.name}.</em>
            </h1>
            <p>{d.mood}</p>
            <span className="country-coordinates">{d.city}</span>
          </div>
        </section>
        <section className="country-intro wrap">
          <p className="eyebrow">YOUR OWN WAY FORWARD</p>
          <div>
            <h2>
              A destination is only
              <br />
              <em>the beginning.</em>
            </h2>
            <p>{d.planning}</p>
            <a
              className="text-link"
              href={d.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore {d.publisher} ↗
            </a>
          </div>
        </section>
        <section className="wrap country-knowledge-heading">
          <p className="eyebrow">THE OCTOBER 2026 COUNTRY GUIDE</p>
          <h2>
            Your questions.
            <br />
            <em>Properly researched.</em>
          </h2>
          <nav className="country-tabs" aria-label="Country guide chapters">
            <a href={`#${d.slug}-admissions`}>Admissions</a>
            <a href={`#${d.slug}-costs`}>Costs</a>
            <a href={`#${d.slug}-scholarships`}>Scholarships</a>
            <a href={`#${d.slug}-visa`}>Visa</a>
            <a href={`#${d.slug}-work-graduation`}>Work & graduation</a>
            <a href={`#${d.slug}-arrival-housing`}>Arrival</a>
            <Link href="/knowledge#budget">Build your budget ↗</Link>
          </nav>
          <p style={{ marginBottom: 30 }}>
            <Link className="button" href={`/programmes?country=${d.slug}`}>
              Research published programme fees & deadlines ↗
            </Link>
          </p>
          <KnowledgeHub country={d.slug} />
        </section>
        <section className="destination-planning wrap">
          <div className="section-heading">
            <h2>
              Make the next step
              <br />
              <em>a considered one.</em>
            </h2>
            <p className="section-aside">
              Official resources first.
              <br />A personal plan next.
            </p>
          </div>
          <div className="planning-grid">
            <article>
              <span className="eyebrow">01 / FIND YOUR FIT</span>
              <h3>Study & research</h3>
              <p>
                {d.focus}. Start with the programme curriculum, teaching
                language and entry requirements.
              </p>
              <a href={d.source} target="_blank" rel="noopener noreferrer">
                Official study resources ↗
              </a>
            </article>
            <article>
              <span className="eyebrow">02 / BUILD YOUR PLAN</span>
              <h3>Applications</h3>
              <p>{d.application}</p>
            </article>
            <article>
              <span className="eyebrow">03 / PREPARE YOUR LIFE</span>
              <h3>Funding & arrival</h3>
              <p>
                Ask the institution about tuition and scholarships. Plan
                accommodation, insurance and travel, and check current
                immigration requirements through the official government source.
              </p>
            </article>
          </div>
        </section>
        <section className="country-checklist wrap">
          <div>
            <p className="eyebrow">BRING THESE TO YOUR CONVERSATION</p>
            <h2>
              Your ambition.
              <br />
              <em>A clearer direction.</em>
            </h2>
          </div>
          <ol>
            {[
              "Your qualifications and subject interests",
              "Your preferred intake and study level",
              "Your budget, including daily living costs",
              "Your language preparation and open questions",
            ].map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </section>
        <section className="maison-closing">
          <p className="eyebrow">LET’S EXPLORE THE POSSIBILITIES</p>
          <h2>
            Your future.
            <br />
            <em>Thoughtfully guided.</em>
          </h2>
          <p>
            Talk through your plans and confirm the support available for{" "}
            {d.name}.
          </p>
          <Link
            className="button champagne"
            href={`/book-consultation?destination=${d.slug}`}
          >
            Start a conversation ↗
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
