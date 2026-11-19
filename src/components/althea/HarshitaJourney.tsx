import { existsSync } from "node:fs";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { waMessages } from "@/config/contact";

/** Harshita's own photos from her life in France (not stock), each paired with what it means for a student. */
export const moments = [
  { file: "harshita-eiffel", tag: "Paris", title: "Where it started", alt: "Harshita Kohli smiling with her arms open in front of the Eiffel Tower", body: "I came to France as an international student, with the same questions you have today.", you: "Plan your studies", href: "/study-in-france" },
  { file: "harshita-home", tag: "Settling in", title: "A place to call home", alt: "Harshita Kohli outside her apartment building in France", body: "Finding a flat, the bank, the CAF file and the residence permit. I went through every step myself.", you: "Settle in France", href: "/settle-in-france" },
  { file: "harshita-graduation", tag: "Graduation", title: "A French degree", alt: "Harshita Kohli in a black dress on her graduation evening", body: "Graduating here is what opens the door to working here.", you: "Find your course", href: "/universities" },
  { file: "harshita-first-cdi", tag: "First CDI", title: "First day, first permanent job", alt: "Harshita Kohli in a houndstooth jacket on the first day of her first CDI", body: "From student to a CDI, the permanent contract in France. That path is real, and it is what our job support is built on.", you: "Jobs & internships", href: "/jobs" },
  { file: "harshita-olympics", tag: "Paris 2024", title: "India House at the Olympics", alt: "Harshita Kohli at India House presented by Reliance Foundation during the Paris 2024 Olympics", body: "Living in Paris means being part of moments like these, and meeting the people who make them happen.", you: "Life after you land", href: "/in-france" },
  { file: "harshita-rakhi", tag: "Rakhi in Paris", title: "Home comes with you", alt: "Harshita Kohli holding a Rakhi thali with diyas in her home in Paris", body: "Rakhi, Diwali, Holi: the festivals travel with you, and so does the Indian community here.", you: "Your first 30 days", href: "/first-30-days-france" },
  { file: "harshita-holi", tag: "Holi", title: "Colours, far from home", alt: "Harshita Kohli laughing with Holi colours on her face", body: "Far from home does not mean alone. You will find your people.", you: "Read student stories", href: "/reviews" },
  { file: "harshita-riviera", tag: "South of France", title: "Weekends on the Riviera", alt: "Harshita Kohli smiling on the rocks by a beach in the south of France", body: "The sea is a train ride away. Student life here is more than lectures.", you: "Life in Nice", href: "/cities/nice" },
  { file: "harshita-red-sand", tag: "Red sand in France", title: "France beyond Paris", alt: "Harshita Kohli walking across red sand hills in France", body: "Landscapes you would never expect. Studying here is also a chance to see all of it.", you: "Compare cities and costs", href: "/knowledge#budget" },
  { file: "harshita-cuisine", tag: "French cuisine", title: "Learning to live like a local", alt: "A French restaurant dish of crumbed fish on black sauce with potatoes", body: "Markets, menus and the language that comes with them. A little French goes a long way.", you: "Learn French", href: "/learn-french" },
] as const;

export const harshitaPhoto = (file: string) => `/images/paris/${file}.webp`;
const available = moments.filter((m) => existsSync(`public/images/paris/${m.file}.webp`));

export default function HarshitaJourney() {
  if (!available.length) return null;
  return <section className="hj" aria-labelledby="hj-title">
    <div className="ms-wrap">
      <div className="hj-head">
        <div>
          <p className="ms-kicker">REAL PHOTOS · NOT STOCK</p>
          <h2 id="hj-title">My France, so far. <em>Yours can look like this.</em></h2>
        </div>
        <p>These are my own photos. Studying, graduating, a first permanent job, festivals far from home and weekends away. Everything here, you can do too, and I’ll show you the way.</p>
      </div>
      <ol className="hj-grid">{available.map((m) => <li key={m.file} className="hj-card">
        <figure>
          <div className="hj-photo"><Image src={harshitaPhoto(m.file)} alt={m.alt} fill sizes="(max-width:640px) 92vw, (max-width:1100px) 46vw, 31vw" /></div>
          <figcaption>
            <span className="hj-tag">{m.tag}</span>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
            <Link href={m.href} className="hj-you">You can too: {m.you}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </figcaption>
        </figure>
      </li>)}</ol>
      <div className="hj-cta">
        <p><strong>Want this to be your story?</strong> Tell me where you are today and where you want to be.</p>
        <WhatsAppButton text={waMessages.general} label="WhatsApp Harshita" />
      </div>
    </div>
  </section>;
}
