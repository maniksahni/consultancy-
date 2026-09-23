import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import StudyDestinations from "@/components/home/StudyDestinations";
import ComparisonSection from "@/components/home/ComparisonSection";
import ProcessRoadmap from "@/components/home/ProcessRoadmap";
import BookingSection from "@/components/home/BookingSection";
import StudentOutcomes from "@/components/home/StudentOutcomes";
import Footer from "@/components/layout/Footer";

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

      {/* 7. Verified Student Outcomes */}
      <StudentOutcomes />

      {/* 8. Minimalist Footer */}
      <Footer />
    </main>
  );
}
