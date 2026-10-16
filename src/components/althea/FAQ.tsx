"use client";
import { faqs } from "@/data/france";
import Accordion from "@/components/maison/Accordion";

export default function FAQ() {
  return <Accordion idPrefix="faq-answer" items={faqs.map(([q, a]) => ({ q, a: <p>{a}</p> }))} />;
}
