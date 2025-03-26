/**import bcrypt from "bcryptjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js"; // Adjust path if needed

const hashPasswords = async () => {
    const document = "4nK9NMs6bORL4zvp5vp5"; // Update as needed
    const userRef = doc(db, "login", document);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        await updateDoc(userRef, { password: hashedPassword });
        console.log(`Password updated for ${userData.username}`);
    } else {
        console.log("User not found");
    }
};

hashPasswords().catch(console.error);*/