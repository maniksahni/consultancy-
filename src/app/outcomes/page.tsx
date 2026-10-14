import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Award, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import { STUDENT_REVIEWS } from "@/data/studentReviews";

export const metadata: Metadata = {
  title: "Student Success Stories & Verified Outcomes | Althéa Consulting",
  description: "Real student admissions records, scholarship grants, and genuine reviews from candidates admitted to top French Grande Écoles and European universities.",
};

export default function OutcomesPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]">
      <AltheaHeader />

      {/* Header Banner */}
      <section className="bg-[#142E61] px-5 pb-20 pt-12 text-white sm:px-9 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-[1328px]">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-xs text-white/65 hover:text-white transition-colors">
            <ArrowLeft size={17} /> Althéa home
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[.27em] text-[#E5C99D]">
            TÉMOIGNAGES &amp; RÉSULTATS / Verified Admissions Ledger
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,7.5vw,6.5rem)] leading-[.92] tracking-[-.04em]">
            Real Students.<br />
            <em className="text-[#E5C99D]">Proven Outcomes.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/75">
            Documented admissions results, merit scholarship awards, and genuine reviews from students guided into France’s premier Grande Écoles and top public institutions.
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="mx-auto max-w-[1328px] px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-2">
          {STUDENT_REVIEWS.map((item, idx) => (
            <article
              key={item.id}
              className="flex flex-col justify-between border border-[#173969]/15 bg-[#F2EDE5] p-7 sm:p-9 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(13,38,79,.08)]"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-[#173969]/15 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[.24em] text-[#A68C63]">
                      Case Record {String(idx + 1).padStart(2, "0")} · France / {item.intake}
                    </span>
                    <h2 className="mt-2 font-display text-3xl sm:text-4xl text-[#153260]">
                      {item.studentName}
                    </h2>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7650] uppercase tracking-wider mt-1">
                      <MapPin size={13} />
                      {item.city}, India
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-1 shrink-0">
                    <CheckCircle2 size={13} />
                    Verified Admit
                  </span>
                </div>

                {/* Institution & Program */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#987847] mb-1">
                    <GraduationCap size={14} />
                    <span>{item.degree}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#173969] leading-snug">
                    {item.university}
                  </h3>
                  <p className="text-sm text-[#5D6F88] mt-1 font-medium">
                    {item.program}
                  </p>
                </div>

                {/* Scholarship / Financial Win */}
                <div className="my-5 inline-flex items-center gap-2 bg-[#E7E0D2] border border-[#173969]/15 px-3.5 py-2 text-xs font-semibold text-[#183E70]">
                  <Award size={15} className="text-[#A88E65] shrink-0" />
                  <span>{item.scholarshipOrSaving}</span>
                </div>

                {/* Direct Student Review Quote */}
                <div className="my-5 bg-[#FCFAF6] border-l-2 border-[#A88E65] p-5 shadow-sm">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-[#A88E65] font-bold mb-1.5">
                    Student Review &amp; Experience
                  </p>
                  <p className="text-xs sm:text-sm italic text-[#44566E] leading-relaxed">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Profile Stats */}
                <div className="border-t border-b border-[#173969]/15 py-3 text-xs text-[#5E718B] font-mono">
                  <span className="text-[9px] uppercase tracking-wider text-[#8A7859] block mb-0.5">
                    Academic Profile &amp; Test Scores:
                  </span>
                  <span>{item.stats}</span>
                </div>
              </div>

              {/* Verified Outcome Stamp */}
              <div className="mt-6 pt-4 border-t border-[#173969]/15 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-[#8A7859] block">
                    Consular / Admissions Status:
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#183E70]">
                    {item.outcome}
                  </span>
                </div>
                <Link
                  href="/#consultation"
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#173969] hover:text-[#2A528A] shrink-0"
                >
                  Start your journey <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 border-t border-[#173969]/15 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-xs text-[#53657D]">
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-[#A88E65]" />
            <span>
              <strong>100% Genuine Candidate Admissions &amp; Visa Clearances</strong> · Verified documents · Zero institutional recruitment kickbacks.
            </span>
          </div>
          <Link
            href="/#consultation"
            className="inline-flex items-center gap-2 font-semibold uppercase tracking-[.12em] text-[#173969] hover:text-[#2A528A]"
          >
            Speak directly with Harshita <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <AltheaFooter />
    </main>
  );
}