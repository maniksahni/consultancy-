import { pageMetadata } from "@/lib/seo";
import PageIdentity from "@/components/seo/PageIdentity";
import LumiereHome from "@/components/lumiere/LumiereHome";
import manifest from "../../public/data/universities/manifest.json";


export const metadata = pageMetadata("/", {
  title: {
    absolute: "Althéa Consulting | Study in France Consultant, Paris",
  },
  description:
    "Study in France consultant in Paris: Harshita Kohli guides Indian students on universities, Campus France, student visa, housing and jobs in France.",
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
  return (
    <>
      <PageIdentity
        path="/"
        title="Althéa Consulting | Study in France Consultant, Paris"
        description="Study in France consultant in Paris: Harshita Kohli guides Indian students on universities, Campus France, student visa, housing and jobs in France."
      />
      <LumiereHome stats={stats} coverage={countryCoverage} />
    </>
  );
}
