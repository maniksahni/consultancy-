import { bookingEndpoint, meetingMinutes } from "@/config/booking";
import { liveCountries as staticLiveCountries } from "@/lib/comingSoon";
import type { BookingDetails } from "@/lib/consultation";

/**
 * Talks to the Google Apps Script booking backend (booking/apps-script).
 * Requests are sent as text/plain so the browser makes no CORS preflight, which Apps Script cannot answer.
 * `?preview=booking` on any page switches to sample data with no network calls, for reviewing the design.
 */
export type BookingMode = "live" | "preview" | "off";
export type BookingResult = { ok: true; id: string; start: string; end: string; meetLink: string; confirmationSent?: boolean; ownerNoticeSent?: boolean } | { ok: false; error: string; code?: string };
export type AdminBooking = {
  id: string; status: string; bookedOn: string; start: string; end: string; timeZone: string; name: string; firstName: string;
  email: string; phone: string; destination: string; level: string; intake: string; currentStatus: string; homeCountry?: string; background: string;
  experience: string; challenges: string; message: string; source: string; meetLink: string; rating: string; feedback: string; notes: string;
  /** When the feedback email was sent ('yes' on older rows), and the package written for that student. */
  feedbackSent?: string; package?: string;
};
export type Availability = { day: string; start: string; end: string };
export type Blocked = { date: string; reason: string };
export type BookingSettings = {
  slotMinutes: number; bufferMinutes: number; maxPerDay: number; minNoticeHours: number; windowDays: number; timeZone: string;
  ownerName: string; ownerRole: string; whatsapp: string; liveCountries: string[];
  bookingPaused: boolean; bookingPausedMessage: string; frenchPaused: boolean; frenchPausedMessage: string; bannerMessage: string;
};
export type AdminData = { ok: true; bookings: AdminBooking[]; availability: Availability[]; blocked: Blocked[]; settings: BookingSettings; statuses: string[]; sheetUrl: string };

/** The site-wide switches Harshita edits herself in admin (Site settings tab): any page can read these live, with no redeploy. */
export type PublicSettings = {
  liveCountries: string[]; bookingPaused: boolean; bookingPausedMessage: string;
  frenchPaused: boolean; frenchPausedMessage: string; bannerMessage: string; whatsapp: string; ownerName: string; ownerRole: string;
};
export const defaultPublicSettings: PublicSettings = {
  liveCountries: [...staticLiveCountries], bookingPaused: false, bookingPausedMessage: "",
  frenchPaused: false, frenchPausedMessage: "", bannerMessage: "", whatsapp: "33755749029", ownerName: "Harshita Kohli", ownerRole: "Career Coach & France Expert",
};
/** Reads the live switches. Falls back to the static defaults in preview mode, offline, or before the backend answers. */
export async function fetchPublicSettings(): Promise<PublicSettings> {
  if (bookingMode() !== "live") return defaultPublicSettings;
  try {
    const response = await fetch(`${bookingEndpoint}?action=publicSettings`);
    const data = await response.json();
    if (!data.ok) return defaultPublicSettings;
    return { ...defaultPublicSettings, ...data };
  } catch { return defaultPublicSettings; }
}

export function bookingMode(): BookingMode {
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("preview") === "booking") return "preview";
  return bookingEndpoint ? "live" : "off";
}

export const visitorTimeZone = () => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata"; } catch { return "Asia/Kolkata"; }
};

async function post<T>(body: Record<string, unknown>): Promise<T> {
  const response = await fetch(bookingEndpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Booking service returned ${response.status}`);
  return response.json() as Promise<T>;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* ------------------------------------------------------------------ preview data */

/** UTC instant for a Paris wall-clock time (handles summer and winter time). */
function parisInstant(date: Date, minutes: number) {
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(date).split("-").map(Number);
  const guess = Date.UTC(ymd[0], ymd[1] - 1, ymd[2], 0, minutes);
  const offset = (t: number) => {
    const part = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", timeZoneName: "longOffset" }).formatToParts(new Date(t)).find(p => p.type === "timeZoneName")?.value ?? "GMT+01:00";
    const m = part.match(/([+-])(\d{2}):(\d{2})/);
    return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) : 60;
  };
  return new Date(guess - offset(guess) * 60000);
}

function previewSlots(): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let day = 1; day <= 14; day++) {
    const date = new Date(now + day * 86400000);
    const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "short" }).format(date);
    if (weekday === "Sat" || weekday === "Sun") continue;
    for (let m = 600; m + meetingMinutes <= 960; m += meetingMinutes) {
      if ((m / 15 + day * 7) % 5 === 0 || (m / 15 + day) % 7 === 0) continue; // sample "busy" gaps
      out.push(parisInstant(date, m).toISOString());
    }
  }
  return out;
}

function previewAdmin(): AdminData {
  const people: [string, string, string, string, string, string, string, string][] = [
    ["Rahul Sharma", "France", "Master's", "Working professional", "B.Tech CSE, VIT, 2023, 8.1 CGPA", "Software engineer at TCS, 2 years", "Confused between France and Germany; budget around ₹25 lakh", "Instagram"],
    ["Priya Mehta", "France", "MBA", "Working professional", "BBA, Christ University, 2021, 78%", "Marketing executive, 3 years", "Not sure if a French MBA is worth it; needs scholarship", "Google Search"],
    ["Aman Verma", "Germany", "Master's", "Recent graduate, not yet working", "B.E. Mechanical, Pune University, 2025, 7.4 CGPA", "Internship at Tata Motors, 6 months", "APS process and blocked account confusion", "ChatGPT or another AI answer"],
    ["Sneha Iyer", "France", "Bachelor's", "In Class 11 or 12", "Class 12 CBSE, PCM, expected 90%", "—", "Parents worried about safety and total cost", "Friend or family"],
    ["Karan Gill", "Canada", "Master's", "Bachelor's student", "B.Com, DU, final year, 72%", "—", "Study permit caps and PGWP eligibility", "YouTube"],
  ];
  const base = Date.now();
  const bookings: AdminBooking[] = people.map((p, i) => {
    const start = parisInstant(new Date(base + (i - 2) * 86400000), 600 + i * 45);
    const past = start.getTime() < base;
    return {
      id: `ALT-2610${25 + i}-${["4F2A", "9C1B", "7D3E", "2B8F", "5A6C"][i]}`, status: past ? (i === 0 ? "Attended" : "Completed") : "Booked",
      bookedOn: new Date(base - (5 - i) * 86400000).toISOString().slice(0, 16).replace("T", " "), start: start.toISOString(),
      end: new Date(start.getTime() + meetingMinutes * 60000).toISOString(), timeZone: "Asia/Kolkata", name: p[0], firstName: p[0].split(" ")[0],
      email: `${p[0].split(" ")[0].toLowerCase()}@gmail.com`, phone: `+91 98${i}65 4321${i}`, destination: p[1], level: p[2], intake: "September 2027",
      currentStatus: p[3], background: p[4], experience: p[5], challenges: p[6], message: `${p[2]} options in ${p[1]}`, source: p[7],
      meetLink: "https://meet.google.com/abc-defg-hij", rating: i === 0 ? "5" : "", feedback: i === 0 ? "Very clear guidance, I finally know my next steps." : "", notes: i === 0 ? "Send Campus France checklist." : "",
    };
  }).reverse();
  return {
    ok: true, bookings, statuses: ["Booked", "Completed", "Attended", "No-show", "Cancelled"], sheetUrl: "https://docs.google.com/spreadsheets/",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => ({ day, start: "10:00", end: "16:00" })),
    blocked: [{ date: "2026-12-25", reason: "Christmas" }],
    settings: {
      slotMinutes: meetingMinutes, bufferMinutes: 5, maxPerDay: 8, minNoticeHours: 12, windowDays: 21, timeZone: "Europe/Paris",
      ownerName: "Harshita Kohli", ownerRole: "Career Coach & France Expert", whatsapp: "33755749029", liveCountries: [...staticLiveCountries],
      bookingPaused: false, bookingPausedMessage: "", frenchPaused: false, frenchPausedMessage: "", bannerMessage: "",
    },
  };
}

/* ------------------------------------------------------------------ calls */

export async function fetchSlots(): Promise<string[]> {
  const mode = bookingMode();
  if (mode === "preview") { await wait(500); return previewSlots(); }
  if (mode === "off") return [];
  const response = await fetch(`${bookingEndpoint}?action=slots`);
  const data = await response.json() as { ok: boolean; slots?: string[]; error?: string };
  if (!data.ok || !Array.isArray(data.slots)) throw new Error(data.error || "Times could not be loaded.");
  return data.slots;
}

export async function bookSlot(details: BookingDetails, start: string, website = ""): Promise<BookingResult> {
  if (bookingMode() === "preview") {
    await wait(900);
    return { ok: true, id: "ALT-PREVIEW", start, end: new Date(new Date(start).getTime() + meetingMinutes * 60000).toISOString(), meetLink: "https://meet.google.com/abc-defg-hij" };
  }
  return post<BookingResult>({ action: "book", ...details, start, timeZone: visitorTimeZone(), website });
}

/** A "Learn French" request with no call: saved as a client row for Harshita to follow up from admin. */
export type FrenchEnquiryDetails = { name: string; email: string; phone: string; level: string; goal: string; availability: string; message: string };
export async function sendEnquiry(details: FrenchEnquiryDetails, website = ""): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (bookingMode() === "preview") { await wait(700); return { ok: true, id: "FR-PREVIEW" }; }
  if (!bookingEndpoint) return { ok: false, error: "Requests can't be sent just now. Please email harshita@altheaconsulting.in." };
  return post({ action: "enquiry", ...details, timeZone: visitorTimeZone(), website });
}

export async function sendFeedback(id: string, token: string, rating: number, comment: string): Promise<{ ok: boolean; error?: string; firstName?: string }> {
  if (bookingMode() === "preview") { await wait(600); return { ok: true, firstName: "Rahul" }; }
  if (!bookingEndpoint) return { ok: false, error: "Feedback is not available yet." };
  return post({ action: "feedback", id, token, rating, comment });
}

export async function adminCall<T = { ok: boolean; error?: string; code?: string }>(action: string, key: string, extra: Record<string, unknown> = {}): Promise<T> {
  if (bookingMode() === "preview") { await wait(400); return (action === "admin.data" ? previewAdmin() : { ok: true }) as T; }
  if (!bookingEndpoint) return { ok: false, error: "The booking backend is not connected yet. See booking/SETUP.md." } as T;
  return post<T>({ action, key, ...extra });
}

/* ------------------------------------------------------------------ formatting */

export const formatIn = (iso: string, timeZone: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-IN", { timeZone, ...options }).format(new Date(iso));

/** Short zone name: IST for India, CET/CEST for Paris; falls back to the GMT offset elsewhere. */
export const zoneLabel = (timeZone: string, iso = new Date().toISOString()) => {
  const name = (locale: string) => new Intl.DateTimeFormat(locale, { timeZone, timeZoneName: "short" }).formatToParts(new Date(iso)).find(p => p.type === "timeZoneName")?.value ?? "";
  if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") return "IST";
  const local = name("en-IN");
  return local && !/^GMT|^UTC/.test(local) ? local : name("en-GB") || name("en-US") || timeZone;
};

export function googleCalendarUrl(start: string, end: string, meetLink: string, ownerName: string) {
  const f = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({ action: "TEMPLATE", text: `Althéa consultation with ${ownerName}`, dates: `${f(start)}/${f(end)}`, details: `Google Meet: ${meetLink}`, location: meetLink });
  return `https://calendar.google.com/calendar/render?${params}`;
}
