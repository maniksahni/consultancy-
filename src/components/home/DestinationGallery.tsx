"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/experience/TiltCard";

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

const PRIMARY_DESTINATIONS: DestinationItem[] = [
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
];

const SECONDARY_DESTINATIONS: DestinationItem[] = [
  {
    country: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    image: "/images/destinations/canada.webp",
    workRight: "Up to 3-Yr PGWP",
    tuition: "CAD 20k – 42k / yr",
    stream: "SDS Visa Stream",
    tagline: "World-class co-op universities in Ontario & BC.",
  },
  {
    country: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    image: "/images/destinations/germany.webp",
    workRight: "18-Mo Job Seeker",
    tuition: "€0 – €3k / yr (Public)",
    stream: "€0 Tuition Engineering",
    tagline: "Tuition-free public universities verified via APS.",
  },
  {
    country: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    image: "/images/destinations/australia.webp",
    workRight: "2–4 Yr Subclass 485",
    tuition: "AUD 32k – 54k / yr",
    stream: "Go8 Research Hubs",
    tagline: "Transparent Genuine Student visa standard.",
  },
  {
    country: "Ireland",
    slug: "ireland",
    flag: "🇮🇪",
    image: "/images/destinations/ireland.webp",
    workRight: "2-Yr Third Level",
    tuition: "€14k – €28k / yr",
    stream: "Silicon Docks HQ",
    tagline: "European tech headquarters with 1-year degrees.",
  },
];

export default function DestinationGallery() {
  return (
    <section id="destinations" className="bg-[#FAF7F2] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="border-t border-ink/15 pt-5 sm:pt-6 mb-10 sm:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-3">
              Curated Global Study Hubs
            </span>
            <h2 data-reveal-heading className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Targeted Country Expertise.<br />
              <span className="text-terra italic inline-block pr-1">Clear Admissions Data.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink/65 font-light max-w-md leading-relaxed">
            Every country enforces distinct post-study work rules, living proofs, and visa thresholds. We guide you through verified consular regulations without guesswork.
          </p>
        </div>

        {/* ── Dynamic Motion Image Grid ── */}
        <div className="space-y-6 sm:space-y-8">

          {/* Row 1: UK & USA Large Vertical Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {PRIMARY_DESTINATIONS.map((dest, idx) => (
              <TiltCard key={dest.country}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.08 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-[380px] sm:h-[440px] lg:h-[480px] overflow-hidden border border-ink/20 bg-[#0B0A08] text-cream flex flex-col justify-end p-6 sm:p-8"
              >
                {/* Background Image with Smooth Scale */}
                <img
                  src={dest.image}
                  alt={`${dest.country} landmark`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] brightness-[0.85] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/50 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                {/* Ambient Warm Corner Glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-terra/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content Overlay (Rises 4px on hover) */}
                <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-1">
                  {/* Top Flag / Stream Pill */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">{dest.flag}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-terra bg-black/60 px-2.5 py-0.5 border border-terra/30">
                      {dest.stream}
                    </span>
                  </div>

                  {/* Country Name */}
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream font-normal leading-tight">
                    {dest.country}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-cream/70 font-light mt-2 max-w-lg leading-relaxed">
                    {dest.tagline}
                  </p>

                  {/* Fact Bar */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-cream/15 font-mono text-[10px] text-cream/80">
                    <div>
                      <span className="text-cream/40 uppercase tracking-wider block text-[8px]">Post-Study Work</span>
                      <span className="font-medium text-cream">{dest.workRight}</span>
                    </div>
                    <div className="border-l border-cream/15 pl-4">
                      <span className="text-cream/40 uppercase tracking-wider block text-[8px]">Tuition Range</span>
                      <span className="font-medium text-cream">{dest.tuition}</span>
                    </div>
                  </div>

                  {/* Explore Link with Terracotta Expanding Hairline */}
                  <div className="mt-5 pt-3">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-cream group-hover:text-terra transition-colors"
                    >
                      <span>Explore {dest.country} Dossier</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                    {/* Expanding Terracotta Line */}
                    <div className="h-[1.5px] w-12 group-hover:w-full bg-terra/60 transition-all duration-500 mt-1" />
                  </div>
                </div>
              </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* Row 2: Four Supporting Destination Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SECONDARY_DESTINATIONS.map((dest, idx) => (
              <TiltCard key={dest.country}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-[290px] sm:h-[320px] overflow-hidden border border-ink/15 bg-[#0B0A08] text-cream flex flex-col justify-end p-5"
              >
                {/* Background Image */}
                <img
                  src={dest.image}
                  alt={`${dest.country} landmark`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] brightness-[0.8] contrast-[1.05]"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/60 to-black/10" />

                {/* Content Overlay */}
                <div className="relative z-10 transform transition-transform duration-400 group-hover:-translate-y-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm">{dest.flag}</span>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-terra">
                      {dest.stream}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-cream font-normal">
                    {dest.country}
                  </h3>

                  <div className="mt-2 text-[10px] font-mono text-cream/70 flex justify-between border-t border-cream/15 pt-2">
                    <span>{dest.workRight}</span>
                    <span>{dest.tuition}</span>
                  </div>

                  <div className="mt-3">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-mono text-cream group-hover:text-terra transition-colors"
                    >
                      <span>Explore →</span>
                    </Link>
                    <div className="h-[1px] w-8 group-hover:w-full bg-terra/60 transition-all duration-400 mt-0.5" />
                  </div>
                </div>
              </motion.div>
              </TiltCard>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
