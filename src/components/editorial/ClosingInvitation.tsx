import Link from "@/components/althea/EditorialLink";
import { ArrowUpRight, MoveDown } from "lucide-react";

export default function ClosingInvitation() {
  return (
    <section className="edition-finale">
      <div className="wrap">
        <p className="eyebrow">EVERY GREAT JOURNEY BEGINS SOMEWHERE.</p>
        <h2>
          Make the
          <br />
          <em>first move.</em>
        </h2>
        <div>
          <p>
            Your world is waiting.
            <br />
            Let’s find your way into it.
          </p>
          <Link className="button" href="/book-consultation">
            Begin with a conversation <ArrowUpRight size={18} />
          </Link>
        </div>
        <span className="finale-flower" aria-hidden="true">
          ✳
        </span>
      </div>
    </section>
  );
}
