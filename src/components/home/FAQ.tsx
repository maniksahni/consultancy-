"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Canada Immigration Compliance",
    question: "What is the difference between SDS and Non-SDS study permit pathways for Canada?",
    answer:
      "The Student Direct Stream (SDS) is an expedited processing stream for legal residents of India and selected countries. Key statutory mandates for SDS include: (1) upfront purchase of a CAD $20,635 Guaranteed Investment Certificate (GIC) with an approved bank (Scotiabank, CIBC, or ICICI Bank Canada), (2) payment of full 1st-year tuition fees in advance, (3) minimum IELTS Academic score of 6.0 in each band (or CLB 7 in PTE/TEF), and (4) obtaining a Provincial Attestation Letter (PAL) from the designated learning institution (DLI)."
  },
  {
    category: "Germany Visa & APS Mandate",
    question: "How does the German Blocked Account (€11,208) and APS Certificate process work?",
    answer:
      "For Indian degree holders, the Academic Evaluation Centre (APS) certificate issued by the German Embassy in New Delhi is a mandatory prerequisite before applying for a §16b student visa or university admission. APS turnaround takes approximately 25–40 working days. In parallel, students must open a federally regulated Blocked Account (Sperrkonto) with €11,208 deposited via providers like Expatrio or Fintiba to prove living maintenance for the initial 12 months."
  },
  {
    category: "UK Visa Financial Holding Rule",
    question: "What is the UKVI 28-day financial holding rule for CAS sponsorship and Student Route Visas?",
    answer:
      "UK Visas and Immigration (UKVI) strictly mandates that all living maintenance funds (£1,023 per month outside London, or £1,334 per month within inner London, calculated for 9 consecutive months) plus remaining unpaid 1st-year tuition fees must be held in a recognized bank account for a continuous period of at least 28 days without dropping below the threshold by even one penny. The bank statement closing date cannot be older than 31 days on the date of online visa submission."
  },
  {
    category: "US F-1 Consular Interviews",
    question: "What are consular officers evaluating during the high-stakes F-1 visa interview?",
    answer:
      "Under Section 214(b) of the US Immigration and Nationality Act (INA), every F-1 applicant is legally presumed to have immigrant intent until they demonstrate otherwise. Consular officers evaluate three core pillars in 90 to 180 seconds: (1) Bona fide academic intent and knowledge of the specific university curriculum, (2) Liquid financial ability to fund the entire 1st-year total cost indicated on the Form I-20, and (3) Compelling ties to the home country and realistic post-study career ROI plans."
  },
  {
    category: "Australia Student Visa Subclass 500",
    question: "How does Australia's Genuine Student (GS) requirement differ from the old GTE rule?",
    answer:
      "The Department of Home Affairs replaced the Genuine Temporary Entrant (GTE) statement with the targeted Genuine Student (GS) assessment. The GS requirement focuses directly on: (1) Details of current circumstances (employment, family, community ties in home country), (2) An explanation of why the specific course and Australian education provider were chosen, (3) How the qualification will provide measurable economic return in the student's home country, and (4) Financial evidence of the updated AUD $29,710 annual living maintenance funds."
  },
  {
    category: "Statutory Part-Time Work Rights",
    question: "What are the legal part-time working hours and minimum wage rules across top countries?",
    answer:
      "Statutory work authorizations vary by country: (1) UK: 20 hours/week during term-time, full-time during vacations; (2) USA: 20 hours/week strictly on-campus during academic terms; (3) Canada: 20–24 hours/week off-campus during terms; (4) Australia: Up to 48 hours per fortnight with a statutory national minimum wage of AUD $24.10/hour; (5) Germany: 140 full days or 280 half days per calendar year; and (6) Ireland: 20 hours/week during semester, 40 hours/week during June–September and Christmas holidays."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#030712] border-b border-white/[0.08] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 border border-blue-500/25">
            <HelpCircle className="h-3.5 w-3.5" /> Statutory Immigration &amp; Compliance FAQ
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-[-0.03em] text-white font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Essential regulatory facts on blocked accounts, proof of funds holding rules, consular interviews, and post-study work permits.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden backdrop-blur-2xl ${
                  isOpen
                    ? "border-blue-500/40 bg-slate-900/80 shadow-[0_0_35px_rgba(59,130,246,0.15)]"
                    : "border-white/[0.08] bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60 shadow-lg"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="flex w-full items-center justify-between p-6 sm:p-7 text-left"
                >
                  <div className="space-y-1.5 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block font-mono">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-blue-600 text-white border-blue-500 shadow-md" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-white/[0.06]">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Compliance Helpline Banner */}
        <div className="mt-16 rounded-3xl border border-white/[0.08] bg-slate-900/60 p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-13 w-13 p-3.5 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex-shrink-0">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-display">Have a specific case question regarding backlogs or study gaps?</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Connect with a certified international education advisor for a confidential dossier review.</p>
            </div>
          </div>

          <a
            href="https://wa.me/33755749029?text=Hello%20GlobalEdu,%20I%20would%20like%20to%20request%20a%20statutory%20visa%20and%20profile%20evaluation."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-6 py-4 text-xs font-bold text-white transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] whitespace-nowrap active:scale-[0.98]"
          >
            <span>Consult on WhatsApp</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
