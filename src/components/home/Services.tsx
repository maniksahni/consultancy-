"use client";

import React from "react";
import { 
  GraduationCap, 
  FileEdit, 
  ShieldCheck, 
  Award, 
  Coins, 
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
    id: "education-loans",
    title: "Collateral-Free Education Loans",
    tagline: "Quick Sanctions with 12+ Lending Partners",
    description:
      "Sanction your education loan without pledging property. We partner with HDFC Credila, Prodigy Finance, Leap, Avanse, and Axis Bank at competitive interest rates.",
    icon: Coins,
    features: [
      "Unsecured loans up to ₹75 Lakhs ($100,000)",
      "Doorstep documentation & 48-hour sanctions",
      "Pre-visa sanction letters for proof-of-funds"
    ],
    badge: "0% Collateral"
  },
  {
    id: "predeparture-forex-housing",
    title: "Pre-Departure, Forex & Housing",
    tagline: "End-to-End Post-Landing Settlement",
    description:
      "Arrive abroad with complete peace of mind. We book verified student apartments near campus, arrange zero-markup multi-currency Forex cards, and discounted student flights.",
    icon: Home,
    features: [
      "Verified student accommodations (Amber, Casita)",
      "Zero-markup multi-currency Forex debit cards",
      "Student flight ticket discounts with extra 40kg baggage"
    ],
    badge: "Verified Housing"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="h-4 w-4" /> End-to-End Overseas Support
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Our Core Consultancy Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            From initial university shortlisting to landing in your dream country, our comprehensive suite covers every single milestone.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 shadow-sm transition hover:bg-white hover:shadow-md hover:border-blue-400 group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    {service.badge && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-blue-600 mt-0.5">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <a
                    href="#eligibility-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Request Free Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
