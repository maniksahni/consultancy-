"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  GraduationCap, 
  BookOpen, 
  Globe2, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail, 
  User 
} from 'lucide-react';
import { EligibilityFormData, EligibilityResult } from '@/lib/types';
import { calculateEligibility } from '@/lib/utils';
import confetti from 'canvas-confetti';

const eligibilitySchema = z.object({
  educationLevel: z.string().min(1, "Please select your education level"),
  gpaOrPercentage: z.string().min(1, "Please enter your GPA or percentage"),
  fieldOfStudy: z.string().min(1, "Please select your study background"),
  backlogs: z.string().default("0"),
  englishTest: z.string().min(1, "Please select your English test"),
  englishScore: z.string().default("N/A"),
  targetCountry: z.string().min(1, "Please select preferred country"),
  targetIntake: z.string().min(1, "Please select target intake"),
  budgetPerYear: z.string().default("$25,000 - $45,000 / yr"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  whatsappNumber: z.string().min(8, "Please enter a valid phone/WhatsApp number"),
  countryCode: z.string().default("+1")
});

interface EligibilityCheckerProps {
  onShowResult: (result: EligibilityResult, data: EligibilityFormData) => void;
}

export default function EligibilityChecker({ onShowResult }: EligibilityCheckerProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      educationLevel: "Bachelor's Degree (4 Years)",
      gpaOrPercentage: "78%",
      fieldOfStudy: "Computer Science / IT",
      backlogs: "0",
      englishTest: "IELTS Academic",
      englishScore: "7.0",
      targetCountry: "USA",
      targetIntake: "Fall 2026 (Aug/Sep)",
      budgetPerYear: "$30,000 - $45,000",
      fullName: "",
      email: "",
      whatsappNumber: "",
      countryCode: "+1"
    }
  });

  const selectedCountry = watch("targetCountry");
  const selectedTest = watch("englishTest");

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(["educationLevel", "gpaOrPercentage", "fieldOfStudy"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["englishTest"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["targetCountry", "targetIntake"]);
    }
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: EligibilityFormData) => {
    const result = calculateEligibility(data);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
    onShowResult(result, data);
  };

  const steps = [
    { number: 1, title: "Academics & GPA", icon: GraduationCap },
    { number: 2, title: "English Proficiency", icon: BookOpen },
    { number: 3, title: "Country & Intake", icon: Globe2 },
    { number: 4, title: "Instant Report", icon: UserCheck }
  ];

  return (
    <section id="eligibility" className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visa & University Matchmaker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Check Your Study Abroad & Visa Eligibility
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Get an instant evaluation of your profile, university acceptance tier, and visa approval probability in under 60 seconds.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-slate-900/90 border border-slate-700/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Progress Bar & Steps indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                return (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : isActive
                          ? 'bg-gradient-to-tr from-blue-600 to-emerald-400 text-white shadow-lg ring-2 ring-emerald-500/40'
                          : 'bg-slate-950 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[11px] font-semibold mt-1.5 hidden sm:block text-center ${
                      isActive ? 'text-emerald-400' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Visual Bar */}
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* STEP 1: Academic Background */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-200">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                    Step 1: Academic Background & Scores
                  </h3>
                  <p className="text-xs text-slate-400">Tell us about your highest educational credentials.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Highest Completed / Current Degree *
                    </label>
                    <select
                      {...register("educationLevel")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Bachelor's Degree (4 Years)">Bachelor's Degree (4 Years / B.Tech / BE / BS)</option>
                      <option value="Bachelor's Degree (3 Years)">Bachelor's Degree (3 Years / B.Sc / B.Com / BBA)</option>
                      <option value="Master's Degree">Master's Degree (MS / M.Tech / MBA)</option>
                      <option value="High School / Grade 12">High School / Grade 12 (Undergraduate Aspirant)</option>
                      <option value="Polytechnic / Diploma">Polytechnic Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      GPA / Percentage / CGPA *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 78% or 3.6/4.0 CGPA"
                      {...register("gpaOrPercentage")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                    {errors.gpaOrPercentage && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.gpaOrPercentage.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Primary Discipline / Field of Study *
                    </label>
                    <select
                      {...register("fieldOfStudy")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Computer Science / IT">Computer Science & AI / Software Engineering</option>
                      <option value="Business, Management & Finance">Business Administration, Finance & Marketing</option>
                      <option value="Data Science & Analytics">Data Science & Business Analytics</option>
                      <option value="Mechanical / Electrical Engineering">Mechanical, Electrical & Civil Engineering</option>
                      <option value="Biotech & Healthcare">Biotechnology, Pharma & Health Sciences</option>
                      <option value="Humanities & Law">Humanities, Design & Law</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Academic Backlogs / Arrears Count
                    </label>
                    <select
                      {...register("backlogs")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="0">0 Backlogs (Clean Record)</option>
                      <option value="1-2">1 - 2 Backlogs (All Cleared)</option>
                      <option value="3-5">3 - 5 Backlogs</option>
                      <option value="5+">5+ Backlogs (Need Strategic Waiver)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: English Proficiency */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-200">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    Step 2: English Proficiency & Standardized Tests
                  </h3>
                  <p className="text-xs text-slate-400">Select the language test you have taken or plan to take.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      English Test Status *
                    </label>
                    <select
                      {...register("englishTest")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="IELTS Academic">IELTS Academic (Paper / Computer)</option>
                      <option value="PTE Academic">PTE Academic (Pearson)</option>
                      <option value="Duolingo English Test">Duolingo English Test (DET)</option>
                      <option value="TOEFL iBT">TOEFL iBT</option>
                      <option value="Not Given / Need MOI Waiver">Not Taken Yet (Need Medium-of-Instruction Waiver)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Band / Score (or Expected)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7.0 Bands / 65 PTE / 115 Duolingo"
                      {...register("englishScore")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Info Callout */}
                <div className="p-3.5 bg-blue-950/30 border border-blue-500/30 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong>Did you know?</strong> Over 120+ top UK, German, and Australian partner universities offer <strong>100% English test waivers</strong> if you scored 70%+ in high school English.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Preferred Country & Intake */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-200">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-emerald-400" />
                    Step 3: Preferred Study Destination & Intake
                  </h3>
                  <p className="text-xs text-slate-400">Choose your destination and targeted university semester.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Country *
                    </label>
                    <select
                      {...register("targetCountry")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="USA">🇺🇸 United States (3-Yr STEM OPT)</option>
                      <option value="UK">🇬🇧 United Kingdom (1-Yr Masters)</option>
                      <option value="Canada">🇨🇦 Canada (PGWP & PR Pathway)</option>
                      <option value="Australia">🇦🇺 Australia (Go8 Universities)</option>
                      <option value="Germany">🇩🇪 Germany (Tuition-Free TU9)</option>
                      <option value="Ireland">🇮🇪 Ireland (Euro Tech Hub)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Target Intake *
                    </label>
                    <select
                      {...register("targetIntake")}
                      className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Fall 2026 (Aug / Sep)">Fall 2026 (Primary Major Intake)</option>
                      <option value="Spring 2027 (Jan / Feb)">Spring 2027 (Secondary Fast Intake)</option>
                      <option value="Fall 2027 (Next Year)">Fall 2027 (Early Planning)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Estimated Annual Budget (Tuition + Living)
                  </label>
                  <select
                    {...register("budgetPerYear")}
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Under $20,000 / yr (Low Cost / Germany €0)">Under $20,000 / yr (Tuition-Free Germany / Partial Aid)</option>
                    <option value="$25,000 - $40,000 / yr">$25,000 - $40,000 / yr (Standard State University)</option>
                    <option value="$40,000 - $65,000 / yr">$40,000 - $65,000 / yr (Top Tier-1 / Ivy League)</option>
                    <option value="Require 100% Non-Collateral Loan">Looking for 100% Non-Collateral Education Loan</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Contact & Final Unlock */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-3 duration-200">
                <div className="border-b border-slate-800 pb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Calculations Ready • 98% Match Generated</span>
                  </div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    Step 4: Where should we send your Tailored Report?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enter your contact details to unlock your visa probability score & shortlisted university roster.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Manik Sahni"
                      {...register("fullName")}
                      className="w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        {...register("email")}
                        className="w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register("whatsappNumber")}
                        className="w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    {errors.whatsappNumber && <p className="text-[11px] text-red-400 mt-1">{errors.whatsappNumber.message}</p>}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Your information is 100% confidential. No spam policy. Instant AI report dispatch.</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm rounded-xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>View My Customized Eligibility Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
