import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Briefcase,
  Check,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CountryFlag from "@/components/common/CountryFlag";
import { DESTINATIONS } from "@/data/mockData";

export function generateStaticParams() {
  return [
    { slug: "uk" },
    { slug: "usa" },
    { slug: "canada" },
    { slug: "australia" },
    { slug: "germany" },
    { slug: "ireland" },
  ];
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const destination = DESTINATIONS.find(
    (d) => d.slug.toLowerCase() === slug?.toLowerCase()
  );

  if (!destination) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="text-center space-y-5">
          <p className="text-stone text-sm font-light">Destination guide not found.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-ink/20 px-5 py-2.5 label text-ink hover:border-terra hover:text-terra transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-20 focus:outline-none">

        {/* ── Country header — dark ── */}
        <section className="bg-[#14120C] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">

            {/* Breadcrumb */}
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 label text-cream/30 hover:text-cream/60 transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              All Study Destinations
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

              {/* Left: Identity */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <CountryFlag country={destination.name} size="lg" />
                  <div className="flex items-center gap-2 border border-cream/10 px-3 py-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-terra" />
                    <span className="label text-cream/40 text-[10px]">{destination.visaRate} First-Attempt Visa Grant</span>
                  </div>
                </div>

                <h1
                  className="font-display font-normal text-cream leading-[0.9] tracking-tight"
                  style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
                >
                  Study in{" "}
                  <em className="text-terra">{destination.name}</em>
                </h1>

                <p className="text-base text-cream/60 font-light leading-relaxed max-w-lg">
                  {destination.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="/#booking"
                    className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream px-6 py-3 label transition-colors group"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book {destination.name} Strategy Call
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href={`https://wa.me/33755749029?text=${encodeURIComponent(
                      `Hi! I am interested in studying in ${destination.name} and want to discuss my profile.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-cream/15 hover:border-terra/40 text-cream/50 hover:text-cream/80 px-5 py-3 label text-[10px] transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-terra" />
                    WhatsApp Inquiry
                  </a>
                </div>
              </div>

              {/* Right: Key metrics */}
              <div className="lg:col-span-5 border border-cream/10 p-6 space-y-4">
                <div className="label text-cream/30 border-b border-cream/10 pb-3">
                  Country Key Metrics (2026)
                </div>
                <div className="space-y-3 text-xs">
                  {[
                    { label: "Avg. Tuition:", value: destination.avgTuition, accent: true },
                    { label: "Living Expenses:", value: destination.livingCost },
                    { label: "Post-Study Work:", value: destination.pswRights, accent: true },
                    { label: "Visa Processing:", value: destination.processingTime },
                    { label: "Min. Language Req:", value: destination.minIelts },
                  ].map(({ label, value, accent }) => (
                    <div key={label} className="border-t border-cream/8 pt-3 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-3">
                      <span className="min-w-0 text-cream/30 font-light">{label}</span>
                      <span className={`min-w-0 break-words font-medium text-right ${accent ? "text-terra" : "text-cream/70"}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-cream/10">
                  <div className="label text-cream/25 mb-2">Intake Timelines</div>
                  <div className="flex flex-wrap gap-2">
                    {destination.intakes.map((intake, i) => (
                      <span key={i} className="border border-cream/10 px-2.5 py-1 text-[11px] text-cream/50 font-sans font-light">
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Content — light ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 sm:py-20 space-y-16">

          {/* Universities */}
          <section id="universities">
            <div className="border-t border-ink/12 pt-8 mb-8">
              <div className="label text-stone mb-4">Top Institutions</div>
              <h2
                className="font-display font-normal text-ink leading-tight tracking-tight"
                style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
              >
                Tier-1 Universities in <em className="text-terra">{destination.name}</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
              {destination.topUniversities.map((uni, idx) => (
                <div
                  key={idx}
                  className="bg-cream p-6 flex flex-col justify-between hover:bg-cream-50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="border border-ink/12 px-2 py-0.5 text-[10px] font-sans text-stone">
                        {uni.ranking}
                      </span>
                      {uni.badge && (
                        <span className="border border-terra/25 bg-terra/[0.05] px-2 py-0.5 text-[10px] font-sans text-terra">
                          {uni.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-normal text-ink leading-snug tracking-tight">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1 text-xs text-stone font-light">
                        <MapPin className="w-3 h-3 text-stone/50" />
                        {uni.location}
                      </div>
                    </div>
                    <div className="border-t border-ink/8 pt-3 space-y-1.5 text-xs">
                      <div className="flex justify-between text-stone font-light">
                        <span>Avg. Tuition:</span>
                        <span className="text-ink font-medium">{uni.avgFee}</span>
                      </div>
                      <div className="flex justify-between text-stone font-light">
                        <span>Acceptance Rate:</span>
                        <span className="text-terra font-medium">{uni.acceptanceRate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-ink/8">
                    <a
                      href="/#booking"
                      className="block w-full text-center border border-ink/12 hover:border-terra/40 hover:text-terra text-stone py-2 text-xs label text-[10px] transition-colors"
                    >
                      Check Admission Odds
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Visa + Work rights */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Visa requirements */}
            <div className="border border-ink/10 p-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 label text-terra mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  Student Visa Requirements
                </div>
                <h3 className="font-display text-2xl font-normal text-ink tracking-tight">
                  Mandatory Documentation Checklist
                </h3>
                <p className="text-xs text-stone font-light mt-2 leading-relaxed">
                  Our senior mentor audits each statutory document prior to embassy submission:
                </p>
              </div>
              <div className="space-y-3">
                {destination.visaRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-stone font-light">
                    <div className="h-5 w-5 border border-terra/30 bg-terra/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-terra" />
                    </div>
                    <span className="leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work rights */}
            <div className="border border-ink/10 p-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 label text-terra mb-3">
                  <Briefcase className="w-4 h-4" />
                  Post-Study Work &amp; Stay Back
                </div>
                <h3 className="font-display text-2xl font-normal text-ink tracking-tight">
                  Work Rights &amp; Career Pathways
                </h3>
              </div>

              <div className="border border-ink/10 bg-cream-50 p-4 text-xs text-stone font-light leading-relaxed">
                <strong className="text-ink block mb-1.5 font-medium label text-[10px]">Employment Regulations:</strong>
                {destination.workPermitRules}
              </div>

              <div className="space-y-3">
                <div className="label text-stone mb-1">Key Strategic Benefits</div>
                {destination.keyBenefits.map((ben, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone font-light">
                    <span className="text-terra mt-[3px] flex-shrink-0 text-base leading-none">–</span>
                    <span className="leading-relaxed">{ben}</span>
                  </div>
                ))}
              </div>

              <a
                href="/#booking"
                className="block w-full text-center bg-ink hover:bg-ink-soft text-cream py-3 label text-[10px] transition-colors mt-2"
              >
                Start Your {destination.name} Application Today
              </a>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="border border-ink/10 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-normal text-ink tracking-tight">
                Ready to begin your {destination.name} journey?
              </h3>
              <p className="text-stone text-sm font-light mt-1">
                Schedule a free 30-minute profile audit. No commitment, no call-centre handoffs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
              <a
                href="/#booking"
                className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream px-6 py-3 label transition-colors group"
              >
                Book Free Strategy Call
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/#destinations"
                className="text-sm text-stone hover:text-ink transition-colors flex items-center gap-1 border-b border-stone/25 pb-0.5"
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
