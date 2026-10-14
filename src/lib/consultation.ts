import { z } from "zod";
export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(100),
  phone: z
    .string()
    .trim()
    .max(25)
    .refine(
      (v) => !v || /^\+?[\d\s()-]{7,25}$/.test(v),
      "Enter a valid phone number.",
    ),
  targetCountry: z.enum([
    "France",
    "UK",
    "USA",
    "Canada",
    "Germany",
    "Australia",
    "Ireland",
    "Undecided",
  ]),
  background: z.string().trim().max(500),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more about your plans.")
    .max(1500),
  preferredTime: z.string().trim().max(100),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please consent to an enquiry response." }),
  }),
  website: z.string().max(0),
});
export const enquiryEnabled =
  process.env.NEXT_PUBLIC_ENQUIRIES_ENABLED === "true" &&
  !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("Dummy") &&
  !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID &&
  !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
  !!process.env.NEXT_PUBLIC_PRIVACY_CONTACT &&
  !!process.env.NEXT_PUBLIC_RETENTION_DAYS;
let appCheckReady: Promise<void> | undefined;
export async function submitEnquiry(input: unknown) {
  const data = enquirySchema.parse(input);
  if (!enquiryEnabled)
    throw new Error(
      "Enquiry delivery is not yet enabled. Your request has not been sent.",
    );
  const { initializeApp, getApps, getApp } = await import("firebase/app");
  const app = getApps().length
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });
  if (!appCheckReady) {
    appCheckReady = (async () => {
      const { initializeAppCheck, ReCaptchaV3Provider, getToken } =
        await import("firebase/app-check");
      const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        ),
        isTokenAutoRefreshEnabled: true,
      });
      await getToken(appCheck);
    })();
  }
  try {
    await appCheckReady;
  } catch (error) {
    appCheckReady = undefined;
    throw error;
  }
  const { getFirestore, collection, addDoc, serverTimestamp } =
    await import("firebase/firestore");
  const { website, ...payload } = data;
  void website;
  const result = await addDoc(
    collection(getFirestore(app), "althea_enquiries"),
    {
      ...payload,
      createdAt: serverTimestamp(),
      status: "pending_review",
      source: "althea_website",
      privacyVersion: "2026-10-14",
    },
  );
  return result.id;
}
