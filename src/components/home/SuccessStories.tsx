"use client";

import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Award, 
  Quote, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  GraduationCap 
} from 'lucide-react';
import { TESTIMONIALS } from '@/data/mockData';

export default function SuccessStories() {
  const [activeCountry, setActiveCountry] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredStories = TESTIMONIALS.filter((t) => {
    if (activeCountry === 'All') return true;
    return t.destinationCountry.toLowerCase() === activeCountry.toLowerCase();
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  return (
    <section id="stories" className="py-20 lg:py-28 bg-slate-900/60 relative overflow-hidden border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Verified Alumni • 98.4% Visa Success</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Student Success Stories & Visa Stamps
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Discover how students achieved admits to Northeastern, Manchester, RWTH Aachen, Waterloo, and Melbourne with scholarships and fast-track visas.
            </p>
          </div>

          {/* Google Review Simulation Badge */}
          <div className="bg-slate-950/90 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">4.9 / 5.0 Rating</div>
              <div className="text-slate-400 text-[11px]">850+ Verified Google & Trustpilot Reviews</div>
            </div>
          </div>
        </div>

        {/* Country Filter Badges */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {['All', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland'].map((country) => (
            <button
              key={country}
              onClick={() => {
                setActiveCountry(country);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCountry === country
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {country === 'All' ? 'All Stories' : `Study in ${country}`}
            </button>
          ))}
        </div>

        {/* Testimonials Grid (Cards Display) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-slate-950/90 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{story.verificationBadge}</span>
                  </span>

                  <div className="flex items-center text-amber-400">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-slate-800 absolute -top-2 -left-2 -z-0 opacity-40" />
                  <p className="text-xs text-slate-300 leading-relaxed relative z-10 italic">
                    "{story.quote}"
                  </p>
                </div>

                {/* Scholarship Tag if awarded */}
                {story.scholarshipAmount && (
                  <div className="p-2 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-center gap-2 text-[11px] text-amber-300 font-semibold">
                    <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{story.scholarshipAmount}</span>
                  </div>
                )}
              </div>

              {/* Student Profile Info */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40"
                />
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="truncate">{story.name}</span>
                    <span>{story.flag}</span>
                  </div>
                  <div className="text-xs font-medium text-emerald-400 truncate">
                    {story.course}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {story.university}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
