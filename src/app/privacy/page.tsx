import type { Metadata } from "next";
import Page from "@/components/althea/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Your information, considered.",
  description:
    "Privacy information for the consultation enquiry and this website.",
};
export default function Content() {
  return (
    <Page
      title={"Your information, considered."}
      intro={
        "Privacy information for the consultation enquiry and this website."
      }
    >
      <div className="prose">
        <h2>What the form collects</h2>
        <p>
          The enquiry asks for your name, email, optional phone, study
          destination, academic background, questions and preferred time. Do not
          send passports, financial documents, health information or other
          sensitive records here.
        </p>
        <h2>Purpose and delivery</h2>
        <p>
          If enquiry delivery is enabled, your details are sent to the
          configured Firebase project to review and respond to your request.
          Submission does not create a confirmed appointment. If delivery is
          unavailable, the form states that your request has not been sent.
        </p>
        <h2>Cookies and local storage</h2>
        <p>
          The active pages do not use marketing analytics, advertising cookies
          or tracking parameters. Fonts and images are served as local website
          assets. Firebase may process connection metadata when a configured
          enquiry is submitted.
        </p>
        <h2>Access and retention</h2>
        <p>
          Proposed database rules deny public reading, updating and deletion of
          enquiries. Access is restricted to authorised project administrators.
          Before enquiry collection is enabled, the owner must approve a
          retention period, deletion procedure and verified privacy contact;
          these are not yet published.
        </p>
        <h2>Your choices</h2>
        <p>
          You may browse without submitting information. Consent applies only to
          responding to your enquiry and does not include marketing. Enquiry
          collection remains disabled until the privacy contact and retention
          policy are configured and approved.
        </p>
        <p className="muted">
          Updated 14 October 2026. This draft disclosure must be approved by the
          service owner before release.
        </p>
      </div>
    </Page>
  );
}
