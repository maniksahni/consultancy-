"use client";

import React from "react";
import { Clock, ShieldAlert } from "lucide-react";

const realConsularAlerts = [
  "US Embassy Mumbai/Delhi F-1 interview slot batches releasing for Fall",
  "German APS turnaround time currently 25 business days — apply early",
  "UK CAS priority issuance active — fast-track 5-day turnaround available",
  "Canada Study Permit PAL quota checks active • CAD $20,635 mandatory GIC deposit",
  "Australia Subclass 500 Genuine Student (GS) statement compliance enforced",
  "Ireland Stamp 2 visa processing turnaround: 5–7 business days via Dublin/Cork",
];

// Double array for continuous seamless loop
const tickerLoop = [...realConsularAlerts, ...realConsularAlerts];

export default function IntakeTicker() {
  return (
    <div className="sticky top-[64px] z-40 bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.08] py-2.5 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        {/* Sticky Label */}
        <div className="flex-shrink-0 flex items-center gap-2 pl-4 pr-5 border-r border-white/[0.08] mr-3 z-20 bg-[#030712]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold text-emerald-400 whitespace-nowrap uppercase tracking-wider font-mono">
            Consular Intelligence
          </span>
        </div>

        {/* Animated Marquee Strip */}
        <div className="animate-ticker flex items-center whitespace-nowrap">
          {tickerLoop.map((alertText, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap pr-12 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] flex-shrink-0" />
              <span>{alertText}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
