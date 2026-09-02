"use client";

import React, { useRef } from "react";
import { 
  GraduationCap, 
  DollarSign, 
  Briefcase, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface DestinationItem {
  id: string;
  name: string;
  flag: string;
  badge: string;
  avgTuition: string;
  pswRights: string;
  highlights: string[];
  popularPrograms: string[];
}

const destinations: DestinationItem[] = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    badge: "1-Year Fast Track Masters",
    avgTuition: "£13,000 - £22,000 / yr",
    pswRights: "2-Year Graduate Route PSW",
    highlights: [
      "Save 1 full year on Masters degrees",
      "No IELTS required (MOI waiver available)",
      "High graduate employability in London & Manchester"
    ],
    popularPrograms: ["MSc Data Science", "MBA / Management", "FinTech", "Health Sciences"]
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    badge: "3-Year STEM OPT Extension",
    avgTuition: "$20,000 - $40,000 / yr",
    pswRights: "Up to 3 Years STEM OPT",
    highlights: [
      "World's top research universities & Ivy League",
      "Massive campus hiring by Fortune 500 tech companies",
      "Curricular Practical Training (CPT) during studies"
    ],
    popularPrograms: ["MS Computer Science & AI", "Data Analytics", "Biotech", "MBA"]
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    badge: "Direct PR & Express Entry",
    avgTuition: "CAD 15,000 - 25,000 / yr",
    pswRights: "Up to 3 Years PGWP",
    highlights: [
      "Clear permanent residency pathways (PNP / Express Entry)",
      "SDS fast-track visa processing with GIC",
      "Spousal open work permit for master's students"
    ],
    popularPrograms: ["Cloud Computing", "Cybersecurity", "Supply Chain", "Project Mgt."]
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    badge: "Highest Minimum Student Wage",
    avgTuition: "AUD 20,000 - 35,000 / yr",
    pswRights: "2 to 4 Years Post-Study Work",
    highlights: [
      "AUD $24.10/hr minimum part-time wage",
      "World-class Group of Eight (Go8) universities",
      "Regional area study gives +1 to 2 extra PSW years"
    ],
    popularPrograms: ["Information Technology", "Nursing & Healthcare", "Civil Engg", "Finance"]
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    badge: "€0 Tuition at State Universities",
    avgTuition: "€0 - €3,000 / yr (Public Unis)",
    pswRights: "18-Month Jobseeker Residence",
    highlights: [
      "Tuition-free world-class technical education (TU9)",
      "Europe's #1 industrial and automotive powerhouse",
      "Fast-track EU Blue Card and PR in 21 months"
    ],
    popularPrograms: ["Automotive & Mechanical", "Robotics / Industry 4.0", "AI", "Renewable Energy"]
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    badge: "European Tech & Pharma Hub",
    avgTuition: "€11,000 - €22,000 / yr",
    pswRights: "2-Year Stamp 1G Stay Back",
    highlights: [
      "European HQ for Google, Apple, Meta, Pfizer & TikTok",
      "Only English-speaking country in the Eurozone",
      "Critical Skills Employment Permit fast PR path"
    ],
    popularPrograms: ["Big Data Analytics", "Pharma Science", "Software Engg", "Digital Business"]
  }
];

export default function DestinationsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#030712] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-3">
              <GraduationCap className="h-4 w-4" /> Global Admissions 2026 / 2027
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
              Top Study Abroad Destinations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Swipe to compare post-study work visas, average tuition fees, and high-demand programs across all 6 leading study hubs.
            </p>
          </div>

          {/* Navigation Controls (Desktop & Mobile) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scroll("left")} 
              className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition shadow-lg active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")} 
              className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition shadow-lg active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="min-w-[320px] max-w-[320px] sm:min-w-[390px] sm:max-w-[390px] snap-center shrink-0 flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-xl p-6 sm:p-7 shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] hover:-translate-y-1 group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center gap-3.5 mb-5">
                  <span className="text-4xl drop-shadow-md" role="img" aria-label={dest.name}>
                    {dest.flag}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                      {dest.name}
                    </h3>
                    <span className="inline-block text-xs font-semibold text-blue-400 mt-0.5">
                      {dest.badge}
                    </span>
                  </div>
                </div>

                {/* Stats Boxes (Tuition & PSW) */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3.5 transition group-hover:border-slate-700">
                    <DollarSign className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase block">Average Annual Tuition</span>
                      <span className="font-bold text-slate-200 text-xs sm:text-sm">{dest.avgTuition}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3.5 transition group-hover:border-slate-700">
                    <Briefcase className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase block">Post-Study Work Rights</span>
                      <span className="font-bold text-slate-200 text-xs sm:text-sm">{dest.pswRights}</span>
                    </div>
                  </div>
                </div>

                {/* Key Advantages */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2.5">
                    Key Advantages:
                  </span>
                  <div className="space-y-2">
                    {dest.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Programs Tags */}
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">
                    Popular Programs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.popularPrograms.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <a
                  href="#eligibility-form"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 border border-slate-800 py-3 text-xs font-bold text-slate-200 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 group-hover:border-blue-500/60"
                >
                  <span>Explore Universities in {dest.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
