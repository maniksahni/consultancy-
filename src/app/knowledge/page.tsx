import Link from "@/components/althea/EditorialLink";
import { articles } from "@/data/france";
import Page from "@/components/althea/Page";
import KnowledgeHub from "@/components/althea/KnowledgeHub";
import BudgetPlanner from "@/components/althea/BudgetPlanner";
import { planningChecklist } from "@/data/studyKnowledge";
export const metadata = {
  alternates: { canonical: "/knowledge" },
  title: "October 2026 student knowledge hub",
  description:
    "Source-reviewed guidance for seven countries: applications, costs, scholarships, visas, employment, graduation and practical checklists.",
};
export default function Knowledge() {
  return (
    <Page
      eyebrow="THE OCTOBER 2026 EDITION"
      title="Better information. Better decisions."
      intro="Explore the requirements behind the dream. Search seven countries, follow the official evidence and build your own practical study plan."
    >
      <section className="prose">
        <h2>The reading room.</h2>
        {articles.map((a) => (
          <p key={a.slug}>
            <Link href={`/knowledge/${a.slug}`}>{a.title} ↗</Link>
          </p>
        ))}
      </section>
      <KnowledgeHub />
      <BudgetPlanner />
      <section className="preparation-checklists">
        <p className="eyebrow">YOUR APPLICATION WORKSPACE</p>
        <h2>Prepare with purpose.</h2>
        <p className="muted">
          An adaptable planning checklist. The institution and immigration
          authority provide your exact required documents.
        </p>
        <div className="planning-grid">
          {planningChecklist.map((g) => (
            <article key={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="coverage-section" id="coverage">
        <p className="eyebrow">TRANSPARENT BY DESIGN</p>
        <h2>What this review covers.</h2>
        <div className="planning-grid">
          {[
            [
              "Country guidance",
              "Official-source summaries checked on 14 October 2026. Page reviews, official search listings and planning advice are labelled separately. A reviewed date is not the effective date of a rule.",
            ],
            [
              "University data",
              "A live French institution registry and a curated programme collection are available. This site does not mirror complete course catalogues for seven countries or provide live admission availability.",
            ],
            [
              "Costs & deadlines",
              "Published visa thresholds include their conditions. The programme research desk lists university-published fees and calendars directly. Unpublished figures, conflicting pages and individual fee exceptions are identified separately.",
            ],
          ].map(([t, p]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
