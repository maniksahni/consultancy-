"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Coins, 
  Briefcase, 
  ArrowRight, 
  Building2, 
  Info 
} from "lucide-react";

interface DestinationCost {
  currency: string;
  currencySymbol: string;
  inrMultiplier: number;
  bachelors: {
    tuitionMin: number;
    tuitionMax: number;
    livingCost: number;
    partTimePotential: number;
  };
  masters: {
    tuitionMin: number;
    tuitionMax: number;
    livingCost: number;
    partTimePotential: number;
  };
  highlights: string;
}

const costData: Record<string, DestinationCost> = {
  "United Kingdom": {
    currency: "GBP (£)",
    currencySymbol: "£",
    inrMultiplier: 106,
    bachelors: { tuitionMin: 14000, tuitionMax: 24000, livingCost: 11000, partTimePotential: 9500 },
    masters: { tuitionMin: 13000, tuitionMax: 22000, livingCost: 10000, partTimePotential: 9500 },
    highlights: "1-Year Masters saves a full year of living expenses.",
  },
  "United States": {
    currency: "USD ($)",
    currencySymbol: "$",
    inrMultiplier: 84,
    bachelors: { tuitionMin: 22000, tuitionMax: 42000, livingCost: 14000, partTimePotential: 11000 },
    masters: { tuitionMin: 20000, tuitionMax: 38000, livingCost: 13000, partTimePotential: 11000 },
    highlights: "STEM extension allows 3 years of post-study earning potential.",
  },
  Canada: {
    currency: "CAD ($)",
    currencySymbol: "CAD $",
    inrMultiplier: 62,
    bachelors: { tuitionMin: 16000, tuitionMax: 28000, livingCost: 12000, partTimePotential: 10500 },
    masters: { tuitionMin: 15000, tuitionMax: 25000, livingCost: 11500, partTimePotential: 10500 },
    highlights: "Direct SDS fast-track visa processing with GIC proof.",
  },
  Australia: {
    currency: "AUD ($)",
    currencySymbol: "AUD $",
    inrMultiplier: 56,
    bachelors: { tuitionMin: 22000, tuitionMax: 38000, livingCost: 15000, partTimePotential: 13500 },
    masters: { tuitionMin: 20000, tuitionMax: 35000, livingCost: 14000, partTimePotential: 13500 },
    highlights: "Highest minimum student wage ($24.10/hr) offsets living costs.",
  },
  Germany: {
    currency: "EUR (€)",
    currencySymbol: "€",
    inrMultiplier: 92,
    bachelors: { tuitionMin: 0, tuitionMax: 3000, livingCost: 11208, partTimePotential: 9000 },
    masters: { tuitionMin: 0, tuitionMax: 2500, livingCost: 11208, partTimePotential: 9500 },
    highlights: "Zero/Low tuition at world-class state universities.",
  },
  Ireland: {
    currency: "EUR (€)",
    currencySymbol: "€",
    inrMultiplier: 92,
    bachelors: { tuitionMin: 12000, tuitionMax: 22000, livingCost: 11000, partTimePotential: 9500 },
    masters: { tuitionMin: 11000, tuitionMax: 21000, livingCost: 10500, partTimePotential: 9500 },
    highlights: "European tech hub with 2-year Stamp 1G post-study work.",
  },
};

export default function CostEstimator() {
  const [selectedCountry, setSelectedCountry] = useState<string>("United Kingdom");
  const [degreeLevel, setDegreeLevel] = useState<"bachelors" | "masters">("masters");

  const current = costData[selectedCountry];
  const degreeCost = current[degreeLevel];
  const avgTuition = Math.round((degreeCost.tuitionMin + degreeCost.tuitionMax) / 2);
  const totalAnnualCost = avgTuition + degreeCost.livingCost;
  const netCostAfterPartTime = Math.max(0, totalAnnualCost - degreeCost.partTimePotential);

  const totalInr = Math.round((totalAnnualCost * current.inrMultiplier) / 100000);
  const netInr = Math.round((netCostAfterPartTime * current.inrMultiplier) / 100000);

  const tuitionPct = Math.round((avgTuition / totalAnnualCost) * 100) || 10;
  const livingPct = 100 - tuitionPct;

  return (
    <section id="cost-estimator" className="py-24 sm:py-32 bg-[#030712] border-b border-white/[0.08] text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Calculator className="h-4 w-4" /> Transparent Budget Planning
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Interactive Study Abroad Cost Estimator
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Calculate your estimated annual tuition, mandatory living expenses, and part-time earnings potential in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
                1. Select Study Destination
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {Object.keys(costData).map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => setSelectedCountry(country)}
                    className={`rounded-xl border p-3 text-xs font-bold transition-all text-center ${
                      selectedCountry === country
                        ? "border-blue-500 bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                        : "border-white/[0.08] bg-slate-950/70 text-slate-300 hover:border-white/20 hover:bg-slate-900"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
                2. Select Degree Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDegreeLevel("masters")}
                  className={`rounded-xl border p-3 text-xs font-bold transition-all text-center ${
                    degreeLevel === "masters"
                      ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "border-white/[0.08] bg-slate-950/70 text-slate-300 hover:border-white/20 hover:bg-slate-900"
                  }`}
                >
                  Postgraduate / Masters
                </button>
                <button
                  type="button"
                  onClick={() => setDegreeLevel("bachelors")}
                  className={`rounded-xl border p-3 text-xs font-bold transition-all text-center ${
                    degreeLevel === "bachelors"
                      ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "border-white/[0.08] bg-slate-950/70 text-slate-300 hover:border-white/20 hover:bg-slate-900"
                  }`}
                >
                  Undergraduate / Bachelors
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-white/[0.06] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span>Destination Insight</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {current.highlights}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <span className="text-xs text-slate-400 font-medium">Estimated Annual Total</span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-0.5 font-display tracking-tight">
                  {current.currencySymbol} {totalAnnualCost.toLocaleString()}{" "}
                  <span className="text-sm font-semibold text-slate-400">/ yr</span>
                </div>
              </div>
              <div className="rounded-2xl bg-blue-500/10 border border-blue-500/25 px-4 py-2.5 text-right shadow-inner">
                <span className="text-[10px] uppercase font-bold text-blue-400 block font-mono">Approx. INR Equivalent</span>
                <span className="text-xl font-bold text-blue-300">₹{totalInr} Lakhs / year</span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-950/80 border border-white/[0.06] p-5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span>Annual Tuition Fee</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white font-display">
                  {avgTuition === 0 ? "€0 (Tuition-Free)" : `${current.currencySymbol} ${avgTuition.toLocaleString()}`}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Range: {current.currencySymbol}{degreeCost.tuitionMin.toLocaleString()} - {current.currencySymbol}{degreeCost.tuitionMax.toLocaleString()}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-950/80 border border-white/[0.06] p-5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Coins className="h-4 w-4 text-emerald-400" />
                  <span>Living & Accommodation</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white font-display">
                  {current.currencySymbol} {degreeCost.livingCost.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Food, accommodation, insurance & travel
                </span>
              </div>
            </div>

            {/* Progress Breakdown */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Tuition ({tuitionPct}%)</span>
                <span>Living Expenses ({livingPct}%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-800/80 overflow-hidden flex">
                <div style={{ width: `${tuitionPct}%` }} className="bg-blue-600 h-full" />
                <div style={{ width: `${livingPct}%` }} className="bg-emerald-500 h-full" />
              </div>
            </div>

            {/* Part Time Offset */}
            <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/25 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Briefcase className="h-4 w-4" />
                  <span>Part-Time Work Potential (20 hrs/week)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Earn up to <strong className="text-white">{current.currencySymbol}{degreeCost.partTimePotential.toLocaleString()}</strong> / year to recover living costs.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 sm:text-right whitespace-nowrap">
                Net Out-of-Pocket: ~₹{netInr}L
              </div>
            </div>

            {/* Assessment CTA */}
            <div className="pt-2">
              <a
                href="#eligibility"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Get Free University Shortlist &amp; Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
