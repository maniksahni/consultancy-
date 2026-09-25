import type { Metadata } from "next";
import EditorialPage from "@/components/layout/EditorialPage";
import { studentOutcomes } from "@/data/editorial";

export const metadata: Metadata = { title: "Student Outcomes | Pathways Global", description: "Existing student case files, recorded with initials only." };

export default function OutcomesPage() {
  return (
    <EditorialPage eyebrow="Documented Admissions Records" title="Student" accent="Outcomes."
      intro="Initials-only case files with the recorded profile and outcome details. Individual results do not predict future decisions.">
      <div className="grid lg:grid-cols-2 gap-8">
        {studentOutcomes.map((item, i) => (
          <article key={item.ref} className="border border-ink/15 bg-white p-6 sm:p-8">
            <div className="border-b border-ink/15 pb-5 mb-8 flex items-start justify-between gap-4">
              <p className="text-[10px] uppercase tracking-widest text-stone">Case file {String(i + 1).padStart(3, "0")} · {item.ref}</p>
              <p className="text-[10px] uppercase tracking-widest text-stone text-right">{item.country} · {item.intake}</p>
            </div>
            <h2 className="font-display text-4xl">Candidate {item.initials}</h2>
            <p className="font-display text-2xl mt-5">{item.university}</p>
            <p className="text-sm text-stone mt-1">{item.program}</p>
            <p className="text-sm text-ink/75 leading-relaxed mt-8">{item.narrative}</p>
            <div className="border-t border-b border-ink/15 py-4 mt-8">
              <p className="text-[10px] uppercase tracking-widest text-stone mb-2">Recorded profile</p>
              <p className="text-sm">{item.stats}</p>
            </div>
            <div className="bg-cream border border-ink/15 p-5 mt-6">
              <p className="text-[10px] uppercase tracking-widest text-stone mb-2">Recorded outcome</p>
              <p className="text-sm font-medium">{item.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </EditorialPage>
  );
}
