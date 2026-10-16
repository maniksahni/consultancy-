"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  BriefcaseBusiness,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  GraduationCap,
  HelpCircle,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X
} from "lucide-react";
import { brand } from "@/config/brand";
import { destinations } from "@/data/destinations";
import { careerRoleTypes, careerRoles, opportunityTypeLabels, type OpportunityType } from "@/data/careerRoles";
import ConsultationModal from "@/components/modals/ConsultationModal";

interface DestinationWorkFramework {
  code: string;
  coords: string;
  capital: string;
  currency: string;
  currencySymbol: string;
  defaultHourlyRate: number;
  minHourlyRate: number;
  maxHourlyRate: number;
  taxRate: number;
  studentWorkLimit: string;
  studentWorkNote: string;
  minWage: string;
  minWageNote: string;
  postStudyVisa: string;
  postStudyNote: string;
  avgStudentNetMonthly: string;
}

const destinationWorkData: Record<string, DestinationWorkFramework> = {
  france: {
    code: "FR",
    coords: "48°51′N · 02°21′E",
    capital: "Paris",
    currency: "EUR",
    currencySymbol: "€",
    defaultHourlyRate: 12,
    minHourlyRate: 11.88,
    maxHourlyRate: 25,
    taxRate: 0.18,
    studentWorkLimit: "964 Hours / Year",
    studentWorkNote: "60% of annual legal duration (~20 hrs/week in term, 35 hrs/wk during holidays)",
    minWage: "€11.88 / hour",
    minWageNote: "Statutory French SMIC minimum wage across all sectors",
    postStudyVisa: "2-Year APS / RECE",
    postStudyNote: "Bilateral treaty for Indian Master graduates to work & transition to Passeport Talent",
    avgStudentNetMonthly: "€750 – €1,050 / mo",
  },
  uk: {
    code: "GB",
    coords: "51°30′N · 00°07′W",
    capital: "London",
    currency: "GBP",
    currencySymbol: "£",
    defaultHourlyRate: 12,
    minHourlyRate: 11.44,
    maxHourlyRate: 26,
    taxRate: 0.12,
    studentWorkLimit: "20 Hours / Week",
    studentWorkNote: "Term-time statutory cap; full-time permissible during official vacations",
    minWage: "£11.44 / hour",
    minWageNote: "UK National Living Wage (statutory statutory wage floor)",
    postStudyVisa: "2-Year Graduate Route",
    postStudyNote: "Unsponsored stay-and-work authorization (3 years for PhD graduates)",
    avgStudentNetMonthly: "£750 – €1,100 / mo",
  },
  usa: {
    code: "US",
    coords: "38°53′N · 77°02′W",
    capital: "Washington D.C.",
    currency: "USD",
    currencySymbol: "$",
    defaultHourlyRate: 16,
    minHourlyRate: 15.0,
    maxHourlyRate: 35,
    taxRate: 0.14,
    studentWorkLimit: "20 Hours / Week",
    studentWorkNote: "On-campus employment; off-campus via CPT/OPT with DSO authorization",
    minWage: "$15.00 – $17.50 / hr",
    minWageNote: "Standard campus baseline & major metro student wage averages",
    postStudyVisa: "1 to 3-Year OPT",
    postStudyNote: "12-month standard OPT plus 24-month STEM extension for eligible technical degrees",
    avgStudentNetMonthly: "$1,000 – $1,400 / mo",
  },
  canada: {
    code: "CA",
    coords: "45°25′N · 75°41′W",
    capital: "Ottawa",
    currency: "CA$",
    currencySymbol: "CA$",
    defaultHourlyRate: 17,
    minHourlyRate: 16.55,
    maxHourlyRate: 30,
    taxRate: 0.15,
    studentWorkLimit: "20 to 24 Hours / Week",
    studentWorkNote: "Off-campus work authorization integrated with standard study permits",
    minWage: "CA$16.55 – $17.30 / hr",
    minWageNote: "Provincial minimum wage standards (Ontario / BC baseline)",
    postStudyVisa: "Up to 3-Year PGWP",
    postStudyNote: "Post-Graduation Work Permit based on credential length; pathway to Canadian PR",
    avgStudentNetMonthly: "CA$1,100 – $1,550 / mo",
  },
  germany: {
    code: "DE",
    coords: "52°31′N · 13°24′E",
    capital: "Berlin",
    currency: "EUR",
    currencySymbol: "€",
    defaultHourlyRate: 13,
    minHourlyRate: 12.41,
    maxHourlyRate: 26,
    taxRate: 0.1,
    studentWorkLimit: "140 Full Days / Year",
    studentWorkNote: "Or 280 half-days per calendar year under German federal student visa rules",
    minWage: "€12.41 / hour",
    minWageNote: "Statutory Mindestlohn with Minijob tax exemption up to €538/month",
    postStudyVisa: "18-Month Job Seeker",
    postStudyNote: "Graduate residence title to secure qualified work and transition to EU Blue Card",
    avgStudentNetMonthly: "€650 – €950 / mo",
  },
  australia: {
    code: "AU",
    coords: "35°18′S · 149°07′E",
    capital: "Canberra",
    currency: "AU$",
    currencySymbol: "AU$",
    defaultHourlyRate: 25,
    minHourlyRate: 24.1,
    maxHourlyRate: 40,
    taxRate: 0.15,
    studentWorkLimit: "48 Hours / Fortnight",
    studentWorkNote: "Cap per two-week cycle during semesters; unrestricted in semester breaks",
    minWage: "AU$24.10 / hour",
    minWageNote: "Australian National Minimum Wage (highest OECD national baseline)",
    postStudyVisa: "2 to 4-Year Subclass 485",
    postStudyNote: "Temporary Graduate visa with regional study extensions available",
    avgStudentNetMonthly: "AU$1,400 – $2,000 / mo",
  },
  ireland: {
    code: "IE",
    coords: "53°20′N · 06°15′W",
    capital: "Dublin",
    currency: "EUR",
    currencySymbol: "€",
    defaultHourlyRate: 13,
    minHourlyRate: 12.7,
    maxHourlyRate: 28,
    taxRate: 0.12,
    studentWorkLimit: "20 Hours / Week",
    studentWorkNote: "Stamp 2 permission: 20 hrs/week in semester, up to 40 hrs/wk during holidays",
    minWage: "€12.70 / hour",
    minWageNote: "Statutory Irish National Minimum Wage floor",
    postStudyVisa: "2-Year Stamp 1G",
    postStudyNote: "Third Level Graduate Scheme granting 24-month full-time working rights for Masters",
    avgStudentNetMonthly: "€850 – €1,200 / mo",
  },
};

export default function JobsExplorer() {
  const [country, setCountry] = useState("france");
  const [sector, setSector] = useState("all");
  const [opportunityType, setOpportunityType] = useState<OpportunityType | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Student earnings calculator state
  const activeFramework = destinationWorkData[country] || destinationWorkData.france;
  const [calcHours, setCalcHours] = useState(20);
  const [calcRate, setCalcRate] = useState(activeFramework.defaultHourlyRate);

  // Reset calculator rate when country changes
  useEffect(() => {
    setCalcRate(activeFramework.defaultHourlyRate);
  }, [country, activeFramework.defaultHourlyRate]);

  const calculatedMonthlyGross = Math.round(calcHours * calcRate * 4.33);
  const calculatedMonthlyNet = Math.round(calculatedMonthlyGross * (1 - activeFramework.taxRate));

  const sectors = useMemo(() => [...new Set(careerRoles.map((item) => item.sector))], []);
  const role = careerRoles.find((item) => item.slug === selected);
  const destination = destinations.find((item) => item.slug === country)!;
  const roleTypes = role ? careerRoleTypes[role.slug] || ["job"] : [];

  const results = useMemo(() => {
    return careerRoles.filter((item) => {
      const types = careerRoleTypes[item.slug] || ["job"];
      const matchesType = opportunityType === "all" || types.includes(opportunityType);
      const matchesSector = sector === "all" || item.sector === sector;
      const matchesQuery = `${item.title} ${item.sector} ${item.summary} ${item.skills.join(" ")} ${item.qualifications.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesType && matchesSector && matchesQuery;
    });
  }, [opportunityType, sector, query]);

  const clearFilters = () => {
    setOpportunityType("all");
    setSector("all");
    setQuery("");
  };

  const hasActiveFilters = opportunityType !== "all" || sector !== "all" || query.trim().length > 0;

  const whatsappHref = role
    ? `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
        `Bonjour Althéa, I am exploring the ${opportunityTypeLabels[opportunityType === "all" ? roleTypes[0] : opportunityType]} pathway for ${role.title} in ${destination.name}. I would like help preparing my CV and understanding the legal next steps. Can you guide me?`
      )}`
    : `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
        `Bonjour Althéa, I would like to schedule a career and work-visa advisory consultation for ${destination.name}.`
      )}`;

  useEffect(() => {
    if (!role) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [role]);

  return (
    <section className="jobs-explorer" aria-label="Jobs and work opportunities across seven destinations">
      {/* ── 1. Hero Feature Card with Dynamic Celestial Radar ── */}
      <div className="jobs-feature">
        <div className="jobs-feature-copy">
          <p className="jobs-feature-kicker">
            <span /> THE OPPORTUNITY RADAR <i>·</i> 2026 EDITION
          </p>
          <h2>
            Make your next move<br />
            <em>mean something.</em>
          </h2>
          <p>
            Explore roles, internships, and work-study routes that turn your degree into an international career.
            Start with {destination.name}, or explore seven global destinations.
          </p>

          {/* Destination Quick Selector Chips */}
          <div className="jobs-hero-chips" aria-label="Select destination">
            {destinations.map((d) => (
              <button
                key={d.slug}
                type="button"
                className={`jobs-hero-chip ${country === d.slug ? "active" : ""}`}
                onClick={() => {
                  setCountry(d.slug);
                  setSelected(null);
                }}
              >
                <span className="jobs-chip-dot" />
                {d.name}
              </button>
            ))}
          </div>

          <div className="jobs-hero-actions">
            <a href="#jobs-discover" className="jobs-feature-link">
              Explore {destination.name} Pathways <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="jobs-feature-link-secondary"
            >
              Book Strategy Session
            </button>
          </div>
        </div>

        {/* Dynamic Celestial Orbit Graphic */}
        <div className="jobs-orbit-art" aria-hidden="true">
          <div className="jobs-orbit-glow" />
          <div className="jobs-orbit-ring jobs-orbit-ring-one" />
          <div className="jobs-orbit-ring jobs-orbit-ring-two" />
          <div className="jobs-orbit-ring jobs-orbit-ring-three" />
          <div className="jobs-orbit-core">
            <span className="jobs-orbit-code">{activeFramework.code}</span>
            <small className="jobs-orbit-location">
              {activeFramework.capital}
              <br />
              {activeFramework.coords}
            </small>
          </div>
          <span className="jobs-orbit-node jobs-orbit-node-a">JOB</span>
          <span className="jobs-orbit-node jobs-orbit-node-b">INTERN</span>
          <span className="jobs-orbit-node jobs-orbit-node-c">WORK-STUDY</span>
          <span className="jobs-orbit-coordinate">{destination.name.toUpperCase()} / ACTIVE HORIZON</span>
        </div>

        {/* Stats Row */}
        <div className="jobs-feature-stats">
          <div>
            <strong>07</strong>
            <span>destinations<br />with legal roadmaps</span>
          </div>
          <div>
            <strong>03</strong>
            <span>pathway models<br />(Job, Stage, Alternance)</span>
          </div>
          <div>
            <strong>16</strong>
            <span>curated career<br />field dossiers</span>
          </div>
        </div>
      </div>

      {/* ── 2. Statutory Legal Work Framework in Active Country ── */}
      <section className="jobs-framework-section" aria-label="Legal Work Regulations">
        <div className="jobs-framework-header">
          <div>
            <span className="jobs-framework-eyebrow">STATUTORY FRAMEWORK · {destination.name.toUpperCase()}</span>
            <h3>Know your legal student work & post-study rights.</h3>
          </div>
          <p>
            Understanding labor rules and post-study visas before departure makes your application stand out to international employers.
          </p>
        </div>

        <div className="jobs-framework-grid">
          <div className="jobs-framework-card">
            <div className="jobs-card-icon">
              <Clock size={22} />
            </div>
            <div className="jobs-card-content">
              <span className="jobs-card-badge">STUDENT WORK PERMISSION</span>
              <h4>{activeFramework.studentWorkLimit}</h4>
              <p>{activeFramework.studentWorkNote}</p>
            </div>
          </div>

          <div className="jobs-framework-card">
            <div className="jobs-card-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="jobs-card-content">
              <span className="jobs-card-badge">STATUTORY MINIMUM WAGE</span>
              <h4>{activeFramework.minWage}</h4>
              <p>{activeFramework.minWageNote}</p>
            </div>
          </div>

          <div className="jobs-framework-card">
            <div className="jobs-card-icon">
              <GraduationCap size={22} />
            </div>
            <div className="jobs-card-content">
              <span className="jobs-card-badge">POST-STUDY WORK VISA</span>
              <h4>{activeFramework.postStudyVisa}</h4>
              <p>{activeFramework.postStudyNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive Student Take-Home Earnings Estimator ── */}
      <section className="jobs-calculator-section" aria-label="Student Earnings Calculator">
        <div className="jobs-calculator-card">
          <div className="jobs-calculator-controls">
            <div className="jobs-calc-header">
              <span className="jobs-calc-eyebrow">PRACTICAL BUDGET PLANNING</span>
              <h3>Student Earning Estimator in {destination.name}</h3>
              <p>
                Calculate your estimated part-time monthly earnings while studying. Most international students use part-time earnings to offset living and housing costs.
              </p>
            </div>

            <div className="jobs-calc-sliders">
              <div className="jobs-slider-group">
                <div className="jobs-slider-label">
                  <span>Work Hours per Week</span>
                  <strong>{calcHours} hrs / week</strong>
                </div>
                <input
                  type="range"
                  min="8"
                  max="25"
                  step="1"
                  value="calcHours"
                  onChange={(e) => setCalcHours(Number(e.target.value))}
                  className="jobs-range-input"
                  aria-label="Hours per week"
                />
                <div className="jobs-slider-ticks">
                  <span>10 hrs (light)</span>
                  <span>20 hrs (standard cap)</span>
                  <span>25 hrs (holiday)</span>
                </div>
              </div>

              <div className="jobs-slider-group">
                <div className="jobs-slider-label">
                  <span>Estimated Hourly Rate ({activeFramework.currencySymbol})</span>
                  <strong>{activeFramework.currencySymbol}{calcRate} / hr</strong>
                </div>
                <input
                  type="range"
                  min={Math.floor(activeFramework.minHourlyRate)}
                  max={activeFramework.maxHourlyRate}
                  step="0.5"
                  value="calcRate"
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="jobs-range-input"
                  aria-label="Hourly rate"
                />
                <div className="jobs-slider-ticks">
                  <span>Min Wage: {activeFramework.currencySymbol}{activeFramework.minHourlyRate}</span>
                  <span>Mid: {activeFramework.currencySymbol}{Math.round((activeFramework.minHourlyRate + activeFramework.maxHourlyRate) / 2)}</span>
                  <span>Skilled: {activeFramework.currencySymbol}{activeFramework.maxHourlyRate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="jobs-calculator-summary">
            <div className="jobs-summary-pill">ESTIMATED TAKE-HOME NET</div>
            <div className="jobs-summary-figure">
              <span className="jobs-sum-symbol">{activeFramework.currencySymbol}</span>
              <span className="jobs-sum-val">{calculatedMonthlyNet.toLocaleString()}</span>
              <span className="jobs-sum-period">/ month</span>
            </div>
            <p className="jobs-summary-gross">
              Gross: approx. {activeFramework.currencySymbol}{calculatedMonthlyGross.toLocaleString()} / mo (before ~{Math.round(activeFramework.taxRate * 100)}% tax/social charges)
            </p>
            <div className="jobs-summary-stats">
              <div>
                <span>Typical Student Average</span>
                <strong>{activeFramework.avgStudentNetMonthly}</strong>
              </div>
              <div className="jobs-summary-badge">
                <CheckCircle2 size={16} /> 100% Authorized on Student Visa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Pathway Type Rail ── */}
      <div className="jobs-discover" id="jobs-discover">
        <div>
          <p className="eyebrow">START WHERE YOU ARE</p>
          <h3>
            Choose your kind<br />
            of opportunity.
          </h3>
        </div>
        <p>
          Every route is different. Filter by opportunity type to explore specific entry points and what hiring leads expect on international applications.
        </p>
      </div>

      <div className="jobs-type-rail" aria-label="Opportunity types">
        {(Object.entries(opportunityTypeLabels) as [OpportunityType, string][]).map(([type, label]) => {
          const count = careerRoles.filter((item) => careerRoleTypes[item.slug]?.includes(type)).length;
          const isActive = opportunityType === type;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={isActive}
              className={`jobs-type-card ${isActive ? "active" : ""}`}
              onClick={() => setOpportunityType(isActive ? "all" : type)}
            >
              <div className="jobs-type-top">
                <span className="jobs-type-index">0{Object.keys(opportunityTypeLabels).indexOf(type) + 1}</span>
                <span className="jobs-type-icon-wrapper">
                  {type === "job" && <Briefcase size={17} />}
                  {type === "internship" && <GraduationCap size={17} />}
                  {type === "work-study" && <Sparkles size={17} />}
                </span>
              </div>
              <div className="jobs-type-body">
                <span className="jobs-type-title">{label}</span>
                <small className="jobs-type-subtitle">{count} comprehensive pathway dossiers</small>
              </div>
              <span className="jobs-type-action">
                {isActive ? "Active Filter" : "Filter by this route"} <ArrowUpRight size={15} />
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 5. Enhanced Filters Toolbar ── */}
      <div className="jobs-filters-container">
        <div className="jobs-filters">
          <label>
            <span className="jobs-filter-label">
              <MapPin size={13} /> Destination Country
            </span>
            <select
              aria-label="Job destination"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setSelected(null);
              }}
            >
              {destinations.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="jobs-filter-label">
              <Briefcase size={13} /> Opportunity Route
            </span>
            <select
              aria-label="Opportunity type"
              value={opportunityType}
              onChange={(event) => setOpportunityType(event.target.value as OpportunityType | "all")}
            >
              <option value="all">All pathways ({careerRoles.length})</option>
              {(Object.entries(opportunityTypeLabels) as [OpportunityType, string][]).map(([type, label]) => (
                <option key={type} value={type}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="jobs-filter-label">
              <Compass size={13} /> Sector / Industry
            </span>
            <select
              aria-label="Job sector"
              value={sector}
              onChange={(event) => setSector(event.target.value)}
            >
              <option value="all">All sectors ({sectors.length})</option>
              {sectors.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="jobs-keyword">
            <span className="jobs-filter-label">
              <Search size={13} /> Search Roles or Skills
            </span>
            <span className="jobs-search-field">
              <Search size={16} />
              <input
                aria-label="Search roles and skills"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. data, nursing, CAD, Python..."
              />
            </span>
          </label>
        </div>
      </div>

      {/* ── Results Bar ── */}
      <div className="jobs-results-heading">
        <p className="jobs-count" role="status">
          <span className="jobs-results-dot" aria-hidden="true" /> Showing{" "}
          <strong>{results.length.toString().padStart(2, "0")}</strong> pathways in {destination.name}
        </p>
        {hasActiveFilters && (
          <button type="button" onClick={clearFilters} className="jobs-clear-btn">
            Reset filters ×
          </button>
        )}
      </div>

      <div className="jobs-data-note">
        <span className="jobs-note-tag">CAREER INTELLIGENCE</span>
        <p>
          Explore entry qualifications, skills, language preparation, and ATS CV guidance for each pathway. These dossiers support your professional preparation; they are not live recruitment vacancies.
        </p>
      </div>

      {/* ── 6. Pathway Dossier Grid ── */}
      {results.length ? (
        <div className="jobs-grid">
          {results.map((item, index) => {
            const roleTypesList = careerRoleTypes[item.slug] || ["job"];
            const isSelected = selected === item.slug;
            return (
              <article
                className={`job-card ${isSelected ? "selected" : ""}`}
                key={item.slug}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Open ${item.title} pathway details`}
                onClick={() => setSelected(item.slug)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(item.slug);
                  }
                }}
              >
                <div className="job-card-heading">
                  <span className="job-card-sector">
                    <BriefcaseBusiness size={14} /> {item.sector}
                  </span>
                  <span className="job-card-number">{String(index + 1).padStart(2, "0")}</span>
                </div>

                <h3>{item.title}</h3>
                <p className="job-card-summary">{item.summary}</p>

                <div className="job-type-tags">
                  {roleTypesList.map((type) => (
                    <span key={type} className={`job-tag-${type}`}>
                      {opportunityTypeLabels[type]}
                    </span>
                  ))}
                </div>

                <div className="job-card-skills-wrapper">
                  <span className="job-skills-label">KEY CV COMPETENCIES</span>
                  <ul className="job-card-skills">
                    {item.skills.slice(0, 2).map((skill) => (
                      <li key={skill}>
                        <span className="job-bullet-dot" /> {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="job-card-footer">
                  <span className="job-card-country">{destination.name}</span>
                  <span className="job-card-action">
                    Explore Pathway Dossier <ArrowUpRight size={15} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="jobs-empty-state">
          <p className="jobs-empty-title">No pathways match those filters.</p>
          <p className="jobs-empty-text">Try resetting your keyword, or choosing &ldquo;All pathways&rdquo; and &ldquo;All sectors&rdquo;.</p>
          <button type="button" onClick={clearFilters} className="jobs-empty-reset">
            Clear All Filters
          </button>
        </div>
      )}

      {/* ── 7. Editorial Guidance Strip ── */}
      <section className="jobs-support-strip" aria-label="How career support can help">
        <div className="jobs-support-intro">
          <p className="eyebrow">ALTHEA CAREER COMPASS</p>
          <h3>
            Good guidance can<br />
            <em>change the whole search.</em>
          </h3>
          <p className="jobs-support-copy">
            From rebuilding your Indian qualifications into local ATS CV standards to navigating statutory work permits and post-study visas, our advisors help you secure real opportunities.
          </p>
        </div>

        <div className="jobs-support-steps">
          <div className="jobs-support-step-item">
            <span className="jobs-step-num">01</span>
            <div>
              <strong>Make your experience clear on your CV.</strong>
              <p>Reconstruct your academic and work profile to match destination ATS formatting (French CV, UK standard, US 1-page).</p>
            </div>
          </div>
          <div className="jobs-support-step-item">
            <span className="jobs-step-num">02</span>
            <div>
              <strong>Understand employer technical expectations.</strong>
              <p>Translate your syllabus into industry-recognized accreditations (CTI, ABET, Eurocodes, FE/PE licensures).</p>
            </div>
          </div>
          <div className="jobs-support-step-item">
            <span className="jobs-step-num">03</span>
            <div>
              <strong>Plan your visa & post-study roadmap.</strong>
              <p>Map out every statutory milestone from student visa to post-study work authorization (APS, STEM OPT, Graduate Route).</p>
            </div>
          </div>
        </div>

        <div className="jobs-support-cta-box">
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="jobs-support-btn"
          >
            <span>Book Career Strategy Session</span>
            <ArrowUpRight size={16} />
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="jobs-support-whatsapp"
          >
            <MessageCircle size={17} />
            <span>Chat directly on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* ── 8. Detailed Pathway Dossier Modal ── */}
      {role && (
        <div
          className="job-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <article
            id="job-detail"
            className="job-detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-dialog-title"
          >
            <div className="job-detail-top">
              <div>
                <p className="eyebrow">
                  {destination.name} · {role.sector} · CAREER DOSSIER
                </p>
                <h3 id="job-dialog-title">{role.title}</h3>
                <p className="job-detail-summary">{role.summary}</p>
                <div className="job-type-tags">
                  {roleTypes.map((type) => (
                    <span key={type} className={`job-tag-${type}`}>
                      {opportunityTypeLabels[type]}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="job-close"
                type="button"
                autoFocus
                onClick={() => setSelected(null)}
                aria-label="Close role details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Direct WhatsApp Callout */}
            <a className="job-cv-cta" href={whatsappHref} target="_blank" rel="noreferrer">
              <div className="job-cta-icon">
                <MessageCircle size={24} />
              </div>
              <div className="job-cta-text">
                <strong>Need dedicated assistance with your CV & applications?</strong>
                <small>
                  Message Harshita directly on WhatsApp about this {role.title} pathway in {destination.name}
                </small>
              </div>
              <ArrowUpRight size={18} className="job-cta-arrow" />
            </a>

            {/* Dossier Specifications */}
            <div className="job-requirements">
              <div className="job-req-card">
                <h4>
                  <FileCheck size={18} /> What employers commonly look for
                </h4>
                <ul>
                  {role.qualifications.map((item) => (
                    <li key={item}>
                      <span className="job-bullet-dot" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="job-req-card">
                <h4>
                  <Sparkles size={18} /> Skills to highlight on your CV
                </h4>
                <ul>
                  {role.skills.map((item) => (
                    <li key={item}>
                      <span className="job-bullet-dot" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="job-req-card job-req-full">
                <h4>
                  <Compass size={18} /> Language & local statutory requirements
                </h4>
                <p>{role.language}</p>
              </div>

              <div className="job-req-card job-req-full job-req-statutory">
                <h4>
                  <ShieldCheck size={18} /> Statutory Work Rights in {destination.name}
                </h4>
                <div className="job-statutory-mini-grid">
                  <div>
                    <span>Student Limit</span>
                    <strong>{activeFramework.studentWorkLimit}</strong>
                  </div>
                  <div>
                    <span>Statutory Wage</span>
                    <strong>{activeFramework.minWage}</strong>
                  </div>
                  <div>
                    <span>Post-Study Visa</span>
                    <strong>{activeFramework.postStudyVisa}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-modal-footer">
              <p className="jobs-disclaimer">
                A practical pathway guide developed by Althéa Consulting. Requirements, employer work authorization, and statutory visa processes vary by candidate profile and jurisdiction.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setIsConsultationOpen(true);
                }}
                className="job-modal-book-btn"
              >
                Book 1-on-1 Consultation
              </button>
            </div>
          </article>
        </div>
      )}

      {/* ── 9. Consultation Modal ── */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultCountry={destination.name}
        defaultMessage={`I would like career guidance and work pathway advice for ${destination.name}.`}
      />
    </section>
  );
}
