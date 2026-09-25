"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, UserCheck, Sparkles, FileCheck } from "lucide-react";
import ComparisonSpotlight from "@/components/experience/ComparisonSpotlight";

const PANELS = [
  {
    num: "01",
    icon: UserCheck,
    title: "Single Dedicated Senior Mentor",
    contrast: "No Rotating Call-Centers",
    desc: "You work directly with one senior mentor from transcript diagnosis to consular clearance. No handoffs to junior sales telecallers or outsourced teams.",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Zero Institutional Kickbacks",
    contrast: "100% Fiduciary Shortlisting",
    desc: "We accept zero recruiter commissions from partner colleges. Your university matrix is selected purely for academic pedigree, budget, and long-term career ROI.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Line-by-Line Narrative Crafting",
    contrast: "Zero AI Templates",
    desc: "Bespoke, human editorial feedback on your SOPs, CV, and letters of recommendation. No generic ChatGPT drafts that trigger admissions committee screeners.",
  },
  {
    num: "04",
    icon: FileCheck,
    title: "Consular Visa Mock Grilling",
    contrast: "Bulletproof Embassy Dossiers",
    desc: "Rigorous 1-on-1 interview simulations testing financial proof clarity, study rationale, and genuine intent to overcome even prior refusal risks.",
  },
];

// Duplicate slides 3 times (12 items) so Embla loop: true has abundant buffer on both sides,
// completely eliminating any blank void or gaps during fast drags or wide screens.
const SLIDES = [...PANELS, ...PANELS, ...PANELS];

export default function DifferenceGrid() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [WheelGesturesPlugin()]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToDot = useCallback(
    (targetDotIndex: number) => {
      if (!emblaApi) return;
      const current = emblaApi.selectedScrollSnap();
      const currentDot = ((current % PANELS.length) + PANELS.length) % PANELS.length;
      let diff = targetDotIndex - currentDot;
      if (diff > PANELS.length / 2) diff -= PANELS.length;
      if (diff < -PANELS.length / 2) diff += PANELS.length;
      emblaApi.scrollTo(current + diff);
    },
    [emblaApi]
  );

  // Keyboard navigation support when focused
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  const activeDot = ((selectedIndex % PANELS.length) + PANELS.length) % PANELS.length;

  return (
    <section id="comparison" className="bg-[#F2EDE4] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15 relative overflow-hidden w-full">
      <ComparisonSpotlight />
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end pb-12 sm:pb-16 border-b border-ink/15">
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-4">
              The Advisory Difference
            </span>
            <h2 data-reveal-heading className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Not Another<br />
              Admissions Agency.<br />
              <span className="text-terra italic inline-block pr-1">A Private Advisory Model.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-base sm:text-lg text-ink/75 font-light leading-relaxed">
              Traditional consultancies operate on mass sales and recruiter commissions, passing candidates between telecallers. We operate on a boutique fiduciary standard.
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <Link
                href="/mentorship-model"
                className="inline-flex items-center gap-2 border-b border-ink/40 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-ink hover:text-terra hover:border-terra transition-colors group"
              >
                <span>Read Full Mentorship Doctrine</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Desktop Navigation Arrows */}
              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Previous difference card"
                  className="h-10 w-10 border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream text-ink flex items-center justify-center transition-colors rounded-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Next difference card"
                  className="h-10 w-10 border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream text-ink flex items-center justify-center transition-colors rounded-none"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Touch-Swipeable Sliding Card Carousel (Infinite Loop) ── */}
        <div className="w-full overflow-hidden mt-10 sm:mt-12">
          <div
            className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-terra/40"
            ref={emblaRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="The Advisory Difference Criterion Cards"
            onKeyDown={onKeyDown}
          >
            <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 touch-pan-y">
              {SLIDES.map((panel, idx) => {
                const Icon = panel.icon;

                return (
                  <div
                    key={`${panel.num}-${idx}`}
                    className="flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-[0_0_31.5%] pl-4 sm:pl-5 lg:pl-6 min-w-0"
                  >
                    <div
                      className="bg-[#FAF7F2] border border-ink/15 p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-300 h-full min-h-[360px] sm:min-h-[390px] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(194,91,26,0.25),0_20px_70px_rgba(194,91,26,0.10)]"
                    >
                      <div>
                        {/* Top Bar with Big Editorial Number */}
                        <div className="flex items-center justify-between pb-5 border-b border-ink/10 mb-5">
                          <span className="font-display text-4xl sm:text-5xl text-ink/30 group-hover:text-terra transition-colors">
                            {panel.num}
                          </span>
                          <div className="h-9 w-9 rounded-none border border-ink/15 bg-white flex items-center justify-center text-ink/60 group-hover:border-terra group-hover:text-terra transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>

                        {/* Contrast Tag */}
                        <div className="inline-block px-2.5 py-0.5 bg-ink/[0.04] border border-ink/10 font-mono text-[9px] uppercase tracking-wider text-ink/60 mb-3">
                          {panel.contrast}
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal leading-snug">
                          {panel.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-ink/70 font-light leading-relaxed mt-3">
                          {panel.desc}
                        </p>
                      </div>

                      {/* Subtle Terracotta Bottom Glow Accent */}
                      <div className="pt-6 mt-6 border-t border-ink/10 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-ink/40 group-hover:text-terra transition-colors">
                        <span>Advisory Standard</span>
                        <span>Verified →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Tappable Pagination Dots Indicator (Maps 1-to-1 to 4 unique items) ── */}
          <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8">
            {PANELS.map((panel, idx) => (
              <button
                key={panel.num}
                type="button"
                onClick={() => scrollToDot(idx)}
                aria-label={`Jump to difference item ${panel.num}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === activeDot
                    ? "w-7 bg-terra"
                    : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
