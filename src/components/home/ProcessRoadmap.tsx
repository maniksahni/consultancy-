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
    title: "Free Profile Assessment",
    duration: "Day 1 - 3",
    description:
      "Evaluation of your academic GPA, backlogs, test scores, career goals, and budget to formulate a 3-tier shortlist (Ambitious, Target, Safe).",
    icon: Compass,
    keyDeliverable: "Tailored 7-University Shortlist"
  },
  {
    stepNumber: "02",
    title: "Application & Offer Letter",
    duration: "Week 2 - 4",
    description:
      "Drafting and editing winning Statements of Purpose (SOP), Letters of Recommendation (LORs), and submitting applications with partner fee waivers.",
    icon: FileCheck,
    keyDeliverable: "Official Admission / I-20 / CAS"
  },
  {
    stepNumber: "03",
    title: "Financials & Education Loans",
    duration: "Week 4 - 6",
    description:
      "Facilitating 0% collateral education loans, opening German Blocked Accounts (Expatrio) or Canadian GIC, and organizing proof-of-funds dossiers.",
    icon: Banknote,
    keyDeliverable: "Collateral-Free Loan Sanction Letter"
  },
  {
    stepNumber: "04",
    title: "Visa Filing & Mock Interviews",
    duration: "Week 7 - 9",
    description:
      "Filing DS-160/VFS applications, scheduling embassy appointments, and conducting 3 recorded 1-on-1 consular interview simulations.",
    icon: ShieldCheck,
    keyDeliverable: "Guaranteed Visa Grant Support"
  },
  {
    stepNumber: "05",
    title: "Pre-Departure & Takeoff",
    duration: "Week 10+",
    description:
      "Securing verified student housing, multi-currency zero-forex debit cards, discounted student flight tickets with 40kg baggage, and alumni connect.",
    icon: PlaneTakeoff,
    keyDeliverable: "Flight Ticket & Campus Move-in"
  }
];

export default function ProcessRoadmap() {
  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Sparkles className="h-4 w-4" /> Proven 5-Stage Framework
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Step-by-Step Study Abroad Roadmap
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            From initial transcript evaluation to landing on campus, our structured 5-step process ensures zero delays and maximum visa success.
          </p>
        </div>

        {/* 5-Step Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl transition hover:border-blue-500 hover:shadow-2xl group"
              >
                {/* Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-blue-500 font-mono">
                      {step.stepNumber}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-blue-400 border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] font-semibold text-emerald-400 block mb-1">
                      Turnaround: {step.duration}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverable Box */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-200">{step.keyDeliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h4 className="text-base font-bold text-white">Ready to begin Step 01?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Get your transcripts evaluated and receive a custom 3-tier university shortlist in 24 hours.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <a
              href="#eligibility-form"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
