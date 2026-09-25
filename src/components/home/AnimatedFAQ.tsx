"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    num: "01",
    question: "What does 1-on-1 mentorship include?",
    answer: "Complete end-to-end guidance directly with your Senior Mentor: diagnostic transcript audit, career ROI shortlisting, line-by-line SOP crafting, and consular mock interview preparation. You will never be delegated to rotating junior staff.",
  },
  {
    num: "02",
    question: "How are universities shortlisted without agency bias?",
    answer: "We accept zero recruitment commissions or kickbacks from universities. Shortlisting is driven 100% by your GPA, budget, academic pedigree, and long-term immigration or post-study work goals.",
  },
  {
    num: "03",
    question: "Do you guarantee admissions or visas?",
    answer: "No legitimate advisory can make that promise. Admissions decisions rest exclusively with university committees, and visa approvals rest with sovereign consular officers. We maximize your statistical probability through flawless preparation.",
  },
  {
    num: "04",
    question: "What if I have an education gap or a previous visa refusal?",
    answer: "A previous refusal or hiatus is systematically evaluated. We audit the refusal reason (such as 214(b) immigrant intent or financial inconsistency) and craft verifiable, documentary justifications to overturn past decisions.",
  },
];

export default function AnimatedFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#FAF7F2] text-ink py-20 sm:py-24 lg:py-32 border-b border-ink/15 relative overflow-hidden">
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
                className="glow-button inline-flex items-center gap-2.5 bg-ink text-cream hover:bg-ink/90 min-h-[48px] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all group"
              >
                <span>Read Full FAQ Document</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Motion Accordion (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-ink/15 border-t lg:border-t-0 border-b border-ink/15">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={item.num} className="py-5 sm:py-6 transition-colors">
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

                    {/* Rotating Plus Icon */}
                    <span className="p-1 rounded-none border border-ink/15 text-ink/60 group-hover:border-terra group-hover:text-terra transition-colors flex-shrink-0 mt-1">
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <Plus className="h-4 w-4" />
                      </motion.div>
                    </span>
                  </button>

                  {/* AnimatePresence Smooth Height Transition */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pl-7 sm:pl-8 text-xs sm:text-sm text-ink/75 font-light leading-relaxed">
                          <p>{item.answer}</p>
                          <div className="mt-2.5">
                            <Link
                              href="/faq"
                              className="font-mono text-[10px] uppercase tracking-wider text-terra hover:underline inline-flex items-center gap-1"
                            >
                              Explore in full FAQ archive →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
