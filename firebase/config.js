import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtYyMmbBG-ux1MS5CGcKDvDwwUGc0YwDk",
  authDomain: "reactnativeproj-7483a.firebaseapp.com",
  projectId: "reactnativeproj-7483a",
  storageBucket: "reactnativeproj-7483a.appspot.com",
  messagingSenderId: "684169656477",
  appId: "1:684169656477:android:0aeb56a3ce1f0ce1da7c74",
  measurementId: "G-QR36HLRTM8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
