import ServiceNavigation from "@/components/seo/ServiceNavigation";
import PageIdentity from "@/components/seo/PageIdentity";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AltheaExperience from "@/components/home/AltheaExperience";
import "./home-experience.css";
import "./home-future.css";

export const metadata = pageMetadata("/", {
  title: { absolute: "Althéa Consulting | Study in France Consultant, Paris" },
  description: "Study in France consultant in Paris: Harshita Kohli guides Indian students on universities, Campus France, student visa, housing and jobs in France.",
});

export default function Home() {
  return <div className="althea-home ax-home">
    <PageIdentity path="/" title="Althéa Consulting | Study in France Consultant, Paris" description="Study in France consultant in Paris: Harshita Kohli guides Indian students on universities, Campus France, student visa, housing and jobs in France." />
    <Navbar appearance="dark" />
    <main id="main-content"><AltheaExperience /><ServiceNavigation /></main>
    <Footer />
  </div>;
}
