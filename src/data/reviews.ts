export interface StudentReview {
  id: string;
  initials: string;
  badge: string;
  name: string;
  location: string;
  stage: string;
  topic: string;
  quote: string;
  detail: string;
  takeaway: string;
  outcome: string;
}

export const sampleReviews: StudentReview[] = [
  {
    id: "aditi-essec",
    initials: "AS",
    badge: "ESSEC Business School",
    name: "Aditi Sharma",
    location: "New Delhi",
    stage: "Grande École",
    topic: "Master in Management (MiM)",
    quote:
      "I was overwhelmed by the French essay requirements and campus interview nuances. Harshita broke down the entire ESSEC application into weekly milestones. Her feedback on my motivation letter was surgical, and having mock interviews with someone who actually lived in France made all the difference. Securing the Charpak scholarship was the icing on the cake!",
    detail: "ESSEC Business School (MiM) · Charpak Scholarship (€700/mo)",
    takeaway: "From profile building to Charpak scholarship in 4 months.",
    outcome: "Admit accepted · VFS Long-Stay Student Visa stamped in 8 days",
  },
  {
    id: "rohan-sorbonne",
    initials: "RD",
    badge: "Sorbonne Université",
    name: "Rohan Deshpande",
    location: "Pune",
    stage: "Public University",
    topic: "MSc Computer Science & AI",
    quote:
      "Most consultancies pushed me towards private colleges with high commissions. Althéa was the only team that genuinely helped me target top French public universities with tuition under €250/year. They guided my Mon Master dossier, helped with apostille translations, and even advised me on securing CROUS student housing in Paris.",
    detail: "Sorbonne Université · €243/yr Public Tuition · CROUS Housing Paris",
    takeaway: "Targeted public universities with near-zero tuition fees.",
    outcome: "Direct public admit · Campus France interview cleared on first attempt",
  },
  {
    id: "kavya-hec",
    initials: "KS",
    badge: "HEC Paris Admit",
    name: "Kavya Sundaram",
    location: "Bengaluru",
    stage: "Business & Finance",
    topic: "MSc International Finance",
    quote:
      "Securing an admit to HEC Paris felt out of reach given the selective acceptance rate. Harshita helped me connect my tech background to corporate finance in my SOP and coached me through three rounds of mock interviews. I also received a €12,000 merit-based tuition waiver. The personalized guidance was world-class.",
    detail: "HEC Paris (MSc International Finance) · €12,000 Merit Waiver",
    takeaway: "Cracked the top European business school with scholarship.",
    outcome: "HEC Paris Offer · VFS Visa cleared in 5 working days",
  },
  {
    id: "arjun-edhec",
    initials: "AM",
    badge: "EDHEC Business School",
    name: "Arjun Menon",
    location: "Kochi",
    stage: "Career Transition",
    topic: "MSc Marketing & Luxury Management",
    quote:
      "I had a 2-year career gap that worried me intensely for European visa and university interviews. The Althéa team helped me frame my freelancing and consulting work into a cohesive narrative for EDHEC. Their pre-departure briefing and advice on French banking saved me weeks of stress.",
    detail: "EDHEC Business School (Nice Campus) · 30% Early Bird Scholarship",
    takeaway: "Turned a 2-year gap into a compelling application strength.",
    outcome: "EDHEC Admit · Blocked account & French housing attestations sorted",
  },
  {
    id: "meera-sciences-po",
    initials: "MS",
    badge: "Sciences Po Paris",
    name: "Meera Sen",
    location: "Kolkata",
    stage: "Public Policy",
    topic: "Master in International Security (PSIA)",
    quote:
      "Applying to Sciences Po Paris requires exceptional analytical writing and philosophical rigor. Althéa helped me refine my writing samples and policy briefs. The visa guidance was equally bulletproof — our dossier had every single financial document and housing certificate in exact order.",
    detail: "Sciences Po Paris (PSIA) · French Student Visa Approved",
    takeaway: "Exceptional dossier preparation for competitive policy programs.",
    outcome: "Direct Grande École Admit · French Long-Stay Visa granted",
  },
  {
    id: "varun-ip-paris",
    initials: "VG",
    badge: "Télécom Paris",
    name: "Varun Grover",
    location: "Delhi NCR",
    stage: "Engineering & Tech",
    topic: "MSc Data Science & Engineering",
    quote:
      "Navigating the French engineering school ecosystem (Grandes Écoles d'Ingénieurs) is notoriously confusing from India. Althéa mapped out the exact equivalence for my Indian B.Tech degree, prepared my portfolio for Institut Polytechnique de Paris, and prepped me for the technical interview.",
    detail: "Télécom Paris (IP Paris) · Merit Tuition Grant",
    takeaway: "Seamless B.Tech to French Grande École engineering transition.",
    outcome: "Admit confirmed · Campus France & VFS completed smoothly",
  },
];
