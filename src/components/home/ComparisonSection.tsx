"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const comparisonItems = [
  {
    factor: "Admissions Counselor Assigned",
    agency: "Passed between unvetted telecallers, junior interns, and rotating sales reps",
    pathways: "Single dedicated Senior Mentor who personally manages your entire journey",
  },
  {
    factor: "University Recommendations",
    agency: "Pushing partner colleges that pay high recruiter commissions (kickbacks)",
    pathways: "100% unbiased shortlisting based strictly on your academic ROI & career goals",
  },
  {
    factor: "SOP & LOR Editorial Quality",
    agency: "Generic templates & copied ChatGPT drafts flagged by university AI screeners",
    pathways: "Line-by-line narrative crafting highlighting your unique accomplishments & grit",
  },
  {
    factor: "Consular Visa Preparation",
    agency: "A 10-minute generic PDF checklist right before your appointment",
    pathways: "Rigorous 1-on-1 mock consular grilling until your responses are confident & bulletproof",
  },
  {
    factor: "Communication & Accountability",
    agency: "Bureaucratic ticketing systems, slow replies, and ghosting post-payment",
    pathways: "Direct WhatsApp line, scheduled strategy calls, and proactive weekly check-ins",
  },
];

export default function ComparisonSection() {
  const [activeFactorIndex, setActiveFactorIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"pathways" | "agency">("pathways");

  const currentItem = comparisonItems[activeFactorIndex];

  return (
    <section
      id="comparison"
      className="bg-[#14120C] py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="border-t border-cream/10 pt-10 mb-10 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="label text-cream/35 mb-4">The Mentorship Advantage</div>
            <h2
              className="font-display font-normal text-cream leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
            >
              Why Choose Dedicated<br />
              <em className="text-terra">1-on-1 Mentorship</em>
            </h2>
          </div>
          <p className="text-cream/40 text-sm leading-relaxed max-w-sm font-light">
            The study-abroad industry is dominated by mass-processing factories that treat students as recruitment volumes. Here is how Pathways Global differs fundamentally.
          </p>
        </motion.div>

        {/* ── MOBILE INTERACTIVE TOGGLE CARD (hidden on desktop) ── */}
        <div className="lg:hidden space-y-4">
          {/* Factor Stepper */}
          <div className="flex items-center justify-between border-b border-cream/10 pb-3">
            <div className="label text-[11px] text-cream/45">
              Criterion <span className="text-terra font-semibold">{activeFactorIndex + 1}</span> of {comparisonItems.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveFactorIndex((prev) =>
                    prev > 0 ? prev - 1 : comparisonItems.length - 1
                  )
                }
                className="p-2 border border-cream/15 text-cream/70 hover:text-cream active:scale-95 transition-all"
                aria-label="Previous Factor"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveFactorIndex((prev) =>
                    prev < comparisonItems.length - 1 ? prev + 1 : 0
                  )
                }
                className="p-2 border border-cream/15 text-cream/70 hover:text-cream active:scale-95 transition-all"
                aria-label="Next Factor"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Factor Heading */}
          <div>
            <h3 className="font-display text-2xl text-cream font-normal leading-tight">
              {currentItem.factor}
            </h3>
          </div>

          {/* Segmented Toggle Control */}
          <div className="grid grid-cols-2 p-1 border border-cream/15 bg-cream/[0.03]">
            <button
              type="button"
              onClick={() => setViewMode("agency")}
              className={`py-3 px-3 label text-[10px] flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
                viewMode === "agency"
                  ? "bg-cream/10 text-cream/90 shadow-sm border border-cream/20"
                  : "text-cream/40 hover:text-cream/70"
              }`}
            >
              <X className="h-3.5 w-3.5 text-red-400" />
              Mass Agency
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pathways")}
              className={`py-3 px-3 label text-[10px] flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
                viewMode === "pathways"
                  ? "bg-terra text-cream shadow-sm"
                  : "text-cream/40 hover:text-cream/70"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              Pathways Global
            </button>
          </div>

          {/* Comparison Card Content with Flip Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFactorIndex}-${viewMode}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`p-6 border min-h-[190px] flex flex-col justify-between ${
                viewMode === "pathways"
                  ? "border-terra/40 bg-terra/[0.05]"
                  : "border-cream/15 bg-cream/[0.02]"
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {viewMode === "pathways" ? (
                    <>
                      <div className="h-5 w-5 bg-terra/20 border border-terra flex items-center justify-center">
                        <Check className="h-3 w-3 text-terra" />
                      </div>
                      <span className="label text-[10px] text-terra">Fiduciary 1-on-1 Mentorship</span>
                    </>
                  ) : (
                    <>
                      <div className="h-5 w-5 bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <X className="h-3 w-3 text-red-400" />
                      </div>
                      <span className="label text-[10px] text-cream/40">Mass Processing Factory</span>
                    </>
                  )}
                </div>

                <p
                  className={`text-base leading-relaxed ${
                    viewMode === "pathways"
                      ? "text-cream font-medium"
                      : "text-cream/40 font-light line-through decoration-cream/25"
                  }`}
                >
                  {viewMode === "pathways" ? currentItem.pathways : currentItem.agency}
                </p>
              </div>

              {/* Tap to flip trigger */}
              <button
                type="button"
                onClick={() =>
                  setViewMode((curr) => (curr === "pathways" ? "agency" : "pathways"))
                }
                className="text-left text-[11px] label text-cream/40 hover:text-terra pt-4 mt-3 border-t border-cream/8 flex items-center justify-between min-h-[44px]"
              >
                <span>
                  Tap to view: {viewMode === "pathways" ? "Agency Alternative" : "Pathways Advantage"}
                </span>
                <span className="text-terra">⇄ Flip Card</span>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Factor Pagination Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {comparisonItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFactorIndex(idx)}
                aria-label={`Go to criterion ${idx + 1}`}
                className={`h-1.5 transition-all ${
                  idx === activeFactorIndex ? "w-6 bg-terra" : "w-1.5 bg-cream/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP SPLIT PANEL (hidden on mobile) ── */}
        <motion.div
          className="hidden lg:block border border-cream/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1px_1fr] border-b border-cream/10">
            {/* Left header */}
            <div className="flex items-center gap-2.5 px-6 py-5 bg-cream/[0.02]">
              <div className="h-5 w-5 border border-cream/20 flex items-center justify-center flex-shrink-0">
                <X className="h-3 w-3 text-cream/30" />
              </div>
              <span className="label text-cream/30">Mass Processing Agencies</span>
            </div>
            {/* Divider */}
            <div className="bg-cream/10" />
            {/* Right header */}
            <div className="flex items-center gap-2.5 px-6 py-5">
              <div className="h-5 w-5 border border-terra/50 bg-terra/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-terra" />
              </div>
              <span className="label text-terra">Pathways Global 1-on-1 Mentorship</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1px_1fr] border-b border-cream/8 last:border-b-0"
            >
              {/* Left: Agency */}
              <div className="px-6 py-6 bg-cream/[0.015]">
                <div className="label text-cream/20 mb-3">{item.factor}</div>
                <p className="text-sm text-cream/30 leading-relaxed font-light line-through decoration-cream/15">
                  {item.agency}
                </p>
              </div>
              {/* Vertical divider */}
              <div className="bg-cream/10" />
              {/* Right: Pathways */}
              <div className="px-6 py-6">
                <div className="label text-cream/30 mb-3 opacity-0">{item.factor}</div>
                <p className="text-sm text-cream/85 leading-relaxed font-medium">
                  {item.pathways}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Footer note ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-cream/25 text-xs">
            <ShieldCheck className="h-4 w-4 text-cream/20 flex-shrink-0" />
            <span>Zero Institutional Kickbacks · 100% Student-Aligned Interests</span>
          </div>
          <a
            href="#booking"
            className="text-terra text-sm border-b border-terra/35 hover:border-terra pb-0.5 transition-colors"
          >
            Schedule Your Free Discovery Call →
          </a>
        </div>

      </div>
    </section>
  );
}
