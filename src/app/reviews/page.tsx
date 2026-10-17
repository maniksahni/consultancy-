import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Testimonials from "@/components/althea/Testimonials";
import StoryPathFinder, { type ResolvedStoryPath } from "@/components/althea/StoryPathFinder";
import { Section } from "@/components/maison/ui";
import { sampleReviews } from "@/data/reviews";
import { storyPaths } from "@/data/storyPaths";
import { franceChapter } from "@/data/guides/france";

const firstSentence = (text: string) => (text.match(/^.*?[.!?](\s|$)/)?.[0] || text).trim();
const paths: ResolvedStoryPath[] = storyPaths.map((p) => {
  const r = sampleReviews.find((x) => x.id === p.reviewId)!;
  return {
    id: p.id, situation: p.situation, worry: p.worry,
    story: { name: r.name, initials: r.initials, location: r.location, badge: r.badge, topic: r.topic, takeaway: r.takeaway, start: firstSentence(r.quote), detail: r.detail, outcome: r.outcome },
    chapters: p.chapters.map((slug) => { const c = franceChapter(slug)!; return { path: c.path, label: c.label, summary: c.description }; }),
  };
});

export const metadata: Metadata = pageMetadata('/reviews', {
  title: "Student Reviews & Testimonials",
  description:
    `Read authentic reviews and experiences from students admitted to top French universities and Grande Écoles with ${brand.shortName}.`,
});

export default function ReviewsPage() {
  return (
    <Page path="/reviews" eyebrow="STUDENT EXPERIENCES" title="Student reviews" accent="& experiences." intro="Explore real student journeys across admissions, scholarships, visa clearance, and settling into university life in France with Althéa Consulting.">
      <Testimonials full />
      <Section tone="paper" id="your-path" kicker="FIND A STORY LIKE YOURS" title="Which story" accent="sounds like you?" intro="Pick the situation closest to yours. See the student who stood there before you, what made the difference, and the three chapters to read next.">
        <StoryPathFinder paths={paths} />
      </Section>
    </Page>
  );
}
