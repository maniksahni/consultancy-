"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface DestinationItem {
  country: string;
  slug: string;
  flag: string;
  image: string;
  workRight: string;
  tuition: string;
  advisoryNote: string;
  stream: string;
}

const FEATURED_DESTINATIONS: DestinationItem[] = [
  {
    country: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    image: "/images/destinations/uk.webp",
    workRight: "2-Year Graduate Route",
    tuition: "£16,000 – £32,000 / yr",
    advisoryNote: "Fast-track 1-year master's degrees with Russell Group prestige and generous MOI English waivers.",
    stream: "High-ROI 1-Year Masters",
  },
  {
    country: "United States",
    slug: "usa",
    flag: "🇺🇸",
    image: "/images/destinations/usa.webp",
    workRight: "3-Year STEM OPT Extension",
    tuition: "$28,000 – $55,000 / yr",
    advisoryNote: "World's most lucrative corporate hiring ecosystem, backed by Ivy League prestige and high research funding.",
    stream: "Global Tech Hub & STEM Leaders",
  },
];

const SECONDARY_DESTINATIONS: DestinationItem[] = [
  {
    country: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    image: "/images/destinations/canada.webp",
    workRight: "Up to 3-Yr PGWP",
    tuition: "CAD 20k – 42k / yr",
    advisoryNote: "Clear post-graduation work rights and world-renowned co-op universities in Ontario and BC.",
    stream: "SDS Visa Stream Hub",
  },
  {
    country: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    image: "/images/destinations/germany.webp",
    workRight: "18-Month Job Seeker Visa",
    tuition: "€0 – €3,000 / yr (Public)",
    advisoryNote: "Tuition-free public research universities with rigorous APS India consular verification.",
    stream: "€0 Tuition Engineering",
  },
  {
    country: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    image: "/images/destinations/australia.webp",
    workRight: "2–4 Year Subclass 485",
    tuition: "AUD 32k – 54k / yr",
    advisoryNote: "Prestigious Group of Eight (Go8) institutions with transparent Genuine Student criteria.",
    stream: "Go8 Global Research Hubs",
  },
  {
    country: "Ireland",
    slug: "ireland",
    flag: "🇮🇪",
    image: "/images/destinations/ireland.webp",
    workRight: "2-Year Third Level Scheme",
    tuition: "€14k – €28k / yr",
    advisoryNote: "European tech capital for Fortune 500 tech & pharma giants with 1-year postgraduate options.",
    stream: "Silicon Docks Gateway",
  },
];

export default function DestinationShowcase() {
  return (
    <section id="destinations" className="bg-[#F2EDE4] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="border-t border-ink/15 pt-5 sm:pt-6 mb-10 sm:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-3">
              Curated Study Hubs
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Targeted Country Expertise.<br />
              <span className="text-terra italic inline-block pr-1">Clear Admissions Data.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink/65 font-light max-w-md leading-relaxed">
            Every country enforces distinct post-study work rules, living proofs, and visa thresholds. We guide you through verified consular regulations without guesswork.
          </p>
        </div>

        {/* ── Desktop: 2 Large Featured + 4 Smaller Grid | Mobile: Clean Stacked Cards ── */}
        <div className="space-y-6 sm:space-y-8">

          {/* Row 1: Two Featured Destination Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {FEATURED_DESTINATIONS.map((dest) => (
              <div
                key={dest.country}
                className="bg-white border border-ink/15 flex flex-col justify-between overflow-hidden group hover:border-ink/40 transition-colors"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative w-full h-44 sm:h-56 overflow-hidden border-b border-ink/10 bg-cream">
                    <img
                      src={dest.image}
                      alt={`${dest.country} landmark`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-sm border border-ink/10 flex items-center gap-2">
                      <span>{dest.flag}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink font-medium">
                        {dest.country}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-ink/90 text-cream px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider">
                      Featured Hub
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-7">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-terra font-medium">
                      {dest.stream}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal mt-1 leading-snug">
                      {dest.country}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/70 font-light leading-relaxed mt-2.5">
                      {dest.advisoryNote}
                    </p>

                    {/* Key Stats Bar */}
                    <div className="grid grid-cols-2 gap-3 py-3.5 mt-5 border-t border-b border-ink/10 font-mono text-xs">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-ink/40">Work Rights</div>
                        <div className="text-ink font-medium mt-0.5">{dest.workRight}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-ink/40">Tuition Range</div>
                        <div className="text-ink font-medium mt-0.5">{dest.tuition}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-7 pt-0">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="w-full inline-flex items-center justify-between border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream px-5 py-3 text-[10px] uppercase tracking-[0.2em] font-medium text-ink transition-colors group/btn"
                  >
                    <span>View {dest.country} Guide</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Four Secondary Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SECONDARY_DESTINATIONS.map((dest) => (
              <div
                key={dest.country}
                className="bg-white border border-ink/15 flex flex-col justify-between overflow-hidden group hover:border-ink/40 transition-colors"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative w-full h-36 sm:h-40 overflow-hidden border-b border-ink/10 bg-cream">
                    <img
                      src={dest.image}
                      alt={`${dest.country} landmark`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 text-xs border border-ink/10 flex items-center gap-1.5">
                      <span>{dest.flag}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-ink font-medium">
                        {dest.country}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    <div className="text-[9px] uppercase tracking-[0.18em] font-mono text-ink/45">
                      {dest.stream}
                    </div>
                    <h3 className="font-display text-xl text-ink font-normal mt-0.5 leading-snug">
                      {dest.country}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-ink/65 font-light leading-relaxed mt-2 line-clamp-2">
                      {dest.advisoryNote}
                    </p>

                    {/* Stats List */}
                    <div className="mt-3.5 pt-3 border-t border-ink/10 space-y-1.5 font-mono text-[10px]">
                      <div className="flex justify-between items-center text-ink/80">
                        <span className="text-ink/40 text-[9px] uppercase tracking-wider">Work:</span>
                        <span className="font-medium text-right">{dest.workRight}</span>
                      </div>
                      <div className="flex justify-between items-center text-ink/80">
                        <span className="text-ink/40 text-[9px] uppercase tracking-wider">Tuition:</span>
                        <span className="font-medium text-right">{dest.tuition}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="w-full inline-flex items-center justify-between border border-ink/15 hover:border-ink hover:bg-ink hover:text-cream px-3.5 py-2.5 text-[9px] uppercase tracking-[0.18em] font-medium text-ink transition-colors group/btn"
                  >
                    <span>Guide &amp; Requirements</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
