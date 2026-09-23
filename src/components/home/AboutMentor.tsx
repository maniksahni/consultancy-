"use client";

import React from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  FileEdit, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  HeartHandshake,
  Sparkles,
  Award,
  BookOpen
} from "lucide-react";

export default function AboutMentor() {
  const comparisonData = [
    {
      feature: "Who actually works on your application?",
      agency: "Passed between junior counsellors, interns & telecallers",
      mentor: "Pooja Didi personally evaluates, writes strategy & files with you",
    },
    {
      feature: "University Recommendations",
      agency: "Pushed towards partner colleges paying the highest agent commission",
      mentor: "100% unbiased shortlisting based strictly on your profile & career ROI",
    },
    {
      feature: "SOP & LOR Drafting",
      agency: "Copied ChatGPT & repetitive agency templates risking blacklisting",
      mentor: "Iterative line-by-line personal review celebrating your true story",
    },
    {
      feature: "Visa & Consular Interview Prep",
      agency: "A single 15-minute generic PDF checklist right before your appointment",
      mentor: "Intensive 1-on-1 mock interviews grilled until you speak with zero fear",
    },
    {
      feature: "Communication & Access",
      agency: "Ticketing systems, unanswered office calls, receptionist gates",
      mentor: "Direct personal WhatsApp voice notes & calls throughout your journey",
    },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden bg-slate-950/60 border-t border-b border-white/[0.06]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Meet Your Personal Mentor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            The Mentor in Your Corner,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              Every Single Step
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Studying abroad is one of the biggest investments of your life. You deserve an empathetic, experienced mentor who treats your dream as her own.
          </p>
        </div>

        {/* Bio Card & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Portrait & Credentials */}
          <div className="lg:col-span-5 rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-white/[0.06]">
              <Image
                src="/images/mentor.jpg"
                alt="Pooja Sharma - Senior Study Abroad Mentor"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Independent Advisory</span>
                <p className="text-lg font-bold text-white font-display">Pooja Sharma (&ldquo;Pooja Didi&rdquo;)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Academic &amp; Professional Background</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Master&apos;s in International Education Policy &bull; 8+ Years of dedicated student advising across UK, US, EU &amp; Commonwealth systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Proven Admissions Record</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Personally guided admits into Russell Group, Ivy League, TU9 German universities, and Canadian U15 institutions with ₹4.8Cr+ in scholarships.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Specialized Visa Rescue Track</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Specialized in turning around previous visa refusals (US 214(b), Canadian Section 216(1), German APS bottlenecks) through bulletproof dossier structuring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Her Philosophy & 3 Commitments */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mentor&apos;s Philosophy</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2 mb-4">
                &ldquo;Why I chose independent mentorship over running a mass agency.&rdquo;
              </h3>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Early in my career, I saw how traditional agencies operate: students are treated as sales quotas, pressured into obscure universities with high recruiter commissions, and handed off to junior interns for cookie-cutter SOP templates.
                </p>
                <p>
                  I built my mentorship practice on the opposite foundation. When you join my cohort, you work directly with me. I read your essays sentence by sentence, challenge your career reasoning, and prepare you for your visa interview until you can articulate your purpose with effortless confidence.
                </p>
              </div>

              {/* 3 Core Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <MessageSquare className="h-5 w-5 text-emerald-400 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">Direct WhatsApp Line</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Real-time updates and voice notes directly with me throughout your cycle.
                  </p>
                </div>

                <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4">
                  <FileEdit className="h-5 w-5 text-teal-400 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">Zero Template SOPs</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Hand-crafted, authentic narrative highlighting your unique spark and grit.
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <UserCheck className="h-5 w-5 text-blue-400 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">Rigorous Visa Mocks</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Replicating consular questions and nerve control until you are 100% prepared.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote banner */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-slate-900/60 p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium italic">
                &ldquo;You don&apos;t just need an application processor; you need someone who knows your name, your fears, and exactly how to position your profile for global victory.&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* High-Impact Comparison: Mass Agency vs. 1-on-1 With Me */}
        <div className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Mass Processing Agency vs.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                1-on-1 Mentorship With Me
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              See the direct differences that determine whether you get admitted to top universities or get pushed into random commission colleges.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.1]">
                  <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">
                    Evaluation Factor
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-red-400 uppercase tracking-wider w-1/3 bg-red-950/10 rounded-t-xl">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 text-red-400" />
                      Traditional Mass Agencies
                    </span>
                  </th>
                  <th className="py-4 px-4 text-xs font-bold text-emerald-400 uppercase tracking-wider w-1/3 bg-emerald-950/20 rounded-t-xl">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      1-on-1 With Pooja Didi
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-xs sm:text-sm font-semibold text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-xs sm:text-sm text-slate-400 bg-red-950/5">
                      <div className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{row.agency}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs sm:text-sm text-emerald-200 font-medium bg-emerald-950/15">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{row.mentor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
