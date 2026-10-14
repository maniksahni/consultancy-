export interface StudentReview {
  id: string;
  studentName: string;
  city: string;
  university: string;
  program: string;
  degree: string;
  flag: string;
  country: string;
  stats: string;
  scholarshipOrSaving: string;
  outcome: string;
  intake: string;
  review: string;
  highlight: string;
}

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: "sr-1",
    studentName: "Aditi Sharma",
    city: "New Delhi",
    university: "ESSEC Business School, Paris",
    program: "Master in Management (MiM) - Grande École",
    degree: "Top Grande École",
    flag: "🇫🇷",
    country: "France",
    stats: "8.2 CGPA · GMAT 710 · IELTS 7.5",
    scholarshipOrSaving: "Charpak Master's Scholarship (€700/mo) + 20% Tuition Waiver",
    outcome: "Admitted & Long-Stay Student Visa Approved in 8 Days",
    intake: "Fall 2025",
    highlight: "Charpak Scholarship & Direct Grande École Admit",
    review: "Navigating the Etudes en France portal and Campus France interview seemed overwhelming until I started working with Harshita. She did line-by-line editorial polishing on my motivation letter, highlighting my analytical consulting background, and coached me for the consular interview so thoroughly that the officer didn't have a single query. Got admitted to ESSEC with a Charpak scholarship!",
  },
  {
    id: "sr-2",
    studentName: "Rohan Deshpande",
    city: "Pune",
    university: "Sorbonne Université, Paris",
    program: "Master in Computer Science (Artificial Intelligence)",
    degree: "Public Tier-1 University",
    flag: "🇫🇷",
    country: "France",
    stats: "8.4 CGPA · French DELF B1 · IELTS 7.0",
    scholarshipOrSaving: "€243/year Nominal Public Tuition · Saved ₹30L+",
    outcome: "Public Admit + CROUS University Housing in Paris",
    intake: "Autumn 2025",
    highlight: "€243/yr Public Tuition & CROUS Housing Allocated",
    review: "Every mass agency in India tried to push private colleges that pay recruiter kickbacks. Harshita was the only mentor who gave me 100% unbiased guidance. She identified public English-taught AI programmes at Sorbonne, refined my Statement of Purpose, and guided my CROUS student housing dossier in Paris. Saved my family over 30 Lakhs!",
  },
  {
    id: "sr-3",
    studentName: "Kavya Sundaram",
    city: "Bengaluru",
    university: "HEC Paris",
    program: "Master in Financial Economics",
    degree: "Grande École #1 in Europe",
    flag: "🇫🇷",
    country: "France",
    stats: "8.6 CGPA · GRE 326 · 1.5 Yr Experience",
    scholarshipOrSaving: "€12,000 HEC Foundation Merit Fellowship",
    outcome: "Grande École Admit + VFS Long-Stay Visa in 5 Days",
    intake: "Sept 2025",
    highlight: "€12,000 Merit Fellowship & Top European Ranking",
    review: "Harshita's personal experience of living and studying in France was invaluable. She worked through 4 drafts of my academic essays to bring out my leadership voice and ensure zero generic AI phrasing. Her mock interviews were sharp, challenging, and realistic. Securing HEC Paris with a €12,000 scholarship was a dream come true!",
  },
  {
    id: "sr-4",
    studentName: "Arjun Menon",
    city: "Kochi",
    university: "EDHEC Business School, Lille/Nice",
    program: "MSc in Global & Sustainable Business",
    degree: "Triple-Accredited Business School",
    flag: "🇫🇷",
    country: "France",
    stats: "7.4 CGPA · 2-Yr Career Gap Justified · TOEFL 104",
    scholarshipOrSaving: "30% Early Bird & Merit Tuition Waiver (€7,200)",
    outcome: "Admitted & Visa Dispatched in 6 Days",
    intake: "Autumn 2025",
    highlight: "2-Year Career Hiatus Justified + 30% Fee Waiver",
    review: "I had a 2-year career gap that other consultancies considered a major liability. Harshita helped me build a bridge narrative connecting my sabbatical work with EDHEC's sustainability focus. The visa dossier was so immaculate that my passport returned stamped in under a week without any queries.",
  },
  {
    id: "sr-5",
    studentName: "Meera Sen",
    city: "Kolkata",
    university: "Sciences Po Paris",
    program: "Master in International Governance & Diplomacy (PSIA)",
    degree: "Institute of Political Studies",
    flag: "🇫🇷",
    country: "France",
    stats: "8.1 CGPA · English Literature Major · IELTS 8.0",
    scholarshipOrSaving: "Direct Admit to Top Policy School worldwide",
    outcome: "Admit Confirmed & French Student Visa Stamped",
    intake: "Fall 2025",
    highlight: "Direct Admit to Sciences Po School of International Affairs",
    review: "Applying to Sciences Po requires a very specific intellectual and argumentative essay style that typical agencies don't understand. Harshita knew the exact expectations of French admissions juries. Her critique was rigorous, constructive, and transformative. Forever grateful!",
  },
  {
    id: "sr-6",
    studentName: "Varun Grover",
    city: "Delhi NCR",
    university: "Institut Polytechnique de Paris (IP Paris)",
    program: "Master in Cybersecurity & Cloud Engineering",
    degree: "Premier Engineering Faculty",
    flag: "🇫🇷",
    country: "France",
    stats: "7.9 CGPA · B.Tech ECE · Duolingo 125",
    scholarshipOrSaving: "€4,000 Corporate Tech Fellowship",
    outcome: "Direct Engineering Admit + French Visa Clearance",
    intake: "Winter 2025",
    highlight: "French National Engineering Admit + €4,000 Fellowship",
    review: "From mapping Indian engineering credits to preparing financial attestations for France-Visas, Harshita was accessible on WhatsApp at every critical juncture. Having a dedicated mentor who has actually walked the path in France makes all the difference.",
  },
];
