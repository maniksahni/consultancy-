"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const FAQ_PREVIEWS = [
  {
    num: "01",
    question: "What does 1-on-1 mentorship include?",
    answer: "Complete end-to-end guidance from your single Senior Mentor: diagnostic transcript audit, career ROI shortlisting, line-by-line SOP crafting, and consular mock interview preparation.",
  },
  {
    num: "02",
    question: "How are universities shortlisted without agency bias?",
    answer: "We receive zero commissions or kickbacks from universities. Shortlisting is driven 100% by your GPA, budget, academic pedigree, and long-term immigration or post-study work goals.",
  },
  {
    num: "03",
    question: "Do you guarantee admissions or visas?",
    answer: "No legitimate consultancy can. Admissions decisions rest exclusively with university committees, and visa approvals rest with sovereign consular officers. We maximize your statistical probability through flawless preparation.",
  },
];

export default function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#FAF7F2] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: Heading, Narrative & CTA (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-4">
                Transparency &amp; Clarifications
              </span>
              <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
                Questions Before<br />
                <span className="text-terra italic inline-block pr-1">You Begin?</span>
              </h2>
              <p className="text-sm sm:text-base text-ink/70 font-light leading-relaxed mt-5 sm:mt-6 max-w-md">
                Clear answers regarding our fiduciary standard, fee structure, shortlisting independence, and consular preparation protocols.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-ink/15">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2.5 bg-ink text-cream hover:bg-ink/90 min-h-[48px] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors group"
              >
                <span>Read Full FAQ Document</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT: 3 Compact FAQ Preview Rows (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-ink/15 border-t lg:border-t-0 border-b border-ink/15">
            {FAQ_PREVIEWS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={item.num} className="py-5 sm:py-6">
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 group focus:outline-none"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                      <span className="font-mono text-xs text-ink/35 mt-1 flex-shrink-0 group-hover:text-terra transition-colors">
                        {item.num}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-ink font-normal leading-snug group-hover:text-terra transition-colors">
                        {item.question}
                      </h3>
                    </div>
                    <span className="p-1 rounded-none border border-ink/15 text-ink/60 group-hover:border-ink transition-colors flex-shrink-0 mt-1">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-terra" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {/* Expandable answer preview */}
                  {isOpen && (
                    <div className="mt-3 pl-7 sm:pl-8 text-xs sm:text-sm text-ink/75 font-light leading-relaxed animate-fade-in">
                      <p>{item.answer}</p>
                      <div className="mt-2.5">
                        <Link
                          href="/faq"
                          className="font-mono text-[10px] uppercase tracking-wider text-terra hover:underline inline-flex items-center gap-1"
                        >
                          Detailed breakdown in FAQ →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
