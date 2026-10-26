import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import Page from "@/components/althea/Page";
import { Card, Checklist, Grid, Notice, Section, Steps, TextLink } from "@/components/maison/ui";
import { Mail, MessageCircle, ShieldAlert } from "lucide-react";
import { quickAnswers } from "@/data/quickAnswers";

export const metadata = pageMetadata("/partnerships", {
  title: "Partner with Althéa Consulting",
  description: "Partnerships with Althéa Consulting in Paris: universities, schools, employers, housing and student-service providers working with Indian students in France.",
});

/**
 * The only place on the site that shows Harshita's WhatsApp number, and only for partnership proposals.
 * Students are sent to the booking page instead.
 */
const partnershipWhatsApp = { digits: "33755749029", display: "+33 7 55 74 90 29" };
const partnershipWhatsAppUrl = `https://wa.me/${partnershipWhatsApp.digits}?text=${encodeURIComponent("Bonjour Althéa, I would like to discuss a partnership.\nOrganisation:\nWebsite:\nProposal in one line:")}`;
const partnershipEmailUrl = `mailto:${brand.email}?subject=${encodeURIComponent("Partnership proposal · [your organisation]")}&body=${encodeURIComponent("Organisation:\nWebsite:\nYour name and role:\nWhat you propose:\nWho it serves:\nTimeline:\n")}`;

const partners = [
  { kicker: "HIGHER EDUCATION", title: "Universities and grandes écoles", items: ["Information sessions and webinars for Indian applicants", "Campus visits and admissions conversations in Paris", "Clear programme, fee and intake information for students"] },
  { kicker: "CAREERS", title: "Employers and recruiters", items: ["Internship (stage) and alternance openings for international students", "Graduate roles that match French work-permit rules", "Career events and CV workshops"] },
  { kicker: "STUDENT LIFE", title: "Housing and student services", items: ["Student residences, colocation and guarantor services", "Banks, insurance and mobile plans for new arrivals", "Relocation and orientation services in French cities"] },
  { kicker: "INDIA", title: "Schools, colleges and counsellors in India", items: ["Sessions on studying in France for students and parents", "Referral partnerships with clear, written terms", "Joint guidance for applicants and their families"] },
  { kicker: "COMMUNITY", title: "Creators and student communities", items: ["Content on studying, living and working in France", "Co-hosted live sessions with Indian students in France", "Alumni and association collaborations"] },
  { kicker: "LANGUAGE AND TESTING", title: "French and English training", items: ["DELF, TCF and IELTS preparation for applicants", "Business French for interns and graduates", "Student offers agreed in writing"] },
];

const process = [
  { title: "Send a short proposal", meta: "Email or WhatsApp", body: "Your organisation, website, your name and role, what you propose and who it serves. One page is enough." },
  { title: "We review it", meta: "Every proposal is read", body: "Harshita reads every proposal and checks that it fits Althéa’s students and standards." },
  { title: "An introductory call", meta: "If there is a fit", body: "We agree goals, scope and how success will be measured before anything is announced." },
  { title: "Written terms, then launch", meta: "Before any work begins", body: "Scope, responsibilities, any fees or commissions and how students are informed are agreed in writing." },
];

export default function PartnershipsPage() {
  return <Page path="/partnerships" faqs={quickAnswers["/partnerships"]} eyebrow="PARTNERSHIPS · PARIS ⇄ INDIA" title="Partner with" accent="Althéa Consulting."
    intro="Althéa works with universities, employers, housing and student-service providers that make studying, living and working in France better for Indian students. If that is you, we would like to hear your proposal."
    headerActions={<><a href="#who">Who we partner with</a><a href="#how">How it works</a><a href="#contact">Contact</a></>}
    closing={false}>
    <Section tone="ivory">
      <Notice kicker={<span className="ms-partner-warning-kicker"><ShieldAlert size={14} aria-hidden="true" />PARTNERSHIP ENQUIRIES ONLY</span>} tone="ink">
        <p className="ms-notice-title">This channel is reserved <em>for partnership proposals.</em></p>
        {/* Always shown in full: the phone "Read more" fold skips paragraphs marked open. */}
        <p data-readmore="open">The contact details on this page exist solely for organisations proposing a formal collaboration with Althéa Consulting. Student questions, admission or visa queries, consultation bookings, job applications, payment requests and unsolicited sales messages sent through these channels will not be read or answered, and will not be forwarded.</p>
        <p data-readmore="open">If you are a student or a parent, please <TextLink href="/book-consultation">book a free 15-minute call</TextLink> instead.</p>
      </Notice>
    </Section>

    <Section id="who" tone="paper" kicker="WHO WE PARTNER WITH" title="Organisations that make France" accent="work for students." intro="Every partnership should leave a student better informed, better prepared or better supported.">
      <Grid cols={3}>{partners.map((p, i) => <Card key={p.title} index={i + 1} kicker={p.kicker} title={p.title}><Checklist items={p.items} /></Card>)}</Grid>
    </Section>

    <Section tone="ivory" kicker="WHAT WE LOOK FOR" title="Students first," accent="always." align="split" intro="We only take on partnerships that we would be comfortable explaining to a student and their parents.">
      <Checklist items={[
        "A real, verifiable organisation with a clear offer for international students",
        "Accurate information: fees, deadlines and conditions stated honestly",
        "Terms agreed in writing before anything is promoted",
        "Respect for students’ data and their right to choose freely",
        "No guarantees of admission, visas or jobs, which only universities, authorities and employers can give",
      ]} />
    </Section>

    <Section id="how" tone="paper" kicker="HOW IT WORKS" title="From proposal" accent="to partnership." align="split">
      <Steps items={process} />
    </Section>

    <Section id="contact" tone="ivory" kicker="CONTACT · PARTNERSHIPS ONLY" title="Send your" accent="proposal." intro="Please include your organisation, website, your name and role, and the partnership you have in mind.">
      <div className="ms-partner-contacts">
        <Card kicker="EMAIL" title={brand.email} href={partnershipEmailUrl} cta="Email a proposal" icon={<Mail size={20} aria-hidden="true" />}>
          <p>Best for detailed proposals and attachments. Use the subject line “Partnership proposal”.</p>
        </Card>
        <Card kicker="WHATSAPP · PARTNERSHIPS ONLY" title={partnershipWhatsApp.display} href={partnershipWhatsAppUrl} cta="Message about a partnership" icon={<MessageCircle size={20} aria-hidden="true" />}>
          <p>For a first introduction from organisations. Messages that are not about a partnership will not be answered.</p>
        </Card>
      </div>
      <p className="ms-partner-fineprint">By contacting Althéa about a partnership you agree that your message is used only to assess and discuss that proposal. Althéa Consulting is an independent advisory based in Paris; a conversation does not create any commitment until terms are signed by both parties.</p>
    </Section>
  </Page>;
}
