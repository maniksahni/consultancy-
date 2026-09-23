"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Check, ShieldCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const comparisonItems = [
  {
    factor: "Admissions Counselor Assigned",
    agency: "Passed between unvetted telecallers, junior interns, and rotating sales reps",
    pathways: "Single dedicated Senior Mentor who personally manages your entire journey",
  },
  {
    factor: "University Recommendations",
    agency: "Pushing partner colleges that pay high recruiter commissions (kickbacks)",
    pathways: "100% unbiased shortlisting based strictly on your academic ROI & career goals",
  },
  {
    factor: "SOP & LOR Editorial Quality",
    agency: "Generic templates & copied ChatGPT drafts flagged by university AI screeners",
    pathways: "Line-by-line narrative crafting highlighting your unique accomplishments & grit",
  },
  {
    factor: "Consular Visa Preparation",
    agency: "A 10-minute generic PDF checklist right before your appointment",
    pathways: "Rigorous 1-on-1 mock consular grilling until your responses are confident & bulletproof",
  },
  {
    factor: "Communication & Accountability",
    agency: "Bureaucratic ticketing systems, slow replies, and ghosting post-payment",
    pathways: "Direct WhatsApp line, scheduled strategy calls, and proactive weekly check-ins",
  },
];

export default function ComparisonSection() {
  return (
    <section
      id="comparison"
      className="bg-[#14120C] py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="border-t border-cream/10 pt-10 mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <div className="label text-cream/35 mb-4">The Mentorship Advantage</div>
            <h2
              className="font-display font-normal text-cream leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Why Choose Dedicated<br />
              <em className="text-terra">1-on-1 Mentorship</em>
            </h2>
          </div>
          <p className="text-cream/40 text-sm leading-relaxed max-w-sm font-light">
            The study-abroad industry is dominated by mass-processing factories that treat students as recruitment volumes. Here is how Pathways Global differs fundamentally.
          </p>
        </motion.div>

        {/* ── Visual split panel ── */}
        <motion.div
          className="border border-cream/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] border-b border-cream/10">
            {/* Left header */}
            <div className="flex items-center gap-2.5 px-6 py-5 bg-cream/[0.02]">
              <div className="h-5 w-5 border border-cream/20 flex items-center justify-center flex-shrink-0">
                <X className="h-3 w-3 text-cream/30" />
              </div>
              <span className="label text-cream/30">Mass Processing Agencies</span>
            </div>
            {/* Divider */}
            <div className="hidden lg:block bg-cream/10" />
            {/* Right header */}
            <div className="flex items-center gap-2.5 px-6 py-5 border-t border-cream/10 lg:border-t-0">
              <div className="h-5 w-5 border border-terra/50 bg-terra/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-terra" />
              </div>
              <span className="label text-terra">Pathways Global 1-on-1 Mentorship</span>
            </div>
          </div>

          {/* Rows */}
          {comparisonItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] border-b border-cream/8 last:border-b-0"
            >
              {/* Left: Agency (subdued, struck-through feel) */}
              <div className="px-6 py-6 bg-cream/[0.015]">
                <div className="label text-cream/20 mb-3">{item.factor}</div>
                <p className="text-sm text-cream/30 leading-relaxed font-light line-through decoration-cream/15">
                  {item.agency}
                </p>
              </div>
              {/* Vertical divider */}
              <div className="hidden lg:block bg-cream/10" />
              {/* Right: Pathways (clear, prominent) */}
              <div className="px-6 py-6 border-t border-cream/8 lg:border-t-0">
                <div className="label text-cream/30 mb-3 lg:opacity-0">{item.factor}</div>
                <p className="text-sm text-cream/85 leading-relaxed font-medium">
                  {item.pathways}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Footer note ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-cream/25 text-xs">
            <ShieldCheck className="h-4 w-4 text-cream/20 flex-shrink-0" />
            <span>Zero Institutional Kickbacks · 100% Student-Aligned Interests</span>
          </div>
          <a
            href="#booking"
            className="text-terra text-sm border-b border-terra/35 hover:border-terra pb-0.5 transition-colors"
          >
            Schedule Your Free Discovery Call →
          </a>
        </div>

      </div>
    </section>
  );
}
