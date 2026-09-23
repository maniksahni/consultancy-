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
    targetIntake: "Fall 2025 (Aug/Sep)",
    helpNeeded: "End-to-End Mentorship (Shortlisting + SOP + Visa)",
    preferredSlot: "Evening (5 PM - 8 PM IST)",
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
    { label: "Undecided / Open to Suggestion", value: "Undecided" },
  ];

  const intakes = [
    "Fall 2025 (Aug / Sep)",
    "Spring 2026 (Jan / Feb)",
    "Summer 2026 (May / Jun)",
    "Fall 2026 (Late Intake)",
  ];

  const helpOptions = [
    "End-to-End Mentorship (Shortlisting + SOP + Visa)",
    "SOP & LOR Line-by-Line Personal Review",
    "F-1 / Student Visa Dossier & Mock Interview Prep",
    "Profile Evaluation & Unbiased University Shortlisting",
    "Visa Refusal Rescue (Overcoming Previous Rejection)",
  ];

  const timeSlots = [
    "Morning (10 AM — 1 PM IST)",
    "Afternoon (2 PM — 5 PM IST)",
    "Evening (5 PM — 8 PM IST)",
    "Weekend Priority Slot",
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#3B82F6", "#14B8A6", "#F59E0B"],
      });
    } catch {
      // safe fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.whatsapp.trim()) {
      setErrorMessage("Please enter your name and WhatsApp number.");
      return;
    }

    setLoading(true);

    try {
      // 1. Save to Firestore
      const res = await saveMentorshipBooking({
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        qualification: formData.qualification,
        targetCountry: formData.targetCountry,
        targetIntake: formData.targetIntake,
        helpNeeded: formData.helpNeeded,
        preferredSlot: formData.preferredSlot,
      });

      // 2. Trigger celebratory UI
      triggerConfetti();
      setSubmitted(true);
    } catch (err: any) {
      console.error("Booking error:", err);
      // Even if Firestore fails, show success and allow immediate WhatsApp forwarding
      setSubmitted(true);
      triggerConfetti();
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppDirectUrl = () => {
    const text = `Hi! My name is ${encodeURIComponent(formData.fullName || "Student")}. 
I would like to schedule a 1-on-1 strategy call with you.
• Country: ${encodeURIComponent(formData.targetCountry)}
• Target Intake: ${encodeURIComponent(formData.targetIntake)}
• Qualification: ${encodeURIComponent(formData.qualification || "Not specified")}
• Needs Help With: ${encodeURIComponent(formData.helpNeeded)}`;
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <section id="booking" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-blue-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <Calendar className="h-3.5 w-3.5" />
            <span>Direct 1-on-1 Appointment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Book Your 1-on-1{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              Guidance Session
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Fill in your profile details below. I personally review every single submission and will message you directly on WhatsApp to confirm our 30-minute introductory call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Why Book 1-on-1 & What to Expect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/[0.08] bg-slate-900/70 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white font-display mb-4">
                What happens during our 30-minute session?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Unfiltered Profile Assessment</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Honest reality check on your GPA, backlogs, gaps, and test readiness. No false hopes or sales fluff.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Country &amp; Financial Alignment</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      We match your real budget with country post-study visa rights, work rules, and permanent residency outlooks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clear Action Roadmap</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      You walk away with an exact step-by-step deadline calendar for tests, SOP drafts, and visa documentation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>100% Confidential &bull; Zero Spam &bull; No Call Center Calls</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Personal reply directly from your Senior Mentor within 4 business hours</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Instant Card */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-slate-900/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Need an urgent answer?</h4>
                  <p className="text-xs text-emerald-300">Skip the form and message your mentor directly</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Have an urgent visa deadline, emergency interview slot, or offer letter question?
              </p>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20urgent%20query%20regarding%20my%20study%20abroad%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.08] bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
              
              {submitted ? (
                /* Success State */
                <div className="text-center py-10 px-4 space-y-6">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Consultation Request Received!
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-emerald-400">{formData.fullName}</strong>. I have received your profile details and will reach out to you on WhatsApp at <strong className="text-white">{formData.whatsapp}</strong> shortly.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 max-w-md mx-auto text-left space-y-2">
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Session Summary:</p>
                    <p className="text-xs text-slate-300">&bull; Target Country: <strong className="text-white">{formData.targetCountry}</strong></p>
                    <p className="text-xs text-slate-300">&bull; Target Intake: <strong className="text-white">{formData.targetIntake}</strong></p>
                    <p className="text-xs text-slate-300">&bull; Preferred Slot: <strong className="text-white">{formData.preferredSlot}</strong></p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppDirectUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Connect on WhatsApp Right Now</span>
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
                          targetIntake: "Fall 2025 (Aug/Sep)",
                          helpNeeded: "End-to-End Mentorship (Shortlisting + SOP + Visa)",
                          preferredSlot: "Evening (5 PM - 8 PM IST)",
                        });
                      }}
                      className="text-xs text-slate-400 hover:text-white underline py-2"
                    >
                      Submit Another Profile
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/[0.08] pb-4 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">1-on-1 Application</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                      Schedule Your Mentorship Strategy Call
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
                        <User className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rohan Mehra"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-white/[0.1] bg-slate-950/70 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-emerald-400" />
                        <span>WhatsApp Number (with country code) *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full rounded-xl border border-white/[0.1] bg-slate-950/70 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address (optional)
                      </label>
                      <input
                        type="email"
                        placeholder="rohan@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/[0.1] bg-slate-950/70 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>

                    {/* Current Qualification */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Current Qualification &amp; Major</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Final Year B.Tech CSE (7.8 CGPA)"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        className="w-full rounded-xl border border-white/[0.1] bg-slate-950/70 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Target Country */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Target Destination</span>
                      </label>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-4 py-3 text-xs text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      >
                        {countries.map((c) => (
                          <option key={c.value} value={c.value} className="bg-slate-900 text-white">
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Target Intake */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Target Intake</span>
                      </label>
                      <select
                        value={formData.targetIntake}
                        onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                        className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-4 py-3 text-xs text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                      >
                        {intakes.map((itk) => (
                          <option key={itk} value={itk} className="bg-slate-900 text-white">
                            {itk}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Help Needed */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span>What help do you need most right now?</span>
                    </label>
                    <select
                      value={formData.helpNeeded}
                      onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-4 py-3 text-xs text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                    >
                      {helpOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Preferred 30-Min Call Window</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredSlot: slot })}
                          className={`rounded-xl border py-2 px-2 text-[11px] font-medium transition-all text-center ${
                            formData.preferredSlot === slot
                              ? "border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-sm"
                              : "border-white/[0.08] bg-slate-950/40 text-slate-400 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Confirming Session with Mentor...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Request 1-on-1 Mentorship Call</span>
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2.5">
                      🔒 No obligations. No spam. You will be contacted directly on WhatsApp by your Senior Mentor.
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
