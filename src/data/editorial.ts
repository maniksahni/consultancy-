export const comparisonCriteria = [
  {
    factor: "Admissions Counselor Assigned",
    agency: "Passed between unvetted telecallers and rotating sales reps",
    pathways: "Single dedicated Senior Mentor managing your entire journey",
    detail: "A consistent mentor knows the context behind your shortlist, application, and visa documents. You can bring questions back to someone familiar with your goals and earlier decisions instead of retelling your profile at each step.",
  },
  {
    factor: "University Recommendations",
    agency: "Partner colleges selected for recruiter commission kickbacks",
    pathways: "100% unbiased shortlisting based on your academic ROI & goals",
    detail: "Programs are discussed against your academic background, budget, and career aims. You can understand why an option belongs on the shortlist before investing time in an application.",
  },
  {
    factor: "SOP & LOR Editorial Quality",
    agency: "Generic templates and ChatGPT drafts flagged by AI screeners",
    pathways: "Line-by-line narrative crafting highlighting your unique story",
    detail: "The mentor reviews the experiences and evidence behind your statement and recommendation materials. You draft, receive specific edits, and check that the final wording reflects your own experience.",
  },
  {
    factor: "Consular Visa Preparation",
    agency: "A generic PDF checklist sent right before your appointment",
    pathways: "1-on-1 mock consular grilling until your answers are bulletproof",
    detail: "Preparation includes reviewing documents and practicing how to explain your study plan and funding where an interview applies. The mentor can identify answers that need clarity; the visa authority makes the final decision.",
  },
  {
    factor: "Communication & Accountability",
    agency: "Slow ticketing systems and ghosting post-payment",
    pathways: "Direct WhatsApp line, strategy calls, and weekly check-ins",
    detail: "Direct contact and planned check-ins give you a place to raise blockers as documents and applications progress. You can track what needs your input and what is being reviewed next.",
  },
] as const;

export const admissionsStages = [
  {
    number: "01", title: "Profile Audit & Goal Alignment", subtitle: "Deep Dive into GPA, Budget & Career ROI",
    deliverable: "Diagnostic Dossier & Financial Roadmap",
    happens: "Your academic record, finances, and career goals are reviewed together to establish admissions targets.",
    mentor: "Examines the profile and discusses possible targets and financial considerations.",
    student: "Bring academic history, relevant gap or backlog context, budget considerations, and career goals.",
    timing: "The starting stage; duration depends on when the information for the review is available.",
  },
  {
    number: "02", title: "Strategic Shortlisting", subtitle: "Safe, Target & Ambitious University Matrix",
    deliverable: "Personalized University Shortlist Matrix",
    happens: "Programs are compared against your profile, goals, budget, and application requirements.",
    mentor: "Explains the reasoning behind the options and helps organize application priorities.",
    student: "Review the proposed options and share preferences or constraints that affect where you will apply.",
    timing: "Follows the profile audit, with time for review before the relevant application deadlines.",
  },
  {
    number: "03", title: "Application & Essay Mastery", subtitle: "Compelling Narrative with 0% AI Detection",
    deliverable: "Polished SOPs & Finalised Application Portals",
    happens: "Application materials are drafted, reviewed, and revised against selected program requirements.",
    mentor: "Provides editorial feedback on the SOP, LOR materials, and CV, and reviews applications before submission.",
    student: "Prepare academic documents, a CV, personal examples, and requested application information; check final materials for accuracy.",
    timing: "Takes place ahead of each program deadline and varies with document readiness.",
  },
  {
    number: "04", title: "Embassy Visa Preparation", subtitle: "Document Scrutiny & Consular Mock Simulations",
    deliverable: "Foolproof Visa Dossier & Mock Certification",
    happens: "The visa document set is reviewed and interview answers are practiced where an interview applies.",
    mentor: "Checks the consistency of the study plan and supporting documents, then works through mock questions.",
    student: "Provide current financial, identity, and admission documents and truthful details about your plans.",
    timing: "Begins when the destination's visa requirements are known; appointment and official processing times vary.",
  },
] as const;

export const studentOutcomes = [
  { initials: "A.I.", country: "USA", program: "MS in Data Science", university: "Columbia University", stats: "7.8 CGPA · GRE 322 · Duolingo 125", outcome: "Visa Approved on 1st Attempt (214(b) Refusal Overcome)", intake: "Fall Intake", ref: "REF: CU-0824", narrative: "A.I. pursued an MS in Data Science at Columbia University with the academic and test profile recorded here. The case file notes a prior 214(b) refusal and the visa result shown below." },
  { initials: "K.D.", country: "Germany", program: "MSc Automotive Engineering", university: "Technical University of Munich (TUM)", stats: "8.2 CGPA · APS India Verified · IELTS 7.0", outcome: "€0 Tuition Public Admit · ₹35L+ Tuition Saved", intake: "Winter Intake", ref: "REF: TUM-1024", narrative: "K.D. applied for MSc Automotive Engineering at the Technical University of Munich. The recorded profile includes APS India verification and IELTS evidence; the outcome card reports the public university admit and tuition result." },
  { initials: "S.K.", country: "United Kingdom", program: "MSc International Business", university: "University of Manchester", stats: "7.1 CGPA · 2-Yr Gap Justified · MOI Waiver", outcome: "£8,000 Dean's Merit Award · Visa in 5 Days", intake: "Autumn Intake", ref: "REF: UOM-0924", narrative: "S.K.'s application to the University of Manchester included an explained education gap and an MOI waiver. The case record reports the merit award and visa result listed below." },
  { initials: "R.B.", country: "Canada", program: "MEng Electrical & Computer Eng", university: "University of Toronto", stats: "8.4 CGPA · IELTS 7.5 · SDS Stream", outcome: "Direct Study Permit Approval in 18 Days", intake: "Winter Intake", ref: "REF: UOT-0125", narrative: "R.B. pursued the MEng Electrical & Computer Eng program at the University of Toronto. The file records the academic and IELTS profile, SDS stream, and study permit result." },
  { initials: "M.N.", country: "Ireland", program: "MSc Business Analytics", university: "Trinity College Dublin", stats: "7.6 CGPA · Duolingo 120 · 1-Yr Fast-Track", outcome: "AVATS Visa Approved in 12 Days · €4,000 Grant", intake: "Autumn Intake", ref: "REF: TCD-0924", narrative: "M.N. pursued MSc Business Analytics at Trinity College Dublin through the recorded fast-track route. The outcome card reports a grant and AVATS visa approval." },
  { initials: "T.J.", country: "Australia", program: "Master of Information Technology", university: "UNSW Sydney (Go8)", stats: "7.9 CGPA · PTE 68 · Subclass 500", outcome: "Genuine Student (GS) Statement Approved (No Interview)", intake: "Semester 1", ref: "REF: UNSW-0225", narrative: "T.J. pursued the Master of Information Technology at UNSW Sydney. The profile records PTE evidence and the Subclass 500 route; the case file reports the Genuine Student statement result without an interview." },
] as const;

export const faqItems = [
  { category: "Fiduciary Model", question: "How is Pathways Global different from other consultancies?", answer: "Pathways Global describes its service as direct, individual mentorship with recommendations based on a student's academic profile, budget, and career goals. A dedicated mentor helps connect the shortlist, application materials, and visa preparation." },
  { category: "Mentorship Scope", question: "What does the 1-on-1 mentorship include?", answer: "The service covers profile review, university shortlisting, feedback on application materials, and preparation for visa requirements and interviews where applicable. The exact work depends on the student's destination, chosen programs, and agreed scope." },
  { category: "Investment & Terms", question: "How much does mentorship cost?", answer: "Pricing depends on the scope of support discussed for your profile and destination. Ask for the applicable fee, deliverables, and terms in writing during the discovery conversation before deciding whether to proceed." },
  { category: "Consular Strategy", question: "What if my visa gets rejected or I have previous refusals?", answer: "A previous refusal should be disclosed and reviewed alongside its stated reason and current documents. A mentor can help identify what needs clarification before another application, while the visa authority makes the decision." },
  { category: "Integrity & Standards", question: "Do you guarantee admission or visa approval?", answer: "No. Universities decide admissions, and the relevant government authority decides visa applications. Mentorship can help you prepare accurate materials; it cannot guarantee either outcome." },
  { category: "Timeline & Runway", question: "How long does the entire admissions process take?", answer: "The time required varies by program deadlines, document readiness, university decisions, and visa procedures. Starting early leaves room for review; discuss your target intake and current documents with a mentor to plan next steps." },
] as const;
