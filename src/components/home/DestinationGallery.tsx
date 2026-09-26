"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface DestinationItem {
  country: string;
  slug: string;
  flag: string;
  image: string;
  workRight: string;
  tuition: string;
  stream: string;
  tagline: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    country: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    image: "/images/destinations/uk.webp",
    workRight: "2-Yr Graduate Route",
    tuition: "£16k – £32k / yr",
    stream: "Fast-Track 1-Year Masters",
    tagline: "Russell Group excellence with generous MOI English waivers and London financial gateway.",
  },
  {
    country: "United States",
    slug: "usa",
    flag: "🇺🇸",
    image: "/images/destinations/usa.webp",
    workRight: "3-Yr STEM OPT",
    tuition: "$28k – $55k / yr",
    stream: "Ivy League & Tech Giants",
    tagline: "Lucrative Silicon Valley and Wall St corporate recruitment backed by world-leading faculty.",
  },
  {
    country: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    image: "/images/destinations/canada.webp",
    workRight: "Up to 3-Yr PGWP",
    tuition: "CAD 20k – 42k / yr",
    stream: "SDS Visa Stream",
    tagline: "World-class co-op universities in Ontario & BC with transparent post-study immigration pathways.",
  },
  {
    country: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    image: "/images/destinations/germany.webp",
    workRight: "18-Mo Job Seeker",
    tuition: "€0 – €3k / yr (Public)",
    stream: "€0 Tuition Engineering",
    tagline: "Tuition-free public universities verified via APS, leading global automotive and tech industries.",
  },
  {
    country: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    image: "/images/destinations/australia.webp",
    workRight: "2–4 Yr Subclass 485",
    tuition: "AUD 32k – 54k / yr",
    stream: "Go8 Research Hubs",
    tagline: "Transparent Genuine Student visa standard with high-wage part-time and post-study opportunities.",
  },
  {
    country: "Ireland",
    slug: "ireland",
    flag: "🇮🇪",
    image: "/images/destinations/ireland.webp",
    workRight: "2-Yr Third Level",
    tuition: "€14k – €28k / yr",
    stream: "Silicon Docks HQ",
    tagline: "European tech headquarters with 1-year degrees and rapid multinational corporate absorption.",
  },
];

// Duplicate slides so Embla loop: true always has ample buffer cards,
// completely preventing empty void or blank regions when dragged fast or flicked.
const SLIDES = [...DESTINATIONS, ...DESTINATIONS];

export default function DestinationGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      breakpoints: { "(min-width: 1024px)": { active: false } },
    },
    [WheelGesturesPlugin()]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToDot = useCallback(
    (targetDotIndex: number) => {
      if (!emblaApi) return;
      const current = emblaApi.selectedScrollSnap();
      const currentDot = ((current % DESTINATIONS.length) + DESTINATIONS.length) % DESTINATIONS.length;
      let diff = targetDotIndex - currentDot;
      if (diff > DESTINATIONS.length / 2) diff -= DESTINATIONS.length;
      if (diff < -DESTINATIONS.length / 2) diff += DESTINATIONS.length;
      emblaApi.scrollTo(current + diff);
    },
    [emblaApi]
  );

  // Keyboard navigation support when focused
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  const activeDot = ((selectedIndex % DESTINATIONS.length) + DESTINATIONS.length) % DESTINATIONS.length;

  return (
    <section
      id="destinations"
      className="bg-[#FAF7F2] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15 relative overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="border-t border-ink/15 pt-5 sm:pt-6 mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-3">
              02 / DESTINATIONS · Curated Global Study Hubs
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Targeted Country Expertise.<br />
              <span className="text-terra italic inline-block pr-1">Clear Admissions Data.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between lg:justify-end gap-5 lg:max-w-md">
            <p className="text-sm sm:text-base text-ink/65 font-light leading-relaxed">
              Every country enforces distinct post-study work rules, living proofs, and visa thresholds. We guide you through verified consular regulations without guesswork.
            </p>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex lg:hidden items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous destination"
                className="h-10 w-10 border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream text-ink flex items-center justify-center transition-colors rounded-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next destination"
                className="h-10 w-10 border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream text-ink flex items-center justify-center transition-colors rounded-none"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Touch-Swipeable Sliding Card Carousel (Infinite Loop) ── */}
        <div className="w-full overflow-hidden lg:overflow-visible">
          <div
            className="overflow-hidden w-full cursor-grab active:cursor-grabbing select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-terra/40 lg:overflow-visible lg:cursor-default lg:select-auto"
            ref={emblaRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            data-cursor-drag
            aria-label="Targeted Country Expertise Carousel"
            onKeyDown={onKeyDown}
          >
            <div className="flex -ml-4 sm:-ml-5 lg:ml-0 lg:grid lg:grid-cols-3 lg:gap-6 touch-pan-y lg:touch-auto">
              {SLIDES.map((dest, idx) => (
                <div
                  key={`${dest.slug}-${idx}`}
                  className={`flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-none pl-4 sm:pl-5 lg:pl-0 min-w-0 h-full ${idx >= DESTINATIONS.length ? "lg:hidden" : ""}`}
                >
                  <div
                    data-cursor-view
                    className="group relative h-[420px] sm:h-[460px] overflow-hidden border border-ink/20 bg-[#0B0A08] text-cream flex flex-col justify-end p-6 sm:p-7 rounded-none"
                  >
                    {/* Crisp 4-sided border overlay ensuring no image overlap */}
                    <div className="pointer-events-none absolute inset-0 border border-ink/20 z-20 group-hover:border-terra/50 transition-colors duration-[650ms]" />

                    {/* Background Image: Scale 1 -> 1.035 with unified luxury easing */}
                    <img
                      src={dest.image}
                      alt={`${dest.country} landmark`}
                      width={480}
                      height={640}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] brightness-[0.8] contrast-[1.05]"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Dark Gradient Overlay: Opacity slightly increases */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/60 to-black/20 transition-opacity duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-95" />

                    {/* Ambient Warm Corner Glow (Micro glow: 0.18-0.22) */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-terra/18 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-[650ms] pointer-events-none" />

                    {/* Content Overlay */}
                    <div className="relative z-10 transform transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]">
                      {/* Top Flag / Stream Pill */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-base">{dest.flag}</span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-terra bg-black/60 px-2.5 py-0.5 border border-terra/30">
                          {dest.stream}
                        </span>
                      </div>

                      {/* Country Name: translateY(0 -> -3px) */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream font-normal leading-tight transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[3px]">
                        {dest.country}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm text-cream/70 font-light mt-2 line-clamp-2 leading-relaxed">
                        {dest.tagline}
                      </p>

                      {/* Fact Bar: Metadata opacity .65 -> 1 */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 pt-3 border-t border-cream/15 font-mono text-[10px] text-cream/80 opacity-65 group-hover:opacity-100 transition-opacity duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]">
                        <div>
                          <span className="text-cream/40 uppercase tracking-wider block text-[8px]">
                            Post-Study Work
                          </span>
                          <span className="font-medium text-cream">{dest.workRight}</span>
                        </div>
                        <div className="border-l border-cream/15 pl-3 sm:pl-4">
                          <span className="text-cream/40 uppercase tracking-wider block text-[8px]">
                            Tuition Range
                          </span>
                          <span className="font-medium text-cream">{dest.tuition}</span>
                        </div>
                      </div>

                      {/* Explore Link with Terracotta Expanding Hairline: width 24px (w-6) -> 100% */}
                      <div className="mt-4 pt-2">
                        <Link
                          href={`/destinations/${dest.slug}`}
                          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-cream group-hover:text-terra transition-colors duration-[650ms]"
                        >
                          <span>Explore {dest.country} Dossier</span>
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                        <div className="h-[1.5px] w-6 group-hover:w-full bg-terra/70 transition-all duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] mt-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tappable Pagination Dots Indicator (1-to-1 with unique destinations) ── */}
          <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8 lg:hidden">
            {DESTINATIONS.map((dest, idx) => (
              <button
                key={dest.slug}
                type="button"
                onClick={() => scrollToDot(idx)}
                aria-label={`Jump to ${dest.country}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === activeDot
                    ? "w-7 bg-terra"
                    : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
