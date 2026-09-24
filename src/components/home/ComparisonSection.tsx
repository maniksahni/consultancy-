"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check, ShieldCheck, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const comparisonItems = [
  {
    factor: "Admissions Counselor Assigned",
    agency: "Passed between unvetted telecallers and rotating sales reps",
    pathways: "Single dedicated Senior Mentor managing your entire journey",
  },
  {
    factor: "University Recommendations",
    agency: "Partner colleges selected for recruiter commission kickbacks",
    pathways: "100% unbiased shortlisting based on your academic ROI & goals",
  },
  {
    factor: "SOP & LOR Editorial Quality",
    agency: "Generic templates and ChatGPT drafts flagged by AI screeners",
    pathways: "Line-by-line narrative crafting highlighting your unique story",
  },
  {
    factor: "Consular Visa Preparation",
    agency: "A generic PDF checklist sent right before your appointment",
    pathways: "1-on-1 mock consular grilling until your answers are bulletproof",
  },
  {
    factor: "Communication & Accountability",
    agency: "Slow ticketing systems and ghosting post-payment",
    pathways: "Direct WhatsApp line, strategy calls, and weekly check-ins",
  },
];

export default function ComparisonSection() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
    const index = Math.round(container.scrollLeft / (cardWidth + 14));
    const nextIndex = Math.min(Math.max(index, 0), comparisonItems.length - 1);
    setActiveMobileIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
  };

  return (
    <section
      id="comparison"
      className="bg-[#14120C] grain-ink py-20 lg:py-28 overflow-hidden w-full relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          className="border-t border-cream/[0.12] pt-10 mb-10 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="label text-cream/55 mb-4">The Mentorship Advantage</div>
            <h2
              className="font-display font-normal text-cream leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
            >
              Why Choose Dedicated<br />
              <em className="text-terra">1-on-1 Mentorship</em>
            </h2>
          </div>
          <p className="text-cream/65 text-sm leading-relaxed max-w-full sm:max-w-sm font-light">
            The study-abroad industry is dominated by mass-processing factories that treat students as recruitment volumes. Here is how Pathways Global differs fundamentally.
          </p>
        </motion.div>

        {/* ── MOBILE: Finger-Swipeable Horizontal Carousel (No Arrows, Peek Reveal) ── */}
        <div className="lg:hidden">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 -mx-6 pb-2 scrollbar-none carousel-snap"
          >
            {/* Leading spacer for true centering of first card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />

            {comparisonItems.map((item, i) => (
              <div
                key={i}
                className="snap-center flex-none w-[86vw] rounded-lg border border-cream/[0.12] bg-gradient-to-br from-cream/[0.055] to-cream/[0.025] p-6 sm:p-7 flex flex-col justify-between shadow-[0_16px_38px_rgba(0,0,0,0.24)] card-hover-dark carousel-snap-item relative"
              >
                <div>
                  {/* Factor Header */}
                  <div className="border-b border-cream/10 pb-3 mb-4 flex items-center justify-between">
                    <span className="label text-[10px] text-cream/60">
                      Criterion 0{i + 1} / 05
                    </span>
                    <span className="label text-[10px] text-terra">Compare</span>
                  </div>

                  <h3 className="font-display text-2xl text-cream font-normal leading-tight mb-4">
                    {item.factor}
                  </h3>

                  {/* Mass Processing Agency Box */}
                  <div className="rounded-md border border-cream/[0.10] bg-cream/[0.035] p-4 mb-4">
                    <div className="flex items-center gap-1.5 label text-[9px] text-cream/60 mb-2">
                      <X className="h-3 w-3 text-cream/50" />
                      <span>Mass Agency Factory</span>
                    </div>
                    <p className="text-xs text-cream/65 font-light line-through decoration-cream/25 leading-relaxed">
                      {item.agency}
                    </p>
                  </div>

                  {/* Pathways Global 1-on-1 Mentorship Box */}
                  <div className="rounded-md border border-terra/[0.24] bg-gradient-to-br from-terra/[0.11] to-terra/[0.045] p-4">
                    <div className="flex items-center gap-1.5 label text-[9px] text-terra mb-2">
                      <Check className="h-3 w-3 text-terra" />
                      <span>Pathways Global Mentorship</span>
                    </div>
                    <p className="text-xs text-cream font-medium leading-relaxed">
                      {item.pathways}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-cream/8 flex items-center justify-between text-[10px] label text-cream/25">
                  <span>Swipe to compare next criterion</span>
                  <span className="text-terra">Swipe →</span>
                </div>
              </div>
            ))}
            {/* Trailing spacer for true centering of last card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Dot pagination indicator with smooth width-expand */}
          <div className="flex items-center justify-center gap-1.5 pt-4 pb-6">
            {comparisonItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!carouselRef.current) return;
                  const container = carouselRef.current;
                  const card = container.querySelector('.carousel-snap-item') as HTMLElement;
                  const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
                  container.scrollTo({ left: idx * (cardWidth + 14), behavior: "smooth" });
                }}
                aria-label={`Go to comparison ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  idx === activeMobileIndex ? "w-6 bg-terra" : "w-1.5 bg-cream/20 hover:bg-cream/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP SPLIT PANEL (hidden on mobile) ── */}
        <motion.div
          className="hidden lg:block rounded-lg border border-cream/[0.12] bg-gradient-to-br from-cream/[0.025] to-transparent overflow-hidden shadow-[0_18px_42px_rgba(0,0,0,0.16)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1px_1fr] border-b border-cream/[0.10]">
            {/* Left header */}
            <div className="flex items-center gap-2.5 px-8 py-6 bg-cream/[0.035]">
              <div className="h-5 w-5 rounded-sm border border-cream/[0.16] bg-cream/[0.035] flex items-center justify-center flex-shrink-0">
                <X className="h-3 w-3 text-cream/30" />
              </div>
              <span className="label text-cream/50">Mass Processing Agencies</span>
            </div>
            {/* Divider */}
            <div className="bg-cream/10" />
            {/* Right header */}
            <div className="flex items-center gap-2.5 px-8 py-6 bg-terra/[0.045]">
              <div className="h-5 w-5 rounded-sm border border-terra/[0.35] bg-terra/[0.09] flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-terra" />
              </div>
              <span className="label text-terra">Pathways Global 1-on-1 Mentorship</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1px_1fr] border-b border-cream/[0.08] last:border-b-0 hover:bg-cream/[0.02] transition-colors"
            >
              {/* Left: Agency */}
              <div className="px-8 py-7 bg-cream/[0.02]">
                <div className="label text-cream/55 mb-3">{item.factor}</div>
                <p className="text-sm text-cream/65 leading-relaxed font-light line-through decoration-cream/15">
                  {item.agency}
                </p>
              </div>
              {/* Vertical divider */}
              <div className="bg-cream/10" />
              {/* Right: Pathways */}
              <div className="px-8 py-7 bg-terra/[0.025]">
                <div className="label text-cream/30 mb-3 opacity-0">{item.factor}</div>
                <p className="text-sm text-cream/85 leading-relaxed font-medium">
                  {item.pathways}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Footer note ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 sm:pb-0">
          <div className="flex items-center gap-2 text-cream/25 text-xs">
            <ShieldCheck className="h-4 w-4 text-cream/20 flex-shrink-0" />
            <span>Zero Institutional Kickbacks · 100% Student-Aligned Interests</span>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-1.5 text-terra text-sm border-b border-terra/35 hover:border-terra pb-0.5 transition-all group btn-tactile max-w-[calc(100%-60px)]"
          >
            Schedule Your Free Discovery Call
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
