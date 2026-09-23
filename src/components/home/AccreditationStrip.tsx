"use client";

import React from "react";
import { ShieldCheck, Award, Globe, CheckCircle2 } from "lucide-react";

const badges = [
  {
    id: "icef",
    name: "ICEF Agency Verification",
    sub: "International Certified Education Facilitator (#4921)",
    icon: ShieldCheck,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/25",
    dot: "bg-blue-400",
  },
  {
    id: "bc",
    name: "British Council Certified Education Agents",
    sub: "UK Partner Network Certified Advisor",
    icon: Award,
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/25",
    dot: "bg-rose-400",
  },
  {
    id: "qeac",
    name: "Qualified Education Agent Counselors (QEAC)",
    sub: "Licensed Australian Qualified Agent (#M104)",
    icon: Award,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/25",
    dot: "bg-emerald-400",
  },
  {
    id: "airc",
    name: "AIRC Member Verification",
    sub: "American International Recruitment Council",
    icon: ShieldCheck,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/25",
    dot: "bg-violet-400",
  },
];

export default function AccreditationStrip() {
  return (
    <div className="bg-[#030712] border-b border-white/[0.08] py-4 px-4 relative z-30">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Label */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
              Official Regulatory Licensing &amp; Accreditations
            </p>
          </div>

          {/* Badge row */}
          <div className="flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`flex-shrink-0 flex items-center gap-2.5 rounded-xl border ${badge.bg} px-3.5 py-2 group cursor-default shadow-sm bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-colors`}
                  title={badge.sub}
                >
                  <div className="relative">
                    <Icon className={`h-4 w-4 ${badge.color}`} />
                    <span className={`absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-bold ${badge.color} whitespace-nowrap`}>
                      {badge.name}
                    </p>
                    <p className="text-[9px] text-slate-400 whitespace-nowrap hidden sm:block">
                      {badge.sub}
                    </p>
                  </div>
                  {/* Verified checkmark */}
                  <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 flex-shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  </div>
                </div>
              );
            })}

            {/* Total students stat pill */}
            <div className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2 shadow-sm backdrop-blur-md">
              <span className="text-emerald-400 font-extrabold text-xs">5,000+</span>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">Visas Granted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
