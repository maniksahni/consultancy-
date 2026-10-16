"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Building,
  Euro,
  Calculator,
  Compass,
  FileText,
  MapPin
} from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import type { FrenchGuide } from "@/data/franceGuides";
import ScholarshipsHub from "@/components/althea/ScholarshipsHub";
import { settlementGuides, cityLivingCosts } from "@/data/franceLivingData";
import FranceEnquiryForm from "@/components/althea/FranceEnquiryForm";

export default function FranceGuidePage({ guide }: { guide: FrenchGuide }) {
  // Visas: Interactive financial requirement simulator
  const [stayMonths, setStayMonths] = useState(12);
  const minMonthlyBudget = 615;
  const requiredTotalEuros = stayMonths * minMonthlyBudget;
  const estimatedTotalINR = Math.round(requiredTotalEuros * 92); // ~92 INR/EUR

  // Living: Interactive CAF Calculator
  const [rentAmount, setRentAmount] = useState(550);
  const [isParis, setIsParis] = useState(true);
  const estimatedCafMonthly = Math.round(Math.min(rentAmount * 0.35, isParis ? 220 : 160));

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FCFAF6] text-[#173563]">
      <AltheaHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#142E61] px-5 pb-20 pt-12 text-white sm:px-9 sm:py-24 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8rem] -top-[6rem] h-[38rem] w-[38rem] rounded-full border border-white/10 shadow-[0_0_0_80px_rgba(255,255,255,.015)]"
        />
        <div className="relative mx-auto max-w-[1328px]">
          <Link href="/france" className="inline-flex min-h-11 items-center gap-2 text-xs text-white/65 hover:text-white">
            <ArrowLeft size={17} /> Back to France
          </Link>
          <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D7BA87]">{guide.eyebrow}</p>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.6rem,9vw,8rem)] leading-[0.89] tracking-[-0.05em]">
            {guide.title}
            <br />
            <em className="font-normal text-[#E4C99B]">{guide.accent}</em>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">{guide.summary}</p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-[1328px] px-5 py-20 sm:px-9 lg:px-14 lg:py-28">
        {/* Render ScholarshipsHub if slug is scholarships */}
        {guide.slug === "scholarships" && <ScholarshipsHub />}

        {/* Render Visas Hub if slug is visas */}
        {guide.slug === "visas" && (
          <div className="space-y-16">
            {/* Financial Requirement Calculator */}
            <div className="border border-[#173969]/15 bg-[#F2EDE5] p-6 sm:p-10 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#A88C64]">
                Financial Guarantee Requirement
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-[#142E61]">
                Official French Student Visa <em>Proof of Funds.</em>
              </h2>
              <p className="mt-2 text-xs text-[#5e6f85] max-w-2xl leading-relaxed">
                French immigration law mandates a minimum verifiable proof of living funds of €615 per month for the duration of your academic year.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 border border-[#173969]/15 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#142E61] mb-1">
                      <span>Duration of Academic Stay: {stayMonths} Months</span>
                      <span className="text-[#A88C64]">Standard = 12 mos</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="24"
                      value={stayMonths}
                      onChange={(e) => setStayMonths(Number(e.target.value))}
                      className="w-full accent-[#173969] cursor-pointer"
                    />
                  </div>
                  <div className="pt-2 text-xs text-[#6e7e95] leading-relaxed">
                    Accepted proof formats: 3 months official bank statements in candidate or sponsor&apos;s name, nationalized bank education loan sanction letter, or French scholarship grant certificate.
                  </div>
                </div>

                <div className="bg-[#173969] text-white p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C99D]">
                      Minimum Required Bank Balance
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-4xl text-white">€{requiredTotalEuros.toLocaleString()}</span>
                      <span className="text-xs text-white/70">total</span>
                    </div>
                    <p className="mt-1 text-xs text-[#E5C99D]">Approx. ₹{estimatedTotalINR.toLocaleString()} INR</p>
                  </div>
                  <p className="mt-4 text-[11px] text-white/70 pt-3 border-t border-white/15">
                    Calculated at official base rate €615/mo. Tuition fees must be accounted for separately.
                  </p>
                </div>
              </div>
            </div>

            {/* VFS Global & France-Visas 5-Step Internal Process */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A7D4C]">Step-by-Step Blueprint</span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl text-[#142E61]">Your VLS-TS Application Roadmap</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {settlementGuides.visaDetails.vfsProcess.map((step, idx) => (
                  <div key={idx} className="border border-[#173969]/15 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-[#A88C64] uppercase tracking-widest">Stage 0{idx + 1}</span>
                    <p className="mt-3 text-xs leading-6 text-[#3b4c63] font-medium">{step}</p>
                    <div className="mt-4 pt-3 border-t border-[#173969]/10 text-[10px] text-[#78899f] uppercase tracking-wider">
                      Verified Guidance
                    </div>
                  </div>
                ))}
                <div className="border border-[#173969]/15 bg-[#F4EFE6] p-6 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#A88C64] uppercase tracking-widest">Arrival in France</span>
                  <p className="mt-3 text-xs leading-6 text-[#3b4c63] font-medium">
                    {settlementGuides.visaDetails.ofiiOnlineValidation}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#173969]/10 text-[10px] text-[#78899f] uppercase tracking-wider">
                    Online OFII Validation
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Living Hub if slug is living */}
        {guide.slug === "living" && (
          <div className="space-y-16">
            {/* Interactive CAF Housing Subsidy Calculator */}
            <div className="border border-[#173969]/15 bg-[#F2EDE5] p-6 sm:p-10 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#A88C64]">
                French Government Housing Grant
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-[#142E61]">
                CAF / APL Monthly Subsidy <em>Calculator.</em>
              </h2>
              <p className="mt-2 text-xs text-[#5e6f85] max-w-2xl leading-relaxed">
                Under French social law, every international student is legally entitled to monthly financial housing assistance (APL / ALS) credited directly into their French bank account!
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 border border-[#173969]/15 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#142E61] mb-1">
                      <span>Monthly Rent: €{rentAmount} / month</span>
                    </div>
                    <input
                      type="range"
                      min="250"
                      max="1200"
                      value={rentAmount}
                      onChange={(e) => setRentAmount(Number(e.target.value))}
                      className="w-full accent-[#173969] cursor-pointer"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#79889d] block mb-2">Location Zone</label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsParis(true)}
                        className={`flex-1 py-2 text-xs font-semibold border ${
                          isParis ? "bg-[#173969] text-white border-[#173969]" : "bg-white text-[#576982] border-[#173969]/20"
                        }`}
                      >
                        Paris & Île-de-France
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsParis(false)}
                        className={`flex-1 py-2 text-xs font-semibold border ${
                          !isParis ? "bg-[#173969] text-white border-[#173969]" : "bg-white text-[#576982] border-[#173969]/20"
                        }`}
                      >
                        Regional Cities (Lyon, Bordeaux, etc.)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#173969] text-white p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C99D]">
                      Estimated CAF Refund to You
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-4xl text-white">€{estimatedCafMonthly}</span>
                      <span className="text-xs text-white/70">/ month back</span>
                    </div>
                    <p className="mt-1 text-xs text-[#E5C99D]">
                      Net effective rent: €{rentAmount - estimatedCafMonthly} / month
                    </p>
                  </div>
                  <p className="mt-4 text-[11px] text-white/70 pt-3 border-t border-white/15">
                    Official benefit paid directly by Caisse d&apos;Allocations Familiales. 100% legal right for international students.
                  </p>
                </div>
              </div>
            </div>

            {/* Essential Settlement Modules */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
                <ShieldCheck size={24} className="text-[#9E8250]" />
                <h3 className="mt-4 font-display text-2xl text-[#142E61]">{settlementGuides.healthInsurance.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#576982]">{settlementGuides.healthInsurance.summary}</p>
                <div className="mt-4 pt-3 border-t border-[#173969]/10 text-xs font-bold text-[#173969]">
                  Cost: {settlementGuides.healthInsurance.cost} (100% Free)
                </div>
              </div>

              <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
                <Building size={24} className="text-[#9E8250]" />
                <h3 className="mt-4 font-display text-2xl text-[#142E61]">{settlementGuides.banking.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#576982]">{settlementGuides.banking.summary}</p>
                <div className="mt-4 pt-3 border-t border-[#173969]/10 text-xs font-bold text-[#173969]">
                  BNP Paribas · Revolut · SocGen
                </div>
              </div>

              <div className="border border-[#173969]/15 bg-white p-6 shadow-sm">
                <Compass size={24} className="text-[#9E8250]" />
                <h3 className="mt-4 font-display text-2xl text-[#142E61]">Navigo Imagine R Transit</h3>
                <p className="mt-2 text-xs leading-6 text-[#576982]">
                  Students under 26 in Paris receive an Imagine R student transit pass (€375/year = ~€31/mo) with unlimited travel across all 5 zones of Île-de-France (metro, buses, trams, RER).
                </p>
                <div className="mt-4 pt-3 border-t border-[#173969]/10 text-xs font-bold text-[#173969]">
                  Unlimited Paris Metro & RER
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Costs Hub if slug is costs */}
        {guide.slug === "costs" && (
          <div className="space-y-16">
            <div className="border border-[#173969]/15 bg-white p-6 sm:p-10 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A7D4C]">
                Comparative Budget Table
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-[#142E61]">
                Real Student Living Costs by <em>French City.</em>
              </h2>
              <p className="mt-2 text-xs text-[#5e6f85] max-w-2xl leading-relaxed">
                Costs in France vary significantly between Paris and regional tech/university cities. Compare real net budgets after factoring in CAF housing subsidies:
              </p>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-xs text-[#3b4c63] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#173969] bg-[#F2EDE5] text-[#142E61] uppercase tracking-wider text-[10px]">
                      <th className="p-3.5">City & Region</th>
                      <th className="p-3.5">Studio Rent (Avg)</th>
                      <th className="p-3.5">Monthly Groceries</th>
                      <th className="p-3.5">Transport</th>
                      <th className="p-3.5 text-[#8F7240]">CAF Subsidy</th>
                      <th className="p-3.5 font-bold text-[#173969]">Total Net Budget</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#173969]/10">
                    {cityLivingCosts.map((c, i) => (
                      <tr key={i} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="p-3.5 font-bold text-[#142E61]">{c.city}</td>
                        <td className="p-3.5">{c.rentPrivateStudio}</td>
                        <td className="p-3.5">{c.monthlyGroceries}</td>
                        <td className="p-3.5">{c.publicTransportMonthly}</td>
                        <td className="p-3.5 text-[#8F7240] font-semibold">{c.averageCafSubsidy}</td>
                        <td className="p-3.5 font-bold text-[#173969] bg-[#F4EFE6]/50">{c.totalNetMonthlyEstimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* General Overview Cards */}
        {guide.slug !== "scholarships" && guide.slug !== "visas" && guide.slug !== "living" && guide.slug !== "costs" && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guide.entries.map((entry, i) => (
              <article
                key={entry.title}
                className="flex min-h-[280px] flex-col border border-[#173969]/15 bg-[#F2EDE5] p-7 transition-all hover:-translate-y-1 hover:border-[#B79D74] hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[.25em] text-[#A38A62]">{String(i + 1).padStart(2, "0")}</span>
                  <BookOpen size={22} strokeWidth={1.3} aria-hidden />
                </div>
                <h3 className="mt-8 font-display text-3xl leading-tight text-[#142E61]">{entry.title}</h3>
                <p className="mt-4 flex-1 text-xs leading-relaxed text-[#566981]">{entry.description}</p>
                <div className="mt-6 border-t border-[#173969]/15 pt-4 text-[10px] font-semibold uppercase tracking-[.09em] text-[#244878]">
                  Verified Guidance Dossier
                </div>
              </article>
            ))}
          </div>
        )}

        {/* FAQ Section */}
        {guide.questions && (
          <div className="mt-20 border-t border-[#173969]/15 pt-16">
            <span className="text-xs uppercase font-bold tracking-[0.24em] text-[#A88C64]">Direct Answers</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61]">
              Essential questions <em>answered.</em>
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {guide.questions.map((item, i) => (
                <article className="bg-white border border-[#173969]/15 p-6 sm:p-8 shadow-sm" key={item.q}>
                  <span className="text-[11px] font-bold tracking-[.22em] text-[#A38A62]">
                    Q{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-[#142E61]">{item.q}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#57677C]">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* On-site Consultation Section */}
      <section id="consultation" className="bg-[#EEE7DB] px-5 py-20 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase font-bold tracking-[0.24em] text-[#9A7D4C]">
            Direct Guidance with Harshita
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61]">
            Plan your journey <em>without external stress.</em>
          </h2>
          <p className="mt-4 text-sm text-[#5a6b82] max-w-xl mx-auto">
            Get personalized university selection, scholarship dossiers, and visa guidance. Submit your enquiry below:
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
