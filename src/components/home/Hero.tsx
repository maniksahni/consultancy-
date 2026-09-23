"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  Globe2,
  Lock,
  ArrowUpRight
} from "lucide-react";

export default function Hero() {
  const metrics = [
    { value: "99.2%", label: "Visa Approval Record" },
    { value: "500+", label: "Students Mentored 1-on-1" },
    { value: "₹4.8 Cr+", label: "Merit Scholarships Secured" },
    { value: "100%", label: "Unbiased Advisory Model" },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-blue-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Subtle Linear Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Admissions Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-blue-300">
            Admissions Open for 2026 / 2027 Intakes
          </span>
        </motion.div>

        {/* Master Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white leading-[1.08] tracking-tight font-display max-w-4xl"
        >
          Elite 1-on-1 Study Abroad Mentorship.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
            Zero Compromises.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl"
        >
          Bypass mass-processing agencies. Get personalized profile assessment, Ivy League &amp; Russell Group SOP curation, and foolproof consular visa preparation directly from a dedicated mentor.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#booking"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="h-4 w-4 text-blue-200" />
            <span>Book 1-on-1 Strategy Session</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 px-7 py-4 text-sm font-semibold text-slate-200 backdrop-blur-xl transition-all shadow-sm"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span>Direct WhatsApp Inquiry</span>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </a>
        </motion.div>

        {/* 4-Stat Metrics Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 w-full max-w-4xl rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 sm:p-5 backdrop-blur-xl shadow-2xl shadow-black/40"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
            {metrics.map((item, idx) => (
              <div key={idx} className="pt-3 sm:pt-0 sm:px-4 text-center first:pt-0">
                <p className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                  {item.value}
                </p>
                <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
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
