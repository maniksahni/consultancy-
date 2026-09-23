"use client";

import React from "react";
import { 
  Award, 
  CheckCheck, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck,
  TrendingUp,
  Clock
} from "lucide-react";

export default function StudentOutcomes() {
  const outcomes = [
    {
      initials: "A.I.",
      flag: "🇺🇸",
      country: "USA",
      program: "MS in Data Science",
      university: "Columbia University",
      stats: "7.8 CGPA • GRE 322 • Duolingo 125",
      outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)",
      badgeBg: "bg-blue-600/15 border-blue-500/30 text-blue-300",
      avatarColor: "bg-blue-600",
      intake: "Fall Intake",
    },
    {
      initials: "K.D.",
      flag: "🇩🇪",
      country: "Germany",
      program: "MSc Automotive Engineering",
      university: "Technical University of Munich (TUM)",
      stats: "8.2 CGPA • APS India Verified • IELTS 7.0",
      outcome: "€0 Tuition Public Admit • ₹35L+ Tuition Saved",
      badgeBg: "bg-emerald-600/15 border-emerald-500/30 text-emerald-300",
      avatarColor: "bg-emerald-600",
      intake: "Winter Intake",
    },
    {
      initials: "S.K.",
      flag: "🇬🇧",
      country: "United Kingdom",
      program: "MSc International Business",
      university: "University of Manchester",
      stats: "7.1 CGPA • 2-Yr Gap Justified • MOI Waiver",
      outcome: "£8,000 Dean's Merit Award • Visa in 5 Days",
      badgeBg: "bg-purple-600/15 border-purple-500/30 text-purple-300",
      avatarColor: "bg-purple-600",
      intake: "Autumn Intake",
    },
    {
      initials: "R.B.",
      flag: "🇨🇦",
      country: "Canada",
      program: "MEng Electrical & Computer Eng",
      university: "University of Toronto",
      stats: "8.4 CGPA • IELTS 7.5 • SDS Stream",
      outcome: "Direct Study Permit Approval in 18 Days",
      badgeBg: "bg-rose-600/15 border-rose-500/30 text-rose-300",
      avatarColor: "bg-rose-600",
      intake: "Winter Intake",
    },
    {
      initials: "M.N.",
      flag: "🇮🇪",
      country: "Ireland",
      program: "MSc Business Analytics",
      university: "Trinity College Dublin",
      stats: "7.6 CGPA • Duolingo 120 • 1-Yr Fast-Track",
      outcome: "AVATS Visa Approved in 12 Days • €4,000 Grant",
      badgeBg: "bg-teal-600/15 border-teal-500/30 text-teal-300",
      avatarColor: "bg-teal-600",
      intake: "Autumn Intake",
    },
    {
      initials: "T.J.",
      flag: "🇦🇺",
      country: "Australia",
      program: "Master of Information Technology",
      university: "UNSW Sydney (Go8)",
      stats: "7.9 CGPA • PTE 68 • Subclass 500",
      outcome: "Genuine Student (GS) Statement Approved (No Interview)",
      badgeBg: "bg-amber-600/15 border-amber-500/30 text-amber-300",
      avatarColor: "bg-amber-600",
      intake: "Semester 1",
    },
  ];

  return (
    <section id="outcomes" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[90vw] max-w-[750px] h-[300px] sm:h-[450px] bg-emerald-500/5 blur-[120px] sm:blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>Documented Admissions Records</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Verified Student Outcomes.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Zero Generic Claims.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Real admissions across Ivy League, Russell Group, TU9, and U15 institutions achieved through tailored profile positioning and flawless visa dossiers.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Initials, Target Country Flag */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl ${item.avatarColor} text-white font-extrabold flex items-center justify-center text-xs shadow-md`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white font-display">Candidate {item.initials}</span>
                        <span>{item.flag}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {item.country} Study Route
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 border border-slate-800 rounded-full px-2.5 py-0.5 bg-slate-950/80">
                    {item.intake}
                  </span>
                </div>

                {/* Program & University */}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white font-display leading-snug">
                    {item.university}
                  </h3>
                  <p className="text-xs font-medium text-slate-300 mt-0.5 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                    <span>{item.program}</span>
                  </p>
                </div>

                {/* Profile Stats Box */}
                <div className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-3 mb-4 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Candidate Profile Metrics:
                  </span>
                  <p className="text-slate-200 font-medium">{item.stats}</p>
                </div>
              </div>

              {/* Outcome Stamp Pill */}
              <div className={`rounded-xl border px-3 py-2 text-xs font-semibold flex items-start gap-2 ${item.badgeBg}`}>
                <CheckCheck className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{item.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote reassurance */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2 text-xs text-slate-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>All outcomes verified against institutional offer letters and official visa stamps.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
