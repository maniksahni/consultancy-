import { z } from "zod";
import { brand } from "@/config/brand";

export const enquiryLimits = {
  fullName: 80,
  email: 120,
  phone: 32,
  targetCountry: 32,
  level: 40,
  intake: 40,
  currentStatus: 60,
  background: 300,
  experience: 300,
  challenges: 500,
  message: 400,
  preferredTime: 80,
} as const;

export function sanitizeEnquiryValue(value: unknown, limit: number): string {
  if (typeof value !== "string") return "";
  return Array.from(value.normalize("NFC")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F‪-‮⁦-⁩]/g, " ")
    .replace(/\s+/g, " ").trim())
    .filter(char => !/^[\uD800-\uDFFF]$/.test(char))
    .slice(0, limit).join("");
}

const requiredMessages: Partial<Record<keyof typeof enquiryLimits, string>> = {
  fullName: "Enter your full name.",
  phone: "Enter your WhatsApp number so Harshita can reach you.",
  currentStatus: "Choose where you are right now.",
  background: "Share your education so far, for example B.Tech CSE, 2025, 8.1 CGPA.",
  challenges: "Tell us what is holding you back, so the 15 minutes go to what matters.",
  message: "Please share what you would like to explore.",
};

const field = (key: keyof typeof enquiryLimits, required = false) =>
  z.preprocess(value => sanitizeEnquiryValue(value, enquiryLimits[key]),
    required ? z.string().min(1, requiredMessages[key] ?? "This field is required.") : z.string());

export const referralSources = ["Google Search", "Bing or another search engine", "ChatGPT or another AI answer", "Instagram", "LinkedIn", "YouTube", "Friend or family", "Other"] as const;
export const currentStatuses = ["In Class 11 or 12", "Bachelor's student", "Recent graduate, not yet working", "Working professional", "Master's student", "Gap year / career break", "Already abroad"] as const;
export const studyLevels = ["Bachelor's", "Master's", "MBA", "PhD", "Diploma / short course", "Not sure yet"] as const;
export const intakes = ["2026", "Jan 2027", "Sept 2027", "2028 or later", "Not sure yet"] as const;

export const enquirySchema = z.object({
  fullName: field("fullName", true),
  email: z.preprocess(value => sanitizeEnquiryValue(value, enquiryLimits.email).replace(/\s/g, ""),
    z.string().min(1, "Enter your email so we can send your meeting link.").email("Enter a valid email, like name@gmail.com.")),
  phone: field("phone"),
  targetCountry: field("targetCountry"),
  level: field("level"),
  intake: field("intake"),
  currentStatus: field("currentStatus"),
  background: field("background"),
  experience: field("experience"),
  challenges: field("challenges"),
  message: field("message", true),
  preferredTime: field("preferredTime"),
  referralSource: z.enum(["", ...referralSources]).optional(),
});
export type Enquiry = z.output<typeof enquirySchema>;

/** The booking form asks for more: a WhatsApp number and the preparation profile. */
export const bookingSchema = enquirySchema.extend({
  phone: field("phone", true),
  currentStatus: field("currentStatus", true),
  background: field("background", true),
  challenges: field("challenges", true),
});
export type BookingDetails = z.output<typeof bookingSchema>;

/** Pure URL construction: no persistence, network calls, or logging. */
export function buildConsultationWhatsAppUrl(input: Partial<Enquiry> & Pick<Enquiry, "fullName" | "email" | "message">, bookedTime?: string): string {
  const data = enquirySchema.parse(input);
  const entries = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Booked call", bookedTime ?? ""],
    ["Study destination", data.targetCountry],
    ["Level", data.level],
    ["Intake", data.intake],
    ["Current status", data.currentStatus],
    ["Academic background", data.background],
    ["Work experience", data.experience],
    ["Challenges", data.challenges],
    ["I'd like to explore", data.message],
    ["Preferred time & time zone", data.preferredTime],
    ["How I found Althéa", data.referralSource || ""],
  ].filter(([, value]) => value);
  const prefix = `https://wa.me/${brand.whatsappNumber}?text=`;
  const url = () => new URL(prefix + encodeURIComponent([
    bookedTime ? `Bonjour ${brand.shortName}, I've booked a consultation.` : `Bonjour ${brand.shortName}, I'd like to book a consultation.`,
    ...entries.map(([label, value]) => `${label}: ${value}`),
  ].join("\n"))).href;
  // Bound encoded bytes, including emoji and non-Latin scripts, preserving each nonempty line.
  while (url().length > 1800) {
    const entry = entries.filter(([label, value]) => label !== "Booked call" && Array.from(value).length > 1)
      .sort((a, b) => encodeURIComponent(b[1]).length - encodeURIComponent(a[1]).length)[0];
    if (!entry) throw new Error("Consultation message exceeds the URL limit.");
    entry[1] = Array.from(entry[1]).slice(0, -1).join("").trimEnd();
  }
  return url();
}
