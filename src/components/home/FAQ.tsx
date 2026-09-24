"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
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
      className="bg-[#14120C] grain-ink text-cream py-16 lg:py-24 overflow-hidden w-full relative border-t border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          className="border-t border-cream/10 pt-10 mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="label text-terra mb-4">Admissions &amp; Advisory Clarity</div>
            <h2
              className="font-display font-normal text-cream leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Frequently Addressed<br />
              <em className="text-cream/50 not-italic italic">Inquiries &amp; Protocols.</em>
            </h2>
          </div>
          <p className="text-cream/45 text-sm lg:text-base font-light max-w-md leading-relaxed">
            Direct, no-fluff answers regarding our fiduciary mentorship model, transparent fee structure, and consular preparation standards.
          </p>
        </motion.div>

        {/* ── Accordion List ── */}
        <div className="max-w-4xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const itemNumber = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-cream/[0.045] border-cream/20 shadow-lg shadow-black/30"
                    : "bg-cream/[0.02] border-cream/[0.07] hover:border-cream/15 hover:bg-cream/[0.035]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-5 sm:p-6 flex items-start justify-between gap-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                    <span className="label text-terra text-xs pt-1 flex-shrink-0 font-mono">
                      {itemNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="label text-[10px] text-cream/35 tracking-wider block mb-1">
                        {faq.category}
                      </span>
                      <h3
                        className={`font-display text-lg sm:text-2xl font-normal tracking-tight transition-colors leading-snug ${
                          isOpen ? "text-cream" : "text-cream/80 group-hover:text-cream"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5 ${
                      isOpen
                        ? "border-terra bg-terra text-cream shadow-md shadow-terra/30"
                        : "border-cream/20 text-cream/60 group-hover:border-terra group-hover:text-terra bg-cream/[0.02]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
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
                      <div className="px-5 sm:px-6 pb-6 pt-1 sm:pl-16">
                        <p className="text-sm sm:text-base text-cream/65 font-light leading-relaxed border-t border-cream/[0.06] pt-4">
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

        {/* ── Direct Advisory CTA Strip ── */}
        <motion.div
          className="mt-14 max-w-4xl mx-auto rounded-2xl border border-cream/[0.1] p-6 sm:p-8 surface-elevated-dark relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Subtle accent sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-terra/40 to-transparent pointer-events-none" />

          <div className="space-y-1.5 max-w-lg relative z-10">
            <div className="flex items-center gap-2 text-terra">
              <ShieldCheck className="w-4 h-4 text-terra flex-shrink-0" />
              <span className="label text-[10px] text-terra tracking-wider">
                Uncompromising Fiduciary Advisory
              </span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-normal text-cream tracking-tight">
              Have a nuanced or high-stakes admissions inquiry?
            </h4>
            <p className="text-xs text-cream/50 font-light leading-relaxed">
              Book a direct confidential discovery session to evaluate your transcripts and study timeline.
            </p>
          </div>

          <a
            href="#booking"
            className="flex items-center justify-center gap-2 bg-terra hover:bg-terra-dark text-cream min-h-[48px] px-6 py-3 label text-xs rounded-lg transition-all btn-tactile btn-tactile-dark btn-primary-glow whitespace-nowrap relative z-10"
          >
            Schedule 1-on-1 Call
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
