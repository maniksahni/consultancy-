"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  FileEdit, 
  ShieldCheck, 
  Award, 
  Coins, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  BookOpen
} from "lucide-react";
import ConsultationModal from "@/components/modals/ConsultationModal";

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  metrics: string;
  badge?: string;
}

const comprehensiveServices: ServiceItem[] = [
  {
    id: "profile-shortlisting",
    title: "Profile Audit & 3-Tier Shortlisting",
    tagline: "Data-Driven University Matchmaking",
    description:
      "We audit your academic transcripts, GRE/IELTS benchmarks, and financial parameters to build a customized 3-tier shortlist (Ambitious, Target, and Safe) with application fee waivers.",
    icon: GraduationCap,
    features: [
      "Direct fast-track partner admissions to 350+ global universities",
      "Application fee waiver unlocking ($500+ direct applicant savings)",
      "Backlog clearance & multi-year career gap justification documentation"
    ],
    metrics: "350+ Global Universities",
    badge: "3-Tier Strategy"
  },
  {
    id: "sop-lor-editing",
    title: "SOP, Resume & LOR Legal Review",
    tagline: "Russell Group & Ivy League Alumni Reviewers",
    description:
      "Stand out in competitive admission pools. Our senior editors brainstorm, polish, and verify your Statement of Purpose, CV, and Letters of Recommendation with zero AI leakage.",
    icon: FileEdit,
    features: [
      "1-on-1 strategic narrative interview with domain specialists",
      "Turnitin plagiarism & 0% AI detection certified clearance",
      "ATS-compliant international CV formatting for campus research roles"
    ],
    metrics: "48h Review Turnaround",
    badge: "0% AI Verified"
  },
  {
    id: "visa-filing-interviews",
    title: "Consular Dossier & Embassy Mock Drills",
    tagline: "Ex-Consulate Officer Simulation",
    description:
      "We build foolproof visa dossiers (DS-160, VFS, Genuine Student statement) and conduct 3 recorded 1-on-1 mock embassy interviews to ensure compliance and zero refusals.",
    icon: ShieldCheck,
    features: [
      "Complete financial holding, CA net-worth, and source-of-funds verification",
      "3 recorded 1-on-1 consular mock interviews with tough rebuttal training",
      "Prior visa refusal audit, risk rectification & priority re-filing"
    ],
    metrics: "98.4% Visa Grant Rate",
    badge: "98.4% Visa Rate"
  },
  {
    id: "education-loans-forex",
    title: "Non-Collateral Loans & Blocked Funds",
    tagline: "Direct Sanctions up to ₹1.5 Cr in 48 Hours",
    description:
      "Zero-hassle financial clearance. We negotiate non-collateral education loans with top national and international lending partners, and expedite GIC and Blocked Account setups.",
    icon: Coins,
    features: [
      "Pre-visa loan sanction letters without property collateral",
      "Fast-track German Blocked Account (Expatrio/Fintiba) verification",
      "Canada GIC deposit coordination with Scotiabank & CIBC"
    ],
    metrics: "₹250+ Cr Disbursed",
    badge: "Non-Collateral"
  },
  {
    id: "test-prep",
    title: "IELTS, PTE & Language Certifications",
    tagline: "Target 7.5+ Band / 70+ PTE Score",
    description:
      "Certified master trainers provide 1-on-1 speaking evaluations, full-length timed mock tests, and MOI waiver clearance strategies for UK, Irish, and European universities.",
    icon: BookOpen,
    features: [
      "Daily 1-on-1 speaking and writing interview diagnostics",
      "Official Cambridge & Pearson timed computer-delivered mocks",
      "Medium of Instruction (MOI) waiver documentation for eligible schools"
    ],
    metrics: "7.5 Band Average",
    badge: "Score Booster"
  },
  {
    id: "predeparture-forex-housing",
    title: "Post-Landing Housing & Forex Cards",
    tagline: "Turnkey Relocation & Settlement Support",
    description:
      "Land abroad with total peace of mind. We secure verified student apartments near campus, arrange zero-markup multi-currency Forex debit cards, and connect you with local alumni.",
    icon: Home,
    features: [
      "Vetted student accommodation leasing within 15 mins of university campus",
      "Zero-markup multi-currency Forex debit cards with interbank exchange rates",
      "Student flight ticket concessions with 40kg+ verified baggage allowances"
    ],
    metrics: "100% Verified Housing",
    badge: "Campus Ready"
  }
];

export default function ServicesSection({ onOpenConsultation }: { onOpenConsultation?: () => void } = {}) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleOpenModal = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      setIsConsultationOpen(true);
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#030712] relative overflow-hidden border-b border-white/[0.08]">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/3 left-[-10%] h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span className="tracking-wide">Operational &amp; Regulatory Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-white font-display">
            Comprehensive End-to-End Advisory
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From university shortlisting and non-collateral loan sanctioning to visa filing, consular mocks, and verified student accommodation.
          </p>
        </div>

        {/* 6-Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {comprehensiveServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Subtle top card glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/40 transition-colors" />

                <div className="space-y-5">
                  {/* Top Icon & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="w-12 h-12 p-3 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all shadow-inner flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    {srv.badge && (
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 break-words">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors break-words">
                      {srv.title}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-400 mt-1 break-words">
                      {srv.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal break-words">
                    {srv.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug break-words min-w-0">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Metrics */}
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5 min-w-0">
                  <span className="text-[11px] font-semibold text-slate-400 font-mono min-w-0 break-words">
                    {srv.metrics}
                  </span>

                  <button
                    onClick={handleOpenModal}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group-hover:translate-x-1 duration-200 flex-shrink-0 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standalone Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </section>
  );
}
