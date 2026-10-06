"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe2, MessageCircle } from "lucide-react";
import { useRef } from "react";

const destinations = [
  { name:"United Kingdom", slug:"uk", image:"/images/destinations/uk.webp", meta:"1-year masters · Graduate Route", note:"Russell Group, compact degrees, global finance." },
  { name:"United States", slug:"usa", image:"/images/destinations/usa.webp", meta:"STEM OPT · research depth", note:"High-ambition pathways across tech, data and business." },
  { name:"Germany", slug:"germany", image:"/images/destinations/germany.webp", meta:"public universities · low tuition", note:"Engineering, mobility, manufacturing and applied research." },
  { name:"Australia", slug:"australia", image:"/images/destinations/australia.webp", meta:"Go8 · post-study work", note:"Research-led universities with strong graduate outcomes." },
  { name:"Canada", slug:"canada", image:"/images/destinations/canada.webp", meta:"co-op · applied learning", note:"Industry-connected degrees across Ontario and BC." },
  { name:"Ireland", slug:"ireland", image:"/images/destinations/ireland.webp", meta:"European tech gateway", note:"One-year masters near the centre of global tech." },
];

const pillars = [
  { no:"01", title:"A shortlist with a reason.", body:"Every university earns its place through fit, budget, admit probability and long-term value — not a recruitment deal." },
  { no:"02", title:"One mentor, one context.", body:"Your profile does not reset at every stage. The same person carries the reasoning from discovery to visa preparation." },
  { no:"03", title:"Applications that sound like you.", body:"Narrative, CV and supporting documents are reviewed against your actual background — not pushed through a template factory." },
  { no:"04", title:"Visa preparation without theatre.", body:"Finances, intent and course rationale are tested until your answers are clear, truthful and internally consistent." },
];

const journey = [
  { n:"01", title:"Discover", kicker:"Profile diagnosis", body:"Academic record, gaps, work history, budget, destination preference and risk factors mapped in one working view." },
  { n:"02", title:"Position", kicker:"Shortlist & narrative", body:"Build a balanced university matrix and define the story your application actually needs to communicate." },
  { n:"03", title:"Build", kicker:"Applications", body:"SOP, CV, LOR strategy, document checks and submission sequencing reviewed line by line." },
  { n:"04", title:"Prepare", kicker:"Visa & funding", body:"Financial evidence, forms, intent and interview responses pressure-tested before the real decision." },
  { n:"05", title:"Depart", kicker:"Final readiness", body:"Offer comparison, deposits, accommodation, travel and first-weeks planning brought into one final checklist." },
];

const outcomes = [
  { school:"Columbia University", program:"MS Data Science", signal:"Prior refusal → visa approved", country:"United States" },
  { school:"TUM", program:"MSc Automotive Engineering", signal:"Public university · €0 tuition", country:"Germany" },
  { school:"University of Manchester", program:"MSc International Business", signal:"£8,000 merit award", country:"United Kingdom" },
];

const faqs = [
  ["Do you work like a typical education agency?","No. The model is direct mentorship with zero university recruiter commissions guiding the shortlist."],
  ["Can you help after a visa refusal?","Yes, the previous application can be reviewed for document, finance and interview inconsistencies before a new strategy is considered."],
  ["Will you write my SOP for me?","The work is collaborative. Your story and facts remain yours; the mentorship focuses on structure, clarity, evidence and positioning."],
  ["Can I come without a fixed country?","Yes. Country choice can be treated as a strategic decision rather than a starting assumption."],
];

const ease=[0.22,1,0.36,1] as const;

export default function Home2026(){
  const reduce=useReducedMotion();
  const heroRef=useRef<HTMLElement>(null);
  const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]});
  const imageY=useTransform(scrollYProgress,[0,1],[0,120]);
  const copyY=useTransform(scrollYProgress,[0,1],[0,54]);
  const opacity=useTransform(scrollYProgress,[0,0.82],[1,0]);

  return (
    <>
      <section ref={heroRef} className="h26-hero">
        <div className="h26-noise" aria-hidden="true" />
        <motion.div className="h26-hero-media" style={reduce?undefined:{y:imageY}}>
          <img src="/images/mentor-hero-640.webp" alt="Harshita, senior study abroad mentor" fetchPriority="high" />
          <div className="h26-hero-media-shade" />
          <div className="h26-hero-caption"><span>PRIVATE MENTORSHIP</span><strong>One person. Every major decision.</strong></div>
        </motion.div>
        <motion.div className="h26-hero-copy" style={reduce?undefined:{y:copyY,opacity}}>
          <motion.p initial={reduce?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.7,ease}} className="h26-kicker">STUDY ABROAD / PERSONALLY GUIDED</motion.p>
          <motion.h1 initial={reduce?false:{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.08,ease}}>
            Make the move.<br/><em>Keep the story yours.</em>
          </motion.h1>
          <motion.p initial={reduce?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.18,ease}} className="h26-hero-intro">
            Independent, one-to-one admissions and visa mentorship for students who want a considered plan — not a mass-processed application.
          </motion.p>
          <motion.div initial={reduce?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.28,ease}} className="h26-hero-actions">
            <a href="#booking" className="h26-primary">Book a strategy conversation <ArrowUpRight size={18}/></a>
            <a href="#destinations" className="h26-text-link">Explore destinations <ArrowDown size={16}/></a>
          </motion.div>
        </motion.div>
        <div className="h26-hero-index" aria-hidden="true"><span>01</span><i/><span>08</span></div>
        <div className="h26-hero-side-note">LONDON · BERLIN · TORONTO · SYDNEY · DUBLIN · NEW YORK</div>
      </section>

      <section className="h26-proof">
        <div className="h26-proof-line"><span>Independent by design</span><span>Direct mentor access</span><span>Applications + visa strategy</span><span>Global remote sessions</span></div>
        <div className="h26-proof-grid">
          <div><strong>500+</strong><span>students mentored</span></div>
          <div><strong>6</strong><span>core study destinations</span></div>
          <div><strong>1:1</strong><span>mentor continuity</span></div>
          <div className="h26-proof-statement"><p>Not more options.<br/><em>Better decisions.</em></p></div>
        </div>
      </section>

      <section id="destinations" className="h26-destinations">
        <div className="h26-section-head">
          <div><span>02 / DESTINATIONS</span><h2>Choose a place.<br/><em>Understand the trade-offs.</em></h2></div>
          <p>Swipe through six study ecosystems — each with a different cost structure, academic culture, work pathway and application rhythm.</p>
        </div>
        <div className="h26-destination-rail">
          {destinations.map((item,index)=>(
            <motion.article key={item.slug} className="h26-destination-card" initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.7,delay:index*.035,ease}}>
              <Link href={`/destinations/${item.slug}`} className="h26-destination-image">
                <img src={item.image} alt={`${item.name} study destination`} loading="lazy"/>
                <span className="h26-destination-number">0{index+1}</span>
                <span className="h26-destination-open"><ArrowUpRight size={17}/></span>
              </Link>
              <div className="h26-destination-copy"><p>{item.meta}</p><h3>{item.name}</h3><span>{item.note}</span></div>
            </motion.article>
          ))}
        </div>
        <div className="h26-rail-foot"><span>DRAG / SWIPE TO EXPLORE</span><Link href="#booking">Not sure where you fit? Talk it through <ArrowRight size={15}/></Link></div>
      </section>

      <section className="h26-principles">
        <div className="h26-principles-title"><span>03 / THE DIFFERENCE</span><h2>Strategy should feel<br/><em>specific to you.</em></h2></div>
        <div className="h26-principles-grid">
          {pillars.map((p,index)=><motion.article key={p.no} className={`h26-principle h26-principle-${index+1}`} initial={reduce?false:{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.75,ease}}>
            <span>{p.no}</span><h3>{p.title}</h3><p>{p.body}</p>
          </motion.article>)}
          <div className="h26-principles-photo"><img src="/images/mentor-spotlight.webp" alt="One-to-one admissions consultation" loading="lazy"/><span>THE HUMAN CONTEXT<br/>BEHIND THE PAPERWORK</span></div>
        </div>
      </section>

      <section id="process" className="h26-journey">
        <div className="h26-journey-sticky">
          <span>04 / THE JOURNEY</span>
          <h2>One path.<br/><em>Five deliberate moves.</em></h2>
          <p>Each stage resolves a different kind of uncertainty. The point is not to rush forward — it is to know what the next decision depends on.</p>
          <Link href="/admissions-process">See the complete roadmap <ArrowUpRight size={16}/></Link>
        </div>
        <div className="h26-journey-steps">
          {journey.map((j,index)=><motion.article key={j.n} initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}} transition={{duration:.7,ease}}>
            <div className="h26-step-index"><span>{j.n}</span><i/></div>
            <p>{j.kicker}</p><h3>{j.title}</h3><div>{j.body}</div>
            <span className="h26-step-status"><Check size={13}/> resolved before the next move</span>
          </motion.article>)}
        </div>
      </section>

      <section id="mentorship" className="h26-mentor">
        <div className="h26-mentor-image"><img src="/images/mentor-spotlight.webp" alt="Harshita during a mentoring session" loading="lazy"/><span>STUDY WITH HARSHITA / PRIVATE ADVISORY</span></div>
        <div className="h26-mentor-copy">
          <span>05 / YOUR MENTOR</span>
          <h2>A serious decision deserves<br/><em>a familiar voice.</em></h2>
          <p>Applications are full of small choices that compound. Working with the same mentor means those choices stay connected to the same understanding of your profile.</p>
          <div className="h26-mentor-notes">
            <div><strong>01</strong><p>Direct access, not rotating counsellors.</p></div>
            <div><strong>02</strong><p>Context retained from first call to final preparation.</p></div>
            <div><strong>03</strong><p>Independent recommendations with no university recruiter commission.</p></div>
          </div>
          <Link href="/mentorship-model">Explore the mentorship model <ArrowUpRight size={16}/></Link>
        </div>
      </section>

      <section id="outcomes" className="h26-outcomes">
        <div className="h26-section-head h26-section-head-dark">
          <div><span>06 / OUTCOMES</span><h2>Results are useful.<br/><em>Context makes them meaningful.</em></h2></div>
          <p>Selected case files show the profile, the institution and the recorded outcome together — because a headline result alone never tells the whole story.</p>
        </div>
        <div className="h26-outcome-grid">
          {outcomes.map((o,index)=><Link href="/outcomes" key={o.school} className="h26-outcome-card">
            <span>CASE 00{index+1}</span><div><p>{o.country}</p><h3>{o.school}</h3><small>{o.program}</small></div><strong>{o.signal}</strong><ArrowUpRight size={17}/>
          </Link>)}
        </div>
        <Link className="h26-outcomes-link" href="/outcomes">Open the complete outcomes ledger <ArrowRight size={16}/></Link>
      </section>

      <section id="faq" className="h26-faq">
        <div className="h26-faq-intro"><span>07 / QUESTIONS</span><h2>Before you decide,<br/><em>ask better questions.</em></h2><Link href="/faq">Browse the full FAQ <ArrowUpRight size={15}/></Link></div>
        <div className="h26-faq-list">{faqs.map(([q,a],index)=><details key={q} open={index===0}><summary><span>0{index+1}</span><h3>{q}</h3><b>+</b></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="h26-pre-cta">
        <Globe2 size={34}/>
        <p>THE NEXT COUNTRY IS ONLY ONE PART OF THE DECISION.</p>
        <h2>Build the plan before<br/><em>you build the application.</em></h2>
        <a href="#booking">Start with a conversation <MessageCircle size={18}/></a>
      </section>
    </>
  );
}
