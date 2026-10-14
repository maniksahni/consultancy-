import Link from "@/components/althea/EditorialLink";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href="/">
            Althéa <em>Consulting</em>
          </Link>
          <p>
            Studying. Settling. Succeeding.
            <br />
            Parisian at heart. Global in possibility.
          </p>
        </div>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <Link href="/destinations">The destination atlas</Link>
          <Link href="/study-in-france">Study in France</Link>
          <Link href="/programmes">Programme fees & deadlines</Link>
          <Link href="/france/universities">French universities</Link>
          <Link href="/knowledge">October 2026 knowledge hub</Link>
          <Link href="/campus-france-guide">Campus France guide</Link>
          <Link href="/about">Our maison</Link>
          <Link href="/reviews">The review collection</Link>
        </div>
        <div>
          <span className="eyebrow">YOUR NEXT STEP</span>
          <Link href="/book-consultation">Request a consultation ↗</Link>
          <Link href="/services">Explore support</Link>
          <details>
            <summary>Other study destinations</summary>
            {["uk", "usa", "canada", "germany", "australia", "ireland"].map(
              (s) => (
                <Link key={s} href={`/destinations/${s}`}>
                  {s.toUpperCase()}
                </Link>
              ),
            )}
          </details>
        </div>
      </div>
      <div className="footer-masthead" aria-hidden="true">
        <span>Althéa.</span>
        <em>
          A wider world.
          <br />A personal way forward.
        </em>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Althéa Consulting · Independent education
          advisory
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/acknowledgements">Sources & photography</Link>
        </div>
      </div>
    </footer>
  );
}
