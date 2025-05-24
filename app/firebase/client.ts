// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClvnss2yi9xLYfqk_lfM9ET8_s6B665II",
  authDomain: "prepify-c5767.firebaseapp.com",
  projectId: "prepify-c5767",
  storageBucket: "prepify-c5767.firebasestorage.app",
  messagingSenderId: "979561510379",
  appId: "1:979561510379:web:eca206811d9af0733e15ae",
  measurementId: "G-PMK6F61HWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);