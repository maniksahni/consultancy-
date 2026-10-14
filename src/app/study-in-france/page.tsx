import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import KnowledgeHub from "@/components/althea/KnowledgeHub";
import Link from "next/link";
import { official, checked, cities } from "@/data/france";
export const metadata: Metadata = {
  title: "Your French chapter.",
  description:
    "Bring your academic ambitions and everyday life into the same plan.",
};
export default function Content() {
  return (
    <Page
      title={"Your French chapter."}
      intro={
        "Bring your academic ambitions and everyday life into the same plan."
      }
    >
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
        <h2>Your official starting points</h2>
        <p>
          <a href={official.catalogue}>Campus France programme resources ↗</a>
          <br />
          <a href={official.india}>
            Campus France India: application guidance ↗
          </a>
          <br />
          <a href={official.visa}>France-Visas: student guidance ↗</a>
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
