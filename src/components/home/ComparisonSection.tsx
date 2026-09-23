"use client";

import React from "react";
import { 
  XCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Compass
} from "lucide-react";

export default function ComparisonSection() {
  const comparisonItems = [
    {
      factor: "Admissions Counselor Assigned",
      agency: "Passed between unvetted telecallers, junior interns, and rotating sales reps",
      pathways: "Single dedicated Senior Mentor who personally manages your entire journey",
    },
    {
      factor: "University Recommendations",
      agency: "Pushing partner colleges that pay high recruiter commissions (kickbacks)",
      pathways: "100% unbiased shortlisting based strictly on your academic ROI & career goals",
    },
    {
      factor: "SOP & LOR Editorial Quality",
      agency: "Generic templates & copied ChatGPT drafts flagged by university AI screeners",
      pathways: "Line-by-line narrative crafting highlighting your unique accomplishments & grit",
    },
    {
      factor: "Consular Visa Preparation",
      agency: "A 10-minute generic PDF checklist right before your appointment",
      pathways: "Rigorous 1-on-1 mock consular grilling until your responses are confident & bulletproof",
    },
    {
      factor: "Communication & Accountability",
      agency: "Bureaucratic ticketing systems, slow replies, and ghosting post-payment",
      pathways: "Direct WhatsApp line, scheduled strategy calls, and proactive weekly check-ins",
    },
  ];

  return (
    <section id="comparison" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-slate-950/40 border-t border-b border-slate-800/80 w-full max-w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>The Mentorship Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Why Choose Dedicated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              1-on-1 Mentorship
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
            The study-abroad industry is dominated by mass-processing factories that treat students as recruitment volumes. Here is how Pathways Global differs fundamentally.
          </p>
        </div>

        {/* Desktop View: Linear Style Table */}
        <div className="hidden md:block rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">
                    Evaluation Factor
                  </th>
                  <th className="py-4 px-5 text-xs font-bold text-rose-400 uppercase tracking-wider w-[37.5%] bg-rose-950/20 rounded-t-xl border-l border-r border-rose-900/30">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 text-rose-400" />
                      Mass Processing Agencies
                    </span>
                  </th>
                  <th className="py-4 px-5 text-xs font-bold text-emerald-400 uppercase tracking-wider w-[37.5%] bg-emerald-950/20 rounded-t-xl border-l border-r border-emerald-900/30">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Pathways Global 1-on-1 Mentorship
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-4 text-xs sm:text-sm font-semibold text-slate-200">
                      {item.factor}
                    </td>
                    <td className="py-4 px-5 text-xs sm:text-sm text-slate-400 bg-rose-950/10 border-l border-r border-rose-900/20">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item.agency}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs sm:text-sm text-emerald-200 font-medium bg-emerald-950/15 border-l border-r border-emerald-900/20">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item.pathways}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Transparency Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Zero Institutional Kickbacks &bull; 100% Student-Aligned Interests</span>
            </div>
            <a href="#booking" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Schedule Your Free Discovery Call &rarr;
            </a>
          </div>
        </div>

        {/* Mobile View: Stacked Comparison Cards (Zero Overflow Guarantee) */}
        <div className="block md:hidden space-y-4 w-full">
          {comparisonItems.map((item, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-xl space-y-3"
            >
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800/60 pb-2">
                {item.factor}
              </h4>
              
              {/* Pathways Global Column (Priority) */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Pathways Global 1-on-1</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {item.pathways}
                </p>
              </div>

              {/* Mass Agencies Column */}
              <div className="rounded-xl border border-rose-900/30 bg-rose-950/15 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                  <XCircle className="h-3.5 w-3.5 text-rose-400" />
                  <span>Mass Processing Agencies</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.agency}
                </p>
              </div>
            </div>
          ))}

          {/* Mobile Bottom Note */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>Zero Institutional Kickbacks</span>
            </div>
            <a href="#booking" className="block text-xs text-blue-400 font-bold hover:underline">
              Schedule Your Free Discovery Call &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
