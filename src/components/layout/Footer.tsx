import { brand } from "@/config/brand";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href="/">
            {brand.name}
          </Link>
          <p>
            {brand.tagline}
          </p><div className="brand-contact"><strong>{brand.person} — {brand.role}</strong><small>{brand.location}</small>{brand.email ? <a href={`mailto:${brand.email}`}>{brand.email}</a> : <small>Email: awaiting owner confirmation</small>}{brand.whatsappNumber ? <a href={`https://wa.me/${brand.whatsappNumber}`}>Chat on WhatsApp</a> : <small>WhatsApp: awaiting owner confirmation</small>}{brand.whatsappQr ? <><img src={brand.whatsappQr} width="120" height="120" alt="WhatsApp chat QR code"/><small>Scan to chat on WhatsApp</small></> : <small>Scan to chat on WhatsApp — QR available after number confirmation</small>}</div>
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
        <span>{brand.shortName}.</span>
        <em>
          A wider world.
          <br />A personal way forward.
        </em>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} · Independent education advisory · No affiliation with Campus France or universities
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
