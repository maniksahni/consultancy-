import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Testimonials from "@/components/althea/Testimonials";

export const metadata: Metadata = pageMetadata('/reviews', {
  title: "Student Reviews & Testimonials",
  description:
    `Read authentic reviews and experiences from students admitted to top French universities and Grande Écoles with ${brand.shortName}.`,
});

export default function ReviewsPage() {
  return (
    <div className="review-page">
      <Page
        eyebrow="STUDENT EXPERIENCES"
        title="A journey worth sharing."
        intro="Explore real student journeys across admissions, scholarships, visa clearance, and settling into university life in France with Althéa Consulting."
        image="/images/editorial/france-campus.webp"
      >
        <Testimonials full />
      </Page>
    </div>
  );
}
