import type { Metadata } from "next";
import EditorialPage from "@/components/layout/EditorialPage";
import FAQAccordion from "@/components/experience/FAQAccordion";

export const metadata: Metadata = { title: "FAQ | Pathways Global", description: "Answers about mentorship scope, pricing, prior refusals, outcomes, and timing." };

export default function FAQPage() {
  return (
    <EditorialPage eyebrow="Admissions & Advisory Clarity" title="Questions &" accent="Answers."
      intro="Practical answers about the mentorship service and the decisions that remain with universities and visa authorities.">
      <FAQAccordion />
    </EditorialPage>
  );
}
