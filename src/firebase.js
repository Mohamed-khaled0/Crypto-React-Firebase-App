// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO4I_Q1x_VbM_kA52RzJEYMzgAmLLBCJk",
  authDomain: "crypto-6f014.firebaseapp.com",
  projectId: "crypto-6f014",
  storageBucket: "crypto-6f014.firebasestorage.app",
  messagingSenderId: "670803374770",
  appId: "1:670803374770:web:ce2ccb565b4caa1017cfab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
