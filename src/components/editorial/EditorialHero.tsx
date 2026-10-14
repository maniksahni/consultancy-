import Image from "@/components/althea/EditorialImage";
import Link from "@/components/althea/EditorialLink";
import { ArrowUpRight, MoveDown } from "lucide-react";

export default function EditorialHero() {
  return (
    <section className="edition-hero wrap">
      <div className="edition-topline">
        <span>LA MAISON DU NOUVEAU DÉPART</span>
        <span>PARISIAN AT HEART. GLOBAL IN POSSIBILITY.</span>
        <span>EST. IN AMBITION</span>
      </div>
      <div className="edition-masthead" aria-hidden="true">
        <span>Althéa</span>
        <i>✳</i>
      </div>
      <div className="edition-cover">
        <div className="edition-cover-copy">
          <p className="eyebrow">EDUCATION. POSSIBILITY. A LIFE ABROAD.</p>
          <h1>
            A bigger life.
            <br />
            <em>A world away.</em>
          </h1>
          <p>
            Your next chapter deserves more than a checklist. Personal guidance
            for studying, settling and succeeding abroad.
          </p>
          <Link href="/book-consultation" className="button">
            Start your next chapter{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <a className="cover-explore" href="#the-world">
            THE WORLD IS WAITING <MoveDown size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="edition-cover-art">
          <div className="cover-picture">
            <Image
              src="/images/paris-eiffel.webp"
              alt="The Eiffel Tower in Paris, photographed from Pont Mirabeau"
              fill
              priority
              sizes="(max-width:760px) 90vw, 55vw"
            />
            <span className="cover-image-label">
              01 / A PARISIAN PERSPECTIVE
            </span>
          </div>
          <div className="cover-ticket">
            <span>YOUR NEXT CHAPTER</span>
            <strong>
              Anywhere.
              <br />
              <em>Entirely yours.</em>
            </strong>
            <div>
              <span>
                DEPARTURE
                <br />
                <b>YOUR AMBITION</b>
              </span>
              <ArrowUpRight size={22} />
              <span>
                ARRIVAL
                <br />
                <b>YOUR FUTURE</b>
              </span>
            </div>
          </div>
          <span className="cover-roundel" aria-hidden="true">
            LE MONDE
            <br />
            <i>✦</i>
            <br />
            VOUS ATTEND
          </span>
        </div>
      </div>
      <div className="edition-colophon">
        <span>INDEPENDENT GUIDANCE</span>
        <span>SEVEN DESTINATIONS</span>
        <span>ONE VERY PERSONAL JOURNEY</span>
      </div>
    </section>
  );
}
