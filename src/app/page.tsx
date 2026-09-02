import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import EligibilityForm from "@/components/forms/EligibilityForm";
import DestinationsGrid from "@/components/home/DestinationsGrid";
import Services from "@/components/home/Services";
import ProcessRoadmap from "@/components/home/ProcessRoadmap";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero & Key Statistics Banner */}
      <Hero />

      {/* 3. High-Converting Multi-Step Profile Eligibility Form */}
      <EligibilityForm />

      {/* 4. Top Study Destinations (UK, USA, Canada, Australia, Germany, Ireland) */}
      <DestinationsGrid />

      {/* 5. Core Consultancy Services Grid */}
      <Services />

      {/* 6. Step-by-Step Admission & Visa Process Roadmap */}
      <ProcessRoadmap />

      {/* 7. Student Visa Success Stories & Social Proof */}
      <Testimonials />

      {/* 8. Comprehensive Multi-Column Footer */}
      <Footer />

      {/* 9. Floating WhatsApp Quick Connect Button */}
      <FloatingWhatsApp />
    </main>
  );
}
