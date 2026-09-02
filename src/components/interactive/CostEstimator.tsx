"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  DollarSign, 
  Coins, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  TrendingDown, 
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

  // INR conversions
  const totalInr = Math.round((totalAnnualCost * current.inrMultiplier) / 100000);
  const netInr = Math.round((netCostAfterPartTime * current.inrMultiplier) / 100000);

  // Percentage breakdown
  const tuitionPct = Math.round((avgTuition / totalAnnualCost) * 100) || 10;
  const livingPct = 100 - tuitionPct;

  return (
    <section id="cost-estimator" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Calculator className="h-4 w-4" /> Transparent Budget Planning
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Interactive Study Abroad Cost Estimator
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Calculate your estimated annual tuition, mandatory living expenses, and part-time earnings potential in seconds.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
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
                        ? "border-blue-500 bg-blue-600 text-white shadow-md"
                        : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                2. Select Degree Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDegreeLevel("masters")}
                  className={`rounded-xl border p-3 text-xs font-bold transition-all text-center ${
                    degreeLevel === "masters"
                      ? "border-emerald-500 bg-emerald-600/20 text-emerald-300 shadow-sm"
                      : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  Postgraduate / Masters
                </button>
                <button
                  type="button"
                  onClick={() => setDegreeLevel("bachelors")}
                  className={`rounded-xl border p-3 text-xs font-bold transition-all text-center ${
                    degreeLevel === "bachelors"
                      ? "border-emerald-500 bg-emerald-600/20 text-emerald-300 shadow-sm"
                      : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  Undergraduate / Bachelors
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span>Destination Insight</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {current.highlights}
              </p>
            </div>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs text-slate-400 font-medium">Estimated Annual Total</span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-0.5">
                  {current.currencySymbol} {totalAnnualCost.toLocaleString()}{" "}
                  <span className="text-sm font-semibold text-slate-400">/ yr</span>
                </div>
              </div>
              <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-right">
                <span className="text-[10px] uppercase font-bold text-blue-400 block">Approx. INR Equivalent</span>
                <span className="text-lg font-bold text-blue-300">₹{totalInr} Lakhs / year</span>
              </div>
            </div>

            {/* Breakdown Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Building2 className="h-4 w-4 text-blue-400" />
                  <span>Annual Tuition Fee</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {avgTuition === 0 ? "€0 (Tuition-Free)" : `${current.currencySymbol} ${avgTuition.toLocaleString()}`}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Range: {current.currencySymbol}{degreeCost.tuitionMin.toLocaleString()} - {current.currencySymbol}{degreeCost.tuitionMax.toLocaleString()}
                </span>
              </div>

              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Coins className="h-4 w-4 text-emerald-400" />
                  <span>Living & Accommodation</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {current.currencySymbol} {degreeCost.livingCost.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Food, accommodation, insurance & travel
                </span>
              </div>
            </div>

            {/* Progress Bar Breakdown */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Tuition ({tuitionPct}%)</span>
                <span>Living Expenses ({livingPct}%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${tuitionPct}%` }} className="bg-blue-600 h-full" />
                <div style={{ width: `${livingPct}%` }} className="bg-emerald-500 h-full" />
              </div>
            </div>

            {/* Part-Time Earning Potential */}
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Briefcase className="h-4 w-4" />
                  <span>Part-Time Work Potential (20 hrs/week)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Earn up to <strong className="text-white">{current.currencySymbol}{degreeCost.partTimePotential.toLocaleString()}</strong> / year to recover living costs.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-400 sm:text-right">
                Net Out-of-Pocket: ~₹{netInr}L
              </div>
            </div>

            {/* Loan CTA */}
            <div className="pt-2">
              <a
                href="#eligibility-form"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                <span>Get 0% Collateral Education Loan Assistance</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
