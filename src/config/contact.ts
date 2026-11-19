/** Harshita's WhatsApp. Every "WhatsApp" button on the site opens a chat here with a message already written. */
export const whatsApp = { digits: "33755749029", display: "+33 7 55 74 90 29" };

/** A wa.me link that opens WhatsApp with `text` typed in, ready to send. */
export function waLink(text: string) {
  return `https://wa.me/${whatsApp.digits}?text=${encodeURIComponent(text)}`;
}

export const waMessages = {
  general: "Bonjour Harshita! I found Althéa Consulting and I'd like your help.\nName:\nI'm interested in:",
  course: (course: string, institution?: string, city?: string) =>
    `Bonjour Harshita! I'd like to apply for this course:\n${course}${institution ? `\n${institution}` : ""}${city ? ` (${city})` : ""}\n\nName:\nMy current studies / marks:\nIntake I'm aiming for:`,
  institution: (name: string, city?: string) =>
    `Bonjour Harshita! I'm interested in studying at ${name}${city ? ` (${city})` : ""}. Can you help me apply?\n\nName:\nCourse I'm looking for:\nMy current studies / marks:`,
  job: (title: string, company?: string, url?: string) =>
    `Bonjour Harshita! I'd like to apply for this role through Althéa:\n${title}${company ? ` at ${company}` : ""}${url ? `\n${url}` : ""}\n\nName:\nMy degree / current status in France:`,
};
