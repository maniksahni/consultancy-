"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

const PRINCIPLES = [
  {
    title: "ONE POINT OF CONTACT",
    desc: "Direct communication with the same senior mentor who analyzes your academic transcripts and crafts your narrative.",
  },
  {
    title: "PROFILE-FIRST ADVICE",
    desc: "Uncompromising university recommendations based strictly on your GPA, post-study work ambitions, and financial ROI.",
  },
  {
    title: "NO INSTITUTIONAL KICKBACKS",
    desc: "We accept zero agent recruitment commissions, preserving 100% fiduciary objectivity in your university selection.",
  },
];

export default function MentorFeature() {
  return (
    <section id="mentorship" className="bg-[#FAF7F2] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Asymmetric Layout: Mentor Image + Narrative ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT: Architectural Framed Mentor Visual (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative border border-ink/15 bg-white p-3 sm:p-4 shadow-sm">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream border border-ink/10">
                <img
                  src="/images/mentor-spotlight.jpg"
                  alt="Senior Admissions Mentor consulting with candidate"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="pt-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-ink/50">
                <span>Advisory Practice</span>
                <span className="text-terra font-medium">Boutique Fiduciary Model</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Narrative & 3 Core Principles (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-terra" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/50">
                  The Mentorship Principle
                </span>
              </div>

              <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
                Private Mentorship.<br />
                <span className="text-terra italic inline-block pr-1">Not Mass Processing.</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-ink/75 font-light leading-relaxed mt-5 sm:mt-6">
                When you apply to premier global universities, your future cannot be treated like a call-center ticket. We deliberately cap our student roster each cycle to ensure every statement of purpose, university shortlist, and consular mock session is personally evaluated by your dedicated mentor.
              </p>
            </div>

            {/* Three Principles */}
            <div className="mt-8 pt-6 border-t border-ink/15 space-y-5">
              {PRINCIPLES.map((item, idx) => (
                <div key={item.title} className="flex items-start gap-3 sm:gap-4">
                  <span className="font-mono text-xs text-terra font-medium mt-0.5 flex-shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-ink font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/65 font-light leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-ink/15">
              <Link
                href="/mentorship-model"
                className="inline-flex items-center gap-2.5 bg-ink text-cream hover:bg-ink/90 min-h-[48px] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors group"
              >
                <span>See How Mentorship Works</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
