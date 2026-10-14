import { brand } from "@/config/brand";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="footer-brand" href="/">
            <img className="footer-brand-logo" src={brand.assets.logoLight} alt={brand.name} width={420} height={96} />
          </Link>
          <p>
            {brand.tagline}
          </p>
          <div className="brand-contact">
            <div className="brand-contact-person">
              <strong>{brand.person}</strong>
              <span>{brand.role} <i aria-hidden="true">·</i> {brand.location}</span>
            </div>
            <div className="brand-contact-actions">
              {brand.email && (
                <a href={`mailto:${brand.email}`}>
                  <Mail size={17} aria-hidden="true" />
                  <span><small>EMAIL</small>{brand.email}</span>
                </a>
              )}
              {brand.whatsappNumber && (
                <>
                  <a href={`tel:+${brand.whatsappNumber}`}>
                    <Phone size={17} aria-hidden="true" />
                    <span><small>CALL</small>+33 7 55 74 90 29</span>
                  </a>
                  <a href={`https://wa.me/${brand.whatsappNumber}`}>
                    <MessageCircle size={17} aria-hidden="true" />
                    <span><small>WHATSAPP</small>Start a conversation</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <Link href="/settle-in-france">Settle in France</Link>
          <Link href="/study-in-france">Study in France</Link>
          <Link href="/career-support">Career Support</Link>
          <Link href="/about">About Harshita</Link>
          <Link href="/knowledge">Resources & guides</Link>
          <Link href="/first-30-days-france">Free arrival checklist</Link>
        </div>
        <div>
          <span className="eyebrow">YOUR NEXT STEP</span>
          <Link href="/book-consultation">Book a Call ↗</Link>
          <Link href="/services">All support</Link>
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
          <Link href="/acknowledgements#photography">Sources & photography</Link>
        </div>
      </div>
    </footer>
  );
}
