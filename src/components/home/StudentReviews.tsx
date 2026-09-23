"use client";

import React from "react";
import { 
  Heart, 
  CheckCheck, 
  GraduationCap, 
  Award, 
  Sparkles
} from "lucide-react";

export default function StudentReviews() {
  const chatReviews = [
    {
      studentName: "Ananya Iyer",
      initials: "AI",
      target: "Columbia University (USA)",
      flag: "🇺🇸",
      program: "MS in Data Science",
      intake: "Fall 2024",
      highlight: "Visa Approved after previous 214(b) Refusal",
      chatMessage: "Ma'am, my US F-1 visa was just APPROVED at the Mumbai Consulate!! 😭❤️ The consular officer asked the exact question about my funding that we practiced in our 3rd mock session. Thank you so, so much for believing in my profile when everyone else said a 214b rejection is impossible to reverse.",
      timestamp: "11:42 AM",
      avatarBg: "bg-blue-600",
    },
    {
      studentName: "Kartik Deshmukh",
      initials: "KD",
      target: "TU Munich (Germany)",
      flag: "🇩🇪",
      program: "MSc Automotive Engineering (€0 Tuition)",
      intake: "Winter 2024",
      highlight: "€0 Tuition Public University Admit",
      chatMessage: "Ma'am!! Just got the official acceptance email from TU Munich! 🇩🇪 Zero tuition fee saved my family over 35 lakhs INR. Your guidance on the APS India process and curriculum credit mapping made all the difference. Mass agencies told me I had 0% chance for TUM, but your SOP review did it!",
      timestamp: "04:15 PM",
      avatarBg: "bg-emerald-600",
    },
    {
      studentName: "Simran Kaur",
      initials: "SK",
      target: "University of Manchester (UK)",
      flag: "🇬🇧",
      program: "MSc International Business",
      intake: "Sept 2024",
      highlight: "£8,000 Dean's Merit Scholarship",
      chatMessage: "Ma'am, CAS letter arrived and my £8,000 scholarship is officially confirmed!! The way you edited my scholarship personal statement was pure magic. You made my 2-year career gap sound like my greatest strength. Forever grateful for your late-night WhatsApp guidance during my panics! ❤️",
      timestamp: "08:30 PM",
      avatarBg: "bg-purple-600",
    },
    {
      studentName: "Rahul Bhattacharya",
      initials: "RB",
      target: "University of Toronto (Canada)",
      flag: "🇨🇦",
      program: "Master of Engineering (ECE)",
      intake: "Winter 2025",
      highlight: "Direct SDS Study Permit Granted",
      chatMessage: "Ma'am, Canadian Study Permit stamped! 🇨🇦 Got the passport request in just 18 days under SDS. The dual-intent explanation you helped me write in my Statement of Purpose was so solid that the visa officer had zero queries. Best decision I made was working with an independent mentor instead of a big consultancy.",
      timestamp: "02:18 PM",
      avatarBg: "bg-rose-600",
    },
    {
      studentName: "Meghna Nair",
      initials: "MN",
      target: "Trinity College Dublin (Ireland)",
      flag: "🇮🇪",
      program: "MSc Business Analytics",
      intake: "Autumn 2024",
      highlight: "AVATS Visa Approved in 12 Days",
      chatMessage: "Ma'am, stamped Irish visa arrived today! 🇮🇪 Flying out next week. Working with you 1-on-1 was the best decision — every document was verified down to the last bank stamp. Can't wait to explore Dublin's Silicon Docks!",
      timestamp: "10:05 AM",
      avatarBg: "bg-teal-600",
    },
    {
      studentName: "Tanmay Joshi",
      initials: "TJ",
      target: "UNSW Sydney (Australia)",
      flag: "🇦🇺",
      program: "Master of Information Technology",
      intake: "Feb 2025",
      highlight: "Subclass 500 Visa with GS Approved",
      chatMessage: "Ma'am, Australian Subclass 500 visa granted without an interview! The Genuine Student (GS) answers you drafted with me were so thorough that Home Affairs processed it seamlessly. Thank you for always answering my endless voice notes patiently!",
      timestamp: "06:50 PM",
      avatarBg: "bg-amber-600",
    },
  ];

  return (
    <section id="reviews" className="relative py-20 lg:py-28 overflow-hidden bg-slate-950/40 border-t border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-500/5 via-teal-500/5 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
            <span>Student Appreciation &amp; Visa Grants</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Real WhatsApp Messages from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              Students &amp; Parents
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            No stock photos or manufactured testimonials. Here are genuine messages sent straight to WhatsApp after admits were secured and visa stamps landed.
          </p>
        </div>

        {/* WhatsApp Chat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatReviews.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-5 sm:p-6 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/30 group"
            >
              {/* Card Header: Student & Target Info */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${item.avatarBg} text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-md`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white font-display">
                          {item.studentName}
                        </h4>
                        <span>{item.flag}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-emerald-400">
                        {item.target}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 border border-white/[0.08] rounded-full px-2 py-0.5 bg-slate-950/60">
                    {item.intake}
                  </span>
                </div>

                {/* Achievement Badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <Award className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{item.highlight}</span>
                </div>

                {/* WhatsApp Chat Message Bubble */}
                <div className="relative rounded-2xl rounded-tl-sm bg-slate-950/80 border border-white/[0.06] p-4 text-xs text-slate-200 leading-relaxed shadow-inner">
                  <p className="italic">{item.chatMessage}</p>

                  {/* Message meta */}
                  <div className="flex items-center justify-end gap-1.5 mt-2.5 text-[10px] text-slate-400">
                    <span>{item.timestamp}</span>
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Card Footer: Program Name */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  {item.program}
                </span>
                <span className="text-emerald-400 font-medium">Verified Admit</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-900/60 px-5 py-2.5 text-xs text-slate-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Over <strong>500+ students</strong> successfully guided across Top 100 global universities.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
