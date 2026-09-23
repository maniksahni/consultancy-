"use client";

import React from "react";
import { 
  Compass, 
  FileCheck, 
  Banknote, 
  ShieldCheck, 
  PlaneTakeoff, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";

interface RoadmapStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ElementType;
  keyDeliverable: string;
}

const steps: RoadmapStep[] = [
  {
    stepNumber: "01",
    title: "Profile Audit & 3-Tier Shortlist",
    duration: "Day 1 – 3",
    description:
      "Comprehensive evaluation of academic transcripts, backlogs, test scores, and career goals to construct an Ambitious, Target, and Safe university shortlist.",
    icon: Compass,
    keyDeliverable: "Audit-Verified 7-University Shortlist"
  },
  {
    stepNumber: "02",
    title: "Admissions & Official CAS/I-20",
    duration: "Week 2 – 4",
    description:
      "Senior editors review SOPs & LORs with 0% AI detection. Direct fast-track submissions unlock institutional application fee waivers.",
    icon: FileCheck,
    keyDeliverable: "Official Unconditional Offer / I-20 / CAS"
  },
  {
    stepNumber: "03",
    title: "Statutory Funds & Escrow Setup",
    duration: "Week 4 – 6",
    description:
      "Setup of German Blocked Accounts (Expatrio/Fintiba) with €11,208, Canadian CAD $20,635 GIC deposits, and non-collateral loan sanction letters.",
    icon: Banknote,
    keyDeliverable: "Embassy-Compliant Financial Holding Dossier"
  },
  {
    stepNumber: "04",
    title: "Consular Filing & 3 Mock Drills",
    duration: "Week 7 – 9",
    description:
      "Filing DS-160/VFS applications, scheduling biometric appointments, and executing 3 recorded 1-on-1 consular interview simulations.",
    icon: ShieldCheck,
    keyDeliverable: "Consular-Grade Visa Approval Filing"
  },
  {
    stepNumber: "05",
    title: "Post-Landing Relocation & Housing",
    duration: "Week 10+",
    description:
      "Verified student housing leases within 15 minutes of campus, multi-currency Forex debit cards, student flight concessions, and local alumni connect.",
    icon: PlaneTakeoff,
    keyDeliverable: "Campus Move-In & Forex Activation"
  }
];

export default function ProcessRoadmap() {
  return (
    <section id="process" className="py-24 sm:py-32 bg-[#030712] text-white relative overflow-hidden border-b border-white/[0.08]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-blue-600/10 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 border border-blue-500/25">
            <Sparkles className="h-3.5 w-3.5" /> Operational 5-Stage Framework
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-white font-display">
            Step-by-Step Study Abroad Roadmap
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From initial transcript audit to airport departure, our structured roadmap ensures zero compliance rejections and seamless visa approval.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] hover:-translate-y-1.5"
              >
                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/40 transition-colors" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-mono tracking-tight">
                      {step.stepNumber}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/[0.08] text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-all shadow-inner">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 block mb-1">
                      Timeline: {step.duration}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-start gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-200">{step.keyDeliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assessment Callout */}
        <div className="mt-14 rounded-3xl border border-white/[0.08] bg-slate-900/60 p-7 sm:p-10 backdrop-blur-2xl text-center sm:flex sm:items-center sm:justify-between sm:text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="space-y-1.5">
            <h4 className="text-xl font-bold text-white font-display">Ready to execute Stage 01?</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit your academic transcripts and receive a customized 3-tier shortlist and scholarship forecast.
            </p>
          </div>
          <div className="mt-5 sm:mt-0 flex-shrink-0">
            <a
              href="#eligibility"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 px-7 py-3.5 text-xs font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-[1.02] transition-all"
            >
              <span>Start Free Profile Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
