import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config";
import { createUser } from "../../mongoDB";
import { ref, set } from "firebase/database";

const dataAddOn = async ({ uid, username, email }) => {
  try {
    await set(ref(db, `${uid}`), {
      username: username,
      email: email,
      stories: ["None"],
      audioFiles: ["None"],
    });
    console.log("Data added successfully");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const register = async ({ email, password, username }) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await createUser({ uid: credentials.user.uid, username });
    await dataAddOn({ uid: credentials.user.uid, username, email });
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
