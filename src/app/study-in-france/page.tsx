import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import KnowledgeHub from "@/components/althea/KnowledgeHub";
import Link from "next/link";
import { checked, cities } from "@/data/france";
import { ArrowUpRight, Check } from "lucide-react";
export const metadata: Metadata = pageMetadata('/study-in-france', {
  title: 'Study in France Admissions Guide',
  description: `Plan a French university application with independent programme guidance, official application routes and practical arrival advice from ${brand.shortName}.`,
});
export default function Content() {
  return (
    <Page
      eyebrow="INDEPENDENT ADMISSIONS GUIDANCE"
      title={"Study in France, with a plan."}
      intro={
        "Explore the right education pathway, prepare a thoughtful application and plan for the transition to life in France."
      }
    >
      <section className="study-services"><div><p className="eyebrow">A CLEARER APPLICATION JOURNEY</p><h2>Make each decision<br/><em>with purpose.</em></h2><p>Independent guidance, with partner-supported application assistance where appropriate. We help you navigate the process; institutions make admissions decisions.</p></div><div className="study-service-list">{[
        "Choose programmes aligned with your goals and experience",
        "Understand French education pathways and official application routes",
        "Review application documents, CV and statement of purpose",
        "Prepare for interviews and organise application materials",
        "Plan pre-departure steps and practical arrival questions",
      ].map(x=><p key={x}><Check size={16}/>{x}</p>)}<Link className="button" href="/book-consultation">Discuss your study plan <ArrowUpRight size={17}/></Link></div></section>
      <KnowledgeHub country="france" />
      <div className="content-grid">
        {[
          [
            "Start with the subject",
            "Compare course content, academic prerequisites and teaching language before choosing an institution.",
          ],
          [
            "Build the whole budget",
            "Include tuition, housing, deposits, transport, food and arrival costs. Do not assume a scholarship will be awarded.",
          ],
          [
            "Find your application route",
            "The institution, degree, nationality and country of residence can affect the route. Check your local Campus France office.",
          ],
          [
            "Prepare for everyday France",
            "Consider campus location, accommodation, transport and French language learning alongside your studies.",
          ],
        ].map(([title, text]) => (
          <section className="content-card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
      <div className="prose">
        <h2>Your support does not end at the offer letter</h2>
        <p>Once you have an offer, arrival brings its own practical questions. Plan your transition with our <Link href="/settle-in-france">Settle in France support</Link>.</p>
        <h2>Independent guidance, clearly scoped</h2>
        <p>Althéa is not a university representative. Any partner-supported application assistance is described before work begins; admission, scholarships and visas are decided by the relevant institutions and authorities and cannot be guaranteed.</p>
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
          <Link
            className="content-card"
            key={c.slug}
            href={`/cities/${c.slug}`}
          >
            <h3>{c.name} ↗</h3>
            <p>{c.tag}</p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
