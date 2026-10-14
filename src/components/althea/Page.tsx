import { brand } from "@/config/brand";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
export default function Page({
  eyebrow = "La maison",
  title,
  image,
  intro,
  headerActions,
  children,
}: {
  eyebrow?: string;
  title: string;
  image?: string;
  intro: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pageKey = `${eyebrow} ${title}`.toLocaleLowerCase();
  const pageImage = image || (
    /university|programme|academic|research|course|study/.test(pageKey) ? "/images/editorial/sainte-genevieve.webp" :
    /visa|admission|application|official|campus/.test(pageKey) ? "/images/editorial/france-campus.webp" :
    /city|cost|living|scholarship|budget|outcome/.test(pageKey) ? "/images/editorial/france-bordeaux.webp" :
    /service|consult|journey|welcome|about|maison|support/.test(pageKey) ? "/images/editorial/notre-dame.webp" :
    ["/images/editorial/france-evening-20261014.webp", "/images/editorial/france-bordeaux.webp", "/images/editorial/sainte-genevieve.webp", "/images/editorial/france-campus.webp", "/images/editorial/notre-dame.webp"][Array.from(pageKey).reduce((n, c) => n + c.codePointAt(0)!, 0) % 5]
  );
  const imageAlt = pageImage.includes("sainte-genevieve")
    ? "Reading room of the Bibliothèque Sainte-Geneviève in Paris"
    : pageImage.includes("campus")
      ? "The historic Sorbonne University building in Paris"
      : pageImage.includes("bordeaux")
        ? "The Place de la Bourse and Water Mirror in Bordeaux"
        : pageImage.includes("notre-dame")
          ? "The west façade of Notre-Dame Cathedral in Paris"
          : "The Eiffel Tower and Pont Alexandre III at blue hour in Paris";
  return (
    <>
      <Navbar />
      <main id="main-content" className="maison-interior">
        <header className="interior-cover">
          <div className="wrap interior-cover-layout">
            <div className="page-heading">
              <div className="interior-breadcrumb">
                <Link href="/">La Maison {brand.shortName}</Link>
                <span aria-hidden="true">/</span>
                <span>{eyebrow}</span>
              </div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="lead">{intro}</p>
              {headerActions && <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>{headerActions}</div>}
              <div className="interior-seal" aria-hidden="true">
                <span>{brand.shortName}</span>
                <i>✳</i>
                <small>PERSONAL BY DESIGN</small>
              </div>
            </div>
            <div className="interior-cover-photo">
              <Image
                src={pageImage}
                alt={imageAlt}
                fill
                sizes="(max-width:760px) 90vw, 35vw"
              />
              <span>{imageAlt}</span>
            </div>
          </div>
        </header>
        <div className="wrap page-content">{children}</div>
        <section className="closing interior-closing">
          <span className="closing-ornament" aria-hidden="true">
            ✳
          </span>
          <p className="eyebrow">LET’S BEGIN</p>
          <h2>
            A wider world.
            <br />
            <em>A personal way forward.</em>
          </h2>
          <p>Bring your questions. Let’s find your first step together.</p>
          <Link className="button light" href="/book-consultation">
            Request a consultation ↗
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
