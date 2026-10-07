"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

const ADVISORY_PILLARS = [
  {
    num: "01",
    title: "Profile Strategy",
    desc: "Diagnostic evaluation of GPA, career ROI, and financial runway.",
  },
  {
    num: "02",
    title: "University Shortlisting",
    desc: "100% unbiased selection without agency kickbacks or partner quotas.",
  },
  {
    num: "03",
    title: "Application & SOP Review",
    desc: "Line-by-line editorial narrative crafting tailored to admission committees.",
  },
  {
    num: "04",
    title: "Visa Preparation",
    desc: "Consular interview mock simulations & verified financial dossier scrutiny.",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-[#14120C] text-cream pt-24 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 border-b border-cream/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Asymmetric Two-Column Editorial Composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: Monumental Editorial Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-terra" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cream/50 font-mono">
                  Private Global Admissions Mentorship
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-normal text-cream leading-[0.93] sm:leading-[0.9] tracking-[-0.03em] text-[clamp(2.35rem,9.2vw,3.15rem)] sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] break-words">
                Study Abroad,<br />
                Without the<br />
                Agency Noise.<br />
                <span className="text-terra italic inline-block pr-1">Built Around You.</span>
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p className="text-cream/70 text-[15px] sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mt-6 sm:mt-8">
                Independent, one-to-one guidance for ambitious students navigating university selection, applications, and visa preparation across leading global destinations.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <a
                href="#booking"
                className="bg-cream text-ink hover:bg-cream/90 min-h-[48px] px-7 py-3.5 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium text-center transition-colors inline-flex items-center justify-center gap-2.5 group"
              >
                <span>Book a Strategy Session</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#destinations"
                className="border border-cream/20 hover:border-cream/50 text-cream min-h-[48px] px-6 py-3.5 rounded-none text-[11px] uppercase tracking-[0.18em] font-medium text-center transition-colors inline-flex items-center justify-center gap-2.5"
              >
                <Compass className="h-3.5 w-3.5 text-cream/60" />
                <span>Explore Study Destinations</span>
              </a>
            </div>

            {/* Trust Micro-Row */}
            <div className="mt-8 pt-6 border-t border-cream/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.18em] font-mono text-cream/40">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-terra" />
                Zero Recruiter Commissions
              </span>
              <span>·</span>
              <span>Fall 2026 &amp; Spring 2027 Open</span>
            </div>
          </motion.div>

          {/* RIGHT: Refined Advisory Brief Panel (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 border border-cream/15 bg-white/[0.02] p-5 sm:p-7 lg:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-cream/10">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-cream/45">
                Advisory Brief
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-terra px-2 py-0.5 border border-terra/30">
                1-on-1 Standard
              </span>
            </div>

            {/* Step-by-Step Pillars */}
            <div className="divide-y divide-cream/10">
              {ADVISORY_PILLARS.map((pillar) => (
                <div key={pillar.num} className="py-4 sm:py-5 flex items-start gap-4">
                  <span className="font-mono text-xs text-cream/30 mt-0.5 flex-shrink-0">
                    {pillar.num}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg sm:text-xl text-cream font-normal leading-snug">
                      {pillar.title}
                    </h2>
                    <p className="text-xs text-cream/60 font-light leading-relaxed mt-1">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Guarantee Rule */}
            <div className="pt-4 border-t border-cream/10 flex flex-col gap-1">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-cream/80">
                Direct 1-on-1 Mentorship
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] font-mono text-cream/40">
                No Institutional Kickbacks · Unbiased Strategy
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
