import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { stages } from "@/data/france";
export const metadata: Metadata = {
  title: "A considered path, together.",
  description:
    "Six stages to organise the conversation — adapted to your circumstances and agreed scope.",
};
export default function Content() {
  return (
    <Page
      title={"A considered path, together."}
      intro={
        "Six stages to organise the conversation — adapted to your circumstances and agreed scope."
      }
    >
      <div className="content-grid">
        {stages.map((s, i) => (
          <section className="content-card" key={s}>
            <p className="eyebrow">0{i + 1}</p>
            <h2>{s}</h2>
            <p>
              {
                [
                  "Discuss your goals, academic background, budget and questions.",
                  "Understand the subjects, qualifications and prerequisites that shape your options.",
                  "Compare official programme information, costs and practical preferences.",
                  "Review your documents and tell your own story with clarity and evidence.",
                  "Confirm the relevant institutional and country-specific application instructions.",
                  "Use official requirements and prepare a practical arrival checklist.",
                ][i]
              }
            </p>
          </section>
        ))}
      </div>
    </Page>
  );
}
