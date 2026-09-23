"use client";

import React from "react";
import { 
  Compass, 
  Layers, 
  FileEdit, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Milestone
} from "lucide-react";

export default function ProcessRoadmap() {
  const steps = [
    {
      number: "01",
      title: "Profile Audit & Goal Alignment",
      subtitle: "Deep Dive into GPA, Budget & Career ROI",
      desc: "Comprehensive diagnostic of your academic history, backlogs, work experience, and financial budget to determine realistic admissions targets.",
      milestone: "Diagnostic Dossier & Financial Roadmap",
      icon: Compass,
    },
    {
      number: "02",
      title: "Strategic Shortlisting",
      subtitle: "Safe, Target & Ambitious University Matrix",
      desc: "Curating a tailored 8-to-10 university portfolio without commercial bias, balancing high-prestige reach programs with guaranteed scholarship admits.",
      milestone: "Personalized University Shortlist Matrix",
      icon: Layers,
    },
    {
      number: "03",
      title: "Application & Essay Mastery",
      subtitle: "Compelling Narrative with 0% AI Detection",
      desc: "Sentence-by-sentence editorial review of your SOPs, LORs, and CV. We develop an authentic, compelling story that passes strict admissions committee screeners.",
      milestone: "Polished SOPs & Finalised Application Portals",
      icon: FileEdit,
    },
    {
      number: "04",
      title: "Embassy Visa Preparation",
      subtitle: "Document Scrutiny & Consular Mock Simulations",
      desc: "Forensic audit of proof-of-funds, DS-160/CAS paperwork, and intensive 1-on-1 mock interviews simulating real consular officers' cross-examination.",
      milestone: "Foolproof Visa Dossier & Mock Certification",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="process" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-indigo-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Milestone className="h-3.5 w-3.5" />
            <span>The 4-Stage Mentorship Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            A Transparent, Precision-Engineered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Admissions Roadmap
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            From your very first diagnostic call to passport stamping, every single stage is personally managed and audited by your dedicated mentor.
          </p>
        </div>

        {/* 4 Horizontal Step Cards with subtle connectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Number & Icon Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-display">
                    {step.number}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-base font-bold text-white font-display">
                  {step.title}
                </h3>
                <p className="text-[11px] font-semibold text-blue-400 mt-1 mb-3">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              {/* Milestone Deliverable Footer */}
              <div className="pt-3 border-t border-slate-800/60 mt-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Stage Deliverable:
                </span>
                <div className="flex items-start gap-1.5 text-xs text-emerald-300 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{step.milestone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-14 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white font-display">
              Ready to begin Stage 01 with an experienced mentor?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Schedule your 30-minute discovery call to evaluate your profile and target intake.
            </p>
          </div>
          <a
            href="#booking"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <span>Start Your Diagnostic Audit</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
