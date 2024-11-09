import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config";

export const getSound = (filePath) => {
  const pathReference = ref(storage, filePath);
  return getDownloadURL(pathReference).catch((error) => {
    console.log(error);
    return null;
  });
};
