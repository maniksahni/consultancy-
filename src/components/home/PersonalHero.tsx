"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  FileCheck2, 
  GraduationCap,
  Calendar,
  Compass,
  CheckCircle2,
  Lock,
  Star
} from "lucide-react";

export default function PersonalHero() {
  const trustHighlights = [
    {
      icon: UserCheck,
      title: "Direct 1-on-1 Access",
      desc: "Zero middlemen, call center reps, or junior counsellors. You work solely with your senior mentor.",
    },
    {
      icon: Compass,
      title: "Profile-First Shortlisting",
      desc: "Universities shortlisted based on your career goals, budget, and true admit probability.",
    },
    {
      icon: ShieldCheck,
      title: "100% Unbiased Guidance",
      desc: "Zero commission-driven university steering across UK, USA, Canada, Germany, Australia & Ireland.",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Narrative & Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-md mb-6 w-fit shadow-sm shadow-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-emerald-300">
                Direct 1-on-1 Senior Mentorship &bull; Independent Visa Advisory
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight font-display mb-6">
              Personalized, End-to-End{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                Study Abroad Mentorship
              </span>{" "}
              — From Shortlisting to Visa Approval.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              No automated mass-applications. I personally review your profile, craft authentic SOPs, and prepare you for visa interviews with honest, step-by-step guidance.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="h-4 w-4 text-emerald-200" />
                <span>Book 1-on-1 Strategy Call</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/33755749029?text=Hi!%20I%20would%20like%20to%20chat%20directly%20about%20my%20study%20abroad%20plans."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-emerald-500/30 bg-slate-900/80 hover:bg-emerald-950/40 hover:border-emerald-500/50 px-6 py-4 text-sm font-semibold text-emerald-300 backdrop-blur-md transition-all shadow-md"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>

            {/* 3 Core Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/[0.08]">
              {trustHighlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl border border-white/[0.06] bg-slate-900/40 p-3.5 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-slate-900/70 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <item.icon className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xs font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column: Sleek Abstract Mentorship Credential Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Ambient card back glow */}
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-blue-500/30 blur-xl opacity-75" />

              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-6 sm:p-7">
                {/* Top header badge */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        Senior Practice
                      </span>
                      <h3 className="text-lg font-black text-white font-display">
                        Your Personal Mentor
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Admissions Open
                  </div>
                </div>

                {/* Core Credentials List */}
                <div className="space-y-3.5 mb-6">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-slate-950/60 p-3.5">
                    <Award className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">8+ Years Senior Admissions Experience</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Advising international students on US, UK, Canada, Germany &amp; Australia admissions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-slate-950/60 p-3.5">
                    <ShieldCheck className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">99.2% Visa Grant Track Record</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Specialized in thorough financial audit, DS-160 scrutiny, and high-pressure mock interviews.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.04] bg-slate-950/60 p-3.5">
                    <FileCheck2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Line-by-Line SOP &amp; LOR Curation</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Zero copy-paste templates or AI shortcuts. Every personal essay is crafted for maximum impact.</p>
                    </div>
                  </div>
                </div>

                {/* 2-Column High Stats Bar */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                  <div className="rounded-xl border border-white/[0.06] bg-slate-950/70 p-3 text-center">
                    <p className="text-2xl font-black text-white font-display">500+</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Students Mentored</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-slate-950/70 p-3 text-center">
                    <p className="text-2xl font-black text-emerald-400 font-display">₹4.8 Cr+</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Scholarships Won</p>
                  </div>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 rounded-2xl border border-emerald-500/30 bg-slate-900/95 backdrop-blur-xl p-3 shadow-2xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                  <Star className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Unbiased Advisory</p>
                  <p className="text-[10px] text-slate-400">Zero Agent Commissions</p>
                </div>
              </div>
            </div>

            {/* Quick Country Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Countries guided:</span>
              {[
                { flag: "🇬🇧", name: "UK" },
                { flag: "🇺🇸", name: "USA" },
                { flag: "🇨🇦", name: "Canada" },
                { flag: "🇩🇪", name: "Germany" },
                { flag: "🇦🇺", name: "Australia" },
                { flag: "🇮🇪", name: "Ireland" },
              ].map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 hover:text-white transition"
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </span>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
