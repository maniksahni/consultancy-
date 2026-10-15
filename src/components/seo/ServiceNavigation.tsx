import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ServiceNavigation() {
  return <nav className="home-service-links" aria-label="Explore Althéa Consulting">
    {[
      ["Study in France", "/study-in-france"],
      ["Settle in France", "/settle-in-france"],
      ["Career support", "/career-support"],
      ["About Harshita", "/about"],
      ["Student reviews", "/reviews"],
      ["Book a consultation", "/book-consultation"],
    ].map(([label, href]) => <Link href={href} key={href}>{label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}
  </nav>;
}
