// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhFCORTuPgCzpQwA_nFcPuRlhVSvJoJ54",
  authDomain: "connectx-portal.firebaseapp.com",
  projectId: "connectx-portal",
  storageBucket: "connectx-portal.appspot.com",
  messagingSenderId: "900527985371",
  appId: "1:900527985371:web:5349f30733164b3b35b2fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;