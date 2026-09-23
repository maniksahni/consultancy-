"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import StatCounter from "@/components/common/StatCounter";

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease: EASE }}
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
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
          >
            <h1
              className="font-display font-normal text-cream leading-[0.88] tracking-[-0.025em] text-[2.75rem] min-[390px]:text-[3.15rem] sm:text-6xl md:text-7xl lg:text-[7.2rem]"
            >
              Elite 1-on-1<br />
              Study Abroad<br />
              Mentorship.<br />
              <em className="text-terra not-italic italic">Zero Compromises.</em>
            </h1>

            {/* Mobile Stats: Horizontal scroll-snap strip (swipeable with Count-Up) */}
            <div className="lg:hidden mt-8">
              <div className="flex items-center justify-between text-[10px] label text-cream/35 mb-2.5">
                <span>Verified Admissions Ledger</span>
                <span className="text-terra">Swipe 4 Metrics →</span>
              </div>
              <div className="overflow-x-auto snap-x snap-mandatory flex gap-3 scrollbar-none pb-2 -mx-6 px-6 carousel-snap">
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="snap-start flex-none w-[70vw] max-w-[260px] border border-cream/15 bg-cream/[0.03] p-4 flex flex-col justify-between carousel-snap-item shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-cream/10 pb-2">
                      <span className="label text-[9px] text-cream/30">Metric 0{i + 1}</span>
                      <span className="text-[9px] text-terra label">Audited</span>
                    </div>
                    <div className="font-display text-3xl sm:text-4xl text-terra font-normal leading-none mt-3.5">
                      <StatCounter value={m.value} duration={1.6} />
                    </div>
                    <div className="label text-cream/65 text-[10px] mt-2.5 tracking-wider leading-relaxed">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desktop Stats: 4 cols stacked ledger with staggered cascade & count-up */}
          <div className="hidden lg:grid lg:col-span-4 lg:grid-cols-1 gap-0">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                className="border-t border-cream/10 pt-4 pb-4 lg:pb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.35 + i * 0.08 }}
              >
                <div className="font-display text-3xl lg:text-[2.6rem] text-terra font-normal leading-none">
                  <StatCounter value={m.value} duration={1.8} />
                </div>
                <div className="label text-cream/35 mt-2">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2.5 bg-terra hover:bg-terra-dark text-cream min-h-[48px] px-7 py-3.5 label transition-colors group text-center btn-tactile btn-tactile-dark"
            >
              Book Strategy Session
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://wa.me/33755749029?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-cream/60 hover:text-cream text-sm min-h-[48px] border border-cream/15 hover:border-cream/40 px-5 py-3 transition-all text-center btn-tactile"
            >
              <MessageCircle className="h-4 w-4 text-terra" />
              Direct WhatsApp Inquiry
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
