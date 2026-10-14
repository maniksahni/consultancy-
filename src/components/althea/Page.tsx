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
  children,
}: {
  eyebrow?: string;
  title: string;
  image?: string;
  intro: string;
  children: React.ReactNode;
}) {
  const pageKey = `${eyebrow} ${title}`.toLocaleLowerCase();
  const pageImage = image || (
    /university|programme|academic|research|course|study/.test(pageKey) ? "/images/editorial/france-library.webp" :
    /visa|admission|application|official|campus/.test(pageKey) ? "/images/editorial/france-campus.webp" :
    /city|cost|living|scholarship|budget|outcome/.test(pageKey) ? "/images/editorial/france-bordeaux.webp" :
    /service|consult|journey|welcome|about|maison|support/.test(pageKey) ? "/images/editorial/paris-cafe.webp" :
    ["/images/editorial/france-evening.webp", "/images/editorial/france-bordeaux.webp", "/images/editorial/france-library.webp", "/images/editorial/france-campus.webp", "/images/editorial/paris-cafe.webp"][Array.from(pageKey).reduce((n, c) => n + c.codePointAt(0)!, 0) % 5]
  );
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
              <div className="interior-seal" aria-hidden="true">
                <span>{brand.shortName}</span>
                <i>✳</i>
                <small>PERSONAL BY DESIGN</small>
              </div>
            </div>
            <div className="interior-cover-photo">
              <Image
                src={pageImage}
                alt={pageImage.includes("library") ? "A quiet French university library" : pageImage.includes("campus") ? "A French university courtyard" : pageImage.includes("bordeaux") ? "Bordeaux architecture reflected in the water" : pageImage.includes("cafe") ? "A Paris café terrace on a Haussmann street" : "The Eiffel Tower and Seine at blue hour"}
                fill
                sizes="(max-width:760px) 90vw, 35vw"
              />
              <span>THE COLLECTION</span>
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
