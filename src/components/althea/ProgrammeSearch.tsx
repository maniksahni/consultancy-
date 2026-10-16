"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, GraduationCap, ChevronRight, BookOpen, Clock, Euro } from "lucide-react";
import { comprehensiveProgrammes, type FranceDetailedProgramme } from "@/data/franceComprehensiveData";
import ProgrammeModal from "@/components/althea/ProgrammeModal";

export default function ProgrammeSearch() {
  const [hydrated, setHydrated] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState<FranceDetailedProgramme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => setHydrated(true), []);

  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const [city, setCity] = useState("All");
  const [field, setField] = useState("All");

  const results = useMemo(() => {
    return comprehensiveProgrammes.filter((p) => {
      const haystack = [p.title, p.institution, p.city, p.field, p.overview, ...p.curriculum].join(" ").toLowerCase();
      return (
        haystack.includes(q.trim().toLowerCase()) &&
        (level === "All" || p.level === level) &&
        (city === "All" || p.city.includes(city) || city.includes(p.city)) &&
        (field === "All" || p.field === field)
      );
    });
  }, [q, level, city, field]);

  const inputClass = "min-h-12 w-full border border-[#173969]/20 bg-white px-4 text-xs text-[#183963] outline-none focus-visible:ring-2 focus-visible:ring-[#B69C71]";
  const fields = ["All", ...Array.from(new Set(comprehensiveProgrammes.map((p) => p.field)))];
  const cities = ["All", "Paris", "Bordeaux", "Grenoble", "Nice"];

  function clear() {
    setQ("");
    setLevel("All");
    setCity("All");
    setField("All");
  }

  const handleOpen = (prog: FranceDetailedProgramme) => {
    setSelectedProgramme(prog);
    setIsModalOpen(true);
  };

  const handleApply = (prog: FranceDetailedProgramme) => {
    const consultationSection = document.getElementById("consultation") || document.getElementById("apply-section");
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div data-hydrated={hydrated} className="mx-auto max-w-[1328px] px-5 pb-24 sm:px-9 lg:px-14">
      {/* Filters */}
      <div className="border border-[#173969]/15 bg-[#F2EDE4] p-5 sm:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[#566981]">Keyword</span>
            <span className="relative block">
              <Search className="absolute left-3 top-4 text-[#9F865D]" size={17} />
              <input
                className={inputClass + " pl-10"}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="AI, Finance, Luxury, Physics..."
              />
            </span>
          </label>
          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[#566981]">Degree Level</span>
            <select className={inputClass} value={level} onChange={(e) => setLevel(e.target.value)}>
              {["All", "Bachelor", "Master", "MSc"].map((v) => (
                <option key={v} value={v}>{v === "All" ? "All Degree Levels" : v}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[#566981]">City / Hub</span>
            <select className={inputClass} value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((v) => (
                <option key={v} value={v}>{v === "All" ? "All Locations" : v}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.15em] text-[#566981]">Discipline</span>
            <select className={inputClass} value={field} onChange={(e) => setField(e.target.value)}>
              {fields.map((v) => (
                <option key={v} value={v}>{v === "All" ? "All Disciplines" : v}</option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={clear}
          className="mt-5 min-h-11 text-[11px] font-semibold uppercase tracking-widest text-[#315586] hover:underline"
        >
          Reset all filters
        </button>
      </div>

      {/* Results Header */}
      <div className="my-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#193763]/15 pb-5">
        <h2 aria-live="polite" className="font-display text-3xl">
          {results.length} English-taught degree {results.length === 1 ? "programme" : "programmes"}
        </h2>
        <p className="max-w-lg text-xs leading-6 text-[#65728A]">
          Direct access to full syllabus, eligibility criteria, tuition fees, and career outcomes without leaving the Althéa platform.
        </p>
      </div>

      {/* Grid */}
      {results.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((p, i) => (
            <article
              key={p.id}
              className="flex flex-col justify-between border border-[#193763]/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B49A72] hover:shadow-xl sm:p-9"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-[#AB9069]">
                    Programme / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#173969] bg-[#F2EDE5] px-2.5 py-1">
                    {p.credits}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl leading-[1.15] text-[#142E61]">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs font-semibold text-[#345A87]">
                  {p.institution} · {p.city}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-[#586980] line-clamp-3">
                  {p.overview}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="border border-[#193763]/15 bg-[#FBF9F5] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#153260]">
                    {p.level}
                  </span>
                  <span className="border border-[#193763]/15 bg-[#FBF9F5] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#153260]">
                    {p.field}
                  </span>
                  <span className="border border-[#193763]/15 bg-[#FBF9F5] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#153260]">
                    {p.duration}
                  </span>
                </div>
              </div>

              <div className="mt-7 border-t border-[#193763]/15 pt-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-[#8B754F]">Tuition</p>
                  <p className="text-xs font-bold text-[#153260]">{p.tuitionNonEU}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(p)}
                  className="inline-flex items-center gap-2 bg-[#173969] px-5 py-3 text-[11px] font-semibold uppercase tracking-[.1em] text-white hover:bg-[#31558C] transition-colors"
                >
                  View Programme Dossier <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-[#193763]/15 p-10 text-center">
          <p className="font-display text-3xl">No matching programmes found.</p>
          <p className="mt-3 text-sm text-[#65728A]">Try adjusting your search filters above.</p>
          <button onClick={clear} className="mt-5 min-h-11 bg-[#173969] px-6 text-xs text-white" type="button">
            Reset filters
          </button>
        </div>
      )}

      {/* Programme Modal */}
      <ProgrammeModal
        programme={selectedProgramme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />
    </div>
  );
}