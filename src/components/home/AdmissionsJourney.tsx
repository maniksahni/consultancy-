"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const STAGES = [
  {
    number: "01",
    timing: "Weeks 1–2",
    title: "Profile & Goals",
    summary: "Diagnostic audit of your transcripts, test scores, career ROI targets, and financial budget constraints.",
  },
  {
    number: "02",
    timing: "Weeks 3–4",
    title: "University Strategy",
    summary: "Balanced shortlist matrix across ambitious, target, and safe universities with 100% fiduciary objectivity.",
  },
  {
    number: "03",
    timing: "Weeks 5–8",
    title: "Applications & Documents",
    summary: "Line-by-line editorial narrative crafting for your SOPs, CV, and letters of recommendation — zero AI templates.",
  },
  {
    number: "04",
    timing: "Pre-Departure",
    title: "Visa Preparation",
    summary: "Rigorous consular mock simulations, liquid funds verification, and complete embassy dossier scrutiny.",
  },
];

export default function AdmissionsJourney() {
  return (
    <section id="process" className="bg-[#14120C] text-cream py-16 sm:py-20 lg:py-28 border-b border-cream/10">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="border-t border-cream/15 pt-5 sm:pt-6 mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-cream/45 block mb-3">
              The 4-Stage Mentorship Journey
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              From Profile Review<br />
              to Visa Preparation.<br />
              <span className="text-terra italic inline-block pr-1">One Clear Process.</span>
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-sm sm:text-base text-cream/65 font-light leading-relaxed mb-4">
              A structured, transparent roadmap eliminating last-minute panic, generic drafts, and procedural delays.
            </p>
            <Link
              href="/admissions-process"
              className="inline-flex items-center gap-2 border-b border-cream/40 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-cream hover:text-terra hover:border-terra transition-colors group"
            >
              <span>Explore Detailed Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Desktop: Horizontal Timeline | Mobile: Vertical Timeline ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.number}
              className="border border-cream/15 bg-white/[0.02] p-6 flex flex-col justify-between relative group hover:border-cream/35 transition-colors"
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-4 border-b border-cream/10 mb-4">
                  <span className="font-display text-2xl text-cream/40 group-hover:text-terra transition-colors">
                    {stage.number}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/50 px-2 py-0.5 border border-cream/10">
                    {stage.timing}
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-display text-xl sm:text-2xl text-cream font-normal leading-snug">
                  {stage.title}
                </h3>

                {/* Single Short Sentence */}
                <p className="text-xs sm:text-sm text-cream/65 font-light leading-relaxed mt-2.5">
                  {stage.summary}
                </p>
              </div>

              {/* Bottom Micro-Badge */}
              <div className="pt-4 mt-6 border-t border-cream/10 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] font-mono text-cream/40">
                <CheckCircle2 className="h-3 w-3 text-terra" />
                <span>Stage 0{idx + 1} Deliverable Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
