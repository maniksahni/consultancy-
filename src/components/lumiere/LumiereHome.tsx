"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ReviewShowcase from "./ReviewShowcase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, CalendarRange, Check, Compass, FileCheck2, GraduationCap, Landmark, Languages, MapPin, Plane, Search, Sparkles, Wallet } from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { waMessages } from "@/config/contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeFinder from "@/components/redesign/HomeFinder";
import MovePlanner from "./MovePlanner";
import Accordion from "@/components/maison/Accordion";
import { services, questions } from "@/components/redesign/content";
import { type HomeStats } from "@/components/redesign/HorizonMotion";
import { paris } from "@/lib/paris";

gsap.registerPlugin(ScrollTrigger);

export type CountryCoverage = Record<string, { institutions: number; courses: number }>;

const serviceLinks = ["/book-consultation", "/universities", "/admissions-process", "/scholarships", "/france/visas", "/settle-in-france", "/first-30-days-france"];
/** "Where are you right now?": each situation gets its own next steps and a WhatsApp message already written. */
const situations = [
  { id: "school", label: "In Class 11 or 12", kicker: "FOR A BACHELOR'S IN FRANCE", title: "Start with the right bachelor's route.",
    steps: ["Pick between French-taught and English-taught bachelor's programmes, and see which accept Indian Class 12 marks.", "Plan the budget: tuition, a room and daily life, city by city.", "Apply through Campus France with the right documents, on time."],
    links: [["English-taught programmes", "/programmes"], ["Study in France from India", "/study-in-france"]] as [string, string][],
    message: "Bonjour Harshita! I'm in Class 11/12 and want to do my bachelor's in France.\nName:\nStream and marks:\nBudget per year:" },
  { id: "bachelor", label: "Finishing my bachelor's", kicker: "FOR A MASTER'S OR MSc", title: "Build a master's shortlist that fits.",
    steps: ["Shortlist public universities and grandes écoles that match your marks and budget.", "Prepare your Études en France file, SOP and references, then the Campus France interview.", "Look at scholarships and what your degree can lead to in France."],
    links: [["Search courses", "/universities"], ["Campus France guide", "/campus-france-guide"], ["Scholarships", "/scholarships"]] as [string, string][],
    message: "Bonjour Harshita! I'm finishing my bachelor's and want to do a master's in France.\nName:\nDegree and marks:\nIntake I'm aiming for:" },
  { id: "working", label: "Working in India", kicker: "FOR A CAREER MOVE", title: "Turn your experience into a French degree and a job.",
    steps: ["Choose an MSc, MBA or specialised master's that values your work experience.", "Work out the real cost and how to fund it.", "Plan the job search in France from day one: internships, French and your CV."],
    links: [["Programmes & fees", "/programmes"], ["Jobs in France", "/jobs"]] as [string, string][],
    message: "Bonjour Harshita! I'm working in India and thinking of studying in France for a career move.\nName:\nExperience:\nField I want to work in:" },
  { id: "france", label: "Already in France", kicker: "FOR STUDENTS AND GRADUATES HERE", title: "Get the internship, the job and the papers.",
    steps: ["Find internships, alternance and jobs, and apply with a French-style CV.", "Keep your titre de séjour, CAF and bank in order.", "Plan the step after your degree: job-search permit, work permit and residency."],
    links: [["Jobs & internships", "/jobs"], ["Already in France", "/in-france"], ["Residency in France", "/pr-in-france"]] as [string, string][],
    message: "Bonjour Harshita! I'm already in France and need help with jobs or paperwork.\nName:\nMy situation (student / graduate / working):\nWhat I need:" },
];

/** The process, in three chapters. */
const routeLines: { n: number; label: string; stops: [string, string][] }[] = [
  { n: 1, label: "Before you apply", stops: [["A shortlist that fits", "Courses matched to your marks, budget and goals."], ["Tests and documents", "IELTS or DELF, transcripts and translations, in order."], ["SOP and references", "A motivation letter written for each programme."]] },
  { n: 2, label: "Before you fly", stops: [["Campus France", "Études en France file and interview practice."], ["Offer, funds, visa", "Proof of funds and the VLS-TS student visa."], ["Housing and insurance", "A first address and cover before you land."]] },
  { n: 3, label: "After you land", stops: [["Bank, SIM, Navigo, CAF", "The first-week setup, in the order that works."], ["Your residence permit", "Validate the visa and renew your titre de séjour."], ["Internships and jobs", "Stage, alternance, French CV and your first job."]] },
];

/** Free tools on the site, each a real working page (not a brochure). */
const tools = [
  { icon: Search, title: "Course finder", body: "Every French institution and its courses, with fees.", href: "/universities", cta: "Search courses" },
  { icon: Languages, title: "English-taught programmes", body: "Filter by teaching language, level, fee and deadline.", href: "/programmes", cta: "See programmes" },
  { icon: Briefcase, title: "Jobs & internships", body: "Live roles in France. Apply through Althéa and Harshita reviews your profile.", href: "/jobs", cta: "Browse & apply", feature: true },
  { icon: FileCheck2, title: "ATS CV check", body: "Test your CV against any job description in your browser.", href: "/jobs", cta: "Check my CV" },
  { icon: Wallet, title: "Budget planner", body: "Rent, food, transport and fees for your city, per month.", href: "/knowledge#budget", cta: "Plan my budget" },
  { icon: CalendarRange, title: "Departure planner", body: "Your dated plan from today to arrival, ready for your calendar.", href: "#planner", cta: "Build my plan" },
  { icon: Landmark, title: "Campus France guide", body: "Études en France, the interview and the visa, step by step.", href: "/campus-france-guide", cta: "Open the guide" },
  { icon: GraduationCap, title: "Scholarships", body: "Eiffel, Charpak and school awards, with real deadlines.", href: "/scholarships", cta: "Find funding" },
  { icon: Compass, title: "Learn French", body: "The phrases you need first, and lessons when you are ready.", href: "/learn-french", cta: "Start learning" },
];

/** The two people the site is for: those coming to study in France, and those already living there. */
const paths = [
  { id: "coming", kicker: "NOT IN FRANCE YET", icon: Plane, title: "Come study in France.", accent: "We stay with you after you land.", photo: "eiffel-sun-rays" as const,
    items: ["The right programme and university for your profile and budget", "Campus France, Études en France and your student visa", "Proof of funds, housing and your pre-departure checklist", "Once you arrive: CAF, bank, internship and your first job"],
    href: "/study-in-france", cta: "Plan my studies" },
  { id: "here", kicker: "ALREADY IN FRANCE", icon: MapPin, title: "Already here?", accent: "Let’s get you hired.", photo: "metro-platform" as const,
    items: ["Internships (stage) and alternance, from search to signed agreement", "French-style CV, LinkedIn and interview practice", "After your degree: job-search permit and switching to a work permit", "Titre de séjour, CAF, bank, health and the road to PR in France"],
    href: "/in-france", cta: "Get help in France" },
];


export type FranceNumbers = { institutions: number; courses: number; jobs: number; programmes: number };

export default function LumiereHome({ france }: { stats: HomeStats; coverage: CountryCoverage; france: FranceNumbers }) {
  const root = useRef<HTMLDivElement>(null);
  const [pick, setPick] = useState(0);
  const fmt = (n: number) => n.toLocaleString("en-IN");
  const numbers: [string, string, string][] = [
    [fmt(france.institutions), "French universities and schools to search", "/universities"],
    [fmt(france.courses), "French courses, with fees", "/universities"],
    [fmt(france.jobs), "open jobs in France today", "/jobs"],
    [fmt(france.programmes), "programmes with checked fees and deadlines", "/programmes"],
  ];
  
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia(scope);
    mm.add({ desktop: "(min-width: 901px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { motion } = ctx.conditions as { desktop: boolean; motion: boolean };
      if (!motion) return;
      const q = gsap.utils.selector(scope);
      // Bento tiles rise in a cascade.
      gsap.from(q(".lx-tile"), { y: 80, opacity: 0, rotateX: 8, transformOrigin: "50% 100%", duration: 0.7, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: q(".lx-bento")[0], start: "top 78%" } });
    });
    return () => mm.revert();
  }, []);

  return <div className="lumiere-home" ref={root}><Navbar /><main id="main-content">

    {/* 1 · Hero: ivory paper, Harshita in a Paris arch, one clear promise */}
    <section className="hx" aria-labelledby="lx-hero-title">
      <div className="lx-wrap hx-grid">
        <div className="hx-copy">
          <h1 id="lx-hero-title"><span className="lx-h1-kicker hx-eyebrow"><i className="hx-flag" aria-hidden="true" />Study in France consultant · Paris ⇄ India</span>Study in France, <em>planned by someone</em> who lives here.</h1>
          <p className="hx-lead">Courses, Campus France and the visa before you fly. Housing, CAF, internships and your first job once you land. One adviser in Paris, from India to your first payslip.</p>
          <div className="hx-actions">
            <WhatsAppButton text={waMessages.general} label="WhatsApp Harshita" />
            <Link href="/universities" className="ms-btn hx-btn-ink"><span>Find my course</span><ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <p className="hx-alt"><MapPin size={15} aria-hidden="true" />Already in France? <Link href="/in-france">Jobs, internships & paperwork</Link></p>
        </div>
        <figure className="hx-visual">
          <div className="hx-arch"><Image src="/images/paris/harshita-eiffel-portrait.webp" alt="Harshita Kohli, founder of Althéa Consulting, in front of the Eiffel Tower" fill priority sizes="(max-width:900px) 80vw, 36vw" /></div>
          <figcaption className="hx-card">
            <strong>Harshita Kohli</strong>
            <span>Your adviser in Paris · former international student</span>
            <em><i aria-hidden="true" />Usually replies on WhatsApp the same day</em>
          </figcaption>
          <span className="hx-seal" aria-hidden="true">Paris<br /><b>Based here</b></span>
        </figure>
      </div>
    </section>

    {/* 1a · Real numbers, from the site's own data */}
    <section className="hx-numbers" aria-label="Althéa in numbers">
      <div className="lx-wrap hx-numbers-grid">
        {numbers.map(([value, label, href]) => <Link key={label} href={href}><strong>{value}</strong><span>{label}</span></Link>)}
      </div>
    </section>

    {/* 1c · Where are you right now? Pick your situation, get your next steps */}
    <section className="lx-section hx-pick" aria-labelledby="hx-pick-title">
      <div className="lx-wrap hx-pick-grid">
        <div>
          <p className="ms-kicker">START FROM WHERE YOU ARE</p>
          <h2 id="hx-pick-title" className="lx-title">Where are you <em>right now?</em></h2>
          <div className="hx-tabs" role="tablist" aria-label="Your situation">
            {situations.map((sit, i) => <button key={sit.id} type="button" role="tab" id={`hx-tab-${sit.id}`} aria-controls="hx-panel" aria-selected={pick === i} onClick={() => setPick(i)}><span>{String(i + 1).padStart(2, "0")}</span>{sit.label}</button>)}
          </div>
        </div>
        <div className="hx-panel" id="hx-panel" role="tabpanel" aria-labelledby={`hx-tab-${situations[pick].id}`}>
          <p className="hx-panel-kicker">{situations[pick].kicker}</p>
          <h3>{situations[pick].title}</h3>
          <ol>{situations[pick].steps.map((st) => <li key={st}>{st}</li>)}</ol>
          <div className="hx-panel-links">{situations[pick].links.map(([label, href]) => <Link key={href} href={href}>{label}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div>
          <WhatsAppButton text={situations[pick].message} label="Ask Harshita about this" />
        </div>
      </div>
    </section>

    {/* 1b · Two ways in: coming to France, or already here */}
    <section className="lx-section lx-paths-section" id="paths" aria-labelledby="lx-paths-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">WHO WE HELP</p><h2 id="lx-paths-title" className="lx-title">Coming to France, <em>or already here?</em></h2></div><p className="lx-lead">Most of our students start in India. Many come back to us once they land, for internships, jobs and paperwork.</p></div>
        <div className="lx-paths">{paths.map(({ id, kicker, icon: Icon, title, accent, items, href, cta, photo }) => <article key={id} className={`lx-path lx-path-${id}`}>
          <div className="lx-path-photo"><Image src={paris(photo).file} alt="" fill sizes="(max-width:640px) 86vw, (max-width:900px) 45vw, 24vw" /></div>
          <span className="lx-tag"><Icon size={14} aria-hidden="true" />{kicker}</span>
          <h3>{title} <em>{accent}</em></h3>
          <ul>{items.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
          <div className="lx-path-actions"><Link href={href} className="ms-btn ms-btn-gold"><span>{cta}</span><ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/book-consultation" className="ms-link">Free 15-minute call</Link></div>
        </article>)}</div>
        <div className="lx-paths-dots" aria-hidden="true">{paths.map(({ id }) => <span key={id} />)}</div>
      </div>
    </section>

    {/* 2 · The route, in three chapters */}
    <section className="lx-section hx-route" aria-labelledby="hx-route-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">HOW IT WORKS</p><h2 id="hx-route-title" className="lx-title">Three chapters, <em>one adviser.</em></h2></div><p className="lx-lead">Every step in the right order, so nothing blocks the next. Harshita walks it with you and checks each one.</p></div>
        <ol className="hx-chapters">{routeLines.map(({ n, label, stops }) => <li key={n}>
          <span className="hx-numeral" aria-hidden="true">{["I", "II", "III"][n - 1]}</span>
          <h3>{label}</h3>
          <ul>{stops.map(([t, dsc]) => <li key={t}><strong>{t}</strong><span>{dsc}</span></li>)}</ul>
        </li>)}</ol>
      </div>
    </section>

    {/* 3 · Command-palette search */}
    <section className="lx-section lx-finder" id="finder" aria-labelledby="lx-finder-title">
      <div className="lx-wrap lx-center">
        <p className="ms-kicker">COURSE SEARCH</p>
        <h2 id="lx-finder-title" className="lx-title">Search every course <em>in France.</em></h2>
        <p className="lx-lead">Official records from the French ministry and Parcoursup, with fees. Found one you like? Send it to Harshita on WhatsApp.</p>
      </div>
      <div className="lx-wrap lx-palette">
                <HomeFinder />
      </div>
    </section>

    {/* 3b · Free tools */}
    <section className="lx-section lx-tools" id="tools" aria-labelledby="lx-tools-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">FREE TOOLS · NO SIGN-UP</p><h2 id="lx-tools-title" className="lx-title">Do the research <em>yourself.</em></h2></div><p className="lx-lead">Use the same tools Harshita uses with her students. When you find a course or a job you like, apply through Althéa on WhatsApp.</p></div>
        <div className="lx-tools-grid">{tools.map(({ icon: Icon, title, body, href, cta, feature }) => <Link key={title} href={href} className={`lx-tool${feature ? " is-feature" : ""}`}>
          <span className="lx-tool-icon"><Icon size={22} aria-hidden="true" /></span>
          <h3>{title}</h3><p>{body}</p>
          <span className="lx-tool-cta">{cta}<ArrowUpRight size={15} aria-hidden="true" /></span>
        </Link>)}</div>
      </div>
    </section>

    {/* 4 · Bento: three chapters and the support around them */}
    <section className="lx-section" aria-labelledby="lx-bento-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">WHAT WE DO</p><h2 id="lx-bento-title" className="lx-title">Study, settle, <em>then work.</em></h2></div><p className="lx-lead">The same person helps you choose the course, find the flat and get the job. That is the point.</p></div>
        <div className="lx-bento">
          <Link href="/study-in-france" className="lx-tile lx-tile-photo lx-span-2x2" data-cursor="Explore">
            <Image src={paris("bnf-salle-ovale").file} alt={paris("bnf-salle-ovale").alt} fill sizes="(max-width:900px) 330px, 672px" />
            <div className="lx-tile-copy"><span className="lx-tag"><GraduationCap size={14} aria-hidden="true" />Chapter 01 · Study</span><h3>Find your place. <em>Expand your mind.</em></h3><p>Programme research, applications and budgets — built around your goals.</p></div>
          </Link>
          <Link href="/settle-in-france" className="lx-tile lx-tile-photo lx-span-2x1" data-cursor="Explore">
            <Image src={paris("cafe-night").file} alt={paris("cafe-night").alt} fill sizes="(max-width:900px) 330px, 672px" />
            <div className="lx-tile-copy"><span className="lx-tag"><Compass size={14} aria-hidden="true" />Chapter 02 · Settle</span><h3>New city. <em>New rhythm.</em></h3></div>
          </Link>
          <ReviewShowcase />
          <Link href="/career-support" className="lx-tile lx-tile-photo lx-span-2x1" data-cursor="Explore">
            <Image src={paris("la-defense-skyline").file} alt={paris("la-defense-skyline").alt} fill sizes="(max-width:900px) 330px, 672px" />
            <div className="lx-tile-copy"><span className="lx-tag"><Briefcase size={14} aria-hidden="true" />Chapter 03 · Succeed</span><h3>Bring your ambition. <em>Find your direction.</em></h3></div>
          </Link>
          <div className="lx-tile lx-tile-services lx-span-2x1">
            <span className="lx-tag"><Sparkles size={14} aria-hidden="true" />Support, end to end</span>
            <ul>{services.map(({ title }, i) => <li key={title}><Link href={serviceLinks[i]}>{title}<ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    {/* 8 · Founder */}
    <section className="lx-section" id="about" aria-labelledby="lx-founder-title">
      <div className="lx-wrap lx-founder">
        <div className="lx-founder-photo"><Image src="/images/paris/harshita-olympics-portrait.webp" alt="Harshita Kohli at India House during the Paris 2024 Olympics" fill sizes="(max-width:900px) 92vw, 45vw" /><span>India House · Paris 2024</span></div>
        <div className="lx-founder-copy">
          <p className="ms-kicker">MEET YOUR ADVISER</p>
          <h2 id="lx-founder-title" className="lx-title">I was an international student here <em>too.</em></h2>
          <p>I’m Harshita Kohli. I studied in France, built my career in Paris and now coach students through the same steps: the course, Campus France, the visa, the flat, the CAF file and the first job. You talk to me directly, not to a call centre.</p>
          <div className="ms-signature"><span>Harshita</span><small>Harshita Kohli · Founder · Career Coach & France Expert</small></div>
          <p className="lx-muted">Althéa Consulting (altheaconsulting.in) is an independent study abroad, settling and career advisory founded by Harshita Kohli in Paris. You may also see the name written Althea or Althèa Consulting.</p>
          <div className="lx-founder-actions"><WhatsAppButton text={waMessages.general} label="Message Harshita" /><Link className="ms-btn ms-btn-light" href="/about"><span>See my life in France</span><ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>

    {/* 9 · Departure planner: a dated plan from today to arrival */}
    <MovePlanner />

    {/* 10 · Questions */}
    <section className="lx-section" aria-labelledby="lx-faq-title">
      <div className="lx-wrap lx-faq">
        <div><p className="ms-kicker">FAQ</p><h2 id="lx-faq-title" className="lx-title">What students <em>ask first.</em></h2><Link className="ms-link" href="/faq">Explore all questions</Link></div>
        <Accordion idPrefix="atelier-answer" items={questions.map(([q, a]) => ({ q, a: <p>{a}</p> }))} />
      </div>
    </section>

    {/* 11 · Finale */}
    <section className="hx-final" id="booking" aria-labelledby="lx-final-title">
      <div className="lx-wrap hx-final-inner">
        <div>
          <p className="ms-kicker">START HERE</p>
          <h2 id="lx-final-title" className="lx-final-title">Tell Harshita what you’re <em>planning.</em></h2>
          <p className="lx-lead">Your marks, your budget, your intake. One message is enough to get an honest first answer.</p>
        </div>
        <div className="hx-final-actions">
          <WhatsAppButton text={waMessages.general} label="WhatsApp Harshita" />
          <Link className="ms-btn hx-btn-outline" href="/book-consultation"><span>Book a free 15-min call</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  </main><Footer showCallout={false} /></div>;
}
