import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, Briefcase, Building, CheckCircle2, Clock, DollarSign, Euro, Globe, GraduationCap, MapPin, ShieldCheck, Star } from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import { DESTINATIONS } from "@/data/mockData";
import { globalJobsList, countriesWorkRegistry, type CountryCode } from "@/data/globalJobsData";
import FranceEnquiryForm from "@/components/althea/FranceEnquiryForm";

const destinationsMap: { [key: string]: string } = {
  uk: "United Kingdom",
  usa: "United States",
  canada: "Canada",
  australia: "Australia",
  germany: "Germany",
  ireland: "Ireland",
};

export function generateStaticParams() {
  return Object.keys(destinationsMap).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const dest = DESTINATIONS.find((d) => d.slug === params.slug);
  const name = dest ? dest.name : destinationsMap[params.slug] || "Study Destination";
  return {
    title: `Study & Work in ${name} | Althéa Consulting`,
    description: `Comprehensive guide to studying in ${name}: university admissions, tuition, visa requirements, student work rights, and post-study careers.`,
    alternates: { canonical: `/destinations/${params.slug}` },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const dest = DESTINATIONS.find((d) => d.slug === params.slug);
  const countryKey = params.slug as CountryCode;
  const workInfo = countriesWorkRegistry[countryKey];
  const countryJobs = globalJobsList.filter((j) => j.country === countryKey);
  const name = dest ? dest.name : destinationsMap[params.slug] || "Study Destination";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]">
      <AltheaHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#142E61] px-5 pb-20 pt-14 text-white sm:px-9 sm:py-24 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8rem] -top-[6rem] h-[38rem] w-[38rem] rounded-full border border-white/10 shadow-[0_0_0_80px_rgba(255,255,255,.015)]"
        />
        <div className="relative mx-auto max-w-[1328px]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-white transition-colors">Global Careers</Link>
            <span>/</span>
            <span className="text-[#E4C99B]">{name}</span>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="text-4xl">{dest?.flag || "🌍"}</span>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#D7BA87]">
              Destination Dossier / {name}
            </span>
          </div>

          <h1 className="mt-4 max-w-5xl font-display text-[clamp(3.5rem,8.5vw,7.8rem)] leading-[0.9] tracking-[-0.05em]">
            Study &amp; Work in <br />
            <em className="font-normal text-[#E4C99B]">{name}.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            {dest?.tagline || `Complete independent guidance for university admissions, living costs, student work rights, and post-study work authorization in ${name}.`}
          </p>

          {/* Quick Metrics Bar */}
          {dest && (
            <div className="mt-10 grid gap-4 sm:grid-cols-4 max-w-5xl pt-6 border-t border-white/15">
              <div className="bg-white/5 p-4 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#E4C99B] block">Average Tuition</span>
                <p className="mt-1 font-display text-2xl text-white">{dest.avgTuition}</p>
                <p className="mt-1 text-[11px] text-white/60">Annual course fee</p>
              </div>
              <div className="bg-white/5 p-4 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#E4C99B] block">Living Costs</span>
                <p className="mt-1 font-display text-2xl text-white">{dest.livingCost}</p>
                <p className="mt-1 text-[11px] text-white/60">Estimated annual budget</p>
              </div>
              <div className="bg-white/5 p-4 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#E4C99B] block">Post-Study Visa</span>
                <p className="mt-1 font-display text-2xl text-white">{dest.pswRights}</p>
                <p className="mt-1 text-[11px] text-white/60">Full-time stay back</p>
              </div>
              <div className="bg-white/5 p-4 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#E4C99B] block">Visa Success Rate</span>
                <p className="mt-1 font-display text-2xl text-white">{dest.visaRate}</p>
                <p className="mt-1 text-[11px] text-white/60">Verified candidate track</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top Universities Section */}
      {dest?.topUniversities && (
        <section className="mx-auto max-w-[1328px] px-5 py-16 sm:px-9 lg:px-14 border-b border-[#173969]/10">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9E8250]">Academic Excellence</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61]">
              Premier Universities in <em>{name}.</em>
            </h2>
            <p className="mt-2 text-sm text-[#5d6e85]">
              World-ranked institutions offering global recognition, competitive co-ops, and high-impact research:
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {dest.topUniversities.map((uni, i) => (
              <div key={i} className="border border-[#173969]/15 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold text-[#8A7145] uppercase tracking-wider bg-[#F4EFE6] px-2 py-0.5">
                      {uni.ranking}
                    </span>
                    <span className="text-[#6d7e97]">{uni.location}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-[#142E61]">{uni.name}</h3>
                  <p className="mt-2 text-xs text-[#5a6b82]">Acceptance: {uni.acceptanceRate}</p>
                  <p className="mt-1 text-xs font-semibold text-[#173969]">Avg. Fee: {uni.avgFee}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#173969]/10 text-[10px] font-bold uppercase tracking-wider text-[#A88C64]">
                  {uni.badge}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Rights & Jobs in this Country */}
      {workInfo && (
        <section className="bg-[#F0EBE2] px-5 py-16 sm:px-9 lg:px-14 border-b border-[#173969]/10">
          <div className="mx-auto max-w-[1328px]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#173969]/15 pb-8 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9E8250]">Employment Intelligence</span>
                <h2 className="mt-2 font-display text-4xl sm:text-5xl text-[#142E61]">
                  Work Rights &amp; Jobs in <em>{name}.</em>
                </h2>
                <p className="mt-2 text-sm text-[#5a6c84]">
                  Statutory minimum wage: <strong>{workInfo.minHourlyWage}</strong> · Term-time limit: <strong>{workInfo.termTimeHourLimit}</strong>
                </p>
              </div>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-[#173969] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#28528f]"
              >
                View All Global Jobs <ArrowRight size={16} />
              </Link>
            </div>

            {/* Jobs in this Country */}
            {countryJobs.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {countryJobs.map((job) => (
                  <div key={job.id} className="border border-[#173969]/15 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-bold text-[#8A7145] uppercase tracking-wider bg-[#F4EFE6] px-2 py-0.5">
                          {job.contractType}
                        </span>
                        <span className="text-[#65758c] flex items-center gap-1">
                          <MapPin size={12} /> {job.city}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl text-[#142E61]">{job.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-[#65768e]">{job.company}</p>
                      <p className="mt-3 text-xs text-[#52637a] line-clamp-2">{job.description}</p>
                      <div className="mt-4 text-xs font-bold text-[#173969] bg-[#FAF7F2] p-2.5 border border-[#173969]/10">
                        {job.compensation}
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#173969]/10 flex items-center justify-between">
                      <span className="text-[10px] text-[#78889d]">{job.field}</span>
                      <Link href="/jobs" className="text-xs font-bold text-[#173969] hover:underline flex items-center gap-1">
                        View Dossier →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white border border-[#173969]/15 text-center">
                <p className="text-sm text-[#5d6e85]">Explore active openings in the global jobs hub.</p>
                <Link href="/jobs" className="mt-4 inline-block bg-[#173969] text-white px-5 py-2 text-xs font-semibold uppercase">
                  Open Jobs Portal
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Visa & Requirements */}
      {dest?.visaRequirements && (
        <section className="mx-auto max-w-[1328px] px-5 py-16 sm:px-9 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9E8250]">Immigration Blueprint</span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61] leading-tight">
                Student Visa Requirements for <em>{name}.</em>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#596a80]">
                {dest.workPermitRules}
              </p>
            </div>
            <div className="lg:col-span-7 bg-white border border-[#173969]/15 p-6 sm:p-8 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E8250] mb-4">Mandatory Visa Checklist</h3>
              {dest.visaRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 text-xs leading-relaxed text-[#3b4c63]">
                  <CheckCircle2 size={16} className="text-[#173969] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consultation Section */}
      <section id="consultation" className="bg-[#EEE7DB] px-5 py-20 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase font-bold tracking-[0.24em] text-[#9A7D4C]">
            Direct Advisory with Harshita
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61]">
            Plan your admission to <em>{name}.</em>
          </h2>
          <p className="mt-4 text-sm text-[#5a6b82] max-w-xl mx-auto">
            Get personalized university selection, SOP review, scholarship evaluation, and visa guidance. Submit your enquiry below:
          </p>
        </div>
        <div className="mt-10 mx-auto max-w-[850px]">
          <FranceEnquiryForm />
        </div>
      </section>

      <AltheaFooter />
    </main>
  );
}