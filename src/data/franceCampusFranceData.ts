export type InterviewQuestion = {
  question: string;
  category: "Motivation" | "Academics" | "Career Plan" | "Finances & Lifestyle";
  whatInterviewerWants: string;
  sampleWinningAnswer: string;
};

export const campusFranceInterviewQuestions: InterviewQuestion[] = [
  {
    question: "Why did you choose France instead of the UK, USA, or Canada?",
    category: "Motivation",
    whatInterviewerWants: "They want to know you made a deliberate choice based on France's academic excellence, subsidized tuition rates, and international exposure, rather than just choosing randomly.",
    sampleWinningAnswer: "France offers world-renowned academic prestige—particularly in my field where institutions like Paris-Saclay and Sorbonne are globally celebrated. Unlike other countries where tuition costs exceed €30,000 to €50,000 per year, France invests heavily in higher education, keeping tuition fair and accessible. Furthermore, France's bilateral 2-year post-study work visa (APS) and its central position in the European single market offer unmatched career opportunities in multinational firms."
  },
  {
    question: "Why this specific university and this specific Master's curriculum?",
    category: "Academics",
    whatInterviewerWants: "Evidence that you actually read the course syllabus, researched specific professors, and understand the 120 ECTS modular structure.",
    sampleWinningAnswer: "I chose this Master's at Université Paris-Saclay because of its specialized curriculum in Machine Learning and Deep Learning architectures. Specifically, the modules on Reinforcement Learning and the 6-month mandatory research internship directly match my academic ambitions. Additionally, Paris-Saclay's tight integration with research hubs like INRIA provides unparalleled hands-on laboratory experience that standard classroom degrees cannot match."
  },
  {
    question: "What is your concrete post-study career plan after graduation?",
    category: "Career Plan",
    whatInterviewerWants: "A realistic, structured career roadmap. Campus France wants candidates who will successfully utilize their education to secure professional employment or pursue doctoral research.",
    sampleWinningAnswer: "Upon completing my 2-year Master's, I intend to utilize the 2-Year Post-Study Work Visa (APS/RECE) to work as an AI / Data Science Specialist in a technology enterprise or innovation hub in Paris, such as Capgemini or Mistral AI. In the longer term (3–5 years), I plan to leverage this international European experience to lead cross-border analytics teams bridging European and international operations."
  },
  {
    question: "How are you financing your studies and living expenses in France?",
    category: "Finances & Lifestyle",
    whatInterviewerWants: "Clear proof of financial stability meeting or exceeding the official French government threshold of €615/month for at least 12 months.",
    sampleWinningAnswer: "My studies are fully supported through a family financial commitment and a dedicated education loan from a nationalized bank covering €12,000 for living expenses, alongside pre-allocated funds for tuition. Furthermore, my monthly living costs will be partially subsidized through the French government CAF housing aid (APL), and I am also an eligible candidate for merit scholarship consideration."
  },
  {
    question: "Do you speak French, or how do you plan to adapt to living in France?",
    category: "Finances & Lifestyle",
    whatInterviewerWants: "Respect for French culture and awareness of daily living outside of English-taught lecture halls.",
    sampleWinningAnswer: "While my degree is taught 100% in English, I have already begun learning conversational French via Alliance Française / online courses and am currently at A1 level. I am eager to immerse myself in French culture, practice with local students, and achieve B1 fluency by the end of my first year, which will also enhance my daily integration and future internship prospects."
  }
];

export const eefChecklistItems = [
  { id: "doc-pass", title: "Valid Passport (Minimum 18 months validity)", required: true, category: "Identity" },
  { id: "doc-photo", title: "Recent Passport-sized Photographs (French Schengen format)", required: true, category: "Identity" },
  { id: "doc-deg", title: "Original Degree Certificates & Consolidated Transcripts", required: true, category: "Academic" },
  { id: "doc-eng", title: "English Language Proficiency Certificate (IELTS / TOEFL / MOI Letter)", required: true, category: "Academic" },
  { id: "doc-cv", title: "Curriculum Vitae in French standard layout (1-2 pages)", required: true, category: "Professional" },
  { id: "doc-sop", title: "Tailored Statement of Purpose (SOP / Projet d'études)", required: true, category: "Professional" },
  { id: "doc-lor", title: "Two Academic Letters of Recommendation (on official letterhead)", required: true, category: "Academic" },
  { id: "doc-offer", title: "Official Admission Acceptance Letter / Attestation d'admission", required: true, category: "Admission" },
  { id: "doc-bank", title: "Bank Account Statements (Past 3 months) showing min €7,380 or Loan Sanction Letter", required: true, category: "Financial" },
  { id: "doc-stay", title: "Proof of Accommodation for first 3 months (CROUS / Attestation d'hébergement)", required: true, category: "Logistics" }
];
