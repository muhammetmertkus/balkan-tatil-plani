import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3qr1o-_VamT98leGQhndbZyyQi0hqfOA",
  authDomain: "balkanlar-a6040.firebaseapp.com",
  projectId: "balkanlar-a6040",
  storageBucket: "balkanlar-a6040.firebasestorage.app",
  messagingSenderId: "817339268914",
  appId: "1:817339268914:web:04a0762d33b6d8d26f612b",
  measurementId: "G-2PDECPD7FZ"
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

