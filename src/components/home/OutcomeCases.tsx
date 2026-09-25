"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck2 } from "lucide-react";
import TiltCard from "@/components/experience/TiltCard";

const CASES = [
  {
    caseNo: "CASE 001",
    initials: "A.I.",
    country: "United States",
    flag: "🇺🇸",
    university: "Columbia University",
    program: "MS in Data Science",
    profile: "7.8 CGPA · GRE 322 · Duolingo 125",
    outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)",
    intake: "Fall Intake",
    ref: "REF: CU-0824",
    detail: "Previous consular refusal overturned by completely restructuring the liquid funding dossier and executing intensive mock interview grilling.",
  },
  {
    caseNo: "CASE 002",
    initials: "K.D.",
    country: "Germany",
    flag: "🇩🇪",
    university: "Technical University of Munich (TUM)",
    program: "MSc Automotive Engineering",
    profile: "8.2 CGPA · APS India Verified · IELTS 7.0",
    outcome: "€0 Tuition Public Admit · ₹35L+ Tuition Saved",
    intake: "Winter Intake",
    ref: "REF: TUM-1024",
    detail: "Direct admit to TUM's premier engineering faculty with accelerated APS certification handling and verified blocked account setup.",
  },
  {
    caseNo: "CASE 003",
    initials: "S.K.",
    country: "United Kingdom",
    flag: "🇬🇧",
    university: "University of Manchester",
    program: "MSc International Business",
    profile: "7.1 CGPA · 2-Yr Gap Justified · MOI Waiver",
    outcome: "£8,000 Dean's Merit Award · Visa in 5 Days",
    intake: "Autumn Intake",
    ref: "REF: UOM-0924",
    detail: "Secured competitive merit grant and priority CAS turnaround by presenting an editorial-grade SOP justifying work hiatus with corporate evidence.",
  },
];

export default function OutcomeCases() {
  return (
    <section id="outcomes" className="bg-[#0B0A08] text-cream py-20 sm:py-24 lg:py-32 border-b border-cream/10 relative overflow-hidden">
      {/* Subtle Warm Amber Glow Behind Section */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-terra/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16 relative z-10">

        {/* ── Section Header ── */}
        <div className="border-t border-cream/15 pt-6 sm:pt-8 mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-cream/45 block mb-3">
              Documented Admissions Ledger
            </span>
            <h2 data-reveal-heading className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Admissions Outcomes,<br />
              <span className="text-terra italic inline-block pr-1">In Context.</span>
            </h2>
          </div>

          <div className="lg:max-w-md">
            <p className="text-sm sm:text-base text-cream/65 font-light leading-relaxed mb-4">
              Real candidates, auditable dossiers, and transparent profile parameters across top-tier international destinations.
            </p>
            <Link
              href="/outcomes"
              className="inline-flex items-center gap-2 border-b border-cream/40 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-cream hover:text-terra hover:border-terra transition-colors group"
            >
              <span>View All Verified Case Files</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ── 3 Motion Case Panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {CASES.map((item, idx) => (
            <TiltCard key={item.ref}>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.08 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -3,
                boxShadow: "0 0 30px rgba(194, 91, 26, 0.15)",
                borderColor: "rgba(194, 91, 26, 0.4)",
              }}
              className="border border-cream/15 bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between relative group transition-all duration-300"
            >
              <div>
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-cream/10 mb-4 font-mono text-[9px] uppercase tracking-wider text-cream/40">
                  <span className="flex items-center gap-1.5 text-terra font-medium">
                    <FileCheck2 className="h-3.5 w-3.5 text-terra" />
                    <span>{item.caseNo}</span>
                  </span>
                  <span>{item.ref}</span>
                </div>

                {/* Candidate & Destination */}
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-xs text-cream/90 font-medium">
                    Candidate {item.initials}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-cream/50">
                    <span>{item.flag}</span>
                    <span>{item.country}</span>
                  </div>
                </div>

                {/* University & Program */}
                <h3 className="font-display text-2xl text-cream font-normal leading-snug">
                  {item.university}
                </h3>
                <div className="text-xs text-cream/80 font-mono mt-1">
                  {item.program}
                </div>

                {/* Animated Divider */}
                <div className="my-4 h-[1px] bg-cream/10 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                    className="h-full bg-terra/40"
                  />
                </div>

                {/* Profile Stats Box */}
                <div className="py-2.5 px-3 bg-white/[0.03] border border-cream/10 font-mono text-[10px] text-cream/70 mb-3">
                  <span className="text-cream/40 block text-[8px] uppercase tracking-wider mb-0.5">Profile Metrics:</span>
                  <span>{item.profile}</span>
                </div>

                {/* Narrative Detail */}
                <p className="text-xs text-cream/60 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Recorded Outcome (Highlighted in Terracotta) */}
              <div className="pt-4 mt-6 border-t border-cream/10">
                <div className="text-[9px] uppercase tracking-[0.2em] font-mono text-cream/40 mb-1">
                  Recorded Outcome
                </div>
                <div className="text-xs sm:text-sm font-mono text-terra font-medium leading-snug">
                  {item.outcome}
                </div>
              </div>
            </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* ── Official Disclaimer ── */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-cream/35">
          <p>
            * Individual admissions and visa decisions remain strictly with universities and relevant government consular authorities.
          </p>
          <Link href="/outcomes" className="text-cream/60 hover:text-cream underline underline-offset-4 whitespace-nowrap">
            Explore 100+ outcomes →
          </Link>
        </div>

      </div>
    </section>
  );
}
