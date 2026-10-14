import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = pageMetadata("/", {
  title: "Study in France with Personal Guidance",
  description: "Personal guidance for studying, settling and building a career in France. Explore programmes, applications and student life with Harshita Kohli.",
});

export default function Home() {
  return <>
    <Navbar />
    <main id="main-content" className="paris-arrival-home">
      <section className="paris-arrival-hero">
        <Image src="/images/editorial/france-evening-20261014.webp" alt="The Eiffel Tower glowing over the Seine at blue hour in Paris" fill priority sizes="100vw" />
        <div className="paris-arrival-shade" />
        <div className="paris-arrival-copy">
          <p className="paris-arrival-kicker">BIENVENUE À PARIS <span>·</span> FRANCE</p>
          <h1>Study in<br/><em>France.</em></h1>
          <p>Independent guidance for studying, settling and building a career in France—with Paris-based adviser Harshita Kohli.</p>
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
