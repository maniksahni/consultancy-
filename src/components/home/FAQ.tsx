"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Language & Eligibility",
    question: "Do I need IELTS or TOEFL to study abroad?",
    answer:
      "Not necessarily! Many top universities in the UK, Germany, and Ireland accept Medium of Instruction (MOI) English waiver letters if your previous degree was taught in English (or 70%+ in 12th CBSE/ICSE English). Additionally, numerous partner institutions accept Duolingo English Test (DET) or PTE Academic, which can be taken online from home."
  },
  {
    category: "Admissions & Profile",
    question: "Can I apply with a low GPA or past academic study gaps?",
    answer:
      "Yes. International admissions committees take a holistic view of your profile. We help offset a modest GPA (e.g., 55-65%) or employment gaps with compelling Statements of Purpose (SOPs), verified work experience letters, certified online certifications, strong Letters of Recommendation (LORs), and targeted applications to universities with holistic review processes."
  },
  {
    category: "Financials & Visa",
    question: "How much bank balance is required for a student visa?",
    answer:
      "Typically, embassies require proof of funds covering 1st-year tuition fees plus 9 to 12 months of living expenses (usually £9k-£13k in the UK, $12k-$18k in the US, CAD $20,635 in Canada with GIC, or €11,208 in a German Blocked Account). We assist you in assembling authenticated sponsor affidavits, CA valuation summaries, and embassy-compliant financial dossiers."
  },
  {
    category: "Scholarships & Grants",
    question: "Are there scholarships available for Indian and International students?",
    answer:
      "Absolutely. Over 80% of our enrolled students receive partial or full-ride scholarships ranging from £2,000 to $20,000. These include institutional merit awards, early-bird fee discounts, and prestigious government fellowships (such as the Chevening, Fulbright-Nehru, Commonwealth, and DAAD scholarships). Our counselors guide your scholarship essays to maximize your odds."
  },
  {
    category: "Consultancy & Timelines",
    question: "When should I start my application process?",
    answer:
      "We strongly recommend starting 6 to 9 months prior to your target intake (e.g., start in Nov/Dec for the September/Fall intake). This leaves ample time for university shortlisting, transcript evaluations, SOP drafting, scholarship deadlines, and consular visa appointment booking."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <HelpCircle className="h-4 w-4" /> Got Questions? We Have Answers
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Everything you need to know about test waivers, proof-of-funds, academic gaps, and visa approval.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-blue-500/60 bg-slate-950 shadow-lg shadow-blue-500/5"
                    : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-600 text-white border-blue-500" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-800/60 mt-1">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Direct Help Banner */}
        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific doubt regarding your profile?</h4>
              <p className="text-xs text-slate-400">Speak directly to an ex-consular visa coach on WhatsApp.</p>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20GlobalEdu,%20I%20have%20a%20question%20regarding%20my%20study%20abroad%20profile."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-sm whitespace-nowrap"
          >
            <span>Ask on WhatsApp</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
