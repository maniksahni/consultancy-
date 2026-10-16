export type CareerRole = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  qualifications: string[];
  skills: string[];
  language: string;
  searchTerms: string;
};

export type OpportunityType = "job" | "internship" | "work-study";

export const careerRoles: CareerRole[] = [
  { slug: "software-developer", title: "Software developer", sector: "Technology", summary: "Build and maintain web, mobile or business software with a team.", qualifications: ["Relevant degree, diploma or a portfolio demonstrating equivalent ability", "Projects or experience that show production-quality work"], skills: ["One or more languages such as JavaScript, Python, Java or C#", "Testing, version control and clear technical communication"], language: "Use the language named in the advert; local-language ability can broaden customer-facing options.", searchTerms: "software developer" },
  { slug: "data-analyst", title: "Data analyst", sector: "Technology", summary: "Turn business data into clear analysis and decisions.", qualifications: ["Degree or demonstrated experience in analytics, business, statistics or a related field", "Work samples showing a question, method and result"], skills: ["SQL and spreadsheets; Python or R for many roles", "Visualisation, data quality and explaining findings"], language: "Check the advert for stakeholder language and any local-language requirement.", searchTerms: "data analyst" },
  { slug: "cybersecurity-analyst", title: "Cybersecurity analyst", sector: "Technology", summary: "Help organisations monitor, assess and respond to security risks.", qualifications: ["IT, security or related training; equivalent hands-on experience may count", "Some roles require background checks or security clearance"], skills: ["Networking, operating systems and incident response", "Risk documentation and careful escalation"], language: "Clear written communication is essential; confirm language and clearance rules in each advert.", searchTerms: "cybersecurity analyst" },
  { slug: "mechanical-engineer", title: "Mechanical engineer", sector: "Engineering", summary: "Design, test or improve mechanical products, systems and processes.", qualifications: ["Accredited engineering qualification or an accepted equivalent", "Professional registration may be needed for particular responsibilities"], skills: ["CAD, engineering analysis and design documentation", "Safety, testing and cross-functional teamwork"], language: "Technical and workplace language requirements vary by employer and regulated scope.", searchTerms: "mechanical engineer" },
  { slug: "civil-engineer", title: "Civil engineer", sector: "Engineering", summary: "Plan and deliver infrastructure, buildings and construction projects.", qualifications: ["Civil engineering qualification recognised by the employer or regulator", "Relevant site experience can be required for delivery roles"], skills: ["Design codes, project coordination and technical reporting", "Health, safety and environmental practice"], language: "Confirm local codes, registration and site-language requirements for the location.", searchTerms: "civil engineer" },
  { slug: "nurse", title: "Registered nurse", sector: "Healthcare", summary: "Provide clinical care as part of a regulated healthcare team.", qualifications: ["Nursing qualification accepted by the destination regulator", "Registration, credential checks and clinical-language evidence may be required"], skills: ["Patient assessment, care planning and accurate records", "Team communication and safe clinical judgement"], language: "Regulated language tests and registration rules differ by country; check the regulator before applying.", searchTerms: "registered nurse" },
  { slug: "healthcare-assistant", title: "Healthcare assistant", sector: "Healthcare", summary: "Support patients with daily care under a clinical team's direction.", qualifications: ["Relevant care training or experience, where specified", "Background checks and role-specific safeguarding checks are common"], skills: ["Compassionate care, observation and reliable documentation", "Safe moving and handling, teamwork and boundaries"], language: "Strong communication with patients and colleagues is usually central to the role.", searchTerms: "healthcare assistant" },
  { slug: "financial-analyst", title: "Financial analyst", sector: "Finance", summary: "Analyse financial performance, forecasts and investment or business decisions.", qualifications: ["Finance, accounting, economics or related degree or equivalent experience", "Some employers prefer or require professional qualifications"], skills: ["Financial modelling, spreadsheets and accounting fundamentals", "Accuracy, concise reporting and commercial judgement"], language: "Confirm reporting language, local accounting knowledge and any regulated duties.", searchTerms: "financial analyst" },
  { slug: "business-analyst", title: "Business analyst", sector: "Business", summary: "Connect business needs with process, product or technology changes.", qualifications: ["Business, technology or related background, or evidence of equivalent work", "Examples of requirements or process improvement work"], skills: ["Stakeholder interviews, process mapping and structured analysis", "Writing clear requirements and facilitating decisions"], language: "The language used by stakeholders and clients will usually be explicit in the advert.", searchTerms: "business analyst" },
  { slug: "marketing-specialist", title: "Digital marketing specialist", sector: "Marketing", summary: "Plan and measure campaigns across search, social, content or email.", qualifications: ["Relevant training or a track record of measurable campaign work", "Portfolio with goals, actions and outcomes"], skills: ["Channel tools, analytics and audience research", "Writing, experimentation and performance reporting"], language: "Writing fluency in the target market's language can be a key selection requirement.", searchTerms: "digital marketing specialist" },
  { slug: "project-manager", title: "Project manager", sector: "Business", summary: "Coordinate scope, people, risks, schedule and delivery outcomes.", qualifications: ["Relevant project delivery experience; certifications may be preferred", "Evidence of project scale, ownership and outcomes"], skills: ["Planning, risk management and stakeholder updates", "Budget awareness, prioritisation and problem solving"], language: "Client-facing roles may require local-language fluency; check travel and work-location terms.", searchTerms: "project manager" },
  { slug: "ux-designer", title: "UX / product designer", sector: "Design", summary: "Research user needs and shape accessible digital product experiences.", qualifications: ["Design, research or equivalent practical experience", "Portfolio showing process, decisions and impact"], skills: ["User research, prototyping and interaction design", "Accessibility, collaboration and design systems"], language: "Include research and writing samples in the language requested by the employer.", searchTerms: "UX designer" },
  { slug: "teacher", title: "School teacher", sector: "Education", summary: "Plan learning and support students in a school or education setting.", qualifications: ["Teaching qualification recognised by the destination jurisdiction", "Registration, safeguarding and background checks may apply"], skills: ["Curriculum planning, assessment and classroom practice", "Inclusive communication with students and families"], language: "Teaching language, local registration and safeguarding requirements must be checked for each role.", searchTerms: "school teacher" },
  { slug: "hospitality-manager", title: "Hospitality supervisor / manager", sector: "Hospitality", summary: "Lead service teams and coordinate guest experience and daily operations.", qualifications: ["Hospitality experience; formal training varies by employer", "Evidence of team leadership and service standards"], skills: ["Scheduling, customer care and operational problem solving", "Food safety or venue-specific certificates where applicable"], language: "Customer-facing language skills and shift availability are commonly listed requirements.", searchTerms: "hospitality supervisor" },
  { slug: "supply-chain-analyst", title: "Supply chain analyst", sector: "Operations", summary: "Improve purchasing, inventory, logistics and supply-chain performance.", qualifications: ["Supply chain, operations, engineering or analytics background", "Relevant systems or sector experience can be requested"], skills: ["Excel/SQL, forecasting and performance metrics", "Supplier coordination and process improvement"], language: "Check local-language, trade-compliance and location requirements in the full advert.", searchTerms: "supply chain analyst" },
  { slug: "research-assistant", title: "Research assistant", sector: "Research", summary: "Support research projects through data, laboratory or field work.", qualifications: ["Relevant subject degree or equivalent research experience", "Ethics, lab or safeguarding training when the project requires it"], skills: ["Research methods, accurate records and data handling", "Subject-specific tools and clear reporting"], language: "Academic and participant-facing language requirements depend on the research project.", searchTerms: "research assistant" },
];

/** Opportunity pathways that can suit each role; these are guides, not live vacancies. */
export const careerRoleTypes: Record<string, OpportunityType[]> = {
  "software-developer": ["job", "internship", "work-study"],
  "data-analyst": ["job", "internship", "work-study"],
  "cybersecurity-analyst": ["job", "internship", "work-study"],
  "mechanical-engineer": ["job", "internship", "work-study"],
  "civil-engineer": ["job", "internship", "work-study"],
  nurse: ["job", "internship", "work-study"],
  "healthcare-assistant": ["job", "internship", "work-study"],
  "financial-analyst": ["job", "internship", "work-study"],
  "business-analyst": ["job", "internship", "work-study"],
  "marketing-specialist": ["job", "internship", "work-study"],
  "project-manager": ["job", "internship"],
  "ux-designer": ["job", "internship", "work-study"],
  teacher: ["job", "internship", "work-study"],
  "hospitality-manager": ["job", "internship", "work-study"],
  "supply-chain-analyst": ["job", "internship", "work-study"],
  "research-assistant": ["job", "internship", "work-study"],
};

export const opportunityTypeLabels: Record<OpportunityType, string> = {
  job: "Jobs",
  internship: "Internships / stages",
  "work-study": "Alternance / work-study",
};

