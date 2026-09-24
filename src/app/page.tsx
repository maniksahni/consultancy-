import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import BookingSection from "@/components/home/BookingSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

const StudyDestinations = dynamic(() => import("@/components/home/StudyDestinations"));
const ComparisonSection = dynamic(() => import("@/components/home/ComparisonSection"));
const ProcessRoadmap = dynamic(() => import("@/components/home/ProcessRoadmap"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const StudentOutcomes = dynamic(() => import("@/components/home/StudentOutcomes"));

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-cream text-ink flex flex-col overflow-x-hidden max-w-full w-full focus:outline-none">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Direct Consultation Booking (First Scroll) */}
      <BookingSection />

      {/* 4. Curated Global Study Hubs */}
      <StudyDestinations />

      {/* 5. Why Choose Dedicated 1-on-1 Mentorship */}
      <ComparisonSection />

      {/* 6. The 4-Stage Mentorship Journey */}
      <ProcessRoadmap />

      {/* 7. Frequently Addressed Questions */}
      <FAQ />

      {/* 8. Verified Student Outcomes */}
      <StudentOutcomes />

      {/* 9. Minimalist Footer */}
      <Footer />
    </main>
  );
}
