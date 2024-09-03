// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg9dVzzUU-YgXq7Zw8DDcc_xcgYkrhYv0",
  authDomain: "podcast-479be.firebaseapp.com",
  projectId: "podcast-479be",
  storageBucket: "podcast-479be.appspot.com",
  messagingSenderId: "462389170529",
  appId: "1:462389170529:web:3d7496eaec7853bb39b520",
  measurementId: "G-KCJ1HNHX6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
