"use client";

import React from "react";
import { Star, ShieldCheck, Award, Quote, CheckCircle2, Sparkles } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  university: string;
  countryFlag: string;
  course: string;
  visaGrantDays: string;
  scholarship?: string;
  rating: number;
  quote: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    name: "Rohan Varma",
    university: "Northeastern University, Boston",
    countryFlag: "🇺🇸",
    course: "MS in Computer Science",
    visaGrantDays: "Visa Approved in 4 Days",
    scholarship: "$15,000 Dean's Merit Fellowship",
    rating: 5,
    quote:
      "GlobalEdu changed everything for me. My GPA was 7.6 and other consultancies were hesitant about top US universities. GlobalEdu mentored my SOP, highlighted my projects, and I got into Northeastern with a $15k scholarship! The consular mock interview prepared me perfectly."
  },
  {
    id: "t2",
    name: "Aisha Al-Mansoor",
    university: "University of Leeds",
    countryFlag: "🇬🇧",
    course: "MSc International Business & Management",
    visaGrantDays: "Visa Approved in 6 Days",
    scholarship: "£5,000 Global Excellence Award",
    rating: 5,
    quote:
      "The 1-year UK Masters route saved me so much time and money. GlobalEdu secured an IELTS waiver for me based on my school English, finalized my CAS in under a week, and I got my UK visa in 6 days without any hassle."
  },
  {
    id: "t3",
    name: "Arjun Mehta",
    university: "TU Munich (TUM)",
    countryFlag: "🇩🇪",
    course: "MSc Automotive & Software Engineering",
    visaGrantDays: "Visa Approved in 14 Days",
    scholarship: "100% Tuition-Free State University",
    rating: 5,
    quote:
      "Germany's APS process and blocked account requirements were intimidating. GlobalEdu guided me step-by-step through APS verification, set up my Expatrio blocked account, and drafted a compelling letter of motivation. Studying at TUM tuition-free is a dream come true."
  },
  {
    id: "t4",
    name: "Kavya Patel",
    university: "University of Melbourne",
    countryFlag: "🇦🇺",
    course: "Master of Data Science",
    visaGrantDays: "Visa Approved in 8 Days",
    scholarship: "AUD $10,000 International Grant",
    rating: 5,
    quote:
      "With Australia's new Genuine Student (GS) criteria, visa scrutiny is high. GlobalEdu prepared an airtight GS statement highlighting my career ROI. Got my subclass 500 visa in just 8 days! Highly recommended."
  },
  {
    id: "t5",
    name: "David Chen",
    university: "University of Waterloo",
    countryFlag: "🇨🇦",
    course: "Master of Engineering (Cloud Systems)",
    visaGrantDays: "Visa Approved in 12 Days",
    scholarship: "CAD $8,000 Entrance Bursary",
    rating: 5,
    quote:
      "Waterloo's co-op program is legendary. GlobalEdu made sure all provincial attestation letters (PAL) and GIC deposits were synchronized. The counsellor was available on WhatsApp even late at night to resolve my doubts."
  },
  {
    id: "t6",
    name: "Niamh O'Connor",
    university: "Trinity College Dublin",
    countryFlag: "🇮🇪",
    course: "MSc Big Data Analytics",
    visaGrantDays: "Visa Approved in 5 Days",
    scholarship: "€5,000 Global Merit Award",
    rating: 5,
    quote:
      "Dublin is the tech capital of Europe! GlobalEdu helped me secure admission at Trinity College Dublin, arranged student housing near campus, and their zero-forex card saved me thousands in exchange fees."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="h-4 w-4" /> 5,000+ Success Stories Worldwide
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Real Student Visa Success Stories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Read how our students achieved direct admits to Ivy League, Russell Group, and TU9 universities with full visa compliance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md hover:border-blue-400 group"
            >
              <div className="space-y-4">
                {/* Visa Grant Badge & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{item.visaGrantDays}</span>
                  </span>

                  <div className="flex items-center text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Student Quote */}
                <div className="relative">
                  <Quote className="h-8 w-8 text-slate-200 absolute -top-2 -left-1 -z-0 opacity-60" />
                  <p className="text-xs text-slate-600 leading-relaxed relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Scholarship Tag if awarded */}
                {item.scholarship && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 p-2 text-xs font-semibold text-amber-800">
                    <Award className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{item.scholarship}</span>
                  </div>
                )}
              </div>

              {/* Student Profile Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                    <span>{item.name}</span>
                    <span>{item.countryFlag}</span>
                  </div>
                  <div className="text-xs font-medium text-blue-600">
                    {item.course}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.university}
                  </div>
                </div>

                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
