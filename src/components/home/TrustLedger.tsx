"use client";

import React from "react";
import { motion } from "framer-motion";
import StatCounter from "@/components/common/StatCounter";

const TRUST_FACTS = [
  {
    value: "500+",
    label: "Students Mentored",
    sublabel: "Personalized admissions dossiers",
  },
  {
    value: "6",
    label: "Global Destinations",
    sublabel: "UK · USA · Canada · Germany · Aus · Ireland",
  },
  {
    value: "1:1",
    label: "Direct Mentorship",
    sublabel: "Single dedicated Senior Mentor",
  },
  {
    value: "100%",
    label: "Independent Guidance",
    sublabel: "Zero university recruiter kickbacks",
  },
];

export default function TrustLedger() {
  return (
    <section className="bg-[#FAF7F2] text-ink relative border-b border-ink/15 overflow-hidden">
      {/* ── Thin Warm Glow Line Traveling Across Top Border ONCE ── */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-ink/10 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-terra/20 via-terra to-terra/40 shadow-[0_0_8px_rgba(194,91,26,0.6)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">
        {/* Desktop: 4-column ledger | Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-ink/10">
          {TRUST_FACTS.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`py-6 sm:py-8 ${
                index % 2 === 0
                  ? "pr-3 sm:pr-6"
                  : "pl-3 sm:pl-6 lg:pl-8"
              } ${index > 0 ? "lg:pl-8" : ""} ${index < 3 ? "lg:pr-8" : ""}`}
            >
              <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-ink/40 mb-1.5 sm:mb-2">
                Audited · Factor 0{index + 1}
              </div>
              <div className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-ink font-normal leading-none tracking-tight">
                {fact.value.includes("+") || fact.value.includes("%") ? (
                  <StatCounter value={fact.value} duration={1.6} />
                ) : (
                  fact.value
                )}
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-ink/80 font-medium mt-2 leading-tight">
                {fact.label}
              </div>
              <div className="text-[11px] sm:text-xs text-ink/50 font-light mt-0.5 hidden sm:block">
                {fact.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
