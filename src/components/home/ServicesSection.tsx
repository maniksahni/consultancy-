"use client";

import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  Award, 
  Coins, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { CORE_SERVICES } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  FileText,
  ShieldCheck,
  Award,
  Coins,
  Home
};

export default function ServicesSection({ onOpenConsultation }: { onOpenConsultation?: () => void }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Full-Suite Overseas Mentorship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Comprehensive End-to-End Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From university shortlisting and non-collateral loan sanctioning to visa filing and verified student accommodation near campus.
          </p>
        </div>

        {/* 6-Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CORE_SERVICES.map((srv) => {
            const Icon = iconMap[srv.icon] || GraduationCap;
            return (
              <div
                key={srv.id}
                className="bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:scale-110 transition-all shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    {srv.badge && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {srv.title}
                    </h3>
                    <div className="text-xs font-medium text-emerald-400/90 mt-0.5">
                      {srv.tagline}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {srv.metrics}
                  </span>

                  <button
                    onClick={onOpenConsultation}
                    className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1 hover:underline"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
