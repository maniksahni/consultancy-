import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroExperience from "@/components/home/HeroExperience";
import TrustLedger from "@/components/home/TrustLedger";
import DifferenceGrid from "@/components/home/DifferenceGrid";
import DestinationGallery from "@/components/home/DestinationGallery";
import ScrollJourney from "@/components/home/ScrollJourney";
import MentorSpotlight from "@/components/home/MentorSpotlight";
import OutcomeCases from "@/components/home/OutcomeCases";
import AnimatedFAQ from "@/components/home/AnimatedFAQ";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pathways Global | Private 1-on-1 Study Abroad Mentorship",
  description:
    "Independent, one-to-one admissions advisory for premier universities in UK, USA, Canada, Germany, Australia, and Ireland. 100% fiduciary guidance with zero agency recruiter kickbacks.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Pathways Global | Private 1-on-1 Study Abroad Mentorship",
    description:
      "Boutique admissions advisory with zero recruiter kickbacks. Direct 1-on-1 mentorship from profile strategy to consular visa clearance.",
  },
};

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#0B0A08] text-ink flex flex-col overflow-x-hidden max-w-full w-full focus:outline-none"
    >
      {/* 1. Header / Dynamic Navbar */}
      <Navbar />

      {/* 2. Section 1 — Hero: Cinematic Full-Screen Experience (Dark: #0B0A08) */}
      <HeroExperience />

      {/* 3. Section 2 — Trust Ledger: Glowing Counter Strip (Warm White: #FAF7F2) */}
      <TrustLedger />

      {/* 4. Section 3 — Why Pathways: Asymmetric Glowing Cards (Cream: #F2EDE4) */}
      <DifferenceGrid />

      {/* 5. Section 4 — Destination Gallery: Premium Motion Grid (Warm White: #FAF7F2) */}
      <DestinationGallery />

      {/* 6. Section 5 — Scroll Story Process: Glowing Center Timeline (Dark: #0B0A08) */}
      <ScrollJourney />

      {/* 7. Section 6 — Mentor Feature: Image + Glow Frame (Warm White: #FAF7F2) */}
      <MentorSpotlight />

      {/* 8. Section 7 — Outcome Case Files: Motion Panels (Dark: #0B0A08) */}
      <OutcomeCases />

      {/* 9. Section 8 — FAQ: Motion Accordion (Warm White: #FAF7F2) */}
      <AnimatedFAQ />

      {/* 10. Section 9 — Final CTA: Cinematic Radial Glow & Booking (Dark: #0B0A08) */}
      <FinalCTA />

      {/* 11. Architectural Footer (Dark: #14120C) */}
      <Footer />
    </main>
  );
}
