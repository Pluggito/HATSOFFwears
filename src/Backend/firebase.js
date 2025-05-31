import { initializeApp } from "firebase/app";
import { setLogLevel } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_L7-ELFdmEnZdJOdUK5klUIX0WzuRW28",
  authDomain: "email-hatsoff.firebaseapp.com",
  projectId: "email-hatsoff",
  storageBucket: "email-hatsoff.firebasestorage.app",
  messagingSenderId: "650231545482",
  appId: "1:650231545482:web:8df9b954d051eefbed3773",
};

setLogLevel("silent"); // Set log level to silent to suppress logs
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { addDoc, db, collection, app };
