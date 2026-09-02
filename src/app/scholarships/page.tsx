"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Search, 
  Filter, 
  ArrowLeft, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Globe2, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConsultationModal from '@/components/modals/ConsultationModal';
import { SCHOLARSHIPS } from '@/data/mockData';

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCoverage, setSelectedCoverage] = useState('All');
  const [consultationOpen, setConsultationOpen] = useState(false);

  const filteredScholarships = SCHOLARSHIPS.filter((sch) => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sch.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || sch.country.toLowerCase() === selectedCountry.toLowerCase();
    const matchesCoverage = selectedCoverage === 'All' || sch.coverage.toLowerCase().includes(selectedCoverage.toLowerCase());
    return matchesSearch && matchesCountry && matchesCoverage;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Header Hero */}
        <section className="py-16 bg-slate-900/60 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>₹25Cr+ Merit & Need-Based Funding Indexed</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                  Global Scholarship Directory (2026/27)
                </h1>
                <p className="text-slate-300 text-sm sm:text-base">
                  Explore full-ride government awards (Chevening, Fulbright, DAAD) and university-specific merit fellowships with our expert application support.
                </p>
              </div>

              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-5 shadow-xl w-full lg:w-80 space-y-2 text-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Average Student Grant</div>
                <div className="text-3xl font-black text-amber-400">$14,500</div>
                <p className="text-slate-400">82% of applicants qualify for partial or full-ride financial aid.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Controls */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Search scholarship name or criteria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Country Selector */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Study Destinations</option>
                <option value="USA">USA Scholarships</option>
                <option value="UK">UK (Chevening & University)</option>
                <option value="Germany">Germany (DAAD & State)</option>
                <option value="Australia">Australia Awards</option>
              </select>
            </div>

            {/* Coverage Type */}
            <div>
              <select
                value={selectedCoverage}
                onChange={(e) => setSelectedCoverage(e.target.value)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Coverage Tiers</option>
                <option value="Full Ride">Full Ride (Tuition + Stipend)</option>
                <option value="Partial Tuition">Partial Tuition Waivers</option>
                <option value="Full Living Support">Living Cost Grants</option>
              </select>
            </div>
          </div>

          {/* Scholarships Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((sch) => (
              <div 
                key={sch.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between group transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 text-[10px] font-bold rounded-full border border-amber-500/20">
                      {sch.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{sch.country}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {sch.name}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-400 mt-1">
                      {sch.amount}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <div className="flex items-start gap-1.5">
                      <span className="text-slate-500 font-semibold">Eligibility:</span>
                      <span>{sch.eligibility}</span>
                    </div>

                    <div className="flex justify-between text-slate-400 pt-1">
                      <span>Deadline:</span>
                      <span className="text-white font-medium">{sch.deadline}</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Target Level:</span>
                      <span className="text-slate-200">{sch.level}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Apply with Counsellor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <ConsultationModal 
        isOpen={consultationOpen} 
        onClose={() => setConsultationOpen(false)} 
      />
    </div>
  );
}
