import type { Metadata } from "next";
import Link from "@/components/althea/EditorialLink";
import { services } from "@/data/services";
import Page from "@/components/althea/Page";
export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Support, thoughtfully scoped.",
  description:
    "Explore personal academic guidance, programme research, application review and arrival planning with Althéa.",
};
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
            <Link className="text-link" href={`/services/${services[i].slug}`}>
              Explore this support ↗
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
