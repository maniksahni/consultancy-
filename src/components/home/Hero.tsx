"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles
} from "lucide-react";

export default function Hero() {
  const metrics = [
    { value: "99.2%", label: "Visa Approval Record" },
    { value: "500+", label: "Students Mentored 1-on-1" },
    { value: "₹4.8 Cr+", label: "Merit Scholarships Secured" },
    { value: "100%", label: "Unbiased Advisory Model" },
  ];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 w-full max-w-full bg-[#070A11]">
      {/* Subtle architectural background illumination (warm champagne & deep navy) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[380px] bg-gradient-to-b from-[#C5A880]/[0.05] via-[#101828]/[0.08] to-transparent blur-[140px] pointer-events-none rounded-full" />
      
      {/* Hairline grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #C5A880 1px, transparent 1px), linear-gradient(to bottom, #C5A880 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full max-w-full">
        
        {/* Subtle Institutional Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#C5A880]/30 bg-[#0B0F19] px-4 py-1.5 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
          </span>
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#DBCBAA]">
            Admissions Open for 2026 / 2027 Intakes
          </span>
        </motion.div>

        {/* Master Editorial Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-white leading-[1.08] tracking-tight max-w-4xl"
        >
          Elite 1-on-1 Study Abroad Mentorship.{" "}
          <span className="italic font-light text-[#E5D3B3] block sm:inline">
            Zero Compromises.
          </span>
        </motion.h1>

        {/* Subheadline with Generous Typographic Leading */}
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-stone-300 font-light leading-relaxed max-w-2xl"
        >
          Bypass mass-processing agencies. Get personalized profile assessment, Ivy League &amp; Russell Group SOP curation, and foolproof consular visa preparation directly from a dedicated mentor.
        </motion.p>

        {/* Dual Actions with Quiet Craftsmanship */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#booking"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#C5A880] bg-[#C5A880] hover:bg-[#D4AF37] px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#070A11] transition-all shadow-md active:scale-[0.98]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#070A11]" />
            <span>Book 1-on-1 Strategy Session</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/[0.12] bg-[#0B0F19]/80 hover:bg-[#111625] hover:border-[#C5A880]/40 px-7 py-3.5 text-xs sm:text-sm font-medium text-stone-200 transition-all shadow-sm"
          >
            <MessageCircle className="h-4 w-4 text-[#C5A880]" />
            <span>Direct WhatsApp Inquiry</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-stone-400" />
          </a>
        </motion.div>

        {/* Executive 4-Stat Report Ledger */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 w-full max-w-4xl rounded-xl border border-white/[0.08] bg-[#0B0F19]/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
            {metrics.map((item, idx) => (
              <div key={idx} className="pt-3 sm:pt-0 sm:px-4 text-center first:pt-0">
                <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
                  {item.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-stone-400 mt-1.5">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
