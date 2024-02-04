// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const functions = getFunctions(app);

isSupported().then((isSupported) => {
  if (isSupported) {
    getAnalytics(app);
  }
});

/**
 * Signs the user in with a Google popup
 * @returns {Promise<User>} A promise that resolves with the user object
 */

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  try {
    return signInWithPopup(auth, provider);
  } catch (error: any) {
    console.error(error.message);
  }
};

/**
 *  Signs the user out
 * @returns {Promise<void>} A promise that resolves when the user is signed out
 */

export const signOut = () => {
  return auth.signOut();
};

/**
 *  Trigger a callback when user auth state changes
 * @returns a function to unsubscribe callback
 */

export function onAuthStateChangedHelper(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
