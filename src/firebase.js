// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZP-64EWUHt4Cl6cpwP3OZ270-0s2P3JU",
  authDomain: "fir-app-994ff.firebaseapp.com",
  projectId: "fir-app-994ff",
  storageBucket: "fir-app-994ff.appspot.com",
  messagingSenderId: "157463258753",
  appId: "1:157463258753:web:8a0d707b9239a91dbd0f80",
  measurementId: "G-M26GK32RX3"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };