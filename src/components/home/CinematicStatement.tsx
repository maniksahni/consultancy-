"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicStatement() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Small, disciplined scroll-linked transforms
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.65, 0.95],
    [0.25, 1, 1, 0.3]
  );

  const line1X = useTransform(scrollYProgress, [0.15, 0.45], [-36, 0]);
  const line2X = useTransform(scrollYProgress, [0.18, 0.48], [36, 0]);
  const line3Scale = useTransform(scrollYProgress, [0.22, 0.52], [0.96, 1]);

  const accentY = useTransform(scrollYProgress, [0.3, 0.58], [18, 0]);
  const accentOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  // Subtle moving ambient radial glow
  const glowX = useTransform(scrollYProgress, [0.2, 0.8], ["-10%", "10%"]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.12, 0.28, 0.12]);

  return (
    <section
      ref={containerRef}
      aria-label="Editorial Intermission"
      className="relative bg-[#0B0A08] text-cream py-24 sm:py-32 lg:py-44 border-b border-cream/10 overflow-hidden flex items-center justify-center min-h-[55vh] sm:min-h-[65vh] lg:min-h-[75vh]"
    >
      {/* ── Layer 1: Ambient Slow Moving Glow ── */}
      <motion.div
        style={{
          x: glowX,
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, rgba(194,91,26,0.26) 0%, rgba(227,107,32,0.10) 45%, transparent 70%)",
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] lg:w-[820px] h-[340px] sm:h-[480px] rounded-full blur-[110px] lg:blur-[140px]"
      />

      {/* Hairline subtle top / bottom accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[1px] bg-gradient-to-r from-transparent via-terra/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-[1px] bg-gradient-to-r from-transparent via-terra/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16 relative z-10 text-center">
        {/* Editorial Section Mono Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-cream/10 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-7 sm:mb-9">
          <span className="h-1.5 w-1.5 rounded-full bg-terra" />
          <span>03 / PERSPECTIVE</span>
        </div>

        {/* ── Main Monumental Typography ── */}
        <motion.div style={{ opacity: containerOpacity }} className="select-none">
          <div className="font-display font-normal text-[clamp(2.15rem,7.5vw,4.5rem)] sm:text-6xl lg:text-[4.75rem] leading-[0.95] tracking-[-0.03em] uppercase">
            
            {/* Line 1: Enters slightly from left */}
            <div className="overflow-hidden py-1">
              <motion.span style={{ x: line1X }} className="block">
                YOUR DESTINATION
              </motion.span>
            </div>

            {/* Line 2: Enters slightly from right */}
            <div className="overflow-hidden py-1">
              <motion.span style={{ x: line2X }} className="block text-cream/90">
                IS ONLY HALF
              </motion.span>
            </div>

            {/* Line 3: Subtle scale 0.96 -> 1 */}
            <div className="overflow-hidden py-1">
              <motion.span style={{ scale: line3Scale }} className="block">
                THE DECISION.
              </motion.span>
            </div>
          </div>

          {/* Accent: The Strategy Changes Everything */}
          <div className="overflow-hidden pt-4 sm:pt-6">
            <motion.p
              style={{ y: accentY, opacity: accentOpacity }}
              className="font-display italic text-terra text-2xl sm:text-3xl lg:text-4xl leading-tight drop-shadow-[0_0_24px_rgba(194,91,26,0.30)]"
            >
              The Strategy Changes Everything.
            </motion.p>
          </div>

          {/* Supporting Micro-Detail */}
          <motion.p
            style={{ opacity: accentOpacity }}
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-cream/45 mt-6 sm:mt-8 max-w-md mx-auto"
          >
            Curated Admissions Mentorship · 100% Fiduciary Standard
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
