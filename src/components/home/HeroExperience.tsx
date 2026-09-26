"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { EASE_LUXURY, maskedLineVariants, eyebrowVariants, terracottaBloomVariants } from "@/lib/motion";

const HeroWebGL = dynamic(() => import("@/components/hero/HeroWebGL"), { ssr: false });

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  // Desktop subtle mouse parallax (max 6-8px, disabled on touch/mobile)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const moveX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const moveXReverse = useTransform(springX, [-0.5, 0.5], [6, -6]);
  const moveYReverse = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      rectRef.current = containerRef.current?.getBoundingClientRect() || null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!rectRef.current) {
      rectRef.current = containerRef.current?.getBoundingClientRect() || null;
    }
    const rect = rectRef.current;
    if (!rect) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#0B0A08] text-cream pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-18 lg:pb-24 border-b border-cream/10 overflow-hidden"
    >
      {/* Layer 2: WebGL ribbon */}
      <div data-hero-parallax className="pointer-events-none absolute inset-0"><HeroWebGL /></div>

      <svg aria-hidden="true" className="absolute h-0 w-0 pointer-events-none" focusable="false">
        <filter id="hero-liquid-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="11" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Layer 3: Cinematic Slow-Drifting Warm Radial Glow */}
      <motion.div
        animate={{
          x: [0, 18, -12, 0],
          y: [0, -14, 10, 0],
          opacity: [0.75, 0.95, 0.8, 0.75],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-24 right-0 lg:right-10 w-[350px] sm:w-[550px] lg:w-[750px] h-[350px] sm:h-[550px] lg:h-[750px] rounded-full blur-[90px] lg:blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(194,91,26,0.22) 0%, rgba(227,107,32,0.12) 40%, transparent 70%)",
        }}
      />

      {/* Secondary Soft Cream Ambient Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[100px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(242,237,228,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-10 lg:gap-14 items-center">

          {/* ── LEFT: Cinematic Editorial Headline & Narrative (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Eyebrow Pill: Rendered immediately for instant paint */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/[0.04] border border-cream/15 rounded-none mb-5 sm:mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-terra" />
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase text-cream/75 font-mono">
                  Private Global Admissions Mentorship
                </span>
              </div>

              {/* Headline: Rendered directly in HTML for instant FCP/LCP with zero hydration delay */}
              <h1 className="font-display font-normal text-cream leading-[0.93] tracking-[-0.03em] text-[clamp(2.5rem,8.5vw,2.875rem)] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.75rem] break-words">
                {/* Line 1: STUDY ABROAD, */}
                <span className="block py-0.5">
                  STUDY ABROAD,
                </span>

                {/* Line 2: WITHOUT THE */}
                <span className="block py-0.5 text-cream/90">
                  WITHOUT THE
                </span>

                {/* Line 3: AGENCY NOISE. */}
                <span className="block py-0.5">
                  AGENCY NOISE.
                </span>

                {/* Accent: Built Around You. — Instant high-priority LCP paint */}
                <span className="block py-1 text-terra italic pr-2 drop-shadow-[0_0_25px_rgba(194,91,26,0.35)]">
                  Built Around You.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-cream/70 text-[15px] sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mt-5 sm:mt-7">
                Independent, one-to-one guidance for ambitious students navigating university selection, applications, and visa preparation across leading global destinations.
              </p>
            </div>

            {/* CTAs with Glow and Kinetic Hover */}
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#booking"
                className="liquid-cta glow-button bg-terra hover:bg-terra-dark text-cream min-h-[48px] sm:min-h-[50px] px-8 py-3.5 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium text-center transition-all inline-flex items-center justify-center gap-3 group shadow-[0_0_24px_rgba(194,91,26,0.25)] hover:shadow-[0_0_32px_rgba(194,91,26,0.38)]"
              >
                <span>Book a Strategy Session</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#destinations"
                className="border border-cream/25 hover:border-cream text-cream hover:bg-white/[0.04] min-h-[48px] sm:min-h-[50px] px-7 py-3.5 rounded-none text-[11px] uppercase tracking-[0.18em] font-medium text-center transition-all inline-flex items-center justify-center gap-2.5 backdrop-blur-sm"
              >
                <Compass className="h-4 w-4 text-cream/60" />
                <span>Explore Study Destinations</span>
              </a>
            </div>

            {/* Trust Micro-Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-8 pt-6 border-t border-cream/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.18em] font-mono text-cream/40"
            >
              <span className="flex items-center gap-1.5 text-cream/60">
                <ShieldCheck className="h-3.5 w-3.5 text-terra" />
                Zero Recruiter Commissions
              </span>
              <span>·</span>
              <span>Fall 2026 &amp; Spring 2027 Open</span>
            </motion.div>
          </div>

          {/* ── RIGHT: Cinematic Layered Visual Composition (5 cols, hidden on mobile) ── */}
          <div className="hidden sm:block lg:col-span-5 relative">
            {/* Parallax Container on Desktop */}
            <motion.div
              style={{ x: moveX, y: moveY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full sm:max-w-md lg:max-w-none"
            >
              {/* Backlight Glow Behind Visual */}
              <div className="absolute inset-0 bg-gradient-to-tr from-terra/20 via-terra/5 to-transparent blur-2xl -z-10 hidden sm:block" />

              {/* Main Primary Image Panel: Mentor in 1px Hairline Frame */}
              <div className="relative border border-cream/20 bg-[#14120C] p-1 sm:p-4 shadow-2xl overflow-hidden">
                <div className="relative h-[220px] w-full overflow-hidden bg-cream/5 border border-cream/10 min-[390px]:h-[228px] min-[428px]:h-[236px] sm:h-auto sm:aspect-[4/5] sm:max-h-[460px] lg:max-h-none">
                  <picture>
                    <source srcSet="/images/mentor-hero.webp" type="image/webp" />
                    <img
                      src="/images/mentor-hero.jpg"
                      alt="Senior Admissions Mentor in consultation session"
                      width={560}
                      height={700}
                      className="absolute inset-0 h-full w-full object-cover object-top contrast-[1.05] brightness-[0.98]"
                      fetchPriority="high"
                      loading="eager"
                    />
                  </picture>
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Overlaid Bottom Title */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-cream font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                    <span className="px-2 py-0.5 bg-[#0B0A08]/90 border border-cream/20">
                      Single Dedicated Mentor
                    </span>
                    <span className="text-terra font-medium">Boutique Fiduciary</span>
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Panel: Plane / International Flight (Depth Layer) */}
              <motion.div
                style={{ x: moveXReverse, y: moveYReverse }}
                className="absolute -bottom-6 -left-6 sm:-left-8 w-44 sm:w-52 border border-cream/25 bg-[#14120C]/95 backdrop-blur-md p-2 shadow-2xl hidden sm:block"
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-cream/10">
                  <img
                    src="/images/hero-plane.webp"
                    alt="International global departure"
                    width={208}
                    height={130}
                    className="w-full h-full object-cover grayscale contrast-125"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-terra/10 mix-blend-overlay" />
                </div>
                <div className="pt-2 px-1 flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-cream/60">
                  <span>Departure 2026/27</span>
                  <span className="text-terra">6 Global Hubs</span>
                </div>
              </motion.div>

              {/* Floating Verified Badge: inside on mobile, floating on desktop */}
              <div className="absolute top-2.5 right-2.5 sm:-top-3.5 sm:-right-3 lg:-top-4 lg:-right-5 bg-[#0B0A08]/95 border border-terra/40 px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-xl backdrop-blur-md flex items-center gap-1.5 sm:gap-2 z-20">
                <span className="h-1.5 w-1.5 rounded-full bg-terra animate-pulse" />
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-cream">
                  100% Unbiased Advisory
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
