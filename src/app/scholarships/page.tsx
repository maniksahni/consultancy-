"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Search, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SCHOLARSHIPS } from '@/data/mockData';

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCoverage, setSelectedCoverage] = useState('All');

  const filteredScholarships = SCHOLARSHIPS.filter((sch) => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sch.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || sch.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchesCoverage = selectedCoverage === 'All' || sch.coverage.toLowerCase().includes(selectedCoverage.toLowerCase());
    return matchesSearch && matchesCountry && matchesCoverage;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#070A11] text-stone-200">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">

        {/* Header */}
        <section className="relative py-14 border-b border-white/[0.08] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#C5A880]/[0.025] blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-stone-400 hover:text-[#E5D3B3] transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.06] px-3.5 py-1 text-[11px] font-medium tracking-widest text-[#E5D3B3] uppercase">
                  <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>₹25Cr+ Merit &amp; Need-Based Funding Indexed</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                  Global Scholarship Directory{" "}
                  <span className="italic text-[#C5A880]">(2026/27)</span>
                </h1>
                <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-xl">
                  Explore full-ride government awards (Chevening, Fulbright, DAAD) and university-specific merit fellowships with our expert application support.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.1] bg-[#0E131F] p-6 shadow-xl w-full lg:w-72 flex-shrink-0 space-y-2">
                <div className="text-[10px] font-semibold text-[#C5A880] uppercase tracking-widest">Average Student Grant</div>
                <div className="font-serif text-3xl text-[#E5D3B3] font-normal">$14,500</div>
                <p className="text-xs text-stone-400 font-light leading-relaxed">82% of applicants qualify for partial or full-ride financial aid.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Scholarship Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

          {/* Filter Controls */}
          <div className="rounded-xl border border-white/[0.08] bg-[#0E131F] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-stone-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search scholarship name or criteria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#070A11] border border-white/[0.1] rounded-lg text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
            </div>

            {/* Country */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full py-2 px-3 bg-[#070A11] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
            >
              <option value="All">All Study Destinations</option>
              <option value="USA">USA Scholarships</option>
              <option value="UK">UK (Chevening &amp; University)</option>
              <option value="Germany">Germany (DAAD &amp; State)</option>
              <option value="Australia">Australia Awards</option>
            </select>

            {/* Coverage */}
            <select
              value={selectedCoverage}
              onChange={(e) => setSelectedCoverage(e.target.value)}
              className="w-full py-2 px-3 bg-[#070A11] border border-white/[0.1] rounded-lg text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
            >
              <option value="All">All Coverage Tiers</option>
              <option value="Full Ride">Full Ride (Tuition + Stipend)</option>
              <option value="Partial Tuition">Partial Tuition Waivers</option>
              <option value="Full Living Support">Living Cost Grants</option>
            </select>
          </div>

          {/* Scholarship Cards */}
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-16 text-stone-400 font-light text-sm">
              No scholarships match the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="rounded-xl border border-white/[0.08] bg-[#0E131F] p-6 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 border border-[#C5A880]/25 bg-[#C5A880]/[0.06] text-[#E5D3B3] text-[10px] font-medium rounded">
                        {sch.tag}
                      </span>
                      <span className="text-xs font-light text-stone-400">{sch.country}</span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-normal text-white group-hover:text-[#E5D3B3] transition-colors leading-snug">
                        {sch.name}
                      </h3>
                      <div className="text-xs font-medium text-[#C5A880] mt-1">
                        {sch.amount}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-stone-300 pt-3 border-t border-white/[0.06]">
                      <div className="flex items-start gap-1.5 font-light">
                        <span className="text-stone-500 font-medium flex-shrink-0">Eligibility:</span>
                        <span>{sch.eligibility}</span>
                      </div>

                      <div className="flex justify-between text-stone-400 pt-1 font-light">
                        <span>Deadline:</span>
                        <span className="text-stone-200 font-medium">{sch.deadline}</span>
                      </div>

                      <div className="flex justify-between text-stone-400 font-light">
                        <span>Target Level:</span>
                        <span className="text-stone-200">{sch.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06]">
                    <a
                      href="/#booking"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#C5A880]/30 bg-[#C5A880]/[0.06] hover:bg-[#C5A880]/[0.12] text-[#E5D3B3] font-medium text-xs transition-colors"
                    >
                      <span>Apply with Senior Mentor</span>
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
