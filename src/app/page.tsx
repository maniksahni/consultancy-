import ServiceNavigation from "@/components/seo/ServiceNavigation";
import PageIdentity from "@/components/seo/PageIdentity";
import { pageMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AltheaExperience from "@/components/home/AltheaExperience";
import "./home-experience.css";
import "./home-future.css";

export const metadata = pageMetadata("/", {
  title: { absolute: "Althéa Consulting | Study in France & Career Guidance" },
  description: "Althéa Consulting offers independent study abroad guidance in France, with practical support for programmes, applications, student life and career planning.",
});

export default function Home() {
  return <div className="althea-home ax-home">
    <PageIdentity path="/" title="Althéa Consulting | Study in France & Career Guidance" description="Independent study guidance, arrival planning and career support in France, led by Harshita Kohli in Paris." />
    <Navbar appearance="dark" />
    <main id="main-content"><AltheaExperience /><ServiceNavigation /></main>
    <Footer />
  </div>;
}
