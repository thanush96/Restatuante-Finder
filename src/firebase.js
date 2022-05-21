// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ6R3arSSqWziwgsdy_cXEZWzmqFlKagg",
  authDomain: "project-cb385.firebaseapp.com",
  projectId: "project-cb385",
  storageBucket: "project-cb385.appspot.com",
  messagingSenderId: "856906257405",
  appId: "1:856906257405:web:fb1fc34d79b4aff35cbf94",
  measurementId: "G-X9C3NSSBT6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
