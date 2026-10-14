import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Testimonials from "@/components/althea/Testimonials";
export const metadata: Metadata = pageMetadata('/reviews', {
  title: "The review collection",
  description:
    `Explore the ${brand.shortName} review collection design. Current examples are clearly labelled illustrative samples.`,
});
export default function ReviewsPage() {
  return (
    <Page
      eyebrow="LES VOIX DU VOYAGE"
      title="A journey worth sharing."
      intro="Explore the kind of support across arrival, career and admissions. Each stage is clearly marked; examples are illustrative until client-approved reviews are available."
    >
      <div className="review-page-note">
        <p className="eyebrow">ABOUT THIS COLLECTION</p>
        <p>
          These are sample reviews created to demonstrate the layout. Genuine
          client reviews, names and outcomes will appear here only when supplied
          and approved for publication.
        </p>
      </div>
      <Testimonials full />
    </Page>
  );
}
