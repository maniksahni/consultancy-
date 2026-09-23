"use client";

import React from "react";
import Link from "next/link";
import { 
  Globe2, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Banknote, 
  Calendar,
  Sparkles,
  MessageCircle,
  ExternalLink
} from "lucide-react";

export default function MentorDestinations() {
  const destinations = [
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      code: "UK",
      accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
      badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      highlight: "1-Yr Masters & Fast-Track ROI",
      duration: "1 Year Master's / 3 Year Bachelor's",
      avgCost: "£14,000 - £26,000 / yr",
      intakes: "Sep/Oct & Jan/Feb",
      mentorPillars: [
        "1-Yr Masters saving 50% tuition and living expenditure",
        "Graduate Route (PSW) 2-Year unrestricted post-study work",
        "MOI (Medium of Instruction) waiver guidance (No IELTS needed for eligible students)",
        "Russell Group strategic application framing",
      ],
      whatsappMsg: "Hi! I am interested in UK 1-Yr Masters and want to evaluate my profile.",
    },
    {
      country: "United States",
      flag: "🇺🇸",
      code: "USA",
      accent: "from-sky-500/20 via-blue-500/10 to-transparent",
      badgeColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      highlight: "STEM OPT & Ivy/Tier-1 Research Hubs",
      duration: "2 Year Master's / 4 Year Bachelor's",
      avgCost: "$24,000 - $48,000 / yr",
      intakes: "Fall (Aug) & Spring (Jan)",
      mentorPillars: [
        "3-Year STEM OPT extension for high-paying US tech & engineering roles",
        "Intensive F-1 consular interview preparation & mock grilling",
        "DS-160 scrutiny to prevent 214(b) immigrant intent flags",
        "Research assistantship (RA/TA) & scholarship application guidance",
      ],
      whatsappMsg: "Hi! I need guidance for USA F-1 admissions, STEM OPT and visa interview prep.",
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      code: "Canada",
      accent: "from-red-500/20 via-amber-500/10 to-transparent",
      badgeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      highlight: "High Living Quality & Up to 3-Yr PGWP",
      duration: "1-2 Year Post-Grad / 4 Year Degree",
      avgCost: "CAD 18,000 - 34,000 / yr",
      intakes: "Fall (Sep), Winter (Jan), Summer (May)",
      mentorPillars: [
        "Study Permit & PAL (Provincial Attestation Letter) compliance",
        "PGWP (Post-Graduation Work Permit) eligible university selection",
        "GIC (Guaranteed Investment Certificate) and financial structuring",
        "Bulletproof SOP to clear dual-intent visa scrutiny",
      ],
      whatsappMsg: "Hi! I want help with Canadian university selection and Study Permit documentation.",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      code: "Germany",
      accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      highlight: "€0 Tuition at World-Class Public Universities",
      duration: "1.5 - 2 Year Master's",
      avgCost: "€0 Tuition (Nominal €350/sem contribution)",
      intakes: "Winter (Oct) & Summer (Apr)",
      mentorPillars: [
        "APS Certificate expediting & India verification guidance",
        "Public university applications with €0 tuition fee structures",
        "Blocked Account (Sperrkonto) setup & visa appointment navigation",
        "English-taught curriculum alignment & ECTS credit mapping",
      ],
      whatsappMsg: "Hi! I am aiming for tuition-free German Public Universities and need APS guidance.",
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      code: "Australia",
      accent: "from-amber-500/20 via-orange-500/10 to-transparent",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      highlight: "Top Global Rankings & High Post-Study Wages",
      duration: "2 Year Master's / 3 Year Bachelor's",
      avgCost: "AUD 30,000 - 46,000 / yr",
      intakes: "Semester 1 (Feb) & Semester 2 (Jul)",
      mentorPillars: [
        "Genuine Student (GS) statement drafting matching new Home Affairs rules",
        "Subclass 500 visa filing with verified financial documentation",
        "Group of Eight (Go8) university application strategy",
        "Regional study post-study extension advisory",
      ],
      whatsappMsg: "Hi! I need help with Australia Subclass 500 visa and Genuine Student (GS) statement.",
    },
    {
      country: "Ireland",
      flag: "🇮🇪",
      code: "Ireland",
      accent: "from-teal-500/20 via-emerald-500/10 to-transparent",
      badgeColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
      highlight: "Silicon Docks European Tech Headquarters",
      duration: "1 Year Master's / 3-4 Year Bachelor's",
      avgCost: "€13,000 - €25,000 / yr",
      intakes: "Autumn (Sep) & Spring (Jan)",
      mentorPillars: [
        "Silicon Docks tech opportunities (Google, Meta, Apple EMEA HQs)",
        "Stamp 1G 2-Year Graduate Post-Study Work Visa guidance",
        "Fast-track 1-Year Master's degrees in Tech, Data & Finance",
        "Irish student visa (AVATS) document readiness",
      ],
      whatsappMsg: "Hi! I want to discuss Ireland 1-Year Master's and Silicon Docks tech opportunities.",
    },
  ];

  return (
    <section id="destinations" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/5 via-emerald-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Target Country Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Countries I Personally{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              Guide You For
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            No generalized guesswork. Each country has strict immigration laws, university admission nuances, and post-study work rules that I guide you through step-by-step.
          </p>
        </div>

        {/* 6 Clean Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.code}
              className="group relative rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/30"
            >
              {/* Card top accent bar */}
              <div className={`absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r ${dest.accent} opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div>
                {/* Header: Flag, Name, Highlight */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow">{dest.flag}</span>
                    <div>
                      <h3 className="text-xl font-extrabold text-white font-display">
                        {dest.country}
                      </h3>
                      <span className={`inline-block text-[11px] font-semibold border rounded-full px-2 py-0.5 mt-1 ${dest.badgeColor}`}>
                        {dest.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Meta: Duration & Cost */}
                <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-2xl bg-slate-950/60 border border-white/[0.04]">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" /> Duration
                    </span>
                    <p className="text-xs font-bold text-white mt-1">{dest.duration}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Banknote className="h-3 w-3 text-emerald-400" /> Approx Cost
                    </span>
                    <p className="text-xs font-bold text-emerald-300 mt-1">{dest.avgCost}</p>
                  </div>
                </div>

                {/* Specific Mentorship Pillars */}
                <div className="space-y-2.5 my-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    My Mentorship Highlights:
                  </span>
                  {dest.mentorPillars.map((pillar, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2.5">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(dest.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 px-3 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Discuss {dest.code}</span>
                </a>
                
                <a
                  href="#booking"
                  className="flex items-center justify-center h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.04] text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-slate-800 transition-all group-hover:rotate-45"
                  title={`Book 1-on-1 strategy call for ${dest.country}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote reassurance */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            Unsure which country fits your budget and profile best?{" "}
            <a href="#booking" className="text-emerald-400 hover:underline font-semibold">
              Book a 1-on-1 Profile Assessment &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
