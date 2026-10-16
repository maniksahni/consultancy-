"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, MapPin, Search, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeFinder from "./HomeFinder";
import { countries, services, reviews, questions } from "./content";
import Testimonials from "@/components/althea/Testimonials";
import Accordion from "@/components/maison/Accordion";
import { Card, Kicker, Section, Split, TextLink } from "@/components/maison/ui";
import { countryPhoto, paris, type ParisSlug } from "@/lib/paris";
import { RouteCard, StatsBand, ScrollWords, JourneyTrack, Chars, HeroDust, type HomeStats } from "./HorizonMotion";

gsap.registerPlugin(ScrollTrigger);

export type CountryCoverage = Record<string, { institutions: number; courses: number }>;

const cityLine = ["Paris", "London", "Boston", "Toronto", "Melbourne", "Munich", "Dublin", "Lyon", "Oxford", "Montréal"];
const chapters = [
  { name: "Study", title: ["Find your place.", "Expand your mind."], copy: "A programme should fit more than your qualifications. Explore your interests, compare your options and build an application plan around your goals and budget.", details: ["Programme & university research", "Application preparation", "Study budget planning"], href: "/study-in-france", action: "Explore study guidance", photo: "bnf-salle-ovale" as ParisSlug },
  { name: "Settle", title: ["New surroundings.", "A sense of belonging."], copy: "From your first address to your everyday essentials, work through the practical questions that help a new country feel a little more familiar.", details: ["Arrival & first-month planning", "Accommodation questions", "Everyday life in France"], href: "/settle-in-france", action: "Plan your arrival", photo: "cafe-night" as ParisSlug },
  { name: "Succeed", title: ["Bring your ambition.", "Find your direction."], copy: "Understand the story your experience tells. Make space to clarify your career direction and prepare for the conversations that move you forward.", details: ["Career direction", "Professional storytelling", "Interview preparation"], href: "/career-support", action: "Explore career support", photo: "la-defense-skyline" as ParisSlug },
];
const serviceLinks = ["/book-consultation", "/universities", "/admissions-process", "/scholarships", "/france/visas", "/settle-in-france", "/first-30-days-france"];
const serviceDetails = [
  "We begin with your goals, background and budget, then shape the plan around them.",
  "Compare programmes and institutions against what actually matters to you.",
  "Statements, CVs and documents reviewed with care, on a timeline you can keep.",
  "Understand which scholarships may fit and how to prepare a strong case.",
  "Know the steps, documents and timing before you apply.",
  "Think through neighbourhoods, budgets and first addresses.",
  "Banking, transport, healthcare and the first weeks, planned ahead.",
];
const journeySteps: [string, string][] = [["Let’s talk.", "Your goals, your questions, your starting point."], ["Find your direction.", "Compare your options. Build a realistic plan."], ["Make your move.", "Prepare the application and the details together."], ["Keep growing.", "Settle into life in France. Plan what comes next."]];

export default function MaisonHome({ stats, coverage }: { stats: HomeStats; coverage: CountryCoverage }) {
  const root = useRef<HTMLDivElement>(null);
  const [destination, setDestination] = useState(0);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia(scope);
    mm.add({ desktop: "(min-width: 901px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const { desktop, motion } = context.conditions as { desktop: boolean; motion: boolean };
      if (!motion) return;
      const q = gsap.utils.selector(scope);

      // 1 · The hero frame closes into a window as the story begins.
      if (desktop) {
        gsap.timeline({ scrollTrigger: { trigger: q(".mx-hero")[0], start: "top top", end: "+=110%", scrub: 0.6, pin: true } })
          .to(q(".mx-hero-frame"), { clipPath: "inset(13% 22% 13% 22% round 28px)", ease: "none" }, 0)
          .fromTo(q(".mx-hero-img"), { scale: 1.2 }, { scale: 1, ease: "none" }, 0)
          .to(q(".mx-hero-copy"), { yPercent: -35, opacity: 0, ease: "none" }, 0)
          .to(q(".mx-route-wrap"), { y: -120, opacity: 0, ease: "none" }, 0)
          .to(q(".mx-hero-cue, .mx-hero-meta"), { opacity: 0, ease: "none" }, 0)
          .fromTo(q(".mx-hero-after > *"), { opacity: 0, y: 70 }, { opacity: 1, y: 0, stagger: 0.08, ease: "none" }, 0.35);
      } else {
        gsap.to(q(".mx-hero-img"), { yPercent: 14, ease: "none", scrollTrigger: { trigger: q(".mx-hero")[0], start: "top top", end: "bottom top", scrub: true } });
      }

      // 2 · A city marquee that answers to scroll speed.
      const marquees = q(".mx-marquee-track").map((track, i) => gsap.to(track, { xPercent: i % 2 ? 0 : -50, startAt: { xPercent: i % 2 ? -50 : 0 }, duration: 38, ease: "none", repeat: -1 }));
      ScrollTrigger.create({ trigger: q(".mx-marquee")[0], start: "top bottom", end: "bottom top", onUpdate: (self) => {
        const boost = 1 + Math.min(6, Math.abs(self.getVelocity()) / 260);
        marquees.forEach((tween) => gsap.to(tween, { timeScale: boost * (self.direction || 1), duration: 0.2, overwrite: true, onComplete: () => { gsap.to(tween, { timeScale: self.direction || 1, duration: 1.2 }); } }));
      } });

      // 3 · Destinations travel sideways while the page holds still.
      if (desktop) {
        const track = q(".mx-dest-track")[0] as HTMLElement;
        const distance = () => track.scrollWidth - innerWidth + innerWidth * 0.06;
        const travel = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: {
          trigger: q(".mx-pin")[0], start: "top top", end: () => `+=${distance()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true,
          onUpdate: (self) => setDestination(Math.min(countries.length - 1, Math.floor(self.progress * countries.length))),
        } });
        q(".mx-dest-img img").forEach((img) => gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img.closest(".mx-dest"), containerAnimation: travel, start: "left right", end: "right left", scrub: true } }));
      }

      // 4 · Chapters stack, each one settling back as the next arrives.
      const cards = q(".mx-chapter");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, { scale: 0.9, opacity: 0.35, filter: "blur(2px)", ease: "none", scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true } });
      });
      q(".mx-chapter-img img").forEach((img) => gsap.fromTo(img, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } }));

      // 5 · Quiet parallax on editorial photography.
      q("[data-parallax]").forEach((el) => gsap.fromTo(el, { yPercent: -9 }, { yPercent: 9, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));

      // 6 · The closing image opens like an aperture.
      gsap.fromTo(q(".mx-final-aperture"), { clipPath: "circle(16% at 50% 55%)" }, { clipPath: "circle(78% at 50% 50%)", ease: "none", scrollTrigger: { trigger: q(".mx-final")[0], start: "top 80%", end: "top top", scrub: 0.6 } });
      gsap.fromTo(q(".mx-final-word"), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: q(".mx-final")[0], start: "top 60%", end: "top 5%", scrub: 0.6 } });
    });
    return () => mm.revert();
  }, []);

  return <div className="maison-home" ref={root}><Navbar appearance="dark" /><main id="main-content">
    <section className="mx-hero" aria-label="Go further. Become more.">
      <div className="mx-hero-frame"><Image className="mx-hero-img" src={paris("eiffel-autumn-sky").file} alt={paris("eiffel-autumn-sky").alt} fill priority sizes="100vw" /><div className="mx-hero-shade" /><HeroDust /></div>
      <div className="mx-hero-copy mx-wrap">
        <p className="mx-eyeline"><span className="mx-dot" />INDEPENDENT ADVISORY · PARIS, FRANCE</p>
        <h1><span className="mx-line"><span>Go further.</span></span><span className="mx-line"><em>Become more.</em></span></h1>
        <p className="mx-hero-lead">A new country. A bigger possibility. Personal guidance for the education, career and life you want to build.</p>
        <div className="mx-hero-actions"><Link className="mx-btn mx-magnetic" href="/book-consultation" data-cursor="Begin">Begin your journey<ArrowUpRight size={18} /></Link><a className="mx-ghost" href="#finder">Explore the possibilities</a></div>
      </div>
      <div className="mx-route-wrap"><RouteCard /></div>
      <div className="mx-hero-after" aria-hidden="true"><span>YOUR NEXT CHAPTER</span><p>begins with a single <em>conversation.</em></p></div>
      <div className="mx-hero-meta" aria-hidden="true"><MapPin size={13} />48°51′ N · 02°21′ E — Paris</div>
      <div className="mx-hero-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
    </section>

    <section className="mx-finder" id="finder">
      <div className="mx-wrap mx-finder-head">
        <p className="mx-kicker"><Search size={14} />YOUR NEXT CHAPTER STARTS HERE</p>
        <h2><Chars text="What’s your" /> <em><Chars text="next move?" start={11} /></em></h2>
        <p>Search real course, subject and institution records across seven destinations.</p>
      </div>
      <div className="mx-wrap mx-search"><HomeFinder /></div>
      <StatsBand stats={stats} />
    </section>

    <section className="mx-marquee" aria-hidden="true">
      {[0, 1].map((row) => <div className="mx-marquee-row" key={row}><div className="mx-marquee-track">{[...cityLine, ...cityLine].map((city, i) => <span key={i} className={i % 2 === row ? "is-outline" : undefined}>{city}<i>✦</i></span>)}</div></div>)}
    </section>

    <section className="mx-pin" id="destinations" aria-label="Study destinations">
      <div className="mx-pin-head mx-wrap">
        <div><p className="mx-kicker">THE WORLD IS OPEN</p><h2>Seven destinations.<br /><em>One personal plan.</em></h2></div>
        <div className="mx-pin-progress" aria-hidden="true"><b>{String(destination + 1).padStart(2, "0")}</b><span><i style={{ transform: `scaleX(${(destination + 1) / countries.length})` }} /></span><small>{String(countries.length).padStart(2, "0")}</small></div>
      </div>
      <div className="mx-dest-viewport"><div className="mx-dest-track">
        {countries.map((country, i) => <Link className="mx-dest" key={country.slug} href={country.slug === "france" ? "/france" : `/destinations/${country.slug}`} data-cursor="Explore">
          <div className="mx-dest-img"><Image src={paris(countryPhoto[country.slug]).file} alt={paris(countryPhoto[country.slug]).alt} fill sizes="(max-width:900px) 85vw, 46vw" /></div>
          <div className="mx-dest-shade" />
          <span className="mx-dest-index">{String(i + 1).padStart(2, "0")} <span aria-hidden="true">{country.flag}</span></span>
          <div className="mx-dest-copy"><p>{country.line.replace(/\n/g, " ")}</p><h3>{country.name}</h3>
          </div>
          <span className="mx-dest-arrow"><ArrowUpRight size={22} /></span>
        </Link>)}
        <Link className="mx-dest mx-dest-end" href="/destinations"><p className="mx-kicker">STILL DECIDING?</p><h3>Compare every <em>destination.</em></h3><span className="mx-btn">Open the atlas<ArrowUpRight size={18} /></span></Link>
      </div></div>
    </section>

    <section className="mx-manifesto"><div className="mx-wrap"><Kicker>THE ALTHÉA DIFFERENCE</Kicker><h2>Big life decisions.<br /><span>Made <em>personal.</em></span></h2><ScrollWords text="We don’t start with a university list. We start with you — your ambitions, your circumstances, your version of a good life. Then we build a plan that makes sense, before the applications and long after arrival." emphasis={["you", "good", "life", "plan"]} /><TextLink href="/about">The people behind your next step</TextLink></div></section>

    <section className="mx-chapters" aria-label="Study, settle and succeed in France">
      <div className="mx-wrap mx-chapters-head"><p className="mx-kicker">THREE CHAPTERS. ONE DIRECTION.</p><h2><Chars text="Study. Settle." /> <em><Chars text="Succeed." start={14} /></em></h2></div>
      <div className="mx-stack mx-wrap">{chapters.map((chapter, i) => <article className="mx-chapter" key={chapter.name} style={{ top: `calc(110px + ${i * 26}px)` }}>
        <div className="mx-chapter-img"><Image src={paris(chapter.photo).file} alt={paris(chapter.photo).alt} fill sizes="(max-width:900px) 92vw, 50vw" /><span>0{i + 1} / {chapter.name.toUpperCase()}</span></div>
        <div className="mx-chapter-copy"><p className="mx-kicker">CHAPTER 0{i + 1}</p><h3>{chapter.title[0]}<br /><em>{chapter.title[1]}</em></h3><p>{chapter.copy}</p><ul>{chapter.details.map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul><Link className="mx-line-link" href={chapter.href}>{chapter.action}<ArrowUpRight size={17} /></Link></div>
      </article>)}</div>
    </section>

    <Section tone="ivory" id="services" kicker="WITH YOU. ALL THE WAY." title="Every ambition." accent="The right support." intro="From your first shortlist to your first day in a new city. Choose the help that moves you forward." action={<TextLink href="/services">Explore our support</TextLink>}>
      <div className="mx-bento">{services.map(({ Icon, title, copy }, i) => <Card key={title} className={i === 0 ? "mx-bento-lead" : undefined} feature={i === 0} index={i + 1} icon={<Icon size={i === 0 ? 30 : 24} strokeWidth={1.3} />} kicker={copy} title={title} href={serviceLinks[i]} cta={i === 0 ? "Start here" : "Learn more"}><p>{serviceDetails[i]}</p></Card>)}</div>
      <p className="mx-support-note"><Check size={15} aria-hidden="true" />Clear scope. Personal attention. Fees agreed before we begin.</p>
    </Section>

    <Section tone="paper" id="about" className="mx-founder">
      <Split image={paris("pont-alexandre-couple").file} alt={paris("pont-alexandre-couple").alt} caption="Pont Alexandre III" tall>
        <Kicker>A PARISIAN PERSPECTIVE. A PERSONAL APPROACH.</Kicker>
        <h2>Advice from<br /><em>the other side of the journey.</em></h2>
        <p>Moving abroad changes more than your address. We understand the questions that come with it.</p>
        <p>Founded by Harshita Kohli in Paris, Althéa connects independent study guidance with practical settling and career support in France. Real conversations, shaped by lived experience.</p>
        <div className="ms-signature"><span>Harshita</span><small>Harshita Kohli · Founder · Career Coach & France Expert</small></div>
        <Link className="ms-btn ms-btn-ink mx-magnetic" href="/about"><span>Get to know Althéa</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
      </Split>
    </Section>

    <Section tone="ink" kicker="YOU DON’T NEED EVERY ANSWER YET" title="A big move." accent="One clear step at a time." action={<TextLink href="/admissions-process">Your journey, explained</TextLink>}>
      <JourneyTrack steps={journeySteps} />
    </Section>

    <div id="outcomes"><Testimonials /></div>
    <Section tone="ivory" kicker="DIFFERENT JOURNEYS. SHARED POSSIBILITIES." title="Real people." accent="Whole new chapters." action={<TextLink href="/reviews">Read student stories</TextLink>}>
      <div className="mx-quotes">{reviews.map((r) => <figure key={r.name} className="mx-quote" data-spotlight><blockquote>{r.quote}</blockquote><figcaption><span className="ms-monogram" aria-hidden="true">{r.name.split(" ").map((n) => n[0]).join("")}</span><span><strong>{r.name}</strong><small>{r.degree} · {r.university}</small></span><span aria-hidden="true">{r.flag}</span></figcaption></figure>)}</div>
    </Section>

    <Section tone="paper" kicker="BEFORE YOU TAKE THE LEAP" title="Good questions." accent="Honest answers." align="split" intro="A little clarity makes the first step easier." action={<TextLink href="/faq">Explore all questions</TextLink>}>
      <Accordion idPrefix="atelier-answer" items={questions.map(([q, a]) => ({ q, a: <p>{a}</p> }))} />
    </Section>

    <section className="mx-final" id="booking">
      <div className="mx-final-aperture"><Image src={paris("pont-alexandre-night").file} alt={paris("pont-alexandre-night").alt} fill sizes="100vw" /><div className="mx-final-shade" /></div>
      <div className="mx-final-copy mx-wrap">
        <p className="mx-kicker"><Sparkles size={14} />THIS IS WHERE SOMETHING STARTS</p>
        <h2><span className="mx-final-word">The world</span> <span className="mx-final-word">is waiting.</span><br /><em className="mx-final-word">Let’s find your place in it.</em></h2>
        <p>Bring your questions. Your ambitions. Your what-ifs. We’ll find your first step, together.</p>
        <Link className="mx-orb mx-magnetic" href="/book-consultation" data-cursor="Let’s talk"><span>Let’s have a<br />conversation</span><ArrowUpRight size={26} /></Link>
        <small>No commitment. Just a personal conversation.</small>
      </div>
    </section>
  </main><Footer /></div>;
}
