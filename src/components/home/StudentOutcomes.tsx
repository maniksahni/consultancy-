"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import CountryFlag from "@/components/common/CountryFlag";

const outcomes = [
  {
    initials: "A.I.",
    country: "USA",
    program: "MS in Data Science",
    university: "Columbia University",
    stats: "7.8 CGPA · GRE 322 · Duolingo 125",
    outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)",
    intake: "Fall Intake",
    ref: "REF: CU-0824",
  },
  {
    initials: "K.D.",
    country: "Germany",
    program: "MSc Automotive Engineering",
    university: "Technical University of Munich (TUM)",
    stats: "8.2 CGPA · APS India Verified · IELTS 7.0",
    outcome: "€0 Tuition Public Admit · ₹35L+ Tuition Saved",
    intake: "Winter Intake",
    ref: "REF: TUM-1024",
  },
  {
    initials: "S.K.",
    country: "United Kingdom",
    program: "MSc International Business",
    university: "University of Manchester",
    stats: "7.1 CGPA · 2-Yr Gap Justified · MOI Waiver",
    outcome: "£8,000 Dean's Merit Award · Visa in 5 Days",
    intake: "Autumn Intake",
    ref: "REF: UOM-0924",
  },
  {
    initials: "R.B.",
    country: "Canada",
    program: "MEng Electrical & Computer Eng",
    university: "University of Toronto",
    stats: "8.4 CGPA · IELTS 7.5 · SDS Stream",
    outcome: "Direct Study Permit Approval in 18 Days",
    intake: "Winter Intake",
    ref: "REF: UOT-0125",
  },
  {
    initials: "M.N.",
    country: "Ireland",
    program: "MSc Business Analytics",
    university: "Trinity College Dublin",
    stats: "7.6 CGPA · Duolingo 120 · 1-Yr Fast-Track",
    outcome: "AVATS Visa Approved in 12 Days · €4,000 Grant",
    intake: "Autumn Intake",
    ref: "REF: TCD-0924",
  },
  {
    initials: "T.J.",
    country: "Australia",
    program: "Master of Information Technology",
    university: "UNSW Sydney (Go8)",
    stats: "7.9 CGPA · PTE 68 · Subclass 500",
    outcome: "Genuine Student (GS) Statement Approved (No Interview)",
    intake: "Semester 1",
    ref: "REF: UNSW-0225",
  },
];

export default function StudentOutcomes() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
    const index = Math.round(container.scrollLeft / (cardWidth + 14));
    const nextIndex = Math.min(Math.max(index, 0), outcomes.length - 1);
    setActiveMobileIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
  };

  return (
    <section
      id="outcomes"
      className="bg-[#F2EDE4] pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 overflow-hidden w-full text-ink"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Section header: Calibrated negative space, monumental typography ── */}
        <div className="border-t border-ink/15 pt-4 sm:pt-5 mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-ink/40 font-mono mb-6">
                Documented Admissions Records
              </div>
              <h2 className="font-display font-normal text-ink leading-[0.88] tracking-[-0.035em] text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl">
                Verified Student Outcomes.<br />
                {/* Exactly ONE terracotta accent in this entire section */}
                <span className="text-terra italic">Zero Generic Claims.</span>
              </h2>
            </div>
            <p className="text-ink/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              Real admissions across Ivy League, Russell Group, TU9, and U15 institutions achieved through tailored profile positioning and flawless visa dossiers.
            </p>
          </div>
        </div>

        {/* ── MOBILE: Horizontal scroll-snap carousel (Protected logic preserved) ── */}
        <div className="lg:hidden pb-6">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 scrollbar-none -mx-6 carousel-snap"
          >
            {/* Leading spacer */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />

            {outcomes.map((item, i) => (
              <div
                key={i}
                className="snap-center flex-none w-[86vw] rounded-none border border-ink/15 bg-white p-6 flex flex-col justify-between carousel-snap-item relative text-ink"
              >
                <div>
                  {/* Record Header */}
                  <div className="border-b border-ink/10 pb-4 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono">
                        Record 0{i + 1} · {item.ref}
                      </span>
                    </div>
                    <CountryFlag country={item.country} size="md" />
                  </div>

                  {/* Candidate Identity */}
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-normal text-ink leading-tight">
                      Candidate {item.initials}
                    </h3>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-mono mt-1">
                      {item.country} · {item.intake}
                    </div>
                  </div>

                  {/* University & Program */}
                  <div className="mb-4">
                    <div className="font-display text-xl text-ink font-normal leading-snug">
                      {item.university}
                    </div>
                    <div className="text-xs text-ink/70 font-light mt-0.5">
                      {item.program}
                    </div>
                  </div>

                  {/* Profile Metrics */}
                  <div className="border-t border-b border-ink/10 py-3 my-4">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono mb-1">
                      Audited Profile
                    </div>
                    <p className="text-xs text-ink/80 font-light">
                      {item.stats}
                    </p>
                  </div>
                </div>

                {/* Outcome block: Stark 1px border, rounded-none */}
                <div className="border border-ink/15 p-4 bg-[#F2EDE4] mt-2">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono mb-1">
                    Verified Outcome
                  </div>
                  <p className="text-xs text-ink font-medium leading-relaxed">
                    {item.outcome}
                  </p>
                </div>
              </div>
            ))}
            {/* Trailing spacer */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Mobile pagination */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-2">
            {outcomes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!carouselRef.current) return;
                  const container = carouselRef.current;
                  const card = container.querySelector('.carousel-snap-item') as HTMLElement;
                  const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
                  container.scrollTo({ left: idx * (cardWidth + 14), behavior: "smooth" });
                }}
                aria-label={`Go to dossier ${idx + 1}`}
                className={`h-1 transition-all duration-300 ${
                  idx === activeMobileIndex ? "w-8 bg-ink" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: Dossier Grid (Flat, 0px radius, 1px hairlines) ── */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-none p-8 flex flex-col justify-between bg-white border border-ink/15"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08 }}
            >
              <div>
                {/* Record Header */}
                <div className="border-b border-ink/10 pb-4 mb-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono">
                    Record 0{i + 1} · {item.ref}
                  </span>
                  <CountryFlag country={item.country} size="md" />
                </div>

                {/* Candidate Identity */}
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-normal text-ink leading-tight">
                    Candidate {item.initials}
                  </h3>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-mono mt-1">
                    {item.country} · {item.intake}
                  </div>
                </div>

                {/* University & Program */}
                <div className="mb-6">
                  <div className="font-display text-xl text-ink font-normal leading-snug">
                    {item.university}
                  </div>
                  <div className="text-xs text-ink/70 font-light mt-1">
                    {item.program}
                  </div>
                </div>

                {/* Profile Metrics */}
                <div className="border-t border-b border-ink/10 py-3 mb-6">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono mb-1">
                    Candidate Profile Metrics
                  </div>
                  <p className="text-xs text-ink/80 font-light leading-relaxed">
                    {item.stats}
                  </p>
                </div>
              </div>

              {/* Outcome Stamp */}
              <div className="border border-ink/15 p-4 bg-[#F2EDE4]">
                <div className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono mb-1">
                  Verified Case Outcome
                </div>
                <p className="text-xs text-ink font-medium leading-relaxed">
                  {item.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footnote: 1px hairline rule ── */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-ink/15 text-center text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono">
          All outcomes verified against institutional offer letters and official consular visa stamps.
        </div>

      </div>
    </section>
  );
}
