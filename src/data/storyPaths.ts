/** Situations students bring to a first call, each matched to a real story and the guide chapters that help most. */
export type StoryPath = { id: string; situation: string; worry: string; reviewId: string; chapters: string[] };

export const storyPaths: StoryPath[] = [
  { id: "scholarship", situation: "I need a scholarship", worry: "Can I afford France without funding?", reviewId: "aditi-essec", chapters: ["scholarships", "sop-lor-cv", "campus-france"] },
  { id: "low-fees", situation: "I want low tuition fees", worry: "Are there good universities that don’t cost a fortune?", reviewId: "rohan-sorbonne", chapters: ["costs", "education-system", "living"] },
  { id: "top-school", situation: "I’m aiming for a top business school", worry: "Is a school like HEC or ESSEC realistic for me?", reviewId: "kavya-hec", chapters: ["admissions", "sop-lor-cv", "scholarships"] },
  { id: "gap", situation: "I have a gap in my studies", worry: "Will a gap year or change of field count against me?", reviewId: "arjun-edhec", chapters: ["sop-lor-cv", "admissions", "funding-loans"] },
  { id: "engineering", situation: "I’m an engineer (B.Tech / B.E.)", worry: "Which French master’s fits my engineering degree?", reviewId: "varun-ip-paris", chapters: ["education-system", "campus-france", "jobs"] },
  { id: "policy", situation: "I’m into policy or social sciences", worry: "How do I build a dossier for a selective programme?", reviewId: "meera-sciences-po", chapters: ["admissions", "sop-lor-cv", "language-tests"] },
];
