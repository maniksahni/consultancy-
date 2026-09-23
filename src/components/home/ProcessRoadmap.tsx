"use client";

import React from "react";
import { 
  Compass, 
  Layers, 
  FileEdit, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Milestone
} from "lucide-react";

export default function ProcessRoadmap() {
  const steps = [
    {
      number: "01",
      roman: "Stage I",
      title: "Profile Audit & Goal Alignment",
      subtitle: "Deep Dive into GPA, Budget & Career ROI",
      desc: "Comprehensive diagnostic of your academic history, backlogs, work experience, and financial budget to determine realistic admissions targets.",
      milestone: "Diagnostic Dossier & Financial Roadmap",
      icon: Compass,
    },
    {
      number: "02",
      roman: "Stage II",
      title: "Strategic Shortlisting",
      subtitle: "Safe, Target & Ambitious University Matrix",
      desc: "Curating a tailored 8-to-10 university portfolio without commercial bias, balancing high-prestige reach programs with guaranteed scholarship admits.",
      milestone: "Personalized University Shortlist Matrix",
      icon: Layers,
    },
    {
      number: "03",
      roman: "Stage III",
      title: "Application & Essay Mastery",
      subtitle: "Compelling Narrative with 0% AI Detection",
      desc: "Sentence-by-sentence editorial review of your SOPs, LORs, and CV. We develop an authentic, compelling story that passes strict admissions committee screeners.",
      milestone: "Polished SOPs & Finalised Application Portals",
      icon: FileEdit,
    },
    {
      number: "04",
      roman: "Stage IV",
      title: "Embassy Visa Preparation",
      subtitle: "Document Scrutiny & Consular Mock Simulations",
      desc: "Forensic audit of proof-of-funds, DS-160/CAS paperwork, and intensive 1-on-1 mock interviews simulating real consular officers' cross-examination.",
      milestone: "Foolproof Visa Dossier & Mock Certification",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="process" className="relative py-20 sm:py-28 overflow-hidden bg-[#070A11] w-full max-w-full">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C5A880]/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.06] px-4 py-1.5 text-[11px] font-medium tracking-widest text-[#E5D3B3] uppercase mb-5">
            <Milestone className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>The 4-Stage Mentorship Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-100 tracking-tight font-serif">
            A Transparent, Precision-Engineered{" "}
            <span className="italic text-[#C5A880]">
              Admissions Roadmap
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
            From your very first diagnostic call to passport stamping, every single stage is personally managed and audited by your dedicated mentor.
          </p>
        </div>

        {/* 4 Syllabus Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-white/[0.08] bg-[#0E131F]/90 p-6 sm:p-7 backdrop-blur-md hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Serif Step Number & Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-2xl font-serif text-[#C5A880] tracking-tight block">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-400 tracking-widest uppercase">
                      {step.roman}
                    </span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#C5A880] group-hover:border-[#C5A880]/30 transition-colors">
                    <step.icon className="h-5 w-5 stroke-[1.5]" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-serif text-stone-100 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-[11px] font-medium text-[#C5A880] mt-1 mb-3.5 tracking-wide">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-stone-400 leading-relaxed font-light mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Milestone Deliverable Footer */}
              <div className="pt-4 border-t border-white/[0.06] mt-auto bg-black/20 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-2xl">
                <span className="text-[9px] uppercase font-bold text-stone-400 tracking-widest block mb-1.5">
                  Stage Deliverable:
                </span>
                <div className="flex items-start gap-2 text-xs text-[#E5D3B3] font-medium">
                  <Check className="h-3.5 w-3.5 text-[#C5A880] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                  <span className="leading-snug text-stone-300">{step.milestone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-14 rounded-2xl border border-white/[0.1] bg-[#0E131F] p-7 sm:p-9 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-serif text-stone-100 tracking-tight">
              Ready to begin Stage 01 with an experienced mentor?
            </h4>
            <p className="text-xs sm:text-sm text-stone-400 font-light">
              Schedule your 30-minute discovery call to evaluate your profile and target intake.
            </p>
          </div>
          <a
            href="#booking"
            className="flex-shrink-0 inline-flex items-center gap-2.5 rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#070A11] tracking-wide transition-all shadow-md group"
          >
            <span>Start Your Diagnostic Audit</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
