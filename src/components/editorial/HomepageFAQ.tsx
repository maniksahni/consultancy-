import Link from "next/link";
import FAQ from "@/components/althea/FAQ";

export default function HomepageFAQ() {
  return (
    <section className="wrap section faq-section">
      <div>
        <p className="eyebrow">06 / BEFORE YOU BEGIN</p>
        <h2>
          Good questions.
          <br />
          <em>Clearer beginnings.</em>
        </h2>
        <Link className="text-link" href="/faq">
          More answers ↗
        </Link>
      </div>
      <FAQ />
    </section>
  );
}
