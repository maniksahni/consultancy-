import type { Metadata } from "next";
import EditorialPage from "@/components/layout/EditorialPage";
import { admissionsStages } from "@/data/editorial";

export const metadata: Metadata = { title: "Admissions Process | Pathways Global", description: "The stages of profile review, shortlisting, applications, and visa preparation." };

export default function AdmissionsProcessPage() {
  return (
    <EditorialPage eyebrow="The Admissions Journey" title="A Clearer" accent="Process."
      intro="What happens at each stage, what your mentor reviews, and what you can prepare. Timing depends on your destination, deadlines, and document readiness.">
      <div className="border-t border-ink/15">
        {admissionsStages.map((stage) => (
          <article key={stage.number} className="border-b border-ink/15 py-12 lg:py-16 grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-2 font-display text-7xl lg:text-8xl leading-none text-ink/20">{stage.number}</div>
            <div className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-widest text-stone mb-4">{stage.subtitle}</p>
              <h2 className="font-display text-3xl lg:text-4xl leading-tight">{stage.title}</h2>
              <div className="border border-ink/15 bg-white p-5 mt-8">
                <p className="text-[10px] uppercase tracking-widest text-stone mb-2">Stage deliverable</p>
                <p className="text-sm">{stage.deliverable}</p>
              </div>
            </div>
            <dl className="lg:col-span-6 grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {[
                ["What happens", stage.happens],
                ["Mentor's role", stage.mentor],
                ["What to prepare", stage.student],
                ["Timing", stage.timing],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-ink/15 pt-4">
                  <dt className="text-[10px] uppercase tracking-widest text-stone mb-2">{label}</dt>
                  <dd className="text-sm text-ink/80 leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </EditorialPage>
  );
}
