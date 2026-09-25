import type { Metadata } from "next";
import EditorialPage from "@/components/layout/EditorialPage";
import { faqItems } from "@/data/editorial";

export const metadata: Metadata = { title: "FAQ | Pathways Global", description: "Answers about mentorship scope, pricing, prior refusals, outcomes, and timing." };

export default function FAQPage() {
  return (
    <EditorialPage eyebrow="Admissions & Advisory Clarity" title="Questions &" accent="Answers."
      intro="Practical answers about the mentorship service and the decisions that remain with universities and visa authorities.">
      <div className="border-t border-ink/15">
        {faqItems.map((item, i) => (
          <article key={item.question} className="border-b border-ink/15 py-10 lg:py-12 grid lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-1 font-display text-4xl text-ink/25">{String(i + 1).padStart(2, "0")}</div>
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-widest text-stone mb-3">{item.category}</p>
              <h2 className="font-display text-3xl leading-tight">{item.question}</h2>
            </div>
            <p className="lg:col-span-6 text-sm sm:text-base text-ink/75 font-light leading-relaxed">{item.answer}</p>
          </article>
        ))}
      </div>
    </EditorialPage>
  );
}
