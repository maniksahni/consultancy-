"use client";
import JsonLd from "@/components/seo/JsonLd";
import { useState } from "react";
import { faqs } from "@/data/france";
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer } })) }} />
      {faqs.map(([q, a], i) => (
        <div key={q} className="faq-item">
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {q}
              <span aria-hidden="true">{open === i ? "−" : "+"}</span>
            </button>
          </h3>
          <div id={`faq-${i}`} hidden={open !== i}>
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
