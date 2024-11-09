import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, firestore } from "../../config";
import { collections } from "../constants";
import { handleSceneGeneration } from "../../../ai/openai";
// import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

export const initStory = async (audioFile) => {
  // const storage = getStorage();
  //
  // // Step 1: Upload audio file to Firebase Storage
  const audioFilePath = "sounds/three-little-pigs.mp3";
  // const audioRef = storageRef(storage, audioFilePath);
  //
  // try {
  //   await uploadBytes(audioRef, audioFile);
  //   console.log("Audio file uploaded successfully:", audioFilePath);
  // } catch (error) {
  //   console.error("Error uploading file:", error);
  //   return;
  // }

  // Step 2: Generate transcript using AI with the uploaded audio file's path
  let transcriptGenerated = await handleSceneGeneration(audioFilePath);
  try {
    transcriptGenerated = JSON.parse(transcriptGenerated);
  } catch (err) {}

  // const transcriptGenerated = [
  //   {
  //     startingTime: "0",
  //     description:
  //       "A peaceful valley, blooming wildflowers, chirping birds, cozy farm, tidy pigsty, shady oak tree, soft light over hills.",
  //   },
  //   {
  //     startingTime: "30",
  //     description:
  //       "Mummy Pig and three little pigs, mud patch, oink ing, rolling around.",
  //   },
  //   {
  //     startingTime: "60",
  //     description: "Winding lane, bordered by wheat fields, buzzing bees.",
  //   },
  //   {
  //     startingTime: "90",
  //     description: "First pig, straw house, row of sunflowers, valley breeze.",
  //   },
  //   {
  //     startingTime: "120",
  //     description:
  //       "Big bad wolf, near straw house, knocking at door, scattering straw.",
  //   },
  //   {
  //     startingTime: "150",
  //     description:
  //       "Second pig, stick house, edge of meadow, bright flowers, tall grass.",
  //   },
  //   {
  //     startingTime: "180",
  //     description: "Wolf, stick house, huff, puff, pieces.",
  //   },
  //   {
  //     startingTime: "250",
  //     description:
  //       "Third pig, brick house on hill, view of valley, towering oak tree.",
  //   },
  //   {
  //     startingTime: "300",
  //     description:
  //       "Wolf, brick house, knocking, huffing, puffing, brick house stands firm.",
  //   },
  //   {
  //     startingTime: "340",
  //     description:
  //       "Wolf defeated, slinks back into forest, third pig happy in brick house, peaceful living.",
  //   },
  // ];

  // Step 3: Save transcript and user data to Firestore
  try {
    const storyDoc = await addDoc(collection(firestore, collections.stories), {
      uid: auth.currentUser.uid,
      transcriptGenerated,
    });

    console.log("Document written with ID: ", storyDoc.id);

    console.log(transcriptGenerated);

    try {
      transcriptGenerated = JSON.parse(transcriptGenerated);
    } catch (err) {}

    // Step 4: Save frames data in Realtime Database using Firestore document ID
    const frames = transcriptGenerated?.map((element) => ({
      statingTime: element.startingTime,
      prompt: element.description,
      link: "",
    }));

    await set(ref(db, `${collections.stories}/${storyDoc.id}`), {
      id: storyDoc.id,
      audio: "",
      frames,
    });

    console.log("Frames data successfully saved to Realtime Database");
  } catch (error) {
    console.error("Error adding document:", error);
  }
};
