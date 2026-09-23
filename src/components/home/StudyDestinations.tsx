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
import CountryFlag from "@/components/common/CountryFlag";

export default function StudyDestinations() {
  const hubs = [
    {
      country: "United Kingdom",
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
    <section id="destinations" className="relative py-20 lg:py-28 overflow-hidden w-full max-w-full bg-[#070A11] border-t border-white/[0.06]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#0B0F19] px-3.5 py-1 text-xs font-medium tracking-wider uppercase text-[#DBCBAA] mb-4">
            <Globe2 className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>Curated Global Study Hubs</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            Targeted Country Expertise.{" "}
            <span className="italic text-[#E5D3B3]">
              Clear Admissions Data.
            </span>
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mx-auto">
            Every country enforces distinct financial proofs, post-study work regulations, and visa thresholds. We guide you through the verified data without guesswork.
          </p>
        </div>

        {/* 6 Curated Architectural Dossier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {hubs.map((hub) => (
            <div
              key={hub.country}
              className="group relative rounded-xl border border-white/[0.09] bg-[#0B0F19]/70 p-6 sm:p-7 hover:border-[#C5A880]/50 hover:bg-[#0E1424] transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Header: Bespoke Vector Flag + Title + Formal Pill */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <CountryFlag country={hub.country} size="md" />
                    <div>
                      <h3 className="font-serif text-xl font-medium text-white tracking-tight">
                        {hub.country}
                      </h3>
                      <p className="text-[11px] font-medium tracking-wide text-stone-400 mt-0.5">
                        {hub.stream}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium tracking-wider uppercase border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#E5D3B3] rounded px-2 py-0.5 whitespace-nowrap">
                    {hub.tag}
                  </span>
                </div>

                {/* Key Metrics Ledger Table */}
                <div className="space-y-2.5 my-5 rounded-lg bg-[#070A11]/80 border border-white/[0.06] p-3.5 text-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400 flex items-center gap-1.5 text-[11px] font-light">
                      <Briefcase className="h-3.5 w-3.5 text-[#C5A880]" /> Post-Study Work:
                    </span>
                    <span className="font-medium text-white text-[11px]">{hub.psw}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-white/[0.04] pt-2">
                    <span className="text-stone-400 flex items-center gap-1.5 text-[11px] font-light">
                      <Banknote className="h-3.5 w-3.5 text-[#C5A880]" /> Avg. Tuition:
                    </span>
                    <span className="font-medium text-[#E5D3B3] text-[11px]">{hub.avgTuition}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-white/[0.04] pt-2">
                    <span className="text-stone-400 flex items-center gap-1.5 text-[11px] font-light">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" /> Proof of Funds:
                    </span>
                    <span className="font-medium text-stone-300 text-[11px] text-right truncate max-w-[150px]">{hub.proofOfFunds}</span>
                  </div>
                </div>

                {/* Strategic Advantages Checklist */}
                <div className="space-y-2.5 my-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A880]">
                    Strategic Advantages:
                  </p>
                  {hub.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] flex-shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(hub.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#DBCBAA] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Discuss {hub.country} Strategy</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="#booking"
                  className="text-[11px] font-light text-stone-400 hover:text-white transition-colors"
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
