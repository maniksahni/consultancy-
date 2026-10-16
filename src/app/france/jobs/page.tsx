"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Euro, ShieldCheck, CheckCircle2, Clock, Search, Filter, HelpCircle, FileText, ChevronRight, Building } from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import { franceJobsList, frenchWorkRegulations, type FranceJob } from "@/data/franceJobsData";
import JobModal from "@/components/althea/JobModal";
import FranceEnquiryForm from "@/components/althea/FranceEnquiryForm";

export default function FranceJobsPage() {
  const [selectedJob, setSelectedJob] = useState<FranceJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [q, setQ] = useState("");
  const [contractFilter, setContractFilter] = useState("All");
  const [fieldFilter, setFieldFilter] = useState("All");

  const contracts = ["All", ...Array.from(new Set(franceJobsList.map((j) => j.contractType)))];
  const fields = ["All", ...Array.from(new Set(franceJobsList.map((j) => j.field)))];

  const filtered = useMemo(() => {
    return franceJobsList.filter((j) => {
      const matchQuery = [j.title, j.company, j.location, j.description, j.field].join(" ").toLowerCase().includes(q.toLowerCase().trim());
      const matchContract = contractFilter === "All" || j.contractType === contractFilter;
      const matchField = fieldFilter === "All" || j.field === fieldFilter;
      return matchQuery && matchContract && matchField;
    });
  }, [q, contractFilter, fieldFilter]);

  const openJob = (job: FranceJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = (job: FranceJob) => {
    const el = document.getElementById("apply-portal");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]">
      <AltheaHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#142E61] px-5 pb-20 pt-12 text-white sm:px-9 sm:py-24 lg:px-14">
        <div aria-hidden className="pointer-events-none absolute -right-[8rem] -top-[6rem] h-[38rem] w-[38rem] rounded-full border border-white/10 shadow-[0_0_0_80px_rgba(255,255,255,.015)]" />
        <div className="relative mx-auto max-w-[1328px]">
          <Link href="/france" className="inline-flex min-h-11 items-center gap-2 text-xs text-white/65 hover:text-white">
            <ArrowLeft size={17} /> Study in France
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D7BA87]">
            Carrières & Emploi / Working in France
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,8.5vw,7.8rem)] leading-[0.9] tracking-[-0.05em]">
            Work in France.<br />
            <em className="font-normal text-[#E4C99B]">Built right into your future.</em>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            Understand your legal student work rights (up to 964 hours/year), paid internships (convention de stage), and the 2-Year Post-Study Work Visa (APS / RECE) for international graduates.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-4xl pt-6 border-t border-white/15">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#E4C99B]">Student Work Limit</p>
              <p className="mt-1 font-display text-2xl text-white">964 Hours / Year</p>
              <p className="mt-1 text-xs text-white/60">60% of standard legal time (approx. 20 hrs/week)</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#E4C99B]">Minimum Legal Wage</p>
              <p className="mt-1 font-display text-2xl text-white">€11.65 / hour (SMIC)</p>
              <p className="mt-1 text-xs text-white/60">Legal minimum gross wage across all sectors</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#E4C99B]">Post-Study Work Rights</p>
              <p className="mt-1 font-display text-2xl text-white">2-Year APS / RECE</p>
              <p className="mt-1 text-xs text-white/60">Bilateral agreement for Indian Master graduates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Work Framework & France Travail Overview */}
      <section className="mx-auto max-w-[1328px] px-5 py-16 sm:px-9 lg:px-14 lg:py-20 border-b border-[#173969]/10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9E8250]">Official French Labor Rules</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
              Know your rights as an <em>international student.</em>
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#576982]">
              France offers one of the most generous student work frameworks in the world. As an international student with a valid VLS-TS visa, you are legally permitted to work from your very first day in France without needing a separate temporary work permit.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
              <Clock size={24} className="text-[#9E8250]" />
              <h3 className="mt-4 font-display text-2xl">Part-Time Student Jobs</h3>
              <p className="mt-2 text-xs leading-6 text-[#576982]">
                Work up to 20 hours/week during term-time and up to 35 hours/week during university holidays. Average student earnings range from €600 to €900/month, comfortably covering living expenses.
              </p>
            </div>

            <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
              <Briefcase size={24} className="text-[#9E8250]" />
              <h3 className="mt-4 font-display text-2xl">Paid Internships (Stages)</h3>
              <p className="mt-2 text-xs leading-6 text-[#576982]">
                Any internship exceeding 2 consecutive months is mandated by French law to be paid at least €4.35/hour (~€650–€800/mo). Top Paris tech, finance, and luxury firms pay €1,200 to €1,800/month.
              </p>
            </div>

            <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
              <ShieldCheck size={24} className="text-[#9E8250]" />
              <h3 className="mt-4 font-display text-2xl">2-Year APS / RECE Visa</h3>
              <p className="mt-2 text-xs leading-6 text-[#576982]">
                Indian students graduating with a Master&apos;s degree qualify for a 2-Year Post-Study Work Visa (APS/RECE). You can work full-time in any sector and convert to a permanent work permit (Passeport Talent).
              </p>
            </div>

            <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
              <Building size={24} className="text-[#9E8250]" />
              <h3 className="mt-4 font-display text-2xl">France Travail Services</h3>
              <p className="mt-2 text-xs leading-6 text-[#576982]">
                {frenchWorkRegulations.franceTravailInfo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Explorer Section */}
      <section className="mx-auto max-w-[1328px] px-5 py-16 sm:px-9 lg:px-14 lg:py-20">
        <div className="border border-[#173969]/15 bg-[#F8F5EF] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#142E61]">Featured Roles in France</h2>
              <p className="mt-1 text-xs text-[#63748c]">Explore realistic openings tailored to international students and English-fluent graduates.</p>
            </div>
            <button
              type="button"
              onClick={() => { setQ(""); setContractFilter("All"); setFieldFilter("All"); }}
              className="text-xs font-semibold uppercase tracking-wider text-[#173969] hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#576884]">Search by Keyword</span>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3.5 text-[#8594ab]" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Paris, AI, finance, luxury..."
                  className="w-full min-h-11 border border-[#173969]/20 bg-white pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-[#B69C71]"
                />
              </div>
            </div>

            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#576884]">Contract Category</span>
              <select
                value={contractFilter}
                onChange={(e) => setContractFilter(e.target.value)}
                className="w-full min-h-11 border border-[#173969]/20 bg-white px-3 text-xs outline-none focus:ring-2 focus:ring-[#B69C71]"
              >
                {contracts.map((c) => (
                  <option key={c} value={c}>{c === "All" ? "All Contract Types" : c}</option>
                ))}
              </select>
            </div>

            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#576884]">Industry Field</span>
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="w-full min-h-11 border border-[#173969]/20 bg-white px-3 text-xs outline-none focus:ring-2 focus:ring-[#B69C71]"
              >
                {fields.map((f) => (
                  <option key={f} value={f}>{f === "All" ? "All Industries" : f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((job) => (
            <article
              key={job.id}
              className="flex flex-col justify-between border border-[#173969]/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B49A72] hover:shadow-xl"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88C64] bg-[#F4EFE6] px-2.5 py-1">
                    {job.contractType}
                  </span>
                  <span className="flex items-center gap-1 text-[#65758c]">
                    <MapPin size={13} /> {job.location}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl text-[#142E61] leading-tight">
                  {job.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#66778f]">{job.company}</p>

                <p className="mt-4 text-xs leading-6 text-[#4d5e75] line-clamp-3">
                  {job.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
                  <span className="border border-[#173969]/15 bg-[#F9F7F3] px-2.5 py-1 text-[#173969] font-medium">
                    {job.compensation}
                  </span>
                  <span className="border border-[#173969]/15 bg-[#F9F7F3] px-2.5 py-1 text-[#54657e]">
                    {job.languageRequired}
                  </span>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-[#173969]/15 pt-5">
                <span className="text-[11px] text-[#6d7e97]">{job.field}</span>
                <button
                  type="button"
                  onClick={() => openJob(job)}
                  className="inline-flex items-center gap-2 bg-[#173969] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2c528c] transition-colors"
                >
                  View Details <ChevronRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Application / Career Guidance Form */}
      <section id="apply-portal" className="bg-[#EEE7DB] px-5 py-20 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase font-bold tracking-[0.24em] text-[#9A7D4C]">Personalized Career & Education Advisory</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61]">
            Build your French career <em>with Harshita.</em>
          </h2>
          <p className="mt-4 text-sm text-[#5a6b82] max-w-xl mx-auto">
            From university shortlisting to French CV formatting, interview preparation, and post-study APS work rights. Submit your profile directly below:
          </p>
        </div>
        <div className="mt-10 mx-auto max-w-[850px]">
          <FranceEnquiryForm />
        </div>
      </section>

      {/* Active Modal */}
      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />

      <AltheaFooter />
    </main>
  );
}
