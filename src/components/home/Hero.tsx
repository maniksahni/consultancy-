"use client";

import React from "react";
import { ArrowRight, CheckCircle, Award, Users, Globe2 } from "lucide-react";

export default function Hero() {
  const highlights = [
    "No Upfront Processing Charges",
    "Direct University Representation",
    "End-to-End Visa Filing",
  ];

  const stats = [
    { icon: Users, value: "5,000+", label: "Students Placed" },
    { icon: Award, value: "98.4%", label: "Visa Success Rate" },
    { icon: Globe2, value: "350+", label: "Partner Universities" },
    { icon: CheckCircle, value: "₹25Cr+", label: "Scholarships Secured" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Admissions Open for 2026 & 2027 Intakes
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Launch Your Global Future with{" "}
            <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">
              Guaranteed Visa
            </span>{" "}
            Guidance
          </h1>

          <p className="mt-5 text-base text-slate-600 sm:text-lg">
            From university shortlisting and SOP vetting to visa documentation and
            education loans — we guide you through every milestone of studying abroad.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#eligibility-form"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-blue-700 transition sm:w-auto"
            >
              Check Your Eligibility Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#process"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition sm:w-auto"
            >
              How It Works
            </a>
          </div>

          {/* Value props list */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
            {highlights.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:grid-cols-4 sm:p-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
