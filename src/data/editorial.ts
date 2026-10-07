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
  { category: "Getting started", question: "How is Study with Harshita different from other consultancies?", answer: "You work with a dedicated mentor who connects your academic profile, budget, and career goals to your university shortlist, applications, and visa preparation. Recommendations are presented as independent guidance, with zero recruiter commissions. During your first conversation, ask how each recommendation fits your goals and what support is included.", checklist: ["Discuss your academic background and career direction.", "Compare programs on fit, cost, and requirements.", "Agree on deliverables before beginning."] },
  { category: "Getting started", question: "What should I bring to my first strategy conversation?", answer: "Bring the information you already have. You do not need a completed application to start. Your mentor can use the conversation to identify missing documents and help you organize your next steps.", checklist: ["Your grades or transcripts and a current CV.", "Preferred subjects, destinations, and target intake.", "A realistic budget and any existing test results.", "Details of previous applications or refusals, if relevant."] },
  { category: "Getting started", question: "Can I get support if I have already started applying?", answer: "Yes, you can discuss support for your current stage rather than restarting everything. Share which applications are submitted, which deadlines are upcoming, and what materials you have prepared. The mentor can then explain which remaining tasks can be included in an agreed scope.", checklist: ["List submitted and pending applications.", "Share your current shortlist and drafts.", "Identify urgent deadlines and unanswered questions."] },
  { category: "Mentorship", question: "What does the one-to-one mentorship include?", answer: "Support can cover profile review, university shortlisting, editorial feedback on application materials, and visa document and interview preparation where applicable. The precise deliverables depend on your destination, chosen programs, and agreed service scope.", checklist: ["Profile review and program comparison.", "Feedback on your SOP, CV, and recommendation materials.", "Application readiness and document review.", "Visa preparation and next-step planning."] },
  { category: "Mentorship", question: "How will I communicate with my mentor?", answer: "The service describes direct contact, strategy calls, and planned check-ins. Agree on the communication channel, review schedule, and expected response times before beginning. Use your check-ins to resolve blockers, review feedback, and confirm upcoming tasks.", checklist: ["Confirm how calls and document reviews are scheduled.", "Keep an updated list of questions and deadlines.", "Ask who to contact when a deadline becomes urgent."] },
  { category: "Mentorship", question: "Will you write my personal statement for me?", answer: "Your statement should reflect your own experience and ambitions. Mentorship provides feedback on structure, clarity, evidence, and relevance to the chosen program. You remain responsible for the accuracy of your materials and for following each institution’s authorship and tool-use requirements.", checklist: ["Start with your actual projects, achievements, and goals.", "Use specific examples rather than generic claims.", "Review every final document before submission."] },
  { category: "Applications", question: "How do we choose the right universities?", answer: "A useful shortlist balances your academic background, subject interests, budget, and career direction. Compare the course itself alongside entry requirements, location, costs, and deadlines. Ambitious, target, and safer options help organize priorities; none is a promise of admission.", checklist: ["Check curriculum and entry requirements for each program.", "Compare total costs and funding options.", "Record deadlines and required documents."] },
  { category: "Applications", question: "Can I apply with study gaps, backlogs, or a lower GPA?", answer: "These circumstances need to be considered in the context of the individual program. Share your full academic history and any relevant work or learning during a gap. A mentor can help you identify suitable options and present factual context, but eligibility and admission remain with the institution.", checklist: ["Bring a complete academic record.", "Explain gaps honestly with supporting evidence where available.", "Check the specific requirements of each shortlisted program."] },
  { category: "Applications", question: "Do I need IELTS, TOEFL, PTE, GRE, or GMAT?", answer: "Required tests depend on the institution, program, and application route. Some programs consider alternative evidence or waivers, while others require a named test. Check the official requirements for each choice before booking an exam or relying on a waiver.", checklist: ["Record the accepted tests for each program.", "Check score requirements and result validity.", "Confirm any waiver directly with the institution."] },
  { category: "Applications", question: "Which documents should I start organizing?", answer: "A starting folder can contain your academic records, identity documents, CV, test results, and relevant work or project evidence. Application, scholarship, and visa requirements differ, so use each official checklist to decide what is actually required.", checklist: ["Academic transcripts and certificates.", "A current CV and draft statement of purpose.", "Test results and referee contact information.", "Funding information for later financial planning."] },
  { category: "Costs & funding", question: "How much does mentorship cost?", answer: "Fees depend on the support agreed for your profile and destination. Request a written quote before proceeding so you can compare the service scope with your needs. Confirm what happens if your shortlist or application plan changes.", checklist: ["Ask for deliverables and service fees in writing.", "Confirm payment milestones and cancellation terms.", "Clarify whether additional reviews or applications cost extra."] },
  { category: "Costs & funding", question: "What costs should I budget for beyond tuition?", answer: "Build a budget that accounts for the full journey rather than tuition alone. Costs vary by destination and personal circumstances, and any estimate should be checked against current university and official information before you commit.", checklist: ["Living costs, housing deposits, and travel.", "Application fees, tests, and document preparation.", "Visa-related fees and insurance where required.", "A contingency allowance for unexpected expenses."] },
  { category: "Costs & funding", question: "Can you help me explore scholarships?", answer: "You can discuss scholarship research and application preparation within your service scope. Compare eligibility, deadlines, required statements, and award conditions. Funding decisions belong to the awarding organization, so plan a budget that does not depend on an unconfirmed scholarship.", checklist: ["Check university and external funding opportunities.", "Record scholarship deadlines separately from admissions deadlines.", "Read award conditions and renewal requirements."] },
  { category: "Visas & timing", question: "What if I have a previous visa refusal?", answer: "Share the refusal notice and the information submitted previously. Reviewing the stated reasons alongside your current circumstances helps identify what requires clarification before another application. Provide accurate information and disclose prior refusals as required; a mentor cannot guarantee a different decision.", checklist: ["Keep the official refusal notice.", "Review the consistency of your study plan and documents.", "Discuss whether specialist immigration advice is needed."] },
  { category: "Visas & timing", question: "Do you guarantee admission or visa approval?", answer: "No. Universities make admissions decisions, and the relevant government authority decides visa applications. The role of mentorship is to help you prepare accurate, coherent materials and understand the next steps. A previous student’s result does not guarantee your outcome.", checklist: ["Treat admission and visa decisions as separate milestones.", "Check all materials for accuracy before submission.", "Keep alternative options in your application plan."] },
  { category: "Visas & timing", question: "When should I start, and how long will the process take?", answer: "Start once you have a target subject and intake in mind. Your schedule depends on program deadlines, document readiness, test availability, university decisions, and visa procedures. A mentor can help work backwards from your deadlines and prioritize the tasks you can complete now.", checklist: ["Identify your earliest application deadline.", "Allow time for tests, references, and document revisions.", "Plan separately for admissions decisions and visa preparation.", "Review your timeline when official requirements change."] },
] as const;
