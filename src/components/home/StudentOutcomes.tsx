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
    setActiveMobileIndex(Math.min(Math.max(index, 0), outcomes.length - 1));
  };

  return (
    <section
      id="outcomes"
      className="bg-cream py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="border-t border-ink/12 pt-10 mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
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
          <div className="flex items-center justify-between text-[10px] label text-stone mb-3">
            <span>Dossier Case Files (6 Records)</span>
            <span className="text-terra">Swipe Dossiers →</span>
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
                className="snap-center flex-none w-[86vw] border border-ink/15 bg-cream-50 p-6 flex flex-col justify-between carousel-snap-item relative card-hover"
              >
                {/* Record header */}
                <div className="border-b border-ink/10 pb-3 mb-4 flex items-center justify-between gap-2">
                  <div>
                    <div className="label text-stone text-[10px]">
                      Case File {String(i + 1).padStart(3, "0")} / 006
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
                <div className="border-t border-b border-ink/8 py-2.5 mb-3 bg-cream/50 px-2.5">
                  <div className="label text-stone text-[9px] mb-1">Audited Profile</div>
                  <p className="text-xs text-ink/80 font-light leading-relaxed">{item.stats}</p>
                </div>

                {/* Outcome stamp */}
                <div className="border border-terra/40 bg-terra/[0.08] p-3.5">
                  <div className="label text-terra text-[9px] mb-1.5 flex items-center gap-1.5"><span className="text-terra">✦</span> Verified Outcome</div>
                  <p className="text-xs text-ink font-semibold leading-snug">{item.outcome}</p>
                </div>
              </div>
            ))}

            {/* Trailing spacer for true centering of last card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Dot pagination indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-3 pb-2">
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

          <div className="flex items-center justify-between text-[11px] text-stone font-light px-1 pt-2 pb-6">
            <span>Scroll sideways to view all admissions</span>
            <span className="text-terra label text-[10px]">6 of 6 Verified</span>
          </div>
        </div>

        {/* ── DESKTOP: Dossier case files ledger grid (hidden on mobile and tablet) ── */}
        <div className="hidden lg:grid border border-ink/10 grid-cols-3">
          {outcomes.map((item, i) => (
            <motion.div
              key={i}
              className={`p-7 flex flex-col justify-between border-b border-r border-ink/8 card-hover
                ${i % 3 === 2 ? "lg:border-r-0" : ""}
                ${i % 2 === 1 ? "md:border-r-0 lg:border-r" : ""}
                ${i % 3 === 2 && i % 2 === 1 ? "md:border-r-0" : ""}
                ${i >= outcomes.length - (outcomes.length % 3 || 3) ? "lg:border-b-0" : ""}
                ${i >= outcomes.length - 2 ? "md:border-b-0" : ""}
                ${i === outcomes.length - 1 ? "border-b-0" : ""}
              `}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.09 }}
            >
              {/* Record header */}
              <div className="border-b border-ink/8 pb-4 mb-5 flex items-center justify-between gap-2">
                <div>
                  <div className="label text-stone">Record {String(i + 1).padStart(3, "0")}</div>
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
              <div className="border-t border-ink/8 border-b border-b-ink/8 py-3 mb-4">
                <div className="label text-stone mb-1.5">Candidate Profile Metrics</div>
                <p className="text-xs text-ink/70 font-light leading-relaxed">{item.stats}</p>
              </div>

              {/* Outcome stamp */}
              <div className="border border-terra/40 bg-terra/[0.07] px-4 py-3.5">
                <div className="label text-terra mb-1.5 flex items-center gap-1.5"><span className="text-terra">✦</span> Verified Outcome</div>
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
