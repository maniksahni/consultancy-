import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/althea/FAQ";
import FranceChapterJourney from "@/components/home/FranceChapterJourney";

export const metadata = pageMetadata("/", {
  title: "Your next chapter in France",
  description: "Independent, personal guidance for studying, settling and building a career in France. Meet Paris-based adviser Harshita Kohli and find a thoughtful next step.",
});

const steps = [
  ["Listen, then find the real question", "We begin with your experience, priorities and the decisions in front of you. No assumptions about what your journey should look like."],
  ["Make the choices easier to see", "We sort through the options that fit your circumstances and identify what needs checking with official sources or institutions."],
  ["Agree a practical next step", "If working together feels right, we clarify the scope and fee before any support begins. You stay in charge of each decision."],
];

export default function Home() {
  return <div className="althea-home">
    <Navbar />
    <main id="main-content" className="home-story">
      <section className="home-cover" aria-labelledby="home-title">
        <Image className="home-cover-image" src="/images/editorial/althea-france-atlas-hero.jpg" alt="An open blue atlas with a brass route marker leading across France, beside a Paris window at dusk" fill priority sizes="100vw" />
        <div className="home-cover-veil" />
        <div className="home-cover-frame">
          <p className="home-overline"><span /> AN INDEPENDENT FRANCE ADVISORY <i>—</i> PARIS</p>
          <h1 id="home-title">Your next chapter<br /><em>in France.</em></h1>
          <p className="home-cover-intro">A considered beginning for the life you’re building in France. Independent, one-to-one guidance for study, a new home and the work ahead.</p>
          <div className="home-cover-actions">
            <Link className="home-button home-button-gold" href="/book-consultation">Begin with a conversation <ArrowUpRight size={17} /></Link>
            <a className="home-text-link home-cover-explore" href="#welcome">Enter the journal <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="home-cover-index"><span>48°51′ N&nbsp; 2°21′ E</span><span>FRANCE, WITH A PERSON TO ASK</span></div>
        <a className="home-scroll-cue" href="#welcome" aria-label="Continue to the next chapter"><span>THE FIRST CHAPTER</span><i /></a>
      </section>

      <section className="home-welcome home-wrap" id="welcome">
        <p className="home-eyebrow">01 &nbsp; A PLACE TO BEGIN <span>—</span> ALTHÉA CONSULTING</p>
        <div className="home-welcome-grid"><h2>Big decisions<br />need <em>clear space.</em></h2>
          <div className="home-welcome-copy"><p>Studying, settling or building a career in France can begin with one question—and quickly become a dozen more.</p><p>From Paris, Harshita offers independent, personal guidance to help you understand your options and decide what comes next, at your own pace.</p><Link className="home-underlink" href="/about">A note from your adviser <ArrowUpRight size={16} /></Link></div>
        </div>
        <div className="home-ornament" aria-hidden="true"><span>✳</span><i /></div>
      </section>

      <FranceChapterJourney />

      <section className="home-interlude" aria-label="A personal perspective from Paris">
        <Image src="/images/editorial/france-campus.webp" alt="Architectural detail of a historic university in France" fill sizes="100vw" />
        <div className="home-interlude-shade" />
        <div className="home-interlude-copy"><p className="home-eyebrow">A VIEW FROM THE OTHER SIDE OF THE MOVE</p><p className="home-interlude-quote">A new country is made of<br />big plans <em>and small details.</em></p><span>PERSONAL GUIDANCE · PARIS, FRANCE</span></div>
        <span className="home-photo-caption">A MOMENT BETWEEN CHAPTERS <i>—</i> FRANCE</span>
      </section>

      <section className="home-journey home-wrap" aria-labelledby="journey-title">
        <div className="home-journey-heading"><div><p className="home-eyebrow">03 &nbsp; A THOUGHTFUL WAY OF WORKING</p><h2 id="journey-title">No one-size-fits-all.<br /><em>A clear next step.</em></h2></div><p>First, a conversation. Then a shared understanding of what you need—and whether personal guidance is the right fit.</p></div>
        <div className="home-steps">{steps.map(([title, text], index) => <article key={title} className="home-step"><span className="home-step-no">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><span className="home-step-mark" aria-hidden="true">✳</span></article>)}</div>
        <p className="home-note">Althéa is an independent advisory, not a university or government representative. Admissions, scholarships, visas and official requirements are decided by the relevant institutions and authorities.</p>
      </section>

      <section className="home-adviser">
        <div className="home-adviser-photo"><Image src="/images/editorial/notre-dame.webp" alt="A Parisian streetscape in the historic heart of the city" fill sizes="(max-width: 760px) 100vw, 50vw" /><span>PARIS, FRANCE <i>·</i> WHERE HARSHITA CALLS HOME</span><div className="home-photo-stamp" aria-hidden="true">A local<br /><em>perspective</em></div></div>
        <div className="home-adviser-copy"><p className="home-eyebrow">04 &nbsp; THE PERSON BEHIND THE GUIDANCE</p><h2>Meet Harshita.<br /><em>Begin with a person.</em></h2><p>Harshita Kohli is a France-based career coach and former international student. She understands the move from both sides: as someone who has made it, and as someone who now helps others think it through.</p><p>Her approach begins by listening, then making the options, scope and next steps clear before you decide how to proceed.</p><Link href="/about" className="home-underlink">Get to know Harshita <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="home-guidance home-wrap">
        <div className="home-guidance-top"><p className="home-eyebrow">05 &nbsp; YOUR FIELD NOTES</p><p>Useful context for the questions ahead. For current rules and decisions, always follow the relevant official source.</p></div>
        <div className="home-guidance-panel"><div><span className="home-guidance-spark">✳</span><p className="home-eyebrow">A SMALL LIBRARY FOR A BIG MOVE</p><h2>Know the terrain.<br /><em>Choose your pace.</em></h2><p>Explore practical guides to French programmes, applications, arrival and everyday life in France.</p><Link className="home-button home-button-navy" href="/knowledge">Explore the guides <ArrowUpRight size={16} /></Link></div><div className="home-guidance-links"><Link href="/study-in-france"><span>01</span><strong>Study in France</strong><ArrowUpRight size={16} /></Link><Link href="/settle-in-france"><span>02</span><strong>Life and arrival</strong><ArrowUpRight size={16} /></Link><Link href="/career-support"><span>03</span><strong>Career support</strong><ArrowUpRight size={16} /></Link><Link href="/first-30-days-france"><span>04</span><strong>Your first 30 days</strong><ArrowUpRight size={16} /></Link></div></div>
        <div className="home-official"><span>THE OFFICIAL WORD</span><p>We help you understand the questions to ask and prepare your next steps. For current application routes and visa decisions, consult the relevant official authority.</p></div>
      </section>

      <section className="home-faq home-wrap" aria-labelledby="home-faq-title">
        <div className="home-faq-heading"><div><p className="home-eyebrow">06 &nbsp; A FEW GOOD QUESTIONS</p><h2 id="home-faq-title">Before we <em>begin.</em></h2><p>A little clarity can make the first conversation easier.</p></div><Link className="home-underlink" href="/faq">More answers <ArrowUpRight size={16} /></Link></div><div className="home-faq-list"><FAQ /></div>
      </section>

      <section className="home-contact" id="begin">
        <div className="home-contact-copy"><p className="home-eyebrow">07 &nbsp; WHEN YOU’RE READY</p><h2>One question<br />can begin a <em>lot.</em></h2><p>Tell us a little about the France story you’re considering. We’ll begin there and see whether personal guidance feels right.</p><div className="home-contact-aside"><Sparkles size={15} /><span>First, understand your situation. Agree scope and fee before any work begins.</span></div></div>
        <div className="home-contact-choice"><p className="home-form-kicker">A PERSONAL INTRODUCTION</p><h3>Let’s begin with what’s on your mind.</h3><p>Choose the way that feels easiest. There’s no obligation to book a service.</p><Link className="home-button home-button-gold" href="/book-consultation">Arrange an introductory call <ArrowUpRight size={16} /></Link><Link href="/book-consultation" className="home-contact-alt">Share your question with Harshita <ArrowUpRight size={15} /></Link></div>
      </section>
    </main>
    <Footer />
  </div>;
}
