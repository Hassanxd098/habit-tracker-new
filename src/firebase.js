//src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const googleProvider = new GoogleAuthProvider();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBVz2ATOzUBeFPr4Tm2sKbjXU_XerEfVvM",
//   authDomain: "habit-tracker-f596d.firebaseapp.com",
//   projectId: "habit-tracker-f596d",
//   storageBucket: "habit-tracker-f596d.firebasestorage.app",
//   messagingSenderId: "614989287750",
//   appId: "1:614989287750:web:2dfad0b2890e78c3331547",
//   measurementId: "G-XGXR8TYT62",
// };

// //Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// src/firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVz2ATOzUBeFPr4Tm2sKbjXU_XerEfVvM",
  authDomain: "habit-tracker-f596d.firebaseapp.com",
  projectId: "habit-tracker-f596d",
  storageBucket: "habit-tracker-f596d.appspot.com", // ✅ fixed earlier
  messagingSenderId: "614989287750",
  appId: "1:614989287750:web:2dfad0b2890e78c3331547",
  measurementId: "G-XGXR8TYT62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };
