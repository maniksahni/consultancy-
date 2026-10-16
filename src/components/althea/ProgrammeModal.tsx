"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2, Building2, MapPin, Calendar, Clock, Award, Euro, Briefcase, GraduationCap, ArrowRight, ShieldCheck, Check } from "lucide-react";
import type { FranceDetailedProgramme } from "@/data/franceComprehensiveData";

interface ProgrammeModalProps {
  programme: FranceDetailedProgramme | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (programme: FranceDetailedProgramme) => void;
}

export default function ProgrammeModal({ programme, isOpen, onClose, onApply }: ProgrammeModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "eligibility" | "careers">("overview");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !programme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a1832]/80 backdrop-blur-sm animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="modal-programme-title">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] bg-[#FCFAF6] border border-[#173969]/20 shadow-2xl overflow-hidden rounded-none">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 sm:p-8 bg-[#142E61] text-white border-b border-white/10">
          <div className="pr-6">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E5C99D]">
              <span>{programme.institution}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {programme.city}</span>
              <span>·</span>
              <span className="bg-[#E5C99D]/20 text-[#E5C99D] px-2 py-0.5">{programme.credits}</span>
            </div>
            <h2 id="modal-programme-title" className="mt-3 font-display text-2xl sm:text-4xl text-white leading-tight">
              {programme.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/75">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#E5C99D]" /> {programme.duration}</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-[#E5C99D]" /> {programme.level} Degree</span>
              <span className="flex items-center gap-1.5"><Euro size={14} className="text-[#E5C99D]" /> {programme.tuitionNonEU}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close programme dossier"
            className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#173969]/15 bg-[#F2EDE5] px-6 text-xs font-semibold uppercase tracking-wider overflow-x-auto">
          {[
            { id: "overview", label: "Program Overview" },
            { id: "curriculum", label: "Modules & Syllabus" },
            { id: "eligibility", label: "Eligibility & Intakes" },
            { id: "careers", label: "Careers & Salaries" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3.5 px-4 whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[#173969] text-[#173969] bg-white font-bold"
                  : "border-transparent text-[#62738c] hover:text-[#173969]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-[#153260]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Institutional Profile</h3>
                <p className="mt-3 text-base leading-relaxed text-[#4d5e75]">{programme.overview}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="border border-[#173969]/15 bg-white p-5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7D4C]">Tuition & Fee Structure</span>
                  <div className="mt-2 space-y-2 text-sm text-[#3b4c63]">
                    <p><strong className="text-[#153260]">EU / EEA Rate:</strong> {programme.tuitionEU}</p>
                    <p><strong className="text-[#153260]">International Rate:</strong> {programme.tuitionNonEU}</p>
                    <p className="text-xs text-[#708197] pt-1">Partial waivers & Eiffel scholarships available for eligible applicants.</p>
                  </div>
                </div>

                <div className="border border-[#173969]/15 bg-white p-5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7D4C]">Campus & Living Cost</span>
                  <div className="mt-2 space-y-2 text-sm text-[#3b4c63]">
                    <p><strong className="text-[#153260]">Monthly Living:</strong> {programme.campusLife.monthlyLivingCost}</p>
                    <p><strong className="text-[#153260]">Housing:</strong> {programme.campusLife.housingAvailability}</p>
                    <p><strong className="text-[#153260]">Location:</strong> {programme.campusLife.campusLocation}</p>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-[#173969] bg-[#F3EFE7] p-5">
                <h4 className="font-display text-xl text-[#142E61]">Language of Instruction</h4>
                <p className="mt-1 text-sm text-[#54657d]">{programme.language}. No mandatory French proficiency certificate is required for admission, although beginner French workshops are offered tuition-free on campus.</p>
              </div>
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Core Modules & Specializations</h3>
              <p className="text-sm text-[#5a6c84]">Structured around European Credit Transfer System (ECTS) standards, blending classroom seminars with hands-on industrial laboratory projects:</p>
              <div className="grid gap-3 pt-2">
                {programme.curriculum.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-[#173969]/15">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#173969] text-[11px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-[#1c3866]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "eligibility" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Admission Prerequisites</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="p-4 bg-white border border-[#173969]/15">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7145]">Prior Degree</span>
                    <p className="mt-1 text-sm font-semibold text-[#153260]">{programme.eligibility.degreeRequired}</p>
                  </div>
                  <div className="p-4 bg-white border border-[#173969]/15">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7145]">Academic Merit</span>
                    <p className="mt-1 text-sm font-semibold text-[#153260]">{programme.eligibility.minGpa}</p>
                  </div>
                  <div className="p-4 bg-white border border-[#173969]/15">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7145]">English Certification</span>
                    <p className="mt-1 text-sm font-semibold text-[#153260]">{programme.eligibility.englishTest}</p>
                  </div>
                  <div className="p-4 bg-white border border-[#173969]/15">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7145]">Standardized Tests</span>
                    <p className="mt-1 text-sm font-semibold text-[#153260]">{programme.eligibility.greGmat}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Application Intakes & Deadlines</h3>
                <div className="mt-3 divide-y divide-[#173969]/15 border border-[#173969]/15 bg-white">
                  {programme.deadlines.map((dl, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4">
                      <span className="text-sm font-medium text-[#153260]">{dl.round}</span>
                      <span className="text-xs font-bold text-[#A88C64] uppercase tracking-wider">{dl.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "careers" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-6 bg-[#173969] text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C99D]">Average Graduate Salary</span>
                  <p className="mt-2 font-display text-3xl sm:text-4xl text-white">{programme.careerOutcomes.avgSalary}</p>
                  <p className="mt-2 text-xs text-white/70">Based on verified French graduate placement surveys.</p>
                </div>
                <div className="p-6 bg-[#E5C99D] text-[#142E61]">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A7145]">Employment Rate</span>
                  <p className="mt-2 font-display text-3xl sm:text-4xl">{programme.careerOutcomes.employmentRate}</p>
                  <p className="mt-2 text-xs text-[#142E61]/70">With 2-Year Post-Study Work Visa (APS) privileges in France.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Top Recruiting Employers in France</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {programme.careerOutcomes.topEmployers.map((emp, i) => (
                    <span key={i} className="border border-[#173969]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#18396c]">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Typical Placement Roles</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {programme.careerOutcomes.typicalRoles.map((role, i) => (
                    <span key={i} className="bg-[#EDE6D8] px-3.5 py-1.5 text-xs text-[#153260]">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 bg-[#F2EDE5] border-t border-[#173969]/15">
          <div className="text-xs text-[#5f6f87] text-center sm:text-left">
            <span className="font-semibold text-[#173969]">Althéa Advisory:</span> Direct admissions coaching, statement of purpose, and interview prep.
          </div>
          <div className="flex w-full sm:w-auto items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none border border-[#173969]/30 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#173969] hover:bg-white"
            >
              Back to Catalog
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(programme);
                onClose();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#173969] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#28528f] transition-colors"
            >
              Apply via Althéa <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
