import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";



};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

    const sendBtn = document.getElementById("sendBtn");

    if (!sendBtn) {
        console.error("Send button not found.");
        return;
    }

    sendBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const countryCode = document.getElementById("countryCode").value;
    const contactNo = document.getElementById("contactNo").value.trim();

    const fullPhone = `${countryCode}${contactNo}`;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please complete the form.");
        return;
    }

    if (name.length < 2) {
        alert("Name too short.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters.");
        return;
    }

    if (contactNo && !/^[0-9]{7,15}$/.test(contactNo)) {
        alert("Please enter a valid phone number.");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    sendBtn.style.opacity = "0.6";

    try {

        await addDoc(collection(db, "messages"), {
            name,
            email,
            contactNo: fullPhone,
            message,
            createdAt: serverTimestamp()
        });

        alert("Message sent successfully!");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("contactNo").value = "";
        document.getElementById("message").value = "";
        document.getElementById("countryCode").value = "+63";

    } catch (error) {

        console.error(error);
        alert("Failed to send message.");

    } finally {

    sendBtn.disabled = false;
    sendBtn.textContent = "SEND";
    sendBtn.style.opacity = "1";

    }

  });
});