"use client";

import React, { useState } from "react";
import { Check, ChevronRight, ChevronLeft, Sparkles, Send } from "lucide-react";

interface FormData {
  highestEducation: string;
  gradePercentage: string;
  englishTest: string;
  englishScore: string;
  targetCountry: string;
  targetIntake: string;
  fullName: string;
  phone: string;
  email: string;
}

const initialData: FormData = {
  highestEducation: "Bachelor's Degree",
  gradePercentage: "60-75%",
  englishTest: "IELTS",
  englishScore: "6.5 Band",
  targetCountry: "United Kingdom",
  targetIntake: "Fall 2026",
  fullName: "",
  phone: "",
  email: "",
};

export default function EligibilityForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please enter your contact details");
      return;
    }
    // Yahan aap API call laga sakte hain (e.g. fetch('/api/leads', {...}))
    console.log("Collected Lead:", formData);
    setIsSubmitted(true);
  };

  return (
    <section id="eligibility-form" className="py-16 bg-slate-900 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Sparkles className="h-3.5 w-3.5" /> 60-Second Profile Evaluation
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Check Your Study Visa Eligibility
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Answer a few quick questions to receive a curated list of universities and scholarship options.
          </p>
        </div>

        {/* Card Container */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl">
          {!isSubmitted ? (
            <div>
              {/* Stepper Progress Bar */}
              <div className="mb-8 flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        step >= s
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {step > s ? <Check className="h-4 w-4" /> : s}
                    </div>
                    {s !== 3 && (
                      <div
                        className={`h-1 w-16 sm:w-32 transition-all ${
                          step > s ? "bg-blue-600" : "bg-slate-800"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Academic Background */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-100">
                    Step 1: Your Academic Background
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Highest Completed / Current Education
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {["12th Standard", "Bachelor's Degree", "Master's Degree", "Diploma"].map((edu) => (
                        <button
                          key={edu}
                          type="button"
                          onClick={() => updateFields({ highestEducation: edu })}
                          className={`rounded-lg border p-3 text-xs font-semibold transition ${
                            formData.highestEducation === edu
                              ? "border-blue-500 bg-blue-600/10 text-blue-400"
                              : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          {edu}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Average Percentage / GPA
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {["Above 80%", "65% - 80%", "50% - 65%", "Below 50%"].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => updateFields({ gradePercentage: pct })}
                          className={`rounded-lg border p-3 text-xs font-semibold transition ${
                            formData.gradePercentage === pct
                              ? "border-blue-500 bg-blue-600/10 text-blue-400"
                              : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          {pct}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-1 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Language & Country Preference */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-100">
                    Step 2: Destination & English Proficiency
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      Target Country
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[
                        "United States",
                        "United Kingdom",
                        "Canada",
                        "Australia",
                        "Germany",
                        "Ireland",
                      ].map((country) => (
                        <button
                          key={country}
                          type="button"
                          onClick={() => updateFields({ targetCountry: country })}
                          className={`rounded-lg border p-3 text-xs font-semibold transition ${
                            formData.targetCountry === country
                              ? "border-blue-500 bg-blue-600/10 text-blue-400"
                              : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">
                      English Test Status
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {["IELTS", "PTE", "Duolingo", "Not Given Yet"].map((test) => (
                        <button
                          key={test}
                          type="button"
                          onClick={() => updateFields({ englishTest: test })}
                          className={`rounded-lg border p-3 text-xs font-semibold transition ${
                            formData.englishTest === test
                              ? "border-blue-500 bg-blue-600/10 text-blue-400"
                              : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          {test}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-1 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Lead Capture */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-100">
                    Step 3: Where should we send your eligibility report?
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manik Sahni"
                      value={formData.fullName}
                      onChange={(e) => updateFields({ fullName: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => updateFields({ phone: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => updateFields({ email: e.target.value })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <Send className="h-4 w-4" /> Get Free Roadmap
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Thank You / Success State */
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">
                Application Received!
              </h3>
              <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Based on your profile, you have high eligibility for universities in{" "}
                <span className="text-blue-400 font-semibold">{formData.targetCountry}</span>.
              </p>
              <div className="mt-6">
                <a
                  href={`https://wa.me/919876543210?text=Hi,%20I%20just%20filled%20the%20eligibility%20form%20for%20${encodeURIComponent(
                    formData.targetCountry
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Chat with Senior Counsellor on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
