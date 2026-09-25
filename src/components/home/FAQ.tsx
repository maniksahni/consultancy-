import EditorialTeaser from "./EditorialTeaser";
import { faqItems } from "@/data/editorial";

export default function FAQ() {
  return <EditorialTeaser id="faq" dark eyebrow="Admissions & Advisory Clarity" title="Your Questions." accent="Clear Answers."
    intro="Understand mentorship scope, fees, previous visa refusals, and the decisions that remain with universities and visa authorities."
    href="/faq" linkLabel="Read the full FAQ"
    highlights={[faqItems[1], faqItems[2], faqItems[4]].map((item, i) => ({ heading: item.question, number: ["02", "03", "05"][i] }))} />;
}
