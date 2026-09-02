# GlobalPathways™ Study Abroad & Student Visa Consultancy Web Application

A modern, high-converting, responsive study-abroad and student visa consultancy web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide React**, **Framer Motion**, and **React Hook Form + Zod**.

---

## 🌟 Key Features

1. **Sticky Header / Navbar**: Brand emblem, responsive navigation dropdowns, "Book Free Counselling" CTA, Student Login, and mobile drawer.
2. **High-Impact Hero Section**:
   - Headline: *"Your Bridge to Global Universities & Visa Success"*
   - Dual CTAs: *"Check Eligibility Now"* (scrolls to multi-step AI tool) and *"Book 1-on-1 Call"*
   - Live **Quick Search Program Finder widget** (Country + Degree Level + Discipline).
3. **4-Column Trust & Key Stats Bar**:
   - 5,000+ Students Placed Worldwide
   - 98.4% First-Attempt Visa Grant Rate
   - 300+ Direct Partner Universities
   - 100% Free Initial Strategy Session
   - Official recognition badges: ICEF Accredited, AIRC Certified, British Council Trained Agent, PIER Australia Qualified.
4. **Multi-Step Interactive Eligibility Checker (Lead Magnet)**:
   - Built with **React Hook Form + Zod** validation across 4 interactive steps (Academics $\to$ English test $\to$ Country & Intake $\to$ Contact info).
   - Generates an instant **Visa Probability Index (98% Match)**, 3-tier university shortlist (Ambitious, Target, Safe), estimated scholarship tiers, and post-study work authorization duration.
5. **Top Destinations Grid & Sub-Pages**:
   - Interactive destination cards for **USA, UK, Canada, Australia, Germany, and Ireland** with regional filters, average tuition fees, PSW work rights, and top universities.
   - Dynamic deep-dive subpages at `/destinations/[slug]` with comprehensive visa checklists and employment rules.
6. **The 5-Step Process Roadmap**:
   - Visual interactive timeline covering:
     1. Profile Assessment & University Shortlisting
     2. SOP/LOR Preparation & Application Dispatch
     3. Offer Letter & Financial Documentation / 0% Collateral Loan
     4. Visa Filing & Mock Embassy Interview
     5. Pre-Departure Briefing & Post-Landing Accommodation
7. **Core Services Section**:
   - 6 comprehensive offerings: University Admissions, SOP/LOR Mentorship, Student Visa Lodgment, Scholarship Hunting ($12M+ indexed), Education Loans, and Forex & Housing Support.
8. **Social Proof & Verified Success Stories**:
   - Verified student testimonials with green visa approval stamps, admitted university logos, scholarship badges, and a simulated 4.9★ Google Reviews rating.
9. **Interactive Student Portal Preview & Dedicated Dashboard (`/portal`)**:
   - Live application milestone tracker (Profile Evaluated $\to$ Documents Verified $\to$ Shortlist Approved $\to$ University Applied $\to$ Offer Received $\to$ Visa Approved).
   - Encrypted Document Upload Vault with drag-and-drop file mock and verification tags.
   - Assigned Lead Counsellor profile card with 1-click WhatsApp and direct phone call actions.
10. **Global Scholarships Directory (`/scholarships`)**:
    - Searchable database of global fellowships (Chevening, Fulbright, DAAD, Australia Awards) with country and coverage filters.
11. **Persistent Floating WhatsApp Widget**:
    - Bottom-right launcher with animated unread badge and quick conversation starter prompts.
12. **Corporate Modals**:
    - 1-on-1 Consultation Booking Modal with date & slot selector.
    - Student Auth Modal with 1-click demo login.
    - AI Eligibility Result Report Modal with PDF preview download trigger.

---

## 🚀 Getting Started

### 1. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Global layout with SEO meta & fonts
│   │   ├── page.tsx                  # Full Landing page with all 10 core sections
│   │   ├── destinations/[slug]/      # Dynamic country guides (USA, UK, Canada, Australia, Germany, Ireland)
│   │   │   └── page.tsx
│   │   ├── portal/                   # Full interactive Student Portal & Live Tracker
│   │   │   └── page.tsx
│   │   ├── scholarships/             # Scholarship search & eligibility calculator
│   │   │   └── page.tsx
│   │   └── globals.css               # Tailwind setup + glassmorphism & gradients
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Sticky navbar with country dropdowns & CTAs
│   │   │   └── Footer.tsx            # Corporate footer with certifications & newsletter
│   │   ├── home/
│   │   │   ├── Hero.tsx              # Hero headline, subhead, dual CTAs & quick search
│   │   │   ├── TrustStats.tsx        # 4-column animated counters + accreditation badges
│   │   │   ├── EligibilityChecker.tsx# Multi-step lead magnet (RHF + Zod)
│   │   │   ├── DestinationsGrid.tsx  # Country cards with tuition, PSW rights & filters
│   │   │   ├── ProcessRoadmap.tsx    # 5-step visual roadmap with document checklists
│   │   │   ├── ServicesSection.tsx   # 6 core services with interactive highlights
│   │   │   ├── SuccessStories.tsx    # Testimonial slider with visa badges & Google Reviews
│   │   │   └── StudentPortalPreview.tsx # Live interactive dashboard simulation
│   │   ├── modals/
│   │   │   ├── ConsultationModal.tsx # Booking modal with date/time slots
│   │   │   ├── AuthModal.tsx         # Student Login modal with 1-click demo login
│   │   │   └── EligibilityResultModal.tsx # Custom university recommendations
│   │   └── common/
│   │       └── FloatingWhatsApp.tsx  # Floating WhatsApp button with chat popover
│   ├── data/
│   │   └── mockData.ts               # Complete dataset for destinations, testimonials, services, portal
│   └── lib/
│       ├── types.ts                  # Comprehensive TypeScript interfaces
│       └── utils.ts                  # Class merger and calculation logic
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```
