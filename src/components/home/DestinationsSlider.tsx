"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  DollarSign, 
  Briefcase, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Building2,
  FileText,
  ShieldCheck,
  Globe2,
  Sparkles
} from "lucide-react";

interface DestinationItem {
  id: string;
  name: string;
  flag: string;
  image: string;
  visaSubclass: string;
  intakes: string;
  avgTuition: string;
  pswRights: string;
  proofOfFunds: string;
  topUnis: string[];
  keyRules: string[];
}

const realisticDestinations: DestinationItem[] = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    visaSubclass: "Student Route Visa",
    intakes: "Sept/Oct (Major) & Jan/Feb (Secondary)",
    avgTuition: "£13,500 – £24,000 / yr",
    pswRights: "2-Year Graduate Route (PSW)",
    proofOfFunds: "Tuition balance + £1,023/mo (£1,334 in London) for 9 months",
    topUnis: ["University of Leeds", "University of Manchester", "University of Bristol", "Queen Mary London"],
    keyRules: [
      "Student Route Visa with direct electronic CAS sponsorship from licensed UKVI sponsors",
      "Funds mandate: 28-day holding rule for tuition balance + £1,023/mo (£1,334 in London)",
      "English MOI waiver accepted for Class 12 CBSE/ICSE English scores 70%+"
    ]
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1200&auto=format&fit=crop",
    visaSubclass: "F-1 Academic Student Visa",
    intakes: "Fall (Aug/Sept) & Spring (Jan)",
    avgTuition: "$22,000 – $42,000 / yr",
    pswRights: "12-Month OPT + 24-Month STEM Extension (3 years total)",
    proofOfFunds: "1st-year liquid funds requirement for I-20 issuance",
    topUnis: ["Northeastern University Boston", "Arizona State University", "UT Dallas", "Purdue University"],
    keyRules: [
      "12-Month OPT + 24-Month STEM Extension (3 years total post-study work authorization)",
      "1st-year liquid funds requirement strictly audited for I-20 certificate eligibility",
      "Rigorous consular interview preparation with DS-160 & SEVIS I-901 fee tracking"
    ]
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935703635-2717090c2210?q=80&w=1200&auto=format&fit=crop",
    visaSubclass: "Study Permit (SDS & Non-SDS Streams)",
    intakes: "Fall (Sept) & Winter (Jan)",
    avgTuition: "CAD 16,000 – 28,000 / yr",
    pswRights: "Up to 3-Year PGWP (Post-Graduation Work Permit)",
    proofOfFunds: "1st-year tuition paid in full + CAD $20,635 mandatory GIC deposit",
    topUnis: ["University of Waterloo", "University of Windsor", "Concordia University", "York University"],
    keyRules: [
      "Study Permit expedited processing via Student Direct Stream (SDS) with upfront GIC",
      "Mandatory CAD $20,635 GIC deposit with Scotiabank/CIBC/ICICI Bank Canada",
      "Provincial Attestation Letter (PAL) quota checks integrated prior to visa submission"
    ]
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=1200&auto=format&fit=crop",
    visaSubclass: "§16b AufenthG Student Visa",
    intakes: "Winter (Oct) & Summer (April)",
    avgTuition: "€0 – €3,000 / yr at state universities",
    pswRights: "18-Month Jobseeker Permit (EU Blue Card Pathway)",
    proofOfFunds: "€11,208/yr mandatory Blocked Account (Expatrio / Fintiba)",
    topUnis: ["TU Munich (TUM)", "RWTH Aachen University", "TU Berlin", "University of Stuttgart"],
    keyRules: [
      "Zero tuition fees (€0–€3,000/yr) across world-ranked public technical universities",
      "Mandatory APS Certificate verification requirement by German Academic Evaluation Centre",
      "€11,208/yr blocked account setup verified via licensed providers (Expatrio/Fintiba)"
    ]
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
    visaSubclass: "Subclass 500 Student Visa",
    intakes: "Semester 1 (Feb) & Semester 2 (July)",
    avgTuition: "AUD 22,000 – 38,000 / yr",
    pswRights: "Subclass 485 Temporary Graduate Visa (2–4 yrs)",
    proofOfFunds: "1-Year tuition + AUD $29,710 living maintenance",
    topUnis: ["Monash University", "University of Melbourne", "University of Adelaide", "UNSW Sydney"],
    keyRules: [
      "Subclass 500 Student Visa with Subclass 485 Temporary Graduate rights (2–4 years)",
      "Mandatory AUD $29,710 living maintenance funds threshold (updated Home Affairs benchmark)",
      "Strict Genuine Student (GS) statement compliance detailing financial and career ROI"
    ]
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=1200&auto=format&fit=crop",
    visaSubclass: "Stamp 2 Student Visa",
    intakes: "Autumn (Sept) & Spring (Jan)",
    avgTuition: "€12,000 – €22,000 / yr",
    pswRights: "2-Year Stamp 1G Stay Back Third Level Graduate Scheme",
    proofOfFunds: "Tuition balance + €10,000 proof of funds",
    topUnis: ["Trinity College Dublin", "University College Dublin", "University of Galway", "Dublin City Univ."],
    keyRules: [
      "Stamp 2 Visa with 2-Year Stamp 1G Stay Back scheme (open work permit without sponsorship)",
      "Direct campus recruitment access to Silicon Docks European HQs (Google, Meta, Pfizer, Stripe)",
      "Mandatory €10,000 proof of liquid living maintenance funds before visa endorsement"
    ]
  }
];

const AUTO_SLIDE_DURATION_MS = 3500;
const TICK_INTERVAL_MS = 50;

export default function DestinationsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Drag / Touch physics state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % realisticDestinations.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? realisticDestinations.length - 1 : prev - 1
    );
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // 3.5s auto-slide loop with continuous linear progress bar
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (TICK_INTERVAL_MS / AUTO_SLIDE_DURATION_MS) * 100;
        if (prev + increment >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, nextSlide]);

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    currentXRef.current = e.touches[0].clientX;
    const deltaX = currentXRef.current - startXRef.current;
    // Bound the drag offset slightly
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);
    const deltaX = currentXRef.current - startXRef.current;
    const swipeThreshold = 50;

    if (deltaX < -swipeThreshold) {
      nextSlide();
    } else if (deltaX > swipeThreshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Pointer / Mouse drag physics
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with primary mouse button or touch
    if (e.button !== 0) return;
    setIsPaused(true);
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    currentXRef.current = e.clientX;
    const deltaX = currentXRef.current - startXRef.current;
    setDragOffset(deltaX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);
    const deltaX = currentXRef.current - startXRef.current;
    const swipeThreshold = 50;

    if (deltaX < -swipeThreshold) {
      nextSlide();
    } else if (deltaX > swipeThreshold) {
      prevSlide();
    }
    setDragOffset(0);
  };

  return (
    <section 
      id="destinations" 
      className="py-24 sm:py-32 bg-[#030712] relative overflow-hidden border-b border-white/[0.08] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!isDragging) setIsPaused(false);
      }}
    >
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Official Regulatory &amp; Immigration Benchmarks</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
              Study Destination Regulatory Index
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real-time legal comparison of visa subclasses, statutory living maintenance funds, and post-study work authorization rights.
            </p>
          </div>

          {/* Slider Controls & Numbered Index */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prevSlide}
              aria-label="Previous Destination"
              className="p-3.5 rounded-2xl border border-white/[0.08] bg-slate-900/80 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition active:scale-95 shadow-lg backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Numbered Index Pill */}
            <div className="px-4 py-2.5 rounded-2xl border border-white/[0.08] bg-slate-900/90 text-xs font-mono text-slate-300 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
              <span className="text-emerald-400 font-bold">0{currentIndex + 1}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">0{realisticDestinations.length}</span>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next Destination"
              className="p-3.5 rounded-2xl border border-white/[0.08] bg-slate-900/80 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-slate-800 transition active:scale-95 shadow-lg backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3.5s Linear Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800/60 h-1.5 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Carousel Window with Pointer & Touch Drag Physics */}
        <div 
          ref={containerRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: "pan-y" }}
        >
          <div 
            className={`flex ${isDragging ? "transition-none" : "transition-transform duration-500 ease-out"}`}
            style={{ 
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))` 
            }}
          >
            {realisticDestinations.map((dest) => (
              <div 
                key={dest.id}
                className="w-full shrink-0 px-1 sm:px-2"
              >
                <div className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300">
                  
                  {/* Card Photographic Banner */}
                  <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 border border-white/[0.08]">
                    <img 
                      src={dest.image} 
                      alt={`${dest.name} campus and skyline`}
                      className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent" />
                    
                    {/* Top overlay badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-white/15 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                          <span className="text-base" role="img" aria-label={dest.name}>{dest.flag}</span>
                          <span>{dest.name}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-300 bg-blue-950/80 border border-blue-500/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                          <FileText className="w-3 h-3 text-blue-400" />
                          {dest.visaSubclass}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 text-[11px] font-bold text-emerald-400 backdrop-blur-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Mandates
                      </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                          Study &amp; Work in {dest.name}
                        </h3>
                        <p className="text-xs text-slate-300 drop-shadow flex items-center gap-1.5 mt-1 font-medium">
                          <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                          Statutory Immigration &amp; Consular Regulations (2026/2027)
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-200 bg-slate-900/90 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md shadow-lg shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>Intakes: <strong className="text-white">{dest.intakes}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Intake Badge (Shown on small screens) */}
                  <div className="sm:hidden flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 border border-white/[0.08] px-3.5 py-2 rounded-xl mb-4 shadow-inner">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Intakes: <strong className="text-white">{dest.intakes}</strong></span>
                  </div>

                  {/* Financial & Work Rights Statutory Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/60 p-5 hover:border-white/[0.12] transition">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold uppercase tracking-wider text-[10px]">Average Annual Tuition</span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-white font-display">
                        {dest.avgTuition}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Varies across public vs private accredited faculties</p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/60 p-5 hover:border-white/[0.12] transition">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold uppercase tracking-wider text-[10px]">Post-Study Work Rights</span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-white font-display">
                        {dest.pswRights}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Full legal rights to seek employment post-graduation</p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/60 p-5 hover:border-white/[0.12] transition">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <span className="font-semibold uppercase tracking-wider text-[10px]">Consular Proof of Funds</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-200 leading-snug">
                        {dest.proofOfFunds}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Strict financial proof verified at embassy interview</p>
                    </div>
                  </div>

                  {/* Legal Immigration Rules & Direct Partner Universities */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Statutory Immigration &amp; Visa Regulations
                      </span>
                      <div className="space-y-3">
                        {dest.keyRules.map((rule, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-slate-950/60 border border-white/[0.06] p-3.5 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3.5 flex items-center gap-1.5 font-mono">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        Direct Accredited Partner Universities
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {dest.topUnis.map((uni, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-2.5 rounded-xl bg-slate-950/60 border border-white/[0.06] p-3 text-xs font-semibold text-slate-200 hover:border-blue-500/40 hover:text-white transition"
                          >
                            <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                            <span className="truncate">{uni}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-3">
                        <a
                          href="#eligibility"
                          className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all active:scale-[0.99]"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Calculate Your Acceptance Odds for {dest.name}
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Numbered Dot Selectors */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {realisticDestinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Jump to ${realisticDestinations[idx].name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-10 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                  : "w-2.5 bg-slate-800 hover:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
