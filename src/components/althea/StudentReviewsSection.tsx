import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Award, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { STUDENT_REVIEWS } from "@/data/studentReviews";

export default function StudentReviewsSection() {
  return (
    <section id="reviews" className="bg-[#F1EDE5] px-5 py-20 sm:px-9 lg:px-14 lg:py-28 border-b border-[#173969]/15">
      <div className="mx-auto max-w-[1328px]">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#173969]/15">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#AC9068]">
              07 / TÉMOIGNAGES · Verified Student Outcomes
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.94] tracking-[-.04em] text-[#153260]">
              Real Journeys,<br />
              <em className="text-[#A88E65]">Proven Admits.</em>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-sm leading-8 text-[#596980]">
              Genuine feedback and verified admit records from students guided into France’s premier Grande Écoles and top public universities. 100% fiduciary advice with zero recruiter kickbacks.
            </p>
            <Link
              href="/outcomes"
              className="mt-4 inline-flex items-center gap-2 border-b border-[#173969] pb-1 text-xs font-semibold uppercase tracking-[.14em] text-[#173969] hover:text-[#2A528A] transition-colors"
            >
              View detailed case dossiers <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STUDENT_REVIEWS.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between border border-[#173969]/15 bg-[#FCFAF6] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(13,38,79,.09)]"
            >
              <div>
                {/* Header: Student name, city & intake */}
                <div className="flex items-start justify-between gap-3 border-b border-[#173969]/10 pb-4 mb-5">
                  <div>
                    <h3 className="font-display text-2xl text-[#153260] font-medium">
                      {item.studentName}
                    </h3>
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-[#8C7650] uppercase tracking-wider mt-0.5">
                      <MapPin size={12} />
                      {item.city}, India
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold tracking-[.15em] uppercase text-[#677790] bg-[#EAE3D6] px-2.5 py-1">
                    {item.intake}
                  </span>
                </div>

                {/* University & Degree Badge */}
                <div className="mb-3">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A08253] mb-1.5">
                    <GraduationCap size={13} />
                    <span>{item.degree}</span>
                  </div>
                  <h4 className="font-display text-xl text-[#173969] leading-snug">
                    {item.university}
                  </h4>
                  <p className="text-xs text-[#5D6F88] mt-1 font-medium">
                    {item.program}
                  </p>
                </div>

                {/* Achievement Highlight Badge */}
                <div className="my-4 inline-flex items-center gap-2 bg-[#E9E3D6]/70 border border-[#173969]/10 px-3 py-1.5 text-[11px] font-semibold text-[#1B3F73]">
                  <Award size={13} className="text-[#A88E65] shrink-0" />
                  <span className="line-clamp-1">{item.scholarshipOrSaving}</span>
                </div>

                {/* Direct Student Review Quote */}
                <div className="my-4 border-l-2 border-[#A88E65] pl-4 text-xs italic text-[#4E617A] leading-relaxed">
                  &ldquo;{item.review}&rdquo;
                </div>

                {/* Academic Profile & Scores */}
                <div className="border-t border-[#173969]/10 pt-3.5 text-[11px] text-[#697A92] font-mono">
                  <span className="text-[9px] uppercase tracking-wider text-[#8A7859] block mb-0.5">
                    Profile Parameters:
                  </span>
                  <span>{item.stats}</span>
                </div>
              </div>

              {/* Verified Outcome Stamp */}
              <div className="mt-6 pt-4 border-t border-[#173969]/15 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#183E70]">
                  {item.outcome}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 shrink-0">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Verification Strip */}
        <div className="mt-14 border-t border-[#173969]/15 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-xs text-[#53657D]">
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-[#A88E65]" />
            <span>
              <strong>100% Verified Admissions &amp; Visa Clearances</strong> · Official documentation verified · Zero institutional commissions.
            </span>
          </div>
          <Link
            href="/outcomes"
            className="inline-flex items-center gap-2 font-semibold uppercase tracking-[.12em] text-[#173969] hover:text-[#2A528A]"
          >
            Explore all student case files <ArrowUpRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
