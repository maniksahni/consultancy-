"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, FileCheck2 } from "lucide-react";

interface CaseItem {
  caseNo: string;
  initials: string;
  country: string;
  flag: string;
  university: string;
  program: string;
  profile: string;
  outcome: string;
  intake: string;
  ref: string;
  detail: string;
}

const CASES: CaseItem[] = [
  {
    caseNo: "CASE 001",
    initials: "A.I.",
    country: "United States",
    flag: "🇺🇸",
    university: "Columbia University",
    program: "MS in Data Science",
    profile: "7.8 CGPA · GRE 322 · Duolingo 125",
    outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)",
    intake: "Fall Intake",
    ref: "REF: CU-0824",
    detail: "Previous consular refusal overturned by completely restructuring the liquid funding dossier and executing intensive mock interview grilling.",
  },
  {
    caseNo: "CASE 002",
    initials: "K.D.",
    country: "Germany",
    flag: "🇩🇪",
    university: "Technical University of Munich (TUM)",
    program: "MSc Automotive Engineering",
    profile: "8.2 CGPA · APS India Verified · IELTS 7.0",
    outcome: "€0 Tuition Public Admit · ₹35L+ Tuition Saved",
    intake: "Winter Intake",
    ref: "REF: TUM-1024",
    detail: "Direct admit to TUM's premier engineering faculty with accelerated APS certification handling and verified blocked account setup.",
  },
  {
    caseNo: "CASE 003",
    initials: "S.K.",
    country: "United Kingdom",
    flag: "🇬🇧",
    university: "University of Manchester",
    program: "MSc International Business",
    profile: "7.1 CGPA · 2-Yr Gap Justified · MOI Waiver",
    outcome: "£8,000 Dean's Merit Award · Visa in 5 Days",
    intake: "Autumn Intake",
    ref: "REF: UOM-0924",
    detail: "Secured competitive merit grant and priority CAS turnaround by presenting an editorial-grade SOP justifying work hiatus with corporate evidence.",
  },
  {
    caseNo: "CASE 004",
    initials: "R.B.",
    country: "Canada",
    flag: "🇨🇦",
    university: "University of Toronto",
    program: "MEng Electrical & Computer Eng",
    profile: "8.4 CGPA · IELTS 7.5 · SDS Stream",
    outcome: "Direct Study Permit Approval in 18 Days",
    intake: "Winter Intake",
    ref: "REF: UOT-0125",
    detail: "Formulated robust SOP addressing Canada study plan, SDS GIC investment, and immediate career return trajectory post-graduation.",
  },
  {
    caseNo: "CASE 005",
    initials: "M.N.",
    country: "Ireland",
    flag: "🇮🇪",
    university: "Trinity College Dublin",
    program: "MSc Business Analytics",
    profile: "7.6 CGPA · Duolingo 120 · 1-Yr Fast-Track",
    outcome: "AVATS Visa Approved in 12 Days · €4,000 Grant",
    intake: "Autumn Intake",
    ref: "REF: TCD-0924",
    detail: "Early application positioning for Ireland's top tech gateway, securing merit scholarship and seamless AVATS consular clearance.",
  },
  {
    caseNo: "CASE 006",
    initials: "T.J.",
    country: "Australia",
    flag: "🇦🇺",
    university: "UNSW Sydney (Go8)",
    program: "Master of Information Technology",
    profile: "7.9 CGPA · PTE 68 · Subclass 500",
    outcome: "Genuine Student (GS) Statement Approved (No Interview)",
    intake: "Semester 1",
    ref: "REF: UNSW-0225",
    detail: "Rigorous Genuine Student (GS) compliance narrative aligning past experience with Australian tech skills shortage, clearing visa with zero interview.",
  },
];

export default function OutcomeCases() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
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

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section
      id="outcomes"
      className="bg-[#0B0A08] text-cream py-20 sm:py-24 lg:py-32 border-b border-cream/10 relative overflow-hidden w-full"
    >
      {/* Subtle Warm Amber Glow Behind Section */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-terra/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16 relative z-10">

        {/* ── Section Header ── */}
        <div className="border-t border-cream/15 pt-6 sm:pt-8 mb-10 sm:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-cream/45 block mb-3">
              Documented Admissions Ledger
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Admissions Outcomes,<br />
              <span className="text-terra italic inline-block pr-1">In Context.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between lg:justify-end gap-5 lg:max-w-md">
            <div>
              <p className="text-sm sm:text-base text-cream/65 font-light leading-relaxed mb-3">
                Real candidates, auditable dossiers, and transparent profile parameters across top-tier international destinations.
              </p>
              <Link
                href="/outcomes"
                className="inline-flex items-center gap-2 border-b border-cream/40 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-cream hover:text-terra hover:border-terra transition-colors group"
              >
                <span>View All Verified Case Files</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous case file"
                className="h-10 w-10 border border-cream/20 hover:border-cream hover:bg-cream hover:text-ink text-cream flex items-center justify-center transition-colors rounded-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next case file"
                className="h-10 w-10 border border-cream/20 hover:border-cream hover:bg-cream hover:text-ink text-cream flex items-center justify-center transition-colors rounded-none"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Touch-Swipeable Sliding Card Carousel (Infinite Loop) ── */}
        <div className="w-full overflow-hidden">
          <div
            className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none"
            ref={emblaRef}
          >
            <div className="flex -ml-4 sm:-ml-5 lg:-ml-6 touch-pan-y">
              {CASES.map((item) => (
                <div
                  key={item.ref}
                  className="flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-[0_0_31.5%] pl-4 sm:pl-5 lg:pl-6 min-w-0"
                >
                  <div className="border border-cream/15 bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between h-[430px] sm:h-[460px] relative group transition-all duration-300 rounded-none hover:border-terra/40 hover:shadow-[0_0_30px_rgba(194,91,26,0.15)]">
                    <div>
                      {/* Dossier Header */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-cream/10 mb-4 font-mono text-[9px] uppercase tracking-wider text-cream/40">
                        <span className="flex items-center gap-1.5 text-terra font-medium">
                          <FileCheck2 className="h-3.5 w-3.5 text-terra" />
                          <span>{item.caseNo}</span>
                        </span>
                        <span>{item.ref}</span>
                      </div>

                      {/* Candidate & Destination */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-mono text-xs text-cream/90 font-medium">
                          Candidate {item.initials}
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-cream/50">
                          <span>{item.flag}</span>
                          <span>{item.country}</span>
                        </div>
                      </div>

                      {/* University & Program */}
                      <h3 className="font-display text-2xl text-cream font-normal leading-snug line-clamp-1">
                        {item.university}
                      </h3>
                      <div className="text-xs text-cream/80 font-mono mt-1 line-clamp-1">
                        {item.program}
                      </div>

                      {/* Terracotta Divider */}
                      <div className="my-4 h-[1px] bg-cream/10 relative overflow-hidden">
                        <div className="h-full w-full bg-terra/40" />
                      </div>

                      {/* Profile Stats Box */}
                      <div className="py-2.5 px-3 bg-white/[0.03] border border-cream/10 font-mono text-[10px] text-cream/70 mb-3">
                        <span className="text-cream/40 block text-[8px] uppercase tracking-wider mb-0.5">
                          Profile Metrics:
                        </span>
                        <span className="line-clamp-1">{item.profile}</span>
                      </div>

                      {/* Narrative Detail */}
                      <p className="text-xs text-cream/60 font-light leading-relaxed line-clamp-3">
                        {item.detail}
                      </p>
                    </div>

                    {/* Recorded Outcome */}
                    <div className="pt-4 mt-4 border-t border-cream/10">
                      <div className="text-[9px] uppercase tracking-[0.2em] font-mono text-cream/40 mb-1">
                        Recorded Outcome
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-terra font-medium leading-snug">
                        {item.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tappable Pagination Dots Indicator ── */}
          <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8">
            {CASES.map((item, idx) => (
              <button
                key={item.ref}
                type="button"
                onClick={() => scrollTo(idx)}
                aria-label={`Jump to ${item.caseNo}: ${item.university}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === selectedIndex
                    ? "w-7 bg-terra"
                    : "w-1.5 bg-cream/20 hover:bg-cream/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Official Disclaimer ── */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-cream/35">
          <p>
            * Individual admissions and visa decisions remain strictly with universities and relevant government consular authorities.
          </p>
          <Link
            href="/outcomes"
            className="text-cream/60 hover:text-cream underline underline-offset-4 whitespace-nowrap"
          >
            Explore 100+ outcomes →
          </Link>
        </div>

      </div>
    </section>
  );
}
