"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";

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

  // Loop support: Clone the first 2 hubs at the end for seamless forward circular wrapping (PROTECTED)
  const displayHubs = [...hubs, hubs[0], hubs[1]];

  const isResettingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const resetLoopPosition = useCallback(() => {
    if (!carouselRef.current || isResettingRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    if (!card) return;
    const cardStep = card.clientWidth + 16;
    const rawIndex = Math.round(container.scrollLeft / cardStep);

    if (rawIndex >= hubs.length) {
      isResettingRef.current = true;
      const targetIndex = rawIndex % hubs.length;
      const targetScrollLeft = targetIndex * cardStep;

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
    const cardStep = cardWidth + 16;
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
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null || !carouselRef.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    const container = carouselRef.current;
    const card = container.querySelector('.carousel-snap-item') as HTMLElement;
    const cardStep = (card?.clientWidth || window.innerWidth * 0.86) + 16;
    const rawIndex = Math.round(container.scrollLeft / cardStep);

    if (rawIndex === 0 && deltaX > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
      container.scrollTo({
        left: (hubs.length - 1) * cardStep,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="destinations"
      className="bg-[#F2EDE4] py-28 sm:py-36 lg:py-48 overflow-hidden w-full text-ink"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Section header: Radical negative space, monumental typography ── */}
        <div className="border-t border-ink/15 pt-12 sm:pt-16 mb-16 sm:mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-ink/40 font-mono mb-6">
                Curated Global Study Hubs
              </div>
              <h2 className="font-display font-normal text-ink leading-[0.88] tracking-[-0.035em] text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl">
                Targeted Country Expertise.<br />
                {/* Exactly ONE terracotta accent in this entire section */}
                <span className="text-terra italic">Clear Admissions Data.</span>
              </h2>
            </div>
            <p className="text-ink/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              Every country enforces distinct financial proofs, post-study work regulations, and visa thresholds. We guide you through verified consular data without guesswork.
            </p>
          </div>
        </div>

        {/* ── MOBILE: Finger-Swipeable Horizontal Carousel (Protected logic preserved) ── */}
        <div className="lg:hidden pb-6">
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 pb-4 scrollbar-none carousel-snap"
          >
            {/* Leading spacer for true centering */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />

            {displayHubs.map((hub, i) => {
              const slug = slugMap[hub.country];
              const isClone = i >= hubs.length;

              return (
                <div
                  key={`${hub.country}-${i}`}
                  aria-hidden={isClone ? true : undefined}
                  className="snap-center flex-none w-[86vw] p-6 rounded-none border border-ink/15 bg-white text-ink flex flex-col justify-between carousel-snap-item relative"
                >
                  <div>
                    {/* Landmark photo banner: sharp edges, no soft styling */}
                    <div className="relative w-full h-44 rounded-none overflow-hidden mb-6 border border-ink/10">
                      <img
                        src={`/images/destinations/${slug}.webp`}
                        alt={`${hub.country} landmark`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <CountryFlag country={hub.country} size="md" />
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono">
                        {hub.stream}
                      </div>
                      <h3 className="font-display font-normal text-3xl text-ink leading-tight mt-1">
                        {hub.country}
                      </h3>
                    </div>

                    {/* Essential Tag: clean 1px hairline */}
                    <div className="mt-3">
                      <span className="inline-block border border-ink/20 text-ink/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-mono">
                        {hub.tag}
                      </span>
                    </div>

                    {/* Key Data Ledger: flat 1px hairlines */}
                    <div className="border-t border-b border-ink/10 divide-y divide-ink/10 my-6">
                      <div className="py-2.5 flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono">Post-Study Work</span>
                        <span className="text-xs font-medium text-ink text-right">{hub.psw}</span>
                      </div>
                      <div className="py-2.5 flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono">Average Tuition</span>
                        <span className="text-xs font-medium text-ink text-right">{hub.avgTuition}</span>
                      </div>
                      <div className="py-2.5 flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono">Proof of Funds</span>
                        <span className="text-xs font-medium text-ink text-right">{hub.proofOfFunds}</span>
                      </div>
                    </div>

                    {/* Advantages: plain text with hairline dashes */}
                    <ul className="space-y-2 mb-6 text-xs text-ink/75 font-light leading-relaxed">
                      {hub.advantages.map((adv, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="text-ink/40 mt-0.5">–</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions: stark, high-contrast, rounded-none */}
                  <div className="pt-4 border-t border-ink/10 flex flex-col gap-2.5">
                    <a
                      href={`https://wa.me/33755749029?text=${encodeURIComponent(hub.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-ink text-cream hover:bg-ink/90 min-h-[46px] px-4 rounded-none text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                    >
                      <span>Discuss {hub.country} Strategy</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {slug && (
                      <Link
                        href={`/destinations/${slug}`}
                        className="w-full flex items-center justify-center gap-1.5 border border-ink/20 text-ink/80 hover:border-ink hover:text-ink min-h-[44px] px-4 rounded-none text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                      >
                        Full Country Guide →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Trailing spacer */}
            <div aria-hidden="true" className="flex-none w-[calc(7vw-14px)] pointer-events-none" />
          </div>

          {/* Mobile Pagination indicator */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-2">
            {hubs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!carouselRef.current) return;
                  const container = carouselRef.current;
                  const card = container.querySelector('.carousel-snap-item') as HTMLElement;
                  const cardWidth = card?.clientWidth || (window.innerWidth * 0.86);
                  container.scrollTo({ left: idx * (cardWidth + 16), behavior: "smooth" });
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1 transition-all duration-300 ${
                  idx === activeMobileIndex ? "w-8 bg-ink" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: Wide Editorial Blocks (Flat, 0px radius, 1px hairlines) ── */}
        <div className="hidden lg:block space-y-12">
          {hubs.map((hub, i) => {
            const slug = slugMap[hub.country];
            const code = countryCodes[hub.country];

            return (
              <motion.div
                key={hub.country}
                className="rounded-none p-10 bg-white border border-ink/15 grid grid-cols-12 gap-10 items-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              >
                {/* Photo Thumbnail */}
                <div className="col-span-3">
                  <div className="relative w-full h-52 rounded-none overflow-hidden border border-ink/10">
                    <img
                      src={`/images/destinations/${slug}.webp`}
                      alt={`${hub.country} landmark`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <CountryFlag country={hub.country} size="md" />
                    </div>
                    <div className="absolute bottom-3 left-3 text-cream font-display font-light text-xl tracking-tight bg-ink/80 px-2.5 py-0.5">
                      {code}
                    </div>
                  </div>
                </div>

                {/* Country Name + Visa Stream + Tag + Advantages */}
                <div className="col-span-4 space-y-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono">
                      {hub.stream}
                    </div>
                    <h3 className="font-display font-normal text-3xl lg:text-4xl text-ink leading-tight mt-1">
                      {hub.country}
                    </h3>
                  </div>

                  <div>
                    <span className="inline-block border border-ink/20 text-ink/80 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-mono">
                      {hub.tag}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-2 text-sm text-ink/70 font-light leading-relaxed">
                    {hub.advantages.map((adv, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-ink/40 mt-1">–</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Ledger + CTAs */}
                <div className="col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div className="border-t border-b border-ink/10 divide-y divide-ink/10">
                    {[
                      { label: "Post-Study Work", value: hub.psw },
                      { label: "Average Tuition", value: hub.avgTuition },
                      { label: "Proof of Funds", value: hub.proofOfFunds },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="py-3 grid grid-cols-2 gap-4 items-baseline"
                      >
                        <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 font-mono">{label}</span>
                        <span className="text-sm text-ink font-medium leading-relaxed">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <a
                      href={`https://wa.me/33755749029?text=${encodeURIComponent(hub.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-ink text-cream hover:bg-ink/90 px-6 py-3.5 rounded-none text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                    >
                      <span>Discuss {hub.country} Strategy</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {slug && (
                      <Link
                        href={`/destinations/${slug}`}
                        className="text-[10px] uppercase tracking-[0.2em] font-medium text-ink/60 hover:text-ink border-b border-ink/20 hover:border-ink pb-1 transition-colors"
                      >
                        Full Country Guide →
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
