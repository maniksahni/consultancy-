"use client";

import React from "react";
import { 
  X, 
  Check, 
  ShieldCheck, 
  Scale
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
    <section id="comparison" className="relative py-20 sm:py-28 overflow-hidden bg-[#0A0E17] border-t border-b border-white/[0.08] w-full max-w-full">
      {/* Subtle warm ambient highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A880]/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.06] px-4 py-1.5 text-[11px] font-medium tracking-widest text-[#E5D3B3] uppercase mb-5">
            <Scale className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>The Mentorship Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-100 tracking-tight font-serif">
            Why Choose Dedicated{" "}
            <span className="italic text-[#C5A880]">
              1-on-1 Mentorship
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
            The study-abroad industry is dominated by mass-processing factories that treat students as recruitment volumes. Here is how Pathways Global differs fundamentally.
          </p>
        </div>

        {/* Desktop View: Editorial Ledger Comparison */}
        <div className="hidden md:block rounded-2xl border border-white/[0.1] bg-[#0E131F]/90 backdrop-blur-md shadow-2xl overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-white/[0.08] bg-black/30">
                  <th className="py-5 px-6 text-[11px] font-semibold text-stone-400 uppercase tracking-widest w-1/4">
                    Evaluation Factor
                  </th>
                  <th className="py-5 px-6 text-[11px] font-semibold text-rose-300/80 uppercase tracking-widest w-[37.5%] border-l border-r border-white/[0.06] bg-rose-950/[0.1]">
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full border border-rose-500/30 bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs">✕</span>
                      Mass Processing Agencies
                    </span>
                  </th>
                  <th className="py-5 px-6 text-[11px] font-semibold text-[#E5D3B3] uppercase tracking-widest w-[37.5%] border-l border-r border-[#C5A880]/30 bg-[#C5A880]/[0.08]">
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/20 flex items-center justify-center text-[#E5D3B3] text-xs">✓</span>
                      Pathways Global 1-on-1 Mentorship
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-6 text-xs sm:text-sm font-medium text-stone-200">
                      {item.factor}
                    </td>
                    <td className="py-5 px-6 text-xs sm:text-sm text-stone-400 border-l border-r border-white/[0.06] bg-rose-950/[0.03]">
                      <div className="flex items-start gap-3">
                        <X className="h-4 w-4 text-rose-400/80 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-light">{item.agency}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-xs sm:text-sm text-stone-200 border-l border-r border-[#C5A880]/30 bg-[#C5A880]/[0.03]">
                      <div className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-[#C5A880] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-relaxed font-medium text-[#F2EAE0]">{item.pathways}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Transparency Footnote */}
          <div className="px-6 py-5 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <ShieldCheck className="h-4 w-4 text-[#C5A880] flex-shrink-0" />
              <span className="tracking-wide">Zero Institutional Kickbacks &bull; 100% Student-Aligned Interests</span>
            </div>
            <a href="#booking" className="text-[#E5D3B3] hover:text-white font-medium tracking-wide transition-colors flex items-center gap-1.5 group">
              <span>Schedule Your Free Discovery Call</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Mobile View: Stacked Ledger Dossiers (Zero Overflow Guarantee) */}
        <div className="block md:hidden space-y-4 w-full">
          {comparisonItems.map((item, idx) => (
            <div 
              key={idx} 
              className="rounded-xl border border-white/[0.08] bg-[#0E131F] p-4 space-y-3 shadow-lg"
            >
              <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider border-b border-white/[0.06] pb-2 font-serif">
                {item.factor}
              </h4>
              
              {/* Pathways Global Column (Priority) */}
              <div className="rounded-lg border border-[#C5A880]/30 bg-[#C5A880]/[0.06] p-3.5 space-y-1.5">
                <div className="flex items-center gap-2 text-[#E5D3B3] text-xs font-semibold">
                  <Check className="h-3.5 w-3.5 text-[#C5A880] stroke-[2.5]" />
                  <span>Pathways Global 1-on-1</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-light pl-5.5">
                  {item.pathways}
                </p>
              </div>

              {/* Mass Agencies Column */}
              <div className="rounded-lg border border-white/[0.06] bg-black/40 p-3.5 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-300/80 text-xs font-semibold">
                  <X className="h-3.5 w-3.5 text-rose-400" />
                  <span>Mass Processing Agencies</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-light pl-5.5">
                  {item.agency}
                </p>
              </div>
            </div>
          ))}

          {/* Mobile Bottom Note */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0E131F] p-4 text-center space-y-2.5">
            <div className="flex items-center justify-center gap-2 text-xs text-[#C5A880] font-medium">
              <ShieldCheck className="h-4 w-4 text-[#C5A880] flex-shrink-0" />
              <span>Zero Institutional Kickbacks</span>
            </div>
            <a href="#booking" className="block text-xs text-[#E5D3B3] font-semibold hover:underline">
              Schedule Your Free Discovery Call &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
