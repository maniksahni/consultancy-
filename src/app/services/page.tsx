import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  FilePenLine,
  Route,
  GraduationCap,
  Luggage,
} from "lucide-react";
import Page from "@/components/althea/Page";
export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Support, thoughtfully scoped.",
  description:
    "Explore personal academic guidance, programme research, application review and arrival planning with Althéa.",
};
const services = [
  {
    title: "Academic direction",
    note: "START WITH THE PERSON",
    text: "Explore your academic background, subject interests and the constraints that matter. Begin with a clearer sense of what you’re looking for.",
    icon: Compass,
    detail: "Your background · Your interests · Your priorities",
  },
  {
    title: "Programme research",
    note: "GIVE YOUR CHOICES A REASON",
    text: "Compare official course information, teaching languages and prerequisites. Create a reasoned shortlist around your ambitions.",
    icon: BookOpen,
    detail: "Course content · Eligibility · A considered shortlist",
  },
  {
    title: "Application review",
    note: "YOUR STORY, THOUGHTFULLY TOLD",
    text: "Discuss feedback on your CV and written materials. Find ways to express your experience clearly while keeping the work truthful and your own.",
    icon: FilePenLine,
    detail: "CV feedback · Written materials · Document planning",
  },
  {
    title: "Process orientation",
    note: "MAKE SENSE OF THE NEXT STEP",
    text: "Understand where to find official university and Campus France instructions, and how to check the procedure that applies to you.",
    icon: Route,
    detail: "Official resources · Application routes · Preparation",
  },
  {
    title: "Funding research",
    note: "PLAN WITH YOUR BUDGET IN MIND",
    text: "Explore official scholarship resources and the eligibility conditions. Consider funding alongside tuition and everyday living costs.",
    icon: GraduationCap,
    detail: "Scholarship resources · Eligibility · Budget questions",
  },
  {
    title: "Arrival planning",
    note: "THINK BEYOND THE ACCEPTANCE",
    text: "Build a practical checklist for housing research, transport and life after arriving. Make room for the everyday details of a new country.",
    icon: Luggage,
    detail: "Housing research · Transport · Arrival checklist",
  },
];
export default function ServicesPage() {
  return (
    <Page
      eyebrow="L’ART D’ACCOMPAGNER"
      title="A little guidance. At every turning point."
      intro="Thoughtfully scoped support for your academic ambitions, your application and the life you’re planning beyond it."
    >
      <div className="service-editorial-grid">
        {services.map(({ title, note, text, icon: Icon, detail }, i) => (
          <article className="service-editorial-card" key={title}>
            <div className="service-editorial-top">
              <span>0{i + 1} /</span>
              <Icon size={26} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <p className="eyebrow">{note}</p>
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="service-detail">{detail}</div>
            <Link className="text-link" href="/book-consultation">
              Discuss this support ↗
            </Link>
          </article>
        ))}
      </div>
      <section className="scope-conversation">
        <div>
          <p className="eyebrow">FIRST, A CONVERSATION</p>
          <h2>
            The right support.
            <br />
            <em>Agreed together.</em>
          </h2>
        </div>
        <div>
          <p>
            A first conversation establishes what you need, what support is
            available, and the deliverables and fees before work begins.
          </p>
          <p className="muted">
            Applications, legal representation, visa submissions and
            accommodation bookings are included only when separately agreed in
            writing. Decisions belong to the relevant institutions and
            authorities.
          </p>
          <Link className="button" href="/book-consultation">
            Find your starting point <span>↗</span>
          </Link>
        </div>
      </section>
    </Page>
  );
}
