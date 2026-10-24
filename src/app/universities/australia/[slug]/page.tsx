import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import WorldInstitutionPage, { institutionDescription, institutionTitle, money, years } from "@/components/althea/WorldInstitutionPage";
import { australianInstitutions } from "@/lib/worldInstitutions";

const find = (slug: string) => australianInstitutions().find((i) => i.slug === slug);
export function generateStaticParams() { return australianInstitutions().map((i) => ({ slug: i.slug })); }

/** Lowest and highest whole-course tuition at a level, with the matching yearly figure. */
function range(i: NonNullable<ReturnType<typeof find>>, test: (level: string) => boolean) {
  const list = i.courses.filter((c) => test(c.level) && c.tuition && c.weeks);
  if (!list.length) return null;
  const perYear = list.map((c) => (c.tuition! / c.weeks!) * 52);
  return { n: list.length, min: Math.min(...list.map((c) => c.tuition!)), max: Math.max(...list.map((c) => c.tuition!)), yMin: Math.min(...perYear), yMax: Math.max(...perYear) };
}
const masters = (l: string) => /^Masters/.test(l);
const bachelor = (l: string) => /^Bachelor/.test(l);

export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = find(params.slug);
  if (!i) return pageMetadata(`/universities/australia/${params.slug}`, { title: "Australian institution" });
  const m = range(i, masters);
  return pageMetadata(`/universities/australia/${i.slug}`, { title: institutionTitle(i.name), description: institutionDescription(
    `${i.name} fees and admission for Indian students: ${i.courses.length} CRICOS courses${m ? `, master's from ${money(m.yMin)} a year` : ""}, Student visa and how to apply from India.`,
    `${i.name}: ${i.courses.length} CRICOS-registered courses, fees and how Indian students apply.`) });
}

export default function Page({ params }: { params: { slug: string } }) {
  const i = find(params.slug);
  if (!i) notFound();
  const m = range(i, masters), b = range(i, bachelor);
  // CRICOS sometimes records a campus name as the city; name the state instead in sentences.
  const where = /campus|universit|college/i.test(i.city) ? i.region || i.city : `${i.city}${i.region ? `, ${i.region}` : ""}`;
  const line = (r: NonNullable<typeof m>, label: string) => `${label}: ${money(r.min)} to ${money(r.max)} for the whole course, about ${money(r.yMin)}–${money(r.yMax)} a year (${r.n} courses)`;
  const feeText = [m && line(m, "Master’s by coursework"), b && line(b, "Bachelor’s")].filter(Boolean).join(". ");
  const faqs = [
    { q: `How much does ${i.name} cost for Indian students?`, a: feeText ? `${feeText}. These are the tuition fees ${i.name} registers on CRICOS; living costs, health cover (OSHC) and the visa are extra.` : `Tuition for each course is listed on CRICOS; living costs, OSHC health cover and the visa are extra.` },
    { q: `Can Indian students get an Australian Student visa for ${i.name}?`, a: `Yes, for its CRICOS-registered courses: only CRICOS courses can be studied on a Student visa (subclass 500). The visa fee is AUD 2,500 from 1 July 2026 and you must meet the Genuine Student requirement.` },
    { q: `Where is ${i.name}?`, a: `Its registered location is ${where}. Course locations can differ; check the campus for your course.` },
    { q: `Is ${i.name} free for international students?`, a: `No. International students pay full tuition${feeText ? `: ${feeText}` : ", listed for each course on CRICOS"}. Some providers offer merit scholarships that reduce it.` },
    { q: `Does ${i.name} accept Indian students?`, a: `Yes. Its courses are registered on CRICOS, which is what allows a provider to enrol international students, including students from India, on a Student visa (subclass 500).` },
  ];
  return <WorldInstitutionPage i={i} path={`/universities/australia/${i.slug}`} country="AU" eyebrow={`AUSTRALIA · ${i.isPublic ? "PUBLIC" : "PRIVATE"} · ${(i.region || i.city).toUpperCase()}`}
    intro={`${i.name} is a ${i.isPublic ? "public (government)" : "private"} provider in ${where}, with ${i.courses.length} courses registered on CRICOS for international students. Here are its courses, the fees it registers, and how students from India apply.`}
    facts={[
      { label: "Location", value: i.city, note: i.region },
      { label: "Provider", value: i.isPublic ? "Public" : "Private", note: `CRICOS ${i.identifier}` },
      { label: "CRICOS courses", value: String(i.courses.length), note: "Open to international students" },
      ...(m ? [{ label: "Master’s, per year", value: `${money(m.yMin)}+`, note: "From registered tuition" }] : b ? [{ label: "Bachelor’s, per year", value: `${money(b.yMin)}+`, note: "From registered tuition" }] : []),
    ]}
    courseNote={<p>These are the courses {i.name} registers on CRICOS, the Australian Government register of courses open to international students. Fees are the tuition for the whole course as registered; the yearly figure is worked out from the course length.</p>}
    courseLine={(c) => <>{c.name}{c.weeks ? ` · ${years(c.weeks)}` : ""}{c.tuition ? ` · ${money(c.tuition, c.currency)} total` : ""}</>}
    money={<><p>{feeText ? `${feeText}.` : "Each course’s tuition is listed above."} On top of tuition, budget for living costs (the Student visa asks you to show AUD 29,710 a year), Overseas Student Health Cover and the visa fee.</p><p><Link href="/destinations/australia/costs">Full cost of studying in Australia</Link> · <Link href="/destinations/australia/scholarships">Scholarships for Australia</Link> · <Link href="/from-india/education-loans">Education loans from India</Link></p></>}
    visa={<><p>You study on a Student visa (subclass 500), which needs a CRICOS-registered course, a Confirmation of Enrolment (CoE), OSHC and proof of funds. You can work 48 hours a fortnight during term. After at least two academic years of CRICOS study, the Temporary Graduate visa (485) lets you stay and work; Indian graduates get longer stays under the Australia–India trade agreement.</p><p><Link href="/destinations/australia/visa">Australian Student visa for Indians</Link> · <Link href="/destinations/australia/after-graduation">Staying after graduation</Link></p></>}
    apply={[
      { title: "Pick the course", body: <>Check entry requirements, English scores and the campus. <Link href="/destinations/australia/admissions">Admission requirements in Australia</Link>.</> },
      { title: "Apply and accept the offer", body: <>Apply to {i.name} directly or through its authorised agent, accept the offer and pay the deposit to receive your CoE.</> },
      { title: "Apply for the Student visa", body: <>Lodge online with your CoE, OSHC, funds and a Genuine Student statement, then give biometrics. <Link href="/destinations/australia/visa">The visa, step by step</Link>.</> },
      { title: "Arrive and settle", body: <>Housing, bank, phone and your tax file number. <Link href="/destinations/australia/arrival">Your first weeks in Australia</Link>.</> },
    ]}
    faqs={faqs}
    sources={`Provider and course details, including tuition, come from the Australian Government CRICOS register (CC BY 2.5 Australia, provider code ${i.identifier}). Visa rules follow the Department of Home Affairs.`}
    searchHref={`/universities?country=australia&view=courses&q=${encodeURIComponent(i.name)}`} />;
}
