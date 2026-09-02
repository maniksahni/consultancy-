"use client";

import React from "react";
import { 
  Users, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  Calendar
} from "lucide-react";

interface Counselor {
  id: string;
  name: string;
  role: string;
  experience: string;
  alumniTag: string;
  alumniCountry: string;
  stats: string;
  expertise: string[];
  bio: string;
}

const teamMembers: Counselor[] = [
  {
    id: "c1",
    name: "Dr. Priya Sharma",
    role: "Head of UK & European Admissions",
    experience: "12+ Years Experience",
    alumniTag: "Ex-University of Leeds Alumna",
    alumniCountry: "🇬🇧 UK",
    stats: "1,800+ UK/EU Admits",
    expertise: ["Russell Group Admissions", "1-Year Fast Track Masters", "Chevening Scholarships"],
    bio: "Specializes in high-acceptance shortlists for top UK universities with IELTS waivers and fee discount negotiations."
  },
  {
    id: "c2",
    name: "Marcus Vance",
    role: "Principal US Visa Strategist & Coach",
    experience: "15+ Years Experience",
    alumniTag: "Ex-NYU Stern & Fulbright Scholar",
    alumniCountry: "🇺🇸 USA",
    stats: "99.1% F-1 Visa Grant Rate",
    expertise: ["US Embassy Mock Interviews", "STEM OPT Strategy", "Ivy League & Tier-1 Research"],
    bio: "Ex-consular coach who has trained over 2,200 Indian students to ace their high-stakes F-1 consular visa interviews."
  },
  {
    id: "c3",
    name: "Ananya Sen",
    role: "Lead Advisor — Canada & Australia",
    experience: "10+ Years Experience",
    alumniTag: "Certified CCEA & Monash Alumna",
    alumniCountry: "🇦🇺 Australia",
    stats: "1,400+ Visas Granted",
    expertise: ["Canada SDS & PAL Compliance", "Australian GS Statements", "PR & Post-Study Work"],
    bio: "Expert on provincial nomination pathways, SDS visa compliance, and securing top Go8 and Canadian co-op admits."
  }
];

export default function Team() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Users className="h-4 w-4" /> Trusted Mentors & Ex-Consular Coaches
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Meet Your Overseas Admissions Mentors
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Students trust people, not just brands. Work 1-on-1 with certified alumni from world-leading universities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl transition hover:border-blue-500/60 hover:bg-slate-900 group"
            >
              <div className="space-y-4">
                {/* Header Profile Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-black text-base shadow-md group-hover:scale-105 transition-transform">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-blue-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alumni & Stats Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-950 border border-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                    <span>{member.alumniTag}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{member.stats}</span>
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.bio}
                </p>

                {/* Expertise List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Areas of Expertise:
                  </span>
                  {member.expertise.map((exp, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro-CTA Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <a
                  href="#eligibility-form"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 border border-slate-800 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-blue-600 hover:text-white hover:border-blue-600 group-hover:border-blue-500"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-blue-400 group-hover:text-white" />
                  <span>Book Strategy Call with {member.name.split(" ")[0]}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
