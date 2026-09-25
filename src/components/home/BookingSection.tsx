"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Clock,
  MessageCircle,
  Check,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { saveMentorshipBooking } from "@/lib/firebase";
import { getStoredUTMParams } from "@/lib/utm";

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
  const [fieldErrors, setFieldErrors] = useState<{ fullName?: string; whatsapp?: string }>({});
  const [showFullForm, setShowFullForm] = useState(false);

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
        particleCount: 55,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#C25B1A", "#F2EDE4", "#14120C", "#E0D9CE"],
      });
    } catch {
      // safe
    }
  };

  const sanitizeInput = (str: string | undefined | null, maxLength = 100): string => {
    if (!str) return "";
    return str
      .replace(/<[^>]*>/g, "")
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .trim()
      .slice(0, maxLength);
  };

  const getWhatsAppDirectUrl = (overrides?: {
    fullName?: string;
    whatsapp?: string;
    qualification?: string;
    targetCountry?: string;
    targetIntake?: string;
    helpNeeded?: string;
  }) => {
    const name = sanitizeInput(overrides?.fullName ?? formData.fullName, 100) || "Student";
    const phone = (overrides?.whatsapp ?? formData.whatsapp).replace(/\D/g, "").slice(0, 10) || "—";
    const country = overrides?.targetCountry ?? formData.targetCountry;
    const intake = overrides?.targetIntake ?? formData.targetIntake;
    const qual = sanitizeInput(overrides?.qualification ?? formData.qualification, 250) || "Not specified";
    const help = overrides?.helpNeeded ?? formData.helpNeeded;

    const messageLines = [
      `Hi! My name is ${name}.`,
      "I would like to schedule a 1-on-1 strategy call with Pathways Global.",
      `• My WhatsApp: +91 ${phone}`,
      `• Target Country: ${country}`,
      `• Target Intake: ${intake}`,
      `• Academic Background: ${qual}`,
      `• Assistance Needed: ${help}`,
    ];

    return `https://wa.me/33755749029?text=${encodeURIComponent(messageLines.join("\n"))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedFullName = sanitizeInput(formData.fullName, 100);
    const sanitizedWhatsapp = formData.whatsapp.replace(/\D/g, "").slice(0, 10);
    const sanitizedQualification = sanitizeInput(formData.qualification, 250);
    const sanitizedEmail = formData.email ? sanitizeInput(formData.email, 100) : "";

    const errors: { fullName?: string; whatsapp?: string } = {};
    if (!sanitizedFullName) {
      errors.fullName = "Please enter your full name.";
    }
    if (!sanitizedWhatsapp || sanitizedWhatsapp.length !== 10) {
      errors.whatsapp = "Please enter a valid 10-digit WhatsApp number.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    const waUrl = getWhatsAppDirectUrl({
      fullName: sanitizedFullName,
      whatsapp: sanitizedWhatsapp,
      qualification: sanitizedQualification,
      targetCountry: formData.targetCountry,
      targetIntake: formData.targetIntake,
      helpNeeded: formData.helpNeeded,
    });
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setLoading(true);

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 1500));
    const firestoreSave = (async () => {
      const utm = getStoredUTMParams();
      await saveMentorshipBooking({
        fullName: sanitizedFullName,
        whatsapp: sanitizedWhatsapp,
        email: sanitizedEmail || undefined,
        qualification: sanitizedQualification,
        targetCountry: formData.targetCountry,
        targetIntake: formData.targetIntake,
        helpNeeded: formData.helpNeeded,
        ...(utm ? { utm } : {}),
      });
    })();
    const timeout = new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 5000)
    );

    try {
      await Promise.race([
        Promise.all([minDelay, firestoreSave]),
        timeout,
      ]);
    } catch {
      await minDelay;
    } finally {
      setLoading(false);
      triggerConfetti();
      setSubmitted(true);
    }
  };

  return (
    <section
      id="booking"
      className="bg-[#14120C] text-cream py-space-5 sm:py-space-6 lg:py-space-7 overflow-hidden w-full relative"
    >
      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16">

        {/* ── Section Header: Calibrated negative space, monumental typography ── */}
        <div className="border-t border-cream/10 pt-space-3 sm:pt-space-4 lg:pt-space-5 mb-space-4 sm:mb-space-5 lg:mb-space-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-6">
                Direct Consultation Booking
              </div>
              <h2 className="font-display font-normal text-cream leading-[0.88] tracking-[-0.035em] text-[clamp(2.15rem,9.5vw,3rem)] sm:text-6xl lg:text-7xl xl:text-8xl break-words">
                Schedule Your<br />
                {/* Exactly ONE terracotta accent in this entire section */}
                <span className="text-terra italic inline-block pr-1">1-on-1 Strategy Call.</span>
              </h2>
            </div>
            <p className="text-cream/65 text-base sm:text-lg font-light leading-relaxed max-w-md">
              Provide your current academic details. Every submission is personally reviewed by a senior mentor before we contact you directly on WhatsApp.
            </p>
          </div>
        </div>

        {/* ── MOBILE FORM (Flat, Sharp, 0px radius, 1px hairlines) ── */}
        <div className="lg:hidden">
          {submitted ? (
            <div className="border border-cream/15 p-8 text-center space-y-6 rounded-none bg-cream/[0.02]">
              <div className="h-12 w-12 mx-auto border border-cream/30 flex items-center justify-center">
                <Check className="h-6 w-6 text-cream" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono block mb-2">
                  Admissions Dossier Queued
                </span>
                <h3 className="font-display text-2xl font-normal text-cream tracking-tight">
                  Strategy Session Confirmed
                </h3>
                <p className="text-cream/70 text-sm mt-3 leading-relaxed font-light">
                  Thank you, <strong className="text-cream font-medium">{formData.fullName}</strong>. A dedicated senior mentor will evaluate your background and connect on WhatsApp at{" "}
                  <strong className="text-cream font-medium">+91 {formData.whatsapp}</strong>.
                </p>
                <div className="mt-4 p-4 border border-cream/10 text-xs text-cream/70 font-light flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cream/40 flex-shrink-0" />
                  <span>Guaranteed mentor reply within <strong className="text-cream font-medium">4 hours</strong> (Mon–Sat).</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-cream/10">
                <p className="text-center text-cream/40 text-xs font-light">
                  WhatsApp should open automatically.{" "}
                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream underline underline-offset-4"
                  >
                    Tap here if it didn&apos;t open.
                  </a>
                </p>
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
                  className="w-full text-cream/40 hover:text-cream text-xs py-2 uppercase tracking-widest font-mono"
                >
                  Submit Another Profile
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="border border-cream/15 p-6 sm:p-8 space-y-6 rounded-none bg-cream/[0.02]">
              <div className="border-b border-cream/10 pb-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-1">
                  1-on-1 Direct Advisory
                </div>
                <h3 className="font-display text-2xl font-normal text-cream">
                  Request Strategy Session
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan Mehra"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined });
                    }}
                    className={`w-full bg-cream/[0.03] border border-cream/15 px-4 py-3.5 text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-cream/60 rounded-none ${
                      fieldErrors.fullName ? "border-cream/60" : ""
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-cream/80 text-xs font-mono mt-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-cream/60 flex-shrink-0" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    value={formData.whatsapp}
                    onKeyDown={(e) => {
                      const allowed = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
                      if (allowed.includes(e.key)) return;
                      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                    }}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setFormData({ ...formData, whatsapp: digits });
                      if (fieldErrors.whatsapp) setFieldErrors({ ...fieldErrors, whatsapp: undefined });
                    }}
                    className={`w-full bg-cream/[0.03] border border-cream/15 px-4 py-3.5 text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-cream/60 rounded-none ${
                      fieldErrors.whatsapp ? "border-cream/60" : ""
                    }`}
                  />
                  {fieldErrors.whatsapp && (
                    <p className="text-cream/80 text-xs font-mono mt-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-cream/60 flex-shrink-0" />
                      <span>{fieldErrors.whatsapp}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                    Target Destination
                  </label>
                  <select
                    value={formData.targetCountry}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full bg-[#14120C] border border-cream/15 px-4 py-3.5 text-cream text-sm focus:outline-none focus:border-cream/60 rounded-none"
                  >
                    {countries.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFullForm((prev) => !prev)}
                    className="text-left text-[10px] uppercase tracking-[0.2em] text-cream/60 hover:text-cream flex items-center gap-2 font-mono"
                  >
                    <span>{showFullForm ? "– Hide optional details" : "+ Add intake & academic details"}</span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {showFullForm && (
                    <motion.div
                      key="collapsible-form"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden space-y-4 pt-4 border-t border-cream/10"
                    >
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                          Target Intake
                        </label>
                        <select
                          value={formData.targetIntake}
                          onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                          className="w-full bg-[#14120C] border border-cream/15 px-4 py-3.5 text-cream text-sm focus:outline-none focus:border-cream/60 rounded-none"
                        >
                          {intakes.map((itk) => (
                            <option key={itk} value={itk}>{itk}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                          Academic Background
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. B.Tech CS (7.6 CGPA)"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          className="w-full bg-cream/[0.03] border border-cream/15 px-4 py-3.5 text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-cream/60 rounded-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                          Assistance Needed
                        </label>
                        <select
                          value={formData.helpNeeded}
                          onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                          className="w-full bg-[#14120C] border border-cream/15 px-4 py-3.5 text-cream text-sm focus:outline-none focus:border-cream/60 rounded-none"
                        >
                          {helpOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4 border-t border-cream/10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cream text-ink hover:bg-cream/90 disabled:opacity-50 py-5 rounded-none text-[11px] uppercase tracking-[0.22em] font-medium transition-colors inline-flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                        Routing to Senior Mentor…
                      </>
                    ) : (
                      <>
                        <span>Confirm Advisory Session</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-[0.2em] text-cream/30 font-mono mt-3">
                    No cost · Direct mentor review
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ── DESKTOP DUAL COLUMN (Flat, 0px radius, 1px hairlines) ── */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: What to Expect & Instant Direct Chat */}
          <div className="col-span-5 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono block mb-2">
                Session Structure
              </span>
              <h3 className="font-display text-3xl font-normal text-cream leading-tight">
                What to Expect During Your Strategy Call
              </h3>
            </div>

            <div className="border-t border-cream/10 divide-y divide-cream/10">
              {[
                {
                  number: "01",
                  title: "Unbiased Profile Audit",
                  desc: "Rigorous evaluation of GPA, backlogs, education gaps, and GRE/IELTS readiness. Zero false promises.",
                },
                {
                  number: "02",
                  title: "Country & Budget Matching",
                  desc: "Aligning your realistic liquid funds with tuition costs, post-study work rules, and career visa rights.",
                },
                {
                  number: "03",
                  title: "Immediate Action Plan",
                  desc: "You receive a concrete timeline for test deadlines, SOP iterations, and university submission cut-offs.",
                },
              ].map((item) => (
                <div key={item.number} className="py-6 flex items-start gap-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-cream/40 font-mono pt-1">
                    {item.number}
                  </span>
                  <div>
                    <h4 className="font-display text-xl text-cream font-normal mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-cream/60 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgent Priority Review Box */}
            <div className="border border-cream/15 p-8 bg-cream/[0.02]">
              <div className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-2">
                Urgent Intake Deadline?
              </div>
              <p className="text-sm text-cream/70 font-light mb-6">
                Message directly on WhatsApp for immediate priority review by an active senior mentor.
              </p>
              <a
                href="https://wa.me/33755749029?text=Hi!%20I%20have%20an%20urgent%20query%20regarding%20my%20study%20abroad%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 border border-cream/20 hover:border-cream/50 text-cream px-6 py-4 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-cream/70" />
                <span>Open Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Form */}
          <div className="col-span-7">
            {submitted ? (
              <div className="border border-cream/15 p-12 lg:p-16 text-center space-y-8 bg-cream/[0.02] rounded-none">
                <div className="h-16 w-16 mx-auto border border-cream/30 flex items-center justify-center">
                  <Check className="h-8 w-8 text-cream" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono block mb-3">
                    Admissions Dossier Queued
                  </span>
                  <h3 className="font-display text-3xl lg:text-4xl font-normal text-cream tracking-tight">
                    Strategy Session Confirmed
                  </h3>
                  <p className="text-cream/70 text-base mt-4 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong className="text-cream font-medium">{formData.fullName}</strong>. Your profile audit has been registered. A senior mentor will evaluate your background and connect on WhatsApp at{" "}
                    <strong className="text-cream font-medium">+91 {formData.whatsapp}</strong>.
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 border border-cream/10 px-5 py-3 text-xs text-cream/70 font-light">
                    <Clock className="w-4 h-4 text-cream/40 flex-shrink-0" />
                    <span>Direct Advisory Guarantee: Personal mentor reply within <strong className="text-cream font-medium">4 hours</strong> (Mon–Sat).</span>
                  </div>
                </div>

                <div className="border border-cream/10 p-6 max-w-md mx-auto text-left text-xs space-y-3 text-cream/50">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-cream/70 font-mono mb-2">Session Overview</div>
                  <div className="flex justify-between border-b border-cream/10 pb-2">
                    <span>Target Country:</span>
                    <strong className="text-cream">{formData.targetCountry}</strong>
                  </div>
                  <div className="flex justify-between border-b border-cream/10 pb-2">
                    <span>Target Intake:</span>
                    <strong className="text-cream">{formData.targetIntake}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Advisory Scope:</span>
                    <strong className="text-cream">{formData.helpNeeded}</strong>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-4 border-t border-cream/10">
                  <p className="text-cream/40 text-xs font-light">
                    WhatsApp should have opened automatically.{" "}
                    <a
                      href={getWhatsAppDirectUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream underline underline-offset-4"
                    >
                      Click here if it didn&apos;t.
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "", whatsapp: "", email: "", qualification: "",
                        targetCountry: "UK",
                        targetIntake: "Fall 2026 (Aug / Sep)",
                        helpNeeded: "End-to-End Mentorship (Shortlisting + SOP + Visa)",
                      });
                    }}
                    className="text-cream/30 hover:text-cream text-xs uppercase tracking-widest font-mono pt-2"
                  >
                    Submit Another Profile
                  </button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="border border-cream/15 p-10 lg:p-12 space-y-8 bg-cream/[0.02] rounded-none">
                <div className="border-b border-cream/10 pb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono block mb-2">
                    Direct Advisory Form
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-normal text-cream">
                    Request Your Advisory Session
                  </h3>
                </div>

                {/* Name + WhatsApp */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Mehra"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined });
                      }}
                      className={`w-full bg-cream/[0.03] border border-cream/15 px-4 py-4 text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-cream/60 rounded-none ${
                        fieldErrors.fullName ? "border-cream/60" : ""
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-cream/80 text-xs font-mono mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-cream/60 flex-shrink-0" />
                        <span>{fieldErrors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={formData.whatsapp}
                      onKeyDown={(e) => {
                        const allowed = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
                        if (allowed.includes(e.key)) return;
                        if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                      }}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData({ ...formData, whatsapp: digits });
                        if (fieldErrors.whatsapp) setFieldErrors({ ...fieldErrors, whatsapp: undefined });
                      }}
                      className={`w-full bg-cream/[0.03] border border-cream/15 px-4 py-4 text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-cream/60 rounded-none ${
                        fieldErrors.whatsapp ? "border-cream/60" : ""
                      }`}
                    />
                    {fieldErrors.whatsapp && (
                      <p className="text-cream/80 text-xs font-mono mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-cream/60 flex-shrink-0" />
                        <span>{fieldErrors.whatsapp}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Country + Intake */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                      Target Destination
                    </label>
                    <select
                      value={formData.targetCountry}
                      onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                      className="w-full bg-[#14120C] border border-cream/15 px-4 py-4 text-cream text-sm focus:outline-none focus:border-cream/60 rounded-none"
                    >
                      {countries.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                      Target Intake
                    </label>
                    <select
                      value={formData.targetIntake}
                      onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                      className="w-full bg-[#14120C] border border-cream/15 px-4 py-4 text-cream text-sm focus:outline-none focus:border-cream/60 rounded-none"
                    >
                      {intakes.map((itk) => (
                        <option key={itk} value={itk}>{itk}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Academic Background */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                    Current Academic Background &amp; Score
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech Computer Science (7.6 CGPA / 72%)"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full bg-cream/[0.03] border border-cream/15 px-4 py-4 text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-cream/60 rounded-none"
                  />
                </div>

                {/* Assistance Needed */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-mono block mb-2">
                    How can we best assist you?
                  </label>
                  <select
                    value={formData.helpNeeded}
                    onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                    className="w-full bg-[#14120C] border border-cream/15 px-4 py-4 text-cream text-sm focus:outline-none focus:border-cream/60 rounded-none"
                  >
                    {helpOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-cream/10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cream text-ink hover:bg-cream/90 disabled:opacity-50 min-h-[58px] py-4 rounded-none text-[11px] uppercase tracking-[0.22em] font-medium transition-colors inline-flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                        Routing to Senior Mentor…
                      </>
                    ) : (
                      <>
                        <span>Confirm Advisory Session</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-cream/35 font-mono mt-4">
                    <span>100% Confidential · Zero Spam</span>
                    <span>Direct 1-on-1 Mentor Review</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
