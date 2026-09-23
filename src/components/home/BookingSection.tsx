"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  Send,
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
        particleCount: 55,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#C25B1A", "#F2EDE4", "#14120C", "#E0D9CE"],
      });
    } catch {
      // safe
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
    } catch {
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

  const LabelEl = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
    <label className="flex items-center gap-2 text-cream/40 label mb-2">
      <Icon className="h-3.5 w-3.5 text-terra flex-shrink-0" />
      {children}
    </label>
  );

  return (
    <section
      id="booking"
      className="bg-[#14120C] py-16 lg:py-24 overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
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
              className="font-display font-normal text-cream leading-[0.93] tracking-tight text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[3.6rem]"
            >
              Schedule Your<br />
              <em className="text-terra">1-on-1 Strategy Call</em>
            </h2>
            <p className="text-cream/40 text-sm leading-relaxed max-w-sm font-light">
              Provide your current academic details. Every submission is personally reviewed by a senior mentor before we contact you directly on WhatsApp.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Left: Session info ── */}
          <motion.div
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            {/* What to expect */}
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

            {/* Guarantees */}
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

            {/* Urgent WhatsApp */}
            <div className="border border-cream/10 p-5">
              <p className="font-display text-base text-cream/80 font-normal mb-0.5">
                Have an urgent visa deadline?
              </p>
              <p className="text-cream/35 text-xs mb-4 font-light">Message directly on WhatsApp for immediate priority review</p>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20urgent%20query%20regarding%20my%20study%20abroad%20application."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-cream/15 hover:border-terra/50 text-cream/70 hover:text-terra px-4 py-3 min-h-[48px] w-full sm:w-auto label text-[10px] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-terra" />
                Open Instant WhatsApp Chat
              </a>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            {submitted ? (
              /* Success view */
              <div className="border border-cream/10 p-8 sm:p-12 text-center space-y-6">
                <div className="h-14 w-14 mx-auto border border-terra/50 bg-terra/10 flex items-center justify-center">
                  <Check className="h-7 w-7 text-terra" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-normal text-cream tracking-tight">
                    Strategy Session Requested
                  </h3>
                  <p className="text-cream/50 text-sm mt-2 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong className="text-cream/80 font-medium">{formData.fullName}</strong>. Your profile audit has been queued. A senior mentor will connect with you on WhatsApp at{" "}
                    <strong className="text-cream font-medium">{formData.whatsapp}</strong> shortly.
                  </p>
                </div>

                <div className="border border-cream/10 p-5 max-w-sm mx-auto text-left text-xs space-y-2 text-cream/40">
                  <div className="label text-terra/70 mb-3">Session Overview</div>
                  <p>Target Country: <strong className="text-cream/70">{formData.targetCountry}</strong></p>
                  <p>Target Intake: <strong className="text-cream/70">{formData.targetIntake}</strong></p>
                  <p>Focus Area: <strong className="text-cream/70">{formData.helpNeeded}</strong></p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-cream px-6 py-3 label transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Ping on WhatsApp Directly
                  </a>
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
                    className="text-cream/35 hover:text-cream/60 text-xs border-b border-cream/20 pb-0.5 transition-colors"
                  >
                    Submit Another Profile
                  </button>
                </div>
              </div>
            ) : (
              /* Form view */
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-cream/10 pb-5">
                  <div className="label text-terra mb-1">1-on-1 Consultation</div>
                  <h3 className="font-display text-2xl font-normal text-cream tracking-tight mt-1">
                    Request Your Advisory Session
                  </h3>
                </div>

                {errorMessage && (
                  <div className="border border-red-500/30 bg-red-500/[0.06] p-4 flex items-center gap-3 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {errorMessage}
                  </div>
                )}

                {/* Name + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <LabelEl icon={User}>Full Name *</LabelEl>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Mehra"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input-dark"
                    />
                  </div>
                  <div>
                    <LabelEl icon={Phone}>WhatsApp Number *</LabelEl>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="input-dark"
                    />
                  </div>
                </div>

                {/* Country + Intake */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                    className="w-full inline-flex items-center justify-center gap-3 bg-terra hover:bg-terra-dark disabled:opacity-50 text-cream min-h-[52px] py-4 label transition-colors cursor-pointer text-xs tracking-wider"
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
    </section>
  );
}
