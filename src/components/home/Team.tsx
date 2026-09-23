"use client";

import React, { useState } from "react";
import { 
  Users, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  FileCheck,
  Building2
} from "lucide-react";
import ConsultationModal from "@/components/modals/ConsultationModal";

interface Counselor {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  licenseNumber: string;
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
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    experience: "12+ Years Experience",
    licenseNumber: "British Council Certified Agent #BC-UK-9182",
    alumniTag: "University of Leeds Alumna (PhD)",
    alumniCountry: "🇬🇧 UK",
    stats: "1,800+ UK & EU Visa Grants",
    expertise: [
      "Russell Group Admissions & CAS Sponsorship",
      "UKVI 28-day Financial Holding Verification",
      "Chevening & Commonwealth Scholarship Review"
    ],
    bio: "Senior admissions strategist who audits transcripts for 1-year fast-track Master's programs, secures English MOI waivers, and manages CAS priority issuance."
  },
  {
    id: "c2",
    name: "Marcus Vance",
    role: "Principal US Visa Strategist & Consular Coach",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    experience: "15+ Years Experience",
    licenseNumber: "AIRC Certified US Advisor #AIRC-US-4029",
    alumniTag: "NYU Stern Alumnus • Fulbright Scholar",
    alumniCountry: "🇺🇸 USA",
    stats: "99.1% F-1 Consular Grant Rate",
    expertise: [
      "3 Recorded Consular Mock Interview Drills",
      "STEM OPT & CPT Internship Strategic Planning",
      "I-20 Financial Holding & DS-160 Dossier Audit"
    ],
    bio: "Ex-consular coach who has personally trained over 2,200 international students to ace their high-stakes F-1 consular interviews across Mumbai, Delhi, and Hyderabad."
  },
  {
    id: "c3",
    name: "Ananya Sen",
    role: "Lead Counselor — Canada & Australia",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    experience: "10+ Years Experience",
    licenseNumber: "QEAC Certified #M104 • CCEA Canada",
    alumniTag: "Monash University Alumna (Go8)",
    alumniCountry: "🇦🇺 Australia",
    stats: "1,400+ Visas Granted",
    expertise: [
      "Canada SDS Stream & PAL Quota Compliance",
      "Australian Genuine Student (GS) Statements",
      "Scotiabank/CIBC CAD $20,635 GIC Coordination"
    ],
    bio: "Specialist in Canadian Provincial Attestation Letter (PAL) allocations, SDS fast-track visa processing, and drafting audit-proof Australian Genuine Student (GS) filings."
  }
];

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("USA");

  const handleBookCall = (country: string) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  return (
    <section id="team" className="py-20 sm:py-28 bg-slate-50 dark:bg-[#030712] border-b border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 right-[-5%] h-[400px] w-[400px] rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 border border-blue-500/25">
            <Users className="h-3.5 w-3.5" /> Licensed Advisors &amp; Ex-Consular Trainers
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-white font-display">
            Accredited Overseas Admissions Mentors
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Work 1-on-1 with certified education counselors holding British Council, AIRC, and QEAC licensing credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-slate-900/60 p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-1.5"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/40 transition-colors" />

              <div className="space-y-5">
                {/* Header Profile Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="h-14 w-14 rounded-2xl object-cover border border-white/[0.12] group-hover:border-blue-400 shadow-md group-hover:scale-105 transition-all duration-300"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
                    {member.alumniCountry}
                  </span>
                </div>

                {/* License Tag */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] px-3.5 py-2 text-[11px] text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-emerald-400 font-semibold">{member.licenseNumber}</span>
                </div>

                {/* Alumni & Stats Badges */}
                <div className="flex flex-wrap gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                    <span>{member.alumniTag}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                    <Award className="h-3.5 w-3.5" />
                    <span>{member.stats}</span>
                  </span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {member.bio}
                </p>

                {/* Expertise List */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block font-mono">
                    Core Operational Domains:
                  </span>
                  {member.expertise.map((exp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => handleBookCall(member.alumniCountry.includes("UK") ? "UK" : member.alumniCountry.includes("USA") ? "USA" : "Australia")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.05] hover:bg-blue-600 border border-white/[0.08] hover:border-blue-500 py-3 text-xs font-bold text-white transition-all active:scale-[0.99] shadow-sm group-hover:bg-blue-600/20"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-blue-400 group-hover:text-white" />
                  <span>Book Dossier Review with {member.name.split(" ")[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCountry={selectedCountry}
      />
    </section>
  );
}
