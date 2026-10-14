// Lazy-initialized Firebase client — zero initial-bundle overhead.
// Modules (firebase/app, firebase/firestore, firebase/auth) are loaded dynamically
// strictly upon form submission or user interaction.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedApp: any = null;
let cachedDb: any = null;

async function getFirebaseInstance() {
  if (cachedDb && cachedApp) {
    return { app: cachedApp, db: cachedDb };
  }
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.appId ||
    !firebaseConfig.projectId ||
    firebaseConfig.apiKey.includes("Dummy")
  )
    throw new Error("Firebase is not configured.");
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
    const { collection, addDoc, serverTimestamp } =
      await import("firebase/firestore");
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
 * Firebase Authentication Helpers (loaded dynamically if required)
 */
export async function registerWithEmail(email: string, pass: string) {
  try {
    const { getAuth, createUserWithEmailAndPassword } =
      await import("firebase/auth");
    const { app } = await getFirebaseInstance();
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function loginWithEmail(email: string, pass: string) {
  try {
    const { getAuth, signInWithEmailAndPassword } =
      await import("firebase/auth");
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
