"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

const COMPARISON_ROWS = [
  {
    topic: "Accountability & Mentorship",
    massLabel: "Mass Processing",
    massText: "Assigned counsellors change",
    massDetail: "Passed between rotating telecallers and sales reps at each stage.",
    pathwaysLabel: "Pathways Global",
    pathwaysText: "One mentor throughout your journey",
    pathwaysDetail: "Single dedicated Senior Mentor from initial diagnostic audit to consular visa approval.",
  },
  {
    topic: "Shortlisting Criteria",
    massLabel: "Mass Processing",
    massText: "Partner universities prioritised",
    massDetail: "Programs selected to satisfy institutional recruitment commissions.",
    pathwaysLabel: "Pathways Global",
    pathwaysText: "Profile-first university selection",
    pathwaysDetail: "100% unbiased recommendations determined strictly by your academic ROI, budget, and goals.",
  },
  {
    topic: "Editorial Standards",
    massLabel: "Mass Processing",
    massText: "Template applications",
    massDetail: "Generic recycled statements and AI drafts flagged by screening software.",
    pathwaysLabel: "Pathways Global",
    pathwaysText: "Individual application strategy",
    pathwaysDetail: "Bespoke, line-by-line narrative crafting highlighting your unique life trajectory.",
  },
];

export default function MentorshipDifference() {
  return (
    <section id="comparison" className="bg-[#F2EDE4] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Top Editorial Split Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-12 sm:pb-16 border-b border-ink/15">
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-4">
              The Advisory Difference
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Not Another<br />
              Admissions Agency.<br />
              <span className="text-terra italic inline-block pr-1">A Private Advisory Model.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between">
            <p className="text-base sm:text-lg text-ink/75 font-light leading-relaxed">
              Traditional consultancies operate on mass volume and recruiter commissions, treating admissions like a call-center pipeline. We provide boutique, independent counsel where your ambition is the only agenda.
            </p>
            <div className="mt-6">
              <Link
                href="/mentorship-model"
                className="inline-flex items-center gap-2 border-b border-ink/50 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-ink hover:text-terra hover:border-terra transition-colors group"
              >
                <span>Read Full Mentorship Doctrine</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 3 Comparison Rows with Thin Horizontal Rules ── */}
        <div className="divide-y divide-ink/15">
          {COMPARISON_ROWS.map((row, idx) => (
            <div key={row.topic} className="py-7 sm:py-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              
              {/* Category indicator (3 cols) */}
              <div className="lg:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">
                  Contrast 0{idx + 1}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-ink font-normal mt-1">
                  {row.topic}
                </h3>
              </div>

              {/* Mass Processing (4 cols) */}
              <div className="lg:col-span-4 bg-ink/[0.03] p-4 sm:p-5 border border-ink/10">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-mono text-ink/45 mb-2">
                  <X className="h-3 w-3 text-ink/40" />
                  <span>{row.massLabel}</span>
                </div>
                <div className="font-medium text-sm sm:text-base text-ink/80 leading-snug">
                  {row.massText}
                </div>
                <p className="text-xs text-ink/55 font-light mt-1.5 leading-relaxed">
                  {row.massDetail}
                </p>
              </div>

              {/* Pathways Global (5 cols) */}
              <div className="lg:col-span-5 bg-white p-4 sm:p-5 border border-ink/20 shadow-sm relative">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-mono text-terra font-medium mb-2">
                  <Check className="h-3 w-3 text-terra" />
                  <span>{row.pathwaysLabel}</span>
                </div>
                <div className="font-medium text-sm sm:text-base text-ink leading-snug">
                  {row.pathwaysText}
                </div>
                <p className="text-xs text-ink/70 font-light mt-1.5 leading-relaxed">
                  {row.pathwaysDetail}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
