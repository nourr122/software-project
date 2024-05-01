// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getFirestore , collection} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYomc4_yge6LkrnCjqL8OcG3xYKNoG78Y",
  authDomain: "software-project-523c8.firebaseapp.com",
  databaseURL: "https://software-project-523c8-default-rtdb.firebaseio.com",
  projectId: "software-project-523c8",
  storageBucket: "software-project-523c8.appspot.com",
  messagingSenderId: "359592144028",
  appId: "1:359592144028:web:307a49bd93c58369135159"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
// const app = initializeApp(app);


//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app) ;
//, { presistence: getReactNativePresistence(AsyncStorage)
//});

export { app, db, auth};