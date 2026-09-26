// Lazy-initialized Firebase client — zero initial-bundle overhead.
// Modules (firebase/app, firebase/firestore, firebase/auth) are loaded dynamically
// strictly upon form submission or user interaction.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyReplaceWithYourOwnIfRestricted",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "consultancyworld2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "consultancyworld2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "consultancyworld2.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "662735113847",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:662735113847:web:consultancyworld2web",
};

let cachedApp: any = null;
let cachedDb: any = null;

async function getFirebaseInstance() {
  if (cachedDb && cachedApp) {
    return { app: cachedApp, db: cachedDb };
  }
  const { initializeApp, getApps, getApp } = await import("firebase/app");
  const { getFirestore } = await import("firebase/firestore");
  cachedApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  cachedDb = getFirestore(cachedApp);
  return { app: cachedApp, db: cachedDb };
}

/**
 * Save an Eligibility Form lead to Firestore database (dynamically loaded)
 */
export async function saveEligibilityLead(data: {
  fullName: string;
  phone: string;
  email: string;
  highestEducation: string;
  gradePercentage: string;
  targetCountry: string;
  targetIntake?: string;
  englishTest?: string;
  englishScore?: string;
  backlogCount?: string;
  workExperience?: string;
  budgetPerYear?: string;
  admitScore?: number;
  scholarshipScore?: number;
}) {
  try {
    const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
    const { db } = await getFirebaseInstance();
    const docRef = await addDoc(collection(db, "leads"), {
      ...data,
      source: "website_eligibility_form",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error saving lead to Firestore:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Save a 1-on-1 Mentorship Booking to Firestore database (dynamically loaded)
 */
export async function saveMentorshipBooking(data: {
  fullName: string;
  whatsapp: string;
  email?: string;
  qualification: string;
  targetCountry: string;
  targetIntake: string;
  helpNeeded: string;
  preferredSlot?: string;
  utm?: Record<string, any>;
}) {
  try {
    const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
    const { db } = await getFirebaseInstance();

    // Defensive input sanitization & length bounding
    const payload: Record<string, any> = {
      fullName: (data.fullName || "").replace(/<[^>]*>/g, "").replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim().slice(0, 100),
      whatsapp: (data.whatsapp || "").replace(/\D/g, "").slice(0, 10),
      qualification: (data.qualification || "").replace(/<[^>]*>/g, "").replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim().slice(0, 250),
      targetCountry: (data.targetCountry || "").slice(0, 50),
      targetIntake: (data.targetIntake || "").slice(0, 50),
      helpNeeded: (data.helpNeeded || "").slice(0, 100),
      source: "personal_mentorship_booking",
      createdAt: serverTimestamp(),
      status: "pending_review",
    };

    if (data.email) {
      payload.email = data.email.replace(/<[^>]*>/g, "").trim().slice(0, 100);
    }
    if (data.preferredSlot) {
      payload.preferredSlot = data.preferredSlot.slice(0, 100);
    }
    if (data.utm && typeof data.utm === "object") {
      payload.utm = data.utm;
    }

    const docRef = await addDoc(collection(db, "mentorship_bookings"), payload);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error saving mentorship booking to Firestore:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Firebase Authentication Helpers (loaded dynamically if required)
 */
export async function registerWithEmail(email: string, pass: string) {
  try {
    const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
    const { app } = await getFirebaseInstance();
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function loginWithEmail(email: string, pass: string) {
  try {
    const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
    const { app } = await getFirebaseInstance();
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function logoutUser() {
  try {
    const { getAuth, signOut } = await import("firebase/auth");
    const { app } = await getFirebaseInstance();
    const auth = getAuth(app);
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
