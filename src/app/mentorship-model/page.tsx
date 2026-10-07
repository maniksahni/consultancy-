import type { Metadata } from "next";
import EditorialPage from "@/components/layout/EditorialPage";
import { comparisonCriteria } from "@/data/editorial";

export const metadata: Metadata = { title: "Mentorship Model | Pathways Global", description: "How direct mentorship changes university shortlisting, applications, visa preparation, and communication." };

export default function MentorshipModelPage() {
  return (
    <EditorialPage eyebrow="The Mentorship Advantage" title="Mass Processing." accent="Personal Mentorship."
      intro="See how the mentorship approach affects the decisions and work a student encounters throughout an application.">
      <div className="border-t border-ink/15">
        {comparisonCriteria.map((item, i) => (
          <article key={item.factor} className="border-b border-ink/15 py-12 lg:py-16 grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-1 font-display text-5xl text-ink/25">{String(i + 1).padStart(2, "0")}</div>
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl lg:text-4xl leading-tight">{item.factor}</h2>
              <p className="mt-4 text-sm text-stone leading-relaxed">{item.detail}</p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="border-t border-ink/15 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-stone mb-3">Mass processing</p>
                <p className="text-sm text-stone leading-relaxed">{item.agency}</p>
              </div>
              <div className="border-t border-ink/40 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-ink mb-3">Pathways mentorship</p>
                <p className="text-sm text-ink leading-relaxed">{item.pathways}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </EditorialPage>
  );
}
