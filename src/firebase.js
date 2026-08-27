import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5NpAo-3bNStdui2N1YF7R4JWF2Xy_Rtc",
  authDomain: "jaswonharika-fc6d6.firebaseapp.com",
  projectId: "jaswonharika-fc6d6",
  storageBucket: "jaswonharika-fc6d6.firebasestorage.app",
  messagingSenderId: "884871975081",
  appId: "1:884871975081:web:8c5cc400afdc68a47199b8",
  measurementId: "G-Z06PRS21EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save RSVP response
export const saveRSVP = async (rsvpData) => {
  try {
    console.log("Attempting to save RSVP:", rsvpData);
    const docRef = await addDoc(collection(db, "rsvps"), {
      ...rsvpData,
      createdAt: serverTimestamp()
    });
    console.log("RSVP saved with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving RSVP:", error.code, error.message);
    alert("Firebase Error: " + error.code + " - " + error.message);
    return { success: false, error: error.message };
  }
};

export { db };
