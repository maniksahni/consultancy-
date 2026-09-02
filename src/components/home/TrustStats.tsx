"use client";

import React from 'react';
import { Users, ShieldCheck, Building2, Award, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { ACCREDITATIONS } from '@/data/mockData';

export default function TrustStats() {
  const stats = [
    {
      value: "5,000+",
      label: "Students Successfully Placed",
      subtext: "Across 24 global destinations",
      icon: Users,
      gradient: "from-blue-400 to-indigo-400"
    },
    {
      value: "98.4%",
      label: "First-Attempt Visa Grant Rate",
      subtext: "Ex-consulate officer audited files",
      icon: ShieldCheck,
      gradient: "from-emerald-400 to-teal-400"
    },
    {
      value: "300+",
      label: "Direct Partner Universities",
      subtext: "Fast-track admits & fee waivers",
      icon: Building2,
      gradient: "from-indigo-400 to-purple-400"
    },
    {
      value: "100% Free",
      label: "Initial Profile Strategy",
      subtext: "$0 hidden fee guarantee",
      icon: Award,
      gradient: "from-amber-400 to-yellow-400"
    }
  ];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 4-Column Stats Box */}
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="relative p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-emerald-400 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                    Verified
                  </span>
                </div>

                <div>
                  <div className={`text-3xl sm:text-4xl font-black tracking-tight font-display bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recognition & Compliance Badges Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center lg:text-left">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>International Accreditation & Compliance Badges:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              {ACCREDITATIONS.map((acc, i) => (
                <div 
                  key={i} 
                  className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-2 text-xs text-slate-300 hover:border-emerald-500/30 transition-colors"
                  title={acc.badge}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-[11px] truncate">{acc.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
