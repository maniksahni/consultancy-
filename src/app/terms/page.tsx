import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";

export const metadata: Metadata = pageMetadata('/terms', {
  title: "Terms of Use",
  description: "General website information and consultation enquiry terms.",
});
export default function Content() {
  return (
    <Page path="/terms"
      title={"Clear expectations."}
      intro={"General website information and consultation enquiry terms."}
    >
      <div className="prose">
        <h2>Independent advisory</h2>
        <p>
          This website provides general education information and enquiry
          facilities. It is not an official application service or legal advice.
          University admissions, scholarships and visas are decided by the
          responsible organisations.
        </p>
        <h2>Information changes</h2>
        <p>
          Check the linked official sources before acting. Programme details,
          fees, requirements and deadlines may change. Dates shown in the finder
          describe the scope of the recorded review, not a guarantee of current
          availability.
        </p>
        <h2>Consultations and services</h2>
        <p>
          An enquiry is a request to discuss your plans. Availability, service
          scope, fees, cancellation terms and deliverables must be agreed
          separately before a paid service begins. There are no guaranteed
          outcomes.
        </p>
        <h2>Owner approval</h2>
        <p>
          The legal service identity, jurisdiction and full commercial terms
          require owner confirmation before public release or accepting
          payments. This website does not accept payments.
        </p>
      </div>
    </Page>
  );
}
