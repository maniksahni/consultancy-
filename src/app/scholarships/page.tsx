import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { official } from "@/data/france";
export const metadata: Metadata = {
  title: "Research your funding.",
  description:
    "Use official award information and plan without assuming an award.",
};
export default function Content() {
  return (
    <Page
      title={"Research your funding."}
      intro={
        "Use official award information and plan without assuming an award."
      }
    >
      <div className="prose">
        <h2>Start with eligibility</h2>
        <p>
          Scholarships have their own eligibility criteria and application
          calendars. Check your nationality, chosen degree, academic background
          and whether an institution must nominate you.
        </p>
        <a href={official.scholarships}>
          Campus France scholarship resources ↗
        </a>
        <h2>Build a realistic plan</h2>
        <p>
          Record deadlines, required evidence and the awarding organisation.
          Confirm whether the funding covers tuition, living costs or a limited
          contribution.
        </p>
      </div>
    </Page>
  );
}
