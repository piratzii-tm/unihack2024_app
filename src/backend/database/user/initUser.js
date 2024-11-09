import { ref, set } from "firebase/database";
import { db } from "../../config";
import { collections } from "../constants";

export const initUser = async ({ credentials }) =>
  await set(ref(db, `${collections.user}${credentials.user.uid}`), {
    email: credentials.user.email,
    stories: ["D16sZZkL9hMbcsdh4kMD"],
  }).catch(console.log);
