import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Compass, GraduationCap, MapPin, MoveUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/althea/Reveal";
import FAQ from "@/components/althea/FAQ";
import Booking from "@/components/althea/Booking";

export const metadata = pageMetadata("/", {
  title: "A considered beginning in France",
  description: "Independent, personal guidance for studying, settling and building a career in France. Meet Paris-based adviser Harshita Kohli and find a thoughtful next step.",
});

const pathways = [
  { number: "01", name: "Study in France", note: "Programmes · applications · preparation", text: "Find your bearings in the French education system, compare programmes and build an application plan around your own goals.", href: "/study-in-france", image: "/images/editorial/sainte-genevieve.webp", alt: "The reading room of the Bibliothèque Sainte-Geneviève in Paris", icon: GraduationCap },
  { number: "02", name: "Settle in France", note: "Arrival · everyday life · confidence", text: "Make the transition feel more manageable, with thoughtful orientation for the practical questions that come with a new home.", href: "/settle-in-france", image: "/images/editorial/france-bordeaux.webp", alt: "The historic Place de la Bourse in Bordeaux beside the Garonne", icon: MapPin },
  { number: "03", name: "Build your career", note: "Positioning · applications · practice", text: "Shape a considered next move with practical support for your CV, professional profile, interviews and job search.", href: "/career-support", image: "/images/editorial/notre-dame.webp", alt: "The west façade of Notre-Dame de Paris", icon: Compass },
];

const steps = [
  ["Begin with your story", "We start with where you are: your experience, priorities, questions and the possibilities you are considering."],
  ["Make sense of the options", "Explore the choices that fit your circumstances. We can help you see the details to compare and the questions to ask."],
  ["Prepare with intention", "Turn decisions into practical next steps, with guidance on documents, applications and the conversations ahead."],
  ["Find your footing", "Keep the wider picture in view as plans take shape—from preparing to leave to navigating the first questions in France."],
];

export default function Home() {
  return <div className="althea-home">
    <Navbar />
    <main id="main-content" className="home-story">
      <section className="home-cover" aria-labelledby="home-title">
        <Image className="home-cover-image" src="/images/editorial/france-evening-20261014.webp" alt="Paris at blue hour, with the Eiffel Tower illuminated beyond the Seine" fill priority sizes="100vw" />
        <div className="home-cover-veil" />
        <div className="home-cover-frame">
          <p className="home-overline"><span /> INDEPENDENT GUIDANCE · FRANCE</p>
          <h1 id="home-title">A future in<br /><em>France.</em></h1>
          <p className="home-cover-intro">A more considered way to study, settle and find your next chapter—guided by someone who knows France as home.</p>
          <div className="home-cover-actions">
            <Link className="home-button home-button-gold" href="/book-consultation">Begin a conversation <ArrowUpRight size={17} /></Link>
            <a className="home-text-link home-cover-explore" href="#welcome">Discover Althéa <ArrowDown size={15} /></a>
          </div>
        </div>
        <div className="home-cover-index"><span>48°51′ N&nbsp; 2°21′ E</span><span>AN INDEPENDENT FRANCE ADVISORY</span></div>
        <a className="home-scroll-cue" href="#welcome" aria-label="Scroll to discover"><span>SCROLL TO DISCOVER</span><i /></a>
      </section>

      <section className="home-welcome home-wrap" id="welcome">
        <Reveal><p className="home-eyebrow">A MORE PERSONAL WAY FORWARD <span>—</span> ALTHÉA CONSULTING</p>
          <div className="home-welcome-grid"><h2>Big decisions<br />deserve <em>room to breathe.</em></h2>
            <div className="home-welcome-copy"><p>Moving towards a life in France is made up of many decisions: what to study, where to begin, how to prepare, and what comes after arrival.</p><p>Althéa offers independent, one-to-one guidance for the journey—thoughtful support shaped around the person making it.</p><Link className="home-underlink" href="/about">Meet your adviser <ArrowUpRight size={16} /></Link></div>
          </div>
        </Reveal>
        <div className="home-ornament" aria-hidden="true"><span>✳</span></div>
      </section>

      <section className="home-pathways" aria-labelledby="pathways-title">
        <div className="home-wrap">
          <Reveal><div className="home-section-head"><div><p className="home-eyebrow">THREE WAYS TO FIND YOUR WAY</p><h2 id="pathways-title">France, <em>in your own way.</em></h2></div><p>Start with the question on your mind today. We’ll help you see how it connects to the bigger picture.</p></div></Reveal>
          <div className="home-path-grid">{pathways.map(({ number, name, note, text, href, image, alt, icon: Icon }) => <Reveal key={number}><article className="home-path-card">
            <Link href={href} className="home-path-image" aria-label={`Explore ${name}`}><Image src={image} alt={alt} fill sizes="(max-width: 760px) 90vw, 30vw" /><span className="home-path-number">{number}</span><span className="home-path-arrow"><MoveUpRight size={18} /></span></Link>
            <div className="home-path-copy"><p className="home-eyebrow"><Icon size={14} /> {note}</p><h3>{name}</h3><p>{text}</p><Link className="home-underlink" href={href}>Explore this path <ArrowUpRight size={15} /></Link></div>
          </article></Reveal>)}</div>
        </div>
      </section>

      <section className="home-interlude" aria-label="A thoughtful journey">
        <Image src="/images/editorial/france-campus.webp" alt="An architectural detail of a historic university in France" fill sizes="100vw" />
        <div className="home-interlude-shade" />
        <Reveal><p className="home-eyebrow">THOUGHTFUL, STEP BY STEP</p><p className="home-interlude-quote">“The right next step<br />begins with <em>understanding you.”</em></p><span>PERSONAL GUIDANCE · PARIS, FRANCE</span></Reveal>
      </section>

      <section className="home-journey home-wrap" aria-labelledby="journey-title">
        <Reveal><div className="home-section-head home-journey-heading"><div><p className="home-eyebrow">FROM FIRST QUESTIONS TO NEW BEGINNINGS</p><h2 id="journey-title">Clarity for the<br /><em>road ahead.</em></h2></div><p>Every journey is different. Here’s a sense of how personal guidance can make a complex move feel more navigable.</p></div></Reveal>
        <div className="home-steps">{steps.map(([title, text], index) => <Reveal key={title}><article className="home-step"><span className="home-step-no">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><span className="home-step-mark" aria-hidden="true">✳</span></article></Reveal>)}</div>
        <p className="home-note">Guidance is tailored to your situation. Official requirements, admissions decisions and immigration outcomes remain with the relevant institutions and authorities.</p>
      </section>

      <section className="home-adviser">
        <div className="home-adviser-photo"><Image src="/images/editorial/notre-dame.webp" alt="A Parisian streetscape in the historic heart of the city" fill sizes="(max-width: 760px) 100vw, 50vw" /><span>PARIS, FRANCE <i>·</i> A PLACE TO BEGIN</span></div>
        <Reveal><div className="home-adviser-copy"><p className="home-eyebrow">A LOCAL PERSPECTIVE, A PERSONAL CONVERSATION</p><h2>Meet Harshita.<br /><em>Your guide in France.</em></h2><p>Based in Paris, Harshita Kohli brings a personal perspective to the questions that come with studying, settling and building a future in France.</p><p>Start with a conversation about what matters to you. Together, you can explore the right questions and a practical direction for what comes next.</p><Link href="/about" className="home-underlink">A little more about Harshita <ArrowUpRight size={16} /></Link></div></Reveal>
      </section>

      <section className="home-guidance home-wrap">
        <Reveal><div className="home-guidance-top"><p className="home-eyebrow">USEFUL TO KNOW</p><p>Make informed decisions with official sources, a clear picture of your options and the right questions in hand.</p></div>
          <div className="home-guidance-panel"><div><span className="home-guidance-spark">✳</span><p className="home-eyebrow">YOUR FRANCE FIELD NOTES</p><h2>A thoughtful start<br />is a <em>strong start.</em></h2><p>Explore practical guides to French programmes, the application journey, arrival and life in France—all in one place.</p><Link className="home-button home-button-navy" href="/knowledge">Explore the guides <ArrowUpRight size={16} /></Link></div><div className="home-guidance-links"><Link href="/study-in-france"><span>01</span><strong>Study in France</strong><ArrowUpRight size={16} /></Link><Link href="/settle-in-france"><span>02</span><strong>Life and arrival</strong><ArrowUpRight size={16} /></Link><Link href="/career-support"><span>03</span><strong>Career support</strong><ArrowUpRight size={16} /></Link><Link href="/first-30-days-france"><span>04</span><strong>Your first 30 days</strong><ArrowUpRight size={16} /></Link></div></div>
        </Reveal>
      </section>

      <section className="home-faq home-wrap" aria-labelledby="home-faq-title">
        <Reveal><div className="home-faq-heading"><div><p className="home-eyebrow">A FEW GOOD QUESTIONS</p><h2 id="home-faq-title">Before we <em>begin.</em></h2><p>A little clarity can make the first conversation easier.</p></div><Link className="home-underlink" href="/faq">More answers <ArrowUpRight size={16} /></Link></div><div className="home-faq-list"><FAQ /></div></Reveal>
      </section>

      <section className="home-contact" id="begin">
        <div className="home-contact-copy"><p className="home-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s make the<br /><em>first step yours.</em></h2><p>Share a little about what you’re considering. We’ll start with your questions and explore whether personal guidance feels right for you.</p><div className="home-contact-aside"><Sparkles size={15} /><span>Thoughtful, personal guidance. No pressure to decide on a service.</span></div></div>
        <div className="home-contact-form"><Booking defaultCountry="France" /></div>
      </section>
    </main>
    <Footer />
  </div>;
}
