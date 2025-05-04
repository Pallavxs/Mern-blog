import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mern-blog-9cd73.firebaseapp.com",
  projectId: "mern-blog-9cd73",
  storageBucket: "mern-blog-9cd73.firebasestorage.app",
  messagingSenderId: "230881624298",
  appId: "1:230881624298:web:f37bec9c3d5561bb7e1793",
  measurementId: "G-89WM153XF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}