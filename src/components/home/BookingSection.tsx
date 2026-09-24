"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  MessageCircle,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  User,
  Phone,
  GraduationCap,
  Globe2,
  ArrowRight,
} from "lucide-react";
import { saveMentorshipBooking } from "@/lib/firebase";
import { getStoredUTMParams } from "@/lib/utm";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const [hasError, setHasError] = useState(false);
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

  // Helper to sanitize free-text inputs against HTML injection, script tags, and control characters
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

    // Build plain-text message with clean line breaks
    const messageLines = [
      `Hi! My name is ${name}.`,
      "I would like to schedule a 1-on-1 strategy call with Pathways Global.",
      `• My WhatsApp: +91 ${phone}`,
      `• Target Country: ${country}`,
      `• Target Intake: ${intake}`,
      `• Academic Background: ${qual}`,
      `• Assistance Needed: ${help}`,
    ];

    // Safely encode the entire message payload for the URL query parameter
    return `https://wa.me/33755749029?text=${encodeURIComponent(messageLines.join("\n"))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);

    // Sanitize values
    const sanitizedFullName = sanitizeInput(formData.fullName, 100);
    const sanitizedWhatsapp = formData.whatsapp.replace(/\D/g, "").slice(0, 10);
    const sanitizedQualification = sanitizeInput(formData.qualification, 250);
    const sanitizedEmail = formData.email ? sanitizeInput(formData.email, 100) : "";

    // Field-level validation (synchronous — must run before any async work)
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

    // ── CRITICAL: Open WhatsApp SYNCHRONOUSLY within the user click gesture ──
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

    // Run Firestore save + minimum 1.5s loading feel in parallel, capped at 5s total
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
      // Wait for both the minimum delay AND the Firestore save (or timeout, whichever is first)
      await Promise.race([
        Promise.all([minDelay, firestoreSave]),
        timeout,
      ]);
    } catch {
      // Firestore failure or timeout — ensure minimum delay still passes before showing success
      await minDelay;
    } finally {
      setLoading(false);
      triggerConfetti();
      setSubmitted(true);
    }
  };

  const LabelEl = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
    <label className="flex items-center gap-2 text-cream/40 label mb-2">
      <Icon className="h-3.5 w-3.5 text-terra flex-shrink-0" />
      {children}
    </label>
  );

  return (
    <section
      id="booking"
      className="bg-[#14120C] grain-ink py-8 sm:py-12 lg:py-24 overflow-hidden w-full relative border-t border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── MOBILE: Self-contained, fits above the fold on first scroll ── */}
        <div className="lg:hidden">
          {submitted ? (
            /* Success view */
            <div className="border border-cream/10 p-6 text-center space-y-4">
              <div className="h-12 w-12 mx-auto border border-terra/50 bg-terra/10 flex items-center justify-center">
                <Check className="h-6 w-6 text-terra" />
              </div>
              <div>
                <span className="label text-[9px] text-terra border border-terra/30 bg-terra/[0.06] px-2.5 py-1 inline-block mb-2">
                  Admissions Dossier Queued
                </span>
                <h3 className="font-display text-2xl font-normal text-cream tracking-tight">
                  Strategy Session Confirmed
                </h3>
                <p className="text-cream/70 text-xs mt-2 leading-relaxed font-light">
                  Thank you, <strong className="text-cream font-medium">{formData.fullName}</strong>. A dedicated senior mentor will evaluate your background and connect on WhatsApp at{" "}
                  <strong className="text-terra font-medium">{formData.whatsapp}</strong>.
                </p>
                <div className="mt-3 p-3 bg-cream/[0.03] border border-cream/8 text-[11px] text-cream/70 font-light flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-terra flex-shrink-0" />
                  <span>Guaranteed mentor reply within <strong className="text-cream font-medium">4 hours</strong> (Mon–Sat).</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {/* Fallback link — shown if the auto-open was blocked by the browser/OS */}
                <p className="text-center text-cream/40 text-[11px] font-light leading-relaxed">
                  WhatsApp should open automatically.{" "}
                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terra hover:text-terra-dark underline underline-offset-2 transition-colors"
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
                  className="w-full text-cream/30 hover:text-cream/60 text-xs py-1.5 transition-colors"
                >
                  Submit Another Profile
                </button>
              </div>
            </div>
          ) : (
            /* Compact Above-The-Fold Form */
            <form noValidate onSubmit={handleSubmit} className="space-y-3.5">
              {/* Header */}
              <div className="border-b border-cream/10 pb-3">
                <div className="label text-terra text-[10px] mb-1">Direct Consultation Booking</div>
                <h2 className="font-display font-normal text-cream text-[1.85rem] sm:text-3xl leading-[0.95] tracking-tight">
                  Schedule Your 1-on-1 Strategy Call
                </h2>
                <p className="text-cream/45 text-xs font-light mt-1.5 leading-relaxed">
                  Personal profile review · Direct WhatsApp confirmation within 4 hours
                </p>
              </div>

              {/* Key Form Fields */}
              <div className="space-y-2.5">
                <div>
                  <label className="label text-cream/40 text-[9px] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan Mehra"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined });
                    }}
                    className={`input-dark py-2 text-sm min-h-[44px] ${
                      fieldErrors.fullName ? "border-terra/70 focus:border-terra bg-terra/[0.02]" : ""
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-terra text-[11px] font-sans font-light mt-1.5 flex items-center gap-1.5 animate-slide-up-fade">
                      <AlertCircle className="w-3.5 h-3.5 text-terra flex-shrink-0" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="label text-cream/40 text-[9px] block mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={formData.whatsapp}
                      onKeyDown={(e) => {
                        // Allow: backspace, delete, tab, escape, enter, arrow keys
                        const allowed = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
                        if (allowed.includes(e.key)) return;
                        // Block anything that isn't a digit 0–9
                        if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                      }}
                      onChange={(e) => {
                        // Strip any non-digit characters that could arrive via paste
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setFormData({ ...formData, whatsapp: digits });
                        if (fieldErrors.whatsapp) setFieldErrors({ ...fieldErrors, whatsapp: undefined });
                      }}
                      className={`input-dark py-2 text-sm min-h-[44px] ${
                        fieldErrors.whatsapp ? "border-terra/70 focus:border-terra bg-terra/[0.02]" : ""
                      }`}
                    />
                    {fieldErrors.whatsapp && (
                      <p className="text-terra text-[11px] font-sans font-light mt-1.5 flex items-center gap-1.5 animate-slide-up-fade">
                        <AlertCircle className="w-3.5 h-3.5 text-terra flex-shrink-0" />
                        <span>{fieldErrors.whatsapp}</span>
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="label text-cream/40 text-[9px] block mb-1">Target Country</label>
                    <select
                      value={formData.targetCountry}
                      onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                      className="select-dark py-2 text-sm min-h-[44px]"
                    >
                      {countries.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 bottom-2.5 pointer-events-none text-cream/30 text-[10px]">▾</div>
                  </div>
                </div>

                {/* Progressive Disclosure Toggle with Rotating Icon */}
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowFullForm((prev) => !prev)}
                    className="text-left text-xs label text-terra hover:text-terra-dark py-1 flex items-center gap-1.5 transition-colors cursor-pointer group"
                  >
                    <span
                      className={`inline-flex items-center justify-center h-4 w-4 text-sm font-light transition-transform duration-300 ease-out flex-shrink-0 ${
                        showFullForm ? "rotate-45 text-terra" : "rotate-0 text-terra"
                      }`}
                    >
                      +
                    </span>
                    <span>{showFullForm ? "Hide optional details" : "Add intake & academic details (optional)"}</span>
                  </button>
                </div>

                {/* Collapsible Secondary Fields with Smooth Height Transition */}
                <AnimatePresence initial={false}>
                  {showFullForm && (
                    <motion.div
                      key="collapsible-form"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2.5 pt-2 pb-1 border-t border-cream/10">
                        <div className="relative">
                          <label className="label text-cream/40 text-[9px] block mb-1">Target Intake</label>
                          <select
                            value={formData.targetIntake}
                            onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                            className="select-dark py-2 text-sm min-h-[44px]"
                          >
                            {intakes.map((itk) => (
                              <option key={itk} value={itk}>{itk}</option>
                            ))}
                          </select>
                          <div className="absolute right-0 bottom-2.5 pointer-events-none text-cream/30 text-[10px]">▾</div>
                        </div>

                        <div>
                          <label className="label text-cream/40 text-[9px] block mb-1">Current Academic Background</label>
                          <input
                            type="text"
                            placeholder="e.g. B.Tech CS (7.6 CGPA)"
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            className="input-dark py-2 text-sm min-h-[44px]"
                          />
                        </div>

                        <div className="relative">
                          <label className="label text-cream/40 text-[9px] block mb-1">Assistance Needed</label>
                          <select
                            value={formData.helpNeeded}
                            onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                            className="select-dark py-2 text-sm min-h-[44px]"
                          >
                            {helpOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <div className="absolute right-0 bottom-2.5 pointer-events-none text-cream/30 text-[10px]">▾</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary CTA Button — directly above fold with satisfying tactile press */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-terra hover:bg-terra-dark disabled:opacity-50 text-cream min-h-[52px] py-3.5 label text-xs tracking-wider transition-colors cursor-pointer btn-primary-glow active:scale-[0.97]"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                        Routing to Senior Mentor…
                      </>
                    ) : (
                      <>
                        Confirm Advisory Session
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-between text-[10px] text-cream/30 mt-2 font-light">
                    <span>No cost. No obligation.</span>
                    <span>Direct 1-on-1 mentor review</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ── DESKTOP: Full Multi-Column Layout (hidden on mobile) ── */}
        <div className="hidden lg:block">
          {/* Header */}
          <motion.div
            className="border-t border-cream/10 pt-10 mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="label text-cream/35 mb-4">Direct Consultation Booking</div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2
                className="font-display font-normal text-cream leading-[0.93] tracking-tight text-[3.6rem]"
              >
                Schedule Your<br />
                <em className="text-terra">1-on-1 Strategy Call</em>
              </h2>
              <p className="text-cream/40 text-sm leading-relaxed max-w-sm font-light">
                Provide your current academic details. Every submission is personally reviewed by a senior mentor before we contact you directly on WhatsApp.
              </p>
            </div>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid grid-cols-12 gap-16 items-start">
            {/* Left: Session info */}
            <motion.div
              className="col-span-4 space-y-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <div className="border-t border-cream/10 pt-6 space-y-6">
                <h3 className="font-display text-xl font-normal text-cream tracking-tight">
                  What to Expect During Your Session
                </h3>
                {[
                  {
                    title: "Unbiased Profile Audit",
                    desc: "Rigorous evaluation of GPA, backlogs, education gaps, and GRE/IELTS readiness. Zero false promises.",
                  },
                  {
                    title: "Country & Budget Matching",
                    desc: "Aligning your realistic liquid funds with tuition costs, post-study work rules, and career visa rights.",
                  },
                  {
                    title: "Immediate Action Plan",
                    desc: "You receive a concrete timeline for test deadlines, SOP iterations, and university submission cut-offs.",
                  },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-[20px_1fr] gap-3 items-start">
                    <div className="h-5 w-5 border border-terra/40 bg-terra/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-terra" />
                    </div>
                    <div>
                      <div className="label text-cream/60 mb-1.5">{item.title}</div>
                      <p className="text-cream/35 text-xs leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream/10 pt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-cream/40">
                  <ShieldCheck className="h-4 w-4 text-terra flex-shrink-0" />
                  <span>100% Confidential · Zero Spam · No Call Center Handoffs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cream/30">
                  <Clock className="h-4 w-4 text-cream/20 flex-shrink-0" />
                  <span>Direct reply within 4 business hours</span>
                </div>
              </div>

              <div className="border border-cream/10 p-5">
                <p className="font-display text-base text-cream/80 font-normal mb-0.5">
                  Have an urgent visa deadline?
                </p>
                <p className="text-cream/35 text-xs mb-4 font-light">Message directly on WhatsApp for immediate priority review</p>
                <a
                  href="https://wa.me/33755749029?text=Hi!%20I%20have%20an%20urgent%20query%20regarding%20my%20study%20abroad%20application."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-cream/15 hover:border-terra/50 text-cream/70 hover:text-terra px-4 py-3 min-h-[48px] label text-[10px] transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-terra" />
                  Open Instant WhatsApp Chat
                </a>
              </div>
            </motion.div>

            {/* Right: Full Desktop Form */}
            <motion.div
              className="col-span-8"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            >
              {submitted ? (
                <div className="border border-cream/10 p-10 lg:p-12 text-center space-y-6">
                  <div className="h-14 w-14 mx-auto border border-terra/50 bg-terra/10 flex items-center justify-center">
                    <Check className="h-7 w-7 text-terra" />
                  </div>
                  <div>
                    <span className="label text-[10px] text-terra border border-terra/30 bg-terra/[0.06] px-3 py-1 inline-block mb-3">
                      Admissions Dossier Queued
                    </span>
                    <h3 className="font-display text-3xl font-normal text-cream tracking-tight">
                      Strategy Session Confirmed
                    </h3>
                    <p className="text-cream/60 text-sm mt-3 max-w-md mx-auto leading-relaxed font-light">
                      Thank you, <strong className="text-cream font-medium">{formData.fullName}</strong>. Your profile audit has been registered. A senior mentor will evaluate your background and connect on WhatsApp at{" "}
                      <strong className="text-terra font-medium">{formData.whatsapp}</strong>.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 border border-cream/10 bg-cream/[0.02] px-4 py-2 text-xs text-cream/70 font-light">
                      <Clock className="w-4 h-4 text-terra flex-shrink-0" />
                      <span>Direct Advisory Guarantee: Personal mentor reply within <strong className="text-cream font-medium">4 hours</strong> (Mon–Sat).</span>
                    </div>
                  </div>

                  <div className="border border-cream/10 p-5 max-w-md mx-auto text-left text-xs space-y-2.5 text-cream/40 bg-cream/[0.01]">
                    <div className="label text-terra/70 mb-3">Session Overview</div>
                    <p className="flex justify-between border-b border-cream/8 pb-2">
                      <span>Target Country:</span>
                      <strong className="text-cream/80">{formData.targetCountry}</strong>
                    </p>
                    <p className="flex justify-between border-b border-cream/8 pb-2">
                      <span>Target Intake:</span>
                      <strong className="text-cream/80">{formData.targetIntake}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Advisory Scope:</span>
                      <strong className="text-cream/80">{formData.helpNeeded}</strong>
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 pt-2">
                    {/* Fallback link — shown if the auto-open was blocked by the browser/OS */}
                    <p className="text-cream/40 text-xs font-light">
                      WhatsApp should have opened automatically.{" "}
                      <a
                        href={getWhatsAppDirectUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terra hover:text-terra-dark underline underline-offset-2 transition-colors"
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
                      className="text-cream/25 hover:text-cream/50 text-xs border-b border-cream/15 pb-0.5 transition-colors"
                    >
                      Submit Another Profile
                    </button>
                  </div>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="space-y-8">
                  <div className="border-b border-cream/10 pb-5">
                    <div className="label text-terra mb-1">1-on-1 Consultation</div>
                    <h3 className="font-display text-2xl font-normal text-cream tracking-tight mt-1">
                      Request Your Advisory Session
                    </h3>
                  </div>

                  {/* Name + WhatsApp */}
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <LabelEl icon={User}>Full Name *</LabelEl>
                      <input
                        type="text"
                        placeholder="e.g. Aryan Mehra"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined });
                        }}
                        className={`input-dark ${
                          fieldErrors.fullName ? "border-terra/70 focus:border-terra bg-terra/[0.02]" : ""
                        }`}
                      />
                      {fieldErrors.fullName && (
                        <p className="text-terra text-[11px] font-sans font-light mt-1.5 flex items-center gap-1.5 animate-slide-up-fade">
                          <AlertCircle className="w-3.5 h-3.5 text-terra flex-shrink-0" />
                          <span>{fieldErrors.fullName}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <LabelEl icon={Phone}>WhatsApp Number *</LabelEl>
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
                        className={`input-dark ${
                          fieldErrors.whatsapp ? "border-terra/70 focus:border-terra bg-terra/[0.02]" : ""
                        }`}
                      />
                      {fieldErrors.whatsapp && (
                        <p className="text-terra text-[11px] font-sans font-light mt-1.5 flex items-center gap-1.5 animate-slide-up-fade">
                          <AlertCircle className="w-3.5 h-3.5 text-terra flex-shrink-0" />
                          <span>{fieldErrors.whatsapp}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country + Intake */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="relative">
                      <LabelEl icon={Globe2}>Target Destination</LabelEl>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="select-dark"
                      >
                        {countries.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 bottom-3.5 pointer-events-none text-cream/30 text-[10px]">▾</div>
                    </div>
                    <div className="relative">
                      <LabelEl icon={Calendar}>Target Intake</LabelEl>
                      <select
                        value={formData.targetIntake}
                        onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                        className="select-dark"
                      >
                        {intakes.map((itk) => (
                          <option key={itk} value={itk}>{itk}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 bottom-3.5 pointer-events-none text-cream/30 text-[10px]">▾</div>
                    </div>
                  </div>

                  {/* Academic background */}
                  <div>
                    <LabelEl icon={GraduationCap}>Current Academic Background & Score</LabelEl>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech Computer Science (7.6 CGPA / 72%)"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="input-dark"
                    />
                  </div>

                  {/* Help needed */}
                  <div className="relative">
                    <LabelEl icon={HelpCircle}>How can we best assist you?</LabelEl>
                    <select
                      value={formData.helpNeeded}
                      onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                      className="select-dark"
                    >
                      {helpOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 bottom-3.5 pointer-events-none text-cream/30 text-[10px]">▾</div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-3 bg-terra hover:bg-terra-dark disabled:opacity-50 text-cream min-h-[56px] py-4 label transition-colors cursor-pointer text-xs tracking-wider btn-primary-glow active:scale-[0.97]"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                          Routing to Senior Mentor…
                        </>
                      ) : (
                        <>
                          Confirm Advisory Session
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-cream/20 text-[11px] mt-3 font-light">
                      Zero spam guarantee · Direct 1-on-1 advisor review
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
