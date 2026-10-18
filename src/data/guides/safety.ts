import type { GuideChapter } from "./types";
import { chapterPath } from "./paths";

/**
 * "Safety, wellbeing & emergencies" chapter for every destination: emergency numbers, mental-health support,
 * the Indian mission, scams that target students, discrimination and everyday safety. Checked October 2026.
 */
type SafetyChapter = Omit<GuideChapter, "reviewedAt">;

const slug = "safety-wellbeing";
const madad = { label: "MADAD · Ministry of External Affairs consular help", url: "https://madad.gov.in/" };
const indiaSteps = (mission: string) => ({ heading: "When to contact the Indian mission", checklist: [
  `${mission} issues emergency certificates if your passport is lost or stolen (report it to the police first and keep the report).`,
  "It helps in arrests, hospitalisation, a death, or when a student is missing; families in India can raise a request on the MEA's MADAD portal.",
  "It cannot pay your bills, get you out of a legal case or intervene in visa decisions of the host country.",
  "Save the mission's emergency number from its website in your phone before you fly, and register any address change with it if asked.",
] });

const chapters: Record<string, SafetyChapter> = {
  uk: {
    slug, path: chapterPath("uk", slug), label: "Safety, wellbeing & emergencies", eyebrow: "UK · CHAPTER 18",
    title: "Staying safe and well", accent: "in the UK.",
    seoTitle: "UK Student Safety & Emergency Help",
    description: "Emergency numbers, NHS 111, mental-health support, the High Commission of India, scams aimed at students and how to report hate crime in the UK.",
    summary: "Call 999 (or 112) in an emergency, 111 for urgent medical advice and 101 for police matters that are not urgent. Your university's wellbeing service and the free Samaritans line (116 123, 24 hours) are there if you struggle. The High Commission of India in London and consulates in Birmingham, Edinburgh and Belfast help with lost passports and serious trouble. The commonest problems for Indian students are scam calls pretending to be the Home Office or police, rental deposit fraud and fake job offers.",
    facts: [
      { label: "Emergency", value: "999 or 112" },
      { label: "Urgent medical advice", value: "111", note: "NHS, 24 hours" },
      { label: "Police, non-emergency", value: "101" },
      { label: "Samaritans", value: "116 123", note: "Free, 24 hours" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "Every UK university runs a free, confidential wellbeing or counselling service; book through your student portal. Your GP can refer you to NHS talking therapies, and in England you can also refer yourself. Homesickness, exam stress and money worries in the first term are normal and worth talking about early.",
        "If you feel unsafe or in crisis, call 999 or go to A&E. Samaritans answers 116 123 at any hour, free from any phone.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Calls or messages claiming to be the Home Office, UKVI or police, saying your visa is invalid and demanding payment. UKVI never asks for money by phone, gift cards or crypto.",
        "Rental fraud: a cheap room, a landlord who is \"abroad\" and asks for a deposit before a viewing. Pay only after a viewing and a contract; deposits must go into a government-approved protection scheme.",
        "Job offers that ask you to pay for training, or to receive and forward money (money mule work is a crime and can end your visa).",
        "Fake visa or CAS \"agents\" offering guaranteed visas. Only your university issues a CAS.",
        "Report fraud online to Report Fraud (reportfraud.police.uk, 0300 123 2040), which replaced Action Fraud in December 2025 for England, Wales and Northern Ireland; in Scotland call Police Scotland on 101.",
      ] },
      { heading: "Discrimination and hate crime", paragraphs: [
        "Racist or religious abuse, online or in person, is a crime in the UK. Report it to the police on 101 (999 if you are in danger), online through True Vision (report-it.org.uk), or through your university, which must have a reporting route. The Equality Act 2010 protects you at work, at university and when renting.",
      ] },
      { heading: "Everyday safety", checklist: [
        "Use licensed taxis or ride apps; minicabs must be pre-booked.",
        "Keep your phone out of reach on busy streets in big cities, where snatch theft is common.",
        "Carry your eVisa share code details and a photo of your passport, not the original, for daily life.",
        "Free contents insurance is sometimes included with halls; check before buying your own.",
      ] },
      indiaSteps("The High Commission of India in London (and consulates in Birmingham, Edinburgh and Belfast)"),
    ],
    faqs: [
      { q: "Is the UK safe for Indian students?", a: "Generally yes. Use normal city precautions, watch for phone theft in London, and be wary of calls claiming to be the Home Office. Call 999 in an emergency and 111 for urgent medical advice." },
      { q: "Where can I get free counselling as a student in the UK?", a: "From your university's wellbeing or counselling service, through your GP and NHS talking therapies, or by calling Samaritans on 116 123 at any time." },
    ],
    sources: [
      { label: "NHS 111", url: "https://111.nhs.uk/" },
      { label: "Samaritans", url: "https://www.samaritans.org/" },
      { label: "Report Fraud (City of London Police)", url: "https://www.reportfraud.police.uk/" },
      { label: "True Vision · Report hate crime", url: "https://www.report-it.org.uk/" },
      { label: "GOV.UK · Tenancy deposit protection", url: "https://www.gov.uk/tenancy-deposit-protection" },
      { label: "High Commission of India, London", url: "https://www.hcilondon.gov.in/" },
      madad,
    ],
  },
  usa: {
    slug, path: chapterPath("usa", slug), label: "Safety, wellbeing & emergencies", eyebrow: "USA · CHAPTER 18",
    title: "Staying safe and well", accent: "in the USA.",
    seoTitle: "USA Student Safety & Emergency Help",
    description: "911, the 988 crisis line, campus counselling, the Embassy and consulates of India, and the scams that target F-1 students in the United States.",
    summary: "Call 911 for police, fire or ambulance, and 988 (call or text) for the Suicide and Crisis Lifeline. Campus counselling is usually free or covered by your student health plan, and your international student office (DSO) is the first stop for anything touching your F-1 status. The Embassy of India in Washington and consulates in New York, San Francisco, Chicago, Houston, Atlanta and Seattle handle passport emergencies. Watch for callers posing as immigration officers or the IRS.",
    facts: [
      { label: "Emergency", value: "911" },
      { label: "Suicide & Crisis Lifeline", value: "988", note: "Call or text, 24 hours" },
      { label: "Status questions", value: "Your DSO", note: "International student office" },
      { label: "Fraud reports", value: "reportfraud.ftc.gov" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "US campuses run counselling and psychological services (often called CAPS) that are free or included in the student health fee, plus 24-hour crisis lines. An ambulance or ER visit can be very expensive, so know what your student insurance covers and use urgent care for non-emergencies.",
        "Dropping below a full course load for health reasons is possible only with your DSO's approval (a reduced course load). Never just stop attending: it can terminate your SEVIS record.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Callers claiming to be ICE, USCIS, the IRS, the FBI or police, saying your visa or SEVIS record has a problem and demanding payment. Government agencies do not demand money by phone, gift cards, wire or crypto; hang up and call your DSO.",
        "Spoofed phone numbers that show a real government or embassy number.",
        "Rental listings that ask for a deposit before a viewing or a signed lease.",
        "Fake jobs and \"check cashing\" offers; any off-campus work without CPT or OPT authorisation breaks F-1 rules.",
        "Report scams to the FTC at reportfraud.ftc.gov and, for online fraud, to the FBI's IC3.",
      ] },
      { heading: "Discrimination and campus safety", paragraphs: [
        "Universities must have reporting routes for harassment and discrimination; report to campus police, the dean of students or the equity office. Bias incidents can also be reported to local police and, for civil-rights complaints in education, the US Department of Education's Office for Civil Rights.",
        "Many campuses have night escort services and emergency call points. Save the campus police number alongside 911.",
      ] },
      { heading: "Everyday safety", checklist: [
        "Keep your I-20, passport and visa safe at home; carry a copy and your student ID.",
        "Learn which areas near campus your university advises against at night.",
        "Never share your SSN unless an employer or bank genuinely needs it.",
        "If stopped by police, stay calm, keep hands visible and ask for your DSO to be told if you are detained.",
      ] },
      indiaSteps("The Embassy of India in Washington DC (and consulates in New York, San Francisco, Chicago, Houston, Atlanta and Seattle)"),
    ],
    faqs: [
      { q: "What number do I call for mental health help in the USA?", a: "988, the Suicide and Crisis Lifeline, by call or text at any hour. Your campus counselling centre is the usual first step for ongoing support." },
      { q: "Will ICE or USCIS call me asking for money?", a: "No. Government agencies do not demand payment by phone, gift card, wire or crypto. Hang up and contact your DSO." },
    ],
    sources: [
      { label: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/" },
      { label: "Study in the States (DHS) · Scam alerts", url: "https://studyinthestates.dhs.gov/" },
      { label: "Federal Trade Commission · Report fraud", url: "https://reportfraud.ftc.gov/" },
      { label: "FBI · Internet Crime Complaint Center", url: "https://www.ic3.gov/" },
      { label: "US Department of Education · Office for Civil Rights", url: "https://www.ed.gov/about/ed-offices/ocr" },
      { label: "Embassy of India, Washington DC", url: "https://www.indianembassyusa.gov.in/" },
      madad,
    ],
  },
  canada: {
    slug, path: chapterPath("canada", slug), label: "Safety, wellbeing & emergencies", eyebrow: "CANADA · CHAPTER 18",
    title: "Staying safe and well", accent: "in Canada.",
    seoTitle: "Canada Student Safety & Emergency Help",
    description: "911, the 988 crisis line, campus counselling, the High Commission of India, IRCC and CRA scam calls, winter safety and recruiter fraud in Canada.",
    summary: "Call 911 for emergencies and 988 (call or text) for the Suicide Crisis Helpline. Colleges and universities offer free counselling, and provincial health lines (811 in most provinces) give nurse advice. The High Commission of India in Ottawa and consulates in Toronto and Vancouver help with passports and emergencies. The biggest risks for Indian students are fake IRCC or CRA calls, rental fraud, and recruiters who sell fake admission letters.",
    facts: [
      { label: "Emergency", value: "911" },
      { label: "Suicide Crisis Helpline", value: "988", note: "Call or text, 24 hours" },
      { label: "Health advice", value: "811", note: "Most provinces" },
      { label: "Canadian Anti-Fraud Centre", value: "1-888-495-8501" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "Every DLI has counselling or wellness services, and many provinces fund free student support lines. Long dark winters affect mood: get daylight, stay active and ask for help early. Your student or provincial health plan covers emergency care; check what it pays for counselling outside campus.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Callers posing as IRCC, CBSA, the CRA or police threatening deportation or arrest unless you pay. They never demand gift cards, crypto or wire transfers.",
        "Recruiters selling admission letters: check your letter with the institution directly and confirm it is on IRCC's list of designated learning institutions. A fake letter can lead to refusal and a five-year ban for misrepresentation.",
        "Rental fraud: deposits for places you have not seen or that are listed by someone who cannot show ID and a lease.",
        "Report fraud to the Canadian Anti-Fraud Centre and your local police.",
      ] },
      { heading: "Discrimination", paragraphs: [
        "Discrimination in jobs, housing and services is illegal under human rights laws in every province. Report it to your institution, the provincial human rights commission or tribunal, and to police if it is a crime.",
      ] },
      { heading: "Winter and everyday safety", checklist: [
        "Dress in layers with insulated, waterproof boots; frostbite can set in fast in wind chill.",
        "Follow Environment Canada weather alerts on your phone.",
        "Use campus walk-safe programmes at night.",
        "Keep your study permit and passport at home; carry copies.",
      ] },
      indiaSteps("The High Commission of India in Ottawa (and consulates in Toronto and Vancouver)"),
    ],
    faqs: [
      { q: "Does IRCC call students to demand payment?", a: "No. IRCC, CBSA and the CRA do not threaten arrest or ask for gift cards, crypto or wire transfers. Hang up and report it to the Canadian Anti-Fraud Centre." },
      { q: "How do I check my college is real?", a: "Confirm it on IRCC's list of designated learning institutions and verify your letter of acceptance with the institution directly, not through an agent." },
    ],
    sources: [
      { label: "9-8-8 Suicide Crisis Helpline", url: "https://988.ca/" },
      { label: "Canadian Anti-Fraud Centre", url: "https://antifraudcentre-centreantifraude.ca/" },
      { label: "IRCC · Protect yourself from fraud", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/protect-fraud.html" },
      { label: "IRCC · Designated learning institutions list", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html" },
      { label: "High Commission of India, Ottawa", url: "https://www.hciottawa.gov.in/" },
      madad,
    ],
  },
  germany: {
    slug, path: chapterPath("germany", slug), label: "Safety, wellbeing & emergencies", eyebrow: "GERMANY · CHAPTER 18",
    title: "Staying safe and well", accent: "in Germany.",
    seoTitle: "Germany Student Safety & Help Lines",
    description: "112 and 110, the 116 117 doctor line, free counselling, the Embassy of India in Berlin, blocked-account and housing scams, and discrimination help.",
    summary: "Dial 112 for fire and ambulance and 110 for police. 116 117 finds an on-call doctor when practices are closed. Studierendenwerke run free psychological counselling for students, and the TelefonSeelsorge answers 0800 111 0 111 or 0800 111 0 222 free, day and night. The Embassy of India in Berlin and consulates in Frankfurt, Munich and Hamburg handle passports and emergencies. Watch for fake flat listings, blocked-account offers from unknown providers and calls posing as police or the immigration office.",
    facts: [
      { label: "Fire & ambulance", value: "112" },
      { label: "Police", value: "110" },
      { label: "On-call doctor", value: "116 117" },
      { label: "TelefonSeelsorge", value: "0800 111 0 111", note: "Free, 24 hours" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "Your local Studierendenwerk offers free, confidential psychological counselling and social counselling, often in English. Statutory health insurance covers psychotherapy, though waiting lists can be long; your GP (Hausarzt) can help. Many students find the first winter, the language barrier and slow bureaucracy hard: say so early.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Flat listings that ask for a deposit or a \"key by courier\" before a viewing. Never pay before seeing the flat and signing a contract.",
        "Unknown blocked-account providers. Use a provider listed by the German Missions in India or the Federal Foreign Office.",
        "Calls claiming to be the police, the Ausländerbehörde or the Indian Embassy and demanding money. German authorities do not take payments by phone or gift card.",
        "Fake APS or visa appointment sellers: appointments are booked only through official channels and are free apart from the stated fees.",
        "Report fraud to the local police (110 in an emergency, or the online police station of your state).",
      ] },
      { heading: "Discrimination", paragraphs: [
        "The General Equal Treatment Act (AGG) protects you in jobs and in renting. The Federal Anti-Discrimination Agency gives free advice, and most university cities have local counselling centres. Report racist attacks to the police; your university's diversity office can support you.",
      ] },
      { heading: "Everyday rules worth knowing", checklist: [
        "Always carry a valid ticket: fare dodging brings an on-the-spot penalty.",
        "Quiet hours (usually 10 pm to 6 am and Sundays) are taken seriously in shared buildings.",
        "Liability insurance (Haftpflicht) is cheap and widely expected; it covers damage you cause to others.",
        "Carry your residence permit or a copy of your passport and visa.",
      ] },
      indiaSteps("The Embassy of India in Berlin (and consulates in Frankfurt, Munich and Hamburg)"),
    ],
    faqs: [
      { q: "What is the emergency number in Germany?", a: "112 for fire and ambulance, 110 for police. For a doctor outside office hours, call 116 117." },
      { q: "Is there free counselling for students in Germany?", a: "Yes. Studierendenwerke offer free psychological counselling, and the TelefonSeelsorge answers 0800 111 0 111 at any hour." },
    ],
    sources: [
      { label: "116117 · Medical on-call service", url: "https://www.116117.de/" },
      { label: "TelefonSeelsorge", url: "https://www.telefonseelsorge.de/" },
      { label: "Deutsches Studierendenwerk · Counselling", url: "https://www.studierendenwerke.de/" },
      { label: "Federal Anti-Discrimination Agency", url: "https://www.antidiskriminierungsstelle.de/EN/" },
      { label: "Embassy of India, Berlin", url: "https://www.indianembassyberlin.gov.in/" },
      madad,
    ],
  },
  australia: {
    slug, path: chapterPath("australia", slug), label: "Safety, wellbeing & emergencies", eyebrow: "AUSTRALIA · CHAPTER 18",
    title: "Staying safe and well", accent: "in Australia.",
    seoTitle: "Australia Student Safety & Help Lines",
    description: "000, Lifeline 13 11 14, healthdirect, the High Commission of India, wage theft and Scamwatch, beach and sun safety for students in Australia.",
    summary: "Call 000 for police, fire or ambulance (112 also works from mobiles), 131 444 for police matters that are not urgent, and Lifeline on 13 11 14 for crisis support at any hour. healthdirect (1800 022 222) gives nurse advice. Universities offer free counselling. The High Commission of India in Canberra and consulates in Sydney, Melbourne, Perth and Brisbane help with passports and emergencies. The most common problems are underpayment at work, rental scams and calls posing as Home Affairs or the ATO.",
    facts: [
      { label: "Emergency", value: "000" },
      { label: "Police, non-urgent", value: "131 444" },
      { label: "Lifeline", value: "13 11 14", note: "24 hours" },
      { label: "Pay and work rights", value: "Fair Work Ombudsman" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "Every university has free counselling, and your Overseas Student Health Cover (OSHC) may pay towards a psychologist; check your policy. Lifeline (13 11 14) and Beyond Blue offer free phone and online support. Isolation and overwork are the usual triggers: keep to your fortnightly work limit and stay connected.",
      ] },
      { heading: "Work rights and wage theft", paragraphs: [
        "You have the same workplace rights as Australians, including the minimum wage, payslips and superannuation. Cash-in-hand jobs paying below the minimum wage are illegal for the employer. The Fair Work Ombudsman helps visa holders recover unpaid wages, and under an agreement with Home Affairs, reporting exploitation does not normally put your visa at risk even if you worked beyond your limit, as long as you cooperate.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Calls from \"Home Affairs\", \"the ATO\" or \"police\" threatening visa cancellation or arrest unless you pay. Hang up; no agency asks for gift cards or crypto.",
        "Rental listings that want a bond before an inspection. Bonds are lodged with the state bond authority, not paid to a person in cash.",
        "Job ads that want an upfront fee or your bank login.",
        "Check and report scams at Scamwatch.",
      ] },
      { heading: "Sun, beach and everyday safety", checklist: [
        "UV is strong: use sunscreen, a hat and sunglasses, even on cloudy days.",
        "Swim only between the red and yellow flags at patrolled beaches.",
        "Learn about local wildlife and bushfire alerts for your state.",
        "Report racism to your university, the police or the Australian Human Rights Commission.",
      ] },
      indiaSteps("The High Commission of India in Canberra (and consulates in Sydney, Melbourne, Perth and Brisbane)"),
    ],
    faqs: [
      { q: "What do I do if my employer underpays me in Australia?", a: "Keep your payslips and hours, then contact the Fair Work Ombudsman. Visa holders who report exploitation are normally protected from visa cancellation for work-limit breaches." },
      { q: "What is the emergency number in Australia?", a: "000 for police, fire and ambulance; 112 also works from mobiles. For urgent mental-health support call Lifeline on 13 11 14." },
    ],
    sources: [
      { label: "Lifeline Australia", url: "https://www.lifeline.org.au/" },
      { label: "healthdirect Australia", url: "https://www.healthdirect.gov.au/" },
      { label: "Fair Work Ombudsman · Visa holders", url: "https://www.fairwork.gov.au/find-help-for/visa-holders-and-migrants" },
      { label: "Scamwatch (ACCC)", url: "https://www.scamwatch.gov.au/" },
      { label: "Australian Human Rights Commission", url: "https://humanrights.gov.au/" },
      { label: "High Commission of India, Canberra", url: "https://www.hcicanberra.gov.in/" },
      madad,
    ],
  },
  ireland: {
    slug, path: chapterPath("ireland", slug), label: "Safety, wellbeing & emergencies", eyebrow: "IRELAND · CHAPTER 18",
    title: "Staying safe and well", accent: "in Ireland.",
    seoTitle: "Ireland Student Safety & Help Lines",
    description: "112 or 999, Samaritans, college counselling, the Embassy of India in Dublin, Garda advice on rental scams, and discrimination help for students in Ireland.",
    summary: "Dial 112 or 999 for Gardaí, ambulance or fire. Samaritans answers 116 123 free at any hour, and every college has a free counselling service. The Embassy of India in Dublin covers all of Ireland for passports and emergencies. Rental fraud is the most common scam: the Gardaí warn students every autumn never to pay deposits for accommodation they have not viewed.",
    facts: [
      { label: "Emergency", value: "112 or 999" },
      { label: "Samaritans", value: "116 123", note: "Free, 24 hours" },
      { label: "Indian mission", value: "Embassy of India, Dublin" },
      { label: "Top scam", value: "Rental deposits", note: "Garda warning" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "Colleges provide free counselling and a student health centre; book through student services. Text-based support is available through 50808, a free 24-hour text line. Short winter days and a housing search can be stressful: start early and ask for help.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Accommodation fraud: listings below market rent, landlords \"abroad\", requests to pay by transfer before a viewing. View in person or by verified video with the college accommodation office, and get a written agreement.",
        "Calls claiming to be immigration, Revenue or Gardaí demanding payment.",
        "Fake job offers that ask for fees or for your bank card to \"receive payments\" (money mule activity is a crime).",
        "Report fraud to your local Garda station.",
      ] },
      { heading: "Discrimination", paragraphs: [
        "Equality laws ban discrimination in jobs, housing and services. The Irish Human Rights and Equality Commission gives information, and the Workplace Relations Commission hears complaints. Report racist incidents to the Gardaí and your college.",
      ] },
      { heading: "Everyday safety", checklist: [
        "Carry your IRP card once issued; keep your passport at home.",
        "Use licensed taxis (they display a roof sign and driver ID).",
        "Rain gear and good shoes matter more than heavy coats.",
      ] },
      indiaSteps("The Embassy of India in Dublin"),
    ],
    faqs: [
      { q: "How do I avoid rental scams in Ireland?", a: "Never pay a deposit before viewing in person or through a verified video tour, check the landlord's identity, and use your college's accommodation office. Report suspected fraud to the Gardaí." },
    ],
    sources: [
      { label: "An Garda Síochána · Crime prevention", url: "https://www.garda.ie/" },
      { label: "Samaritans Ireland", url: "https://www.samaritans.org/ireland/" },
      { label: "50808 · Free text support", url: "https://text50808.ie/" },
      { label: "Irish Human Rights and Equality Commission", url: "https://www.ihrec.ie/" },
      { label: "Embassy of India, Dublin", url: "https://www.indianembassydublin.gov.in/" },
      madad,
    ],
  },
  france: {
    slug, path: "/france/safety-wellbeing", label: "Safety, wellbeing & emergencies", eyebrow: "CHAPTER 18 · LOOKING AFTER YOURSELF",
    title: "Staying safe and well", accent: "in France.",
    seoTitle: "France Student Safety & Help Lines",
    description: "15, 17, 18 and 112, the 3114 crisis line, free student counselling, the Embassy of India in Paris, housing scams and discrimination help in France.",
    summary: "In France dial 15 for a medical emergency (SAMU), 17 for police, 18 for fire and 112 for any emergency. The national suicide prevention line 3114 is free at any hour. Students get free consultations at their university's health service (SSE) and can use the government's free psychologist sessions. The Embassy of India in Paris and the Consulate General in Pondicherry help with passports and emergencies. Housing deposit scams and pickpocketing are the problems Indian students meet most.",
    facts: [
      { label: "Medical emergency", value: "15 (SAMU)" },
      { label: "Police / fire", value: "17 / 18" },
      { label: "All emergencies", value: "112" },
      { label: "Suicide prevention", value: "3114", note: "Free, 24 hours" },
    ],
    blocks: [
      { heading: "Mental health and wellbeing", paragraphs: [
        "Your university's student health service (service de santé étudiante) offers free consultations, often with psychologists. Through the national Mon soutien psy scheme, sessions with a participating psychologist are reimbursed by Assurance Maladie, with a doctor's referral no longer required. Student-run Nightline listening services operate in several cities. The first winter, French bureaucracy and the language can weigh on you: reach out early.",
      ] },
      { heading: "Scams aimed at international students", checklist: [
        "Flats offered by an owner \"abroad\" who asks for a transfer before a viewing. Visit or use a trusted platform; never send money through transfer services to strangers.",
        "Requests for payment for a CAF application or a residence-permit appointment: both are free on official sites (caf.fr, administration-etrangers-en-france.interieur.gouv.fr), apart from the stated permit tax.",
        "Fake calls or SMS from \"Ameli\", \"the police\" or \"the préfecture\" asking for bank details.",
        "Report online scams through the government's Cybermalveillance service and file a complaint with the police or gendarmerie.",
      ] },
      { heading: "Discrimination", paragraphs: [
        "Discrimination based on origin or religion is illegal in France. The Défenseur des droits (Defender of Rights) handles complaints for free, including in housing and employment, and you can file a police complaint (plainte) for racist abuse. Universities have referents for racism and discrimination.",
      ] },
      { heading: "Everyday safety", checklist: [
        "Watch for pickpockets on the Paris metro, at tourist sites and on night buses.",
        "Carry your residence permit (or VLS-TS with its validation) and keep the passport at home.",
        "Validate your transport ticket every time; controls are frequent.",
        "Women alone at night can ask bus drivers in many cities to stop between stops.",
      ] },
      indiaSteps("The Embassy of India in Paris (and the Consulate General in Pondicherry)"),
    ],
    faqs: [
      { q: "What are the emergency numbers in France?", a: "15 for a medical emergency, 17 for police, 18 for fire and 112 for any emergency. 3114 is the free 24-hour suicide prevention line." },
      { q: "Can international students see a psychologist for free in France?", a: "Yes. University health services offer free consultations, and sessions under Mon soutien psy are reimbursed by Assurance Maladie once you are registered." },
    ],
    sources: [
      { label: "3114 · Numéro national de prévention du suicide", url: "https://3114.fr/" },
      { label: "Ameli · Mon soutien psy", url: "https://www.ameli.fr/assure/remboursements/rembourse/remboursement-seance-psychologue-mon-soutien-psy" },
      { label: "Cybermalveillance.gouv.fr", url: "https://www.cybermalveillance.gouv.fr/" },
      { label: "Défenseur des droits", url: "https://www.defenseurdesdroits.fr/" },
      { label: "Embassy of India, Paris", url: "https://www.eoiparis.gov.in/" },
      madad,
    ],
  },
};

/** The safety chapter for a country's guide; placed before its FAQ chapter. */
export const safetyChapter = (country: string) => chapters[country];

/** Inserts the safety chapter just before a guide's FAQ chapter. */
export function withSafety<T extends { slug: string }>(country: string, list: T[]): (T | SafetyChapter)[] {
  const at = list.findIndex((c) => c.slug === "faq");
  return [...list.slice(0, at), safetyChapter(country), ...list.slice(at)];
}
