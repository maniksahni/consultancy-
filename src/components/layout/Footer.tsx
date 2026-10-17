import BrandLockup from "@/components/brand/BrandLockup";
import { brand } from "@/config/brand";
import Link from "next/link";
import { ArrowUp, Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";

const groups = [
  { title: "Explore", links: [["Study destinations", "/destinations"], ["Universities & courses", "/universities"], ["Programmes & fees", "/programmes"], ["Student stories", "/reviews"], ["The journal", "/knowledge"], ["Insights", "/insights"]] },
  { title: "Your next step", links: [["Study in France", "/study-in-france"], ["Settle in France", "/settle-in-france"], ["Career support", "/career-support"], ["Scholarship guidance", "/scholarships"], ["Jobs & opportunities", "/jobs"], ["Our support", "/services"]] },
  { title: "Good to know", links: [["Admissions process", "/admissions-process"], ["From India: the essentials", "/from-india"], ["Campus France guide", "/campus-france-guide"], ["First 30 days in France", "/first-30-days-france"], ["The mentorship model", "/mentorship-model"], ["Your questions, answered", "/faq"], ["About Harshita", "/about"]] },
];

export default function Footer({ showCallout = true }: { showCallout?: boolean }) {
  return <footer className="ms-footer" id="footer">
    <div className="ms-wrap">

      <div className="ms-footer-grid">
        <div className="ms-footer-brand">
          <Link href="/" aria-label={`${brand.name} home`}><BrandLockup /></Link>
          <p>A wider world. A personal way forward. Independent study, settling and career guidance from Paris.</p>
          <ul className="ms-footer-contact">
            <li><a href={`mailto:${brand.email}`}><Mail size={15} aria-hidden="true" />{brand.email}</a></li>
            <li><a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" />+33 7 55 74 90 29</a></li>
            <li><span><MapPin size={15} aria-hidden="true" />{brand.location}</span></li>
            <li><a href={brand.socialLinks.instagram} target="_blank" rel="me noreferrer"><Instagram size={15} aria-hidden="true" />Instagram · @helloharshitainparis</a></li>
            <li><a href={brand.socialLinks.linkedin} target="_blank" rel="me noreferrer"><Linkedin size={15} aria-hidden="true" />LinkedIn · {brand.person}</a></li>
          </ul>
        </div>
        {groups.map((group) => <nav key={group.title} aria-label={group.title} className="ms-footer-col">
          <p className="ms-footer-title">{group.title}</p>
          <ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
        </nav>)}
      </div>

      <div className="ms-footer-legal">
        <p>© {new Date().getFullYear()} {brand.name} · Independent advisory based in France. Admissions, scholarships and visas are decided by institutions and authorities.</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="#main-content" className="ms-top">Back to top<ArrowUp size={14} aria-hidden="true" /></a></div>
      </div>
    </div>
    <div className="ms-footer-word" aria-hidden="true">Althéa</div>
  </footer>;
}
