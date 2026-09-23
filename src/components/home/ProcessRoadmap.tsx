"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    numeral: "I",
    number: "01",
    title: "Profile Audit & Goal Alignment",
    subtitle: "Deep Dive into GPA, Budget & Career ROI",
    desc: "Forensic review of your academics, backlogs, finances, and career goals to set realistic, unbiased admissions targets.",
    milestone: "Diagnostic Dossier & Financial Roadmap",
  },
  {
    numeral: "II",
    number: "02",
    title: "Strategic Shortlisting",
    subtitle: "Safe, Target & Ambitious University Matrix",
    desc: "A bias-free 8–10 university portfolio balancing prestigious reach programs with scholarship-guaranteed admits.",
    milestone: "Personalized University Shortlist Matrix",
  },
  {
    numeral: "III",
    number: "03",
    title: "Application & Essay Mastery",
    subtitle: "Compelling Narrative with 0% AI Detection",
    desc: "Sentence-by-sentence editorial review of your SOPs, LORs, and CV — authentic, compelling, and AI-screener-safe.",
    milestone: "Polished SOPs & Finalised Application Portals",
  },
  {
    numeral: "IV",
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
      className="bg-cream-50 py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="border-t border-ink/12 pt-10 mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="label text-stone mb-4">The 4-Stage Mentorship Journey</div>
            <h2
              className="font-display font-normal text-ink leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              A Transparent, Precision-Engineered<br />
              <em>Admissions Roadmap</em>
            </h2>
          </div>
          <p className="text-stone text-sm leading-relaxed max-w-sm font-light">
            From your very first diagnostic call to passport stamping, every single stage is personally managed and audited by your dedicated mentor.
          </p>
        </motion.div>

        {/* ── 4 stage entries ── */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="border-t border-ink/10 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
            >
              {/* Large Roman numeral — decorative */}
              <div className="lg:col-span-1 flex-shrink-0">
                <span
                  className="font-display font-light text-ink/10 leading-none select-none block"
                  style={{ fontSize: "clamp(64px, 6vw, 96px)" }}
                >
                  {step.numeral}
                </span>
              </div>

              {/* Stage content */}
              <div className="lg:col-span-6 space-y-3">
                <div className="label text-terra">{step.subtitle}</div>
                <h3
                  className="font-display font-normal text-ink leading-tight tracking-tight"
                  style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}
                >
                  {step.title}
                </h3>
                <p className="text-stone text-sm leading-relaxed font-light max-w-lg">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable — formal bordered block */}
              <div className="lg:col-span-5 lg:pl-8">
                <div className="border border-ink/12 p-5 bg-cream">
                  <div className="label text-stone mb-2.5">Stage Deliverable</div>
                  <p className="text-ink text-sm font-medium leading-relaxed">
                    {step.milestone}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Close rule */}
          <div className="border-t border-ink/10" />
        </div>

        {/* ── Bottom CTA callout ── */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div>
            <h4 className="font-display text-xl font-normal text-ink tracking-tight">
              Ready to begin Stage 01 with an experienced mentor?
            </h4>
            <p className="text-stone text-sm mt-1 font-light">
              Schedule your 30-minute discovery call to evaluate your profile and target intake.
            </p>
          </div>
          <a
            href="#booking"
            className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-ink hover:bg-ink-soft text-cream-50 min-h-[48px] px-7 py-3.5 label transition-colors group text-center btn-tactile active:scale-[0.98]"
          >
            Start Your Diagnostic Audit
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
