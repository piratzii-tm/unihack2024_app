import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KContainer } from "../../components";
import React, { useState } from "react";
import { Audio } from "expo-av";
import * as Sharing from "expo-sharing";
import { Icon } from "react-native-vector-icons/Ionicons";
import { KRecordButton } from "../../components/KRecordButton";
import { KUploadButton } from "../../components/KUploadButton";
import * as DocumentPicker from "expo-document-picker";
import { addSound } from "../../backend/storage/addSound";
import { getAuth } from "firebase/auth";
import { initStory } from "../../backend/database/stories/initStory";

export function RecordScreen() {
  const [recording, setRecording] = React.useState();
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );
        setIsRecording(true);
        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    // Add voice recording to firebase

    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Error", "User is not authenticated");
      return;
    }
    const userId = user.uid;

    const fileName = recording.getURI()
      ? recording.getURI().split("/").pop()
      : "unknown_file";
    const filepath = `sounds/${userId}-${fileName}`;

    setIsGenerating(true);
    await addSound(recording.getURI(), filepath);
    await initStory(filepath, fileName, status.durationMillis / 1000);
    setIsGenerating(false);

    console.log("Voice recording added successfully in firebase");
    Alert.alert("Voice recording", "Voice recording created successfully!");
    setIsRecording(false);
    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          ></Button>
          <Button
            style={styles.button}
            onPress={() => Sharing.shareAsync(recordingLine.file)}
            title="Share"
          ></Button>
        </View>
      );
    });
  }

  async function handleFileUpload() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/mpeg",
      }).then(async (response) => {
        if (response.canceled) {
          return;
        }

        const { uri, name, size } = response.assets[0];

        const user = getAuth().currentUser;
        if (!user) {
          Alert.alert("Error", "User is not authenticated");
          return;
        }
        const userId = user.uid;

        const filepath = `sounds/${userId}-${name}`;

        setIsGenerating(true);
        await addSound(uri, filepath).then(
          () => initStory(filepath, name, 250), //TODO Maybe not hardcoded
        );
        setIsGenerating(false);
        console.log(response);
      });
    } catch (err) {
      console.error("error:", err);
    }
  }

  return (
    <KContainer>
      {isGenerating && (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Your story is generating</Text>
          </View>
          <ActivityIndicator
            size={"large"}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </>
      )}
      {!isGenerating && (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Record your story</Text>
          </View>
          <View style={styles.recordButtonContainer}>
            {isRecording ? (
              <KRecordButton
                recording={recording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                style={styles.recordButtonContainerActive}
              ></KRecordButton>
            ) : (
              <KRecordButton
                recording={recording}
                startRecording={startRecording}
                stopRecording={stopRecording}
                style={styles.recordButtonContainerInactive}
              ></KRecordButton>
            )}
          </View>
          <View style={styles.uploadButtonContainer}>
            <KUploadButton handleFileUpload={handleFileUpload} />
          </View>
        </>
      )}
    </KContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
  recordButtonContainer: {
    paddingTop: 30,
    flex: 1 / 2,
  },
  uploadButtonContainer: { flex: 1 / 2 },
  titleContainer: {
    paddingTop: 50,
    flex: 1 / 2,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 30,
    fontWeight: "bold",
    color: "#6E6E6E",
    fontColor: "6E6E6E",
  },

  recordButtonContainerInactive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD1C1",
    borderRadius: 80,
    height: 150,
    width: 150,
  },
  recordButtonContainerActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD1C1",
    borderRadius: 80,
    borderWidth: 10,
    borderColor: "#ebb3a0",
    height: 150,
    width: 150,
  },
});
