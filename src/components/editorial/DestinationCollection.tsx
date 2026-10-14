import Link from "@/components/althea/EditorialLink";
import { ArrowUpRight, MoveDown } from "lucide-react";
import DestinationAtlas from "@/components/althea/DestinationAtlas";

export default function DestinationCollection() {
  return (
    <section className="edition-world" id="the-world">
      <div className="wrap">
        <div className="edition-section-heading">
          <div>
            <p className="eyebrow">02 / THE DESTINATION COLLECTION</p>
            <h2>
              Different places.
              <br />
              <em>Extraordinary possibilities.</em>
            </h2>
          </div>
          <Link className="text-link" href="/destinations">
            Open the destination atlas <ArrowUpRight size={16} />
          </Link>
        </div>
        <DestinationAtlas compact />
      </div>
    </section>
  );
}
