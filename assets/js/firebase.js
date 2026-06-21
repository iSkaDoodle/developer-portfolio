import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getAnalytics }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyADVjgAVyn81CjwsI73F_208n2dHM-3s04",
  authDomain: "portfolio-req.firebaseapp.com",
  projectId: "portfolio-req",
  storageBucket: "portfolio-req.firebasestorage.app",
  messagingSenderId: "665132543178",
  appId: "1:665132543178:web:afe5bd19b22152b4a6d833",
  measurementId: "G-80Y0G09SS0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const contactNo = document.getElementById("contactNo").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please complete the form.");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      contactNo,
      message,
      createdAt: serverTimestamp()
    });

    alert("Message sent!");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contactNo").value = "";
    document.getElementById("message").value = "";

  } catch (error) {
    console.error(error);
    alert("Failed to send message.");
  }
});