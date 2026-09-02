import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDy_q1AnZlQb-K_ynfRLEOXRNxYEhqvOAg",
  authDomain: "furniture-showroom-7e298.firebaseapp.com",
  projectId: "furniture-showroom-7e298",
  storageBucket: "furniture-showroom-7e298.firebasestorage.app",
  messagingSenderId: "759588220514",
  appId: "1:759588220514:web:77426285140a79c9fceb3b",
  measurementId: "G-7PRWQM5W1F"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
