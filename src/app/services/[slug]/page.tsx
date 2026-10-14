import { notFound } from "next/navigation";
import Link from "@/components/althea/EditorialLink";
import Page from "@/components/althea/Page";
import { services } from "@/data/services";
const chapters: Record<
  string,
  { prepare: string[]; resource: string; href: string }
> = {
  "academic-direction": {
    prepare: [
      "Your qualifications and subject interests",
      "The kind of curriculum and learning environment you prefer",
      "Your budget, teaching-language needs and intended intake",
    ],
    resource: "Explore the destination atlas",
    href: "/destinations",
  },
  "programme-research": {
    prepare: [
      "Course modules, qualification and campus",
      "Official prerequisites and teaching-language evidence",
      "Fee category, cohort, application route and published dates",
    ],
    resource: "Research published programme evidence",
    href: "/programmes",
  },
  "application-review": {
    prepare: [
      "The institution’s document checklist",
      "Your own CV and draft written materials",
      "Evidence of academic work and a realistic submission timeline",
    ],
    resource: "Read the programme shortlist guide",
    href: "/knowledge/choosing-your-programme",
  },
  "process-orientation": {
    prepare: [
      "Your country of residence and intended qualification",
      "Your institution’s application instructions",
      "Your offer status and local Campus France procedure, where applicable",
    ],
    resource: "Explore the Campus France route guide",
    href: "/campus-france-guide",
  },
  "funding-research": {
    prepare: [
      "Published tuition for your applicant category",
      "Scholarship nationality, degree and academic conditions",
      "Living costs and a funding plan that does not depend on an unawarded scholarship",
    ],
    resource: "Explore funding resources",
    href: "/scholarships",
  },
  "arrival-planning": {
    prepare: [
      "Official visa and arrival requirements",
      "Housing research, insurance and transport questions",
      "Your campus location, arrival timing and practical budget",
    ],
    resource: "Build your study budget",
    href: "/knowledge#budget",
  },
};
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  return {
    title: service?.title,
    description: service?.text,
    alternates: { canonical: `/services/${params.slug}` },
  };
}
export default function Service({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  const chapter = chapters[service.slug];
  return (
    <Page eyebrow="OUR SUPPORT" title={service.title} intro={service.text}>
      <nav aria-label="Service breadcrumb" className="country-tabs">
        <Link href="/services">All services</Link>
        <span aria-current="page">{service.title}</span>
      </nav>
      <section className="country-checklist">
        <div>
          <p className="eyebrow">A CONSIDERED START</p>
          <h2>
            Prepare the details.
            <br />
            <em>Bring your questions.</em>
          </h2>
        </div>
        <ol>
          {chapter.prepare.map((item, i) => (
            <li key={item}>
              <span>0{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>
      <div className="content-grid">
        <article className="content-card">
          <h2>Scope, agreed together.</h2>
          <p>{service.detail}</p>
          <p>
            A conversation establishes the support available, deliverables,
            timing and fees before any work is agreed. Service fees: Not yet
            verified.
          </p>
        </article>
        <article className="content-card">
          <h2>Your next useful step.</h2>
          <p>
            Use the linked resources to prepare your questions and keep a dated
            record of official instructions.
          </p>
          <Link className="text-link" href={chapter.href}>
            {chapter.resource} ↗
          </Link>
        </article>
      </div>
      <p className="muted">
        University admission, scholarship and visa decisions belong to the
        relevant institutions and authorities. Guidance does not guarantee an
        outcome.
      </p>
    </Page>
  );
}
