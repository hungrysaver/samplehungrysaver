import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBi5HLk_QwXv69DuUCejRDgk8rqmWVSvB4",
  authDomain: "hungrysaver-a2423.firebaseapp.com",
  projectId: "hungrysaver-a2423",
  storageBucket: "hungrysaver-a2423.firebasestorage.app",
  messagingSenderId: "270982731070",
  appId: "1:270982731070:web:46c712af4168008a6bc86f"
};

// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;