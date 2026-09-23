"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";

interface VisaCaseFile {
  id: string;
  caseFileNumber: string;
  initials: string;
  fullName: string;
  image: string;
  flag: string;
  country: string;
  undergradProfile: {
    degree: string;
    score: string;
    backlogs: string;
    testScore: string;
  };
  admittedProgram: string;
  admittedUniversity: string;
  embassyOutcome: string;
  consulateDetails: string;
  verifiedScholarship: string;
  dossierHighlights: string;
  outcomeType: "instant" | "priority" | "standard";
}

const verifiedCaseFiles: VisaCaseFile[] = [
  {
    id: "case-uk-01",
    caseFileNumber: "UKVI-CAS-89241",
    initials: "R.V.",
    fullName: "Rohan Verma",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    flag: "🇬🇧",
    country: "UK",
    undergradProfile: {
      degree: "B.Tech in Electronics & Comm. (ECE)",
      score: "7.2 CGPA",
      backlogs: "2 Backlogs (Cleared)",
      testScore: "IELTS Academic 7.0 (L:8.0, R:7.5, W:6.5, S:6.5)"
    },
    admittedProgram: "MSc Data Science & AI",
    admittedUniversity: "University of Leeds (Russell Group)",
    embassyOutcome: "UK Priority Student Visa Granted in 5 Days",
    consulateDetails: "VFS Global Priority Counter • Bio-metrics: Sept 12 • Passport Dispatched: Sept 17",
    verifiedScholarship: "£4,000 International Merit Bursary",
    dossierHighlights: "28-day funds holding verified across nationalized bank account. English MOI waiver accepted for Class 12 score.",
    outcomeType: "priority"
  },
  {
    id: "case-us-02",
    caseFileNumber: "USCIS-DS160-41098",
    initials: "P.I.",
    fullName: "Priya Iyer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    flag: "🇺🇸",
    country: "USA",
    undergradProfile: {
      degree: "BCA (Computer Applications)",
      score: "7.8 CGPA",
      backlogs: "0 Backlogs",
      testScore: "Duolingo English Test (DET) 125/160"
    },
    admittedProgram: "MS Cybersecurity (STEM Designated)",
    admittedUniversity: "Northeastern University, Boston",
    embassyOutcome: "F-1 Visa Approved — Chennai Consulate (Interview Duration: 90 secs)",
    consulateDetails: "US Consulate Chennai • Window #7 • Approved without 221(g) query",
    verifiedScholarship: "$10,000 Dean's Merit Scholarship",
    dossierHighlights: "I-20 liquid funds verified for $58,400. Consular drills trained candidate on exact career return plan & post-STEM OPT trajectory.",
    outcomeType: "instant"
  },
  {
    id: "case-de-03",
    caseFileNumber: "DE-APS-77319",
    initials: "A.M.",
    fullName: "Aditya Mishra",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    flag: "🇩🇪",
    country: "Germany",
    undergradProfile: {
      degree: "B.E. Mechanical Engineering",
      score: "72.4% (First Class)",
      backlogs: "0 Backlogs",
      testScore: "IELTS 6.5 • Goethe A2 German"
    },
    admittedProgram: "MSc Automotive & Software Engineering",
    admittedUniversity: "TU Munich (TUM)",
    embassyOutcome: "§16b German National Student Visa Granted in 14 Days",
    consulateDetails: "German Consulate Mumbai • APS Verified in 26 Days • VFS German Visa Track",
    verifiedScholarship: "100% Tuition-Free State University Status (€0/yr)",
    dossierHighlights: "APS Certificate audit passed with zero discrepancies. Expatrio €11,208 blocked account and TK statutory health insurance verified.",
    outcomeType: "standard"
  },
  {
    id: "case-au-04",
    caseFileNumber: "DHA-GS-60285",
    initials: "K.P.",
    fullName: "Kavita Patel",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    flag: "🇦🇺",
    country: "Australia",
    undergradProfile: {
      degree: "B.Sc Information Technology",
      score: "8.1 CGPA",
      backlogs: "0 Backlogs",
      testScore: "PTE Academic 72 (All bands 68+)"
    },
    admittedProgram: "Master of Data Science",
    admittedUniversity: "University of Melbourne (Go8)",
    embassyOutcome: "Subclass 500 Student Visa Granted in 8 Days (GS Compliant)",
    consulateDetails: "Home Affairs Adelaide Processing Centre • Genuine Student (GS) Benchmark Met",
    verifiedScholarship: "AUD $10,000 International Dean's Grant",
    dossierHighlights: "Genuine Student (GS) statement drafted with rigorous employment ROI logic. Statutory AUD $29,710 maintenance funds documented.",
    outcomeType: "priority"
  },
  {
    id: "case-ca-05",
    caseFileNumber: "IRCC-SDS-33924",
    initials: "D.C.",
    fullName: "Deep Chatterjee",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    flag: "🇨🇦",
    country: "Canada",
    undergradProfile: {
      degree: "B.Tech Computer Science",
      score: "7.9 CGPA",
      backlogs: "0 Backlogs",
      testScore: "IELTS Academic 7.0 Overall"
    },
    admittedProgram: "MEng Cloud Computing & Distributed Systems",
    admittedUniversity: "University of Waterloo, Ontario",
    embassyOutcome: "Canada SDS Study Permit Granted in 12 Days (PAL Verified)",
    consulateDetails: "IRCC CPC-Edmonton • Biometrics & Upfront Medical Cleared • Fast-Track SDS",
    verifiedScholarship: "CAD $8,000 Entrance Bursary",
    dossierHighlights: "Student Direct Stream (SDS) compliant. CIBC CAD $20,635 mandatory GIC deposit + Ontario Provincial Attestation Letter (PAL) tracked.",
    outcomeType: "priority"
  },
  {
    id: "case-ie-06",
    caseFileNumber: "ISD-STAMP2-51478",
    initials: "P.N.",
    fullName: "Pooja Nambiar",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    flag: "🇮🇪",
    country: "Ireland",
    undergradProfile: {
      degree: "BCA (Computer Applications)",
      score: "8.0 CGPA",
      backlogs: "0 Backlogs",
      testScore: "IELTS 7.5 Academic"
    },
    admittedProgram: "MSc Big Data Analytics",
    admittedUniversity: "Trinity College Dublin",
    embassyOutcome: "Irish Stamp 2 Visa Granted in 5 Days (Stamp 1G Eligible)",
    consulateDetails: "Embassy of Ireland New Delhi • Visa Ref: IRL-2026-9041 • Zero Refusal History",
    verifiedScholarship: "€5,000 Global Excellence Award",
    dossierHighlights: "€10,000 liquid living maintenance verified. 2-Year Stamp 1G Stay Back scheme eligibility unlocked for Silicon Docks employment.",
    outcomeType: "instant"
  }
];

export default function SuccessStories() {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");

  const filteredCases = verifiedCaseFiles.filter((c) => {
    if (selectedCountry === "All") return true;
    return c.country.toLowerCase() === selectedCountry.toLowerCase();
  });

  return (
    <section id="stories" className="py-24 sm:py-32 bg-[#030712] relative overflow-hidden border-b border-white/[0.08]">
      {/* Background radial spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verifiable Case Records • 98.4% Consular Approval</span>
            </div>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl font-display">
              Verified Visa Case Files
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Authentic admission dossiers and embassy grant records. Every case file contains verified CGPAs, cleared backlogs, consular interview logs, and grant amounts.
            </p>
          </div>

          {/* Compliance Stats Pill */}
          <div className="bg-slate-900/60 border border-white/[0.08] backdrop-blur-2xl p-4 sm:p-5 rounded-3xl flex items-center gap-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
            <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Zero Generic Claims</div>
              <div className="text-[11px] text-slate-400">100% Real Transcripts &amp; VFS/Consulate Approvals</div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {["All", "UK", "USA", "Germany", "Australia", "Canada", "Ireland"].map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                selectedCountry === country
                  ? "bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] scale-[1.02]"
                  : "bg-slate-900/60 text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20 backdrop-blur-md"
              }`}
            >
              <span>{country === "All" ? "All Case Files" : `${country} Files`}</span>
            </button>
          ))}
        </div>

        {/* Verified Case Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCases.map((file) => (
            <div
              key={file.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-slate-900/60 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:-translate-y-1.5"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-emerald-500/40 transition-colors" />

              <div className="space-y-4">
                
                {/* File Header: File ID, Applicant Photo, Name & Flag */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    {/* Student Photo */}
                    <div className="relative shrink-0">
                      <img
                        src={file.image}
                        alt={file.fullName}
                        className="h-12 w-12 rounded-2xl object-cover border border-white/[0.12] group-hover:border-emerald-400 shadow-sm group-hover:scale-105 transition-all duration-300"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-950" />
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-slate-400">
                        {file.caseFileNumber}
                      </div>
                      <div className="text-xs text-white font-bold flex items-center gap-1.5">
                        <span>{file.fullName}</span>
                        <span className="text-sm">{file.flag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp Badge */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 text-[10px] font-extrabold text-emerald-400 font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    VERIFIED
                  </span>
                </div>

                {/* Undergrad Profile Dossier */}
                <div className="rounded-2xl bg-slate-950/60 border border-white/[0.06] p-4 space-y-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-mono">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                    Applicant Academic Profile
                  </div>
                  <div className="text-xs font-bold text-white">
                    {file.undergradProfile.degree}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-white/[0.06]">
                    <div>
                      <span className="text-slate-400">Score: </span>
                      <strong className="text-white">{file.undergradProfile.score}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Backlogs: </span>
                      <strong className="text-emerald-400">{file.undergradProfile.backlogs}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">English: </span>
                      <strong className="text-blue-300">{file.undergradProfile.testScore}</strong>
                    </div>
                  </div>
                </div>

                {/* Admitted Institution & Program */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    Admitted University &amp; Program
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {file.admittedProgram}
                  </h4>
                  <p className="text-xs font-semibold text-blue-400">
                    {file.admittedUniversity}
                  </p>
                </div>

                {/* Embassy Outcome Tag (Strictly Emerald for visa approvals) */}
                <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/30 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <FileCheck className="w-4 h-4 shrink-0" />
                    <span>{file.embassyOutcome}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pl-5">
                    {file.consulateDetails}
                  </div>
                </div>

                {/* Verified Scholarship Secured */}
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-2.5 flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{file.verifiedScholarship}</span>
                </div>

                {/* Dossier Operational Details */}
                <p className="text-[11px] text-slate-300 leading-relaxed italic border-l-2 border-slate-700 pl-3">
                  "{file.dossierHighlights}"
                </p>

              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  Official Dossier Record
                </span>
                <a
                  href="#eligibility"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Simulate Odds</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
