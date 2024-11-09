import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const KRecordButton = ({ recording, startRecording, stopRecording }) => {
  return (
    <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
      <View style={styles.container}>
        <FontAwesome name="microphone" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD1C1",
    borderRadius: 50,
    height: 70,
    width: 100,
  },
});
