"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Fiduciary Model",
    question: "How is Pathways Global different from other consultancies?",
    answer:
      "Unlike mass-market agencies and aggregator portals that operate on university recruitment commissions (kickbacks), Pathways Global is a 100% fiduciary advisory. You work exclusively with a dedicated Senior Mentor—never passed between junior telecallers or rotating interns. Every university shortlist is audited strictly against academic pedigree, career ROI, and scholarship viability, with zero institutional conflicts of interest.",
  },
  {
    category: "Mentorship Scope",
    question: "What does the 1-on-1 mentorship include?",
    answer:
      "Our advisory delivers exhaustive, end-to-end stewardship: strategic profile positioning, shortlist curation across target/reach/safe tiers, line-by-line editorial of your Statement of Purpose (SOP) and Letters of Recommendation (LORs), merit fellowship and need-based aid packaging, and exhaustive 1-on-1 consular interview preparation until your responses are confident, spontaneous, and legally sound.",
  },
  {
    category: "Investment & Terms",
    question: "How much does mentorship cost?",
    answer:
      "We operate under a transparent, flat-fee advisory agreement tailored to your destination tier and target intake. There are no hidden fees, surprise charges, or commissions taken behind your back. Because we accept zero funding from colleges, our fiduciary loyalty remains entirely with you. Exact engagement scope and deliverables are outlined during your initial discovery session.",
  },
  {
    category: "Consular Strategy",
    question: "What if my visa gets rejected or I have previous refusals?",
    answer:
      "We specialize in high-stakes case rehabilitation—including US Section 214(b) non-immigrant intent refusals, Canadian Study Permit rejections, and German APS audit bottlenecks. We conduct a rigorous line-by-line autopsy of your prior CAIPS/GCMS notes, rebuild your liquid financial proof and home-country ties evidence, and reconstruct your consular narrative prior to refiling.",
  },
  {
    category: "Integrity & Standards",
    question: "Do you guarantee admission or visa approval?",
    answer:
      "No ethical education advisor can legally guarantee admission or a sovereign visa grant—final decisions rest solely with university academic senates and consular officers. What we guarantee is a conflict-free, Ivy League/Russell Group-caliber advisory process and airtight consular preparation, which is why our candidates maintain an audited 99.2% visa approval track record.",
  },
  {
    category: "Timeline & Runway",
    question: "How long does the entire admissions process take?",
    answer:
      "The ideal preparation runway is 8 to 14 months before your target intake, maximizing priority merit scholarship windows and early university rounds. However, our mentors regularly conduct fast-track 60-to-90 day intensive sprints for upcoming intakes, prioritizing rapid document drafting and expedited visa scheduling.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-[#14120C] text-cream py-space-7 overflow-hidden w-full relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Section Header: Calibrated negative space, monumental typography ── */}
        <div className="border-t border-cream/10 pt-space-4 sm:pt-space-5 mb-space-5 lg:mb-space-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-6">
                Admissions &amp; Advisory Clarity
              </div>
              <h2 className="font-display font-normal text-cream leading-[0.88] tracking-[-0.035em] text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl">
                Frequently Addressed<br />
                {/* Exactly ONE terracotta accent in this entire section */}
                <span className="text-terra italic">Inquiries &amp; Protocols.</span>
              </h2>
            </div>
            <p className="text-cream/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              Direct, no-fluff answers regarding our fiduciary mentorship model, transparent fee structure, and consular preparation standards.
            </p>
          </div>
        </div>

        {/* ── Accordion List: Monolithic 1px Hairlines, Rounded-none, No Shadows ── */}
        <div className="border-t border-cream/10 divide-y divide-cream/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const itemNumber = String(idx + 1).padStart(2, "0");

            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full py-space-3 sm:py-space-4 flex items-start justify-between gap-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-6 sm:gap-10 flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-cream/40 font-mono pt-1.5 flex-shrink-0">
                      {itemNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-cream/35 font-mono block mb-2">
                        {faq.category}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-normal text-cream leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className="pt-2 text-cream/40 group-hover:text-cream transition-colors flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-cream" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-space-4 pt-space-2 pl-0 sm:pl-16 lg:pl-20 max-w-4xl">
                        <p className="text-sm sm:text-base text-cream/70 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Direct Advisory CTA Strip: Flat, High-Contrast ── */}
        <div className="mt-space-5 sm:mt-space-6 border border-cream/10 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 rounded-none bg-cream/[0.02]">
          <div className="max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-2">
              Uncompromising Fiduciary Advisory
            </div>
            <h4 className="font-display text-2xl sm:text-3xl font-normal text-cream leading-tight">
              Have a nuanced or high-stakes admissions inquiry?
            </h4>
            <p className="text-cream/65 text-sm sm:text-base mt-2 font-light">
              Book a direct confidential discovery session to evaluate your transcripts and study timeline.
            </p>
          </div>

          <a
            href="#booking"
            className="flex-shrink-0 w-full sm:w-auto bg-cream text-ink hover:bg-cream/90 px-8 py-5 rounded-none text-[11px] uppercase tracking-[0.22em] font-medium text-center transition-colors inline-flex items-center justify-center gap-3 whitespace-nowrap"
          >
            <span>Schedule 1-on-1 Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
