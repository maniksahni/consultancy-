"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { saveMentorshipBooking } from "@/lib/firebase";
import { getStoredUTMParams } from "@/lib/utm";
import { EASE_LUXURY, maskedLineVariants, terracottaBloomVariants } from "@/lib/motion";

export default function FinalCTA() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    targetCountry: "United Kingdom",
    targetIntake: "Fall 2026",
    qualification: "Undergraduate / Working Professional",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || formData.whatsapp.length < 10) {
      setError("Please provide your full name and valid 10-digit WhatsApp number.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const msg = `Hi Pathways Global! I just booked a 1-on-1 strategy session for ${formData.targetCountry} (${formData.targetIntake}). My name is ${formData.fullName}.`;
    const whatsappUrl = `https://wa.me/33755749029?text=${encodeURIComponent(msg)}`;

    try {
      const utm = getStoredUTMParams();
      const firestoreSave = saveMentorshipBooking({
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        targetCountry: formData.targetCountry,
        targetIntake: formData.targetIntake,
        qualification: formData.qualification,
        helpNeeded: "Direct 1-on-1 Strategy Session",
        utm: utm ?? undefined,
      });
      const timeout = new Promise((resolve) => setTimeout(resolve, 2500));
      await Promise.race([firestoreSave, timeout]);
      setSubmitted(true);

      // Immediately redirect/open WhatsApp deep link
      if (typeof window !== "undefined") {
        try {
          window.location.href = whatsappUrl;
        } catch {
          window.open(whatsappUrl, "_blank");
        }
      }
    } catch (err) {
      console.error(err);
      // Still show success UI and trigger WhatsApp so student is connected directly
      setSubmitted(true);
      if (typeof window !== "undefined") {
        try {
          window.location.href = whatsappUrl;
        } catch {
          window.open(whatsappUrl, "_blank");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="bg-[#0B0A08] text-cream py-20 sm:py-28 lg:py-36 relative overflow-hidden">
      {/* ── Large Warm Radial Glow Behind Headline ── */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] lg:w-[950px] h-[400px] sm:h-[550px] rounded-full blur-[110px] lg:blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(194,91,26,0.28) 0%, rgba(227,107,32,0.14) 45%, transparent 70%)",
        }}
      />

      {/* ── Subtle Animated Light Beam / Gradient Movement ── */}
      <motion.div
        animate={{
          x: ["-30%", "130%"],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute top-0 -left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-terra to-transparent shadow-[0_0_15px_rgba(194,91,26,0.9)]"
      />

      <div className="max-w-7xl mx-auto px-4 min-[390px]:px-5 sm:px-6 lg:px-16 relative z-10">

        {/* ── Main Monumental Editorial Composition ── */}
        <div className="border-t border-cream/15 pt-8 sm:pt-10 mb-12 sm:mb-16">
          {/* Sweeping Thin Terracotta Line Before Headline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: EASE_LUXURY }}
            style={{ originX: 0 }}
            className="h-[2px] w-full bg-gradient-to-r from-terra via-terra to-terra/20 mb-8 sm:mb-10 shadow-[0_0_12px_rgba(194,91,26,0.6)]"
          />

          <div className="max-w-4xl">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-mono text-cream/45 block mb-4">
              08 / ENGAGEMENT · Direct Senior Advisory
            </span>
            <h2 className="font-display font-normal text-[clamp(2.35rem,8.5vw,4.5rem)] sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              {/* Line 1: YOUR APPLICATION */}
              <span className="block overflow-hidden py-1">
                <motion.span
                  variants={maskedLineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.25}
                  className="block"
                >
                  YOUR APPLICATION
                </motion.span>
              </span>

              {/* Line 2: SHOULDN'T FEEL GENERIC. */}
              <span className="block overflow-hidden py-1">
                <motion.span
                  variants={maskedLineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.42}
                  className="block"
                >
                  SHOULDN&apos;T FEEL GENERIC.
                </motion.span>
              </span>

              {/* Accent: Neither Should Your Advice. — Appears last with blooming warm glow */}
              <span className="block overflow-hidden py-1.5">
                <motion.span
                  variants={terracottaBloomVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0.65}
                  className="block text-terra italic pr-1"
                >
                  Neither Should Your Advice.
                </motion.span>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.82, ease: EASE_LUXURY }}
              className="text-base sm:text-lg lg:text-xl text-cream/70 font-light leading-relaxed mt-6 sm:mt-8 max-w-2xl"
            >
              Direct, confidential strategy session with a Senior Mentor. Discuss university shortlists, visa requirements, and profile strengths before committing.
            </motion.p>
          </div>

          {/* Primary Action Buttons */}
          {!showForm && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: 0.98, ease: EASE_LUXURY }}
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={() => setShowForm(true)}
                className="glow-button bg-terra hover:bg-terra-dark text-cream min-h-[52px] px-9 py-4 rounded-none text-[11px] uppercase tracking-[0.22em] font-medium transition-all inline-flex items-center justify-center gap-3 group shadow-[0_0_25px_rgba(194,91,26,0.25)] hover:shadow-[0_0_35px_rgba(194,91,26,0.4)]"
              >
                <span>Book Strategy Session</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://wa.me/33755749029?text=Hi!%20I%20would%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cream/25 hover:border-cream text-cream min-h-[52px] px-8 py-4 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium transition-all inline-flex items-center justify-center gap-2.5 backdrop-blur-sm hover:bg-white/[0.04]"
              >
                <MessageCircle className="h-4 w-4 text-terra" />
                <span>WhatsApp Advisory</span>
              </a>
            </motion.div>
          )}

          {/* ── Seamless In-Place Consultation Booking Form ── */}
          {showForm && !submitted && (
            <div className="mt-10 max-w-xl border border-cream/20 bg-white/[0.03] p-6 sm:p-8 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-cream/10 mb-6 font-mono text-[10px] uppercase tracking-wider text-cream/50">
                <span>Direct Mentor Booking</span>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-cream/40 hover:text-cream underline"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-cream/60 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Manik Sahni"
                    className="w-full bg-[#14120C] border border-cream/20 text-cream px-3.5 py-3 text-sm focus:border-terra focus:outline-none rounded-none placeholder:text-cream/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-cream/60 mb-1.5">
                    WhatsApp Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-[#14120C] border border-cream/20 text-cream px-3.5 py-3 text-sm focus:border-terra focus:outline-none rounded-none placeholder:text-cream/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-cream/60 mb-1.5">
                      Target Destination
                    </label>
                    <select
                      value={formData.targetCountry}
                      onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                      className="w-full bg-[#14120C] border border-cream/20 text-cream px-3 py-3 text-sm focus:border-terra focus:outline-none rounded-none"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Other / Undecided">Other / Undecided</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-mono text-cream/60 mb-1.5">
                      Target Intake
                    </label>
                    <select
                      value={formData.targetIntake}
                      onChange={(e) => setFormData({ ...formData, targetIntake: e.target.value })}
                      className="w-full bg-[#14120C] border border-cream/20 text-cream px-3 py-3 text-sm focus:border-terra focus:outline-none rounded-none"
                    >
                      <option value="Fall 2026">Fall 2026</option>
                      <option value="Spring 2027">Spring 2027</option>
                      <option value="Fall 2027">Fall 2027</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-terra font-mono mt-2">{error}</p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-cream text-ink hover:bg-cream/90 min-h-[48px] py-3 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting && (
                      <span className="block w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    )}
                    <span>{submitting ? "Confirming Slot..." : "Confirm Strategy Session"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submission Success State */}
          {submitted && (
            <div className="mt-8 max-w-lg border border-terra/40 bg-white/[0.04] p-6 sm:p-8 animate-fade-in">
              <div className="flex items-center gap-2 text-terra font-mono text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="h-4 w-4 text-terra" />
                <span>Strategy Session Booked</span>
              </div>
              <h3 className="font-display text-2xl text-cream font-normal">
                Thank you, {formData.fullName}.
              </h3>
              <p className="text-sm text-cream/70 font-light mt-2 leading-relaxed">
                Your dossier request has been registered in our admissions ledger. A Senior Mentor will review your {formData.targetCountry} profile and connect on WhatsApp shortly.
              </p>
              <div className="mt-4 pt-4 border-t border-cream/10">
                <a
                  href={`https://wa.me/33755749029?text=${encodeURIComponent(`Hi Pathways Global! I just booked a 1-on-1 strategy session for ${formData.targetCountry} (${formData.targetIntake}). My name is ${formData.fullName}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-terra hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Open WhatsApp Directly →</span>
                </a>
              </div>
            </div>
          )}

          {/* Fiduciary Notice Strip */}
          <div className="mt-14 pt-8 border-t border-cream/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[10px] text-cream/45 uppercase tracking-[0.18em]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-terra" />
              <span>Direct 1-on-1 Confidentiality</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-terra" />
              <span>Replies within 4 working hours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-terra" />
              <span>Zero Recruiter Kickbacks</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
