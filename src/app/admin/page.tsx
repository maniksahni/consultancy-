import type { Metadata } from "next";
import Link from "next/link";
import AdminConsole from "@/components/althea/AdminConsole";
import { BrandMark } from "@/components/brand/BrandLockup";
import "../booking.css";

export const metadata: Metadata = {
  title: "Admin · Althéa bookings",
  robots: { index: false, follow: false, nocache: true },
};

/** Private bookings admin for Harshita. Not linked from the site, not indexed, not in the sitemap. */
export default function AdminPage() {
  return (
    <main className="ms-page" id="main-content">
      <section className="ms-section ms-tone-ink" style={{ paddingTop: "clamp(28px,5vw,64px)" }}>
        <div className="ms-wrap adm">
          <Link href="/" className="adm-row" style={{ color: "inherit" }} aria-label="Althéa Consulting home"><BrandMark /><strong>Althéa Consulting</strong></Link>
          <div>
            <p className="ms-kicker">CONSULTATIONS</p>
            <h1 className="ms-title" style={{ margin: "8px 0 0" }}>Your bookings, <em>at a glance.</em></h1>
          </div>
          <AdminConsole />
        </div>
      </section>
    </main>
  );
}
