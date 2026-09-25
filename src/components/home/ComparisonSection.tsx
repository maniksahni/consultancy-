import EditorialTeaser from "./EditorialTeaser";
import { comparisonCriteria } from "@/data/editorial";

export default function ComparisonSection() {
  return <EditorialTeaser id="comparison" dark eyebrow="The Mentorship Advantage" title="Why Dedicated" accent="Mentorship Matters."
    intro="Compare the day-to-day experience of mass processing and direct mentorship across the existing admissions criteria."
    href="/mentorship-model" linkLabel="See the full mentorship model"
    highlights={comparisonCriteria.slice(0, 3).map((item) => ({ heading: item.factor, detail: item.pathways }))} />;
}
