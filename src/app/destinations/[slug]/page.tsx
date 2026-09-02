import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  DollarSign, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  Building2, 
  Award, 
  BookOpen, 
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DESTINATIONS } from '@/data/mockData';

export function generateStaticParams() {
  return [
    { slug: 'uk' },
    { slug: 'usa' },
    { slug: 'canada' },
    { slug: 'australia' },
    { slug: 'germany' },
    { slug: 'ireland' },
  ];
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const destination = DESTINATIONS.find((d) => d.slug.toLowerCase() === slug?.toLowerCase());

  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Destination Guide Not Found</h2>
          <Link href="/" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Country Hero Header */}
        <section className="relative py-16 lg:py-24 bg-slate-950 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 z-0">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover opacity-20 filter blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Global Destinations</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl">{destination.flag}</span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{destination.visaRate} First-Attempt Visa Grant Rate</span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display">
                  Study in {destination.name}
                </h1>

                <p className="text-lg sm:text-xl text-emerald-300 font-medium">
                  {destination.tagline}
                </p>

                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Everything you need to know about top universities, tuition fees, post-study work authorization (PSW), and consular visa compliance for the 2026/2027 intakes.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="/#eligibility-form"
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Check Eligibility for {destination.name}</span>
                  </a>

                  <a
                    href="#universities"
                    className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
                  >
                    Explore Top Universities
                  </a>
                </div>
              </div>

              {/* Quick Country Snapshot Box */}
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl w-full lg:w-96 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Country Key Metrics (2026)
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Avg. Tuition:</span>
                    <span className="text-white font-bold">{destination.avgTuition}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Living Expenses:</span>
                    <span className="text-slate-200 font-medium">{destination.livingCost}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Post-Study Work (PSW):</span>
                    <span className="text-emerald-400 font-bold">{destination.pswRights}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Visa Processing:</span>
                    <span className="text-slate-200 font-medium">{destination.processingTime}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Min. Language Req:</span>
                    <span className="text-slate-200 font-medium">{destination.minIelts}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase mb-1.5">Intake Timelines:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {destination.intakes.map((intake, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300">
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs & Deep Dive */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Top Universities Section */}
          <section id="universities" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                  Top Partner & Tier-1 Universities in {destination.name}
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Admissions, tuition fee ranges, and scholarship availability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {destination.topUniversities.map((uni, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between group transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-md">
                        {uni.ranking}
                      </span>
                      {uni.badge && (
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-md">
                          {uni.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {uni.name}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{uni.location}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Avg. Tuition:</span>
                        <span className="text-white font-semibold">{uni.avgFee}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Acceptance Rate:</span>
                        <span className="text-emerald-400 font-semibold">{uni.acceptanceRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800">
                    <a
                      href="/#eligibility-form"
                      className="block text-center w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors"
                    >
                      Check Admission Odds
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Visa Requirements & Checklist Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Student Visa Requirements</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Mandatory Documentation Checklist
              </h3>
              <p className="text-xs text-slate-300">
                Our ex-consulate certified coaches audit each item prior to official embassy submission:
              </p>

              <div className="space-y-3">
                {destination.visaRequirements.map((req, i) => (
                  <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Post-Study Work (PSW) & Stay Back</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Work Rights & Career Pathways
              </h3>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-400 block mb-1">Employment Regulations:</strong>
                {destination.workPermitRules}
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Key Strategic Benefits:
                </div>
                {destination.keyBenefits.map((ben, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="/#eligibility-form"
                  className="block text-center w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Start Your {destination.name} Application Today
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
