import Image from "@/components/althea/EditorialImage";
import Link from "next/link";
import { ArrowUpRight, MoveDown } from "lucide-react";

export default function ParisChapter() {
  return (
    <section className="edition-interlude">
      <Image
        src="/images/paris-street.webp"
        alt="Evening light over the Seine and the architecture of Paris"
        fill
        sizes="100vw"
      />
      <div className="interlude-shade" />
      <div className="wrap">
        <span className="eyebrow">ROOTED IN FRANCE. OPEN TO THE WORLD.</span>
        <h2>
          A Parisian heart.
          <br />
          <em>A boundless ambition.</em>
        </h2>
        <Link href="/study-in-france">
          DISCOVER OUR FRENCH CHAPTER <ArrowUpRight size={22} />
        </Link>
      </div>
      <span className="interlude-coordinate">48°51′ N · 2°21′ E</span>
    </section>
  );
}
