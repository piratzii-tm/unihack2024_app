import { getStorage, ref, uploadBytes } from "firebase/storage";

const getFileBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

export const addSound = async (audioFileUri, filepath) => {
  const storage = getStorage();
  const pathReference = ref(storage, filepath);

  try {
    const fileBlob = await getFileBlob(audioFileUri);

    await uploadBytes(pathReference, fileBlob);
    console.log("Audio file uploaded successfully:", filepath);
  } catch (error) {
    console.error("Error when uploading audio file:", error);
  }
};
