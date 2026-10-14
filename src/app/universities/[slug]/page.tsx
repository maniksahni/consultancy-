import { notFound } from "next/navigation";
import Link from "@/components/althea/EditorialLink";
import Page from "@/components/althea/Page";
import { institutions } from "@/data/franceDirectory";
import { franceProgrammes } from "@/data/franceProgrammes";
export function generateStaticParams() {
  return institutions.map((i) => ({ slug: i.id }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = institutions.find((i) => i.id === params.slug);
  return {
    title: i?.name,
    alternates: { canonical: `/universities/${params.slug}` },
  };
}
export default function University({ params }: { params: { slug: string } }) {
  const institution = institutions.find((i) => i.id === params.slug);
  if (!institution) notFound();
  return (
    <Page
      eyebrow={`${institution.city} / UNIVERSITY RESEARCH`}
      title={institution.name}
      intro={institution.description}
    >
      <nav aria-label="University breadcrumb" className="country-tabs">
        <Link href="/france/universities">French universities</Link>
        <span aria-current="page">{institution.name}</span>
      </nav>
      <div className="content-grid">
        <section className="content-card">
          <h2>Your academic direction.</h2>
          <dl>
            <dt>City</dt>
            <dd>{institution.city}</dd>
            <dt>Fields</dt>
            <dd>{institution.focus.join(", ")}</dd>
            <dt>Listed levels</dt>
            <dd>{institution.degreeLevels.join(", ")}</dd>
            <dt>Language coverage</dt>
            <dd>{institution.language}; verify the specific track.</dd>
            <dt>Source review</dt>
            <dd>{institution.verifiedOn}</dd>
          </dl>
          <a className="text-link" href={institution.sourceUrl}>
            Official programme directory ↗
          </a>
        </section>
        <section className="content-card">
          <h2>Research the exact track.</h2>
          <p>
            Fees, eligibility, funding and intake depend on the programme and
            applicant category. Institution-wide values: Not yet verified.
          </p>
          <Link className="text-link" href="/france/programmes">
            Explore source-linked programme examples ↗
          </Link>
          <p>
            The official programme page identifies the application path. An
            institution name alone does not establish eligibility or an
            available intake.
          </p>
          <Link className="text-link" href="/campus-france-guide">
            Check your France application route ↗
          </Link>
        </section>
      </div>
    </Page>
  );
}
