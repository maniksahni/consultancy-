import Link from "@/components/althea/EditorialLink";
import { ArrowUpRight, MoveDown } from "lucide-react";

export default function MaisonPerspective() {
  return (
    <section className="edition-manifesto wrap" id="bienvenue">
      <p className="eyebrow">01 / THE ALTHÉA PERSPECTIVE</p>
      <div>
        <h2>
          You’re not just choosing
          <br />a university.
          <br />
          <em>You’re choosing a life.</em>
        </h2>
        <div className="manifesto-bottom">
          <p>
            A subject that excites you. A city that feels like possibility. A
            future you can see yourself in. We connect the academic choices with
            the human ones.
          </p>
          <Link
            href="/about"
            className="circle-link"
            aria-label="Get to know Althéa"
          >
            <ArrowUpRight size={30} />
            <span>MEET THE MAISON</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
