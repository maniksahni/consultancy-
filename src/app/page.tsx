import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/althea/FAQ";

export const metadata = pageMetadata("/", {
  title: "Settle, Study & Build Your Career in France",
  description: "Practical, France-based support for international students and young professionals—from arrival essentials to career readiness, with independent study guidance too.",
});

const arrivalOffers = [
  { number: "01", title: "France Arrival Essentials", text: "Make sense of your first steps: SIM options, bank-account preparation, transport and the everyday systems you’ll meet.", tag: "ARRIVAL · EVERYDAY LIFE" },
  { number: "02", title: "Student Life Setup", text: "Get oriented with accommodation-search preparation, CAF information, insurance, paperwork and a local-life checklist.", tag: "STUDENT LIFE · ORIENTATION" },
  { number: "03", title: "Career Launch in France", text: "Shape a French-style CV and LinkedIn profile, plan your search and prepare for interviews, internships and alternance.", tag: "CAREER · JOB SEARCH" },
  { number: "04", title: "Business French for Work", text: "Build practical language confidence for university, administration and professional conversations.", tag: "FRENCH · COMMUNICATION" },
];

export default function Home() {
  return <>
    <Navbar />
    <main id="main-content" className="positioned-home">
      <section className="position-hero wrap">
        <div className="position-hero-copy">
          <p className="eyebrow">FRANCE-BASED · PERSON-TO-PERSON SUPPORT</p>
          <h1>Your trusted guide for studying, settling, and succeeding in France.</h1>
          <p className="position-lead">Practical support for international students and young professionals—from arrival essentials to career readiness.</p>
          <div className="position-actions">
            <Link className="button" href="/settle-in-france">Get Settling Support <ArrowUpRight size={18} /></Link>
            <Link className="button button-outline" href="/study-in-france">Explore Study in France <ArrowUpRight size={18} /></Link>
          </div>
          <div className="position-proof"><span>BASED IN {brand.location.toUpperCase()}</span><span>INDEPENDENT GUIDANCE</span><span>SUPPORT THROUGH THE NEXT STEPS</span></div>
        </div>
        <div className="position-hero-image">
          <Image src="/images/editorial/france-evening.webp" alt="Paris at blue hour, a city many international students make their new home" fill priority sizes="(max-width:760px) 92vw, 47vw" />
          <span>YOUR NEXT CHAPTER · FRANCE</span>
        </div>
      </section>

      <section className="position-intro wrap">
        <p className="eyebrow">ARRIVAL IS A BEGINNING</p>
        <div><h2>You made it to France.<br/><em>Now let’s make it work for you.</em></h2><p>From the first practical questions to your next career move, get clear guidance shaped by lived experience and local understanding.</p></div>
      </section>

      <section className="position-offers wrap" id="settling-support">
        <div className="position-heading"><div><p className="eyebrow">01 / SETTLE IN FRANCE</p><h2>Real life here.<br/><em>Made easier to navigate.</em></h2></div><Link className="text-link" href="/settle-in-france">Explore all settling support <ArrowUpRight size={17}/></Link></div>
        <div className="position-offer-grid">
          {arrivalOffers.map((offer) => <article className="position-offer" key={offer.number}>
            <span className="position-number">{offer.number}</span><p className="eyebrow">{offer.tag}</p><h3>{offer.title}</h3><p>{offer.text}</p><Link href="/settle-in-france" aria-label={`Explore ${offer.title}`}>Explore this support <ArrowUpRight size={16}/></Link>
          </article>)}
        </div>
        <div className="position-boundary"><Check size={18}/><p>Support means guidance, preparation, checklists and referrals where appropriate. We don’t provide legal or immigration advice, arrange banking or guarantee housing.</p></div>
      </section>

      <section className="position-checklist">
        <div className="wrap position-checklist-inner"><div><p className="eyebrow">A FREE, PRACTICAL RESOURCE</p><h2>Your first 30 days<br/><em>in France, with a plan.</em></h2><p>Use the arrival checklist to keep first steps, documents and useful follow-ups in one place.</p><Link className="button light" href="/first-30-days-france">Get the free checklist <ArrowUpRight size={18}/></Link></div><div className="checklist-preview" aria-label="Checklist preview"><span>FIRST 30 DAYS · FRANCE</span>{["Arrival essentials", "Student setup", "Everyday systems", "Career foundations"].map(x=><p key={x}><Check size={17}/>{x}</p>)}<span>YOUR OWN PACE · YOUR NEXT STEP</span></div></div>
      </section>

      <section className="position-founder wrap">
        <div className="position-founder-image"><Image src="/images/editorial/notre-dame.webp" alt="Notre-Dame and the Seine in Paris" fill sizes="(max-width:760px) 90vw, 38vw"/></div>
        <div><p className="eyebrow">02 / LOCAL EXPERIENCE, PERSONAL SUPPORT</p><h2>Meet Harshita.<br/><em>Your France-based guide.</em></h2><p>I’m Harshita Kohli—France-based career coach and former international student, helping you navigate the realities of life and career in France.</p><p>Bring the question you’re facing. We’ll make a practical plan, agree the scope and fee, and identify your next steps together.</p><div className="position-founder-actions"><Link className="text-link" href="/about">About Harshita <ArrowUpRight size={17}/></Link><Link className="button" href="/book-consultation">Book a Call <ArrowUpRight size={17}/></Link></div></div>
      </section>

      <section className="position-career">
        <div className="wrap position-career-inner"><div><p className="eyebrow">03 / CAREER SUPPORT</p><h2>Build a career<br/><em>that fits France.</em></h2></div><div><p>French-style CV and LinkedIn guidance, internship and alternance preparation, interview practice and a search strategy that reflects your goals.</p><Link className="button light" href="/career-support">Explore career support <ArrowUpRight size={18}/></Link></div></div>
      </section>

      <section className="position-study wrap">
        <div><p className="eyebrow">04 / STUDY IN FRANCE</p><h2>Independent admissions guidance.<br/><em>Practical from the start.</em></h2><p>Explore education pathways and programmes, review your application materials and prepare for the move. Your support does not end when you receive an offer letter.</p></div>
        <div className="position-study-list">{["Programme choices aligned with your goals", "French education pathways & application routes", "CV, SOP and interview preparation", "Pre-departure planning and arrival transition"].map((item)=><p key={item}><Check size={17}/>{item}</p>)}<Link className="text-link" href="/study-in-france">Explore Study in France <ArrowUpRight size={17}/></Link></div>
      </section>

      <section className="position-faq wrap"><div><p className="eyebrow">GOOD TO KNOW</p><h2>Clear support.<br/><em>Honest boundaries.</em></h2><Link className="text-link" href="/faq">All frequently asked questions <ArrowUpRight size={17}/></Link></div><FAQ/></section>
      <section className="position-final"><div className="wrap"><p className="eyebrow">YOU DON’T HAVE TO FIGURE IT ALL OUT ALONE</p><h2>Tell us what’s next.<br/><em>We’ll find a first step.</em></h2><div><Link className="button light" href="/book-consultation">Book a Call <ArrowUpRight size={18}/></Link><a className="position-whatsapp" href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> WhatsApp Harshita</a></div></div></section>
    </main>
    <Footer />
  </>;
}
