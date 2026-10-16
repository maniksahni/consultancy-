"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  MapPin,
  Euro,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Building,
  ChevronRight,
  Sparkles,
  Calculator,
  Globe,
  Award,
  Compass,
  FileText,
  TrendingUp,
  Receipt,
  Scale,
  Flame,
  MessageSquare,
  Check,
  Layers,
  Filter,
  SlidersHorizontal,
  X
} from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import {
  globalJobsList,
  countriesWorkRegistry,
  type CountryCode,
  type GlobalJob,
  type CountryWorkInfo
} from "@/data/globalJobsData";
import { deepCountryProfiles, type CountryDeepProfile } from "@/data/deepCareerData";
import GlobalJobModal from "@/components/althea/GlobalJobModal";
import FranceEnquiryForm from "@/components/althea/FranceEnquiryForm";

const countryOptions: { code: "all" | CountryCode; label: string; flag: string; coords: string }[] = [
  { code: "all", label: "All Destinations (7)", flag: "🌐", coords: "GLOBAL / 01–07" },
  { code: "france", label: "France", flag: "🇫🇷", coords: "FR 48°51′N · 02°21′E" },
  { code: "uk", label: "United Kingdom", flag: "🇬🇧", coords: "UK 51°50′N · 00°07′W" },
  { code: "usa", label: "United States", flag: "🇺🇸", coords: "US 40°71′N · 74°00′W" },
  { code: "canada", label: "Canada", flag: "🇨🇦", coords: "CA 43°65′N · 79°38′W" },
  { code: "germany", label: "Germany", flag: "🇩🇪", coords: "DE 52°52′N · 13°40′E" },
  { code: "australia", label: "Australia", flag: "🇦🇺", coords: "AU 33°86′S · 151°20′E" },
  { code: "ireland", label: "Ireland", flag: "🇮🇪", coords: "IE 53°34′N · 06°26′W" },
];

type ActiveTab =
  | "jobs"
  | "salaries"
  | "visa-roadmap"
  | "tax-takehome"
  | "cv-standards"
  | "statutory-rights"
  | "shortage-lists"
  | "interview-culture";

type PathwayType = "all" | "Graduate Full-Time" | "Internship / Co-op" | "Apprenticeship / Werkstudent" | "Student Part-Time";

const pathwayPillars: {
  id: PathwayType;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  count: number;
}[] = [
  {
    id: "Graduate Full-Time",
    index: "01",
    title: "Graduate Full-Time",
    subtitle: "CDI, Skilled Worker & Blue Card",
    description: "Long-term professional contracts, full health coverage, and statutory settlement routes.",
    count: 26,
  },
  {
    id: "Internship / Co-op",
    index: "02",
    title: "Paid Internships & Co-ops",
    subtitle: "Stages & Academic Placements",
    description: "Paid corporate experience fulfilling university ECTS degree requirements.",
    count: 14,
  },
  {
    id: "Apprenticeship / Werkstudent",
    index: "03",
    title: "Alternance & Werkstudent",
    subtitle: "Work-Study with Tuition Paid",
    description: "Company funds 100% of your tuition while paying you a monthly statutory salary.",
    count: 12,
  },
  {
    id: "Student Part-Time",
    index: "04",
    title: "Student Part-Time & Campus",
    subtitle: "Living Income Support",
    description: "Barista, academic tutoring, luxury retail, and campus service roles (15–20h/wk).",
    count: 18,
  },
];

type CareerRoleBlueprint = {
  id: string;
  index: string;
  title: string;
  sector: string;
  summary: string;
  routes: string[];
  skills: string[];
  qualifications: string[];
  salaryRange: string;
  licensure: string;
  sampleEmployers: string[];
};

const careerRoleBlueprints: CareerRoleBlueprint[] = [
  {
    id: "mech-eng",
    index: "01",
    title: "Mechanical Engineer",
    sector: "Engineering & Aerospace",
    summary: "Design, test, simulate, and improve mechanical products, propulsion machinery, thermodynamic systems, and precision robotic assemblies.",
    routes: ["Direct Full-Time Job (CDI / Direct Hire)", "Paid Internship / Convention de Stage", "Alternance / Work-Study"],
    skills: ["CAD Modeling (SolidWorks / CATIA V5 / NX)", "Finite Element Analysis (FEA / ANSYS)", "Thermodynamics & Heat Transfer (CFD)", "GD&T & Tolerance Stack-ups", "DFMA (Design for Manufacturing & Assembly)"],
    qualifications: ["B.E. / B.Tech / M.S. in Mechanical or Aerospace Engineering", "FE (Fundamentals of Engineering) / CTI accreditation track", "Demonstrated parametric 3D CAD portfolio"],
    salaryRange: "Junior: $85,000–$98,000 (€44k–€50k) · Mid: $105,000–$125,000 (€55k–€65k) · Senior: $140,000+ (€75k+)",
    licensure: "US: 36-Mo STEM OPT · FE/PE Licensure · France: Diplôme d'Ingénieur (CTI) · 2-Yr APS/RECE · UK: IMechE CEng",
    sampleEmployers: ["Boeing", "Tesla", "Airbus", "Safran", "BMW", "Lockheed Martin", "Dassault Aviation"]
  },
  {
    id: "civil-eng",
    index: "02",
    title: "Civil & Infrastructure Engineer",
    sector: "Engineering & Aerospace",
    summary: "Plan, model, and deliver municipal infrastructure, bridge spans, transportation corridors, structural foundations, and sustainable urban civil projects.",
    routes: ["Direct Full-Time Job (CDI / Direct Hire)", "Paid Internship / Co-op", "Alternance / Work-Study"],
    skills: ["Revit BIM & AutoCAD Civil 3D Modeling", "Structural Analysis (SAP2000 / ETABS)", "Building Codes (Eurocodes 2/3, AASHTO, ASCE 7, IBC)", "Geotechnical Soil Mechanics & Boring Analysis", "Stormwater Drainage & Environmental Impact"],
    qualifications: ["Degree in Civil, Structural, or Environmental Engineering", "FE/EIT exam certified or scheduled", "Familiarity with municipal construction codes"],
    salaryRange: "Junior: $82,000–$95,000 (€42k–€48k) · Mid: $102,000–$120,000 (€52k–€62k) · Senior: $135,000+ (€72k+)",
    licensure: "US: 36-Mo STEM OPT · PE License · France: Grand Paris Express Fast-Track · 2-Yr APS · UK: ICE Chartered",
    sampleEmployers: ["AECOM", "Vinci Construction", "Jacobs", "WSP Global", "Bouygues", "Hochtief", "Mott MacDonald"]
  },
  {
    id: "swe-dev",
    index: "03",
    title: "Software & Distributed Systems Engineer",
    sector: "Tech & AI",
    summary: "Architect, develop, and benchmark high-scale distributed backends, cloud microservices, and low-latency API infrastructure.",
    routes: ["Direct Full-Time Job (CDI / Direct Hire)", "Paid Internship / Stage", "Alternance / Werkstudent"],
    skills: ["High-Performance C++20, Go, Rust & Python", "Distributed Consensus, Caching & SQL (PostgreSQL/Redis)", "Cloud Native Kubernetes & Terraform (AWS/GCP)", "CI/CD Pipelines, Docker & Microservices Observability"],
    qualifications: ["B.S. / M.S. in Computer Science or Software Engineering", "Mastery of algorithms, data structures & systems design", "Valid student or post-study work visa"],
    salaryRange: "Junior: $110,000–$135,000 (€48k–€56k) · Mid: $140,000–$175,000 (€62k–€78k) · Senior: $180,000+ (€90k+)",
    licensure: "US: 36-Mo STEM OPT · H-1B · France: French Tech Visa / Passeport Talent · UK: Global Talent Visa",
    sampleEmployers: ["Google", "Meta", "Mistral AI", "Shopify", "Datadog", "Spotify", "SAP"]
  },
  {
    id: "data-ai",
    index: "04",
    title: "Data Scientist & AI Specialist",
    sector: "Tech & AI",
    summary: "Build machine learning models, neural network pipelines, statistical forecasting engines, and generative AI foundational systems.",
    routes: ["Direct Full-Time Job (CDI / Direct Hire)", "Paid Internship / Stage", "Alternance / Werkstudent"],
    skills: ["PyTorch, Hugging Face & Transformer Architectures", "Big Data Pipelines (Spark, Snowflake, dbt, SQL)", "Stochastic Modeling & Bayesian Inference", "MLOps, Model Quantization & TensorRT Inference"],
    qualifications: ["M.S. in Data Science, Statistics, AI or Applied Math", "Proficiency with Python data stack (Pandas, Scikit-learn)", "Portfolio of deployed ML models or research publications"],
    salaryRange: "Junior: $100,000–$125,000 (€46k–€54k) · Mid: $130,000–$160,000 (€60k–€75k) · Senior: $170,000+ (€85k+)",
    licensure: "US: 36-Mo STEM OPT · France: 2-Year APS / RECE · EU Blue Card · Ireland: Stamp 1G",
    sampleEmployers: ["Amazon AWS", "OpenAI", "BNP Paribas", "Sanofi", "Siemens Healthineers", "Stripe"]
  },
  {
    id: "elec-embed",
    index: "05",
    title: "Electrical & Embedded Systems Engineer",
    sector: "Engineering & Aerospace",
    summary: "Design avionics firmware, IoT hardware, mixed-signal PCB circuits, and robotics motion control algorithms.",
    routes: ["Direct Full-Time Job (CDI / Direct Hire)", "Paid Internship / Stage", "Alternance / Work-Study"],
    skills: ["Embedded C/C++, RTOS, and Linux Kernel Drivers", "PCB Schematic & Layout (Altium Designer / KiCAD)", "Automotive & Aerospace Protocols (CAN, SPI, DO-254)", "Oscilloscope Telemetry, Signal Integrity & EMC"],
    qualifications: ["Degree in Electrical, Electronics, or Mechatronics Engineering", "Hands-on soldering, microcontroller & PCB fabrication experience"],
    salaryRange: "Junior: $88,000–$105,000 (€45k–€52k) · Mid: $112,000–$130,000 (€56k–€68k) · Senior: $145,000+ (€80k+)",
    licensure: "US: 36-Mo STEM OPT · France: CTI Titre d'Ingénieur · Germany: VDI Recognition",
    sampleEmployers: ["Tesla", "Apple", "STMicroelectronics", "Schneider Electric", "Bosch", "Infineon"]
  },
  {
    id: "biomed-eng",
    index: "06",
    title: "Biomedical & Medical Device Engineer",
    sector: "Healthcare & Science",
    summary: "Develop biocompatible surgical implants, clinical diagnostic equipment, and molecular assay automated devices.",
    routes: ["Direct Full-Time Job (CDI / Direct Hire)", "Paid Internship / Stage", "Alternance / Work-Study"],
    skills: ["FDA 510(k) & EU MDR Medical Device Regulations", "SolidWorks Medical Device Modeling & Bio-Fluidics", "Aseptic Lab Protocols & ISO 10993 Biocompatibility", "Statistical Verification & Clinical Trial Protocol Design"],
    qualifications: ["Degree in Biomedical, Bioengineering, or Mechanical Engineering", "Familiarity with medical device quality systems (ISO 13485)"],
    salaryRange: "Junior: $84,000–$98,000 (€42k–€48k) · Mid: $104,000–$122,000 (€54k–€64k) · Senior: $138,000+ (€75k+)",
    licensure: "US: 36-Mo STEM OPT · Ireland: Stamp 1G Medtech Corridor · France: 2-Year APS",
    sampleEmployers: ["Medtronic", "Pfizer", "Boston Scientific", "Johnson & Johnson", "Sanofi", "Bio-Rad"]
  }
];

export default function GlobalJobsPage() {
  const [selectedCountry, setSelectedCountry] = useState<"all" | CountryCode>("all");
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>("all");
  const [activeTab, setActiveTab] = useState<ActiveTab>("jobs");
  const [viewMode, setViewMode] = useState<"all" | "jobs" | "blueprints">("all");
  const [selectedJob, setSelectedJob] = useState<GlobalJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [q, setQ] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All");

  // Country profiles resolution
  const activeCountryCode: CountryCode = selectedCountry === "all" ? "france" : selectedCountry;
  const activeCountryInfo: CountryWorkInfo = countriesWorkRegistry[activeCountryCode];
  const activeDeepProfile: CountryDeepProfile = deepCountryProfiles[activeCountryCode];

  // Simulator State
  const defaultWageNumber =
    activeCountryCode === "australia"
      ? 25
      : activeCountryCode === "usa"
      ? 16
      : activeCountryCode === "canada"
      ? 17
      : activeCountryCode === "uk"
      ? 12
      : 13;

  const [calcHours, setCalcHours] = useState(15);
  const [calcRate, setCalcRate] = useState(defaultWageNumber);

  const calculatedMonthlyGross = Math.round(calcHours * 4.33 * calcRate);
  const calculatedMonthlyNet = Math.round(
    calculatedMonthlyGross * (activeDeepProfile?.taxInfo?.estimatedNetMultiplier || 0.8)
  );

  const fields = [
    "All",
    "Tech & AI",
    "Finance & Banking",
    "Engineering & Aerospace",
    "Healthcare & Science",
    "Luxury & Retail",
    "Education & Tutoring",
    "Hospitality & Food",
    "Consulting & Strategy"
  ];

  const filteredJobs = useMemo(() => {
    return globalJobsList.filter((job) => {
      const matchCountry = selectedCountry === "all" || job.country === selectedCountry;
      const matchPathway = selectedPathway === "all" || job.contractType === selectedPathway;
      const matchField = fieldFilter === "All" || job.field === fieldFilter;
      const matchQuery = [
        job.title,
        job.company,
        job.city,
        job.countryName,
        job.description,
        job.field,
        ...job.responsibilities,
        ...job.qualifications
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase().trim());
      return matchCountry && matchPathway && matchField && matchQuery;
    });
  }, [selectedCountry, selectedPathway, fieldFilter, q]);

  const filteredBlueprints = useMemo(() => {
    return careerRoleBlueprints.filter((bp) => {
      const matchField =
        fieldFilter === "All" ||
        (fieldFilter === "Engineering & Aerospace" && bp.sector.includes("Engineering")) ||
        (fieldFilter === "Tech & AI" && bp.sector.includes("Tech")) ||
        (fieldFilter === "Healthcare & Science" && bp.sector.includes("Healthcare")) ||
        bp.sector.toLowerCase().includes(fieldFilter.toLowerCase());

      const matchQuery = [
        bp.title,
        bp.sector,
        bp.summary,
        ...bp.skills,
        ...bp.qualifications,
        ...bp.sampleEmployers
      ]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase().trim());

      return matchField && matchQuery;
    });
  }, [fieldFilter, q]);

  const openJob = (job: GlobalJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApply = (_job: GlobalJob) => {
    const el = document.getElementById("apply-portal");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCountryChange = (code: "all" | CountryCode) => {
    setSelectedCountry(code);
    if (code !== "all") {
      const rate =
        code === "australia" ? 25 : code === "usa" ? 16 : code === "canada" ? 17 : code === "uk" ? 12 : 13;
      setCalcRate(rate);
    }
  };

  const hasActiveFilters =
    selectedCountry !== "all" ||
    selectedPathway !== "all" ||
    fieldFilter !== "All" ||
    q.trim().length > 0 ||
    viewMode !== "all";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FAF7F2] text-[#142E61]">
      <AltheaHeader />

      {/* ── ARCHITECTURAL GEODETIC HERO / COMMAND DECK ── */}
      <section className="relative overflow-hidden bg-[#142E61] px-5 pb-16 pt-12 text-white sm:px-9 sm:py-20 lg:px-14 border-b border-[#E5C99D]/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10rem] -top-[10rem] h-[48rem] w-[48rem] rounded-full border border-white/10 shadow-[0_0_0_120px_rgba(255,255,255,.015)]"
        />

        <div className="relative mx-auto max-w-[1360px]">
          {/* Breadcrumb & Geodetic Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/65 border-b border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white transition-colors">Althéa Home</Link>
              <span>/</span>
              <span className="text-[#E4C99B] font-medium">The Global Opportunity Index</span>
            </div>
            <div className="font-mono text-[11px] tracking-widest text-[#E5C99D]/90 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TERMINAL 2026 · 07 DESTINATIONS ACTIVE</span>
            </div>
          </div>

          {/* Main Title & Editorial Thesis */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#D7BA87]">
                THE OPPORTUNITY INDEX · 2026 EDITION
              </p>
              <h1 className="mt-4 font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.92] tracking-[-0.04em] text-white">
                Make your next move<br />
                <em className="font-normal italic text-[#E4C99B]">mean something.</em>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Explore the roles, internships, and work-study routes that accelerate your global ambition. Start with France, then navigate verified career pathways across all seven destinations.
              </p>
            </div>

            {/* Geodetic Coordinates & Mission Stats Badge */}
            <div className="lg:col-span-4 bg-white/[0.06] backdrop-blur-md border border-white/15 p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C99D]">
                  {selectedCountry === "all" ? "GLOBAL SYSTEM" : countryOptions.find((c) => c.code === selectedCountry)?.coords}
                </span>
                <span className="text-xs bg-[#E5C99D] text-[#142E61] font-bold px-2.5 py-0.5">
                  VERIFIED DIRECTORY
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="border-r border-white/15 pr-2">
                  <span className="font-display text-3xl sm:text-4xl text-white block">07</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/70 block mt-1">Destinations</span>
                </div>
                <div className="border-r border-white/15 px-2">
                  <span className="font-display text-3xl sm:text-4xl text-[#E5C99D] block">70+</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/70 block mt-1">Live Dossiers</span>
                </div>
                <div className="pl-2">
                  <span className="font-display text-3xl sm:text-4xl text-white block">04</span>
                  <span className="text-[10px] uppercase tracking-wider text-white/70 block mt-1">Pathways</span>
                </div>
              </div>
            </div>
          </div>

          {/* Destination Selector Tabs */}
          <div className="mt-12 pt-6 border-t border-white/15">
            <div className="flex items-center justify-between mb-3 text-xs text-white/75 font-medium">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D7BA87]">
                Select Destination Country ({countryOptions.length - 1} Nations Available)
              </span>
              <span className="text-white/60 hidden sm:inline">Click country pill to filter intelligence &amp; jobs</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {countryOptions.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountryChange(c.code)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                    selectedCountry === c.code
                      ? "bg-[#E5C99D] text-[#142E61] border-[#E5C99D] font-bold shadow-lg scale-[1.02]"
                      : "bg-white/10 text-white/85 border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PILLARS OF OPPORTUNITY (INTERACTIVE MATRIX) ── */}
      <section className="mx-auto max-w-[1360px] px-5 py-12 sm:px-9 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#142E61]/15 pb-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B6E3F] block">
              START WHERE YOU ARE
            </span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
              Choose your kind of opportunity.
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#52637b] leading-relaxed">
            Every route is structured for your career stage. Filter by pathway type to see verified compensation, visa rights, and employer expectations.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pathwayPillars.map((p) => {
            const isSelected = selectedPathway === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPathway(isSelected ? "all" : p.id);
                  setActiveTab("jobs");
                }}
                className={`flex flex-col justify-between text-left p-6 border transition-all duration-300 relative group ${
                  isSelected
                    ? "bg-[#142E61] text-white border-[#142E61] shadow-xl translate-y-[-2px]"
                    : "bg-white text-[#142E61] border-[#142E61]/15 hover:border-[#142E61] hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-4">
                    <span className={isSelected ? "text-[#E5C99D]" : "text-[#8B6E3F]"}>
                      {p.index} · PATHWAY
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold ${
                        isSelected ? "bg-[#E5C99D] text-[#142E61]" : "bg-[#F2EDE5] text-[#142E61]"
                      }`}
                    >
                      {p.count} Roles
                    </span>
                  </div>
                  <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                  <p
                    className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${
                      isSelected ? "text-[#E5C99D]/90" : "text-[#7a643b]"
                    }`}
                  >
                    {p.subtitle}
                  </p>
                  <p
                    className={`mt-3 text-xs leading-5 line-clamp-2 ${
                      isSelected ? "text-white/80" : "text-[#586980]"
                    }`}
                  >
                    {p.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold uppercase tracking-wider ${
                    isSelected ? "border-white/20 text-[#E5C99D]" : "border-[#142E61]/10 text-[#142E61]"
                  }`}
                >
                  <span>{isSelected ? "Filter Active" : "Explore Category"}</span>
                  <ArrowRight
                    size={15}
                    className={`transition-transform ${isSelected ? "translate-x-1" : "group-hover:translate-x-1"}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── DEEP INTELLIGENCE TAB BAR ── */}
      <section className="mx-auto max-w-[1360px] px-5 sm:px-9 lg:px-14">
        <div className="bg-white border border-[#142E61]/15 p-2 shadow-sm">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "jobs"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <Briefcase size={15} />
              <span>Job Directory ({filteredJobs.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("salaries")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "salaries"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <TrendingUp size={15} />
              <span>Salary Ladders &amp; Benchmarks</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("visa-roadmap")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "visa-roadmap"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <Compass size={15} />
              <span>Post-Study to PR Roadmap</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tax-takehome")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "tax-takehome"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <Receipt size={15} />
              <span>Tax &amp; Net Take-Home</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cv-standards")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "cv-standards"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <FileText size={15} />
              <span>CV / ATS Standards</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("statutory-rights")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "statutory-rights"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <Scale size={15} />
              <span>Statutory Employee Rights</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("shortage-lists")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "shortage-lists"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <Flame size={15} />
              <span>Shortage Lists (Fast-Track PR)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("interview-culture")}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeTab === "interview-culture"
                  ? "bg-[#142E61] text-[#E5C99D] border-[#142E61] shadow-sm"
                  : "bg-transparent text-[#5c6d84] border-transparent hover:text-[#142E61] hover:bg-[#F5F1E8]"
              }`}
            >
              <MessageSquare size={15} />
              <span>Hiring Culture &amp; Protocol</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── TAB 1: ACTIVE CAREER DIRECTORY & ARCHITECTURAL BLUEPRINTS ── */}
      {activeTab === "jobs" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          {/* CONTROL MATRIX / LUXURY SEARCH & FILTER CONSOLE */}
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E3F]">
                  LIVE DOSSIER CATALOG &amp; CAREER BLUEPRINTS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#142E61]">
                  Career Pathways &amp; Opportunities in {selectedCountry === "all" ? "All 7 Destinations" : activeCountryInfo.countryName}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-[#FAF7F2] border border-[#142E61]/15 px-3 py-1.5 text-xs font-bold text-[#142E61]">
                  Showing {filteredJobs.length + filteredBlueprints.length} Total Intelligence Records
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("all");
                      setSelectedPathway("all");
                      setFieldFilter("All");
                      setViewMode("all");
                      setQ("");
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#142E61] hover:text-red-700 transition-colors"
                  >
                    <X size={14} /> Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Filter Inputs Grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-12">
              {/* Search Keyword */}
              <div className="sm:col-span-5">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#63758e]">
                  Search Roles, Disciplines, CAD or Skills
                </label>
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-3.5 text-[#8897ac]" />
                  <input
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="e.g. Mechanical engineer, Civil engineer, CAD, AI, Finance, Nursing..."
                    className="w-full min-h-11 border border-[#142E61]/25 bg-[#FCFAF6] pl-10 pr-4 text-xs font-medium text-[#142E61] outline-none transition-all focus:border-[#142E61] focus:bg-white focus:ring-2 focus:ring-[#142E61]/20"
                  />
                </div>
              </div>

              {/* Pathway Dropdown */}
              <div className="sm:col-span-4">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#63758e]">
                  Pathway Type
                </label>
                <select
                  value={selectedPathway}
                  onChange={(e) => setSelectedPathway(e.target.value as PathwayType)}
                  className="w-full min-h-11 border border-[#142E61]/25 bg-[#FCFAF6] px-3.5 text-xs font-medium text-[#142E61] outline-none transition-all focus:border-[#142E61] focus:bg-white focus:ring-2 focus:ring-[#142E61]/20 cursor-pointer"
                >
                  <option value="all">All Pathways (Jobs, Stages, Alternance, Student)</option>
                  <option value="Graduate Full-Time">01 · Graduate Full-Time (CDI / Skilled)</option>
                  <option value="Internship / Co-op">02 · Paid Internships &amp; Co-ops</option>
                  <option value="Apprenticeship / Werkstudent">03 · Alternance / Werkstudent</option>
                  <option value="Student Part-Time">04 · Student Part-Time &amp; Campus</option>
                </select>
              </div>

              {/* Industry Field Dropdown */}
              <div className="sm:col-span-3">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#63758e]">
                  Industry Sector
                </label>
                <select
                  value={fieldFilter}
                  onChange={(e) => setFieldFilter(e.target.value)}
                  className="w-full min-h-11 border border-[#142E61]/25 bg-[#FCFAF6] px-3.5 text-xs font-medium text-[#142E61] outline-none transition-all focus:border-[#142E61] focus:bg-white focus:ring-2 focus:ring-[#142E61]/20 cursor-pointer"
                >
                  {fields.map((f) => (
                    <option key={f} value={f}>
                      {f === "All" ? "All Industry Sectors" : f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Display Mode Switcher */}
            <div className="mt-6 pt-5 border-t border-[#142E61]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#798ba0]">Display Mode:</span>
                <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 border border-[#142E61]/15">
                  <button
                    type="button"
                    onClick={() => setViewMode("all")}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      viewMode === "all"
                        ? "bg-[#142E61] text-[#E5C99D] shadow-xs"
                        : "text-[#586980] hover:text-[#142E61]"
                    }`}
                  >
                    All Records ({filteredJobs.length + filteredBlueprints.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("blueprints")}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      viewMode === "blueprints"
                        ? "bg-[#142E61] text-[#E5C99D] shadow-xs"
                        : "text-[#586980] hover:text-[#142E61]"
                    }`}
                  >
                    Role Blueprints ({filteredBlueprints.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("jobs")}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      viewMode === "jobs"
                        ? "bg-[#142E61] text-[#E5C99D] shadow-xs"
                        : "text-[#586980] hover:text-[#142E61]"
                    }`}
                  >
                    Live Vacancy Dossiers ({filteredJobs.length})
                  </button>
                </div>
              </div>

              <span className="text-xs text-[#52637b] hidden md:inline">
                Verified CAD, Mechanical, Civil &amp; Tech Engineering Specifications
              </span>
            </div>
          </div>

          {/* ── SECTION A: CAREER ROLE BLUEPRINTS (MECHANICAL, CIVIL, TECH, AI) ── */}
          {(viewMode === "all" || viewMode === "blueprints") && filteredBlueprints.length > 0 && (
            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#142E61] pb-4 mb-8">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8B6E3F]">
                    ARCHITECTURAL BLUEPRINTS · DISCIPLINE PREPARATION GUIDES
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#142E61] mt-1">
                    Engineering &amp; Professional Career Pathways
                  </h3>
                </div>
                <p className="text-xs text-[#52637b] max-w-md leading-relaxed">
                  Rigorous role-preparation dossiers detailing statutory compensation ladders, CAD competencies, licensure exams, and legal work permits.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredBlueprints.map((bp) => (
                  <article
                    key={bp.id}
                    className="flex flex-col justify-between border-2 border-[#142E61]/20 bg-white p-7 sm:p-9 shadow-sm hover:border-[#142E61] hover:shadow-xl transition-all relative group"
                  >
                    <div>
                      {/* Blueprint Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#142E61]/15 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#142E61] text-[#E5C99D] font-mono text-[11px] font-bold px-3 py-1">
                            #{bp.index} · CAREER BLUEPRINT
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8B6E3F]">
                            {bp.sector}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#142E61] bg-[#FAF7F2] border border-[#142E61]/15 px-2.5 py-1">
                          7 DESTINATIONS
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="mt-5">
                        <h4 className="font-display text-3xl sm:text-4xl text-[#142E61] leading-tight">
                          {bp.title}
                        </h4>
                        <p className="mt-3 text-xs leading-relaxed text-[#4d5e75]">
                          {bp.summary}
                        </p>
                      </div>

                      {/* Available Opportunity Routes - Distinct Spaced Pills */}
                      <div className="mt-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E3F] block mb-2">
                          Available Opportunity Routes:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {bp.routes.map((route, rIdx) => (
                            <span
                              key={rIdx}
                              className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#142E61]/20 px-3 py-1.5 text-xs font-semibold text-[#142E61] shadow-xs"
                            >
                              <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                              <span>{route}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Technical Competencies Grid */}
                      <div className="mt-5 bg-[#FAF7F2] border border-[#142E61]/15 p-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6E3F] block mb-2">
                          Core Technical &amp; CAD Modules:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {bp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="bg-white border border-[#142E61]/15 px-2.5 py-1 text-[11px] font-medium text-[#142E61]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Compensation & Statutory Licensure */}
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="bg-[#FAF7F2] border border-[#142E61]/15 p-3.5">
                          <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">
                            Compensation Ladders
                          </span>
                          <p className="font-bold text-[#142E61] mt-1 text-[11px] leading-relaxed">
                            {bp.salaryRange}
                          </p>
                        </div>

                        <div className="bg-[#FAF7F2] border border-[#142E61]/15 p-3.5">
                          <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">
                            Licensure &amp; Visa Framework
                          </span>
                          <p className="font-medium text-[#142E61] mt-1 text-[11px] leading-relaxed">
                            {bp.licensure}
                          </p>
                        </div>
                      </div>

                      {/* Target Employers */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#52637b]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#798ba0]">
                          Verified Employers:
                        </span>
                        {bp.sampleEmployers.map((emp, eIdx) => (
                          <span key={eIdx} className="font-semibold text-[#142E61] bg-white border border-[#142E61]/10 px-2 py-0.5 text-[11px]">
                            {emp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#142E61]/15 pt-5">
                      <a
                        href={`https://wa.me/33755749029?text=${encodeURIComponent(`Bonjour Althéa, I'd like to consult on the ${bp.title} pathway.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1EBE5D] transition-colors shadow-sm"
                      >
                        <span>Consult on WhatsApp</span>
                        <ArrowUpRight size={15} />
                      </a>

                      <a
                        href="#apply-portal"
                        className="inline-flex items-center gap-2 bg-[#142E61] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#E5C99D] hover:bg-[#204080] transition-colors"
                      >
                        <span>Submit Profile for Advisory</span>
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ── SECTION B: LIVE EMPLOYER DOSSIERS ── */}
          {(viewMode === "all" || viewMode === "jobs") && filteredJobs.length > 0 && (
            <div className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#142E61] pb-4 mb-8">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8B6E3F]">
                    VERIFIED VACANCIES · COMPREHENSIVE EMPLOYER DOSSIERS
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#142E61] mt-1">
                    Live Openings in {selectedCountry === "all" ? "All 7 Destinations" : activeCountryInfo.countryName} ({filteredJobs.length})
                  </h3>
                </div>
                <span className="text-xs text-[#52637b]">
                  CDI, Paid Stages, Alternance &amp; Student Work Roles
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredJobs.map((job, idx) => (
                  <article
                    key={job.id}
                    className="flex flex-col justify-between border-2 border-[#142E61]/15 bg-white p-7 sm:p-8 transition-all duration-300 hover:border-[#142E61] hover:shadow-xl relative group"
                  >
                    <div>
                      {/* Header Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#142E61]/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl leading-none">{job.countryFlag}</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#142E61]">
                            {job.countryName}
                          </span>
                          <span className="text-[#8B6E3F]">·</span>
                          <span className="text-[10px] font-mono font-bold text-[#8B6E3F] bg-[#FAF7F2] border border-[#142E61]/15 px-2 py-0.5">
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#142E61] text-[#E5C99D]">
                            {job.contractType}
                          </span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-[#5a6c84]">
                            <MapPin size={13} className="text-[#8B6E3F]" />
                            <span>{job.city}</span>
                          </span>
                        </div>
                      </div>

                      {/* Role Title & Employer */}
                      <div className="mt-5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#66778f] mb-1">
                          <Building size={14} className="text-[#8B6E3F]" />
                          <span>{job.company}</span>
                        </div>
                        <h4 className="font-display text-2xl sm:text-3xl text-[#142E61] leading-tight">
                          {job.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-xs leading-relaxed text-[#4b5c74] line-clamp-3">
                        {job.description}
                      </p>

                      {/* Key Attributes Tags */}
                      <div className="mt-5 grid gap-2 sm:grid-cols-2 text-xs">
                        <div className="bg-[#FAF7F2] border border-[#142E61]/15 p-3">
                          <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">Compensation</span>
                          <p className="font-bold text-[#142E61] mt-0.5 text-xs">{job.compensation}</p>
                        </div>

                        <div className="bg-[#FAF7F2] border border-[#142E61]/15 p-3">
                          <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">Work Authorization</span>
                          <p className="font-medium text-[#142E61] mt-0.5 text-xs line-clamp-1">{job.legalBasis}</p>
                        </div>
                      </div>

                      {/* Key Responsibilities Snippet */}
                      <div className="mt-5 space-y-1.5 border-t border-[#142E61]/10 pt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#687a93] block">
                          Core Responsibilities:
                        </span>
                        {job.responsibilities.slice(0, 2).map((res, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-1.5 text-xs text-[#3b4c62]">
                            <Check size={13} className="text-[#8B6E3F] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Bar */}
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#142E61]/15 pt-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[#66778f] bg-[#FAF7F2] px-2.5 py-1 border border-[#142E61]/10">
                          {job.field}
                        </span>
                        <span className="text-[11px] font-medium text-[#8B6E3F]">
                          {job.languageRequired}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/33755749029?text=${encodeURIComponent(`Bonjour Althéa, I'd like to consult on the ${job.title} (${job.company}, ${job.countryName}) position.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-[#142E61]/25 bg-[#FAF7F2] px-3.5 py-2 text-xs font-semibold text-[#142E61] hover:bg-[#142E61] hover:text-[#E5C99D] transition-colors"
                        >
                          <span>WhatsApp</span>
                          <ArrowUpRight size={13} />
                        </a>

                        <button
                          type="button"
                          onClick={() => openJob(job)}
                          className="inline-flex items-center gap-2 bg-[#142E61] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#E5C99D] hover:bg-[#204080] transition-colors"
                        >
                          <span>Inspect Dossier</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Empty State when no results in either */}
          {filteredJobs.length === 0 && filteredBlueprints.length === 0 && (
            <div className="mt-12 border-2 border-[#142E61]/20 bg-white p-14 text-center">
              <span className="text-4xl block mb-2">🔍</span>
              <h4 className="font-display text-3xl text-[#142E61]">No matching career dossiers or blueprints found.</h4>
              <p className="mt-2 text-xs text-[#63748c] max-w-md mx-auto">
                No roles match your combination of filters. Try searching for &quot;Mechanical&quot;, &quot;Civil&quot;, &quot;CAD&quot;, &quot;AI&quot;, or reset your filters below.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCountry("all");
                  setSelectedPathway("all");
                  setFieldFilter("All");
                  setViewMode("all");
                  setQ("");
                }}
                className="mt-6 bg-[#142E61] text-[#E5C99D] px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#204080]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* ── TAB 2: SALARY LADDERS & INDUSTRY BENCHMARKS ── */}
      {activeTab === "salaries" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  COMPENSATION MATRIX · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  Industry Salary Ladders (Junior, Mid, Senior)
                </h3>
              </div>
              <div className="bg-[#FAF7F2] border border-[#142E61]/15 px-4 py-2 text-right">
                <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">Statutory Base Pay</span>
                <span className="font-display text-xl text-[#142E61]">{activeDeepProfile.minWageGross}</span>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {activeDeepProfile.salaryBenchmarks.map((bench, idx) => (
                <div key={idx} className="border border-[#142E61]/20 bg-[#FAF7F2] p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#142E61]/10 pb-4">
                    <h4 className="font-display text-2xl text-[#142E61]">{bench.discipline}</h4>
                    <span className="bg-[#142E61] text-[#E5C99D] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                      Verified Market Grade
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="bg-white border border-[#142E61]/15 p-4">
                      <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">
                        Junior / Fresher (0–2 Yrs)
                      </span>
                      <p className="mt-1 font-display text-2xl text-[#142E61]">{bench.juniorSalary}</p>
                      <p className="mt-1 text-[11px] text-[#6b7b92]">Graduate entry-level base package</p>
                    </div>

                    <div className="bg-white border border-[#142E61]/15 p-4">
                      <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">
                        Mid-Level (2–5 Yrs)
                      </span>
                      <p className="mt-1 font-display text-2xl text-[#142E61]">{bench.midSalary}</p>
                      <p className="mt-1 text-[11px] text-[#6b7b92]">Autonomous professional rate</p>
                    </div>

                    <div className="bg-white border border-[#142E61]/15 p-4">
                      <span className="text-[10px] uppercase font-bold text-[#8B6E3F] block">
                        Senior / Lead (5+ Yrs)
                      </span>
                      <p className="mt-1 font-display text-2xl text-[#142E61]">{bench.seniorSalary}</p>
                      <p className="mt-1 text-[11px] text-[#6b7b92]">Principal / Tech Lead compensation</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 pt-4 border-t border-[#142E61]/10">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#142E61] block mb-2.5">
                        Top Hiring Employers in {activeDeepProfile.countryName}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {bench.topEmployers.map((emp, i) => (
                          <span
                            key={i}
                            className="bg-white border border-[#142E61]/15 px-3 py-1 text-xs font-medium text-[#142E61]"
                          >
                            {emp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#142E61] block mb-2.5">
                        Highest-Value Technical Stack &amp; Skills
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {bench.inDemandSkills.map((sk, i) => (
                          <span
                            key={i}
                            className="bg-[#EFE9DD] border border-[#142E61]/15 px-3 py-1 text-xs font-bold text-[#142E61]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 3: POST-STUDY TO PR ROADMAP ── */}
      {activeTab === "visa-roadmap" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  STATUTORY IMMIGRATION PATHWAY · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  From Student Visa to Permanent Residency (PR)
                </h3>
              </div>
              <div className="bg-[#142E61] text-[#E5C99D] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                PR Eligibility: {activeDeepProfile.prEligibilityYears}
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {activeDeepProfile.visaRoadmap.map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col justify-between border-2 border-[#142E61]/20 bg-[#FAF7F2] p-6"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8B6E3F] block">
                      {step.stage}
                    </span>
                    <h4 className="mt-2 font-display text-2xl text-[#142E61] leading-tight">{step.title}</h4>
                    <p className="mt-1.5 text-xs font-semibold text-[#142E61] bg-[#EAE3D5] inline-block px-2.5 py-0.5">
                      Duration: {step.duration}
                    </p>

                    <div className="mt-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#687a93] block">
                        Mandatory Requirements:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#4b5c73]">
                        {step.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <Check size={14} className="text-[#8B6E3F] shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#142E61]/15">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#142E61] block">
                      Key Career Outcome:
                    </span>
                    <p className="mt-1 text-xs text-[#2b3c53] font-medium leading-relaxed">
                      {step.keyOutcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#FAF7F2] border border-[#142E61]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#8A7145] block">
                  Final Settlement &amp; Passport Target
                </span>
                <p className="font-display text-2xl text-[#142E61]">{activeDeepProfile.prPathwayName}</p>
                <p className="text-xs text-[#54657c] mt-0.5">
                  Full permanent residency rights and passport naturalization pathway under national law.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("apply-portal");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#142E61] text-[#E5C99D] px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#204080] shrink-0"
              >
                Request 1-on-1 Visa Roadmap Consultation
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 4: TAX & TAKE-HOME INTELLIGENCE ── */}
      {activeTab === "tax-takehome" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  STATUTORY PAYROLL &amp; SOCIAL DEDUCTIONS · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  Tax Brackets &amp; Net Take-Home Pay
                </h3>
              </div>
              <div className="bg-[#FAF7F2] border border-[#142E61]/15 p-3 text-right">
                <span className="text-[10px] uppercase font-bold text-[#8A7145] block">Est. Take-Home Multiplier</span>
                <span className="font-display text-2xl text-[#142E61]">
                  {Math.round(activeDeepProfile.taxInfo.estimatedNetMultiplier * 100)}% Net Take-Home
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="font-display text-2xl text-[#142E61] mb-4">Official Progressive Tax Brackets</h4>
                <div className="border border-[#142E61]/15 divide-y divide-[#142E61]/10 bg-[#FAF7F2]">
                  {activeDeepProfile.taxInfo.brackets.map((br, idx) => (
                    <div key={idx} className="flex justify-between p-4 text-xs">
                      <span className="font-medium text-[#142E61]">{br.bracket}</span>
                      <span className="font-bold text-[#8B6E3F]">{br.rate}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 bg-[#FAF7F2] border-l-4 border-[#142E61]">
                  <strong className="text-xs text-[#142E61] block uppercase tracking-wider mb-1">
                    Student Statutory Tax Exemptions:
                  </strong>
                  <p className="text-xs leading-relaxed text-[#4b5b71]">
                    {activeDeepProfile.taxInfo.studentExemptions}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-[#142E61]/15 bg-[#FAF7F2] p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E3F] block">
                    Social Security &amp; Statutory Deductions
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-[#35465d]">
                    {activeDeepProfile.taxInfo.socialDeductions}
                  </p>
                </div>

                <div className="border border-[#142E61]/15 bg-[#FAF7F2] p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E3F] block">
                    Tax Identification &amp; Annual Filing
                  </span>
                  <p className="mt-1 font-display text-xl text-[#142E61]">{activeDeepProfile.taxInfo.taxIdName}</p>
                  <p className="mt-2 text-xs text-[#5a6a80]">
                    <strong>Filing Deadline:</strong> {activeDeepProfile.taxInfo.taxFilingDeadline}
                  </p>
                </div>

                <div className="border border-[#142E61]/15 bg-[#142E61] text-white p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C99D] block">
                    Student Living Cost Coverage
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/85">
                    {activeDeepProfile.livingCostVsEarnings.partTimeEarningsCoverage}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/15 flex justify-between text-xs text-white/70">
                    <span>Avg Rent: {activeDeepProfile.livingCostVsEarnings.avgStudentRent}</span>
                    <span>Total Living: {activeDeepProfile.livingCostVsEarnings.avgMonthlyLiving}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 5: CV & ATS RESUME STANDARDS ── */}
      {activeTab === "cv-standards" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  RECRUITMENT &amp; ATS PROTOCOLS · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  Official CV &amp; Resume Standards
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[#FAF7F2] border border-[#142E61]/15 px-3 py-1.5 text-xs font-bold text-[#142E61]">
                  Photo: {activeDeepProfile.cvFormatRules.photoRequired}
                </span>
                <span className="bg-[#142E61] text-[#E5C99D] px-3 py-1.5 text-xs font-bold">
                  Length: {activeDeepProfile.cvFormatRules.lengthPages}
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="font-display text-2xl text-[#142E61] mb-4">
                  Standard Section Hierarchy for {activeDeepProfile.countryName}
                </h4>
                <div className="space-y-3">
                  {activeDeepProfile.cvFormatRules.keySections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 border border-[#142E61]/15 bg-[#FAF7F2] p-4 text-xs font-medium text-[#142E61]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#142E61] text-[#E5C99D] text-[11px] font-bold">
                        {idx + 1}
                      </span>
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-2xl text-[#142E61] mb-4">
                  Critical Do&apos;s and Don&apos;ts
                </h4>
                <div className="space-y-3">
                  {activeDeepProfile.cvFormatRules.dosAndDonts.map((rule, idx) => (
                    <div
                      key={idx}
                      className={`p-4 text-xs border ${
                        rule.startsWith("DO")
                          ? "bg-emerald-50/80 border-emerald-800/20 text-emerald-950 font-medium"
                          : "bg-rose-50/80 border-rose-800/20 text-rose-950 font-medium"
                      }`}
                    >
                      {rule}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 bg-[#FAF7F2] border border-[#142E61]/15">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E3F] block">
                    Althéa Resume Tailoring Service
                  </span>
                  <p className="mt-1 text-xs text-[#52637b] leading-relaxed">
                    Our team converts your Indian or international resume into an ATS-optimized, recruiter-approved format aligned with {activeDeepProfile.countryName} legal norms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 6: STATUTORY EMPLOYEE RIGHTS ── */}
      {activeTab === "statutory-rights" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  LABOR CODE &amp; WELFARE STATUTES · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  Statutory Employee Rights &amp; Social Perks
                </h3>
              </div>
              <div className="bg-[#142E61] text-[#E5C99D] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Standard Week: {activeDeepProfile.standardWorkWeek}
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-[#142E61]/15 bg-[#FAF7F2] p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E3F] block">
                  Annual Paid Vacation Leave
                </span>
                <p className="mt-1 font-display text-2xl text-[#142E61]">{activeDeepProfile.statutoryAnnualLeave}</p>
                <p className="mt-2 text-xs text-[#5e7086]">Statutory paid time off per calendar year.</p>
              </div>

              <div className="border border-[#142E61]/15 bg-[#FAF7F2] p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E3F] block">
                  Public Commuter Subsidies
                </span>
                <p className="mt-2 text-xs leading-relaxed text-[#2f4057]">
                  {activeDeepProfile.commuterSubsidyRule}
                </p>
              </div>

              <div className="border border-[#142E61]/15 bg-[#FAF7F2] p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6E3F] block">
                  Meal Vouchers &amp; Workplace Perks
                </span>
                <p className="mt-2 text-xs leading-relaxed text-[#2f4057]">
                  {activeDeepProfile.mealVoucherPerk}
                </p>
              </div>
            </div>

            <div className="mt-6 p-5 bg-[#FAF7F2] border border-[#142E61]/15">
              <strong className="text-xs text-[#142E61] block uppercase tracking-wider mb-1">
                Equal Protection Under National Law:
              </strong>
              <p className="text-xs leading-relaxed text-[#4b5b71]">
                Under national labor legislation in {activeDeepProfile.countryName}, international students and foreign workers on valid work permits are protected by identical minimum wage laws, anti-discrimination statutes, workplace accident insurance, and termination notice periods as domestic citizens.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 7: SHORTAGE OCCUPATIONS (FAST-TRACK PR) ── */}
      {activeTab === "shortage-lists" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  GOVERNMENT PRIORITY SHORTAGE LISTS · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  Shortage Occupations &amp; Fast-Track PR
                </h3>
              </div>
              <span className="bg-[#142E61] text-[#E5C99D] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Exempt from Labor Market Testing
              </span>
            </div>

            <div className="mt-8 space-y-6">
              {activeDeepProfile.shortageOccupations.map((item, idx) => (
                <div key={idx} className="border border-[#142E61]/15 bg-[#FAF7F2] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#142E61]/10 pb-3">
                    <h4 className="font-display text-2xl text-[#142E61]">{item.sector}</h4>
                    <span className="text-xs font-semibold text-[#8B6E3F] bg-[#EAE2D2] px-2.5 py-1">
                      {item.officialListTitle}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#142E61] block mb-2">
                      In-Demand Eligible Job Titles:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.roles.map((r, rIdx) => (
                        <span
                          key={rIdx}
                          className="bg-white border border-[#142E61]/15 px-3 py-1.5 text-xs font-medium text-[#142E61]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#142E61]/10 text-xs text-[#4b5b71]">
                    <strong className="text-[#142E61]">Immigration Advantage:</strong> {item.fastTrackBenefits}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 8: INTERVIEW CULTURE & PROTOCOL ── */}
      {activeTab === "interview-culture" && (
        <section className="mx-auto max-w-[1360px] px-5 py-10 sm:px-9 lg:px-14">
          <div className="bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#142E61]/10 pb-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#8B6E3F]">
                  HIRING PROTOCOL &amp; INTERVIEW ETIQUETTE · {activeDeepProfile.flag} {activeDeepProfile.countryName}
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl text-[#142E61]">
                  Interview Process &amp; Cultural Norms
                </h3>
              </div>
              <span className="bg-[#142E61] text-[#E5C99D] px-4 py-2 text-xs font-bold uppercase tracking-wider">
                Turnaround: {activeDeepProfile.interviewCulture.turnaroundTime}
              </span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="font-display text-2xl text-[#142E61] mb-4">Typical Hiring Stages</h4>
                <div className="space-y-3">
                  {activeDeepProfile.interviewCulture.typicalRounds.map((round, idx) => (
                    <div
                      key={idx}
                      className="border border-[#142E61]/15 bg-[#FAF7F2] p-4 text-xs text-[#2a3c54] leading-relaxed"
                    >
                      <strong className="text-[#142E61] block mb-1">Stage {idx + 1}:</strong>
                      {round}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-2xl text-[#142E61] mb-4">Local Etiquette &amp; Expectations</h4>
                <div className="space-y-3">
                  {activeDeepProfile.interviewCulture.localEtiquette.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 border border-[#142E61]/15 bg-[#FAF7F2] p-4 text-xs text-[#2a3c54]"
                    >
                      <CheckCircle2 size={16} className="text-[#8B6E3F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── INTERACTIVE STUDENT LIVING EARNINGS SIMULATOR ── */}
      <section className="bg-[#EFEAE1] px-5 py-14 sm:px-9 lg:px-14 border-t border-b border-[#142E61]/15">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-white border-2 border-[#142E61]/15 p-6 sm:p-10 shadow-sm">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6E3F]">
                <Calculator size={17} /> {activeCountryInfo.flag} {activeCountryInfo.countryName} Student Living Support Simulator
              </div>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-[#142E61]">
                Estimate your monthly <em>living support.</em>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#5e6f85]">
                Calculate your estimated take-home paycheck based on {activeCountryInfo.countryName}&apos;s legal student hours and wages.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#142E61] mb-1">
                    <span>Weekly Work Hours: {calcHours} hrs/week</span>
                    <span className="text-[#8B6E3F]">{activeCountryInfo.termTimeHourLimit}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={calcHours}
                    onChange={(e) => setCalcHours(Number(e.target.value))}
                    className="w-full accent-[#142E61] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#142E61] mb-1">
                    <span>Hourly Pay: {activeCountryInfo.currencySymbol}{calcRate}.00 / hr</span>
                    <span className="text-[#8B6E3F]">Statutory: {activeCountryInfo.minHourlyWage}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full accent-[#142E61] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Box */}
            <div className="w-full lg:w-84 bg-[#142E61] text-white p-7 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C99D]">
                  Estimated Take-Home (Net)
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-white">
                    {activeCountryInfo.currencySymbol}{calculatedMonthlyNet.toLocaleString()}
                  </span>
                  <span className="text-xs text-white/70">/ month</span>
                </div>
                <p className="mt-1 text-xs text-white/60">
                  Gross: approx. {activeCountryInfo.currencySymbol}{calculatedMonthlyGross.toLocaleString()} / mo
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 space-y-2 text-xs">
                <p className="text-white/80">
                  Typical Student Net: <strong>{activeCountryInfo.avgStudentMonthlyNet}</strong>
                </p>
                <div className="flex items-center gap-1.5 text-[#E5C99D] font-medium">
                  <CheckCircle2 size={14} />
                  <span>100% Authorized on Student Visa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL GUIDANCE STATEMENT (ALTHEA COMPASS) ── */}
      <section className="bg-[#142E61] px-5 py-20 text-white sm:px-9 lg:px-14 border-t border-b border-[#E5C99D]/20">
        <div className="mx-auto max-w-[1360px]">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D7BA87]">
              A LITTLE HELP, WHEN YOU WANT IT
            </span>
            <h3 className="mt-3 font-display text-4xl sm:text-5xl text-white leading-tight">
              Good guidance can change <em className="font-normal italic text-[#E4C99B]">the whole search.</em>
            </h3>
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              Navigating international job markets requires more than sending generic applications. Here is how Althéa aligns your background with employer reality:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="bg-white/[0.06] border border-white/15 p-8 backdrop-blur-sm transition-all hover:border-[#E5C99D]/50 hover:bg-white/[0.09] group">
              <span className="font-mono text-3xl font-display text-[#E5C99D] block mb-4">01</span>
              <h4 className="font-display text-2xl text-white leading-tight">
                Make your experience clear on your CV.
              </h4>
              <p className="mt-3 text-xs leading-relaxed text-white/75">
                Every country reads a CV differently. In France, brevity and diploma accreditation matter; in the US, quantifiable metric impacts on a 1-page ATS resume decide interviews; in the UK and Germany, formal proof certificates and chronological work records carry legal weight. We reconstruct your Indian engineering experience into their exact standard.
              </p>
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-[#E5C99D]">
                <CheckCircle2 size={15} />
                <span>Zero ATS Rejection Formatting</span>
              </div>
            </div>

            <div className="bg-white/[0.06] border border-white/15 p-8 backdrop-blur-sm transition-all hover:border-[#E5C99D]/50 hover:bg-white/[0.09] group">
              <span className="font-mono text-3xl font-display text-[#E5C99D] block mb-4">02</span>
              <h4 className="font-display text-2xl text-white leading-tight">
                Understand what employers in your field expect.
              </h4>
              <p className="mt-3 text-xs leading-relaxed text-white/75">
                International hiring managers look for specific engineering codes—from FE/PE licensure and AASHTO in America to Eurocodes 2/3 and CTI accreditation in France. We translate your syllabus so you speak the exact technical language hiring leads respect.
              </p>
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-[#E5C99D]">
                <CheckCircle2 size={15} />
                <span>Industry Technical Benchmarking</span>
              </div>
            </div>

            <div className="bg-white/[0.06] border border-white/15 p-8 backdrop-blur-sm transition-all hover:border-[#E5C99D]/50 hover:bg-white/[0.09] group">
              <span className="font-mono text-3xl font-display text-[#E5C99D] block mb-4">03</span>
              <h4 className="font-display text-2xl text-white leading-tight">
                Plan your next step with confidence.
              </h4>
              <p className="mt-3 text-xs leading-relaxed text-white/75">
                Whether transitioning from a student visa (VLS-TS, F-1, Tier 4) to post-study work authorization (2-Year APS/RECE, 3-Year STEM OPT, PGWP) or navigating permanent residency sponsorship, you will know every statutory milestone months before graduation.
              </p>
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-[#E5C99D]">
                <CheckCircle2 size={15} />
                <span>Statutory Legal Roadmaps</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-8">
            <p className="text-xs text-white/70 max-w-lg">
              Have questions about your specific degree eligibility or destination timeline? Schedule a direct profile evaluation with Harshita.
            </p>
            <a
              href="#apply-portal"
              className="inline-flex items-center gap-2.5 bg-[#E5C99D] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#142E61] hover:bg-[#d6b787] transition-all shadow-md"
            >
              <span>See How We Can Help — Submit Profile</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── GLOBAL ADVISORY ENQUIRY FORM ── */}
      <section id="apply-portal" className="bg-[#FAF7F2] px-5 py-20 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase font-bold tracking-[0.24em] text-[#8B6E3F]">
            Direct International Career Advisory
          </p>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl text-[#142E61]">
            Build your global career <em>with Harshita.</em>
          </h3>
          <p className="mt-4 text-sm text-[#5a6b82] max-w-xl mx-auto">
            From tailoring your resume to destination ATS standards (French CV, UK standard, US Resume) to securing post-study work authorization. Submit your profile directly below:
          </p>
        </div>
        <div className="mt-10 mx-auto max-w-[850px]">
          <FranceEnquiryForm />
        </div>
      </section>

      {/* ── ON-SITE UNIVERSAL JOB DOSSIER MODAL ── */}
      <GlobalJobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />

      <AltheaFooter />
    </main>
  );
}
