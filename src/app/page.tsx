import { pageMetadata } from "@/lib/seo";
import PageIdentity from "@/components/seo/PageIdentity";
import LumiereHome from "@/components/lumiere/LumiereHome";
import JsonLd from "@/components/seo/JsonLd";
import { questions } from "@/components/redesign/content";
import { siteUrl } from "@/lib/seo";
import manifest from "../../public/data/universities/manifest.json";
import liveJobs from "../../public/data/jobs/live.json";
import { programmeResearch } from "@/data/programmeResearch";


export const metadata = pageMetadata("/", {
  title: {
    absolute: "Study in France Consultant for Indians | Althéa Consulting",
  },
  description:
    "Study in France consultant in Paris: Harshita Kohli helps Indian students come to study in France, and helps those already here with internships, jobs and CAF.",
});

export default function Home() {
  const coverage = Object.values(manifest.countries);
  const stats = {
    destinations: coverage.length,
    institutions: coverage.reduce((sum, item) => sum + item.uniqueInstitutionCount, 0),
    courses: coverage.reduce((sum, item) => sum + item.courseCount, 0),
    refreshedAt: manifest.refreshedAt,
  };
  const countryCoverage = Object.fromEntries(Object.entries(manifest.countries).map(([slug, item]) => [slug, { institutions: item.uniqueInstitutionCount, courses: item.courseCount }]));
  const fr = (manifest.countries as Record<string, { uniqueInstitutionCount: number; courseCount: number }>).france;
  const france = { institutions: fr?.uniqueInstitutionCount ?? 0, courses: fr?.courseCount ?? 0, jobs: (liveJobs as { counts: Record<string, number> }).counts.france ?? 0, programmes: programmeResearch.filter((p) => p.country === "france").length };
  return (
    <>
      <PageIdentity
        path="/"
        title="Study in France Consultant for Indians | Althéa Consulting"
        description="Study in France consultant in Paris: Harshita Kohli helps Indian students come to study in France, and helps those already here with internships, jobs and CAF."
      />
      {/* The same questions answered visibly in the home FAQ, for answer engines. */}
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage", "@id": `${siteUrl}/#faq`,
        mainEntity: questions.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      }} />
      <LumiereHome stats={stats} coverage={countryCoverage} france={france} />
    </>
  );
}
