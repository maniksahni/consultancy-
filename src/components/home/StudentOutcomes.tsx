"use client";

import React from "react";
import { 
  Award, 
  Check, 
  GraduationCap, 
  ShieldCheck
} from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";

export default function StudentOutcomes() {
  const outcomes = [
    {
      initials: "A.I.",
      country: "USA",
      program: "MS in Data Science",
      university: "Columbia University",
      stats: "7.8 CGPA • GRE 322 • Duolingo 125",
      outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)",
      intake: "Fall Intake",
      dossierRef: "REF: CU-0824",
    },
    {
      initials: "K.D.",
      country: "Germany",
      program: "MSc Automotive Engineering",
      university: "Technical University of Munich (TUM)",
      stats: "8.2 CGPA • APS India Verified • IELTS 7.0",
      outcome: "€0 Tuition Public Admit • ₹35L+ Tuition Saved",
      intake: "Winter Intake",
      dossierRef: "REF: TUM-1024",
    },
    {
      initials: "S.K.",
      country: "United Kingdom",
      program: "MSc International Business",
      university: "University of Manchester",
      stats: "7.1 CGPA • 2-Yr Gap Justified • MOI Waiver",
      outcome: "£8,000 Dean's Merit Award • Visa in 5 Days",
      intake: "Autumn Intake",
      dossierRef: "REF: UOM-0924",
    },
    {
      initials: "R.B.",
      country: "Canada",
      program: "MEng Electrical & Computer Eng",
      university: "University of Toronto",
      stats: "8.4 CGPA • IELTS 7.5 • SDS Stream",
      outcome: "Direct Study Permit Approval in 18 Days",
      intake: "Winter Intake",
      dossierRef: "REF: UOT-0125",
    },
    {
      initials: "M.N.",
      country: "Ireland",
      program: "MSc Business Analytics",
      university: "Trinity College Dublin",
      stats: "7.6 CGPA • Duolingo 120 • 1-Yr Fast-Track",
      outcome: "AVATS Visa Approved in 12 Days • €4,000 Grant",
      intake: "Autumn Intake",
      dossierRef: "REF: TCD-0924",
    },
    {
      initials: "T.J.",
      country: "Australia",
      program: "Master of Information Technology",
      university: "UNSW Sydney (Go8)",
      stats: "7.9 CGPA • PTE 68 • Subclass 500",
      outcome: "Genuine Student (GS) Statement Approved (No Interview)",
      intake: "Semester 1",
      dossierRef: "REF: UNSW-0225",
    },
  ];

  return (
    <section id="outcomes" className="relative py-20 sm:py-28 overflow-hidden bg-[#070A11] w-full max-w-full">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C5A880]/[0.02] blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.06] px-4 py-1.5 text-[11px] font-medium tracking-widest text-[#E5D3B3] uppercase mb-5">
            <Award className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>Documented Admissions Records</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-100 tracking-tight font-serif">
            Verified Student Outcomes.{" "}
            <span className="italic text-[#C5A880]">
              Zero Generic Claims.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
            Real admissions across Ivy League, Russell Group, TU9, and U15 institutions achieved through tailored profile positioning and flawless visa dossiers.
          </p>
        </div>

        {/* 6 Case Record Dossier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#0E131F]/90 p-6 sm:p-7 backdrop-blur-md hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Dossier Monogram, Candidate ID, Vector Flag, Intake */}
                <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#070A11] border border-[#C5A880]/30 text-[#E5D3B3] font-serif font-medium flex items-center justify-center text-sm shadow-inner">
                      {item.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-200 tracking-wide">Candidate {item.initials}</span>
                        <div className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0 shadow-sm border border-white/20">
                          <CountryFlag country={item.country} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-400 font-light tracking-wide uppercase mt-0.5">
                        {item.country} Study Route &bull; {item.dossierRef}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 border border-white/[0.08] rounded-full px-2.5 py-0.5 bg-black/40">
                    {item.intake}
                  </span>
                </div>

                {/* University & Program */}
                <div className="mb-5">
                  <h3 className="text-lg font-serif text-stone-100 tracking-tight leading-snug">
                    {item.university}
                  </h3>
                  <p className="text-xs font-light text-stone-300 mt-1 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-[#C5A880] flex-shrink-0" />
                    <span>{item.program}</span>
                  </p>
                </div>

                {/* Profile Stats Box */}
                <div className="rounded-xl border border-white/[0.06] bg-black/40 p-3.5 mb-5 text-xs">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                    Candidate Profile Metrics:
                  </span>
                  <p className="text-stone-300 font-light leading-relaxed">{item.stats}</p>
                </div>
              </div>

              {/* Outcome Stamp Pill */}
              <div className="rounded-xl border border-[#C5A880]/30 bg-[#C5A880]/[0.06] px-3.5 py-2.5 text-xs font-medium text-[#F2EAE0] flex items-start gap-2.5">
                <Check className="h-4 w-4 text-[#C5A880] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="leading-snug text-stone-200">{item.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote reassurance */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0E131F] px-5 py-2 text-xs text-stone-300">
            <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
            <span className="font-light">All outcomes verified against institutional offer letters and official visa stamps.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
