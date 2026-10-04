import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroExperience from "@/components/home/HeroExperience";
import TrustLedger from "@/components/home/TrustLedger";
import DifferenceGrid from "@/components/home/DifferenceGrid";
import ScrollJourney from "@/components/home/ScrollJourney";
import MentorSpotlight from "@/components/home/MentorSpotlight";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const DestinationGallery = dynamic(() => import("@/components/home/DestinationGallery"));
const OutcomeCases = dynamic(() => import("@/components/home/OutcomeCases"));
const AnimatedFAQ = dynamic(() => import("@/components/home/AnimatedFAQ"));
const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

export const metadata: Metadata = {
  title: "Study with Harshita | Private 1-on-1 Study Abroad Mentorship",
  description:
    "Independent, one-to-one admissions advisory for premier universities in UK, USA, Canada, Germany, Australia, and Ireland. 100% fiduciary guidance with zero agency recruiter kickbacks.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Study with Harshita | Private 1-on-1 Study Abroad Mentorship",
    description:
      "Boutique admissions advisory with zero recruiter kickbacks. Direct 1-on-1 mentorship from profile strategy to consular visa clearance.",
  },
};

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="colourful-site min-h-screen bg-[#0B0A08] text-ink flex flex-col overflow-x-hidden max-w-full w-full focus:outline-none"
    >
      {/* 1. Header / Dynamic Navbar */}
      <Navbar />

      {/* Intro */}
      <HeroExperience />

      {/* Essential proof and guidance */}
      <TrustLedger />
      <DifferenceGrid />
      <DestinationGallery />
      <ScrollJourney />
      <MentorSpotlight />
      <OutcomeCases />
      <AnimatedFAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
