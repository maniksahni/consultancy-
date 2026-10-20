import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import WorldInstitutionPage, { institutionDescription, institutionTitle } from "@/components/althea/WorldInstitutionPage";
import { ukInstitutions } from "@/lib/worldInstitutions";

const find = (slug: string) => ukInstitutions().find((i) => i.slug === slug);
export function generateStaticParams() { return ukInstitutions().map((i) => ({ slug: i.slug })); }

/** What each Home Office register status means for a student from India. */
function sponsor(status?: string) {
  if (status === "Student Sponsor - Track Record") return { short: "Licensed sponsor (track record)", text: "It holds a Student sponsor licence with a track record of compliance, so it can issue the CAS you need for a Student visa." };
  if (status === "Student Sponsor") return { short: "Licensed sponsor", text: "It holds a Student sponsor licence, so it can issue the CAS you need for a Student visa." };
  if (status === "Probationary Sponsor") return { short: "Probationary sponsor", text: "It holds a probationary Student sponsor licence: it can sponsor students, but with limits on the courses it can offer them. Ask which of its courses it can sponsor." };
  return { short: "Check the register", text: "We could not match it on the Home Office register of student sponsors we use. Before applying, check the register: you need a licensed sponsor to get a Student visa." };
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = find(params.slug);
  if (!i) return pageMetadata(`/universities/uk/${params.slug}`, { title: "UK institution" });
  return pageMetadata(`/universities/uk/${i.slug}`, { title: institutionTitle(i.name), description: institutionDescription(
    `${i.name} (${i.city}) for Indian students: ${i.courses.length} undergraduate courses, Student visa sponsor status, fees and the Graduate visa.`,
    `${i.name}: ${i.courses.length} undergraduate courses, sponsor status and how Indian students apply.`) });
}

export default function Page({ params }: { params: { slug: string } }) {
  const i = find(params.slug);
  if (!i) notFound();
  const s = sponsor(i.sponsorStatus);
  const faqs = [
    { q: `Can Indian students get a UK Student visa for ${i.name}?`, a: `${s.text} The Student visa fee is £558 plus the Immigration Health Surcharge.` },
    { q: `How much does ${i.name} cost for international students?`, a: `${i.name} sets its own international fees for each course and publishes them on its course pages. Budget for living costs as well: the visa asks for £1,529 a month in London or £1,171 elsewhere, for up to nine months.` },
    { q: `Can I work in the UK after studying at ${i.name}?`, a: `Yes. After a degree you can apply for the Graduate visa: two years if you apply by 31 December 2026, 18 months from 1 January 2027, and three years after a PhD.` },
  ];
  return <WorldInstitutionPage i={i} path={`/universities/uk/${i.slug}`} country="GB" eyebrow={`UNITED KINGDOM · ${i.city.toUpperCase()}`}
    intro={`${i.name} is a UK higher education provider in ${i.city} with ${i.courses.length} undergraduate courses on Discover Uni. ${s.text} Here are its courses, what it costs and how students from India apply.`}
    facts={[
      { label: "Location", value: i.city },
      { label: "Student visa sponsor", value: s.short.split(" (")[0], note: i.sponsorStatus === "Student Sponsor - Track Record" ? "Track record" : undefined },
      { label: "Undergraduate courses", value: String(i.courses.length), note: "Discover Uni 2026" },
      ...(i.identifier ? [{ label: "UK provider number", value: i.identifier, note: "UKPRN" }] : []),
    ]}
    courseNote={<p>These are the undergraduate courses {i.name} reports to Discover Uni, the official UK course database, for 2027–28 entry. The qualification is in brackets (BSc, BA, FdA and so on). Master’s courses are listed on {i.name}’s own website.</p>}
    courseLine={(c) => <>{c.name}</>}
    money={<><p>{i.name} sets international tuition per course. Our UK guide gives typical ranges and the full monthly budget; for the visa you must show your remaining first-year tuition plus £1,529 a month in London or £1,171 elsewhere, for up to nine months, held for 28 days.</p><p><Link href="/destinations/uk/costs">Cost of studying in the UK</Link> · <Link href="/destinations/uk/scholarships">UK scholarships</Link> · <Link href="/from-india/education-loans">Education loans from India</Link></p></>}
    visa={<><p>{s.text} The Student visa costs £558 plus the Immigration Health Surcharge. Degree students can work up to 20 hours a week in term and full time in official vacations. After your degree, the Graduate visa gives two years for applications by 31 December 2026 and 18 months from 1 January 2027.</p><p><Link href="/destinations/uk/visa">UK Student visa for Indians</Link> · <Link href="/destinations/uk/after-graduation">The Graduate visa</Link></p></>}
    apply={[
      { title: "Pick the course", body: <>Undergraduate courses go through UCAS; master’s courses through {i.name} directly. <Link href="/destinations/uk/application-process">How UK applications work</Link>.</> },
      { title: "Get your offer and CAS", body: <>Meet the conditions, pay any deposit and receive your Confirmation of Acceptance for Studies (CAS) from {i.name}.</> },
      { title: "Apply for the Student visa", body: <>Apply online with your CAS, funds and English evidence, then give biometrics. <Link href="/destinations/uk/visa">The visa, step by step</Link>.</> },
      { title: "Arrive and settle", body: <>eVisa, housing, bank and GP registration. <Link href="/destinations/uk/arrival">Your first weeks in the UK</Link>.</> },
    ]}
    faqs={faqs}
    sources={`Courses come from Discover Uni 2026 (HESA, CC BY 4.0); sponsor status from the UK Home Office register of student sponsors. Visa figures follow GOV.UK.`}
    searchHref={`/universities?country=uk&view=courses&q=${encodeURIComponent(i.name)}`} />;
}
