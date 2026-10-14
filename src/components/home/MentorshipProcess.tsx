"use client";

import React from "react";
import { 
  Compass, 
  Layers, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  CalendarCheck,
  Award
} from "lucide-react";

export default function MentorshipProcess() {
  const steps = [
    {
      stepNumber: "01",
      title: "Deep Profile & Budget Assessment",
      subtitle: "1-on-1 Discovery & Reality Check",
      desc: "We jump on a 45-minute deep-dive video call. I evaluate your undergraduate GPA, work experience, English tests, budget tolerance, and long-term career aspirations.",
      deliverables: [
        "Academic & career trajectory mapping",
        "Clear budget breakdown (Tuition + Living + Proof of funds)",
        "Standardized test strategy (IELTS/TOEFL/GRE/GMAT/Duolingo)",
        "Backlog & education gap justification plan",
      ],
      duration: "Days 1 — 3",
      icon: Compass,
      tag: "Foundation Call",
    },
    {
      stepNumber: "02",
      title: "Strategic University Shortlisting",
      subtitle: "Safe, Moderate & Ambitious Matrix",
      desc: "Zero commercial partnerships. I curate an unbiased 8-to-10 university matrix specifically tuned to your profile's admit probability and post-graduation ROI.",
      deliverables: [
        "3 Ambitious (Dream reach programs)",
        "4 Moderate (Strong probability based on data)",
        "2-3 Safe (Guaranteed admit with scholarship potential)",
        "Course curriculum & faculty research analysis",
      ],
      duration: "Days 4 — 7",
      icon: Layers,
      tag: "Unbiased Strategy",
    },
    {
      stepNumber: "03",
      title: "Application & Essay/SOP Refinement",
      subtitle: "Line-by-Line Personal Crafting",
      desc: "No ChatGPT nonsense or mass agency templates. I sit with your essays and letters of recommendation, iteratively reviewing every single paragraph until your true voice shines.",
      deliverables: [
        "Statement of Purpose (SOP) multiple iterations",
        "3 Academic/Professional LOR strategic prompts",
        "Professional CV/Resume international formatting",
        "Direct portal application scrutiny before submission",
      ],
      duration: "Weeks 2 — 4",
      icon: FileText,
      tag: "Personal Polish",
    },
    {
      stepNumber: "04",
      title: "Visa Dossier Check & 1-on-1 Mock Embassy Interview",
      subtitle: "High-Pressure Consular Preparedness",
      desc: "The final, most critical barrier. I audit your complete financial dossier, prepare source-of-funds explanations, and run real 1-on-1 mock interviews until you answer with unshakable poise.",
      deliverables: [
        "Financial document & affidavit verification",
        "DS-160 / Study Permit / CAS filing audit",
        "3 to 5 realistic mock interviews with tough questions",
        "Pre-departure briefing & accommodation checklist",
      ],
      duration: "Pre-Visa Appointment",
      icon: ShieldCheck,
      tag: "99.2% Visa Record",
    },
  ];

  return (
    <section id="process" className="relative py-20 lg:py-28 overflow-hidden bg-slate-950/40 border-t border-b border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>The 4-Step Student Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            How We Work Together,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              Step-by-Step
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From the moment we first speak until you board your international flight, every milestone is structured, transparent, and personally overseen by me.
          </p>
        </div>

        {/* 4 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative rounded-3xl border border-white/[0.08] bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/30 group"
            >
              {/* Top Meta: Step number & Duration pill */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-display flex-shrink-0">
                      {step.stepNumber}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 break-words">
                      {step.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-950/60 border border-white/[0.06] rounded-lg px-2.5 py-1 flex-shrink-0">
                    <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mb-1 break-words">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-300 mb-4 break-words">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 break-words">
                  {step.desc}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    What You Receive:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug break-words min-w-0">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom step badge */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-400 min-w-0 break-words">
                  <step.icon className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Personal Mentorship Touchpoint</span>
                </span>
                <span className="text-emerald-400/80 font-medium group-hover:text-emerald-300 transition-colors flex-shrink-0">
                  Direct 1-on-1 Mentorship &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-blue-950/40 p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 flex-shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base sm:text-lg font-bold text-white font-display break-words">
                Ready to start Step 1 with your profile?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 break-words">
                Book your introductory 45-minute discovery call directly on my calendar.
              </p>
            </div>
          </div>

          <a
            href="#booking"
            className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all text-center"
          >
            <span>Book 1-on-1 Discovery Call</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
