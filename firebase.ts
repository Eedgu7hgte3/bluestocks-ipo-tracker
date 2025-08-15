import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification as sendEmailVerificationFn,
  type User
} from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check
let appCheck;
if (typeof window !== 'undefined') {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ld07KMrAAAAAKkWSrVI9XLzVsCz8q0-5djfN2NT'),
    isTokenAutoRefreshEnabled: true
  });
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth methods with proper typing
export { 
  auth, 
  app, 
  appCheck, 
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerificationFn as sendEmailVerification
};

export type { User };