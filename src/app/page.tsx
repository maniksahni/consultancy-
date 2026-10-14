import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = pageMetadata("/", {
  title: "Paris, a New Beginning",
  description: "Bienvenue à Paris. Personal guidance for studying, settling and building your next chapter in France with Harshita Kohli.",
});

export default function Home() {
  return <>
    <Navbar />
    <main id="main-content" className="paris-arrival-home">
      <section className="paris-arrival-hero">
        <Image src="/images/editorial/france-evening.webp" alt="The Eiffel Tower glowing over the Seine at blue hour in Paris" fill priority sizes="100vw" />
        <div className="paris-arrival-shade" />
        <div className="paris-arrival-copy">
          <p className="paris-arrival-kicker">BIENVENUE À PARIS <span>·</span> FRANCE</p>
          <h1>Paris.<br/><em>A new beginning.</em></h1>
          <p>Study, settle and find your way here—with Harshita.</p>
          <Link className="paris-arrival-cta" href="/book-consultation">Your next chapter <ArrowUpRight size={17}/></Link>
        </div>
        <span className="paris-arrival-caption">THE SEINE · PARIS, FRANCE</span>
      </section>
      <nav className="paris-arrival-links" aria-label="Explore France support">
        <Link href="/study-in-france">Study in France <ArrowUpRight size={15}/></Link>
        <Link href="/settle-in-france">Settle in France <ArrowUpRight size={15}/></Link>
        <Link href="/career-support">Career in France <ArrowUpRight size={15}/></Link>
      </nav>
    </main>
    <Footer />
  </>;
}
