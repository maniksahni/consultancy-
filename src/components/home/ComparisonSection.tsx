"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
      className="bg-[#14120C] text-cream py-14 sm:py-18 lg:py-24 overflow-hidden w-full relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Section header: Calibrated negative space, monumental typography ── */}
        <div className="border-t border-cream/10 pt-8 sm:pt-10 mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-6">
                The Mentorship Advantage
              </div>
              <h2 className="font-display font-normal text-cream leading-[0.88] tracking-[-0.035em] text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl">
                Why Choose Dedicated<br />
                {/* Exactly ONE terracotta accent in this entire section */}
                <span className="text-terra italic">1-on-1 Mentorship.</span>
              </h2>
            </div>
            <p className="text-cream/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              The study-abroad industry is dominated by mass-processing factories that treat students as recruitment volumes. Here is how Pathways Global differs fundamentally.
            </p>
          </div>
        </div>

        {/* ── MOBILE: Finger-Swipeable Horizontal Carousel (Protected logic preserved) ── */}
        <div className="lg:hidden pb-6">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 pb-4 scrollbar-none carousel-snap"
          >
            {/* Leading spacer for true centering */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />

            {comparisonItems.map((item, i) => (
              <div
                key={i}
                className="snap-center flex-none w-[86vw] rounded-none border border-cream/10 bg-[#14120C] p-6 flex flex-col justify-between carousel-snap-item relative"
              >
                <div>
                  <div className="border-b border-cream/10 pb-3 mb-6 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono">
                      Criterion 0{i + 1} / 05
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cream/40 font-mono">
                      Audit Factor
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-cream font-normal leading-snug mb-6">
                    {item.factor}
                  </h3>

                  {/* Mass Processing Agency */}
                  <div className="border border-cream/10 p-4 mb-4 bg-cream/[0.02]">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-cream/40 font-mono mb-2">
                      [ × ] Mass Agency Factory
                    </div>
                    <p className="text-xs text-cream/40 font-light line-through decoration-cream/30 leading-relaxed">
                      {item.agency}
                    </p>
                  </div>

                  {/* Pathways Global 1-on-1 Mentorship */}
                  <div className="border border-cream/20 p-4 bg-cream/[0.04]">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-cream font-mono mb-2">
                      [ ✓ ] Pathways Mentorship
                    </div>
                    <p className="text-xs text-cream font-normal leading-relaxed">
                      {item.pathways}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Trailing spacer */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Mobile pagination */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-2">
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
                className={`h-1 transition-all duration-300 ${
                  idx === activeMobileIndex ? "w-8 bg-cream" : "w-2 bg-cream/20 hover:bg-cream/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP DUAL SHOWCASE (Stark, Monolithic, 1px Hairlines, Rounded-none) ── */}
        <div className="hidden lg:grid lg:grid-cols-2 divide-x divide-cream/10 border border-cream/10">
          {/* Left Column: Mass-Processing Agencies */}
          <div className="p-10 lg:p-12 space-y-10">
            <div className="border-b border-cream/10 pb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono block mb-2">
                Industry Standard
              </span>
              <h3 className="font-display text-2xl text-cream/50 font-normal">
                Mass-Processing Agencies
              </h3>
            </div>

            <div className="space-y-8">
              {comparisonItems.map((item, i) => (
                <div key={i} className="border-b border-cream/10 pb-8 last:border-b-0 last:pb-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-cream/35 font-mono mb-2">
                    Criterion 0{i + 1} · {item.factor}
                  </div>
                  <p className="text-sm text-cream/40 font-light leading-relaxed line-through decoration-cream/25">
                    {item.agency}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pathways Global Mentorship */}
          <div className="p-10 lg:p-12 space-y-10 bg-cream/[0.02]">
            <div className="border-b border-cream/10 pb-6 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-cream/70 font-mono block mb-2">
                  Boutique Fiduciary Model
                </span>
                <h3 className="font-display text-2xl text-cream font-normal">
                  Pathways Global Mentorship
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60 font-mono">
                100% Unbiased
              </span>
            </div>

            <div className="space-y-8">
              {comparisonItems.map((item, i) => (
                <div key={i} className="border-b border-cream/10 pb-8 last:border-b-0 last:pb-0">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-cream/60 font-mono mb-2">
                    Criterion 0{i + 1} · {item.factor}
                  </div>
                  <p className="text-sm text-cream font-normal leading-relaxed">
                    {item.pathways}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer note: 1px hairline rule ── */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-cream/35 font-mono">
            Zero Institutional Kickbacks · 100% Student-Aligned Interests
          </div>
          <a
            href="#booking"
            className="text-[10px] uppercase tracking-[0.22em] font-medium text-cream hover:text-cream/80 border-b border-cream/30 hover:border-cream pb-1 transition-colors inline-flex items-center gap-2"
          >
            <span>Schedule Your Free Discovery Call</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
