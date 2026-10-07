"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SCHOLARSHIPS } from "@/data/mockData";

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCoverage, setSelectedCoverage] = useState("All");

  const filteredScholarships = SCHOLARSHIPS.filter((sch) => {
    const matchesSearch =
      sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      selectedCountry === "All" ||
      sch.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchesCoverage =
      selectedCoverage === "All" ||
      sch.coverage.toLowerCase().includes(selectedCoverage.toLowerCase());
    return matchesSearch && matchesCountry && matchesCoverage;
  });

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-20 focus:outline-none">

        {/* ── Header — dark ── */}
        <section className="bg-[#14120C] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 label text-cream/30 hover:text-cream/60 transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 border border-cream/10 px-3 py-1.5">
                  <Award className="w-3.5 h-3.5 text-terra" />
                  <span className="label text-cream/35 text-[10px]">₹25 Cr+ Merit &amp; Need-Based Funding Indexed</span>
                </div>
                <h1
                  className="font-display font-normal text-cream leading-[0.92] tracking-tight break-words"
                  style={{ fontSize: "clamp(32px, 8.5vw, 88px)" }}
                >
                  Global Scholarship<br />
                  Directory{" "}
                  <em className="text-terra inline-block pr-1.5">(2026/27)</em>
                </h1>
                <p className="text-sm text-cream/50 font-light leading-relaxed max-w-xl">
                  Explore full-ride government awards (Chevening, Fulbright, DAAD) and university-specific merit fellowships with our expert application support.
                </p>
              </div>

              <div className="border border-cream/10 p-6 w-full lg:w-64 flex-shrink-0 space-y-2">
                <div className="label text-cream/25">Average Student Grant</div>
                <div className="font-display text-4xl text-terra font-normal leading-none">$14,500</div>
                <p className="text-xs text-cream/30 font-light leading-relaxed">
                  82% of applicants qualify for partial or full-ride financial aid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Filter + Scholarship cards — light ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">

          {/* Filter row */}
          <div className="border border-ink/10 bg-cream-50 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-0 top-2.5 w-4 h-4 text-stone pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or criteria…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-0 text-sm text-ink placeholder:text-stone font-light bg-transparent border-b border-ink/15 py-2 focus:outline-none focus:border-terra transition-colors"
              />
            </div>
            {/* Country */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-sm text-ink bg-transparent border-b border-ink/15 py-2 focus:outline-none focus:border-terra transition-colors appearance-none cursor-pointer"
              >
                <option value="All">All Study Destinations</option>
                <option value="USA">USA Scholarships</option>
                <option value="UK">UK (Chevening &amp; University)</option>
                <option value="Germany">Germany (DAAD &amp; State)</option>
                <option value="Australia">Australia Awards</option>
              </select>
              <div className="absolute right-0 bottom-2.5 pointer-events-none text-stone text-[10px]">▾</div>
            </div>
            {/* Coverage */}
            <div className="relative">
              <select
                value={selectedCoverage}
                onChange={(e) => setSelectedCoverage(e.target.value)}
                className="w-full text-sm text-ink bg-transparent border-b border-ink/15 py-2 focus:outline-none focus:border-terra transition-colors appearance-none cursor-pointer"
              >
                <option value="All">All Coverage Tiers</option>
                <option value="Full Ride">Full Ride (Tuition + Stipend)</option>
                <option value="Partial Tuition">Partial Tuition Waivers</option>
                <option value="Full Living Support">Living Cost Grants</option>
              </select>
              <div className="absolute right-0 bottom-2.5 pointer-events-none text-stone text-[10px]">▾</div>
            </div>
          </div>

          {/* Cards */}
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-16 text-stone font-light text-sm border border-ink/8">
              No scholarships match the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="bg-cream p-7 flex flex-col justify-between hover:bg-cream-50 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="border border-terra/25 bg-terra/[0.05] text-terra label text-[10px] px-2.5 py-1">
                        {sch.tag}
                      </span>
                      <span className="label text-stone text-[10px]">{sch.country}</span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-normal text-ink leading-snug tracking-tight">
                        {sch.name}
                      </h3>
                      <div className="label text-terra mt-1.5 text-[10px]">{sch.amount}</div>
                    </div>

                    <div className="border-t border-ink/8 pt-3 space-y-2 text-xs text-stone font-light">
                      <div className="flex items-start gap-1.5">
                        <span className="font-medium text-ink/60 flex-shrink-0">Eligibility:</span>
                        <span className="leading-relaxed">{sch.eligibility}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span>Deadline:</span>
                        <span className="text-ink font-medium">{sch.deadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Target Level:</span>
                        <span className="text-ink">{sch.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-ink/8">
                    <a
                      href="/#booking"
                      className="w-full inline-flex items-center justify-center gap-1.5 border border-terra/30 hover:border-terra bg-terra/[0.04] hover:bg-terra/[0.08] text-terra py-2.5 label text-[10px] transition-colors"
                    >
                      Apply with Senior Mentor
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
