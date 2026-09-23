import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  orderBy 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyReplaceWithYourOwnIfRestricted",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "consultancyworld2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "consultancyworld2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "consultancyworld2.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "662735113847",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:662735113847:web:consultancyworld2web",
};

// Initialize Firebase App (prevent re-initialization in Next.js SSR / HMR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication & Cloud Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Save an Eligibility Form lead to Firestore database
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
  // Extended eligibility calculator fields
  backlogCount?: string;
  workExperience?: string;
  budgetPerYear?: string;
  admitScore?: number;
  scholarshipScore?: number;
}) {
  try {
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
 * Save a 1-on-1 Mentorship Booking to Firestore database
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
 * Firebase Authentication Helper: Email & Password Sign Up
 */
export async function registerWithEmail(email: string, pass: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

/**
 * Firebase Authentication Helper: Email & Password Sign In
 */
export async function loginWithEmail(email: string, pass: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

/**
 * Firebase Authentication Helper: Sign Out
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export default app;
