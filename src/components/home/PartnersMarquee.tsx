"use client";

import React from "react";
import { Building2, Sparkles, Star } from "lucide-react";

/* ============================================================
   PARTNER UNIVERSITIES — extended, realistic data
============================================================ */

interface UniversityPartner {
  name: string;
  country: string;
  flag: string;
  ranking: string;
  tier: "elite" | "top" | "strong";
}

const row1Universities: UniversityPartner[] = [
  { name: "University of Leeds", country: "United Kingdom", flag: "🇬🇧", ranking: "Russell Group | QS #86", tier: "top" },
  { name: "Northeastern University Boston", country: "United States", flag: "🇺🇸", ranking: "Top STEM OPT Hub", tier: "top" },
  { name: "University of Waterloo", country: "Canada", flag: "🇨🇦", ranking: "Tech & Co-op Leader", tier: "elite" },
  { name: "Monash University", country: "Australia", flag: "🇦🇺", ranking: "Go8 | QS #53", tier: "top" },
  { name: "TU Munich (TUM)", country: "Germany", flag: "🇩🇪", ranking: "TU9 | QS #37", tier: "elite" },
  { name: "Trinity College Dublin", country: "Ireland", flag: "🇮🇪", ranking: "QS #81", tier: "top" },
  { name: "Imperial College London", country: "United Kingdom", flag: "🇬🇧", ranking: "QS #2", tier: "elite" },
  { name: "Arizona State University", country: "United States", flag: "🇺🇸", ranking: "#1 US Innovation", tier: "top" },
  { name: "University of British Columbia", country: "Canada", flag: "🇨🇦", ranking: "QS #38", tier: "elite" },
  { name: "University of Melbourne", country: "Australia", flag: "🇦🇺", ranking: "Go8 | QS #33", tier: "elite" },
  { name: "RWTH Aachen University", country: "Germany", flag: "🇩🇪", ranking: "TU9 | Engineering #1", tier: "elite" },
  { name: "University College Dublin", country: "Ireland", flag: "🇮🇪", ranking: "Top EU Research", tier: "top" },
];

const row2Universities: UniversityPartner[] = [
  { name: "University of Waterloo", country: "Canada", flag: "🇨🇦", ranking: "Silicon Valley North", tier: "elite" },
  { name: "University of Sheffield", country: "United Kingdom", flag: "🇬🇧", ranking: "Russell Group", tier: "top" },
  { name: "SUNY Binghamton", country: "United States", flag: "🇺🇸", ranking: "Top State Flagship", tier: "strong" },
  { name: "University of Sydney", country: "Australia", flag: "🇦🇺", ranking: "Go8 | QS #19", tier: "elite" },
  { name: "KIT Karlsruhe", country: "Germany", flag: "🇩🇪", ranking: "TU9 | Engineering Top 5", tier: "top" },
  { name: "University of Galway", country: "Ireland", flag: "🇮🇪", ranking: "Top Research Uni", tier: "strong" },
  { name: "University of Exeter", country: "United Kingdom", flag: "🇬🇧", ranking: "Top 10 UK", tier: "top" },
  { name: "UMass Amherst", country: "United States", flag: "🇺🇸", ranking: "STEM OPT Powerhouse", tier: "strong" },
  { name: "University of Ottawa", country: "Canada", flag: "🇨🇦", ranking: "Bilingual Research Uni", tier: "strong" },
  { name: "Queensland University of Technology", country: "Australia", flag: "🇦🇺", ranking: "Top 10 Australia", tier: "top" },
  { name: "TU Berlin", country: "Germany", flag: "🇩🇪", ranking: "TU9 | QS Top 150", tier: "top" },
  { name: "Cork Institute of Technology", country: "Ireland", flag: "🇮🇪", ranking: "Tech Hub Partner", tier: "strong" },
];

/* ============================================================
   CARD COMPONENT
============================================================ */

const tierStyles = {
  elite: "border-blue-500/40 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
  top: "border-white/[0.08] bg-slate-900/60 shadow-md",
  strong: "border-white/[0.06] bg-slate-950/60 shadow-sm",
};

function UniCard({ uni }: { uni: UniversityPartner }) {
  return (
    <div
      className={`mx-3 flex-shrink-0 flex items-center gap-3.5 rounded-2xl border ${tierStyles[uni.tier]} px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-blue-400/50 hover:bg-slate-900/90 hover:scale-[1.02] group cursor-default`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-lg group-hover:scale-110 transition-transform flex-shrink-0 shadow-inner">
        {uni.flag}
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors whitespace-nowrap">
            {uni.name}
          </span>
          {uni.tier === "elite" && (
            <Star className="h-3 w-3 text-amber-400 fill-amber-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
          <span>{uni.country}</span>
          <span>•</span>
          <span className="font-semibold text-emerald-400">{uni.ranking}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function PartnersMarquee() {
  const row1Items = [...row1Universities, ...row1Universities];
  const row2Items = [...row2Universities, ...row2Universities];

  return (
    <section className="py-16 bg-[#030712] border-y border-white/[0.08] overflow-hidden relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-36 bg-blue-600/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Official Direct Application Partners
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          We Process Applications for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
            300+ Global Universities
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
          Fast-tracked offer letters, application fee waivers &amp; direct admission officer coordination across UK, USA, Canada, Australia, Germany and Ireland.
        </p>
      </div>

      {/* ROW 1 — left to right */}
      <div className="relative w-full overflow-hidden mb-3.5">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee py-1.5">
          {row1Items.map((uni, idx) => (
            <UniCard key={`r1-${idx}`} uni={uni} />
          ))}
        </div>
      </div>

      {/* ROW 2 — right to left (reverse) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee-reverse py-1.5">
          {row2Items.map((uni, idx) => (
            <UniCard key={`r2-${idx}`} uni={uni} />
          ))}
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-14">
          {[
            { value: "300+", label: "Partner Universities" },
            { value: "6", label: "Countries Covered" },
            { value: "48h", label: "Avg. Offer Letter Time" },
            { value: "100%", label: "Application Fee Waivers" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white font-display">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
