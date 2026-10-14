import Link from "next/link";
import { ArrowUpRight, MoveDown } from "lucide-react";
const support = [
  {
    n: "01",
    title: "The possibility",
    accent: "Study.",
    text: "Find the subject, the programme and the place that reflect your ambition.",
    href: "/france/programmes",
    tag: "ACADEMIC DIRECTION & PROGRAMME RESEARCH",
  },
  {
    n: "02",
    title: "The preparation",
    accent: "Settle.",
    text: "Turn big questions into practical next steps, from applications to arrival.",
    href: "/services",
    tag: "APPLICATION SUPPORT & ARRIVAL PLANNING",
  },
  {
    n: "03",
    title: "The bigger picture",
    accent: "Succeed.",
    text: "Think beyond the offer. Build a plan for the life and career you want next.",
    href: "/about",
    tag: "PERSONAL CONVERSATIONS & CAREER DIRECTION",
  },
];

export default function SupportCollection() {
  return (
    <section className="edition-support wrap">
      <div className="edition-section-heading">
        <div>
          <p className="eyebrow">03 / THE ART OF MOVING FORWARD</p>
          <h2>
            Big dreams.
            <br />
            <em>Considered steps.</em>
          </h2>
        </div>
        <p>
          Thoughtful support.
          <br />
          At the turning points that matter.
        </p>
      </div>
      <div className="support-ledger">
        {support.map((s) => (
          <Link href={s.href} key={s.n}>
            <span className="ledger-number">{s.n}</span>
            <div className="ledger-title">
              <span>{s.title}</span>
              <h3>{s.accent}</h3>
            </div>
            <div className="ledger-detail">
              <p>{s.text}</p>
              <span>{s.tag}</span>
            </div>
            <ArrowUpRight size={30} strokeWidth={1.2} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
