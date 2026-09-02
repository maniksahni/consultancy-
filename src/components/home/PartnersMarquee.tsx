"use client";

import React from "react";
import { Building2, Sparkles, CheckCircle } from "lucide-react";

interface UniversityPartner {
  name: string;
  country: string;
  flag: string;
  ranking: string;
}

const partnerUniversities: UniversityPartner[] = [
  { name: "University of Oxford", country: "United Kingdom", flag: "🇬🇧", ranking: "QS #3" },
  { name: "Harvard University", country: "United States", flag: "🇺🇸", ranking: "Ivy League" },
  { name: "University of Toronto", country: "Canada", flag: "🇨🇦", ranking: "QS #21" },
  { name: "University of Melbourne", country: "Australia", flag: "🇦🇺", ranking: "Go8 #1" },
  { name: "TU Munich (TUM)", country: "Germany", flag: "🇩🇪", ranking: "TU9 Germany" },
  { name: "Trinity College Dublin", country: "Ireland", flag: "🇮🇪", ranking: "Top Irish Uni" },
  { name: "Imperial College London", country: "United Kingdom", flag: "🇬🇧", ranking: "QS #2" },
  { name: "New York University (NYU)", country: "United States", flag: "🇺🇸", ranking: "Top 25 Global" },
  { name: "University of British Columbia", country: "Canada", flag: "🇨🇦", ranking: "U15 Group" },
  { name: "University of Sydney", country: "Australia", flag: "🇦🇺", ranking: "Go8 #2" },
  { name: "Heidelberg University", country: "Germany", flag: "🇩🇪", ranking: "Excellence Uni" },
  { name: "University College Dublin", country: "Ireland", flag: "🇮🇪", ranking: "Top Research" },
];

export default function PartnersMarquee() {
  // Double list for continuous seamless infinite loop
  const marqueeItems = [...partnerUniversities, ...partnerUniversities];

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800 overflow-hidden relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-2">
          <Sparkles className="h-3.5 w-3.5" /> Official Direct Application Partners
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          We Process Applications for 300+ Global Universities
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Fast-tracked offer letters, application fee waivers, and direct admission officer coordination.
        </p>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden mask-gradient">
        {/* Left & Right gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee py-2">
          {marqueeItems.map((uni, idx) => (
            <div
              key={idx}
              className="mx-3 flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 shadow-md backdrop-blur-sm transition hover:border-blue-500/50 hover:bg-slate-950 group cursor-default"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Building2 className="h-4 w-4" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                    {uni.name}
                  </span>
                  <span className="text-xs">{uni.flag}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{uni.country}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-400">{uni.ranking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
