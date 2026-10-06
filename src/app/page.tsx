import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home2026 from "@/components/home/Home2026";
import dynamic from "next/dynamic";

const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

export const metadata: Metadata = {
  title: "Study with Harshita | Private Study Abroad Mentorship",
  description:
    "Independent, one-to-one admissions and visa mentorship for students considering the UK, USA, Canada, Germany, Australia and Ireland.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Study with Harshita | Private Study Abroad Mentorship",
    description:
      "One mentor, one connected strategy — from profile direction and university selection to applications and visa preparation.",
  },
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-hidden focus:outline-none">
      <Navbar />
      <Home2026 />
      <FinalCTA />
      <Footer />
    </main>
  );
}
