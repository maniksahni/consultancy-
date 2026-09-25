"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, UserCheck, Sparkles, FileCheck } from "lucide-react";

const PANELS = [
  {
    num: "01",
    icon: UserCheck,
    title: "Single Dedicated Senior Mentor",
    contrast: "No Rotating Call-Centers",
    desc: "You work directly with one senior mentor from transcript diagnosis to consular clearance. No handoffs to junior sales telecallers or outsourced teams.",
    colSpan: "lg:col-span-6",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Zero Institutional Kickbacks",
    contrast: "100% Fiduciary Shortlisting",
    desc: "We accept zero recruiter commissions from partner colleges. Your university matrix is selected purely for academic pedigree, budget, and long-term career ROI.",
    colSpan: "lg:col-span-6",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Line-by-Line Narrative Crafting",
    contrast: "Zero AI Templates",
    desc: "Bespoke, human editorial feedback on your SOPs, CV, and letters of recommendation. No generic ChatGPT drafts that trigger admissions committee screeners.",
    colSpan: "lg:col-span-6",
  },
  {
    num: "04",
    icon: FileCheck,
    title: "Consular Visa Mock Grilling",
    contrast: "Bulletproof Embassy Dossiers",
    desc: "Rigorous 1-on-1 interview simulations testing financial proof clarity, study rationale, and genuine intent to overcome even prior refusal risks.",
    colSpan: "lg:col-span-6",
  },
];

export default function DifferenceGrid() {
  return (
    <section id="comparison" className="bg-[#F2EDE4] text-ink py-16 sm:py-20 lg:py-28 border-b border-ink/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end pb-12 sm:pb-16 border-b border-ink/15">
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-ink/45 block mb-4">
              The Advisory Difference
            </span>
            <h2 className="font-display font-normal text-[clamp(2.15rem,8vw,3.25rem)] sm:text-5xl lg:text-6xl leading-[0.94] tracking-tight">
              Not Another<br />
              Admissions Agency.<br />
              <span className="text-terra italic inline-block pr-1">A Private Advisory Model.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-base sm:text-lg text-ink/75 font-light leading-relaxed">
              Traditional consultancies operate on mass sales and recruiter commissions, passing candidates between telecallers. We operate on a boutique fiduciary standard.
            </p>
            <div className="mt-5">
              <Link
                href="/mentorship-model"
                className="inline-flex items-center gap-2 border-b border-ink/40 text-[11px] uppercase tracking-[0.2em] font-medium pb-1 text-ink hover:text-terra hover:border-terra transition-colors group"
              >
                <span>Read Full Mentorship Doctrine</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 4 Asymmetric Glowing Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {PANELS.map((panel, idx) => {
            const Icon = panel.icon;

            return (
              <motion.div
                key={panel.num}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.08 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 0 0 1px rgba(194,91,26,0.25), 0 20px 70px rgba(194,91,26,0.10)",
                }}
                className={`${panel.colSpan} bg-[#FAF7F2] border border-ink/15 p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-400`}
              >
                <div>
                  {/* Top Bar with Big Editorial Number */}
                  <div className="flex items-center justify-between pb-5 border-b border-ink/10 mb-5">
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                      className="font-display text-4xl sm:text-5xl text-ink/30 group-hover:text-terra transition-colors"
                    >
                      {panel.num}
                    </motion.span>
                    <div className="h-9 w-9 rounded-none border border-ink/15 bg-white flex items-center justify-center text-ink/60 group-hover:border-terra group-hover:text-terra transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Contrast Tag */}
                  <div className="inline-block px-2.5 py-0.5 bg-ink/[0.04] border border-ink/10 font-mono text-[9px] uppercase tracking-wider text-ink/60 mb-3">
                    {panel.contrast}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal leading-snug">
                    {panel.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink/70 font-light leading-relaxed mt-3">
                    {panel.desc}
                  </p>
                </div>

                {/* Subtle Terracotta Bottom Glow Accent */}
                <div className="pt-6 mt-6 border-t border-ink/10 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-ink/40 group-hover:text-terra transition-colors">
                  <span>Advisory Standard</span>
                  <span>Verified →</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
