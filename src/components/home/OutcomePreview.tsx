"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";

const SELECTED_CASES = [
  {
    initials: "A.I.",
    country: "USA",
    flag: "🇺🇸",
    university: "Columbia University",
    program: "MS in Data Science",
    profile: "7.8 CGPA · GRE 322 · Duolingo 125",
    outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)",
    intake: "Fall Intake",
    ref: "REF: CU-0824",
    detail: "Previous rejection overturned with a rigorously restructured financial proof dossier and authentic consular interview mock preparation.",
  },
  {
    initials: "K.D.",
    country: "Germany",
    flag: "🇩🇪",
    university: "Technical University of Munich (TUM)",
    program: "MSc Automotive Engineering",
    profile: "8.2 CGPA · APS India Verified · IELTS 7.0",
    outcome: "€0 Tuition Public Admit · ₹35L+ Tuition Saved",
    intake: "Winter Intake",
    ref: "REF: TUM-1024",
    detail: "Direct admit to TUM's premier mechanical faculty with swift APS certification handling and complete blocked account setup.",
  },
  {
    initials: "S.K.",
    country: "United Kingdom",
    flag: "🇬🇧",
    university: "University of Manchester",
    program: "MSc International Business",
    profile: "7.1 CGPA · 2-Yr Gap Justified · MOI Waiver",
    outcome: "£8,000 Dean's Merit Award · Visa in 5 Days",
    intake: "Autumn Intake",
    ref: "REF: UOM-0924",
    detail: "Secured competitive merit scholarship and priority CAS turnaround by presenting an editorial-grade SOP justifying work hiatus.",
  },
];

export default function OutcomePreview() {
  return (
    <section id="outcomes" className="bg-[#14120C] text-cream py-16 sm:py-20 lg:py-28 border-b border-cream/10">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="border-t border-cream/15 pt-5 sm:pt-6 mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-cream/45 block mb-3">
              Verified Admissions Ledger
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Admissions Outcomes,<br />
              <span className="text-terra italic inline-block pr-1">In Context.</span>
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-sm sm:text-base text-cream/65 font-light leading-relaxed mb-4">
              Real candidates, auditable dossiers, and transparent profile parameters across top-tier international destinations.
            </p>
            <Link
              href="/outcomes"
              className="inline-flex items-center gap-2 border-b border-cream/40 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-cream hover:text-terra hover:border-terra transition-colors group"
            >
              <span>View All Verified Outcomes</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── 3 Selected Documented Case-Files ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {SELECTED_CASES.map((item) => (
            <div
              key={item.ref}
              className="border border-cream/15 bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between group hover:border-cream/35 transition-colors"
            >
              <div>
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-cream/10 mb-4 font-mono text-[9px] uppercase tracking-wider text-cream/40">
                  <span className="flex items-center gap-1.5">
                    <FileCheck2 className="h-3.5 w-3.5 text-terra" />
                    <span>Candidate {item.initials}</span>
                  </span>
                  <span>{item.ref}</span>
                </div>

                {/* Destination & Institution */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm">{item.flag}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-cream/50">
                    {item.country} · {item.intake}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-cream font-normal leading-snug">
                  {item.university}
                </h3>
                <div className="text-xs text-cream/80 font-mono mt-1">
                  {item.program}
                </div>

                {/* Profile Stats */}
                <div className="my-4 py-2.5 px-3 bg-white/[0.03] border border-cream/10 font-mono text-[10px] text-cream/70">
                  <span className="text-cream/40 block text-[9px] uppercase tracking-wider mb-0.5">Profile Metrics:</span>
                  <span>{item.profile}</span>
                </div>

                {/* Detail */}
                <p className="text-xs text-cream/60 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Recorded Outcome (Highlighted in Terracotta) */}
              <div className="pt-4 mt-6 border-t border-cream/10">
                <div className="text-[9px] uppercase tracking-[0.2em] font-mono text-cream/40 mb-1">
                  Recorded Outcome
                </div>
                <div className="text-xs sm:text-sm font-mono text-terra font-medium leading-snug">
                  {item.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Disclaimer ── */}
        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-cream/35">
          <p>
            * Individual admissions and visa decisions remain strictly with universities and relevant government consular authorities.
          </p>
          <Link href="/outcomes" className="text-cream/60 hover:text-cream underline underline-offset-4 whitespace-nowrap">
            Explore 100+ outcomes →
          </Link>
        </div>

      </div>
    </section>
  );
}
