"use client";

import React from "react";
import { 
  Globe2, 
  CheckCircle2, 
  Clock, 
  Banknote, 
  ShieldCheck, 
  ArrowUpRight,
  Briefcase
} from "lucide-react";

export default function StudyDestinations() {
  const hubs = [
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      stream: "Student Route (Subclass)",
      psw: "2 Years Graduate Route (3 Years PhD)",
      avgTuition: "£14,000 – £26,000 / yr",
      proofOfFunds: "28-Day Maintenance Fund Rule (~£12k-£15k)",
      advantages: [
        "1-Year accelerated Master's saving 50% tuition & living cost",
        "IELTS waiver (MOI) options based on Class 12 English score",
        "Direct access to London & UK tech/fintech corporate hubs",
      ],
      tag: "1-Yr Masters",
      whatsappMsg: "Hi! I am interested in UK Master's and want to assess my profile.",
    },
    {
      country: "United States",
      flag: "🇺🇸",
      stream: "F-1 Non-Immigrant Visa",
      psw: "Up to 3 Years STEM OPT",
      avgTuition: "$24,000 – $48,000 / yr",
      proofOfFunds: "1-Year Liquid Funds (I-20 estimate verification)",
      advantages: [
        "36 Months STEM work permit for tech, analytics & engineering",
        "World's highest starting salaries & research grant opportunities",
        "Curricular Practical Training (CPT) during academic semesters",
      ],
      tag: "STEM OPT",
      whatsappMsg: "Hi! I need guidance for USA F-1 admissions and visa prep.",
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      stream: "Study Permit (SDS / Non-SDS)",
      psw: "Up to 3 Years PGWP",
      avgTuition: "CAD 18,000 – 34,000 / yr",
      proofOfFunds: "CAD 20,635 GIC Account + 1st Year Tuition",
      advantages: [
        "Transparent provincial nominee & Express Entry immigration pathways",
        "Post-Graduation Work Permit (PGWP) tied to recognized DLI programs",
        "High standard of living and diverse multicultural cities",
      ],
      tag: "PGWP Eligible",
      whatsappMsg: "Hi! I want guidance for Canada Study Permit and university shortlisting.",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      stream: "National Visa (§16b AufenthG)",
      psw: "18 Months Jobseeker Residence Permit",
      avgTuition: "€0 Tuition (Nominal €350/sem fee)",
      proofOfFunds: "€11,208 / yr in Sperrkonto (Blocked Account)",
      advantages: [
        "Zero tuition fees at top-tier German Public Research Universities",
        "Mandatory APS certification navigation with zero delays",
        "Europe's strongest engineering, automotive & green-tech economy",
      ],
      tag: "€0 Tuition Public",
      whatsappMsg: "Hi! I am aiming for tuition-free German Public Universities.",
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      stream: "Subclass 500 Student Visa",
      psw: "2 to 4 Years Temporary Graduate (485)",
      avgTuition: "AUD 28,000 – 44,000 / yr",
      proofOfFunds: "Annual Living AUD 29,710 + 1st Year Tuition",
      advantages: [
        "Group of Eight (Go8) world top-50 globally ranked institutions",
        "Genuine Student (GS) assessment compliance & high part-time wages",
        "Regional post-study extensions available for high-growth sectors",
      ],
      tag: "Go8 Excellence",
      whatsappMsg: "Hi! I need guidance for Australia Subclass 500 and Genuine Student statement.",
    },
    {
      country: "Ireland",
      flag: "🇮🇪",
      stream: "Irish Student Visa (AVATS)",
      psw: "2 Years Stamp 1G Graduate Scheme",
      avgTuition: "€13,000 – €24,000 / yr",
      proofOfFunds: "€10,000 Immediate Living Proof + Course Fee",
      advantages: [
        "European headquarters for Google, Apple, Meta, Pfizer & Stripe",
        "English-speaking EU economy with fast-track 1-Year Master's",
        "Uncapped career mobility under the 2-Year Stamp 1G visa",
      ],
      tag: "Silicon Docks",
      whatsappMsg: "Hi! I want to discuss Ireland 1-Year Master's and Silicon Docks tech opportunities.",
    },
  ];

  return (
    <section id="destinations" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Curated Global Study Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Targeted Country Expertise.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Clear Admissions Data.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every country enforces distinct financial proofs, post-study work regulations, and visa thresholds. We guide you through the verified data without guesswork.
          </p>
        </div>

        {/* 6 High-Density Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub) => (
            <div
              key={hub.country}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Flag, Name, Tag */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow">{hub.flag}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {hub.country}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {hub.stream}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-300 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                    {hub.tag}
                  </span>
                </div>

                {/* Key Metrics: Tuition, Proof of Funds, PSW */}
                <div className="space-y-2 my-4 rounded-xl bg-slate-950/60 border border-slate-800/60 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                      <Briefcase className="h-3.5 w-3.5 text-blue-400" /> Post-Study Work:
                    </span>
                    <span className="font-semibold text-white text-[11px]">{hub.psw}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                      <Banknote className="h-3.5 w-3.5 text-emerald-400" /> Avg. Tuition:
                    </span>
                    <span className="font-semibold text-emerald-300 text-[11px]">{hub.avgTuition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" /> Proof of Funds:
                    </span>
                    <span className="font-semibold text-slate-300 text-[11px] text-right truncate max-w-[150px]">{hub.proofOfFunds}</span>
                  </div>
                </div>

                {/* Bullet Advantages */}
                <div className="space-y-2 my-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Strategic Advantages:
                  </p>
                  {hub.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(hub.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>Discuss {hub.country} Strategy</span>
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="#booking"
                  className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Book Assessment &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
