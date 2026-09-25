"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import StatCounter from "@/components/common/StatCounter";

const UNIVERSITY_MENTIONS = [
  "Columbia University",
  "TU Munich",
  "Univ. of Manchester",
  "Univ. of Toronto",
  "Trinity College Dublin",
  "UNSW Sydney",
];

export default function Hero() {
  const metrics = [
    { value: "99.2%", label: "Visa Approval Record" },
    { value: "500+", label: "Students Mentored 1-on-1" },
    { value: "₹4.8 Cr+", label: "Merit Scholarships Secured" },
    { value: "100%", label: "Unbiased Advisory Model" },
  ];

  return (
    <section className="relative min-h-screen bg-[#14120C] text-cream flex flex-col justify-between overflow-hidden">
      {/* Top Status & Calibrated Spacing */}
      <div className="pt-24 sm:pt-28 lg:pt-32 px-4 min-[390px]:px-5 sm:px-6 lg:px-16 max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream/10 pb-4 sm:pb-5"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cream/40 font-mono">
            Admissions Open · 2026 / 2027 Intakes
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-cream/40 font-mono">
            Limited Mentor Capacity · Fall 2026 &amp; Spring 2027
          </span>
        </motion.div>
      </div>

      {/* Main Dominant Headline with Calibrated Spacing */}
      <div className="flex-1 flex flex-col justify-center px-4 min-[390px]:px-5 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16 max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          <h1 className="font-display font-normal text-cream leading-[0.88] tracking-[-0.035em] text-[clamp(2.35rem,10.5vw,3.25rem)] min-[390px]:text-[3.85rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.25rem] break-words">
            Elite 1-on-1<br />
            Study Abroad<br />
            Mentorship.<br />
            {/* The single terracotta accent in the entire section */}
            <span className="text-terra italic inline-block pr-1">Zero Compromises.</span>
          </h1>
        </motion.div>

        {/* Narrative & High-Contrast CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end border-t border-cream/10 pt-6 sm:pt-8"
        >
          <div className="lg:col-span-7">
            <p className="text-cream/70 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl">
              Personalized profile assessment, Ivy League &amp; Russell Group SOP curation, and foolproof consular visa prep — directly from a dedicated mentor.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-cream/35">
              <span>99.2% Visa Approval Rate</span>
              <span>·</span>
              <span>Zero Institutional Kickbacks</span>
              <span>·</span>
              <span>Official Visa Stamped</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-start xl:items-center gap-4">
            <a
              href="#booking"
              className="bg-cream text-ink hover:bg-cream/90 px-8 py-4 rounded-none text-[11px] uppercase tracking-[0.22em] font-medium text-center transition-colors inline-flex items-center justify-center gap-3"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://wa.me/33755749029?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream/20 hover:border-cream/50 text-cream px-6 py-4 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium text-center transition-colors inline-flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="h-3.5 w-3.5 text-cream/70" />
              <span>Chat Live</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Admissions Ledger: Flat, 1px Hairline Grid, Radical Restraint */}
      <div className="border-t border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-cream/10">
            {metrics.map((m, i) => (
              <div
                key={i}
                className={`py-6 sm:py-8 ${i % 2 === 0 ? "pr-4 sm:pr-8" : "pl-4 sm:pl-8 lg:pl-8"} ${i > 0 ? "lg:pl-8" : ""} ${i < 3 ? "lg:pr-8" : ""}`}
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-cream/35 mb-3">
                  <span>Metric 0{i + 1}</span>
                  <span>Audited</span>
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream font-normal leading-none tracking-tight">
                  <StatCounter value={m.value} duration={1.6} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-cream/60 mt-3 leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* University Trust Strip: 1px Hairline Rule */}
      <div className="px-4 min-[390px]:px-5 sm:px-6 lg:px-16 py-4 sm:py-5 max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-cream/30 whitespace-nowrap">
            Admissions Secured At
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {UNIVERSITY_MENTIONS.map((uni) => (
              <span
                key={uni}
                className="font-display text-cream/40 text-sm sm:text-base tracking-tight cursor-default select-none"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
