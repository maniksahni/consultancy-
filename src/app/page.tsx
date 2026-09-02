import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import EligibilityForm from "@/components/forms/EligibilityForm";
import DestinationsGrid from "@/components/home/DestinationsGrid";
import CostEstimator from "@/components/interactive/CostEstimator";
import Services from "@/components/home/Services";
import ProcessRoadmap from "@/components/home/ProcessRoadmap";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero & Key Statistics Banner */}
      <Hero />

      {/* 3. Global University Partners Marquee (Trust & Credibility) */}
      <PartnersMarquee />

      {/* 4. High-Converting Multi-Step Profile Eligibility Form */}
      <EligibilityForm />

      {/* 5. Top Study Destinations (UK, USA, Canada, Australia, Germany, Ireland) */}
      <DestinationsGrid />

      {/* 6. Interactive Study Cost & Budget Estimator */}
      <CostEstimator />

      {/* 7. Core Consultancy Services Grid */}
      <Services />

      {/* 8. Step-by-Step Admission & Visa Process Roadmap */}
      <ProcessRoadmap />

      {/* 9. Expert Counsellors & Admissions Mentors */}
      <Team />

      {/* 10. Student Visa Success Stories & Social Proof */}
      <Testimonials />

      {/* 11. Dedicated FAQ Accordion */}
      <FAQ />

      {/* 12. Comprehensive Multi-Column Footer */}
      <Footer />

      {/* 13. Floating WhatsApp Quick Connect Button */}
      <FloatingWhatsApp />
    </main>
  );
}
