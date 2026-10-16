import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
export const metadata: Metadata = pageMetadata('/privacy', { title: "Privacy Policy", description: "Privacy information for the consultation enquiry and this website." });
export default function Content() {
  return <Page path="/privacy" title="Your information, considered." intro="Privacy information for the consultation enquiry and this website."><div className="prose">
    <h2>Your consultation details</h2><p>The form asks for your name and what you would like to explore. Phone number, academic background and preferred time are optional; you may also choose a study destination.</p>
    <h2>Opening WhatsApp</h2><p>Submitting opens WhatsApp with your details ready to send. You must press Send in WhatsApp to share the message with the adviser. Opening WhatsApp does not confirm an appointment. WhatsApp receives the prefilled details in its URL and applies its own privacy policy.</p>
    <h2>Website storage</h2><p>The website does not store or log consultation details, write them to a database, or add them to a marketing list. Form values stay in the current page until you navigate away. Your browser or WhatsApp may retain the opened URL.</p>
    <h2>Your choices</h2><p>You can browse without completing the form. Leave optional fields blank and review or edit your message in WhatsApp before pressing Send.</p>
    <p className="muted">Updated 14 October 2026.</p>
  </div></Page>;
}
