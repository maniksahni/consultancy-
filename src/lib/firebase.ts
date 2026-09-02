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
