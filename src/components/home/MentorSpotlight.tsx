"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function MentorSpotlight() {
  return (
    <section id="mentorship" className="bg-[#FAF7F2] text-ink py-12 sm:py-24 lg:py-32 border-b border-ink/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Asymmetric Layout: Dramatic Image + High-Impact Typography ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-center">

          {/* LEFT: Dramatic Image with Warm Glow Behind & Floating Badge (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Warm Glow Lighting Behind Image */}
            <div
              className="absolute -inset-2 sm:-inset-6 bg-gradient-to-tr from-terra/30 via-terra/10 to-transparent blur-3xl -z-10 rounded-full hidden sm:block"
            />

            {/* Architectural Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full sm:max-w-md lg:max-w-none border border-ink/15 bg-white p-1 sm:p-4 shadow-2xl"
            >
              <div className="relative h-[220px] w-full overflow-hidden bg-cream border border-ink/10 min-[390px]:h-[228px] min-[428px]:h-[236px] sm:h-auto sm:aspect-[4/5] sm:max-h-[460px] lg:max-h-none">
                <picture>
                  <source srcSet="/images/mentor-spotlight.webp" type="image/webp" />
                  <img
                    src="/images/mentor-spotlight.jpg"
                    alt="Senior Admissions Mentor in consultation session"
                    width={560}
                    height={700}
                    className="absolute inset-0 h-full w-full object-cover object-top contrast-[1.03] brightness-[0.98]"
                    loading="lazy"
                  />
                </picture>
                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Micro-Caption */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white font-mono text-[8px] sm:text-[9px] uppercase tracking-wider">
                  <span className="px-2 py-0.5 bg-black/75 backdrop-blur-sm border border-white/20">
                    Fiduciary Practice
                  </span>
                  <span className="text-terra-light font-medium drop-shadow">Senior Mentor</span>
                </div>
              </div>

              {/* Floating Top Badge: inside on mobile, floating on desktop */}
              <div className="absolute top-2.5 right-2.5 sm:-top-3.5 sm:-right-3 lg:-right-4 bg-ink text-cream border border-terra/50 px-3 py-1.5 shadow-xl font-mono text-[8px] sm:text-[9px] uppercase tracking-widest flex items-center gap-1.5 sm:gap-2 z-20">
                <span className="h-1.5 w-1.5 rounded-full bg-terra animate-pulse" />
                <span>DIRECT 1-ON-1 ADVISORY</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Typography & Principles (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-terra" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/50">
                  The Mentorship Principle
                </span>
              </div>

              {/* High-Impact Headline */}
              <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight">
                ONE STUDENT.<br />
                ONE STRATEGY.<br />
                ONE MENTOR.<br />
                <span className="text-terra italic inline-block pr-1">No Rotating Counsellors.</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-ink/75 font-light leading-relaxed mt-5 sm:mt-6">
                When you apply to premier global universities, your future cannot be treated like a call-center ticket. We deliberately cap our student roster each cycle to ensure every statement of purpose, university shortlist, and consular mock session is personally evaluated by your dedicated mentor.
              </p>
            </div>

            {/* Three Principles with Hairline Borders */}
            <div className="mt-8 pt-6 border-t border-ink/15 space-y-4">
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
                className="glow-button inline-flex items-center gap-2.5 bg-ink text-cream hover:bg-ink/90 min-h-[48px] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all group"
              >
                <span>See How Mentorship Works</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
