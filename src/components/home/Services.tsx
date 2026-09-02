"use client";

import React from "react";
import { 
  GraduationCap, 
  FileEdit, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  badge?: string;
}

const servicesList: ServiceItem[] = [
  {
    id: "profile-shortlisting",
    title: "Profile Evaluation & Shortlisting",
    tagline: "Data-Driven University Matchmaking",
    description:
      "We audit your academic transcripts, GRE/IELTS scores, and budget to build a customized 3-tier shortlist (Ambitious, Target, and Safe) with application fee waivers.",
    icon: GraduationCap,
    features: [
      "Direct fast-track partner admissions",
      "Application fee waiver unlocking ($500+ savings)",
      "Backlog clearance & academic gap justification"
    ],
    badge: "350+ Partner Unis"
  },
  {
    id: "sop-lor-editing",
    title: "SOP, Resume & LOR Editing",
    tagline: "Ivy League & Russell Group Alumni Review",
    description:
      "Stand out in competitive applicant pools. Our senior editors brainstorm, polish, and review your Statement of Purpose, CV, and Letters of Recommendation.",
    icon: FileEdit,
    features: [
      "1-on-1 storytelling interview with senior editors",
      "Turnitin plagiarism & 0% AI detection verification",
      "ATS-compliant international resume formatting"
    ],
    badge: "48h Turnaround"
  },
  {
    id: "visa-filing-interviews",
    title: "Visa Filing & Embassy Mock Interviews",
    tagline: "Ex-Consulate Officer Trained Simulation",
    description:
      "We prepare foolproof visa dossiers (DS-160, VFS, Genuine Student statement) and conduct 3 rigorous mock embassy interviews to ensure a 98.4% grant rate.",
    icon: ShieldCheck,
    features: [
      "Complete financial and CA dossier verification",
      "3 recorded 1-on-1 consular mock interviews",
      "Refusal analysis & re-filing mastery"
    ],
    badge: "98.4% Visa Rate"
  },
  {
    id: "scholarship-assistance",
    title: "Scholarship & Financial Aid Guidance",
    tagline: "Over ₹25Cr+ in Merit Grants Secured",
    description:
      "We match your profile with university-specific entrance bursaries, government scholarships (Chevening, Fulbright, DAAD), and assist with scholarship essays.",
    icon: Award,
    features: [
      "Institutional and external scholarship scan",
      "Compelling scholarship essay drafting",
      "Tuition discount negotiation assistance"
    ],
    badge: "₹25Cr+ Secured"
  },
  {
    id: "test-prep",
    title: "IELTS, PTE & Language Coaching",
    tagline: "Score 7.5+ Band / 70+ in 30 Days",
    description:
      "Certified master trainers provide 1-on-1 speaking evaluations, full-length timed mock tests, and MOI waiver clearance strategies for UK and European universities.",
    icon: BookOpen,
    features: [
      "Daily 1-on-1 speaking interview practice",
      "Official Cambridge & Pearson mock tests",
      "MOI (Medium of Instruction) waiver guidance"
    ],
    badge: "7.5+ Band Avg."
  },
  {
    id: "predeparture-forex-housing",
    title: "Pre-Departure, Forex & Housing",
    tagline: "End-to-End Post-Landing Settlement",
    description:
      "Arrive abroad with complete peace of mind. We book verified student apartments near campus, arrange zero-markup multi-currency Forex cards, and discounted student flights.",
    icon: Home,
    features: [
      "Verified student accommodations near campus",
      "Zero-markup multi-currency Forex debit cards",
      "Student flight ticket discounts with extra 40kg baggage"
    ],
    badge: "Verified Housing"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#030712] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-4 w-4" /> Comprehensive Overseas Guidance
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Our Core Consultancy Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From university shortlisting to post-landing settlement, our specialized wings cover every critical milestone.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 sm:p-7 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)] hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    {service.badge && (
                      <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue-400">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-800/80">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <a
                    href="#eligibility-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Request Free Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
