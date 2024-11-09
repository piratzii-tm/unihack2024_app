import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { KContainer } from "../../components";
import React, { useState } from "react";
import { Audio } from "expo-av";
import * as Sharing from "expo-sharing";
import { Icon } from "react-native-vector-icons/Ionicons";
import { KRecordButton } from "../../components/KRecordButton";
import { KUploadButton } from "../../components/KUploadButton";
import * as DocumentPicker from "expo-document-picker";

export function RecordScreen() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");

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
      }).then((response) => {
        if (response.canceled) {
          return;
        }
        // output:
        // {"assets": [{"mimeType": "audio/mpeg", "name": "three-little-pigs.mp3",
        // "size": 3082031,
        // "uri": "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/4481124c-2136-46cc-8b95-e065b8239858.mp3"}], "canceled": false}

        // add functionality to send to firebase

        console.log(response);
      });
    } catch (err) {
      console.error("error:", err);
    }
  }

  return (
    <KContainer>
      <Text>Record your story</Text>
      <View style={styles.recordButtonContainer}>
        <KRecordButton
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        ></KRecordButton>

        <KUploadButton handleFileUpload={handleFileUpload} />
      </View>

      {getRecordingLines()}
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
});
