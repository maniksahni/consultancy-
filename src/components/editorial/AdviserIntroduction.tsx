import Link from "@/components/althea/EditorialLink";
import { ArrowUpRight, MoveDown } from "lucide-react";

export default function AdviserIntroduction() {
  return (
    <section className="edition-adviser wrap">
      <div className="adviser-editorial-note">
        <span className="eyebrow">04 / THE PERSON BEHIND THE PLAN</span>
        <span className="editorial-asterisk" aria-hidden="true">
          ✳
        </span>
        <span>PARIS, FRANCE</span>
      </div>
      <div className="edition-adviser-copy">
        <h2>
          A human conversation.
          <br />
          <em>A whole new perspective.</em>
        </h2>
        <p>
          Meet Harshita Kohli, Career Coach & France Expert. Begin with your
          questions, your ambitions, and the details that make your journey
          yours.
        </p>
        <div className="adviser-signoff">
          <span>
            Harshita Kohli<small>CAREER COACH & FRANCE EXPERT</small>
          </span>
          <Link className="text-link" href="/book-consultation">
            Let’s talk <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
