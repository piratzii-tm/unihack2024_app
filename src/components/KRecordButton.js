import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const KRecordButton = ({
  recording,
  startRecording,
  stopRecording,
  style,
}) => {
  return (
    <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
      <View style={style}>
        <FontAwesome name="microphone" size={60} color={"#6E6E6E"} />
      </View>
    </TouchableOpacity>
  );
};
