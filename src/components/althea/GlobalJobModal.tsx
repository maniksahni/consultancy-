"use client";

import { useEffect } from "react";
import { X, Briefcase, MapPin, Euro, ShieldCheck, CheckCircle2, Clock, Building, ArrowRight, Globe } from "lucide-react";
import type { GlobalJob } from "@/data/globalJobsData";
import { countriesWorkRegistry } from "@/data/globalJobsData";

interface GlobalJobModalProps {
  job: GlobalJob | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: GlobalJob) => void;
}

export default function GlobalJobModal({ job, isOpen, onClose, onApply }: GlobalJobModalProps) {
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

  if (!isOpen || !job) return null;

  const countryInfo = countriesWorkRegistry[job.country];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a1832]/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-global-job-title"
    >
      <div className="relative flex flex-col w-full max-w-3xl max-h-[92vh] bg-[#FCFAF6] border border-[#173969]/20 shadow-2xl overflow-hidden rounded-none">
        
        {/* Header Bar */}
        <div className="p-6 sm:p-8 bg-[#142E61] text-white border-b border-white/10 flex items-start justify-between">
          <div className="pr-6">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E5C99D]">
              <span className="text-base leading-none">{job.countryFlag}</span>
              <span>{job.countryName}</span>
              <span>·</span>
              <span>{job.company}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {job.city}</span>
              <span>·</span>
              <span className="bg-[#E5C99D]/20 text-[#E5C99D] px-2 py-0.5">{job.field}</span>
            </div>
            <h2 id="modal-global-job-title" className="mt-3 font-display text-2xl sm:text-3xl text-white leading-tight">
              {job.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/75">
              <span className="flex items-center gap-1.5 font-semibold text-[#E5C99D]">
                <Briefcase size={14} /> {job.contractType}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-white">
                {job.compensation}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close job details"
            className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-[#153260] space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Role Overview</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4d5e75]">{job.description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-[#173969]/15 bg-white p-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7D4C]">
                Compensation & Benefits
              </span>
              <p className="mt-1 text-sm font-semibold text-[#153260]">{job.compensation}</p>
              <p className="mt-1 text-xs text-[#6e7e94]">{job.legalBasis}</p>
            </div>
            <div className="border border-[#173969]/15 bg-white p-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7D4C]">
                Language Requirements
              </span>
              <p className="mt-1 text-sm font-semibold text-[#153260]">{job.languageRequired}</p>
              <p className="mt-1 text-xs text-[#6e7e94]">All internal technical work conducted in English.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Key Responsibilities</h3>
            <div className="mt-3 space-y-2">
              {job.responsibilities.map((r, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3b4c63]">
                  <CheckCircle2 size={16} className="text-[#173969] shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Candidate Profile & Skills</h3>
            <div className="mt-3 space-y-2">
              {job.qualifications.map((q, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3b4c63]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#A88C64] shrink-0 mt-2" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* National Legal Framework & Post-Study Work Visa */}
          <div className="border-l-2 border-[#173969] bg-[#F3EFE7] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#142E61]">
              <ShieldCheck size={16} /> {job.countryFlag} {job.countryName} Visa & Legal Work Regulations
            </div>
            <p className="text-xs text-[#54657d] leading-relaxed">
              <strong className="text-[#142E61]">Visa Eligibility:</strong> {job.visaEligibility}
            </p>
            {countryInfo && (
              <div className="grid gap-2 pt-2 border-t border-[#173969]/10 text-xs text-[#5b6c84]">
                <p>
                  <strong className="text-[#142E61]">Official Stay-Back Visa:</strong> {countryInfo.postStudyVisaName} ({countryInfo.postStudyDuration})
                </p>
                <p>
                  <strong className="text-[#142E61]">Tax & Social Insurance ID:</strong> {countryInfo.taxNumberName}
                </p>
                <p>
                  <strong className="text-[#142E61]">Public Employment Authority:</strong> {countryInfo.employmentAgencyName} — {countryInfo.employmentAgencyRole}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 bg-[#F2EDE5] border-t border-[#173969]/15">
          <div className="text-xs text-[#5f6f87] text-center sm:text-left">
            <span className="font-semibold text-[#173969]">Althéa Global Advisory:</span> CV adaptation, work visa guidance, and mock interviews for {job.countryName}.
          </div>
          <div className="flex w-full sm:w-auto items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none border border-[#173969]/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#173969] hover:bg-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(job);
                onClose();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#173969] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#28528f] transition-colors"
            >
              Apply with Althéa Support <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
