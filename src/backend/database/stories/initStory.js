import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, firestore } from "../../config";
import { collections } from "../constants";
import { handleSceneGeneration } from "../../../ai/openai";
import { sleep } from "openai/core";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { getSound } from "../../storage";

export const initStory = async (audioFile, title, duration) => {
  // Step 2: Generate transcript using AI with the uploaded audio file's path
  let transcriptGenerated = await handleSceneGeneration(audioFile);

  // Step 3: Save transcript and user data to Firestore
  try {
    const storyDoc = await addDoc(collection(firestore, collections.stories), {
      uid: auth.currentUser.uid,
      transcriptGenerated,
    });

    console.log("Document written with ID: ", storyDoc.id);

    console.log(transcriptGenerated);

    // Step 4: Save frames data in Realtime Database using Firestore document ID
    const frames = [];

    //TODO Change to transcriptGenerated.length
    for (let i = 0; i < 2; i = i + 1) {
      let element = transcriptGenerated[i];

      let response = await axios.post(
        "https://backend.blockadelabs.com/api/v1/skybox",
        {
          prompt: element.description,
          skybox_style_id: 93,
        },
      );

      console.log(response.data, Object.keys(response));
      const responseId = response.data.id;

      console.log("Staring the image generation");

      do {
        await sleep(1000);
        console.log("Waiting...");
        response = await axios.get(
          `https://backend.blockadelabs.com/api/v1/imagine/requests/${responseId}`,
        );
      } while (response.data.request.status !== "complete");

      console.log(response.data.request);
      console.log("Finished image generation");

      frames.push({
        startingTime: element.startingTime,
        prompt: element.description,
        link: response.data.request.file_url,
      });
    }

    console.log(frames);

    const audio = await getSound(audioFile);

    await set(ref(db, `${collections.stories}/${storyDoc.id}`), {
      id: storyDoc.id,
      audio,
      frames,
      title,
      duration,
    });

    console.log("Frames data successfully saved to Realtime Database");
  } catch (error) {
    console.error("Error adding document:", error);
  }
};
