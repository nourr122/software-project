// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApps } from "firebase/app";
import { getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBYomc4_yge6LkrnCjqL8OcG3xYKNoG78Y",
  authDomain: "software-project-523c8.firebaseapp.com",
  projectId: "software-project-523c8",
  storageBucket: "software-project-523c8.appspot.com",
  messagingSenderId: "359592144028",
  appId: "1:359592144028:web:307a49bd93c58369135159"
};

const app = getApps.length > 0 ? getApp():
initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage =getStorage(app);
const auth = getAuth(app);
export { app, db, auth,storage };
