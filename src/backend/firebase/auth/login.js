import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export const login = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);
