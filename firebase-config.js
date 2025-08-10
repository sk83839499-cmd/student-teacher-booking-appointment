// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, get, onValue } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAQxxhlUL2IR2v4YdJFvgGBChv1pYu9Ia0",
    authDomain: "student-2b771.firebaseapp.com",
    databaseURL: "https://student-2b771-default-rtdb.firebaseio.com",
    projectId: "student-2b771",
    storageBucket: "student-2b771.firebasestorage.app",
    messagingSenderId: "53696547205",
    appId: "1:53696547205:web:42d5a2589bcf156b1cdcec"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, get, onValue };
