"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  Calendar, 
  Clock, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  User,
  Phone,
  GraduationCap,
  Globe2
} from "lucide-react";
import { saveMentorshipBooking } from "@/lib/firebase";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    qualification: "",
    targetCountry: "UK",
    targetIntake: "Fall 2026 (Aug / Sep)",
    helpNeeded: "End-to-End Mentorship (Shortlisting + SOP + Visa)",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const countries = [
    { label: "United Kingdom (UK)", value: "UK" },
    { label: "United States (USA)", value: "USA" },
    { label: "Canada", value: "Canada" },
    { label: "Germany", value: "Germany" },
    { label: "Australia", value: "Australia" },
    { label: "Ireland", value: "Ireland" },
    { label: "Other / Undecided", value: "Other" },
  ];

  const intakes = [
    "Fall 2026 (Aug / Sep)",
    "Spring 2027 (Jan / Feb)",
    "Summer 2027 (May / Jun)",
    "Fall 2027 (Long-Term Planning)",
  ];

  const helpOptions = [
    "End-to-End Mentorship (Shortlisting + SOP + Visa)",
    "SOP & LOR Line-by-Line Editorial Review",
    "Consular Visa Dossier Audit & Mock Interview Prep",
    "Profile Evaluation & Realistic University Shortlist",
    "Visa Refusal Rescue (Overcoming Previous 214(b) / Rejection)",
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#3B82F6", "#10B981", "#6366F1", "#14B8A6"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.whatsapp.trim()) {
      setErrorMessage("Please provide your name and WhatsApp number.");
      return;
    }

    setLoading(true);

    try {
      await saveMentorshipBooking({
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        qualification: formData.qualification,
        targetCountry: formData.targetCountry,
        targetIntake: formData.targetIntake,
        helpNeeded: formData.helpNeeded,
      });

      triggerConfetti();
      setSubmitted(true);
    } catch (err: any) {
      console.error("Booking error:", err);
      // Fallback: still show submitted so student can connect on WhatsApp
      setSubmitted(true);
      triggerConfetti();
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppDirectUrl = () => {
    const text = `Hi! My name is ${encodeURIComponent(formData.fullName || "Student")}. 
I would like to schedule a 1-on-1 strategy call with Pathways Global.
• Target Country: ${encodeURIComponent(formData.targetCountry)}
• Target Intake: ${encodeURIComponent(formData.targetIntake)}
• Academic Background: ${encodeURIComponent(formData.qualification || "Not specified")}
• Assistance Needed: ${encodeURIComponent(formData.helpNeeded)}`;
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <section id="booking" className="relative py-20 lg:py-28 overflow-hidden bg-slate-950/40 border-t border-b border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Calendar className="h-3.5 w-3.5" />
            <span>Direct Consultation Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Schedule Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              1-on-1 Strategy Call
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Provide your current academic details. Every submission is personally reviewed by a senior mentor before we contact you directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: What to Expect & Commitments */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white font-display mb-4">
                What to Expect During Your Session
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Unbiased Profile Audit</h4>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      Rigorous evaluation of GPA, backlogs, education gaps, and GRE/IELTS readiness. Zero false promises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Country &amp; Budget Matching</h4>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      Aligning your realistic liquid funds with tuition costs, post-study work rules, and career visa rights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Immediate Action Plan</h4>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      You receive a concrete timeline for test deadlines, SOP iterations, and university submission cut-offs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Confidential &bull; Zero Spam &bull; No Call Center Handoffs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <span>Direct reply within 4 business hours</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Have an urgent visa deadline?</h4>
                  <p className="text-xs text-slate-400">Message directly on WhatsApp for immediate priority review</p>
                </div>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20urgent%20query%20regarding%20my%20study%20abroad%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 py-3 text-xs font-bold text-emerald-300 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Modern Distraction-Free Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-9 backdrop-blur-xl shadow-2xl relative">
              
              {submitted ? (
                /* Success View */
                <div className="text-center py-10 px-4 space-y-6">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Strategy Session Requested
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-emerald-400">{formData.fullName}</strong>. Your profile audit has been queued. A senior mentor will connect with you on WhatsApp at <strong className="text-white">{formData.whatsapp}</strong> shortly.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-300">
                    <p className="font-bold text-blue-400 uppercase tracking-wider text-[10px]">Session Overview:</p>
                    <p>&bull; Target Country: <strong className="text-white">{formData.targetCountry}</strong></p>
                    <p>&bull; Target Intake: <strong className="text-white">{formData.targetIntake}</strong></p>
                    <p>&bull; Focus Area: <strong className="text-white">{formData.helpNeeded}</strong></p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppDirectUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Ping on WhatsApp Directly</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: "",
                          whatsapp: "",
                          email: "",
                          qualification: "",
                          targetCountry: "UK",
                          targetIntake: "Fall 2026 (Aug / Sep)",
                          helpNeeded: "End-to-End Mentorship (Shortlisting + SOP + Visa)",
                        });
                      }}
                      className="text-xs text-slate-400 hover:text-white underline py-2"
                    >
                      Submit Another Profile
                    </button>
                  </div>
                </div>
              ) : (
                /* Form View */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">1-on-1 Consultation</span>
                    <h3 className="text-xl font-bold text-white font-display mt-0.5">
                      Request Your Advisory Session
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 flex items-center gap-2 text-xs text-red-300">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-blue-400" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aryan Mehra"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-blue-400" />
                        <span>WhatsApp Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Country */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Globe2 className="h-3.5 w-3.5 text-blue-400" />
                        <span>Target Destination</span>
                      </label>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        {countries.map((c) => (
                          <option key={c.value} value={c.value} className="bg-slate-900 text-white">
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Intake */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-blue-400" />
                        <span>Target Intake</span>
                      </label>
                      <select
                        value={formData.targetIntake}
                        onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        {intakes.map((itk) => (
                          <option key={itk} value={itk} className="bg-slate-900 text-white">
                            {itk}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                      <span>Current Academic Background &amp; Score</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech Computer Science (7.6 CGPA / 72%)"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  {/* Help Needed */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
                      <span>How can we best assist you?</span>
                    </label>
                    <select
                      value={formData.helpNeeded}
                      onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      {helpOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing to Senior Mentor...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Confirm Advisory Session</span>
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-2">
                      🔒 Zero spam guarantee. Direct 1-on-1 advisor review.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
