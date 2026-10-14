import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChapterConcierge from "@/components/althea/ChapterConcierge";
import Testimonials from "@/components/althea/Testimonials";
import EditorialHero from "@/components/editorial/EditorialHero";
import MaisonPerspective from "@/components/editorial/MaisonPerspective";
import DestinationCollection from "@/components/editorial/DestinationCollection";
import SupportCollection from "@/components/editorial/SupportCollection";
import ParisChapter from "@/components/editorial/ParisChapter";
import AdviserIntroduction from "@/components/editorial/AdviserIntroduction";
import ReadingRoom from "@/components/editorial/ReadingRoom";
import HomepageFAQ from "@/components/editorial/HomepageFAQ";
import ClosingInvitation from "@/components/editorial/ClosingInvitation";
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="edition-home">
        <EditorialHero />
        <MaisonPerspective />
        <DestinationCollection />
        <SupportCollection />
        <ParisChapter />
        <AdviserIntroduction />
        <ChapterConcierge />
        <Testimonials />
        <ReadingRoom />
        <HomepageFAQ />
        <ClosingInvitation />
      </main>
      <Footer />
    </>
  );
}

export const metadata = { alternates: { canonical: "/" } };
