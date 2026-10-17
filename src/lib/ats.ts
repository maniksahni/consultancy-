/**
 * In-browser CV check against one job ad, modelled on what applicant tracking systems do:
 * extract plain text, find contact details and standard sections, and match the ad's keywords.
 * Nothing is uploaded — the file is read and scored on the student's own device.
 */

export type AtsCheck = { id: string; label: string; ok: boolean; points: number; max: number; tip: string };
export type AtsResult = { score: number; pass: boolean; words: number; checks: AtsCheck[]; matched: string[]; missing: string[] };
export const ATS_PASS = 70;

// ---------- text extraction ----------

const PDFJS = "/vendor/pdfjs/pdf.min.mjs";
type PdfJs = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument(src: { data: Uint8Array; isEvalSupported: boolean }): { promise: Promise<{ numPages: number; getPage(n: number): Promise<{ getTextContent(): Promise<{ items: { str?: string; hasEOL?: boolean }[] }> }> }> };
};

async function pdfText(buf: ArrayBuffer): Promise<string> {
  const url = PDFJS;
  const pdfjs: PdfJs = await import(/* webpackIgnore: true */ url);
  pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdfjs/pdf.worker.min.mjs";
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), isEvalSupported: false }).promise;
  const pages: string[] = [];
  for (let n = 1; n <= Math.min(doc.numPages, 8); n++) {
    const content = await (await doc.getPage(n)).getTextContent();
    pages.push(content.items.map((i) => (i.str || "") + (i.hasEOL ? "\n" : " ")).join(""));
  }
  return pages.join("\n");
}

/** Reads word/document.xml out of a .docx (a zip) with the browser's own deflate support. */
async function docxText(buf: ArrayBuffer): Promise<string> {
  const view = new DataView(buf);
  const bytes = new Uint8Array(buf);
  let eocd = -1;
  for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error("not-zip");
  const entries = view.getUint16(eocd + 10, true);
  let p = view.getUint32(eocd + 16, true);
  const dec = new TextDecoder();
  for (let e = 0; e < entries; e++) {
    if (view.getUint32(p, true) !== 0x02014b50) break;
    const method = view.getUint16(p + 10, true);
    const size = view.getUint32(p + 20, true);
    const nameLen = view.getUint16(p + 28, true), extraLen = view.getUint16(p + 30, true), commentLen = view.getUint16(p + 32, true);
    const local = view.getUint32(p + 42, true);
    const name = dec.decode(bytes.subarray(p + 46, p + 46 + nameLen));
    if (name === "word/document.xml") {
      const start = local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
      const data = bytes.slice(start, start + size);
      let xml: string;
      if (method === 0) xml = dec.decode(data);
      else if (method === 8 && typeof DecompressionStream !== "undefined") {
        const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
        xml = await new Response(stream).text();
      } else throw new Error("unsupported");
      return xml.replace(/<w:tab\/>/g, " ").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error("no-document");
}

export type CvFile = { text: string; kind: "pdf" | "docx" | "txt" };

export async function readCv(file: File): Promise<CvFile> {
  const name = file.name.toLowerCase();
  if (file.size > 8 * 1024 * 1024) throw new Error("too-big");
  if (name.endsWith(".pdf") || file.type === "application/pdf") return { text: await pdfText(await file.arrayBuffer()), kind: "pdf" };
  if (name.endsWith(".docx")) return { text: await docxText(await file.arrayBuffer()), kind: "docx" };
  if (name.endsWith(".txt")) return { text: await file.text(), kind: "txt" };
  throw new Error("type");
}

// ---------- keywords from the job ad ----------

const STOP = new Set(`a about above after again all also am an and any are as at be because been before being below between both but by can could did do does doing down during each few for from further had has have having he her here hers him his how i if in into is it its itself just me more most my no nor not now of off on once only or other our ours out over own same she should so some such than that the their them then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours
ability able across apply required requirements responsibilities back global impact mission missions planet complex central decisions intern interns internship stage location remote hybrid month months week weeks based start date offer offers company's what's grow growth-minded applicant applications based benefits best candidate candidates company culture day days environment equal etc every experience field full great help highly ideal including join looking love make many must need new offer office opportunity part people plus position preferred role roles salary similar skills strong support team teams time using want way well within work working world year years
le la les un une des du de et en au aux pour par sur avec dans vous nous votre vos notre nos est sont être avoir plus ou qui que quoi ce cette ces son sa ses leur leurs pas ne se il elle ils elles on mais donc car comme tout tous toute toutes très bien afin chez entre poste équipe profil entreprise
der die das und oder ein eine einen einem einer mit für von zu im in ist sind wir sie ihr ihre unser unsere bei auf als auch an dem den des nicht es`.split(/\s+/));

/** Skills recruiters' systems usually look for, matched whole-word in the ad. */
const SKILLS = `python|java|javascript|typescript|react|node\\.js|angular|vue|sql|nosql|postgresql|mysql|mongodb|aws|azure|gcp|docker|kubernetes|terraform|linux|git|ci/cd|rest|graphql|api|html|css|c\\+\\+|c#|\\.net|go|golang|rust|php|ruby|scala|kotlin|swift|spark|hadoop|airflow|dbt|snowflake|databricks|tableau|power bi|looker|excel|vba|r|sas|spss|matlab|pandas|numpy|tensorflow|pytorch|machine learning|deep learning|nlp|llm|statistics|data analysis|data science|data engineering|etl|bi|crm|salesforce|hubspot|sap|erp|oracle|jira|confluence|figma|adobe|photoshop|illustrator|canva|seo|sea|sem|google ads|google analytics|content marketing|social media|copywriting|email marketing|b2b|b2c|saas|negotiation|prospecting|lead generation|account management|business development|customer success|project management|agile|scrum|kanban|pmp|prince2|lean|six sigma|supply chain|logistics|procurement|purchasing|inventory|forecasting|budgeting|financial modelling|financial modeling|accounting|audit|ifrs|gaap|tax|treasury|fp&a|controlling|reporting|kpi|recruitment|onboarding|payroll|hris|stakeholder management|communication|leadership|presentation|problem solving|english|french|german|spanish|autocad|solidworks|catia|revit|bim|cad|cybersecurity|security|networking|qa|testing|selenium|cypress|ux|ui|product management|roadmap|analytics|research`;
const SKILL_RE = new RegExp(`(?:^|[^\\w+#.])(${SKILLS})(?![\\w+#])`, "gi");

export function jobKeywords(title: string, description: string, company = "", max = 18): string[] {
  const own = new Set(company.toLowerCase().split(/[^a-zà-ÿ0-9]+/).filter(Boolean));
  const text = `${title}\n${title}\n${description}`;
  const found = new Map<string, number>();
  for (const m of text.matchAll(SKILL_RE)) {
    const k = m[1].toLowerCase();
    if (k === "r" && !/\bR\b/.test(m[0])) continue; // "r" only as the language, written as a capital R
    found.set(k, (found.get(k) || 0) + 3);
  }
  // Frequent meaningful words in the ad and title add the role's own vocabulary.
  const counts = new Map<string, number>();
  for (const w of text.toLowerCase().match(/[a-zà-ÿ][a-zà-ÿ+#-]{3,}/g) || []) {
    if (STOP.has(w) || own.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  for (const w of title.toLowerCase().match(/[a-zà-ÿ][a-zà-ÿ+#-]{3,}/g) || []) if (!STOP.has(w) && !own.has(w)) counts.set(w, (counts.get(w) || 0) + 4);
  for (const [w, n] of counts) if (n >= 3 && ![...found.keys()].some((k) => k.includes(w))) found.set(w, n);
  return [...found.entries()].sort((a, b) => b[1] - a[1]).slice(0, max).map(([k]) => k);
}

// ---------- scoring ----------

const SECTIONS: [string, string, RegExp][] = [
  ["experience", "Work experience section", /\b(work |professional )?experience\b|\bemployment\b|exp[ée]riences? professionnelles?|\bexp[ée]rience\b|berufserfahrung|internships?\b|\bstages?\b/i],
  ["education", "Education section", /\beducation\b|\bacademic\b|\bformations?\b|\bdipl[ôo]mes?\b|ausbildung|studium|qualifications?/i],
  ["skills", "Skills section", /\bskills\b|\bcomp[ée]tences\b|kenntnisse|f[äa]higkeiten|\btechnical\b|\boutils\b|\btools\b/i],
];

const has = (text: string, kw: string) => {
  const esc = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^\\w+#])${esc}(?![\\w+#])`, "i").test(text);
};

export function scoreCv(cv: CvFile, keywords: string[]): AtsResult {
  const text = cv.text.replace(/ /g, " ");
  const words = (text.match(/\S+/g) || []).length;
  const checks: AtsCheck[] = [];
  const add = (id: string, label: string, points: number, max: number, tip: string) => checks.push({ id, label, ok: points >= max * 0.7, points: Math.round(points), max, tip });

  const readable = words >= 150 ? 20 : words >= 60 ? 10 : 0;
  add("text", "Text can be read by a machine", readable, 20, readable === 20 ? "Your text came through cleanly." : words >= 20 ? `Only ${words} words could be read. Either the CV is very short, or much of it sits in images, icons or text boxes that systems skip.` : "Almost no text could be read — the CV is probably a scanned image or built from text boxes. Export it from Word or Google Docs as a text PDF.");

  const email = /[\w.+-]+@[\w-]+\.[\w.-]+/.test(text);
  const phone = /(\+\d{1,3}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?){3,5}\d{2,4}/.test(text);
  add("contact", "Email and phone in the text", (email ? 5 : 0) + (phone ? 5 : 0), 10, email && phone ? "Contact details found." : `Add your ${!email ? "email" : ""}${!email && !phone ? " and " : ""}${!phone ? "phone number with country code" : ""} as plain text — not inside a header, icon or image.`);

  const missingSections = SECTIONS.filter(([, , re]) => !re.test(text));
  add("sections", "Standard section headings", (SECTIONS.length - missingSections.length) * 5, 15, missingSections.length ? `Use clear headings systems recognise: ${missingSections.map(([, l]) => l.replace(" section", "")).join(", ")}.` : "Experience, Education and Skills headings found.");

  const matched = keywords.filter((k) => has(text, k));
  const missing = keywords.filter((k) => !matched.includes(k));
  const ratio = keywords.length ? matched.length / keywords.length : 0;
  add("keywords", "Keywords from this job ad", Math.min(35, ratio * 35 / 0.6), 35, ratio >= 0.6 ? "Your CV uses the language of this ad." : "Your CV is missing words this ad uses. Add the ones that truly match your experience, in the same wording.");

  const len = words >= 300 && words <= 1100 ? 10 : words >= 180 && words <= 1500 ? 5 : 0;
  add("length", "Length (1–2 pages)", len, 10, len === 10 ? `${words} words — a good length.` : words < 300 ? `${words} words is thin. Describe your results in each role and project.` : `${words} words is long. Keep it to two pages at most.`);

  const dates = (text.match(/\b(19|20)\d{2}\b/g) || []).length;
  add("dates", "Dates for each role and degree", dates >= 3 ? 5 : dates >= 1 ? 2 : 0, 5, dates >= 3 ? "Dates found." : "Add month and year for every job and degree (e.g. 09/2024 – 06/2026).");

  add("format", "File format", cv.kind === "txt" ? 3 : 5, 5, cv.kind === "txt" ? "Send a PDF or Word file when you apply." : `${cv.kind.toUpperCase()} works with applicant tracking systems.`);

  const score = Math.round(checks.reduce((n, c) => n + c.points, 0));
  // A CV a system cannot read fails whatever else it gets right.
  return { score: readable ? score : Math.min(score, 30), pass: score >= ATS_PASS && readable > 0, words, checks, matched, missing };
}
