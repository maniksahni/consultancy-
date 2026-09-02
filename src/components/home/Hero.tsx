"use client";

import React from "react";
import { 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users,
  Compass
} from "lucide-react";

export default function Hero() {
  const stats = [
    {
      label: "Visa Grant Success Rate",
      value: "98.4%",
      subtext: "First-attempt consular approvals",
      icon: ShieldCheck,
      color: "text-emerald-400",
      glow: "from-emerald-500/10 to-transparent",
    },
    {
      label: "Global Partner Universities",
      value: "350+",
      subtext: "Tier-1 & Russell Group institutions",
      icon: Building2,
      color: "text-blue-400",
      glow: "from-blue-500/10 to-transparent",
    },
    {
      label: "Students Placed Worldwide",
      value: "5,000+",
      subtext: "Across UK, USA, Canada, Germany",
      icon: Users,
      color: "text-cyan-400",
      glow: "from-cyan-500/10 to-transparent",
    },
    {
      label: "Merit Scholarships Secured",
      value: "₹25Cr+",
      subtext: "Direct institutional & govt aid",
      icon: Award,
      color: "text-amber-400",
      glow: "from-amber-500/10 to-transparent",
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#030712] pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* 1. Breathing Ambient Glow Blobs ("Jannat Aura") */}
      <div className="absolute top-[-10%] left-[20%] h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-blue-600/25 via-blue-400/15 to-transparent blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[25%] right-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-emerald-500/20 via-teal-400/10 to-transparent blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-[-10%] left-[40%] h-[400px] w-[400px] rounded-full bg-gradient-to-t from-indigo-600/15 to-transparent blur-[140px] pointer-events-none" />

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Floating Top Pill Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-slate-900/60 px-4 py-1.5 shadow-xl backdrop-blur-xl transition hover:border-blue-500/50 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-slate-200">
              Admissions Open for <span className="text-white font-bold">Fall 2026 / Spring 2027</span>
            </span>
            <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
              Live
            </span>
          </div>
        </div>

        {/* Hero Headline & Value Proposition */}
        <div className="mt-8 text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-display leading-[1.08]">
            Your Fast Track to Top{" "}
            <span className="text-shimmer">
              Global Universities
            </span>{" "}
            & Guaranteed Visas.
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            End-to-end guidance from ex-consular visa strategists. We handle university shortlisting, SOP editing, merit scholarships, and visa interview simulations.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#eligibility-form"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              <span>Evaluate My Profile Free</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#destinations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/60 px-7 py-4 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:border-slate-500 hover:bg-slate-900 hover:text-white"
            >
              <Compass className="h-4 w-4 text-blue-400" />
              <span>Explore 6 Top Countries</span>
            </a>
          </div>

          {/* 3 Floating Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Free 3-Tier University Shortlist</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>3 Consular Mock Interviews</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>₹0 Upfront Assessment Fee</span>
            </div>
          </div>
        </div>

        {/* 4-Column Luxury Glass Stats Panel */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/70 hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br ${stat.glow} blur-2xl group-hover:scale-150 transition-transform`} />

                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Verified
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold tracking-tight text-white font-display">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-300 mt-1">
                      {stat.label}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
