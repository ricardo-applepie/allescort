// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArbabS-OYL3ZtUGUsU0_U_Pmg3mkF0yH4",
  authDomain: "escortapp-19073.firebaseapp.com",
  projectId: "escortapp-19073",
  storageBucket: "escortapp-19073.firebasestorage.app",
  messagingSenderId: "465025150652",
  appId: "1:465025150652:web:d4870f3fef2d2c347a6ab9",
  measurementId: "G-R9DFPPJZ74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

