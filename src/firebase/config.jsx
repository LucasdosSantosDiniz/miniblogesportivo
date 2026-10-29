// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY_qt7VN4tdYZb-Enj5zqMk1KSKcaI0w8",
  authDomain: "miniblogesportivo.firebaseapp.com",
  projectId: "miniblogesportivo",
  storageBucket: "miniblogesportivo.firebasestorage.app",
  messagingSenderId: "54992971578",
  appId: "1:54992971578:web:5bef15965777a2e7285203",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
