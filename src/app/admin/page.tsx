import type { Metadata } from "next";
import AdminConsole from "@/components/althea/AdminConsole";
import "../booking.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin · Althéa",
  robots: { index: false, follow: false, nocache: true },
};

/** Private admin for Harshita. Not linked from the site, not indexed, not in the sitemap. */
export default function AdminPage() {
  return (
    <main className="adm-page" id="main-content">
      <AdminConsole />
    </main>
  );
}
