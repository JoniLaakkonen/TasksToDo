import bcrypt from "bcryptjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // ✅ Import Realtime DB functions

export const loginUser = async (username, password) => {
    try {
      const userDocRef = doc(db, "login", "4nK9NMs6bORL4zvp5vp5"); // Reference to user document
      const userSnapshot = await getDoc(userDocRef); // Fetch document
  
      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }
  
      const userData = userSnapshot.data();
      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      
      return "success";
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };