// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApps } from "firebase/app";
import { getApp } from "firebase/app";

const firebaseConfig = {
 apiKey: "AIzaSyCYsNiq4YQ_valnkAirJ9HP7usCEYJqyv4",
  authDomain: "local-grocer-7487a.firebaseapp.com",
  projectId: "local-grocer-7487a",
  storageBucket: "local-grocer-7487a.appspot.com",
  messagingSenderId: "910146713487",
  appId: "1:910146713487:web:0bc37f54e89214f680fdfa",
  measurementId: "G-KW954GLPYP"
};

const app = getApps.length > 0 ? getApp():
initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage =getStorage(app);
const auth = getAuth(app);
export { app, db, auth,storage };
