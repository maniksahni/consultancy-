"use client";
import { useState } from "react";
import { faqs } from "@/data/faqs";
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
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
            {i === 0 && (
              <a href="https://www.inde.campusfrance.org/">
                Visit Campus France India ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
