import Page from "@/components/althea/Page";
import ProgrammeResearchFinder from "@/components/althea/ProgrammeResearchFinder";
import Link from "@/components/althea/EditorialLink";
export const metadata = {
  alternates: { canonical: "/programmes" },
  title: "Programme fees & application deadlines",
  description:
    "University-published fees and application dates for a researched collection across seven countries, with applicant categories, academic years and official evidence.",
};
export default function Programmes() {
  return (
    <Page
      eyebrow="THE UNIVERSITY RESEARCH DESK"
      title="Real programmes. Published details."
      intro="Compare university-published tuition and application dates. Every amount carries its currency, fee category and year; every deadline carries the applicable round."
    >
      <div className="research-intro">
        <p>
          20 researched programme records across seven countries. Published
          numbers are reproduced with their conditions. Current fee tariffs and
          future entry dates are kept separate; closed rounds, recurring windows
          and conflicting pages are marked.
        </p>
        <Link className="text-link" href="/knowledge#budget">
          Build a full study budget ↗
        </Link>
      </div>
      <ProgrammeResearchFinder />
    </Page>
  );
}
