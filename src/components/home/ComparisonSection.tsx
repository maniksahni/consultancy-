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
                className="snap-center flex-none w-[86vw] rounded-2xl border border-cream/[0.08] bg-gradient-to-b from-cream/[0.06] to-cream/[0.02] p-5 flex flex-col justify-between card-hover-dark carousel-snap-item relative shadow-[0_14px_36px_-8px_rgba(0,0,0,0.45)]"
              >
                <div>
                  {/* Factor Header */}
                  <div className="border-b border-cream/[0.08] pb-3 mb-4 flex items-center justify-between">
                    <span className="label text-[10px] text-cream/40">
                      Criterion 0{i + 1} / 05
                    </span>
                    <span className="label text-[9px] text-terra tracking-widest">
                      Audit Factor
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-cream font-normal leading-snug mb-4">
                    {item.factor}
                  </h3>

                  {/* Mass Processing Agency Box */}
                  <div className="rounded-xl border border-cream/[0.06] bg-cream/[0.02] p-4 mb-3">
                    <div className="flex items-center gap-2 label text-[9px] text-cream/40 mb-2">
                      <div className="h-4 w-4 rounded border border-cream/20 flex items-center justify-center flex-shrink-0">
                        <X className="h-2.5 w-2.5 text-cream/40" />
                      </div>
                      <span>Mass Agency Factory</span>
                    </div>
                    <p className="text-xs text-cream/40 font-light line-through decoration-cream/25 leading-relaxed pl-6">
                      {item.agency}
                    </p>
                  </div>

                  {/* Pathways Global 1-on-1 Mentorship Box */}
                  <div className="rounded-xl border border-terra/25 bg-gradient-to-b from-terra/[0.09] to-cream/[0.03] p-4 shadow-[0_4px_16px_-2px_rgba(194,91,26,0.12)]">
                    <div className="flex items-center gap-2 label text-[9px] text-terra mb-2 font-medium">
                      <div className="h-4 w-4 rounded border border-terra/50 bg-terra/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-terra" />
                      </div>
                      <span>Pathways 1-on-1 Mentorship</span>
                    </div>
                    <p className="text-xs text-cream/95 font-medium leading-relaxed pl-6">
                      {item.pathways}
                    </p>
                  </div>
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

        {/* ── DESKTOP DUAL SHOWCASE (Elevated Boutique Cards, No Spreadsheet Look) ── */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          {/* Left: Mass Agencies (Sunken, Understated Card) */}
          <div className="rounded-2xl p-8 bg-cream/[0.02] border border-cream/[0.06] backdrop-blur-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-cream/[0.06]">
                <div className="h-8 w-8 rounded-lg border border-cream/15 bg-cream/[0.03] flex items-center justify-center flex-shrink-0">
                  <X className="h-4 w-4 text-cream/40" />
                </div>
                <div>
                  <span className="label text-cream/40 text-[10px] tracking-wider block">Industry Standard</span>
                  <span className="font-display text-xl text-cream/65">Mass-Processing Agencies</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-6 pt-6">
                {comparisonItems.map((item, i) => (
                  <div key={i} className="pb-6 border-b border-cream/[0.05] last:border-b-0 last:pb-0">
                    <div className="label text-cream/30 text-[9px] mb-2 tracking-wider">
                      Criterion 0{i + 1} · {item.factor}
                    </div>
                    <p className="text-sm text-cream/35 leading-relaxed font-light line-through decoration-cream/20">
                      {item.agency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pathways Global (Elevated Hero Card with Top Glow) */}
          <div className="rounded-2xl p-8 bg-gradient-to-b from-cream/[0.075] via-cream/[0.035] to-cream/[0.015] border border-cream/[0.12] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] relative overflow-hidden backdrop-blur-md flex flex-col justify-between">
            {/* Top Amber Sheen */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-terra/50 to-transparent pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-cream/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg border border-terra/40 bg-terra/15 flex items-center justify-center flex-shrink-0 shadow-[0_2px_12px_rgba(194,91,26,0.25)]">
                    <Check className="h-4 w-4 text-terra" />
                  </div>
                  <div>
                    <span className="label text-terra text-[10px] tracking-wider block">Boutique Fiduciary Model</span>
                    <span className="font-display text-xl text-cream">Pathways Global Mentorship</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-terra/30 bg-terra/10 px-3 py-1 text-terra label text-[9px]">
                  <ShieldCheck className="h-3 w-3" />
                  100% Unbiased
                </div>
              </div>

              {/* Items */}
              <div className="space-y-6 pt-6">
                {comparisonItems.map((item, i) => (
                  <div key={i} className="pb-6 border-b border-cream/[0.07] last:border-b-0 last:pb-0 group">
                    <div className="label text-terra/80 text-[9px] mb-2 tracking-wider">
                      Criterion 0{i + 1} · {item.factor}
                    </div>
                    <p className="text-sm text-cream/90 leading-relaxed font-normal">
                      {item.pathways}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
