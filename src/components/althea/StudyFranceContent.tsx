import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import KnowledgeHub from "@/components/althea/KnowledgeHub";
import Link from "next/link";
import { checked, cities, official } from "@/data/france";
import { ArrowUpRight, Check, Compass, FileText, Globe, GraduationCap, ShieldCheck } from "lucide-react";

export default function StudyFranceContent({ imagePlacement = "/study-in-france" }: { imagePlacement?: string }) {
  return (
    <Page
      path="/study-in-france"
      imagePlacement={imagePlacement}
      image="/images/editorial/france-campus.webp"
      eyebrow="INDEPENDENT ADMISSIONS GUIDANCE"
      title="Study in France from India, with a plan."
      intro="Explore the right education pathway, prepare a thoughtful application and plan for the transition to life in France."
    >
      {/* ── 1. Services & Decision Framework ── */}
      <section className="study-services">
        <div className="study-services-copy">
          <p className="eyebrow">A CLEARER APPLICATION JOURNEY</p>
          <h2>
            Make each decision<br />
            <em>with purpose.</em>
          </h2>
          <p className="study-services-lead">
            Independent guidance with partner-supported application assistance where appropriate. We help you navigate the process; institutions make admissions decisions.
          </p>
          <div className="study-services-seal">
            <span>
              <strong>Personal by Design:</strong> Direct guidance with Harshita Kohli, based in Paris, helping you align degree ambitions with French career reality.
            </span>
          </div>
        </div>

        <div className="study-service-list">
          {[
            "Choose programmes aligned with your goals and experience",
            "Understand French education pathways and official application routes",
            "Review application documents, CV and statement of purpose",
            "Prepare for interviews and organise application materials",
            "Plan pre-departure steps and practical arrival questions",
          ].map((x) => (
            <div className="study-service-item" key={x}>
              <span className="study-check-icon">
                <Check size={14} />
              </span>
              <span className="study-service-text">{x}</span>
            </div>
          ))}
          <Link className="study-service-btn" href="/book-consultation">
            <span>Discuss your study plan</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── 2. First Answers for Indian Applicants ── */}
      <section className="india-answers-section" aria-labelledby="india-study-answers">
        <div className="india-answers-header">
          <p className="eyebrow">A CLEAR START FOR APPLICANTS IN INDIA</p>
          <h2 id="india-study-answers">Study in France from India: the first answers.</h2>
        </div>

        <div className="india-answers-grid">
          <article className="india-answer-card">
            <div>
              <span className="india-card-num">01</span>
              <h3>Which application route should I follow?</h3>
              <p>
                India is covered by the Études en France procedure. Start with Campus France India’s current application and admission instructions, then confirm the route for your exact degree, programme and institution. Not every course follows the same calendar or application path.
              </p>
            </div>
            <a href={official.india} target="_blank" rel="noreferrer" className="india-card-link">
              Campus France India Instructions <ArrowUpRight size={14} />
            </a>
          </article>

          <article className="india-answer-card">
            <div>
              <span className="india-card-num">02</span>
              <h3>What should I compare before choosing a course?</h3>
              <p>
                Check the curriculum, entry requirements, teaching language, tuition for your applicant category and the institution’s current deadline. Compare English-taught Master’s tracks with public universities and Grandes Écoles.
              </p>
            </div>
            <Link href="/universities?country=france&view=courses#course-finder" className="india-card-link">
              Browse France Course Records <ArrowUpRight size={14} />
            </Link>
          </article>

          <article className="india-answer-card">
            <div>
              <span className="india-card-num">03</span>
              <h3>Can an adviser guarantee admission or a visa?</h3>
              <p>
                No. Institutions decide admissions and awards; French authorities decide visas. Use France-Visas student guidance for the requirements that apply to your situation. Althéa provides independent preparation, not guaranteed outcomes.
              </p>
            </div>
            <a href={official.visa} target="_blank" rel="noreferrer" className="india-card-link">
              France-Visas Official Guidance <ArrowUpRight size={14} />
            </a>
          </article>
        </div>
      </section>

      {/* ── 3. Knowledge Hub ── */}
      <KnowledgeHub country="france" />

      {/* ── 4. Strategic Planning Cards ── */}
      <div className="content-grid">
        {[
          [
            "Start with the subject",
            "Compare course content, academic prerequisites and teaching language before choosing an institution.",
            "/universities?country=france&view=courses#course-finder",
          ],
          [
            "Build the whole budget",
            "Include tuition, housing, deposits, transport, food and arrival costs. Do not assume a scholarship will be awarded.",
            "/knowledge#budget",
          ],
          [
            "Find your application route",
            "The institution, degree, nationality and country of residence can affect the route. Check your local Campus France office.",
            "/campus-france-guide",
          ],
          [
            "Prepare for everyday France",
            "Consider campus location, accommodation, transport and French language learning alongside your studies.",
            "/france/living",
          ],
        ].map(([title, text, href]) => (
          <Link className="content-card" href={href} key={title} aria-label={`${title} — open guide`}>
            <h2>{title}</h2>
            <p>{text}</p>
          </Link>
        ))}
      </div>

      {/* ── 5. Editorial Wrap ── */}
      <div className="prose">
        <h2>Your support does not end at the offer letter</h2>
        <p>
          Once you have an offer, arrival brings its own practical questions. Plan your transition with our <Link href="/settle-in-france">Settle in France support</Link>.
        </p>
        <h2>Independent guidance, clearly scoped</h2>
        <p>
          Althéa is not a university representative. Any partner-supported application assistance is described before work begins; admission, scholarships and visas are decided by the relevant institutions and authorities and cannot be guaranteed.
        </p>
        <h2>Your official starting points</h2>
        <p>
          <Link href="/programmes">Explore the programme directory ↗</Link>
          <br />
          <Link href="/campus-france-guide">Explore the application procedure guide ↗</Link>
          <br />
          <Link href="/france/visas">Explore the student visa guide ↗</Link>
        </p>
        <p className="muted">
          Editorial overview checked {checked}. This is independent orientation;
          official requirements must be checked for your own circumstances.
        </p>
      </div>

      <div className="content-grid">
        {cities.map((c) => (
          <Link className="content-card" key={c.slug} href={`/cities/${c.slug}`}>
            <h3>{c.name} ↗</h3>
            <p>{c.tag}</p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
