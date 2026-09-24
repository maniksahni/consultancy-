"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";

const EASE = [0.22, 1, 0.36, 1] as const;

const slugMap: Record<string, string> = {
  "United Kingdom": "uk",
  "United States": "usa",
  Canada: "canada",
  Germany: "germany",
  Australia: "australia",
  Ireland: "ireland",
};

const countryCodes: Record<string, string> = {
  "United Kingdom": "UK",
  "United States": "US",
  Canada: "CA",
  Germany: "DE",
  Australia: "AU",
  Ireland: "IE",
};

export default function StudyDestinations() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const hubs = [
    {
      country: "United Kingdom",
      stream: "Student Route (Subclass)",
      psw: "2 Years Graduate Route (3 Years PhD)",
      avgTuition: "£14,000 – £26,000 / yr",
      proofOfFunds: "28-Day Maintenance Fund Rule (~£12k–£15k)",
      advantages: [
        "1-Year accelerated Master's — 50% lower tuition & living cost",
        "IELTS waiver (MOI) options based on Class 12 English score",
      ],
      tag: "1-Yr Masters",
      whatsappMsg: "Hi! I am interested in UK Master's and want to assess my profile.",
    },
    {
      country: "United States",
      stream: "F-1 Non-Immigrant Visa",
      psw: "Up to 3 Years STEM OPT",
      avgTuition: "$24,000 – $48,000 / yr",
      proofOfFunds: "1-Year Liquid Funds (I-20 estimate verification)",
      advantages: [
        "Highest global starting salaries in Tech & STEM",
        "3-year OPT extension for STEM graduates",
      ],
      tag: "STEM OPT 3-Yr",
      whatsappMsg: "Hi! I am targeting US F-1 programs and need scholarship advice.",
    },
    {
      country: "Canada",
      stream: "Study Permit (SDS / Non-SDS)",
      psw: "Up to 3 Years Post-Graduation Work Permit (PGWP)",
      avgTuition: "CAD 18,000 – 36,000 / yr",
      proofOfFunds: "CAD 20,635 GIC Deposit + First-Year Tuition",
      advantages: [
        "Clear legal pathway to Permanent Residency via Express Entry / PNP",
        "Spouse open work permit during master's programs",
      ],
      tag: "PGWP to PR",
      whatsappMsg: "Hi! I want to understand Canada Master's and PGWP compliance.",
    },
    {
      country: "Germany",
      stream: "National Visa (Subclass D)",
      psw: "18 Months Jobseeker Visa",
      avgTuition: "€0 at Public Universities (Nominal admin fee)",
      proofOfFunds: "Blocked Account: €11,904 / yr (2026/27 threshold)",
      advantages: [
        "Zero tuition at top-tier German public research universities",
        "Europe's strongest engineering & green-tech economy",
      ],
      tag: "€0 Tuition Public",
      whatsappMsg: "Hi! I am aiming for tuition-free German Public Universities.",
    },
    {
      country: "Australia",
      stream: "Subclass 500 Student Visa",
      psw: "2 to 4 Years Temporary Graduate (485)",
      avgTuition: "AUD 28,000 – 44,000 / yr",
      proofOfFunds: "Annual Living AUD 29,710 + 1st Year Tuition",
      advantages: [
        "Group of Eight (Go8) world top-50 globally ranked institutions",
        "Regional post-study visa extensions for high-growth sectors",
      ],
      tag: "Go8 Excellence",
      whatsappMsg:
        "Hi! I need guidance for Australia Subclass 500 and Genuine Student statement.",
    },
    {
      country: "Ireland",
      stream: "Irish Student Visa (AVATS)",
      psw: "2 Years Stamp 1G Graduate Scheme",
      avgTuition: "€13,000 – €24,000 / yr",
      proofOfFunds: "€10,000 Immediate Living Proof + Course Fee",
      advantages: [
        "European HQ for Google, Apple, Meta, Pfizer & Stripe",
        "English-speaking EU economy with fast-track 1-Year Master's",
      ],
      tag: "Silicon Docks",
      whatsappMsg:
        "Hi! I want to discuss Ireland 1-Year Master's and Silicon Docks tech opportunities.",
    },
  ];

  // Loop support: Clone the first 2 hubs at the end for seamless forward circular wrapping
  const displayHubs = [...hubs, hubs[0], hubs[1]];

  const isResettingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const resetLoopPosition = useCallback(() => {
    if (!carouselRef.current || isResettingRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    if (!card) return;
    const cardStep = card.clientWidth + 14;
    const rawIndex = Math.round(container.scrollLeft / cardStep);

    if (rawIndex >= hubs.length) {
      isResettingRef.current = true;
      const targetIndex = rawIndex % hubs.length;
      const targetScrollLeft = targetIndex * cardStep;

      // Temporarily remove carousel-snap class to avoid animation or snap friction during instant teleport
      container.classList.remove("carousel-snap");
      container.style.scrollBehavior = "auto";
      container.scrollLeft = targetScrollLeft;

      requestAnimationFrame(() => {
        container.classList.add("carousel-snap");
        container.style.scrollBehavior = "";
        isResettingRef.current = false;
      });
    }
  }, [hubs.length]);

  const handleMobileScroll = () => {
    if (!carouselRef.current || isResettingRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
    const cardStep = cardWidth + 14;
    const rawIndex = Math.round(container.scrollLeft / cardStep);
    const newIndex = rawIndex % hubs.length;
    setActiveMobileIndex((prev) => (prev !== newIndex ? newIndex : prev));

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      resetLoopPosition();
    }, 120);
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      resetLoopPosition();
    };

    container.addEventListener("scrollend", handleScrollEnd);
    return () => {
      container.removeEventListener("scrollend", handleScrollEnd);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [resetLoopPosition]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || !carouselRef.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    const cardStep = (card?.clientWidth || window.innerWidth * 0.86) + 14;
    const rawIndex = Math.round(container.scrollLeft / cardStep);

    // If at card 0 (UK) and user swipes right (backwards), smoothly loop to last card (Ireland)
    if (rawIndex === 0 && deltaX > 40) {
      container.scrollTo({
        left: (hubs.length - 1) * cardStep,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="destinations"
      className="bg-cream py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <div className="border-t border-ink/12 pt-10 mb-8 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="label text-stone mb-4">Curated Global Study Hubs</div>
            <h2
              className="font-display font-normal text-ink leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Targeted Country Expertise.<br />
              <em>Clear Admissions Data.</em>
            </h2>
          </div>
          <p className="text-stone text-sm leading-relaxed max-w-full sm:max-w-sm font-light">
            Every country enforces distinct financial proofs, post-study work regulations, and visa thresholds. We guide you through the verified data without guesswork.
          </p>
        </div>

        {/* ── MOBILE: Finger-Swipeable Horizontal Carousel (No Arrow Buttons, Peek Reveal) ── */}
        <div className="lg:hidden pb-6">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 -mx-6 pb-3 scrollbar-none carousel-snap"
          >
            {/* Leading spacer for true centering of first card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />

            {displayHubs.map((hub, i) => {
              const slug = slugMap[hub.country];
              const code = countryCodes[hub.country];
              const isDark = i % 2 === 0;
              const isClone = i >= hubs.length;

              return (
                <div
                  key={`${hub.country}-${i}`}
                  aria-hidden={isClone ? true : undefined}
                  className={`snap-center flex-none w-[86vw] p-6 border flex flex-col justify-between carousel-snap-item relative ${
                    isDark
                      ? "bg-[#14120C] text-cream border-cream/10 card-hover-dark"
                      : "bg-cream-50 text-ink border-ink/10 card-hover"
                  }`}
                >
                  {/* Passport Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="relative flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <CountryFlag country={hub.country} size="lg" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-normal text-2xl leading-tight">
                            {hub.country}
                          </h3>
                          <div className="label text-[10px] opacity-60 mt-0.5">
                            {hub.stream}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`border px-2 py-1 text-center font-display text-xs tracking-wider select-none flex-shrink-0 ${
                          isDark ? "border-cream/20 text-cream/40" : "border-ink/20 text-ink/40"
                        }`}
                      >
                        ENTRY #{code}
                      </div>
                    </div>

                    {/* Strategic tag */}
                    <div className="mt-3">
                      <span className="inline-block border border-terra/30 bg-terra/10 text-terra px-2.5 py-1 text-[10px] label">
                        {hub.tag}
                      </span>
                    </div>

                    {/* Key Stats: Tight 2-column mini-grid */}
                    <div className="grid grid-cols-2 gap-2 my-4">
                      <div
                        className={`p-2.5 border ${
                          isDark ? "border-cream/10 bg-cream/[0.03]" : "border-ink/10 bg-cream"
                        }`}
                      >
                        <div className="label text-[9px] opacity-50 mb-0.5">Post-Study Work</div>
                        <div className="text-xs font-medium leading-snug">{hub.psw}</div>
                      </div>
                      <div
                        className={`p-2.5 border ${
                          isDark ? "border-cream/10 bg-cream/[0.03]" : "border-ink/10 bg-cream"
                        }`}
                      >
                        <div className="label text-[9px] opacity-50 mb-0.5">Average Tuition</div>
                        <div className="text-xs font-medium leading-snug text-terra">
                          {hub.avgTuition}
                        </div>
                      </div>
                      <div
                        className={`p-2.5 border ${
                          isDark ? "border-cream/10 bg-cream/[0.03]" : "border-ink/10 bg-cream"
                        }`}
                      >
                        <div className="label text-[9px] opacity-50 mb-0.5">Proof of Funds</div>
                        <div className="text-xs font-medium leading-snug">{hub.proofOfFunds}</div>
                      </div>
                      <div
                        className={`p-2.5 border ${
                          isDark ? "border-cream/10 bg-cream/[0.03]" : "border-ink/10 bg-cream"
                        }`}
                      >
                        <div className="label text-[9px] opacity-50 mb-0.5">Visa Category</div>
                        <div className="text-xs font-medium leading-snug">{hub.stream}</div>
                      </div>
                    </div>

                    {/* Strategic Advantages */}
                    <ul className="space-y-1.5 mb-5 text-xs font-light leading-relaxed">
                      {hub.advantages.map((adv, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-terra font-bold">–</span>
                          <span className="opacity-80">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions with tactile buttons */}
                  <div className="space-y-2 pt-2 border-t border-current/10">
                    <a
                      href={`https://wa.me/33755749029?text=${encodeURIComponent(hub.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-terra hover:bg-terra-dark text-cream min-h-[44px] py-2.5 px-4 label text-[10px] transition-colors btn-primary-glow"
                    >
                      Discuss {hub.country} Strategy
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {slug && (
                      <Link
                        href={`/destinations/${slug}`}
                        className={`w-full flex items-center justify-center gap-1.5 border min-h-[44px] py-2.5 px-4 label text-[10px] transition-colors btn-tactile ${
                          isDark
                            ? "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream"
                            : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
                        }`}
                      >
                        Full Country Guide →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Trailing spacer for true centering of last card: (100vw - 86vw)/2 - gap = 7vw - 14px */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Dot pagination indicator with width-expand animation */}
          <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
            {hubs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!carouselRef.current) return;
                  const container = carouselRef.current;
                  const card = container.querySelector('.carousel-snap-item') as HTMLElement;
                  const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
                  container.scrollTo({ left: idx * (cardWidth + 14), behavior: "smooth" });
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  idx === activeMobileIndex ? "w-6 bg-terra" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: Wide Editorial Strips (hidden on mobile) ── */}
        <div className="hidden lg:block">
          {hubs.map((hub, i) => {
            const slug = slugMap[hub.country];
            const code = countryCodes[hub.country];

            return (
              <motion.div
                key={hub.country}
                className="border-t border-ink/10 py-10 grid grid-cols-12 gap-10 group"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.04 }}
              >
                {/* Large country code — decorative typography */}
                <div className="col-span-2 flex items-start gap-3">
                  <div>
                    <div
                      className="font-display font-light text-ink/10 leading-none tracking-tighter select-none"
                      style={{ fontSize: "clamp(56px, 5.5vw, 80px)" }}
                    >
                      {code}
                    </div>
                    <div className="mt-2 relative inline-flex items-center justify-center">
                      <CountryFlag country={hub.country} size="md" />
                    </div>
                  </div>
                </div>

                {/* Country name + tag + advantages (staggered list) */}
                <div className="col-span-5 space-y-4">
                  <div>
                    <h3
                      className="font-display font-normal text-ink tracking-tight leading-none"
                      style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
                    >
                      {hub.country}
                    </h3>
                    <div className="label text-stone mt-1.5">{hub.stream}</div>
                  </div>

                  <div className="inline-flex items-center border border-terra/25 bg-terra/[0.06] text-terra px-3 py-1 label">
                    {hub.tag}
                  </div>

                  <ul className="space-y-3 pt-1">
                    {hub.advantages.map((adv, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + j * 0.07, ease: EASE }}
                        className="flex items-start gap-3 text-sm text-stone font-light leading-relaxed"
                      >
                        <span className="text-terra mt-[3px] flex-shrink-0 text-base leading-none">–</span>
                        <span>{adv}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Metrics ledger + CTAs */}
                <div className="col-span-5 space-y-5">
                  <div className="space-y-0">
                    {[
                      { label: "Post-Study Work", value: hub.psw },
                      { label: "Average Tuition", value: hub.avgTuition },
                      { label: "Proof of Funds", value: hub.proofOfFunds },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="border-t border-ink/8 pt-3 pb-3 grid grid-cols-2 gap-4 items-start"
                      >
                        <span className="label text-stone">{label}</span>
                        <span className="text-sm text-ink font-medium leading-relaxed">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-5">
                    <a
                      href={`https://wa.me/33755749029?text=${encodeURIComponent(hub.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-terra text-sm border-b border-terra/35 hover:border-terra pb-0.5 transition-colors group-hover:gap-2 btn-tactile"
                    >
                      Discuss {hub.country} Strategy
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {slug && (
                      <Link
                        href={`/destinations/${slug}`}
                        className="text-sm text-stone border-b border-stone/25 hover:border-stone/70 hover:text-ink pb-0.5 transition-colors btn-tactile"
                      >
                        Full Country Guide →
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Close with bottom rule */}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}
