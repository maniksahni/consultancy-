import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Link from "next/link";
import { articles } from "@/data/france";
export const metadata: Metadata = {
  alternates: { canonical: "/insights" },
  title: "Le journal Althéa.",
  description:
    "Practical notes for a thoughtful French chapter, with official sources.",
};
export default function Content() {
  return (
    <Page
      title={"Le journal Althéa."}
      intro={
        "Practical notes for a thoughtful French chapter, with official sources."
      }
    >
      <div className="journal-grid">
        {articles.map((a) => (
          <Link key={a.slug} href={`/insights/${a.slug}`}>
            <p className="eyebrow">{a.category}</p>
            <h3>{a.title}</h3>
            <p>{a.intro}</p>
            <span className="text-link">Read the guide ↗</span>
          </Link>
        ))}
      </div>
    </Page>
  );
}
