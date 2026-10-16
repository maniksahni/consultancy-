"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  BriefcaseBusiness,
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
  X
} from "lucide-react";
import { brand } from "@/config/brand";
import { destinations } from "@/data/destinations";
import { careerRoleTypes, careerRoles, opportunityTypeLabels, type OpportunityType } from "@/data/careerRoles";
import ConsultationModal from "@/components/modals/ConsultationModal";
import { Facts, Kicker, Section, Steps } from "@/components/maison/ui";

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
    minWageNote: "UK National Living Wage (statutory wage floor)",
    postStudyVisa: "2-Year Graduate Route",
    postStudyNote: "Unsponsored stay-and-work authorization (3 years for PhD graduates)",
    avgStudentNetMonthly: "£750 – £1,100 / mo",
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

  const typeIcon = (type: OpportunityType, size = 18) => type === "job" ? <Briefcase size={size} aria-hidden="true" /> : type === "internship" ? <GraduationCap size={size} aria-hidden="true" /> : <Sparkles size={size} aria-hidden="true" />;
  const hoursShare = ((calcHours - 8) / (25 - 8)) * 100;
  const rateMin = Math.floor(activeFramework.minHourlyRate);
  const rateShare = ((calcRate - rateMin) / (activeFramework.maxHourlyRate - rateMin)) * 100;

  return (
    <div className="jobs-explorer ms-jobs">
      <Section tone="ink" className="ms-jobs-hero">
        <div className="ms-jobs-hero-grid">
          <div className="ms-jobs-hero-copy">
            <Kicker>THE OPPORTUNITY RADAR · 2026 EDITION</Kicker>
            <h2 className="ms-title">Make your next move <em>mean something.</em></h2>
            <p className="ms-lead">Explore roles, internships, and work-study routes that turn your degree into an international career. Start with {destination.name}, or explore seven global destinations.</p>
            <div className="ms-pills ms-pills-dark" role="group" aria-label="Select destination">{destinations.map((d) => <button key={d.slug} type="button" aria-pressed={country === d.slug} onClick={() => { setCountry(d.slug); setSelected(null); }}>{d.name}</button>)}</div>
            <div className="ms-row">
              <a href="#jobs-discover" className="ms-btn ms-btn-gold mx-magnetic"><span>Explore {destination.name} pathways</span><ArrowUpRight size={17} aria-hidden="true" /></a>
              <button type="button" onClick={() => setIsConsultationOpen(true)} className="ms-btn ms-btn-light"><span>Book a strategy session</span><Calendar size={16} aria-hidden="true" /></button>
            </div>
          </div>
          <div className="ms-radar" aria-hidden="true">
            <div className="ms-radar-sweep" />
            <i /><i /><i />
            <div className="ms-radar-core" key={country}><strong>{activeFramework.code}</strong><small>{activeFramework.capital}<br />{activeFramework.coords}</small></div>
            <span className="ms-radar-node is-a">JOB</span><span className="ms-radar-node is-b">INTERNSHIP</span><span className="ms-radar-node is-c">WORK-STUDY</span>
          </div>
        </div>
        <dl className="ms-jobs-stats"><div><dt>Destinations with work-rights roadmaps</dt><dd>07</dd></div><div><dt>Pathway models · job, stage, alternance</dt><dd>03</dd></div><div><dt>Curated career field dossiers</dt><dd>{String(careerRoles.length).padStart(2, "0")}</dd></div></dl>
      </Section>

      <Section tone="paper" kicker={`STATUTORY FRAMEWORK · ${destination.name.toUpperCase()}`} title="Know your student work" accent="& post-study rights." intro="Understanding labour rules and post-study visas before departure helps you plan realistically and talk to employers with confidence.">
        <Facts items={[
          { label: <><Clock size={14} aria-hidden="true" /> Student work permission</>, value: activeFramework.studentWorkLimit, note: activeFramework.studentWorkNote },
          { label: <><ShieldCheck size={14} aria-hidden="true" /> Statutory minimum wage</>, value: activeFramework.minWage, note: activeFramework.minWageNote },
          { label: <><GraduationCap size={14} aria-hidden="true" /> Post-study work visa</>, value: activeFramework.postStudyVisa, note: activeFramework.postStudyNote },
        ]} />
        <p className="ms-muted ms-jobs-caveat"><HelpCircle size={14} aria-hidden="true" /> Planning references. Rules and rates change and depend on your permit and profile—confirm the current position with the official government source before relying on them.</p>
      </Section>

      <Section tone="ivory">
        <div className="ms-calc">
          <div className="ms-calc-controls">
            <Kicker>PRACTICAL BUDGET PLANNING</Kicker>
            <h3 className="ms-sub" style={{ margin: "14px 0 10px" }}>Student earnings <em>estimator · {destination.name}</em></h3>
            <p className="ms-muted">Calculate an indicative part-time monthly income while studying. Many international students use part-time work to help with living and housing costs.</p>
            <label className="ms-slider">
              <span className="ms-slider-head"><span>Work hours per week</span><strong>{calcHours} hrs / week</strong></span>
              <input type="range" min={8} max={25} step={1} value={calcHours} onChange={(e) => setCalcHours(Number(e.target.value))} aria-label="Hours per week" style={{ "--fill": `${hoursShare}%` } as React.CSSProperties} />
              <span className="ms-slider-ticks"><span>8 hrs</span><span>20 hrs · common term-time cap</span><span>25 hrs</span></span>
            </label>
            <label className="ms-slider">
              <span className="ms-slider-head"><span>Estimated hourly rate ({activeFramework.currencySymbol})</span><strong>{activeFramework.currencySymbol}{calcRate} / hr</strong></span>
              <input type="range" min={rateMin} max={activeFramework.maxHourlyRate} step={0.5} value={calcRate} onChange={(e) => setCalcRate(Number(e.target.value))} aria-label="Hourly rate" style={{ "--fill": `${rateShare}%` } as React.CSSProperties} />
              <span className="ms-slider-ticks"><span>Min wage {activeFramework.currencySymbol}{activeFramework.minHourlyRate}</span><span>Mid {activeFramework.currencySymbol}{Math.round((activeFramework.minHourlyRate + activeFramework.maxHourlyRate) / 2)}</span><span>Skilled {activeFramework.currencySymbol}{activeFramework.maxHourlyRate}</span></span>
            </label>
          </div>
          <div className="ms-calc-summary" aria-live="polite">
            <span>Estimated take-home</span>
            <p className="ms-calc-figure"><small>{activeFramework.currencySymbol}</small>{calculatedMonthlyNet.toLocaleString()}<small>/ month</small></p>
            <p className="ms-calc-gross">Gross approx. {activeFramework.currencySymbol}{calculatedMonthlyGross.toLocaleString()} / month, before ~{Math.round(activeFramework.taxRate * 100)}% tax and social charges.</p>
            <dl><div><dt>Typical student range</dt><dd>{activeFramework.avgStudentNetMonthly}</dd></div><div><dt>Status</dt><dd><CheckCircle2 size={15} aria-hidden="true" /> Planning estimate · confirm your permit conditions</dd></div></dl>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="jobs-discover" kicker="START WHERE YOU ARE" title="Choose your kind" accent="of opportunity." intro="Every route is different. Filter by opportunity type to explore specific entry points and what hiring leads expect on international applications.">
        <div className="ms-jobs-types" role="group" aria-label="Opportunity types">{(Object.entries(opportunityTypeLabels) as [OpportunityType, string][]).map(([type, label], i) => {
          const count = careerRoles.filter((item) => careerRoleTypes[item.slug]?.includes(type)).length;
          const isActive = opportunityType === type;
          return <button key={type} type="button" aria-pressed={isActive} className="ms-jobs-type" onClick={() => setOpportunityType(isActive ? "all" : type)} data-spotlight>
            <span className="ms-card-top"><span className="ms-card-icon">{typeIcon(type)}</span><span className="ms-card-index">{String(i + 1).padStart(2, "0")}</span></span>
            <strong>{label}</strong><small>{count} pathway dossiers</small>
            <span className="ms-card-cta">{isActive ? "Active filter" : "Filter by this route"}<ArrowUpRight size={15} aria-hidden="true" /></span>
          </button>;
        })}</div>

        <div className="ms-kh-bar ms-jobs-filters">
          <label className="ms-field"><span><MapPin size={13} aria-hidden="true" /> Destination</span><select aria-label="Job destination" value={country} onChange={(event) => { setCountry(event.target.value); setSelected(null); }}>{destinations.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
          <label className="ms-field"><span><Briefcase size={13} aria-hidden="true" /> Opportunity route</span><select aria-label="Opportunity type" value={opportunityType} onChange={(event) => setOpportunityType(event.target.value as OpportunityType | "all")}><option value="all">All pathways ({careerRoles.length})</option>{(Object.entries(opportunityTypeLabels) as [OpportunityType, string][]).map(([type, label]) => <option key={type} value={type}>{label}</option>)}</select></label>
          <label className="ms-field"><span><Compass size={13} aria-hidden="true" /> Sector / industry</span><select aria-label="Job sector" value={sector} onChange={(event) => setSector(event.target.value)}><option value="all">All sectors ({sectors.length})</option>{sectors.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <label className="ms-field ms-kh-search"><span><Search size={13} aria-hidden="true" /> Search roles or skills</span><span className="ms-input-icon"><Search size={16} aria-hidden="true" /><input aria-label="Search roles and skills" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. data, nursing, CAD, Python..." /></span></label>
        </div>

        <div className="ms-dir-results-head">
          <p role="status">Showing <strong>{results.length.toString().padStart(2, "0")}</strong> pathways in {destination.name}</p>
          {hasActiveFilters && <button type="button" onClick={clearFilters} className="ms-btn ms-btn-ghost ms-dir-reset"><span>Reset filters</span><X size={15} aria-hidden="true" /></button>}
        </div>
        <p className="ms-dir-note"><strong>Career intelligence · </strong>Explore entry qualifications, skills, language preparation, and ATS CV guidance for each pathway. These dossiers support your professional preparation; they are not live recruitment vacancies.</p>

        {results.length ? <div className="ms-jobs-grid">{results.map((item, index) => {
          const roleTypesList = careerRoleTypes[item.slug] || ["job"];
          return <button type="button" className="ms-job" key={item.slug} aria-haspopup="dialog" aria-label={`Open ${item.title} pathway details`} onClick={() => setSelected(item.slug)} data-spotlight data-cursor="Open">
            <span className="ms-job-top"><span><BriefcaseBusiness size={14} aria-hidden="true" /> {item.sector}</span><span className="ms-card-index">{String(index + 1).padStart(2, "0")}</span></span>
            <strong className="ms-job-title">{item.title}</strong>
            <span className="ms-job-summary">{item.summary}</span>
            <span className="ms-job-tags">{roleTypesList.map((type) => <span key={type} className={`is-${type}`}>{opportunityTypeLabels[type]}</span>)}</span>
            <span className="ms-job-skills"><small>Key CV competencies</small>{item.skills.slice(0, 2).map((skill) => <span key={skill}>{skill}</span>)}</span>
            <span className="ms-job-foot"><span>{destination.name}</span><span className="ms-card-cta">Explore the dossier<ArrowUpRight size={15} aria-hidden="true" /></span></span>
          </button>;
        })}</div> : <div className="ms-empty"><h3>No pathways match those filters.</h3><p>Try resetting your keyword, or choosing “All pathways” and “All sectors”.</p><button type="button" onClick={clearFilters} className="ms-btn ms-btn-ghost"><span>Clear all filters</span><X size={15} aria-hidden="true" /></button></div>}
      </Section>

      <Section tone="ink" kicker="ALTHÉA CAREER COMPASS" title="Good guidance can" accent="change the whole search." intro="From adapting your Indian qualifications to local CV conventions to understanding work permits and post-study visas, we help you prepare for real opportunities." align="split">
        <Steps items={[
          { title: "Make your experience clear on your CV.", body: <p>Reconstruct your academic and work profile to match destination ATS formatting (French CV, UK standard, US 1-page).</p> },
          { title: "Understand employer technical expectations.", body: <p>Translate your syllabus into industry-recognised accreditations (CTI, ABET, Eurocodes, FE/PE licensures).</p> },
          { title: "Plan your visa & post-study roadmap.", body: <p>Map out every statutory milestone from student visa to post-study work authorisation (APS, STEM OPT, Graduate Route).</p> },
        ]} />
        <div className="ms-row" style={{ marginTop: 36 }}>
          <button type="button" onClick={() => setIsConsultationOpen(true)} className="ms-btn ms-btn-gold"><span>Book a career strategy session</span><ArrowUpRight size={17} aria-hidden="true" /></button>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="ms-btn ms-btn-light"><span>Chat directly on WhatsApp</span><MessageCircle size={17} aria-hidden="true" /></a>
        </div>
      </Section>

      {role && <div className="ms-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <article id="job-detail" className="ms-dialog" role="dialog" aria-modal="true" aria-labelledby="job-dialog-title" data-lenis-prevent>
          <div className="ms-dialog-top">
            <div>
              <p className="ms-kicker">{destination.name} · {role.sector} · CAREER DOSSIER</p>
              <h3 id="job-dialog-title">{role.title}</h3>
              <p className="ms-dialog-summary">{role.summary}</p>
              <span className="ms-job-tags">{roleTypes.map((type) => <span key={type} className={`is-${type}`}>{opportunityTypeLabels[type]}</span>)}</span>
            </div>
            <button className="ms-dialog-close" type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close role details"><X size={20} /></button>
          </div>
          <a className="ms-dialog-cta" href={whatsappHref} target="_blank" rel="noreferrer">
            <span className="ms-form-icon"><MessageCircle size={22} aria-hidden="true" /></span>
            <span><strong>Need dedicated help with your CV & applications?</strong><small>Message Harshita on WhatsApp about this {role.title} pathway in {destination.name}</small></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="ms-dialog-grid">
            <section><h4><FileCheck size={17} aria-hidden="true" /> What employers commonly look for</h4><ul>{role.qualifications.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h4><Sparkles size={17} aria-hidden="true" /> Skills to highlight on your CV</h4><ul>{role.skills.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="is-wide"><h4><Compass size={17} aria-hidden="true" /> Language & local requirements</h4><p>{role.language}</p></section>
            <section className="is-wide is-ink"><h4><ShieldCheck size={17} aria-hidden="true" /> Work rights in {destination.name}</h4><dl><div><dt>Student limit</dt><dd>{activeFramework.studentWorkLimit}</dd></div><div><dt>Statutory wage</dt><dd>{activeFramework.minWage}</dd></div><div><dt>Post-study visa</dt><dd>{activeFramework.postStudyVisa}</dd></div></dl></section>
          </div>
          <div className="ms-dialog-foot">
            <p>A practical pathway guide developed by Althéa Consulting. Requirements, employer work authorisation, and statutory visa processes vary by candidate profile and jurisdiction.</p>
            <button type="button" onClick={() => { setSelected(null); setIsConsultationOpen(true); }} className="ms-btn ms-btn-ink"><span>Book a 1-on-1 consultation</span><Calendar size={16} aria-hidden="true" /></button>
          </div>
        </article>
      </div>}

      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} defaultCountry={destination.name} defaultMessage={`I would like career guidance and work pathway advice for ${destination.name}.`} />
    </div>
  );
}
