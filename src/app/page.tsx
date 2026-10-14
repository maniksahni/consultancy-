import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Globe2, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeChapterPicker from "@/components/home/HomeChapterPicker";
import { destinations } from "@/data/destinations";
import "./home.css";

export const metadata = pageMetadata("/", {
  title: "A world of possibility. A life that feels like yours.",
  description: "We go abroad to explore, discover and meet new parts of ourselves. Find thoughtful, independent guidance for your next chapter in France.",
});

const steps = [
  { number: "01", title: "Tell us what’s pulling you forward.", copy: "A place, a possibility, a question you can’t quite put down. We start with what matters to you." },
  { number: "02", title: "Make the unfamiliar feel navigable.", copy: "We bring your priorities into focus, explore relevant routes and flag what needs confirming with official sources." },
  { number: "03", title: "Choose your own next step.", copy: "You decide what feels right. If we work together, the support and fee are clear before anything begins." },
];

export default function Home() {
  return <div className="althea-home home-reverie">
    <Navbar />
    <main id="main-content">
      <section className="rv-hero" aria-labelledby="rv-title">
        <Image className="rv-hero-image" src="/images/editorial/althea-france-atlas-hero.jpg" alt="An open atlas and a route towards Paris in the evening light" fill priority sizes="100vw" />
        <div className="rv-hero-shade" />
        <div className="rv-hero-grain" aria-hidden="true" />
        <div className="rv-hero-content">
          <div className="rv-kicker rv-kicker-light"><span className="rv-kicker-star">✳</span> THE WORLD, A LITTLE MORE YOURS <i>·</i> PARIS</div>
          <h1 id="rv-title">We go to see<br />the world.<br /><em>And meet ourselves.</em></h1>
          <p className="rv-hero-lede">New places have a way of opening something in us. If France is calling, let’s make the first step feel a little less unknown—and a lot more yours.</p>
          <div className="rv-hero-actions"><Link className="rv-button rv-button-light" href="#find-your-way">Find your way <ArrowRight size={17} /></Link><Link className="rv-hero-link" href="/universities">Explore study destinations <ArrowUpRight size={16} /></Link></div>
        </div>
        <div className="rv-hero-side" aria-hidden="true"><span>AN OPENING, NOT AN ANSWER</span><i /></div>
        <a className="rv-hero-bottom" href="#the-feeling"><span>SCROLL INTO YOUR NEXT CHAPTER</span><ArrowDown size={15} /></a>
        <div className="rv-coordinate" aria-hidden="true"><span>48°51′24″N</span><span>2°21′08″E</span></div>
      </section>

      <section className="rv-manifesto" id="the-feeling">
        <div className="rv-section-mark"><span>01</span><i /></div>
        <div className="rv-manifesto-layout">
          <p className="rv-kicker">A LIFE CAN BEGIN WITH A QUESTION</p>
          <div><h2>Maybe you leave<br />to find <em>more of you.</em></h2><p className="rv-manifesto-copy">To learn in a different language. To get lost on streets you’ll one day know by heart. To find out what you’re capable of when everything is new. Going abroad is never only about the place. It’s about the person you become along the way.</p><Link className="rv-underlink" href="/about">A more personal kind of guidance <ArrowUpRight size={15} /></Link></div>
        </div>
        <div className="rv-manifesto-aside"><span>GO WITH CURIOSITY.</span><span>ARRIVE AS YOURSELF.</span><i>✳</i></div>
      </section>

      <section className="rv-discover" id="destinations" aria-labelledby="rv-discover-title">
        <div className="rv-section-top"><div><div className="rv-kicker"><span className="rv-number">02</span> SEVEN DESTINATIONS, A WORLD OF DIFFERENCE</div><h2 id="rv-discover-title">Where could<br /><em>curiosity take you?</em></h2></div><p>Every country has its own rhythm, routes and questions. Begin with a feeling—or browse the study records available here.</p></div>
        <div className="rv-country-rail" aria-label="Explore study destinations">
          {destinations.map((country, index) => <Link className={`rv-country-card ${index === 0 ? "rv-country-card-featured" : ""}`} href={`/universities?country=${country.slug}&view=courses`} key={country.slug}>
            <Image src={country.image} alt={country.photoCaption} fill sizes="(max-width: 700px) 78vw, (max-width: 1100px) 42vw, 26vw" />
            <span className="rv-country-shade" />
            <span className="rv-country-index">0{index + 1} <i>—</i> {country.region.toUpperCase()}</span>
            <span className="rv-country-copy"><span>{country.city}</span><strong>{country.name}</strong><em>{country.mood}</em></span>
            <span className="rv-country-open" aria-label={`Explore ${country.name}`}><ArrowUpRight size={17} /></span>
          </Link>)}
        </div>
        <div className="rv-rail-hint"><span>DRAG OR SWIPE TO WANDER</span><span>{destinations.length} PLACES TO BEGIN <i>✳</i></span></div>
        <div className="rv-directory-note"><Globe2 size={17} /><p><strong>A useful first map, with honest edges.</strong> The directory brings together institution records across seven destinations and course or programme records where available. Coverage varies by country; records are not a complete admissions catalogue and fees are shown only where published.</p><Link href="/universities?country=france&view=courses#course-finder">Open the directory <ArrowUpRight size={15} /></Link></div>
      </section>

      <section className="rv-compass" id="find-your-way">
        <div className="rv-compass-image"><Image src="/images/editorial/france-evening-20261014.webp" alt="Paris at blue hour, seen across the Seine" fill sizes="(max-width: 760px) 100vw, 48vw" /><span>PARIS, JUST AFTER SUNSET <i>·</i> A PLACE THAT CAN FEEL LIKE A BEGINNING</span><div className="rv-image-star">✳</div></div>
        <div className="rv-compass-panel"><div className="rv-kicker"><span className="rv-number">03</span> START WHERE YOU ARE</div><h2 id="compass-title">What feels<br /><em>closest right now?</em></h2><p className="rv-compass-intro">You don’t need the whole plan. Just choose the thought that’s been on your mind.</p><HomeChapterPicker /><div className="rv-compass-footer"><Compass size={16} /><span>One step at a time. Always in your own direction.</span></div></div>
      </section>

      <section className="rv-process" aria-labelledby="rv-process-title">
        <div className="rv-process-head"><div><div className="rv-kicker"><span className="rv-number">04</span> A HUMAN WAY THROUGH THE DETAILS</div><h2 id="rv-process-title">Less noise.<br /><em>A clearer way forward.</em></h2></div><p>Independent guidance for the questions that come with a big move. Personal, thoughtful, and shaped around your circumstances.</p></div>
        <div className="rv-steps">{steps.map((step) => <article className="rv-step" key={step.number}><span className="rv-step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><span className="rv-step-flower" aria-hidden="true">✳</span></article>)}</div>
        <div className="rv-trust-line"><span>INDEPENDENT ADVISORY <i>·</i> PARIS</span><p>Althéa is an independent advisory, not a university or government representative. Admissions, scholarships and visa decisions belong to the relevant institutions and authorities.</p></div>
      </section>

      <section className="rv-human">
        <div className="rv-human-copy"><div className="rv-kicker rv-kicker-light"><span className="rv-number">05</span> GOOD GUIDANCE STARTS WITH LISTENING</div><h2>There’s a person<br />on the other side<br /><em>of your question.</em></h2><p>Harshita Kohli is a France-based career coach and former international student. She knows the feeling of beginning somewhere new—and believes the best advice starts by understanding your story first.</p><Link className="rv-light-link" href="/about">Meet Harshita <ArrowUpRight size={16} /></Link><span className="rv-human-signature">A conversation, at your pace. <i>✳</i></span></div>
      </section>

      <section className="rv-last-call" id="begin"><div className="rv-last-ornament" aria-hidden="true">✳</div><div className="rv-kicker"><span className="rv-number">06</span> WHEN YOU’RE READY</div><h2>The first step can be<br /><em>a conversation.</em></h2><p>Tell us what you’re hoping to discover. We’ll start there, make space for your questions and see whether personal guidance feels right.</p><Link className="rv-button rv-button-dark" href="/book-consultation">Let’s talk about your next chapter <ArrowUpRight size={17} /></Link><span className="rv-last-note"><Sparkles size={14} /> No pressure. Scope and fee are clear before any work begins.</span></section>
    </main>
    <Footer />
  </div>;
}
