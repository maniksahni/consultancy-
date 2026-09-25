"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Profile Audit & Goal Alignment",
    subtitle: "Deep Dive into GPA, Budget & Career ROI",
    desc: "Forensic review of your academics, backlogs, finances, and career goals to set realistic, unbiased admissions targets.",
    milestone: "Diagnostic Dossier & Financial Roadmap",
  },
  {
    number: "02",
    title: "Strategic Shortlisting",
    subtitle: "Safe, Target & Ambitious University Matrix",
    desc: "A bias-free 8–10 university portfolio balancing prestigious reach programs with scholarship-guaranteed admits.",
    milestone: "Personalized University Shortlist Matrix",
  },
  {
    number: "03",
    title: "Application & Essay Mastery",
    subtitle: "Compelling Narrative with 0% AI Detection",
    desc: "Sentence-by-sentence editorial review of your SOPs, LORs, and CV — authentic, compelling, and AI-screener-safe.",
    milestone: "Polished SOPs & Finalised Application Portals",
  },
  {
    number: "04",
    title: "Embassy Visa Preparation",
    subtitle: "Document Scrutiny & Consular Mock Simulations",
    desc: "Forensic audit of proof-of-funds paperwork and intensive 1-on-1 mock interviews replicating real consular cross-examination.",
    milestone: "Foolproof Visa Dossier & Mock Certification",
  },
];

export default function ProcessRoadmap() {
  return (
    <section
      id="process"
      className="bg-[#F2EDE4] py-14 sm:py-18 lg:py-24 overflow-hidden w-full text-ink"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Section header: Calibrated negative space, monumental typography ── */}
        <div className="border-t border-ink/15 pt-8 sm:pt-10 mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-ink/40 font-mono mb-6">
                The 4-Stage Mentorship Journey
              </div>
              <h2 className="font-display font-normal text-ink leading-[0.88] tracking-[-0.035em] text-[3rem] sm:text-6xl lg:text-7xl xl:text-8xl">
                A Transparent, Precision-Engineered<br />
                {/* Exactly ONE terracotta accent in this entire section */}
                <span className="text-terra italic">Admissions Roadmap.</span>
              </h2>
            </div>
            <p className="text-ink/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              From your very first diagnostic call to passport stamping, every single stage is personally managed and audited by your dedicated mentor.
            </p>
          </div>
        </div>

        {/* ── 4 stage entries: Monolithic 1px hairline rows, massive stage numbers ── */}
        <div className="border-t border-ink/15">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="border-b border-ink/15 py-6 sm:py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              {/* Massive Stage Number */}
              <div className="lg:col-span-2">
                <div className="font-display font-light text-ink/20 text-6xl sm:text-7xl lg:text-8xl leading-none select-none">
                  {step.number}
                </div>
              </div>

              {/* Stage content */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-mono">
                  {step.subtitle}
                </div>
                <h3 className="font-display font-normal text-3xl sm:text-4xl text-ink leading-tight">
                  {step.title}
                </h3>
                <p className="text-ink/70 text-sm sm:text-base leading-relaxed font-light max-w-lg">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable: Flat 1px Hairline Block */}
              <div className="lg:col-span-4">
                <div className="border border-ink/15 bg-white p-6 rounded-none">
                  <div className="text-[9px] uppercase tracking-[0.25em] text-ink/40 font-mono mb-2">
                    Stage Deliverable
                  </div>
                  <p className="text-ink text-sm sm:text-base font-medium leading-snug">
                    {step.milestone}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Callout: Stark, Flat, High-Contrast ── */}
        <div className="mt-8 sm:mt-12 border border-ink/15 bg-white p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 rounded-none">
          <div className="max-w-xl">
            <h4 className="font-display text-2xl sm:text-3xl font-normal text-ink leading-tight">
              Ready to begin Stage 01 with an experienced mentor?
            </h4>
            <p className="text-ink/65 text-sm sm:text-base mt-2 font-light">
              Schedule your 30-minute discovery call to evaluate your profile and target intake.
            </p>
          </div>
          <a
            href="#booking"
            className="flex-shrink-0 w-full sm:w-auto bg-ink text-cream hover:bg-ink/90 px-8 py-5 rounded-none text-[11px] uppercase tracking-[0.22em] font-medium text-center transition-colors inline-flex items-center justify-center gap-3"
          >
            <span>Start Your Diagnostic Audit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
