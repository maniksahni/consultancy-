import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Testimonials from "@/components/althea/Testimonials";
export const metadata: Metadata = {
  title: "The review collection",
  description:
    "Explore the Althéa review collection design. Current examples are clearly labelled illustrative samples.",
};
export default function ReviewsPage() {
  return (
    <Page
      eyebrow="LES VOIX DU VOYAGE"
      title="A journey worth sharing."
      intro="The moments that matter: finding clarity, feeling heard, and knowing your next step."
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
