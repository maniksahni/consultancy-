"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ReviewShowcase from "./ReviewShowcase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, Command, Compass, GraduationCap, Plane, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeFinder from "@/components/redesign/HomeFinder";
import MovePlanner from "./MovePlanner";
import Accordion from "@/components/maison/Accordion";
import { countries, services, questions } from "@/components/redesign/content";
import { ScrollWords, JourneyTrack, Chars, type HomeStats } from "@/components/redesign/HorizonMotion";
import { countryPhoto, paris } from "@/lib/paris";

gsap.registerPlugin(ScrollTrigger);

export type CountryCoverage = Record<string, { institutions: number; courses: number }>;

const serviceLinks = ["/book-consultation", "/universities", "/admissions-process", "/scholarships", "/france/visas", "/settle-in-france", "/first-30-days-france"];
const journeySteps: [string, string][] = [["Say hello.", "Your goals, your questions, your starting point — in one honest conversation."], ["Find your direction.", "Compare programmes, cities and costs. Build a plan that actually fits."], ["Make your move.", "Applications, documents and timelines, prepared together."], ["Land, then grow.", "Your first 30 days in France, and the career you came for."]];


export default function LumiereHome({ stats, coverage }: { stats: HomeStats; coverage: CountryCoverage }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
      const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
      if (!motion) return;
      const q = gsap.utils.selector(scope);
      // The Paris photograph sinks back and the hero copy lifts away as the story begins.
      gsap.to(q(".lx-hero-stage"), { scale: 0.86, opacity: 0.25, yPercent: 10, ease: "none", scrollTrigger: { trigger: q(".lx-hero")[0], start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".lx-hero-copy"), { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: q(".lx-hero")[0], start: "20% top", end: "bottom top", scrub: true } });
      // Bento tiles rise in a cascade.
      gsap.from(q(".lx-tile"), { y: 80, opacity: 0, rotateX: 8, transformOrigin: "50% 100%", duration: 0.7, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: q(".lx-bento")[0], start: "top 78%" } });
      // Destinations travel sideways while the page holds still.
      if (desktop) {
        const track = q(".lx-dest-track")[0] as HTMLElement;
        const distance = () => track.scrollWidth - innerWidth + innerWidth * 0.08;
        const travel = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: q(".lx-pin")[0], start: "top top", end: () => `+=${distance()}`, scrub: 0.3, pin: true, invalidateOnRefresh: true, onUpdate: (self) => setActive(Math.min(countries.length - 1, Math.floor(self.progress * countries.length))) } });
        q(".lx-dest-img img").forEach((img) => gsap.fromTo(img, { xPercent: -8, scale: 1.12 }, { xPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: img.closest(".lx-dest"), containerAnimation: travel, start: "left right", end: "right left", scrub: true } }));
      }
      // The finale ring opens.
      gsap.fromTo(q(".lx-final-ring"), { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: q(".lx-final")[0], start: "top 85%", end: "top 15%", scrub: 0.3 } });
    });
    return () => mm.revert();
  }, []);

  return <div className="lumiere-home" ref={root}><Navbar /><main id="main-content">

    {/* 1 · Hero: Eiffel Tower at sunset, with a personal route to Paris */}
    <section className="lx-hero" aria-labelledby="lx-hero-title">
      <div className="lx-hero-stage lx-paris-stage"><Image src={paris("eiffel-autumn-sky").file} alt={paris("eiffel-autumn-sky").alt} fill priority sizes="100vw" /><span className="lx-paris-caption">PARIS, FRANCE · YOUR NEXT CHAPTER</span></div>
      <div className="lx-hero-copy lx-wrap">
        <h1 id="lx-hero-title"><span className="lx-h1-kicker">Study in France consultant · Paris ⇄ India</span><span className="lx-h1-line"><span>Bonjour,</span></span><span className="lx-h1-line"><em>future.</em></span></h1>
        <p className="lx-hero-lead">Study in France from India with a Paris-based adviser: universities, Campus France, student visa, housing and your first job — guided by someone who was once an international student herself.</p>
        <div className="lx-hero-actions">
          <Link href="/book-consultation" className="ms-btn ms-btn-gold mx-magnetic" data-cursor="Begin"><span>Plan my move</span><ArrowUpRight size={18} aria-hidden="true" /></Link>
          <a href="#destinations" className="ms-btn ms-btn-light"><span>Explore 7 destinations</span><Compass size={17} aria-hidden="true" /></a>
        </div>
      </div>
      <a href="#finder" className="lx-scroll" aria-label="Scroll to the course finder"><span /></a>
    </section>

    {/* 2 · Words that move */}
    <div className="lx-ribbon" aria-hidden="true"><div>{Array.from({ length: 2 }).map((_, k) => <span key={k}>Study <i>✦</i> Settle <i>✦</i> Succeed <i>✦</i> Paris <i>✦</i> Lyon <i>✦</i> London <i>✦</i> Toronto <i>✦</i> Dublin <i>✦</i> Berlin <i>✦</i> Sydney <i>✦</i> Boston <i>✦</i> </span>)}</div></div>

    {/* 3 · Command-palette search */}
    <section className="lx-section lx-finder" id="finder" aria-labelledby="lx-finder-title">
      <div className="lx-wrap lx-center">
        <p className="ms-kicker">SEARCH THE DIRECTORY</p>
        <h2 id="lx-finder-title" className="lx-title"><Chars text="Find your course" /> <em><Chars text="in seconds." start={16} /></em></h2>
        <p className="lx-lead">Real course, subject and institution records across seven destinations — not a brochure.</p>
      </div>
      <div className="lx-wrap lx-palette">
        <div className="lx-palette-bar" aria-hidden="true"><span><Command size={14} /> Althéa search</span><span className="lx-dots"><i /><i /><i /></span></div>
        <HomeFinder />
      </div>
    </section>

    {/* 4 · Bento: three chapters and the support around them */}
    <section className="lx-section" aria-labelledby="lx-bento-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">THREE CHAPTERS · ONE DIRECTION</p><h2 id="lx-bento-title" className="lx-title">Study. Settle. <em>Succeed.</em></h2></div><p className="lx-lead">One adviser for the whole journey — from the first shortlist to your first month, and the career after it.</p></div>
        <div className="lx-bento">
          <Link href="/study-in-france" className="lx-tile lx-tile-photo lx-span-2x2" data-cursor="Explore">
            <Image src={paris("bnf-salle-ovale").file} alt={paris("bnf-salle-ovale").alt} fill sizes="(max-width:900px) 92vw, 50vw" />
            <div className="lx-tile-copy"><span className="lx-tag"><GraduationCap size={14} aria-hidden="true" />Chapter 01 · Study</span><h3>Find your place. <em>Expand your mind.</em></h3><p>Programme research, applications and budgets — built around your goals.</p></div>
          </Link>
          <Link href="/settle-in-france" className="lx-tile lx-tile-photo lx-span-2x1" data-cursor="Explore">
            <Image src={paris("cafe-night").file} alt={paris("cafe-night").alt} fill sizes="(max-width:900px) 92vw, 50vw" />
            <div className="lx-tile-copy"><span className="lx-tag"><Compass size={14} aria-hidden="true" />Chapter 02 · Settle</span><h3>New city. <em>New rhythm.</em></h3></div>
          </Link>
          <ReviewShowcase />
          <Link href="/career-support" className="lx-tile lx-tile-photo lx-span-2x1" data-cursor="Explore">
            <Image src={paris("la-defense-skyline").file} alt={paris("la-defense-skyline").alt} fill sizes="(max-width:900px) 92vw, 50vw" />
            <div className="lx-tile-copy"><span className="lx-tag"><Briefcase size={14} aria-hidden="true" />Chapter 03 · Succeed</span><h3>Bring your ambition. <em>Find your direction.</em></h3></div>
          </Link>
          <div className="lx-tile lx-tile-services lx-span-2x1">
            <span className="lx-tag"><Sparkles size={14} aria-hidden="true" />Support, end to end</span>
            <ul>{services.map(({ title }, i) => <li key={title}><Link href={serviceLinks[i]}>{title}<ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}</ul>
          </div>
        </div>
      </div>
    </section>

    {/* 5 · Destinations, travelling sideways */}
    <section className="lx-pin" id="destinations" aria-label="Study destinations">
      <div className="lx-wrap lx-pin-head">
        <div><p className="ms-kicker">THE WORLD IS OPEN</p><h2 className="lx-title">Seven destinations. <em>One plan.</em></h2></div>
        <div className="lx-pin-progress" aria-hidden="true"><b>{String(active + 1).padStart(2, "0")}</b><span><i style={{ transform: `scaleX(${(active + 1) / countries.length})` }} /></span><small>{String(countries.length).padStart(2, "0")}</small></div>
      </div>
      <div className="lx-dest-viewport"><div className="lx-dest-track">
        {countries.map((country, i) => { const photo = paris(countryPhoto[country.slug]); const c = coverage[country.slug]; return <Link className="lx-dest" key={country.slug} href={country.slug === "france" ? "/france" : `/destinations/${country.slug}`} data-cursor="Explore">
          <div className="lx-dest-img"><Image src={photo.file} alt={photo.alt} fill sizes="(max-width:900px) 85vw, 42vw" /></div>
          <span className="lx-dest-index">{String(i + 1).padStart(2, "0")} <span aria-hidden="true">{country.flag}</span></span>
          <div className="lx-dest-copy"><p>{country.line.replace(/\n/g, " ")}</p><h3>{country.name}</h3>
          </div>
          <span className="lx-dest-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
        </Link>; })}
        <Link className="lx-dest lx-dest-end" href="/destinations"><p className="ms-kicker">STILL DECIDING?</p><h3>Compare every <em>destination.</em></h3><span className="ms-btn ms-btn-gold"><span>Open the atlas</span><ArrowUpRight size={17} aria-hidden="true" /></span></Link>
      </div></div>
    </section>

    {/* 6 · Manifesto: words light up as you read */}
    <section className="lx-section lx-manifesto">
      <div className="lx-wrap lx-narrow">
        <p className="ms-kicker">ALTHÉA CONSULTING · PARIS, FRANCE</p>
        <p>Althéa Consulting (altheaconsulting.in) is an independent study abroad, settling and career advisory founded by Harshita Kohli in Paris. We help Indian and international students plan their studies and prepare for life and work in France. You may also see the name written Althea or Althèa Consulting.</p>
        <ScrollWords text="We don’t start with a university list. We start with you — your ambitions, your circumstances, your version of a good life. Then we build a plan that makes sense, before the applications and long after arrival." emphasis={["you", "good", "life", "plan"]} />
        <Link className="ms-link" href="/about">Meet Harshita, your adviser in Paris</Link>
      </div>
    </section>

    {/* 7 · The journey, step by step */}
    <section className="lx-section" aria-labelledby="lx-journey-title">
      <div className="lx-wrap">
        <div className="lx-head"><div><p className="ms-kicker">YOU DON’T NEED EVERY ANSWER YET</p><h2 id="lx-journey-title" className="lx-title">A big move. <em>One clear step at a time.</em></h2></div><Link className="ms-link" href="/admissions-process">How the process works</Link></div>
        <JourneyTrack steps={journeySteps} />
      </div>
    </section>

    {/* 8 · Founder */}
    <section className="lx-section" id="about" aria-labelledby="lx-founder-title">
      <div className="lx-wrap lx-founder">
        <div className="lx-founder-photo"><Image src={paris("pont-alexandre-couple").file} alt={paris("pont-alexandre-couple").alt} fill sizes="(max-width:900px) 92vw, 45vw" /><span>Pont Alexandre III</span></div>
        <div className="lx-founder-copy">
          <p className="ms-kicker">A PARISIAN PERSPECTIVE</p>
          <h2 id="lx-founder-title" className="lx-title">Advice from <em>the other side of the journey.</em></h2>
          <p>Founded by Harshita Kohli in Paris, Althéa Consulting connects independent study guidance with practical settling and career support in France. Real conversations, shaped by lived experience.</p>
          <div className="ms-signature"><span>Harshita</span><small>Harshita Kohli · Founder · Career Coach & France Expert</small></div>
          <Link className="ms-btn ms-btn-light" href="/about"><span>Get to know Althéa</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    {/* 9 · Departure planner: a dated plan from today to arrival */}
    <MovePlanner />

    {/* 10 · Questions */}
    <section className="lx-section" aria-labelledby="lx-faq-title">
      <div className="lx-wrap lx-faq">
        <div><p className="ms-kicker">BEFORE YOU TAKE THE LEAP</p><h2 id="lx-faq-title" className="lx-title">Good questions. <em>Honest answers.</em></h2><Link className="ms-link" href="/faq">Explore all questions</Link></div>
        <Accordion idPrefix="atelier-answer" items={questions.map(([q, a]) => ({ q, a: <p>{a}</p> }))} />
      </div>
    </section>

    {/* 11 · Finale */}
    <section className="lx-final" id="booking" aria-labelledby="lx-final-title">
      <div className="lx-final-ring" aria-hidden="true" />
      <div className="lx-wrap lx-center">
        <p className="ms-kicker">THIS IS WHERE SOMETHING STARTS</p>
        <h2 id="lx-final-title" className="lx-final-title">Your Paris chapter <em>starts with hello.</em></h2>
        <p className="lx-lead">Bring your questions, your ambitions, your what-ifs. We’ll find your first step — together.</p>
        <Link className="mx-orb lx-orb mx-magnetic" href="/book-consultation" data-cursor="Let’s talk"><span>Let’s have a<br />conversation</span><ArrowUpRight size={24} aria-hidden="true" /></Link>
        <small className="lx-muted">No commitment. Just a personal conversation.</small>
      </div>
    </section>
  </main><Footer showCallout={false} /></div>;
}
