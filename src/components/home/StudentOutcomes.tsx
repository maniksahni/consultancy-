import EditorialTeaser from "./EditorialTeaser";
import { studentOutcomes } from "@/data/editorial";

export default function StudentOutcomes() {
  return <EditorialTeaser id="outcomes" eyebrow="Documented Admissions Records" title="Student" accent="Outcomes."
    intro="Explore the existing initials-only case files and the profile details recorded alongside each outcome."
    href="/outcomes" linkLabel="See all student outcomes"
    highlights={studentOutcomes.slice(0, 3).map((item) => ({ heading: `Candidate ${item.initials}`, detail: `${item.university} · ${item.outcome}` }))} />;
}
