"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CountryFlag from "@/components/common/CountryFlag";

const EASE = [0.22, 1, 0.36, 1] as const;

const slugMap: Record<string, string> = {
  "United Kingdom": "uk",
  "United States": "usa",
  Canada: "canada",
  Germany: "germany",
  Australia: "australia",
  Ireland: "ireland",
};

const countryCodes: Record<string, string> = {
  "United Kingdom": "UK",
  "United States": "US",
  Canada: "CA",
  Germany: "DE",
  Australia: "AU",
  Ireland: "IE",
};

export default function StudyDestinations() {
  const hubs = [
    {
      country: "United Kingdom",
      stream: "Student Route (Subclass)",
      psw: "2 Years Graduate Route (3 Years PhD)",
      avgTuition: "£14,000 – £26,000 / yr",
      proofOfFunds: "28-Day Maintenance Fund Rule (~£12k–£15k)",
      advantages: [
        "1-Year accelerated Master's saving 50% tuition & living cost",
        "IELTS waiver (MOI) options based on Class 12 English score",
        "Direct access to London & UK tech/fintech corporate hubs",
      ],
      tag: "1-Yr Masters",
      whatsappMsg: "Hi! I am interested in UK Master's and want to assess my profile.",
    },
    {
      country: "United States",
      stream: "F-1 Non-Immigrant Visa",
      psw: "Up to 3 Years STEM OPT",
      avgTuition: "$24,000 – $48,000 / yr",
      proofOfFunds: "1-Year Liquid Funds (I-20 estimate verification)",
      advantages: [
        "36 Months STEM work permit for tech, analytics & engineering",
        "World's highest starting salaries & research grant opportunities",
        "Curricular Practical Training (CPT) during academic semesters",
      ],
      tag: "STEM OPT",
      whatsappMsg: "Hi! I need guidance for USA F-1 admissions and visa prep.",
    },
    {
      country: "Canada",
      stream: "Study Permit (SDS / Non-SDS)",
      psw: "Up to 3 Years PGWP",
      avgTuition: "CAD 18,000 – 34,000 / yr",
      proofOfFunds: "CAD 20,635 GIC Account + 1st Year Tuition",
      advantages: [
        "Transparent provincial nominee & Express Entry immigration pathways",
        "Post-Graduation Work Permit (PGWP) tied to recognized DLI programs",
        "High standard of living and diverse multicultural cities",
      ],
      tag: "PGWP Eligible",
      whatsappMsg: "Hi! I want guidance for Canada Study Permit and university shortlisting.",
    },
    {
      country: "Germany",
      stream: "National Visa (§16b AufenthG)",
      psw: "18 Months Jobseeker Residence Permit",
      avgTuition: "€0 Tuition (Nominal €350/sem fee)",
      proofOfFunds: "€11,208 / yr in Sperrkonto (Blocked Account)",
      advantages: [
        "Zero tuition fees at top-tier German Public Research Universities",
        "Mandatory APS certification navigation with zero delays",
        "Europe's strongest engineering, automotive & green-tech economy",
      ],
      tag: "€0 Tuition Public",
      whatsappMsg: "Hi! I am aiming for tuition-free German Public Universities.",
    },
    {
      country: "Australia",
      stream: "Subclass 500 Student Visa",
      psw: "2 to 4 Years Temporary Graduate (485)",
      avgTuition: "AUD 28,000 – 44,000 / yr",
      proofOfFunds: "Annual Living AUD 29,710 + 1st Year Tuition",
      advantages: [
        "Group of Eight (Go8) world top-50 globally ranked institutions",
        "Genuine Student (GS) assessment compliance & high part-time wages",
        "Regional post-study extensions available for high-growth sectors",
      ],
      tag: "Go8 Excellence",
      whatsappMsg:
        "Hi! I need guidance for Australia Subclass 500 and Genuine Student statement.",
    },
    {
      country: "Ireland",
      stream: "Irish Student Visa (AVATS)",
      psw: "2 Years Stamp 1G Graduate Scheme",
      avgTuition: "€13,000 – €24,000 / yr",
      proofOfFunds: "€10,000 Immediate Living Proof + Course Fee",
      advantages: [
        "European headquarters for Google, Apple, Meta, Pfizer & Stripe",
        "English-speaking EU economy with fast-track 1-Year Master's",
        "Uncapped career mobility under the 2-Year Stamp 1G visa",
      ],
      tag: "Silicon Docks",
      whatsappMsg:
        "Hi! I want to discuss Ireland 1-Year Master's and Silicon Docks tech opportunities.",
    },
  ];

  return (
    <section
      id="destinations"
      className="bg-cream py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <div className="border-t border-ink/12 pt-10 mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="label text-stone mb-4">Curated Global Study Hubs</div>
            <h2
              className="font-display font-normal text-ink leading-[0.93] tracking-tight"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              Targeted Country Expertise.<br />
              <em>Clear Admissions Data.</em>
            </h2>
          </div>
          <p className="text-stone text-sm leading-relaxed max-w-sm font-light">
            Every country enforces distinct financial proofs, post-study work regulations, and visa thresholds. We guide you through the verified data without guesswork.
          </p>
        </div>

        {/* ── Country strips (not a grid) ── */}
        <div>
          {hubs.map((hub, i) => {
            const slug = slugMap[hub.country];
            const code = countryCodes[hub.country];
            return (
              <motion.div
                key={hub.country}
                className="border-t border-ink/10 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 group"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.04 }}
              >
                {/* Large country code — decorative typography */}
                <div className="lg:col-span-2 flex items-start gap-3">
                  <div>
                    <div
                      className="font-display font-light text-ink/10 leading-none tracking-tighter select-none"
                      style={{ fontSize: "clamp(56px, 5.5vw, 80px)" }}
                    >
                      {code}
                    </div>
                    <div className="mt-2">
                      <CountryFlag country={hub.country} size="md" />
                    </div>
                  </div>
                </div>

                {/* Country name + tag + advantages */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h3
                      className="font-display font-normal text-ink tracking-tight leading-none"
                      style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
                    >
                      {hub.country}
                    </h3>
                    <div className="label text-stone mt-1.5">{hub.stream}</div>
                  </div>

                  <div className="inline-flex items-center border border-terra/25 bg-terra/[0.06] text-terra px-3 py-1 label">
                    {hub.tag}
                  </div>

                  <ul className="space-y-3 pt-1">
                    {hub.advantages.map((adv, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-stone font-light leading-relaxed">
                        <span className="text-terra mt-[3px] flex-shrink-0 text-base leading-none">–</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics ledger + CTAs */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-0">
                    {[
                      { label: "Post-Study Work", value: hub.psw },
                      { label: "Average Tuition", value: hub.avgTuition },
                      { label: "Proof of Funds", value: hub.proofOfFunds },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="border-t border-ink/8 pt-3 pb-3 grid grid-cols-2 gap-4 items-start"
                      >
                        <span className="label text-stone">{label}</span>
                        <span className="text-sm text-ink font-medium leading-relaxed">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-5">
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(hub.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-terra text-sm border-b border-terra/35 hover:border-terra pb-0.5 transition-colors group-hover:gap-2"
                    >
                      Discuss {hub.country} Strategy
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    {slug && (
                      <Link
                        href={`/destinations/${slug}`}
                        className="text-sm text-stone border-b border-stone/25 hover:border-stone/70 hover:text-ink pb-0.5 transition-colors"
                      >
                        Full Country Guide →
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Close with bottom rule */}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}
