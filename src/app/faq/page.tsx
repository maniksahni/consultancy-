import type { Metadata } from "next";
import EditorialPage from "@/components/layout/EditorialPage";
import FAQAccordion from "@/components/experience/FAQAccordion";

export const metadata: Metadata = { title: "FAQ | Study with Harshita", description: "Answers about mentorship scope, pricing, prior refusals, outcomes, and timing." };

export default function FAQPage() {
  return (
    <EditorialPage image="/images/destinations/ireland.webp" chapter="06" eyebrow="YOUR STUDY ABROAD QUESTIONS, EXPLAINED" title="Big plans." accent="Clear answers."
      intro="Explore practical guidance on applications, funding, documents, and mentorship. Find your next step with a little more confidence.">
      <FAQAccordion />
    </EditorialPage>
  );
}
