import Navbar from "@/components/layout/Navbar";
import PersonalHero from "@/components/home/PersonalHero";
import AboutMentor from "@/components/home/AboutMentor";
import MentorDestinations from "@/components/home/MentorDestinations";
import MentorshipProcess from "@/components/home/MentorshipProcess";
import BookingSection from "@/components/home/BookingSection";
import StudentReviews from "@/components/home/StudentReviews";
import PersonalFooter from "@/components/layout/PersonalFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-white flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* 1. Personal Header & Navigation */}
      <Navbar />

      {/* 2. Personal Hero Section with 1-on-1 Mentor Value Proposition & Photo Showcase */}
      <PersonalHero />

      {/* 3. Meet Your Mentor — Bio, Philosophy & Mass Agency Comparison */}
      <AboutMentor />

      {/* 4. Target Destinations (6 Sleek Glassmorphic Cards) */}
      <MentorDestinations />

      {/* 5. How She Works With Students (The 4-Step Journey) */}
      <MentorshipProcess />

      {/* 6. Direct Appointment & Consultation Booking Form */}
      <BookingSection />

      {/* 7. Student Reviews & Genuine Thanks (WhatsApp Chat Cards) */}
      <StudentReviews />

      {/* 8. Personal Footer with Direct Contact & Anti-Agency Transparency */}
      <PersonalFooter />
    </main>
  );
}
