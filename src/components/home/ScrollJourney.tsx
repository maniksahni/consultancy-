"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const STAGES = [
  {
    num: "01",
    tag: "Weeks 1–2",
    title: "Profile Strategy & Goal Alignment",
    deliverable: "Diagnostic Dossier & Financial Roadmap",
    desc: "Rigorous audit of your transcripts, backlog context, test percentiles, and financial constraints to define realistic ambitious and target thresholds.",
  },
  {
    num: "02",
    tag: "Weeks 3–4",
    title: "Fiduciary University Shortlisting",
    deliverable: "Targeted 3-Tier Application Matrix",
    desc: "100% unbiased shortlist matching your academic profile and post-graduation salary potential, completely free of recruiter partner commissions.",
  },
  {
    num: "03",
    tag: "Weeks 5–8",
    title: "Bespoke Application & SOP Crafting",
    deliverable: "Polished Statements & Editorial Dossiers",
    desc: "Line-by-line narrative crafting for statements of purpose, resume structuring, and letters of recommendation with zero AI templates or automated drafts.",
  },
  {
    num: "04",
    tag: "Pre-Departure",
    title: "Consular Visa Mock Grilling",
    deliverable: "Certified Embassy Ready Dossier",
    desc: "Intensive 1-on-1 consular interview simulations, liquid funds verification, and genuine intent justification to ensure first-attempt visa stamping.",
  },
];

export default function ScrollJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.28) {
      setActiveStage(0);
    } else if (latest < 0.54) {
      setActiveStage(1);
    } else if (latest < 0.78) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="bg-[#0B0A08] text-cream py-20 sm:py-24 lg:py-32 border-b border-cream/10 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terra/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16 relative z-10">

        {/* ── Section Header ── */}
        <div className="border-t border-cream/15 pt-6 sm:pt-8 mb-16 sm:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-cream/45 block mb-3">
              04 / JOURNEY · The 4-Stage Mentorship Journey
            </span>
            <h2 data-reveal-heading className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
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
              <span>Explore Full Admissions Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── Cinematic Timeline with Center Vertical Glowing Line ── */}
        <div className="relative">

          {/* Background Guide Line (Desktop: centered; Mobile: left-aligned) */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-cream/10" />

          {/* Glowing Animated Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 bottom-0 left-4 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-gradient-to-b from-terra via-terra to-terra/40 shadow-[0_0_12px_rgba(194,91,26,0.8)] z-10"
          />

          {/* 4 Stages */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {STAGES.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStage === idx;

              return (
                <div
                  key={stage.num}
                  className="relative flex flex-col lg:flex-row items-start lg:items-center"
                >
                  {/* Glowing Node on Timeline */}
                  <div
                    className={`absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-[#0B0A08] border-2 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] z-20 flex items-center justify-center ${
                      isActive
                        ? "border-terra shadow-[0_0_18px_rgba(194,91,26,0.95)] scale-110"
                        : "border-cream/30 scale-95"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-[450ms] ${
                        isActive ? "bg-terra" : "bg-cream/40"
                      }`}
                    />
                  </div>

                  {/* Stage Card Content: Alternating on Desktop, Left-padded on Mobile */}
                  <div
                    className={`pl-12 sm:pl-16 lg:pl-0 w-full lg:w-[45%] transition-opacity duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "opacity-100" : "opacity-35"
                    } ${
                      isEven ? "lg:mr-auto lg:text-right" : "lg:ml-auto lg:text-left"
                    }`}
                  >
                    <div
                      className={`border p-6 sm:p-8 backdrop-blur-sm relative transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "bg-white/[0.04] border-terra/40 shadow-[0_0_30px_rgba(194,91,26,0.12)]"
                          : "bg-white/[0.01] border-cream/10"
                      }`}
                    >
                      {/* Top Timing & Number */}
                      <div
                        className={`flex items-center gap-3 pb-3 border-b border-cream/10 mb-4 font-mono text-[9px] uppercase tracking-wider text-cream/50 ${
                          isEven ? "lg:justify-end" : "justify-start"
                        }`}
                      >
                        <span
                          className={`transition-colors duration-[450ms] ${
                            isActive ? "text-terra font-semibold" : "text-cream/50"
                          }`}
                        >
                          Stage {stage.num}
                        </span>
                        <span>·</span>
                        <span>{stage.tag}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-display text-2xl sm:text-3xl font-normal leading-snug transition-colors duration-[450ms] ${
                          isActive ? "text-cream" : "text-cream/70"
                        }`}
                      >
                        {stage.title}
                      </h3>

                      {/* Deliverable Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 mt-2 font-mono text-[10px] text-cream/70 ${
                          isEven ? "lg:justify-end" : "justify-start"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-3.5 w-3.5 flex-shrink-0 transition-colors duration-[450ms] ${
                            isActive ? "text-terra" : "text-cream/40"
                          }`}
                        />
                        <span>{stage.deliverable}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-cream/65 font-light leading-relaxed mt-3">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
