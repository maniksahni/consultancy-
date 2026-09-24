"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, MessageCircle, ShieldCheck } from "lucide-react";
import StatCounter from "@/components/common/StatCounter";

const EASE = [0.22, 1, 0.36, 1] as const;

// University mentions from outcomes data — text-based credibility strip
const UNIVERSITY_MENTIONS = [
  "Columbia University",
  "TU Munich",
  "Univ. of Manchester",
  "Univ. of Toronto",
  "Trinity College Dublin",
  "UNSW Sydney",
];

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 36]);

  const metrics = [
    { value: "99.2%", label: "Visa Approval Record" },
    { value: "500+", label: "Students Mentored 1-on-1" },
    { value: "₹4.8 Cr+", label: "Merit Scholarships Secured" },
    { value: "100%", label: "Unbiased Advisory Model" },
  ];

  return (
    <section
      className="relative min-h-screen bg-[#14120C] grain-ink flex flex-col overflow-hidden"
    >
      {/* Subtle parchment grid texture with restrained parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.032] pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: `linear-gradient(#F2EDE4 1px, transparent 1px), linear-gradient(90deg, #F2EDE4 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Status bar */}
      <div className="relative pt-28 lg:pt-32 px-6 lg:px-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2.5"
        >
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terra" />
          </span>
          <span className="label text-cream/40">Admissions Open · 2026 / 2027 Intakes</span>
        </motion.div>
      </div>

      {/* Main content grid */}
      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-12 py-8 lg:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end max-w-7xl mx-auto w-full">

          {/* Headline — 8 cols on desktop, full on mobile */}
          <div className="lg:col-span-8">
            <h1
              className="font-display font-normal text-cream leading-[0.93] tracking-[-0.025em] text-[2.75rem] min-[390px]:text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.8rem] xl:text-[7.4rem]"
            >
              Elite 1-on-1<br />
              Study Abroad<br />
              Mentorship.<br />
              <em className="text-terra not-italic italic font-normal tracking-tight">Zero Compromises.</em>
            </h1>

            {/* Urgency / capacity signal — soft glass pill */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-terra/25 bg-gradient-to-r from-terra/[0.12] via-terra/[0.06] to-transparent backdrop-blur-md px-4 py-1.5 shadow-[0_2px_14px_rgba(194,91,26,0.12)]"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terra" />
              </span>
              <span className="label text-[9px] text-terra/90 tracking-wider">
                Now Accepting Fall 2026 &amp; Spring 2027 Applications — Limited Mentor Capacity
              </span>
            </motion.div>

            {/* Mobile Stats: Horizontal scroll-snap strip (swipeable with Count-Up) */}
            <div className="lg:hidden mt-8">
              <div className="text-[10px] label text-cream/35 mb-3 tracking-widest">
                Verified Admissions Ledger
              </div>
              <div className="overflow-x-auto snap-x snap-mandatory flex gap-3.5 scrollbar-none pb-3 -mx-6 px-6 carousel-snap">
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="snap-start flex-none w-[72vw] max-w-[270px] rounded-xl border border-cream/[0.08] bg-gradient-to-b from-cream/[0.06] to-cream/[0.02] p-5 flex flex-col justify-between carousel-snap-item shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] card-hover-dark"
                  >
                    <div className="flex items-center justify-between border-b border-cream/[0.08] pb-2.5">
                      <span className="label text-[9px] text-cream/35">Metric 0{i + 1}</span>
                      <span className="text-[9px] text-terra label tracking-widest">Audited</span>
                    </div>
                    <div className="font-display text-3xl sm:text-4xl text-terra font-normal leading-none mt-3.5">
                      <StatCounter value={m.value} duration={1.6} />
                    </div>
                    <div className="label text-cream/65 text-[10px] mt-3 tracking-wider leading-relaxed">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Stats: 4 cols stacked ledger with staggered cascade & count-up */}
          <div className="hidden lg:grid lg:col-span-4 lg:grid-cols-1 gap-3.5">
            <div className="label text-cream/40 text-[10px] tracking-widest pl-1 mb-0.5">
              Verified Admissions Ledger
            </div>
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="rounded-xl p-5 bg-gradient-to-b from-cream/[0.045] to-cream/[0.015] border border-cream/[0.08] backdrop-blur-sm shadow-[0_4px_24px_-2px_rgba(0,0,0,0.3)] hover:border-cream/[0.16] hover:bg-cream/[0.05] hover:-translate-y-0.5 transition-all duration-300 group"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.35 + i * 0.08 }}
              >
                <div className="flex items-center justify-between border-b border-cream/[0.07] pb-2 mb-3">
                  <span className="label text-[9px] text-cream/35">Metric 0{i + 1}</span>
                  <span className="text-[9px] text-terra label tracking-widest">Audited</span>
                </div>
                <div className="font-display text-3xl lg:text-[2.6rem] text-terra font-normal leading-none">
                  <StatCounter value={m.value} duration={1.8} />
                </div>
                <div className="label text-cream/60 text-[10px] mt-2.5 tracking-wider leading-relaxed">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* University trust strip */}
      <motion.div
        className="relative border-t border-cream/[0.07] px-6 lg:px-12 py-4 max-w-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <span className="label text-cream/25 text-[9px] whitespace-nowrap flex-shrink-0">As trusted by students heading to</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {UNIVERSITY_MENTIONS.map((uni) => (
              <span
                key={uni}
                className="font-display text-cream/30 text-sm tracking-tight hover:text-cream/50 transition-colors cursor-default select-none"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom strip: body copy + CTAs with tactile press */}
      <motion.div
        className="relative border-t border-cream/10 px-6 lg:px-12 py-7 lg:py-8 max-w-full z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <p className="text-cream/45 text-sm lg:text-base leading-relaxed font-sans font-light max-w-lg">
            Personalized profile assessment, Ivy League &amp; Russell Group SOP curation, and foolproof consular visa prep — directly from a dedicated mentor.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Primary CTA — dominant, with glow */}
            <div className="flex flex-col items-stretch sm:items-start gap-1">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2.5 bg-terra hover:bg-terra-dark text-cream min-h-[52px] px-8 py-4 label rounded-lg transition-colors group text-center btn-primary-glow"
              >
                Book Strategy Session
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <span className="text-cream/35 text-[10px] font-sans font-light text-center sm:text-left px-1 leading-relaxed">
                No cost. No obligation. Direct mentor review.
              </span>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-row sm:flex-col gap-2.5">
              <a
                href="https://wa.me/33755749029?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-cream/70 hover:text-cream text-sm min-h-[44px] rounded-lg border border-cream/[0.12] bg-cream/[0.03] hover:bg-cream/[0.07] hover:border-terra/40 px-4 py-2.5 transition-all text-center btn-tactile flex-1 sm:flex-none shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-terra flex-shrink-0" />
                <span>Chat Live</span>
              </a>
              <a
                href="#destinations"
                className="inline-flex items-center justify-center gap-1.5 text-cream/40 hover:text-cream/70 text-sm min-h-[44px] rounded-lg px-3 py-2.5 transition-all text-center btn-tactile flex-1 sm:flex-none"
              >
                <ArrowDown className="h-3.5 w-3.5" />
                <span>See how it works</span>
              </a>
            </div>
          </div>
        </div>

        {/* Differentiator badges row */}
        <motion.div
          className="max-w-7xl mx-auto mt-5 flex flex-wrap items-center gap-2.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.85 }}
        >
          <div className="trust-badge">
            <ShieldCheck className="w-3 h-3 flex-shrink-0" />
            99.2% Visa Approval Rate
          </div>
          <div className="trust-badge">
            <ShieldCheck className="w-3 h-3 flex-shrink-0" />
            Zero Institutional Kickbacks
          </div>
          <span className="text-cream/20 text-[10px] font-light font-sans">Verified against official visa stamps</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
