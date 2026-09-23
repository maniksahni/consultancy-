"use client";

import React from "react";
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Compass, 
  Lock 
} from "lucide-react";

export default function Hero() {
  const stats = [
    {
      label: "Visa Grant Success Rate",
      value: "98.4%",
      subtext: "First-attempt consular approvals",
      icon: ShieldCheck,
      color: "text-emerald-400",
      glowColor: "from-emerald-500/20 to-transparent",
    },
    {
      label: "Accredited Global Partner Unis",
      value: "350+",
      subtext: "Russell Group, Go8, TU9 & Tier-1",
      icon: Building2,
      color: "text-blue-400",
      glowColor: "from-blue-500/20 to-transparent",
    },
    {
      label: "Verified Global Placements",
      value: "5,000+",
      subtext: "Across UK, USA, Canada, Germany",
      icon: Users,
      color: "text-cyan-400",
      glowColor: "from-cyan-500/20 to-transparent",
    },
    {
      label: "Merit Scholarships Secured",
      value: "₹25 Cr+",
      subtext: "Direct institutional bursaries",
      icon: Award,
      color: "text-amber-400",
      glowColor: "from-amber-500/20 to-transparent",
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#030712] pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-white/[0.08]">
      {/* Dynamic ambient background mesh glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-[950px] rounded-full bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

      {/* Subtle modern dot-grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Split Hero Layout with Generous Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Authoritative Copy & High-Converting CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Live Admissions Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-slate-200">
                Active Admissions: <span className="text-white font-bold">Fall 2026 &amp; Spring 2027</span>
              </span>
              <span className="rounded-full bg-blue-400/15 border border-blue-400/25 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-300">
                UKVI • SEVIS • IRCC
              </span>
            </div>

            {/* Headline with High-End Modern Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-[-0.035em] text-white font-display leading-[1.05]">
              Your Direct Gateway to{" "}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_35px_rgba(59,130,246,0.25)]">
                Global Tier-1 Universities
              </span>
              <span className="text-slate-100 font-extrabold">
                &amp; 98.4% Visa Approvals.
              </span>
            </h1>

            {/* Subheading with Breathing Room */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Statutory visa compliance, financial holding audits, and recorded consular mock drills led by licensed international education specialists.
            </p>

            {/* CTAs with Luxury Micro-Interactions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#eligibility"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,0.55)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Evaluate My Profile Free</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#destinations"
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-slate-200 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
              >
                <Compass className="h-4 w-4 text-blue-400" />
                <span>Destination Regulatory Index</span>
              </a>
            </div>

            {/* Trust Verification Chips */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-slate-300">3-Tier University Shortlisting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-slate-300">3 Recorded Consular Mock Drills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-slate-300">28-Day Holding Verification</span>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Frosted Glass Visa Admit Dossier */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/25 to-emerald-500/25 rounded-3xl blur-3xl -z-10" />

            {/* Glass Card Container */}
            <div className="rounded-3xl border border-white/[0.1] bg-slate-900/65 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-600/30">
                    CAS
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      IMMIGRATION FILE: #UKVI-89241-CAS
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                      University of Leeds • 🇬🇧 United Kingdom
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[10px] font-extrabold text-emerald-400 tracking-wide uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VERIFIED GRANT
                </span>
              </div>

              {/* Student Photo & Admitted Profile Visual */}
              <div className="mt-5 relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" 
                  alt="International university students on campus" 
                  className="w-full h-48 object-cover filter brightness-95"
                />
                
                {/* Floating Consular Stamp Badge */}
                <div className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md rounded-xl p-2.5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 block font-bold">
                    CONSULAR DECISION
                  </span>
                  <span className="text-xs font-black text-white">
                    VISA ISSUED ✓
                  </span>
                  <span className="text-[9px] text-emerald-300 block font-mono">
                    Turnaround: 5 Days
                  </span>
                </div>

                {/* Floating Student Profile Pill */}
                <div className="absolute bottom-3 left-3 bg-[#0a0f1c]/90 text-white border border-white/[0.12] backdrop-blur-md rounded-xl px-3.5 py-1.5 flex items-center gap-2 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold">Rohan V. • B.Tech ECE (7.2 CGPA)</span>
                </div>
              </div>

              {/* Live Dossier Metrics */}
              <div className="grid grid-cols-2 gap-3.5 mt-5">
                <div className="p-3.5 bg-slate-950/60 border border-white/[0.06] rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Institutional Bursary
                  </span>
                  <span className="text-sm font-bold text-amber-300">
                    £4,000 Awarded
                  </span>
                </div>

                <div className="p-3.5 bg-slate-950/60 border border-white/[0.06] rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Post-Study Work
                  </span>
                  <span className="text-sm font-bold text-emerald-400">
                    2-Year Graduate Route
                  </span>
                </div>
              </div>

              {/* Security Watermark Footprint */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  CAS 100% Sponsor Validated
                </span>
                <span>Ref: EX-CONSULATE-DOC-2026</span>
              </div>

            </div>

          </div>

        </div>

        {/* 4-Column Luxury Frosted Glass Stats Panel with Generous Padding */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-slate-900/40 p-7 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/60 hover:-translate-y-1"
              >
                {/* Subtle top card glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/40 transition-colors" />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/[0.08] shadow-inner group-hover:scale-110 transition-transform">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                      Audit Verified
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-200 mt-1.5">
                      {stat.label}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-normal leading-relaxed">
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
