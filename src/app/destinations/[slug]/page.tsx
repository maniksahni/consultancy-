import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Briefcase,
  Check,
  MapPin,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CountryFlag from '@/components/common/CountryFlag';
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
      <div className="min-h-screen bg-[#070A11] flex items-center justify-center p-4">
        <div className="text-center space-y-5">
          <p className="text-stone-400 text-sm font-light">Destination guide not found.</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-[#C5A880]/40 bg-[#0E1424] px-5 py-2.5 text-xs font-medium text-[#E8DEC9] hover:border-[#C5A880]/70 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#070A11] text-stone-200">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">

        {/* ── Country Header ── */}
        <section className="relative py-14 lg:py-20 border-b border-white/[0.08] overflow-hidden">
          {/* Warm ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C5A880]/[0.03] blur-[130px] pointer-events-none rounded-full" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 text-xs font-medium text-stone-400 hover:text-[#E5D3B3] transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>All Study Destinations</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">

              {/* Left: Identity */}
              <div className="space-y-5 max-w-2xl">
                <div className="flex items-center gap-4">
                  <CountryFlag country={destination.name} size="lg" />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.06] text-[#E5D3B3] text-xs font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{destination.visaRate} First-Attempt Visa Grant Rate</span>
                  </div>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
                  Study in{" "}
                  <span className="italic text-[#E5D3B3]">{destination.name}</span>
                </h1>

                <p className="text-base text-stone-300 font-light leading-relaxed">
                  {destination.tagline}
                </p>

                <p className="text-sm text-stone-400 font-light leading-relaxed max-w-xl">
                  Everything you need to know about top universities, tuition fees, post-study work authorization (PSW), and consular visa compliance for the 2026/2027 intakes.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="/#booking"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] px-6 py-3 text-xs sm:text-sm font-semibold text-[#070A11] tracking-wide transition-all shadow-md group"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book {destination.name} Strategy Call</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I am interested in studying in ${destination.name} and want to discuss my profile.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-[#0E131F] hover:border-[#C5A880]/40 px-5 py-3 text-xs font-medium text-stone-200 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#C5A880]" />
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>

              {/* Right: Key Metrics Card */}
              <div className="rounded-xl border border-white/[0.1] bg-[#0E131F] p-6 shadow-xl w-full lg:w-80 flex-shrink-0 space-y-4">
                <div className="text-[10px] font-semibold text-[#C5A880] uppercase tracking-widest border-b border-white/[0.07] pb-3">
                  Country Key Metrics (2026)
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { label: "Avg. Tuition:", value: destination.avgTuition, highlight: true },
                    { label: "Living Expenses:", value: destination.livingCost },
                    { label: "Post-Study Work (PSW):", value: destination.pswRights, highlight: true },
                    { label: "Visa Processing:", value: destination.processingTime },
                    { label: "Min. Language Req:", value: destination.minIelts },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className="flex justify-between items-start gap-3">
                      <span className="text-stone-400 font-light flex-shrink-0">{label}</span>
                      <span className={`font-medium text-right ${highlight ? "text-[#E5D3B3]" : "text-stone-200"}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.07]">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-2">Intake Timelines:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {destination.intakes.map((intake, i) => (
                      <span key={i} className="px-2.5 py-0.5 border border-white/[0.08] bg-[#070A11] rounded text-[11px] text-stone-300 font-light">
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-14 sm:space-y-20">

          {/* Top Universities */}
          <section id="universities">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/[0.06] px-3.5 py-1 text-[11px] font-medium tracking-widest text-[#E5D3B3] uppercase mb-4">
                Top Institutions
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Tier-1 Universities in <span className="italic text-[#C5A880]">{destination.name}</span>
              </h2>
              <p className="text-sm text-stone-400 font-light mt-1.5">
                Admissions, tuition fee ranges, and acceptance rates for 2026/2027 intakes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {destination.topUniversities.map((uni, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.08] bg-[#0E131F] p-5 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 border border-white/[0.08] bg-[#070A11] text-[10px] font-medium text-stone-300 rounded">
                        {uni.ranking}
                      </span>
                      {uni.badge && (
                        <span className="px-2 py-0.5 border border-[#C5A880]/25 bg-[#C5A880]/[0.06] text-[10px] font-medium text-[#E5D3B3] rounded">
                          {uni.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-serif text-base font-normal text-white group-hover:text-[#E5D3B3] transition-colors leading-snug">
                        {uni.name}
                      </h3>
                      <div className="text-xs text-stone-400 flex items-center gap-1 mt-1 font-light">
                        <MapPin className="w-3 h-3 text-stone-500" />
                        <span>{uni.location}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-xs">
                      <div className="flex justify-between text-stone-400 font-light">
                        <span>Avg. Tuition:</span>
                        <span className="text-stone-200 font-medium">{uni.avgFee}</span>
                      </div>
                      <div className="flex justify-between text-stone-400 font-light">
                        <span>Acceptance Rate:</span>
                        <span className="text-[#C5A880] font-medium">{uni.acceptanceRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06]">
                    <a
                      href="/#booking"
                      className="block text-center w-full py-2 rounded-lg border border-white/[0.08] bg-[#070A11] hover:border-[#C5A880]/30 hover:bg-[#0B0F19] text-stone-300 font-medium text-xs transition-all"
                    >
                      Check Admission Odds
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Visa Requirements & Work Rights Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Visa Requirements */}
            <div className="rounded-xl border border-white/[0.1] bg-[#0E131F] p-6 sm:p-8 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-[#C5A880] text-[11px] font-semibold uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Student Visa Requirements
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white tracking-tight">
                  Mandatory Documentation Checklist
                </h3>
                <p className="text-xs text-stone-400 font-light mt-1.5 leading-relaxed">
                  Our senior mentor audits each statutory document prior to embassy submission:
                </p>
              </div>

              <div className="space-y-2.5">
                {destination.visaRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-stone-300 font-light">
                    <div className="h-5 w-5 rounded flex-shrink-0 bg-[#C5A880]/10 border border-[#C5A880]/25 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#C5A880] stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Rights */}
            <div className="rounded-xl border border-white/[0.1] bg-[#0E131F] p-6 sm:p-8 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-[#C5A880] text-[11px] font-semibold uppercase tracking-widest mb-2">
                  <Briefcase className="w-4 h-4" />
                  Post-Study Work &amp; Stay Back
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white tracking-tight">
                  Work Rights &amp; Career Pathways
                </h3>
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-[#070A11]/60 p-4 text-xs text-stone-300 font-light leading-relaxed">
                <strong className="text-[#C5A880] block mb-1.5 font-medium">Employment Regulations:</strong>
                {destination.workPermitRules}
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
                  Key Strategic Benefits:
                </div>
                {destination.keyBenefits.map((ben, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] flex-shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{ben}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.07]">
                <a
                  href="/#booking"
                  className="block text-center w-full py-3 rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] text-[#070A11] font-semibold text-xs tracking-wide transition-all shadow-md"
                >
                  Start Your {destination.name} Application Today
                </a>
              </div>
            </div>

          </section>

          {/* Bottom CTA */}
          <section className="rounded-xl border border-white/[0.1] bg-[#0E131F] p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white tracking-tight">
                Ready to begin your {destination.name} journey?
              </h3>
              <p className="text-sm text-stone-400 font-light">
                Schedule a free 30-minute profile audit. No commitment, no call-centre handoffs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <a
                href="/#booking"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] px-6 py-3 text-xs font-semibold text-[#070A11] tracking-wide transition-all shadow-md group"
              >
                Book Free Strategy Call
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/#destinations"
                className="text-xs text-stone-400 hover:text-[#E5D3B3] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                All Destinations
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
