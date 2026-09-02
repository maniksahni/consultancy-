"use client";

import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Globe, CheckCircle2, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCountry?: string;
}

export default function ConsultationModal({ isOpen, onClose, defaultCountry = "USA" }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetCountry: defaultCountry,
    degreeLevel: "Master's Degree (MS/MBA)",
    preferredDate: '',
    preferredSlot: '4:00 PM - 5:00 PM (EST / IST Slot)',
    counsellor: 'Dr. Marcus Vance (Ex-US Consulate Mentor)',
    query: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-emerald-500/5 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-emerald-400 to-teal-400" />
        
        {/* Close Button */}
        <button 
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>100% Free • No Obligation Profile Assessment</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
              Book Your 1-on-1 Strategy Session
            </h3>
            <p className="text-slate-400 text-sm mt-1 mb-6">
              Connect directly with our Ivy League & Russell Group alumni counsellors to map your university shortlist, scholarship roadmap, and visa plan.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Manik Sahni"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Destination *</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <select
                      value={formData.targetCountry}
                      onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="USA">🇺🇸 United States (STEM OPT / F-1)</option>
                      <option value="UK">🇬🇧 United Kingdom (1-Year Masters)</option>
                      <option value="Canada">🇨🇦 Canada (SDS / PGWP)</option>
                      <option value="Australia">🇦🇺 Australia (Go8 / Subclass 500)</option>
                      <option value="Germany">🇩🇪 Germany (Tuition-Free / APS)</option>
                      <option value="Ireland">🇮🇪 Ireland (Tech Hub / Stamp 1G)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Preferred Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <select
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM Morning Slot</option>
                      <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM Afternoon Slot</option>
                      <option value="4:00 PM - 5:00 PM (EST / IST Slot)">4:00 PM - 5:00 PM Evening Prime</option>
                      <option value="7:30 PM - 8:30 PM">7:30 PM - 8:30 PM Night Slot</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">What is your primary goal or question? (Optional)</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Looking for fall 2026 CS programs with scholarships, have 3.4 GPA and need GRE waiver advice..."
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Award className="w-5 h-5" />
                  Confirm Free Video Counselling Call
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-5 my-auto">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
                Session Confirmed • Calendar Invite Sent
              </span>
              <h3 className="text-2xl font-bold text-white">
                You're All Set, {formData.name || 'Scholar'}!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                We've reserved your slot for <strong className="text-white">{formData.targetCountry}</strong> consultation. A calendar invite & Zoom link have been dispatched to <strong className="text-emerald-400">{formData.email || 'your email'}</strong>.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-slate-400">
                <span>Assigned Senior Advisor:</span>
                <span className="text-white font-medium">Marcus Vance, M.Ed.</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Selected Time Slot:</span>
                <span className="text-emerald-400 font-medium">{formData.preferredSlot}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Direct WhatsApp Contact:</span>
                <span className="text-white font-medium">+1 (800) 492-7284</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
