import type { Metadata } from "next";
import Link from "next/link";
import FeedbackForm from "@/components/althea/FeedbackForm";
import { BrandMark } from "@/components/brand/BrandLockup";

export const metadata: Metadata = {
  title: "Your feedback · Althéa Consulting",
  robots: { index: false, follow: false, nocache: true },
};

/** Opened from the "How was your call?" email. Not indexed, not in the sitemap. */
export default function FeedbackPage() {
  return (
    <main className="ms-page" id="main-content">
      <section className="ms-section ms-tone-ink" style={{ paddingTop: "clamp(28px,5vw,64px)", minHeight: "80vh" }}>
        <div className="ms-wrap fb">
          <Link href="/" className="adm-row" style={{ color: "inherit" }} aria-label="Althéa Consulting home"><BrandMark /><strong>Althéa Consulting</strong></Link>
          <div>
            <p className="ms-kicker">AFTER YOUR CALL</p>
            <h1 className="ms-title" style={{ margin: "8px 0 0" }}>Tell us about <em>your meeting.</em></h1>
          </div>
          <FeedbackForm />
        </div>
      </section>
    </main>
  );
}
