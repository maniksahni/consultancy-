"use client";

import React from "react";
import { ArrowRight, DollarSign, Briefcase, GraduationCap, CheckCircle2, Sparkles } from "lucide-react";

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
    popularPrograms: ["Cloud Computing", "Cybersecurity", "Supply Chain", "Project Management"]
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

export default function DestinationsGrid() {
  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#030712] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <GraduationCap className="h-4 w-4" /> Global Admissions 2026 / 2027
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Top Study Abroad Destinations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Compare post-study work visas, average tuition fees, and high-demand programs across world-leading study hubs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl filter drop-shadow" role="img" aria-label={dest.name}>
                      {dest.flag}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {dest.name}
                      </h3>
                      <span className="inline-block text-[11px] font-semibold text-blue-400">
                        {dest.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2 text-xs">
                  <div className="flex items-center gap-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 text-slate-300">
                    <DollarSign className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Average Annual Tuition</span>
                      <span className="font-bold text-white">{dest.avgTuition}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 text-slate-300">
                    <Briefcase className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Post-Study Work Rights</span>
                      <span className="font-bold text-white">{dest.pswRights}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Advantages:
                  </span>
                  {dest.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Popular Programs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.popularPrograms.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-950 border border-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

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
