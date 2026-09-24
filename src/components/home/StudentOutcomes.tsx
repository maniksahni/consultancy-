"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";

const EASE = [0.22, 1, 0.36, 1] as const;

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
      className="bg-cream py-20 lg:py-28 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="border-t border-ink/[0.12] pt-10 mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="label text-stone mb-4">Documented Admissions Records</div>
            <h2
              className="font-display font-normal text-ink leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Verified Student Outcomes.<br />
              <em>Zero Generic Claims.</em>
            </h2>
          </div>
          <p className="text-stone text-sm leading-relaxed max-w-full sm:max-w-sm font-light">
            Real admissions across Ivy League, Russell Group, TU9, and U15 institutions achieved through tailored profile positioning and flawless visa dossiers.
          </p>
        </motion.div>

        {/* ── MOBILE & TABLET: Horizontal scroll-snap carousel of dossier cards ── */}
        <div className="lg:hidden">
          <div className="text-[10px] label text-stone mb-3">
            Dossier Case Files (6 Records)
          </div>

          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="overflow-x-auto snap-x snap-mandatory flex gap-3.5 pb-3 scrollbar-none -mx-6 carousel-snap"
          >
            {/* Leading spacer for true centering of first card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />

            {outcomes.map((item, i) => (
              <div
                key={i}
                className="snap-center flex-none w-[86vw] rounded-2xl border border-ink/[0.09] bg-gradient-to-b from-[#FCFAF6] via-[#FAF6EE] to-[#F3EDE2] p-6 flex flex-col justify-between carousel-snap-item relative shadow-[0_12px_32px_-8px_rgba(20,18,12,0.08)] card-hover overflow-hidden"
              >
                {/* Subtle consular watermark seal */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-terra/10 opacity-30 pointer-events-none flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-terra/20" />
                </div>

                <div>
                  {/* Record header */}
                  <div className="border-b border-ink/[0.08] pb-3 mb-4 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="label text-stone text-[10px]">
                          Case File {String(i + 1).padStart(3, "0")} / 006
                        </span>
                        <span className="text-[8px] font-mono text-terra border border-terra/30 bg-terra/[0.04] px-1.5 py-0.2 rounded uppercase tracking-wider">
                          VERIFIED
                        </span>
                      </div>
                      <div className="text-[10px] text-stone/60 font-sans font-light mt-0.5">
                        {item.ref}
                      </div>
                    </div>
                    <CountryFlag country={item.country} size="md" />
                  </div>

                  {/* Candidate identity */}
                  <div className="mb-3">
                    <div className="font-display text-2xl font-normal text-ink leading-tight">
                      Candidate {item.initials}
                    </div>
                    <div className="label text-stone text-[10px] mt-1">
                      {item.country} Study Route · {item.intake}
                    </div>
                  </div>

                  {/* University + program */}
                  <div className="mb-3">
                    <h3 className="font-display text-xl font-normal text-ink leading-snug">
                      {item.university}
                    </h3>
                    <p className="text-stone text-xs font-light mt-0.5">{item.program}</p>
                  </div>

                  {/* Profile metrics */}
                  <div className="rounded-xl border border-ink/[0.06] py-2.5 px-3 mb-3.5 bg-white/60 backdrop-blur-sm">
                    <div className="label text-stone text-[9px] mb-1">Audited Profile</div>
                    <p className="text-xs text-ink/80 font-light leading-relaxed">{item.stats}</p>
                  </div>
                </div>

                {/* Outcome stamp */}
                <div className="rounded-xl border border-terra/25 bg-gradient-to-br from-terra/[0.08] to-terra/[0.02] p-3.5 shadow-[0_2px_12px_rgba(194,91,26,0.06)] relative z-10">
                  <div className="label text-terra text-[9px] mb-1 flex items-center gap-1.5 font-medium">
                    <span className="text-terra">✦</span> Verified Outcome
                  </div>
                  <p className="text-xs text-ink font-semibold leading-snug">{item.outcome}</p>
                </div>
              </div>
            ))}

            {/* Trailing spacer for true centering of last card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Dot pagination indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-3 pb-6">
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
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  idx === activeMobileIndex ? "w-6 bg-terra" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: Dossier case files ledger grid (hidden on mobile and tablet) ── */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-7 flex flex-col justify-between bg-gradient-to-b from-[#FCFAF6] via-[#FAF6EE] to-[#F3EDE2] border border-ink/[0.09] shadow-[0_8px_28px_-6px_rgba(20,18,12,0.06)] hover:shadow-[0_20px_48px_-10px_rgba(20,18,12,0.12)] card-hover transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.09 }}
            >
              {/* Subtle consular watermark seal */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-terra/10 opacity-20 pointer-events-none flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <div className="w-28 h-28 rounded-full border border-dashed border-terra/20" />
              </div>

              <div>
                {/* Record header with Case File classification */}
                <div className="border-b border-ink/[0.08] pb-4 mb-5 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="label text-[9px] text-stone">Record {String(i + 1).padStart(3, "0")}</span>
                      <span className="text-[8px] font-mono text-terra border border-terra/30 bg-terra/[0.04] px-1.5 py-0.2 rounded uppercase tracking-wider">
                        VERIFIED DOSSIER
                      </span>
                    </div>
                    <div className="text-[10px] text-stone/60 font-sans font-light mt-0.5">{item.ref}</div>
                  </div>
                  <CountryFlag country={item.country} size="md" />
                </div>

                {/* Candidate identity */}
                <div className="mb-4">
                  <div className="font-display text-2xl font-normal text-ink leading-none tracking-tight">
                    Candidate {item.initials}
                  </div>
                  <div className="label text-stone mt-1.5">{item.country} Study Route · {item.intake}</div>
                </div>

                {/* University + program */}
                <div className="mb-4">
                  <h3 className="font-display text-xl font-normal text-ink leading-snug tracking-tight">
                    {item.university}
                  </h3>
                  <p className="text-stone text-xs font-light mt-1">{item.program}</p>
                </div>

                {/* Profile metrics */}
                <div className="rounded-xl border border-ink/[0.06] p-3 mb-4 bg-white/60 backdrop-blur-sm">
                  <div className="label text-stone text-[9px] mb-1">Candidate Profile Metrics</div>
                  <p className="text-xs text-ink/75 font-light leading-relaxed">{item.stats}</p>
                </div>
              </div>

              {/* Outcome stamp */}
              <div className="rounded-xl border border-terra/25 bg-gradient-to-br from-terra/[0.08] to-terra/[0.02] px-4 py-3.5 shadow-[0_2px_12px_rgba(194,91,26,0.06)] relative z-10">
                <div className="label text-terra mb-1.5 flex items-center gap-1.5 font-medium">
                  <span className="text-terra">✦</span> Verified Case Outcome
                </div>
                <p className="text-sm text-ink font-semibold leading-snug">{item.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footnote ── */}
        <div className="mt-8 flex items-center justify-center gap-2 text-stone text-xs font-light">
          <ShieldCheck className="h-4 w-4 text-terra flex-shrink-0" />
          All outcomes verified against institutional offer letters and official visa stamps.
        </div>

      </div>
    </section>
  );
}
