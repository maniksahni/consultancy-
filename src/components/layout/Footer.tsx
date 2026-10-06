"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import BrandWordmark from "./BrandWordmark";

export default function Footer(){
  return (
    <footer id="footer" className="site-footer h26-footer">
      <div className="h26-footer-top">
        <div>
          <p>THE WORLD IS WAITING</p>
          <h2>Your story.<br/><em>Without borders.</em></h2>
        </div>
        <Link href="/#booking">Begin a conversation <ArrowUpRight size={22}/></Link>
      </div>

      <div className="h26-footer-main">
        <div className="h26-footer-brand">
          <BrandWordmark/>
          <p>Independent one-to-one admissions and visa mentorship for students making high-stakes international education decisions.</p>
          <a href="https://wa.me/33755749029" target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp +33 7 55 74 90 29</a>
        </div>

        <div className="h26-footer-col"><span>Explore</span>
          <Link href="/#destinations">Destinations</Link>
          <Link href="/mentorship-model">Mentorship</Link>
          <Link href="/admissions-process">Admissions roadmap</Link>
          <Link href="/outcomes">Student outcomes</Link>
        </div>

        <div className="h26-footer-col"><span>Resources</span>
          <Link href="/scholarships">Scholarships</Link>
          <Link href="/faq">Admissions FAQ</Link>
          <Link href="/#booking">Strategy session</Link>
          <a href="mailto:admissions@pathwaysglobal.org">Email advisory</a>
        </div>

        <div className="h26-footer-col h26-footer-social"><span>Follow</span>
          <a href="https://www.linkedin.com/in/harshita-kohli-imtbs/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a>
          <a href="https://www.instagram.com/helloharshita98/" target="_blank" rel="noreferrer"><Instagram size={15}/> Instagram</a>
          <a href="mailto:admissions@pathwaysglobal.org"><Mail size={15}/> Email</a>
        </div>
      </div>

      <div className="h26-footer-ethics">
        <span>INDEPENDENT BY DESIGN</span>
        <p>Zero university recruiter commissions. Admissions and visa decisions always remain with universities and the relevant government authorities.</p>
      </div>

      <div className="h26-footer-bottom"><span>© {new Date().getFullYear()} Study with Harshita</span><span>Private admissions advisory · Global remote sessions</span></div>
    </footer>
  );
}
