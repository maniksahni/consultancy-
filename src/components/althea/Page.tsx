import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "@/components/althea/EditorialLink";
import Image from "@/components/althea/EditorialImage";
export default function Page({
  eyebrow = "LA MAISON ALTHÉA",
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="maison-interior">
        <header className="interior-cover">
          <div className="wrap interior-cover-layout">
            <div className="page-heading">
              <nav className="interior-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">La Maison Althéa</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{eyebrow}</span>
              </nav>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="lead">{intro}</p>
              <div className="interior-seal" aria-hidden="true">
                <span>ALTHÉA</span>
                <i>✳</i>
                <small>PERSONAL BY DESIGN</small>
              </div>
            </div>
            <div className="interior-cover-photo">
              <Image
                src="/images/paris-street.webp"
                alt="Haussmann architecture on a Paris boulevard"
                fill
                sizes="(max-width:760px) 90vw, 35vw"
              />
              <span>THE ALTHÉA COLLECTION</span>
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
