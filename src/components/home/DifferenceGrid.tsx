"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, UserCheck, Sparkles, FileCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ComparisonSpotlight from "@/components/experience/ComparisonSpotlight";

interface VerificationDetails {
  title: string;
  summary: string;
  checks: string[];
  note: string;
}

interface PanelItem {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  contrast: string;
  desc: string;
  verification: VerificationDetails;
}

const PANELS: PanelItem[] = [
  {
    num: "01",
    icon: UserCheck,
    title: "Single Dedicated Senior Mentor",
    contrast: "No Rotating Call-Centers",
    desc: "You work directly with one senior mentor from transcript diagnosis to consular clearance. No handoffs to junior sales telecallers or outsourced teams.",
    verification: {
      title: "Single-Mentor Continuity",
      summary: "The student works with the same primary mentor across major advisory stages instead of being repeatedly transferred between unrelated counsellors.",
      checks: [
        "Profile review is handled within the same mentorship relationship",
        "University strategy remains attached to the student's original profile assessment",
        "Application and visa-preparation context is retained across stages",
        "Students are informed if specialist input is required",
      ],
      note: "Specialist or administrative support may still be used where necessary, but the advisory relationship should remain continuous.",
    },
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Zero Institutional Kickbacks",
    contrast: "100% Fiduciary Shortlisting",
    desc: "We accept zero recruiter commissions from partner colleges. Your university matrix is selected purely for academic pedigree, budget, and long-term career ROI.",
    verification: {
      title: "Independent University Shortlisting",
      summary: "University recommendations are intended to be based on student fit, academic profile, budget and long-term goals rather than recruitment incentives.",
      checks: [
        "Shortlisting criteria are explained to the student",
        "Academic fit is considered",
        "Financial suitability is considered",
        "Career and post-study objectives are considered",
        "Recommendations should not be represented as guaranteed outcomes",
      ],
      note: "University admissions decisions remain entirely with the institutions themselves.",
    },
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Line-by-Line Narrative Crafting",
    contrast: "Zero AI Templates",
    desc: "Bespoke, human editorial feedback on your SOPs, CV, and letters of recommendation. No generic ChatGPT drafts that trigger admissions committee screeners.",
    verification: {
      title: "Individual Application Review",
      summary: "Application materials are reviewed in relation to the student's own academic and professional background rather than being treated as interchangeable templates.",
      checks: [
        "SOP narrative is tied to the student's actual profile",
        "CV positioning is reviewed for relevance and clarity",
        "Supporting-document consistency is checked",
        "Student claims should remain accurate and verifiable",
        "Final application responsibility remains with the applicant",
      ],
      note: "Mentorship should improve clarity and presentation without fabricating achievements or credentials.",
    },
  },
  {
    num: "04",
    icon: FileCheck,
    title: "Consular Visa Mock Grilling",
    contrast: "Bulletproof Embassy Dossiers",
    desc: "Rigorous 1-on-1 interview simulations testing financial proof clarity, study rationale, and genuine intent to overcome even prior refusal risks.",
    verification: {
      title: "Structured Visa Preparation",
      summary: "Mock interview preparation is designed to test whether the student can clearly explain genuine study intent, finances, university choice and future plans.",
      checks: [
        "Financial-document consistency is reviewed",
        "Study rationale is rehearsed",
        "University/course choice is discussed",
        "Prior refusal issues can be reviewed where relevant",
        "Students are not coached to provide false or misleading answers",
      ],
      note: "Visa approval can never be guaranteed. Final decisions remain with the relevant immigration or consular authority.",
    },
  },
];

// Duplicate slides 3 times (12 items) so Embla loop: true has abundant buffer on both sides,
// completely eliminating any blank void or gaps during fast drags or wide screens.
const SLIDES = [...PANELS, ...PANELS, ...PANELS];

export default function DifferenceGrid() {
  const [selectedStandard, setSelectedStandard] = useState<PanelItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (selectedStandard) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedStandard(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedStandard]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      breakpoints: { "(min-width: 1024px)": { active: false } },
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
              01 / ADVISORY · The Advisory Difference
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
              <div className="hidden sm:flex lg:hidden items-center gap-2 flex-shrink-0">
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
        <div className="w-full overflow-hidden mt-10 sm:mt-12 lg:overflow-visible">
          <div
            className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-terra/40 lg:overflow-visible lg:cursor-default lg:select-auto"
            ref={emblaRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            data-cursor-drag
            aria-label="The Advisory Difference Criterion Cards"
            onKeyDown={onKeyDown}
          >
            <div className="flex -ml-4 sm:-ml-5 lg:ml-0 lg:grid lg:grid-cols-4 lg:gap-6 touch-pan-y lg:touch-auto">
              {SLIDES.map((panel, idx) => {
                const Icon = panel.icon;

                return (
                  <div
                    key={`${panel.num}-${idx}`}
                    className={`flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-none pl-4 sm:pl-5 lg:pl-0 min-w-0 h-full ${idx >= PANELS.length ? "lg:hidden" : ""}`}
                  >
                    <div
                      className="bg-[#FAF7F2] border border-ink/20 p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] h-full min-h-[360px] sm:min-h-[390px] hover:-translate-y-[3px] hover:border-terra/35 hover:shadow-[0_4px_24px_rgba(194,91,26,0.08)]"
                    >
                      <div>
                        {/* Top Bar with Big Editorial Number */}
                        <div className="flex items-center justify-between pb-5 border-b border-ink/10 mb-5">
                          <span className="font-display text-4xl sm:text-5xl text-ink/30 group-hover:text-terra transition-colors duration-300">
                            {panel.num}
                          </span>
                          <div className="h-9 w-9 rounded-none border border-ink/15 bg-white flex items-center justify-center text-ink/60 group-hover:border-terra/60 group-hover:text-terra group-hover:-translate-y-0.5 transition-all duration-300">
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

                      {/* Advisory Standard & Interactive Verification Trigger */}
                      <div className="pt-6 mt-6 border-t border-ink/10 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
                        <span className="text-ink/40">Advisory Standard</span>
                        <button
                          type="button"
                          onClick={() => setSelectedStandard(panel)}
                          aria-label={`How we verify standard ${panel.num}: ${panel.title}`}
                          className="group/btn text-terra hover:text-terra-dark inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-2 -mr-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-terra font-medium"
                        >
                          <span>How We Verify</span>
                          <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Tappable Pagination Dots Indicator (Maps 1-to-1 to 4 unique items) ── */}
          <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8 lg:hidden">
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

      {/* ── Advisory Standard Verification Drawer / Modal ── */}
      <AnimatePresence>
        {selectedStandard && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="standard-modal-title"
            className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedStandard(null)}
              className="fixed inset-0 bg-[#0B0A08]/70 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Side Sheet / Bottom Drawer Panel */}
            <motion.div
              initial={isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-lg bg-[#FAF7F2] text-[#14120C] border-t md:border-t-0 md:border-l border-ink/20 shadow-2xl flex flex-col h-[85vh] md:h-full overflow-hidden"
            >
              {/* Top Bar with Editorial Monospace Index & Close Target */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-ink/15 bg-[#FAF7F2] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-terra" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">
                    Advisory Standard / {selectedStandard.num}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStandard(null)}
                  aria-label="Close verification drawer"
                  className="h-11 w-11 border border-ink/15 hover:border-terra hover:text-terra flex items-center justify-center transition-colors text-ink rounded-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-terra"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto flex-1">
                {/* Header Area */}
                <div>
                  <div className="inline-block px-2.5 py-0.5 bg-ink/[0.04] border border-ink/10 font-mono text-[9px] uppercase tracking-wider text-ink/60 mb-2.5">
                    {selectedStandard.contrast}
                  </div>
                  <h2 id="standard-modal-title" className="font-display font-normal text-2xl sm:text-3xl text-ink leading-tight">
                    {selectedStandard.verification.title}
                  </h2>
                  <div className="h-[1.5px] w-12 bg-terra mt-4" />
                </div>

                {/* Section 1: WHAT THIS MEANS */}
                <div className="pt-4 border-t border-ink/10">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-terra block mb-2 font-medium">
                    What This Means
                  </span>
                  <p className="text-sm sm:text-base text-ink/80 font-light leading-relaxed">
                    {selectedStandard.verification.summary}
                  </p>
                </div>

                {/* Section 2: HOW WE APPLY IT */}
                <div className="pt-4 border-t border-ink/10">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-terra block mb-3 font-medium">
                    How We Apply It
                  </span>
                  <ul className="space-y-3">
                    {selectedStandard.verification.checks.map((check, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-xs text-terra font-medium flex-shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-ink/75 font-light leading-relaxed">
                          {check}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: IMPORTANT CONTEXT */}
                <div className="pt-4 border-t border-ink/10">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ink/50 block mb-2 font-medium">
                    Important Context
                  </span>
                  <div className="border-l-2 border-terra/50 pl-3.5 py-1 bg-ink/[0.02]">
                    <p className="text-xs text-ink/70 font-light leading-relaxed">
                      {selectedStandard.verification.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Action Strip */}
              <div className="p-6 sm:p-8 pt-4 border-t border-ink/15 bg-[#FAF7F2] flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedStandard(null)}
                  className="w-full bg-ink text-cream hover:bg-ink/90 min-h-[48px] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center rounded-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-terra"
                >
                  Understood
                </button>
                <div className="text-center mt-3">
                  <Link
                    href="/mentorship-model"
                    onClick={() => setSelectedStandard(null)}
                    className="text-[10px] uppercase tracking-[0.18em] font-mono text-terra hover:underline transition-colors"
                  >
                    Explore Mentorship Model →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
