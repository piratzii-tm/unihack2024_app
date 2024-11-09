import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { initUser } from "../../database";

export const register = async ({ email, password }) => {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  )
    .then((credentials) => initUser({ credentials }))
    .catch(console.log);
};
