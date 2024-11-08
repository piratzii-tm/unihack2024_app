import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { createUser } from "../../mongoDB";

export const register = ({ email, password, username }) =>
  createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
    return createUser({ uid: credentials.user.uid, username });
  });
