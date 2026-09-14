import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// اطلاعات پروژه Firebase تو
const firebaseConfig = {
  apiKey:"AIzaSyCETEnSzbQZUEUJResbgsNzgcE-fgzJCzE",
  authDomain:  "hamedli.firebaseapp.com",
  projectId:"hamedli",
  storageBucket:  "hamedli.firebasestorage.app",
  messagingSenderId:"678250073664",
  appId:"1:678250073664:web:15a051b8152c1534c2d9a5",
  measurementId: "G-W8NN2VCDJ9"
};


// اتصال به Firebase

const app = initializeApp(firebaseConfig);


// اتصال به Firestore

export const db = getFirestore(app);
