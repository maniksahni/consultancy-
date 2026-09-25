import EditorialTeaser from "./EditorialTeaser";
import { admissionsStages } from "@/data/editorial";

export default function ProcessRoadmap() {
  return <EditorialTeaser id="process" eyebrow="The Admissions Journey" title="A Clearer" accent="Roadmap."
    intro="From profile review through visa preparation, see what each stage involves and what you can prepare."
    href="/admissions-process" linkLabel="See the full admissions process"
    highlights={admissionsStages.slice(0, 3).map((stage) => ({ heading: stage.title, detail: stage.deliverable }))} />;
}
