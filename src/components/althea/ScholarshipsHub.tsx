"use client";

import { useState } from "react";
import { Award, CheckCircle2, Calendar, FileText, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, Sparkles, Filter } from "lucide-react";
import { franceScholarshipsList, type FranceScholarship } from "@/data/franceScholarshipsData";

export default function ScholarshipsHub() {
  const [selectedScholarship, setSelectedScholarship] = useState<FranceScholarship>(franceScholarshipsList[0]);
  const [levelFilter, setLevelFilter] = useState("All");

  // Interactive Matcher state
  const [userDegree, setUserDegree] = useState("Master");
  const [userGpa, setUserGpa] = useState("75%");
  const [matchedCount, setMatchedCount] = useState(franceScholarshipsList.length);

  const filtered = franceScholarshipsList.filter((s) => {
    if (levelFilter === "All") return true;
    return s.targetLevel.includes(levelFilter);
  });

  return (
    <div className="space-y-16">
      {/* Interactive Scholarship Matcher */}
      <div className="border border-[#173969]/15 bg-[#F2EDE5] p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#A88C64]">
          <Sparkles size={16} /> Instant Scholarship Eligibility Evaluator
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl text-[#142E61]">
          Calculate your scholarship funding <em>in seconds.</em>
        </h2>
        <p className="mt-2 text-xs text-[#5f718a] max-w-2xl leading-relaxed">
          French government, embassy, and university grants are tailored to your degree level, country of residence, and academic track record.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="bg-white p-4 border border-[#173969]/15">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#79889d] block mb-2">Target Degree Level</label>
            <select
              value={userDegree}
              onChange={(e) => setUserDegree(e.target.value)}
              className="w-full text-xs font-semibold text-[#142E61] bg-transparent outline-none cursor-pointer"
            >
              <option value="Master">Master&apos;s (M1 / M2 / MSc)</option>
              <option value="Bachelor">Bachelor&apos;s Degree</option>
              <option value="Doctorate">PhD / Doctorate</option>
              <option value="Research">Research Internship</option>
            </select>
          </div>

          <div className="bg-white p-4 border border-[#173969]/15">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#79889d] block mb-2">Academic Standing / CGPA</label>
            <select
              value={userGpa}
              onChange={(e) => setUserGpa(e.target.value)}
              className="w-full text-xs font-semibold text-[#142E61] bg-transparent outline-none cursor-pointer"
            >
              <option value="80%">Distinction / Top 5% (80%+ / 3.8+ GPA)</option>
              <option value="75%">First Class (70% - 79% / 3.3+ GPA)</option>
              <option value="65%">Second Class Upper (60% - 69% / 2.8+ GPA)</option>
            </select>
          </div>

          <div className="bg-[#173969] text-white p-4 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C99D]">Eligible Funding Programs</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-display text-3xl text-white">Up to €1,400</span>
              <span className="text-[11px] text-[#E5C99D]">/ month stipend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Database Grid */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#173969]/15 pb-4">
          <h2 className="font-display text-3xl text-[#142E61]">Official Scholarship Directory</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6e7e95]">Filter:</span>
            {["All", "Master", "Bachelor", "Doctorate"].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1 text-xs uppercase tracking-wider font-semibold border ${
                  levelFilter === lvl
                    ? "bg-[#173969] text-white border-[#173969]"
                    : "bg-white text-[#576982] border-[#173969]/20 hover:border-[#173969]"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* List */}
          <div className="space-y-4 lg:col-span-5">
            {filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedScholarship(s)}
                className={`cursor-pointer p-6 border transition-all duration-200 ${
                  selectedScholarship.id === s.id
                    ? "border-[#173969] bg-white shadow-lg border-l-4"
                    : "border-[#173969]/15 bg-[#FAF7F2] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9E8250]">{s.targetLevel}</span>
                  <span className="text-xs font-semibold text-[#173969]">{s.selectionRatio}</span>
                </div>
                <h3 className="mt-2 font-display text-xl text-[#142E61]">{s.name}</h3>
                <p className="mt-1 text-xs text-[#65768d]">{s.provider}</p>
                <p className="mt-3 text-xs font-bold text-[#A88C64]">{s.awardAmount}</p>
              </div>
            ))}
          </div>

          {/* Deep Detail Dossier */}
          <div className="border border-[#173969]/15 bg-white p-7 sm:p-9 lg:col-span-7 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#173969]/10 pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E8250]">{selectedScholarship.provider}</span>
                <h3 className="mt-1 font-display text-3xl text-[#142E61]">{selectedScholarship.name}</h3>
              </div>
              <span className="bg-[#E5C99D]/20 text-[#8F7240] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {selectedScholarship.targetLevel}
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Award & Package Benefits</h4>
                <div className="mt-2 text-sm font-semibold text-[#173969] bg-[#F2EDE5] p-3.5">
                  {selectedScholarship.awardAmount}
                </div>
                <ul className="mt-3 space-y-2">
                  {selectedScholarship.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#4a5c74]">
                      <CheckCircle2 size={15} className="text-[#173969] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#173969]/10 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Eligibility Criteria</h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="bg-[#FAF7F2] p-3 border border-[#173969]/10">
                    <span className="font-bold text-[#142E61] block">Nationality:</span>
                    <span className="text-[#596980]">{selectedScholarship.eligibilityCriteria.nationality}</span>
                  </div>
                  <div className="bg-[#FAF7F2] p-3 border border-[#173969]/10">
                    <span className="font-bold text-[#142E61] block">Academic Merit:</span>
                    <span className="text-[#596980]">{selectedScholarship.eligibilityCriteria.academicMerit}</span>
                  </div>
                  <div className="bg-[#FAF7F2] p-3 border border-[#173969]/10">
                    <span className="font-bold text-[#142E61] block">Age Restriction:</span>
                    <span className="text-[#596980]">{selectedScholarship.eligibilityCriteria.ageLimit}</span>
                  </div>
                  <div className="bg-[#FAF7F2] p-3 border border-[#173969]/10">
                    <span className="font-bold text-[#142E61] block">Eligible Fields:</span>
                    <span className="text-[#596980]">{selectedScholarship.eligibilityCriteria.fieldRestriction}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#173969]/10 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Nomination & Application Calendar</h4>
                <p className="mt-2 text-xs leading-5 text-[#54667d]"><strong className="text-[#142E61]">Deadline:</strong> {selectedScholarship.applicationDeadline}</p>
                <p className="mt-1 text-xs leading-5 text-[#54667d]"><strong className="text-[#142E61]">Submission Method:</strong> {selectedScholarship.nominationMethod}</p>
              </div>

              <div className="border-t border-[#173969]/10 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D4C]">Step-by-Step Dossier Preparation</h4>
                <div className="mt-3 space-y-2">
                  {selectedScholarship.dossierSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#44556c]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#173969] text-[10px] font-bold text-white">
                        {idx + 1}
                      </span>
                      <span className="leading-5">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#173969]/10 pt-5">
                <a
                  href="/#consultation"
                  className="inline-flex w-full items-center justify-center gap-2 bg-[#173969] py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#28528f] transition-colors"
                >
                  Apply with Althéa Scholarship Coaching <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
