"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, ChevronRight, Building, Award, CheckCircle2, X, ArrowRight } from "lucide-react";
import { institutions, type FranceInstitution } from "@/data/franceDirectory";

export default function UniversityExplorer() {
  const [hydrated, setHydrated] = useState(false);
  const [selectedInst, setSelectedInst] = useState<FranceInstitution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => setHydrated(true), []);

  const [q, setQ] = useState("");
  const [city, setCity] = useState("All");
  const [field, setField] = useState("All");

  const cities = ["All", ...Array.from(new Set(institutions.map((u) => u.city)))];
  const fields = ["All", ...Array.from(new Set(institutions.flatMap((u) => u.focus)))].sort();

  const results = useMemo(
    () =>
      institutions.filter(
        (u) =>
          [u.name, u.city, u.region, u.description, ...u.focus].join(" ").toLowerCase().includes(q.toLowerCase().trim()) &&
          (city === "All" || u.city === city) &&
          (field === "All" || u.focus.includes(field))
      ),
    [q, city, field]
  );

  const clear = () => {
    setQ("");
    setCity("All");
    setField("All");
  };

  const handleOpen = (inst: FranceInstitution) => {
    setSelectedInst(inst);
    setIsModalOpen(true);
  };

  const inputClass = "min-h-12 w-full border border-[#193763]/20 bg-white px-4 text-xs text-[#16315A] outline-none focus-visible:ring-2 focus-visible:ring-[#B69C71]";

  return (
    <section data-hydrated={hydrated} aria-label="University explorer" className="mx-auto max-w-[1328px] px-5 pb-24 sm:px-9 lg:px-14">
      {/* Search Filter Box */}
      <div className="border border-[#193763]/15 bg-[#F8F5EF] p-5 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl text-[#15325E] sm:text-4xl">Find your university in France.</h2>
          <button onClick={clear} className="min-h-11 text-xs font-semibold uppercase tracking-widest text-[#315586] hover:underline" type="button">
            Clear all filters
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#576884]">Search university or subject</span>
            <span className="relative block">
              <Search size={17} aria-hidden className="absolute left-3 top-4 text-[#70809A]" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Paris, science, business..." className={inputClass + " pl-10"} />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#576884]">Location</span>
            <select className={inputClass} value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (
                <option value={c} key={c}>
                  {c === "All" ? "All cities" : c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#576884]">Discipline</span>
            <select className={inputClass} value={field} onChange={(e) => setField(e.target.value)}>
              {fields.map((f) => (
                <option value={f} key={f}>
                  {f === "All" ? "All disciplines" : f}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="my-8 flex flex-wrap justify-between gap-3 border-b border-[#173667]/15 pb-5">
        <h2 aria-live="polite" className="font-display text-2xl text-[#143465]">
          {results.length} {results.length === 1 ? "university" : "universities"} to explore
        </h2>
        <p className="max-w-md text-xs leading-5 text-[#64718A]">
          Direct institutional dossiers, verified admission criteria, and scholarship quotas accessible inside Althéa.
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {results.map((u, i) => (
            <article
              key={u.id}
              className="group flex flex-col justify-between border border-[#173667]/15 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B49A72] hover:shadow-xl sm:p-9"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-[.23em] text-[#B09368]">
                    Établissement / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#65738A]">
                    <MapPin size={14} aria-hidden />
                    {u.city} · {u.region}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight text-[#143465] sm:text-4xl">{u.name}</h3>
                <p className="mt-4 text-xs leading-relaxed text-[#53647A]">{u.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {u.focus.map((f) => (
                    <span key={f} className="border border-[#193763]/15 px-2.5 py-1 text-[10px] uppercase tracking-wide text-[#34527B]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7 border-t border-[#193763]/15 pt-5 flex items-center justify-between">
                <p className="text-xs text-[#65738A]">{u.degreeLevels.join(" · ")} · {u.language}</p>
                <button
                  type="button"
                  onClick={() => handleOpen(u)}
                  className="inline-flex items-center gap-2 bg-[#173969] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2D5590] transition-colors"
                >
                  Explore University Dossier <ChevronRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-[#193763]/15 p-10 text-center">
          <p className="font-display text-3xl text-[#143465]">No matches found.</p>
          <p className="mt-3 text-sm text-[#53647A]">Try fewer filters or clear search.</p>
          <button type="button" onClick={clear} className="mt-6 min-h-11 bg-[#173969] px-6 text-xs text-white">
            Reset filters
          </button>
        </div>
      )}

      {/* University In-App Dossier Modal */}
      {isModalOpen && selectedInst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a1832]/80 backdrop-blur-sm animate-in fade-in duration-200" role="dialog" aria-modal="true">
          <div className="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-[#FCFAF6] border border-[#173969]/20 shadow-2xl overflow-hidden rounded-none">
            <div className="p-6 sm:p-8 bg-[#142E61] text-white flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C99D]">{selectedInst.region}</span>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl text-white">{selectedInst.name}</h2>
                <p className="mt-2 text-xs text-white/70 flex items-center gap-1.5"><MapPin size={13} /> {selectedInst.city}, France</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-[#153260]">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7D4C]">Overview & Prestige</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#4d5e75]">{selectedInst.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#173969]/15 bg-white p-4">
                  <span className="text-[10px] uppercase font-bold text-[#8A7145]">Available Degree Levels</span>
                  <p className="mt-1 text-sm font-semibold text-[#153260]">{selectedInst.degreeLevels.join(" · ")}</p>
                </div>
                <div className="border border-[#173969]/15 bg-white p-4">
                  <span className="text-[10px] uppercase font-bold text-[#8A7145]">Language of Instruction</span>
                  <p className="mt-1 text-sm font-semibold text-[#153260]">{selectedInst.language}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7D4C]">Primary Academic Disciplines</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedInst.focus.map((f) => (
                    <span key={f} className="border border-[#173969]/20 bg-[#F4EFE6] px-3.5 py-1.5 text-xs font-medium text-[#173969]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-[#173969] bg-[#F3EFE7] p-5">
                <h4 className="text-xs font-bold uppercase text-[#142E61]">Althéa Direct Guidance Pathway</h4>
                <p className="mt-1 text-xs text-[#54657d] leading-5">
                  Our Paris-based advisory team coordinates directly with French universities, reviewing your academic profile against official faculty admission thresholds, assisting in statement of purpose crafting, and scheduling your Campus France interview.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#F2EDE5] border-t border-[#173969]/15 flex items-center justify-between">
              <span className="text-xs text-[#63748c]">Verified Institutional Dossier</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#173969]/30 px-5 py-2.5 text-xs font-semibold uppercase text-[#173969] hover:bg-white"
                >
                  Close
                </button>
                <a
                  href="/#consultation"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#173969] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#28528f]"
                >
                  Apply to this University <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}