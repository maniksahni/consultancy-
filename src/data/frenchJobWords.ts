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

  // Workplace words for roles without a clear field
  { fr: "Rigueur", en: "Precision and reliability (a quality French ads ask for constantly)", match: /rigueur|rigoureu/i, fields: ["general"] },
  { fr: "Autonomie", en: "Working independently", match: /autonom/i, fields: ["general"] },
  { fr: "Force de proposition", en: "Someone who suggests ideas and improvements", match: /force de proposition/i, fields: ["general", "consulting", "marketing"] },
  { fr: "Polyvalence", en: "Versatility: handling varied tasks", match: /polyvalen/i, fields: ["general", "admin", "hospitality"] },
  { fr: "Esprit d’équipe", en: "Team spirit", match: /esprit d['’][ée]quipe|travail en [ée]quipe/i, fields: ["general"] },
  { fr: "Sens de l’organisation", en: "Organisational skills", match: /sens de l['’]organisation|organis[ée]/i, fields: ["general", "admin"] },
  { fr: "Réunion", en: "Meeting", match: /r[ée]unions?/i, fields: ["general"] },
  { fr: "Horaires", en: "Working hours", match: /horaires/i, fields: ["general", "retail", "hospitality"] },
  { fr: "Rémunération / avantages", en: "Pay / benefits", match: /r[ée]mun[ée]ration|avantages/i, fields: ["general"] },
  { fr: "Interlocuteur / interlocutrice", en: "Point of contact", match: /interlocut/i, fields: ["general", "sales", "support"] },
  { fr: "Reporting", en: "Regular progress reports to your manager", match: /reporting|rendre compte/i, fields: ["general", "finance"] },
  { fr: "Tâches", en: "Tasks", match: /t[âa]ches/i, fields: ["general"] },
  // Field vocabulary: the words of the job itself, shown first.
  // Tech
  { fr: "Développeur / développeuse", en: "Developer", match: /d[ée]velopp(eur|euse)/i, fields: ["tech"] },
  { fr: "Logiciel", en: "Software", match: /logiciel/i, fields: ["tech"] },
  { fr: "Mise en production", en: "Release / deployment to production", match: /mise en production/i, fields: ["tech"] },
  { fr: "Recette", en: "Acceptance testing (QA before release)", match: /\brecette\b/i, fields: ["tech", "product"] },
  { fr: "Maintenance évolutive / corrective", en: "Adding features / fixing bugs in existing software", match: /maintenance (évolutive|evolutive|corrective)/i, fields: ["tech"] },
  { fr: "Base de données", en: "Database", match: /bases? de donn[ée]es/i, fields: ["tech", "data"] },
  { fr: "Réseau", en: "Network", match: /r[ée]seaux?\b(?! sociaux)/i, fields: ["tech"] },
  { fr: "Sécurité informatique", en: "IT security / cybersecurity", match: /s[ée]curit[ée] (informatique|des syst)|cybers[ée]curit[ée]/i, fields: ["tech"] },
  { fr: "Système d’information (SI)", en: "Information systems / IT department", match: /syst[èe]mes? d['’]information|\bDSI\b/i, fields: ["tech"] },
  { fr: "Hébergement / infogérance", en: "Hosting / managed IT services", match: /infog[ée]rance/i, fields: ["tech"] },
  { fr: "Méthodes agiles", en: "Agile methods (Scrum, sprints)", match: /agile|scrum/i, fields: ["tech", "product"] },
  { fr: "Code relu (revue de code)", en: "Code review", match: /revue de code/i, fields: ["tech"] },
  { fr: "ESN", en: "IT services company that places engineers with clients (formerly SSII)", match: /\bESN\b|\bSSII\b/i, fields: ["tech", "consulting"] },
  // Data
  { fr: "Données", en: "Data", match: /donn[ée]es/i, fields: ["data"] },
  { fr: "Analyste de données", en: "Data analyst", match: /analyste/i, fields: ["data"] },
  { fr: "Tableau de bord", en: "Dashboard", match: /tableaux? de bord/i, fields: ["data", "finance"] },
  { fr: "Indicateurs (KPI)", en: "Key performance indicators", match: /indicateurs/i, fields: ["data", "finance", "operations"] },
  { fr: "Apprentissage automatique", en: "Machine learning", match: /apprentissage automatique/i, fields: ["data"] },
  { fr: "Intelligence artificielle (IA)", en: "Artificial intelligence (AI)", match: /intelligence artificielle|\bIA\b/i, fields: ["data", "tech"] },
  { fr: "Entrepôt de données", en: "Data warehouse", match: /entrep[ôo]t de donn[ée]es/i, fields: ["data"] },
  { fr: "Fiabilité des données", en: "Data quality", match: /qualit[ée] des donn[ée]es|fiabilit[ée]/i, fields: ["data"] },
  { fr: "Requêtes", en: "Queries (SQL)", match: /requ[êe]tes?/i, fields: ["data"] },
  { fr: "Statistiques", en: "Statistics", match: /statistiques?/i, fields: ["data", "research"] },
  // Engineering, industry and maintenance
  { fr: "Ingénieur(e)", en: "Engineer", match: /ing[ée]nieur/i, fields: ["engineering", "tech"] },
  { fr: "Bureau d’études", en: "Engineering design office", match: /bureau d['’][ée]tudes/i, fields: ["engineering"] },
  { fr: "Cahier des charges", en: "Specification / requirements document", match: /cahier des charges/i, fields: ["engineering", "product", "tech"] },
  { fr: "Conception", en: "Design (of a product or system)", match: /\bconception\b/i, fields: ["engineering"] },
  { fr: "Plan / dessin technique", en: "Technical drawing", match: /dessin technique|plans? techniques?/i, fields: ["engineering"] },
  { fr: "Essais", en: "Tests / trials", match: /\bessais\b/i, fields: ["engineering", "research"] },
  { fr: "Amélioration continue", en: "Continuous improvement (Lean)", match: /am[ée]lioration continue|\blean\b/i, fields: ["engineering", "operations", "maintenance"] },
  { fr: "Usine / site de production", en: "Factory / production site", match: /\busine\b|site de production/i, fields: ["engineering", "maintenance", "operations"] },
  { fr: "Ligne de production", en: "Production line", match: /lignes? de production/i, fields: ["maintenance", "operations"] },
  { fr: "Maintenance préventive / curative", en: "Planned maintenance / repairs after a breakdown", match: /maintenance (pr[ée]ventive|curative)/i, fields: ["maintenance"] },
  { fr: "Dépannage", en: "Troubleshooting and repair", match: /d[ée]pann/i, fields: ["maintenance"] },
  { fr: "Panne", en: "Breakdown / fault", match: /\bpannes?\b/i, fields: ["maintenance"] },
  { fr: "Habilitation électrique", en: "Electrical safety certification (B1, BR, H0…)", match: /habilitation/i, fields: ["maintenance", "construction"] },
  { fr: "Électrotechnique", en: "Electrical engineering", match: /[ée]lectrotechni/i, fields: ["maintenance", "engineering"] },
  { fr: "Automatisme", en: "Industrial automation (PLCs)", match: /automatisme|automate/i, fields: ["maintenance", "engineering"] },
  { fr: "Normes / sécurité (HSE / QHSE)", en: "Standards / health, safety and environment", match: /\bQHSE\b|\bHSE\b|normes?\b/i, fields: ["maintenance", "engineering", "construction"] },
  { fr: "Astreinte", en: "On-call duty", match: /astreinte/i, fields: ["maintenance", "tech", "health"] },
  { fr: "Travail posté / 3x8", en: "Shift work (three 8-hour shifts)", match: /travail post[ée]|\b[23]x8\b/i, fields: ["maintenance", "operations", "health"] },
  // Construction
  { fr: "Chantier", en: "Building site", match: /chantiers?/i, fields: ["construction"] },
  { fr: "Conducteur / conductrice de travaux", en: "Site manager", match: /conduct(eur|rice) de travaux/i, fields: ["construction"] },
  { fr: "BTP", en: "Construction and public works sector", match: /\bBTP\b/i, fields: ["construction"] },
  { fr: "Gros œuvre / second œuvre", en: "Structural work / finishing work", match: /(gros|second) [œo]euvre/i, fields: ["construction"] },
  { fr: "Génie civil", en: "Civil engineering", match: /g[ée]nie civil/i, fields: ["construction", "engineering"] },
  { fr: "Maîtrise d’œuvre / d’ouvrage", en: "Project designer-manager / project owner (client)", match: /ma[îi]trise d['’](œ|oe)uvre|ma[îi]trise d['’]ouvrage|\bMOE\b|\bMOA\b/i, fields: ["construction", "tech"] },
  { fr: "Devis", en: "Quote / estimate", match: /\bdevis\b/i, fields: ["construction", "sales"] },
  { fr: "Métré", en: "Quantity surveying", match: /m[ée]tr[ée]/i, fields: ["construction"] },
  // Sales
  { fr: "Commercial(e)", en: "Salesperson / sales", match: /commercia/i, fields: ["sales"] },
  { fr: "Chiffre d’affaires (CA)", en: "Revenue / turnover", match: /chiffre d['’]affaires/i, fields: ["sales", "finance"] },
  { fr: "Prospection", en: "Finding new clients", match: /prospect/i, fields: ["sales"] },
  { fr: "Portefeuille clients", en: "Client portfolio / book of accounts", match: /portefeuille/i, fields: ["sales", "finance"] },
  { fr: "Fidélisation", en: "Customer retention", match: /fid[ée]lis/i, fields: ["sales", "marketing"] },
  { fr: "Négociation", en: "Negotiation", match: /n[ée]goci/i, fields: ["sales", "operations"] },
  { fr: "Objectifs commerciaux", en: "Sales targets", match: /objectifs? commerciaux|objectifs? de vente/i, fields: ["sales"] },
  { fr: "Variable / commissions", en: "Bonus pay linked to results", match: /\bvariable\b|commissions?/i, fields: ["sales"] },
  { fr: "Grands comptes", en: "Key accounts (large clients)", match: /grands comptes/i, fields: ["sales"] },
  { fr: "Appel d’offres", en: "Tender / call for bids", match: /appels? d['’]offres/i, fields: ["sales", "construction", "operations"] },
  { fr: "Avant-vente", en: "Pre-sales", match: /avant[- ]vente/i, fields: ["sales", "tech"] },
  // Marketing and communication
  { fr: "Réseaux sociaux", en: "Social media", match: /r[ée]seaux sociaux/i, fields: ["marketing"] },
  { fr: "Référencement (SEO)", en: "Search engine optimisation", match: /r[ée]f[ée]rencement/i, fields: ["marketing"] },
  { fr: "Image de marque / notoriété", en: "Brand image / awareness", match: /image de marque|notori[ée]t[ée]/i, fields: ["marketing"] },
  { fr: "Campagne", en: "Campaign", match: /campagnes?/i, fields: ["marketing"] },
  { fr: "Cible", en: "Target audience", match: /\bcibles?\b/i, fields: ["marketing"] },
  { fr: "Relations presse", en: "Press relations / PR", match: /relations? presse/i, fields: ["marketing"] },
  { fr: "Événementiel", en: "Events", match: /[ée]v[ée]nementiel/i, fields: ["marketing", "hospitality"] },
  { fr: "Rédaction de contenus", en: "Content writing", match: /r[ée]daction/i, fields: ["marketing"] },
  { fr: "Étude de marché", en: "Market research", match: /[ée]tudes? de march[ée]/i, fields: ["marketing", "consulting"] },
  { fr: "Veille concurrentielle", en: "Competitor monitoring", match: /veille/i, fields: ["marketing", "consulting"] },
  // Finance and accounting
  { fr: "Comptabilité", en: "Accounting", match: /comptab/i, fields: ["finance"] },
  { fr: "Contrôle de gestion", en: "Management control / FP&A", match: /contr[ôo]le de gestion/i, fields: ["finance"] },
  { fr: "Trésorerie", en: "Treasury / cash management", match: /tr[ée]sorerie/i, fields: ["finance"] },
  { fr: "Bilan", en: "Balance sheet / year-end accounts", match: /\bbilan/i, fields: ["finance"] },
  { fr: "Clôture mensuelle / annuelle", en: "Month-end / year-end close", match: /cl[ôo]tures?/i, fields: ["finance"] },
  { fr: "Rapprochement bancaire", en: "Bank reconciliation", match: /rapprochement/i, fields: ["finance"] },
  { fr: "Fournisseurs / clients", en: "Accounts payable / receivable", match: /comptabilit[ée] (fournisseurs|clients)|\bfournisseurs\b/i, fields: ["finance"] },
  { fr: "Facturation", en: "Invoicing / billing", match: /factur/i, fields: ["finance", "support"] },
  { fr: "Budget prévisionnel", en: "Forecast budget", match: /pr[ée]visionnel/i, fields: ["finance"] },
  { fr: "Expert-comptable", en: "Chartered accountant", match: /expert[- ]comptable/i, fields: ["finance"] },
  { fr: "Commissaire aux comptes / audit", en: "Statutory auditor / audit", match: /commissaire aux comptes|\baudit/i, fields: ["finance"] },
  { fr: "Fiscalité", en: "Taxation", match: /fiscal/i, fields: ["finance", "legal"] },
  { fr: "TVA", en: "VAT (value added tax)", match: /\bTVA\b/i, fields: ["finance"] },
  { fr: "Consolidation", en: "Group account consolidation", match: /consolidation/i, fields: ["finance"] },
  // HR
  { fr: "Ressources humaines (RH)", en: "Human resources", match: /ressources humaines|\bRH\b/i, fields: ["hr"] },
  { fr: "Recrutement", en: "Recruitment", match: /recrut/i, fields: ["hr"] },
  { fr: "Paie", en: "Payroll", match: /\bpaie\b/i, fields: ["hr", "finance"] },
  { fr: "Gestion administrative du personnel", en: "HR administration", match: /administration du personnel|gestion administrative/i, fields: ["hr", "admin"] },
  { fr: "Formation", en: "Training", match: /formations?\b/i, fields: ["hr", "education"] },
  { fr: "Intégration (onboarding)", en: "Onboarding of new staff", match: /int[ée]gration des|onboarding/i, fields: ["hr"] },
  { fr: "Droit du travail", en: "Employment law", match: /droit du travail|droit social/i, fields: ["hr", "legal"] },
  { fr: "Convention collective", en: "Sector-wide collective agreement setting pay and conditions", match: /convention collective/i, fields: ["hr", "legal"] },
  { fr: "Entretien annuel", en: "Annual performance review", match: /entretiens? annuels?/i, fields: ["hr"] },
  { fr: "CSE", en: "Staff works council", match: /\bCSE\b/i, fields: ["hr"] },
  // Legal
  { fr: "Juriste", en: "In-house lawyer / legal officer", match: /juriste/i, fields: ["legal"] },
  { fr: "Contrats", en: "Contracts", match: /r[ée]daction de contrats|contrats commerciaux/i, fields: ["legal"] },
  { fr: "Contentieux", en: "Litigation", match: /contentieux/i, fields: ["legal"] },
  { fr: "Conformité", en: "Compliance", match: /conformit[ée]|compliance/i, fields: ["legal", "finance"] },
  { fr: "RGPD", en: "GDPR (EU data protection law)", match: /\bRGPD\b|\bGDPR\b/i, fields: ["legal", "tech"] },
  { fr: "Propriété intellectuelle", en: "Intellectual property", match: /propri[ée]t[ée] intellectuelle/i, fields: ["legal"] },
  { fr: "Cabinet d’avocats", en: "Law firm", match: /cabinet d['’]avocats|avocat/i, fields: ["legal"] },
  // Product and project
  { fr: "Chef de projet", en: "Project manager", match: /chef(fe)? de projet/i, fields: ["product", "engineering", "tech"] },
  { fr: "Gestion de projet", en: "Project management", match: /gestion de projet/i, fields: ["product", "engineering"] },
  { fr: "Pilotage", en: "Steering / overseeing (a project or budget)", match: /pilotage|piloter/i, fields: ["product", "operations", "finance"] },
  { fr: "Feuille de route", en: "Roadmap", match: /feuille de route|roadmap/i, fields: ["product"] },
  { fr: "Parties prenantes", en: "Stakeholders", match: /parties prenantes/i, fields: ["product", "consulting"] },
  { fr: "Livrables", en: "Deliverables", match: /livrables?/i, fields: ["product", "consulting"] },
  { fr: "Délais", en: "Deadlines", match: /d[ée]lais/i, fields: ["product", "operations", "construction"] },
  { fr: "Retroplanning", en: "Backward-planned schedule from a deadline", match: /r[ée]troplanning/i, fields: ["product", "marketing"] },
  // Consulting
  { fr: "Cabinet de conseil", en: "Consulting firm", match: /cabinet de conseil/i, fields: ["consulting"] },
  { fr: "Mission chez le client", en: "Client assignment", match: /chez (le|nos) clients?/i, fields: ["consulting", "tech"] },
  { fr: "Accompagnement", en: "Supporting / advising a client through change", match: /accompagn/i, fields: ["consulting", "hr"] },
  { fr: "Diagnostic", en: "Assessment of the current situation", match: /diagnostic/i, fields: ["consulting", "maintenance"] },
  { fr: "Transformation", en: "Business transformation", match: /transformation/i, fields: ["consulting"] },
  { fr: "Recommandations", en: "Recommendations", match: /recommandations?/i, fields: ["consulting"] },
  // Operations and logistics
  { fr: "Approvisionnement / achats", en: "Procurement / purchasing", match: /approvisionnement|achats?\b/i, fields: ["operations"] },
  { fr: "Chaîne logistique", en: "Supply chain", match: /cha[îi]ne logistique|supply chain|logistique/i, fields: ["operations"] },
  { fr: "Entrepôt", en: "Warehouse", match: /entrep[ôo]t(?! de donn)/i, fields: ["operations"] },
  { fr: "Gestion des stocks", en: "Inventory management", match: /stocks?\b/i, fields: ["operations", "retail"] },
  { fr: "Flux", en: "Flows (of goods or information)", match: /\bflux\b/i, fields: ["operations"] },
  { fr: "Expédition / réception", en: "Shipping / receiving goods", match: /exp[ée]dition|r[ée]ception des marchandises/i, fields: ["operations"] },
  { fr: "Transport", en: "Transport / freight", match: /transport/i, fields: ["operations"] },
  { fr: "Cariste (CACES)", en: "Forklift driver (CACES licence)", match: /cariste|CACES/i, fields: ["operations"] },
  { fr: "Planification", en: "Planning / scheduling", match: /planification|planning/i, fields: ["operations", "product"] },
  // Customer service
  { fr: "Relation client", en: "Customer relations", match: /relation client/i, fields: ["support", "sales"] },
  { fr: "Chargé(e) de clientèle", en: "Customer account manager", match: /client[eè]le/i, fields: ["support", "sales"] },
  { fr: "Service après-vente (SAV)", en: "After-sales service", match: /apr[èe]s[- ]vente|\bSAV\b/i, fields: ["support"] },
  { fr: "Réclamation", en: "Complaint", match: /r[ée]clamations?/i, fields: ["support"] },
  { fr: "Appels entrants / sortants", en: "Inbound / outbound calls", match: /appels? (entrants|sortants)/i, fields: ["support", "sales"] },
  { fr: "Satisfaction client", en: "Customer satisfaction", match: /satisfaction client/i, fields: ["support"] },
  { fr: "Ticket", en: "Support ticket", match: /\btickets?\b(?! resto)/i, fields: ["support", "tech"] },
  // Office and administration
  { fr: "Assistant(e) de direction", en: "Executive assistant", match: /assistant(e)? de direction/i, fields: ["admin"] },
  { fr: "Gestion d’agenda", en: "Diary / calendar management", match: /agenda/i, fields: ["admin"] },
  { fr: "Courrier", en: "Mail / correspondence", match: /courriers?/i, fields: ["admin"] },
  { fr: "Saisie", en: "Data entry", match: /\bsaisie/i, fields: ["admin", "finance"] },
  { fr: "Classement / archivage", en: "Filing / archiving", match: /classement|archivage/i, fields: ["admin"] },
  { fr: "Pack Office", en: "Microsoft Office (Word, Excel, PowerPoint)", match: /pack office|suite office/i, fields: ["admin", "finance"] },
  { fr: "Standard téléphonique", en: "Switchboard", match: /standard t[ée]l[ée]phonique/i, fields: ["admin", "support"] },
  // Retail
  { fr: "Vendeur / vendeuse", en: "Sales assistant (shop)", match: /vend(eur|euse)/i, fields: ["retail"] },
  { fr: "Magasin / boutique", en: "Store / shop", match: /magasin|boutique/i, fields: ["retail"] },
  { fr: "Caisse", en: "Till / checkout", match: /\bcaisse/i, fields: ["retail"] },
  { fr: "Mise en rayon", en: "Shelf stocking", match: /mise en rayon|rayon/i, fields: ["retail"] },
  { fr: "Merchandising / vitrine", en: "Visual merchandising / shop window", match: /merchandising|vitrine/i, fields: ["retail", "marketing"] },
  { fr: "Inventaire", en: "Stock take", match: /inventaire/i, fields: ["retail", "operations"] },
  { fr: "Luxe", en: "Luxury (sector)", match: /\bluxe\b/i, fields: ["retail", "marketing"] },
  // Hospitality
  { fr: "Accueil", en: "Reception / welcoming guests", match: /accueil/i, fields: ["hospitality", "admin"] },
  { fr: "Restauration", en: "Food service / catering", match: /restauration/i, fields: ["hospitality"] },
  { fr: "Hébergement", en: "Accommodation (hotels)", match: /h[ée]bergement/i, fields: ["hospitality"] },
  { fr: "Réception / réceptionniste", en: "Front desk / receptionist", match: /r[ée]ceptionniste/i, fields: ["hospitality"] },
  { fr: "Serveur / serveuse", en: "Waiter / waitress", match: /serv(eur|euse)/i, fields: ["hospitality"] },
  { fr: "Commis de cuisine", en: "Junior kitchen assistant", match: /commis/i, fields: ["hospitality"] },
  { fr: "Coupure", en: "Split shift (break in the middle of the day)", match: /coupure/i, fields: ["hospitality"] },
  { fr: "Normes d’hygiène (HACCP)", en: "Food hygiene rules (HACCP)", match: /hygi[èe]ne|HACCP/i, fields: ["hospitality", "health"] },
  // Health
  { fr: "Soins", en: "Care / treatment", match: /\bsoins?\b/i, fields: ["health"] },
  { fr: "Infirmier / infirmière", en: "Nurse", match: /infirmi(er|[èe]re)/i, fields: ["health"] },
  { fr: "Aide-soignant(e)", en: "Nursing assistant / care assistant", match: /aide[- ]soignant/i, fields: ["health"] },
  { fr: "Patient(e)", en: "Patient", match: /patients?/i, fields: ["health"] },
  { fr: "Établissement de santé / EHPAD", en: "Healthcare facility / care home for elderly people", match: /EHPAD|[ée]tablissement de sant[ée]|clinique/i, fields: ["health"] },
  { fr: "Garde", en: "On-duty shift (nights, weekends)", match: /\bgardes?\b/i, fields: ["health"] },
  { fr: "Dossier patient", en: "Patient record", match: /dossiers? (patients?|m[ée]dica)/i, fields: ["health"] },
  { fr: "Affaires réglementaires", en: "Regulatory affairs", match: /r[ée]glementaires?/i, fields: ["health", "research", "legal"] },
  // Science and research
  { fr: "Recherche et développement (R&D)", en: "Research and development", match: /recherche et d[ée]veloppement|R&D/i, fields: ["research", "engineering"] },
  { fr: "Laboratoire", en: "Laboratory", match: /laboratoire|\blabo\b/i, fields: ["research", "health"] },
  { fr: "Technicien(ne) de laboratoire", en: "Lab technician", match: /technicien(ne)? de laboratoire/i, fields: ["research"] },
  { fr: "Protocole", en: "Protocol (experiment or clinical)", match: /protocoles?/i, fields: ["research", "health"] },
  { fr: "Essais cliniques", en: "Clinical trials", match: /essais? cliniques?/i, fields: ["research", "health"] },
  { fr: "Bonnes pratiques (BPF)", en: "Good manufacturing practice (GMP)", match: /\bBPF\b|bonnes pratiques/i, fields: ["research", "operations"] },
  { fr: "Thèse / doctorat", en: "PhD thesis / doctorate", match: /th[èe]se|doctorat/i, fields: ["research"] },
  // Design and creative
  { fr: "Graphiste", en: "Graphic designer", match: /graphiste/i, fields: ["design"] },
  { fr: "Maquette", en: "Mock-up / layout", match: /maquettes?/i, fields: ["design", "tech"] },
  { fr: "Charte graphique", en: "Brand style guide", match: /charte graphique/i, fields: ["design", "marketing"] },
  { fr: "Expérience utilisateur (UX)", en: "User experience", match: /exp[ée]rience utilisateur/i, fields: ["design", "product"] },
  { fr: "Book / portfolio", en: "Portfolio of your work", match: /\bbook\b|portfolio/i, fields: ["design"] },
  // Education
  { fr: "Enseignant(e) / formateur·rice", en: "Teacher / trainer", match: /enseignant|format(eur|rice)/i, fields: ["education"] },
  { fr: "Établissement scolaire", en: "School", match: /[ée]tablissement scolaire|[ée]cole|coll[èe]ge|lyc[ée]e/i, fields: ["education"] },
  { fr: "Apprenants", en: "Learners", match: /apprenants?/i, fields: ["education"] },
  { fr: "Pédagogie", en: "Teaching approach", match: /p[ée]dagog/i, fields: ["education"] },
  { fr: "Soutien scolaire", en: "Tutoring", match: /soutien scolaire/i, fields: ["education"] },
];

/** Broad field of a job from its title (English or French) and category, used to pick field vocabulary. */
export function jobField(title: string, category?: string | null): string {
  const t = `${title} ${category || ""}`.toLowerCase();
  const rules: [RegExp, string][] = [
    [/data|analyt|machine learning|\bml\b|\bai\b|\bia\b|scientist|\bbi\b|donn[ée]es|statisti/, "data"],
    [/juriste|avocat|legal|lawyer|counsel|paralegal|compliance|conformit/, "legal"],
    [/comptab|financ|actuar|pricing|risk|risque|banque|banking|assurance|insurance|account(ant|ing)|audit|controll|contr[ôo]l(e|eur) de gestion|tax|fiscal|treasury|tr[ée]sor|fp&a|paie|payroll/, "finance"],
    [/\bhr\b|\brh\b|human resources|ressources humaines|recruit|recrut|talent acqui|people partner/, "hr"],
    [/develop|d[ée]velopp|software|logiciel|devops|frontend|backend|full[- ]?stack|\bit\b|informatique|cyber|s[ée]curit[ée] informatique|syst[èe]me|r[ée]seau|cloud|sre\b/, "tech"],
    [/conduct(eur|rice) de travaux|chantier|btp|g[ée]nie civil|construction|b[âa]timent|travaux|m[ée]treur|architect/, "construction"],
    [/maintenance|technicien|[ée]lectricien|[ée]lectrotech|automaticien|m[ée]canicien|op[ée]rateur|production|usine|soudeur|r[ée]gleur/, "maintenance"],
    [/sales|account (executive|manager)|business develop|commercia|\bsdr\b|\bbdr\b|key account|ing[ée]nieur d['’]affaires|vente/, "sales"],
    [/vend(eur|euse)|retail|magasin|boutique|store|caissi|conseill(er|[èe]re) de vente/, "retail"],
    [/market|seo|brand|content|growth|social media|communication|marque|digital|r[ée]seaux sociaux|[ée]v[ée]nement/, "marketing"],
    [/graphi|designer|ux|ui\b|motion|cr[ée]atif|direct(eur|rice) artistique/, "design"],
    [/consult|conseil|advisory|strateg/, "consulting"],
    [/product|produit|project|projet|program|pmo|scrum/, "product"],
    [/supply|logist|operations|op[ée]rations|procure|purchas|achat|approvisionn|warehouse|entrep[ôo]t|cariste|transport|planif/, "operations"],
    [/hotel|h[ôo]tel|hospitality|restaurant|restauration|chef de (cuisine|rang)|cuisin|cook|r[ée]ception|serveu|barman|commis/, "hospitality"],
    [/nurse|infirmi|aide[- ]soignant|health|sant[ée]|care|soin|medical|m[ée]dic|clinic|pharma|ehpad/, "health"],
    [/research|recherche|r[ée]glementaire|regulatory|qualit[ée]|quality|laborat|scientifi|chimist|biolog|r&d|phd|doctora|th[èe]se|clinical/, "research"],
    [/support|customer success|customer service|service client|relation client|t[ée]l[ée]conseill|helpdesk|sav\b/, "support"],
    [/assistant|secr[ée]tai|office manager|administrati|accueil|standard/, "admin"],
    [/teach|enseign|format(eur|rice)|trainer|tutor|professeur|[ée]ducat/, "education"],
    [/engineer|ing[ée]nieur|g[ée]nie|proc[ée]d[ée]s|process|chimi|chemical|mechan|m[ée]cani|electric|[ée]lectri|aerospace|a[ée]ro|bureau d['’][ée]tudes|calcul/, "engineering"],
  ];
  return rules.find(([re]) => re.test(t))?.[1] || "general";
}

/** When the title gives no field, use the field whose vocabulary appears most in the ad. */
function fieldFromText(text: string): string {
  const score: Record<string, number> = {};
  for (const w of frenchJobWords) if (w.fields && w.match.test(text)) for (const f of w.fields) score[f] = (score[f] || 0) + 1;
  const [best] = Object.entries(score).sort((a, b) => b[1] - a[1]);
  return best && best[1] >= 2 ? best[0] : "general";
}

/** Contract, pay and application words: useful in every French job, shown after the job's own vocabulary. */
const GENERAL_LIMIT = 4;

/**
 * Words for this job: first the job's own vocabulary seen in the ad, then the rest of its field's vocabulary,
 * then a few general contract words that appear in the ad. Basic words never crowd out job words.
 */
export function wordsForJob(title: string, description: string, category?: string | null, limit = 14) {
  const text = `${title}\n${description}`;
  const titleField = jobField(title, category);
  const field = titleField === "general" ? fieldFromText(text) : titleField;
  const isJobWord = (w: FrenchWord) => Boolean(w.fields?.includes(field));
  const inTitle = frenchJobWords.filter((w) => w.fields && w.match.test(title));
  const jobInAd = frenchJobWords.filter((w) => w.fields && !inTitle.includes(w) && isJobWord(w) && w.match.test(text));
  // Words that belong mainly to this field come before words it shares with others.
  const rank = (w: FrenchWord) => w.fields!.indexOf(field);
  const fieldRest = frenchJobWords.filter((w) => isJobWord(w) && !inTitle.includes(w) && !jobInAd.includes(w)).sort((a, b) => rank(a) - rank(b));
  jobInAd.sort((a, b) => rank(a) - rank(b));
  const generalInAd = frenchJobWords.filter((w) => !w.fields && w.match.test(text)).slice(0, GENERAL_LIMIT);
  const forJob = [...inTitle, ...jobInAd, ...fieldRest].slice(0, Math.max(6, limit - generalInAd.length));
  const seen = new Set(forJob.filter((w) => w.match.test(text)));
  return { field, forJob, seen, general: generalInAd };
}
