"use client";

import React from 'react';
import { X, CheckCircle2, Award, ArrowRight, ShieldCheck, Sparkles, Building2, Calendar, FileDown, PhoneCall } from 'lucide-react';
import { EligibilityFormData, EligibilityResult } from '@/lib/types';

interface EligibilityResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: EligibilityResult | null;
  formData: EligibilityFormData | null;
  onOpenConsultation: () => void;
}

export default function EligibilityResultModal({
  isOpen,
  onClose,
  result,
  formData,
  onOpenConsultation
}: EligibilityResultModalProps) {
  if (!isOpen || !result || !formData) return null;

  const handleDownloadReport = () => {
    alert(`Generating personalized Study Abroad & Visa Readiness Report for ${formData.fullName} (${formData.targetCountry}). Downloading assessment profile...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 border-b border-emerald-500/20 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Profile Evaluation & Strategic Match</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Eligibility Report: {formData.fullName}
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                Target: <span className="text-emerald-400 font-semibold">{formData.targetCountry}</span> • Intake: <span className="text-white font-medium">{formData.targetIntake}</span> • Education: <span className="text-white font-medium">{formData.educationLevel}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/70 border border-emerald-500/40 rounded-xl px-4 py-2.5">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Visa Probability</div>
                <div className="text-2xl font-black text-emerald-400">{result.visaSuccessProbability}%</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Profile Tier</div>
                <div className="text-sm font-bold text-teal-300">{result.ratingTier}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Advantages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Estimated Scholarship Potential</div>
                <div className="text-sm font-bold text-amber-300">{result.estimatedScholarship}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-slate-400 font-medium">Post-Study Work Authorization (PSW)</div>
                <div className="text-sm font-bold text-emerald-300">{result.pswEligibility}</div>
              </div>
            </div>
          </div>

          {/* Matched Universities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                Tailored University Shortlist (3-Tier Strategy)
              </h4>
              <span className="text-[11px] text-slate-400">Based on your GPA & English test score</span>
            </div>

            <div className="space-y-2.5">
              {result.matchedUniversities.map((uni, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      uni.matchType === 'Ambitious' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      uni.matchType === 'Target' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {uni.matchType[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{uni.name}</div>
                      <div className="text-xs text-slate-400">
                        {uni.country} • Avg Tuition: <span className="text-slate-200">{uni.avgTuition}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${
                      uni.matchType === 'Ambitious' ? 'bg-amber-500/10 text-amber-400' :
                      uni.matchType === 'Target' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {uni.matchType} Match ({uni.chance}% Admits)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Strategic Next Steps */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Next Strategic Recommendations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 md:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownloadReport}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
          >
            <FileDown className="w-4 h-4" />
            Download PDF Report
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Claim Free 1-on-1 Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
