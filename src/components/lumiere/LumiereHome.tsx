"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
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
/** The process, as three metro lines. */
const routeLines: { n: number; label: string; color: "red" | "blue" | "green"; stops: [string, string][] }[] = [
  { n: 1, label: "Before you apply", color: "red", stops: [["A shortlist that fits", "Courses matched to your marks, budget and goals."], ["Tests and documents", "IELTS or DELF, transcripts and translations, in order."], ["SOP and references", "A motivation letter written for each programme."]] },
  { n: 2, label: "Before you fly", color: "blue", stops: [["Campus France", "Études en France file and interview practice."], ["Offer, funds, visa", "Proof of funds and the VLS-TS student visa."], ["Housing and insurance", "A first address and cover before you land."]] },
  { n: 3, label: "After you land", color: "green", stops: [["Bank, SIM, Navigo, CAF", "The first-week setup, in the order that works."], ["Your residence permit", "Validate the visa and renew your titre de séjour."], ["Internships and jobs", "Stage, alternance, French CV and your first job."]] },
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


export default function LumiereHome({ stats, coverage }: { stats: HomeStats; coverage: CountryCoverage }) {
  const root = useRef<HTMLDivElement>(null);
  
  // The word ribbon also travels with the reader's scroll, so it moves even where autoplay is reduced.
  useEffect(() => {
    const ribbon = root.current?.querySelector<HTMLElement>(".lx-ribbon > div");
    if (!ribbon) return;
    let frame = 0;
    const update = () => { frame = 0; ribbon.style.translate = `${-(window.scrollY * 0.6) % (ribbon.scrollWidth / 2)}px 0`; };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia(scope);
    mm.add({ desktop: "(min-width: 901px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      const { motion } = ctx.conditions as { desktop: boolean; motion: boolean };
      if (!motion) return;
      const q = gsap.utils.selector(scope);
      // The Paris photograph sinks back and the hero copy lifts away as the story begins.
      gsap.to(q(".lx-hero-stage"), { scale: 0.86, opacity: 0.25, yPercent: 10, ease: "none", scrollTrigger: { trigger: q(".lx-hero")[0], start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".lx-hero-copy"), { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: q(".lx-hero")[0], start: "20% top", end: "bottom top", scrub: true } });
      // Bento tiles rise in a cascade.
      gsap.from(q(".lx-tile"), { y: 80, opacity: 0, rotateX: 8, transformOrigin: "50% 100%", duration: 0.7, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: q(".lx-bento")[0], start: "top 78%" } });
    });
    return () => mm.revert();
  }, []);

  return <div className="lumiere-home" ref={root}><Navbar /><main id="main-content">

    {/* 1 · Hero: navy, one clear promise, a real Paris photo and the student pass */}
    <section className="lx-hero hv" aria-labelledby="lx-hero-title">
      <span className="hv-rings" aria-hidden="true" />
      <div className="lx-wrap hv-grid">
        <div className="lx-hero-copy hv-copy">
          <p className="hv-pill"><span aria-hidden="true" />Aiming for the September 2027 intake? Start now.</p>
          <h1 id="lx-hero-title"><span className="lx-h1-kicker">Study in France consultant · Paris ⇄ India</span>Study in France, <em>planned</em> by someone who <mark>lives here.</mark></h1>
          <p className="lx-hero-lead">Courses, Campus France and the visa before you fly. Housing, CAF, internships and your first job once you land. One adviser in Paris, from India to your first payslip.</p>
          <div className="lx-hero-actions">
            <Link href="/universities" className="ms-btn hv-btn-red"><span>Find my course</span><ArrowUpRight size={18} aria-hidden="true" /></Link>
            <WhatsAppButton text={waMessages.general} label="WhatsApp Harshita" />
          </div>
          <ul className="hv-ticks">
            <li><Check size={15} aria-hidden="true" />Free first chat</li>
            <li><Check size={15} aria-hidden="true" />Based in Paris</li>
            <li><Check size={15} aria-hidden="true" />Indian students guided 1:1</li>
          </ul>
          <Link href="/in-france" className="lx-hero-alt"><MapPin size={15} aria-hidden="true" />Already in France? Jobs, internships & paperwork<ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="hv-visual" aria-hidden="true">
          <div className="hv-photo"><Image src={paris("eiffel-autumn-sky").file} alt="" fill priority sizes="(max-width:900px) 80vw, 34vw" /></div>
          <div className="hv-pass">
            <p className="hv-pass-top"><span>STUDENT PASS · ALTHÉA</span><span>N° 2027</span></p>
            <div className="hv-pass-route"><div><small>FROM</small><b>IND</b></div><i /><div><small>TO</small><b>PAR</b></div></div>
            <dl><div><dt>Student</dt><dd>You</dd></div><div><dt>Intake</dt><dd>Sept 2027</dd></div><div><dt>Status</dt><dd className="is-ok">On track</dd></div></dl>
            <p className="hv-pass-foot"><span>Course · Campus France · Visa · Housing</span><span className="hv-barcode" /></p>
          </div>
          <div className="hv-chip"><Check size={16} /><div><b>Visa approved</b><small>Next up: your first flat</small></div></div>
          <div className="hv-sticker"><b>Free</b><small>first chat</small></div>
        </div>
      </div>
    </section>

    {/* 1a · Yellow ticker */}
    <div className="lx-ribbon hv-ticker" aria-hidden="true"><div>{Array.from({ length: 2 }).map((_, k) => <span key={k}>Course shortlist <i>✦</i> Campus France <i>✦</i> Student visa <i>✦</i> Housing <i>✦</i> CAF <i>✦</i> Bank & SIM <i>✦</i> Internships <i>✦</i> First job <i>✦</i> Titre de séjour <i>✦</i> </span>)}</div></div>

    {/* 1c · Sound familiar? */}
    <section className="lx-section hv-familiar" aria-labelledby="hv-familiar-title">
      <div className="lx-wrap hv-split">
        <div>
          <p className="ms-kicker">SOUND FAMILIAR?</p>
          <h2 id="hv-familiar-title" className="lx-title">You’ve read every blog and watched every reel, and you still don’t know <em>where to start.</em></h2>
          <p className="lx-lead">Agents, cousins and group chats all say something different. Nobody tells you what fits your marks, your budget and your timeline.</p>
        </div>
        <div className="hv-chat" aria-label="Questions students ask">
          <p>Public university or business school? What actually fits my marks?</p>
          <p>My agent says admission is “guaranteed”. Is that real?</p>
          <p>How much money do I really need to show for the visa?</p>
          <p className="is-reply">Ask Harshita. You’ll get a straight answer from Paris.</p>
        </div>
      </div>
    </section>

    {/* 1d · Myths, struck through */}
    <section className="lx-section hv-myths" aria-labelledby="hv-myths-title">
      <div className="lx-wrap">
        <h2 id="hv-myths-title" className="hv-myths-title">Everyone has an opinion on France. <span>Here’s what’s true.</span></h2>
        <ul className="hv-myth-list">
          <li><s>You need fluent French to study in France</s><p>Many programmes are taught fully in English. Filter by teaching language in the <Link href="/programmes">programme finder</Link>.</p></li>
          <li><s>Only expensive private schools take Indian students</s><p>Public universities publish non-EU fees of roughly €2,900 to €3,950 a year. Your profile matters more than the brand.</p></li>
          <li><s>An agent can guarantee your admission or visa</s><p>Only the university decides admission and only the consulate decides the visa. Anyone promising more is selling.</p></li>
          <li><s>Getting a job after graduation is easy</s><p>It is very possible with the right permit, a French-style CV and some French. <Link href="/jobs">We help with all three.</Link></p></li>
        </ul>
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

    {/* 2 · The route, drawn like metro lines */}
    <section className="lx-section hv-route" aria-labelledby="hv-route-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">HOW IT WORKS</p><h2 id="hv-route-title" className="lx-title">Your route to France, <em>line by line.</em></h2></div><p className="lx-lead">Every step in the right order, so nothing blocks the next. Harshita walks it with you and checks each stop.</p></div>
        <div className="hv-lines">{routeLines.map(({ n, label, color, stops }) => <article key={n} className={`hv-line hv-line-${color}`}>
          <p className="hv-line-head"><b>LIGNE {n}</b>{label}</p>
          <ol>{stops.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}</ol>
        </article>)}</div>
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
        <div className="lx-founder-photo"><Image src="/images/paris/harshita-eiffel.webp" alt="Harshita Kohli, founder of Althéa Consulting, in front of the Eiffel Tower" fill sizes="(max-width:900px) 92vw, 45vw" /><span>Harshita in Paris</span></div>
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
    <section className="hv-final" id="booking" aria-labelledby="lx-final-title">
      <div className="lx-wrap hv-final-inner">
        <div>
          <p className="ms-kicker">START HERE</p>
          <h2 id="lx-final-title" className="lx-final-title">Tell Harshita what you’re <em>planning.</em></h2>
          <p className="lx-lead">Your marks, your budget, your intake. One message is enough to get an honest first answer.</p>
        </div>
        <div className="hv-final-actions">
          <WhatsAppButton text={waMessages.general} label="WhatsApp Harshita" />
          <Link className="ms-btn hv-btn-outline" href="/book-consultation"><span>Book a free 15-min call</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  </main><Footer showCallout={false} /></div>;
}
