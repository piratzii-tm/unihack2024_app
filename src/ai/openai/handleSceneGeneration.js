import OpenAI from "openai";
import { getSound } from "../../backend";

const prompt = `
  Context: 
    You will receive a story that will include different scenes that will later be used to generate images. 
    The scenes need to be from the given story, without too much added things.
    The description of the scene should detail a 360 scene of the image of scenario, be concise, 75 words enumerated, give the words comma separated
  Output:
    The output needs to contain the following items:
    - the starting of scene represented by the number of seconds passed from the start (example 120, representing 120 seconds from the start)
    - the scene description you've created
    The scenes should be generated to be displayed max 45 and minimum 30 seconds on the screen. Generate scenes to handle all the audio and the scene to be max 45 seconds.
    The scenes should handle the entire audio. Generate scenes for the entire audio.
    The output needs to be used as an object, so return it as described below.
  Output example:
    Below is described how the output should look. Remember, it will later be used to create a JSON object, so return it as a string that can be used in a JSON.stringify()
    [{startingTime: "0", description: "Flowers, trees and stuff"},{startingTime: "60", description: "Sunset over a lake"}]
`;

export const handleSceneGeneration = async (filePath) => {
  const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_TOKEN });

  // Step 1: Retrieve audio file and convert to Base64
  const url = await getSound(filePath);
  const audioResponse = await fetch(url);
  const blob = await audioResponse.blob();
  const base64str = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64 content
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Convert Blob to Base64
  });

  // Step 2: Prepare request for OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4o-audio-preview",
    modalities: ["text", "audio"],
    audio: { voice: "alloy", format: "wav" },
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "input_audio",
            input_audio: { data: base64str, format: "mp3" },
          },
        ],
      },
    ],
  });

  let result = response.choices[0].message.audio.transcript || "{}";
  result = result.replace(/^```json\n/, "").replace(/\n```$/, "");

  console.log(result);

  const sceneData = JSON.parse(result); // Convert to JavaScript object if needed

  console.log("SCENE_DATA", sceneData);
  return sceneData;
};
