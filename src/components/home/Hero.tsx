"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const metrics = [
    { value: "99.2%", label: "Visa Approval Record" },
    { value: "500+", label: "Students Mentored 1-on-1" },
    { value: "₹4.8 Cr+", label: "Merit Scholarships Secured" },
    { value: "100%", label: "Unbiased Advisory Model" },
  ];

  return (
    <section className="relative min-h-screen bg-[#14120C] flex flex-col overflow-hidden">
      {/* Subtle parchment grid texture */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F2EDE4 1px, transparent 1px), linear-gradient(90deg, #F2EDE4 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Status bar */}
      <div className="relative pt-28 lg:pt-32 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2.5"
        >
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terra" />
          </span>
          <span className="label text-cream/40">Admissions Open · 2026 / 2027 Intakes</span>
        </motion.div>
      </div>

      {/* Main content grid */}
      <div className="relative flex-1 flex flex-col justify-center px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end max-w-7xl mx-auto w-full">

          {/* Headline — 8 cols on desktop, full on mobile */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <h1
              className="font-display font-normal text-cream leading-[0.88] tracking-[-0.025em]"
              style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
            >
              Elite 1-on-1<br />
              Study Abroad<br />
              Mentorship.<br />
              <em className="text-terra not-italic italic">Zero Compromises.</em>
            </h1>
          </motion.div>

          {/* Stats column — 4 cols on desktop */}
          <motion.div
            className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            {metrics.map((m, i) => (
              <div key={i} className="border-t border-cream/10 pt-4 pb-4 lg:pb-5">
                <div className="font-display text-3xl lg:text-[2.6rem] text-terra font-normal leading-none">
                  {m.value}
                </div>
                <div className="label text-cream/35 mt-2">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom strip: body copy + CTAs */}
      <motion.div
        className="relative border-t border-cream/10 px-6 lg:px-12 py-7 lg:py-8 max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <p className="text-cream/45 text-sm lg:text-base leading-relaxed font-sans font-light max-w-lg">
            Bypass mass-processing agencies. Get personalized profile assessment, Ivy League &amp; Russell Group SOP
            curation, and foolproof consular visa preparation directly from a dedicated mentor.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2.5 bg-terra hover:bg-terra-dark text-cream px-7 py-3.5 label transition-colors group"
            >
              Book Strategy Session
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/50 hover:text-cream/80 text-sm border-b border-cream/15 hover:border-cream/40 pb-0.5 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              Direct WhatsApp Inquiry
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
