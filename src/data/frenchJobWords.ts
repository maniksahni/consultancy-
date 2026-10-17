/**
 * French words that appear in job ads and interviews in France, with plain-English meanings.
 * `match` finds the word in an ad; `fields` ties a word to job areas so each job gets
 * the vocabulary of its own field even when the ad is in English.
 */
export type FrenchWord = { fr: string; en: string; match: RegExp; fields?: string[] };

export const frenchJobWords: FrenchWord[] = [
  // Contract and conditions — useful for every job
  { fr: "CDI", en: "Permanent contract", match: /\bCDI\b/ },
  { fr: "CDD", en: "Fixed-term contract", match: /\bCDD\b/ },
  { fr: "Stage", en: "Internship (usually part of your studies)", match: /\bstages?\b(?! de)/i },
  { fr: "Alternance", en: "Work-study: you alternate between school and a paid job", match: /alternance|alternant/i },
  { fr: "Contrat d’apprentissage", en: "Apprenticeship contract (a form of alternance)", match: /apprentissage/i },
  { fr: "Temps plein / temps partiel", en: "Full time / part time", match: /temps (plein|partiel)/i },
  { fr: "Télétravail", en: "Remote work (hybride = some days remote)", match: /t[ée]l[ée]travail|hybride/i },
  { fr: "Salaire brut", en: "Gross salary, before social charges (net is about 22–25% lower)", match: /brut/i },
  { fr: "K€ / an", en: "Thousand euros per year (45 K€ = €45,000)", match: /\bk€|k ?euros/i },
  { fr: "Période d’essai", en: "Probation period", match: /p[ée]riode d['’]essai/i },
  { fr: "Mutuelle", en: "Top-up health insurance paid partly by the employer", match: /mutuelle/i },
  { fr: "Tickets restaurant", en: "Meal vouchers", match: /tickets? (restaurant|resto)|carte (swile|restaurant)/i },
  { fr: "RTT", en: "Extra days off for working more than 35 hours a week", match: /\bRTT\b/ },
  { fr: "Congés payés", en: "Paid holidays (5 weeks a year by law)", match: /cong[ée]s pay[ée]s/i },
  { fr: "Prise de poste", en: "Start date", match: /prise de poste/i },
  { fr: "Poste à pourvoir", en: "Position to fill", match: /[àa] pourvoir/i },
  { fr: "Débutant accepté", en: "Beginners welcome", match: /d[ée]butants? accept[ée]/i },
  { fr: "Bac+5", en: "Master’s level (five years after the baccalauréat)", match: /bac ?\+ ?\d/i },
  { fr: "Profil recherché", en: "The profile we are looking for", match: /profil recherch[ée]/i },
  { fr: "Missions", en: "Main tasks of the job", match: /\bmissions?\b/i },
  { fr: "Compétences", en: "Skills", match: /comp[ée]tences/i },
  { fr: "Savoir-être", en: "Soft skills", match: /savoir[- ][êe]tre/i },
  { fr: "Maîtrise de …", en: "Strong command of … (a skill or language)", match: /ma[îi]trise/i },
  { fr: "Anglais courant", en: "Fluent English", match: /anglais (courant|professionnel|fluide)/i },
  { fr: "Français courant", en: "Fluent French", match: /fran[çc]ais (courant|professionnel|natif|fluide)/i },
  { fr: "Candidature", en: "Application", match: /candidat(ure|er)/i },
  { fr: "Lettre de motivation", en: "Cover letter", match: /lettre de motivation/i },
  { fr: "Entretien", en: "Interview", match: /entretien/i },
  { fr: "Processus de recrutement", en: "Hiring process", match: /processus de recrutement/i },
  { fr: "Titre de séjour", en: "Residence permit", match: /titre de s[ée]jour|autorisation de travail/i },
  { fr: "Cadre", en: "Executive / professional-grade employee", match: /\bcadre\b/i },
  { fr: "Encadrement", en: "Managing a team", match: /encadrement|manager une [ée]quipe/i },
  { fr: "Rattaché(e) à", en: "Reporting to", match: /rattach[ée]/i },
  { fr: "Au sein de", en: "Within (a team or company)", match: /au sein d/i },
  { fr: "Poste basé à", en: "Job based in", match: /bas[ée] [àa]/i },
  { fr: "Déplacements", en: "Business travel", match: /d[ée]placements?/i },

  // Field vocabulary
  { fr: "Développeur / développeuse", en: "Developer", match: /d[ée]velopp(eur|euse)/i, fields: ["tech"] },
  { fr: "Logiciel", en: "Software", match: /logiciel/i, fields: ["tech"] },
  { fr: "Données", en: "Data", match: /donn[ée]es/i, fields: ["tech", "data"] },
  { fr: "Analyste de données", en: "Data analyst", match: /analyste/i, fields: ["data"] },
  { fr: "Ingénieur(e)", en: "Engineer", match: /ing[ée]nieur/i, fields: ["tech", "engineering"] },
  { fr: "Mise en production", en: "Release / deployment", match: /mise en production/i, fields: ["tech"] },
  { fr: "Cahier des charges", en: "Specification / requirements document", match: /cahier des charges/i, fields: ["tech", "engineering", "product"] },
  { fr: "Chef de projet", en: "Project manager", match: /chef de projet/i, fields: ["product", "engineering", "tech"] },
  { fr: "Gestion de projet", en: "Project management", match: /gestion de projet/i, fields: ["product", "engineering"] },
  { fr: "Bureau d’études", en: "Engineering design office", match: /bureau d['’][ée]tudes/i, fields: ["engineering"] },
  { fr: "Commercial(e)", en: "Salesperson / sales", match: /commercial/i, fields: ["sales"] },
  { fr: "Chiffre d’affaires", en: "Revenue", match: /chiffre d['’]affaires/i, fields: ["sales", "finance"] },
  { fr: "Prospection", en: "Finding new clients", match: /prospect/i, fields: ["sales"] },
  { fr: "Fidélisation", en: "Customer retention", match: /fid[ée]lis/i, fields: ["sales", "marketing"] },
  { fr: "Chargé(e) de clientèle", en: "Account / customer manager", match: /client[eè]le/i, fields: ["sales", "support"] },
  { fr: "Relation client", en: "Customer relations", match: /relation client/i, fields: ["support", "sales"] },
  { fr: "Réseaux sociaux", en: "Social media", match: /r[ée]seaux sociaux/i, fields: ["marketing"] },
  { fr: "Référencement (SEO)", en: "Search engine optimisation", match: /r[ée]f[ée]rencement/i, fields: ["marketing"] },
  { fr: "Image de marque", en: "Brand image", match: /image de marque|notori[ée]t[ée]/i, fields: ["marketing"] },
  { fr: "Comptabilité", en: "Accounting", match: /comptab/i, fields: ["finance"] },
  { fr: "Contrôle de gestion", en: "Management control / FP&A", match: /contr[ôo]le de gestion/i, fields: ["finance"] },
  { fr: "Trésorerie", en: "Treasury / cash management", match: /tr[ée]sorerie/i, fields: ["finance"] },
  { fr: "Bilan", en: "Balance sheet / year-end accounts", match: /\bbilan/i, fields: ["finance"] },
  { fr: "Ressources humaines (RH)", en: "Human resources", match: /ressources humaines|\bRH\b/i, fields: ["hr"] },
  { fr: "Recrutement", en: "Recruitment", match: /recrut/i, fields: ["hr"] },
  { fr: "Paie", en: "Payroll", match: /\bpaie\b/i, fields: ["hr", "finance"] },
  { fr: "Approvisionnement", en: "Procurement / supply", match: /approvisionnement|achats?\b/i, fields: ["operations"] },
  { fr: "Chaîne logistique", en: "Supply chain", match: /cha[îi]ne logistique|supply chain|logistique/i, fields: ["operations"] },
  { fr: "Entrepôt", en: "Warehouse", match: /entrep[ôo]t/i, fields: ["operations"] },
  { fr: "Accueil", en: "Reception / welcoming guests", match: /accueil/i, fields: ["hospitality"] },
  { fr: "Restauration", en: "Food service", match: /restauration/i, fields: ["hospitality"] },
  { fr: "Hébergement", en: "Accommodation (hotels)", match: /h[ée]bergement/i, fields: ["hospitality"] },
  { fr: "Soins", en: "Care / treatment", match: /\bsoins?\b/i, fields: ["health"] },
];

/** Broad field of a job from its title and category, used to pick field vocabulary. */
export function jobField(title: string, category?: string | null): string {
  const t = `${title} ${category || ""}`.toLowerCase();
  if (/data|analyt|machine learning|\bml\b|\bai\b|scientist|bi\b/.test(t)) return "data";
  if (/develop|engineer.*(software|frontend|backend|full|devops|cloud)|software|devops|frontend|backend|full[- ]?stack|it\b|cyber|security|tech/.test(t)) return "tech";
  if (/sales|account (executive|manager)|business develop|commercial|\bsdr\b|\bbdr\b/.test(t)) return "sales";
  if (/market|seo|brand|content|growth|social media|communication/.test(t)) return "marketing";
  if (/financ|account(ant|ing)|audit|controll|tax|treasury|fp&a/.test(t)) return "finance";
  if (/\bhr\b|human resources|recruit|talent|people/.test(t)) return "hr";
  if (/product|project|program/.test(t)) return "product";
  if (/supply|logist|operations|procure|purchas|warehouse/.test(t)) return "operations";
  if (/hotel|hospitality|restaurant|chef|cook|reception/.test(t)) return "hospitality";
  if (/nurse|health|care|medical|clinic/.test(t)) return "health";
  if (/support|customer success|customer service/.test(t)) return "support";
  if (/engineer|mechan|electric|civil|aerospace/.test(t)) return "engineering";
  return "general";
}

const CORE = ["CDI", "Stage", "Alternance", "Salaire brut", "Période d’essai", "Télétravail", "Entretien", "Lettre de motivation"];

/** Words seen in this ad, then the field’s vocabulary and the essentials, at most `limit`. */
export function wordsForJob(title: string, description: string, category?: string | null, limit = 12) {
  const text = `${title}\n${description}`;
  const field = jobField(title, category);
  const inAd = frenchJobWords.filter((w) => w.match.test(text));
  const forField = frenchJobWords.filter((w) => w.fields?.includes(field) && !inAd.includes(w));
  const core = frenchJobWords.filter((w) => CORE.includes(w.fr) && !inAd.includes(w) && !forField.includes(w));
  return { field, inAd: inAd.slice(0, limit), more: [...forField, ...core].slice(0, Math.max(0, limit - Math.min(inAd.length, limit))) };
}
