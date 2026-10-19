import { z } from "zod";
import { brand } from "@/config/brand";

export const enquiryLimits = {
  fullName: 80,
  phone: 32,
  targetCountry: 32,
  background: 160,
  message: 400,
  preferredTime: 80,
} as const;

export function sanitizeEnquiryValue(value: unknown, limit: number): string {
  if (typeof value !== "string") return "";
  return Array.from(value.normalize("NFC")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g, " ")
    .replace(/\s+/g, " ").trim())
    .filter(char => !/^[\uD800-\uDFFF]$/.test(char))
    .slice(0, limit).join("");
}

const field = (key: keyof typeof enquiryLimits, required = false) =>
  z.preprocess(value => sanitizeEnquiryValue(value, enquiryLimits[key]),
    required ? z.string().min(1, key === "fullName" ? "Enter your full name." : "Please share what you would like to explore.") : z.string());

export const referralSources = ["Google Search", "Bing or another search engine", "ChatGPT or another AI answer", "Instagram", "LinkedIn", "Friend or family", "Other"] as const;

export const enquirySchema = z.object({
  fullName: field("fullName", true),
  phone: field("phone"),
  targetCountry: field("targetCountry"),
  background: field("background"),
  message: field("message", true),
  preferredTime: field("preferredTime"),
  referralSource: z.enum(["", ...referralSources]).optional(),
});
export type Enquiry = z.output<typeof enquirySchema>;

/** Pure URL construction: no persistence, network calls, or logging. */
export function buildConsultationWhatsAppUrl(input: Enquiry): string {
  const data = enquirySchema.parse(input);
  const entries = [
    ["Name", data.fullName],
    ["Phone", data.phone],
    ["Study destination", data.targetCountry],
    ["Academic background", data.background],
    ["I'd like to explore", data.message],
    ["Preferred time & time zone", data.preferredTime],
    ["How I found Althéa", data.referralSource || ""],
  ].filter(([, value]) => value);
  const prefix = `https://wa.me/${brand.whatsappNumber}?text=`;
  const url = () => new URL(prefix + encodeURIComponent([
    `Bonjour ${brand.shortName}, I'd like to book a consultation.`,
    ...entries.map(([label, value]) => `${label}: ${value}`),
  ].join("\n"))).href;
  // Bound encoded bytes, including emoji and non-Latin scripts, preserving each nonempty line.
  while (url().length > 1800) {
    const entry = entries.filter(([, value]) => Array.from(value).length > 1)
      .sort((a, b) => encodeURIComponent(b[1]).length - encodeURIComponent(a[1]).length)[0];
    if (!entry) throw new Error("Consultation message exceeds the URL limit.");
    entry[1] = Array.from(entry[1]).slice(0, -1).join("").trimEnd();
  }
  return url();
}
