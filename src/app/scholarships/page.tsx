import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
export const metadata: Metadata = pageMetadata('/scholarships', {
  title: 'France Scholarships for Students',
  description:
    "Use official award information and plan without assuming an award.",
});
export default function Content() {
  return (
    <Page path="/scholarships"
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
        <h2>Check who needs to act.</h2>
        <p>Some awards accept a student application; others require a French institution to nominate the candidate. For the France Excellence Eiffel programme, the institution submits the nomination, so contact its international or scholarship office early and ask for its internal deadline.</p>
        <Link href="/france/scholarships">Explore scholarship guidance ↗</Link>
        <h2>Build a realistic plan</h2>
        <p>
          Record deadlines, required evidence and the awarding organisation.
          Confirm whether the funding covers tuition, living costs or a limited
          contribution.
        </p>
        <h2>Compare the funding with your real costs.</h2>
        <p>Write down what the award covers, how long it lasts, when payments begin, whether renewal depends on academic progress and which expenses remain yours. Confirm whether funding can be combined with other support, and keep a backup plan until the awarding body confirms the result in writing.</p>
        <ul><li>Eligibility: nationality, degree level, subject and academic record.</li><li>Application path: direct application, university nomination or another route.</li><li>Coverage: tuition, living allowance, travel or a limited contribution.</li><li>Timing: student deadline, internal nomination deadline and result date.</li></ul>
        <p>Althéa can help you organise research and questions. Awarding bodies and institutions decide eligibility and funding.</p>
      </div>
    </Page>
  );
}
