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
    <main className="min-h-screen bg-[#070A11] text-stone-100 flex flex-col selection:bg-[#C5A880]/25 selection:text-white overflow-x-hidden max-w-full w-full">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Curated Global Study Hubs */}
      <StudyDestinations />

      {/* 4. Why Choose Dedicated 1-on-1 Mentorship */}
      <ComparisonSection />

      {/* 5. The 4-Stage Mentorship Journey */}
      <ProcessRoadmap />

      {/* 6. Direct Consultation Booking */}
      <BookingSection />

      {/* 7. Verified Student Outcomes */}
      <StudentOutcomes />

      {/* 8. Minimalist Footer */}
      <Footer />
    </main>
  );
}
