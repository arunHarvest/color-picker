import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBLeSeHeV4O8osRC-w9CU1v0X1Q-2Nx0dM",

  authDomain: "colorpicker-ilapz.firebaseapp.com",

  projectId: "colorpicker-ilapz",

  storageBucket: "colorpicker-ilapz.appspot.com",

  messagingSenderId: "929794593308",

  appId: "1:929794593308:web:d8a1b6404ab9ff611405d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db}
