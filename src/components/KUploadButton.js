import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const KUploadButton = ({ handleFileUpload }) => {
  return (
    <TouchableOpacity onPress={handleFileUpload} style={[styles.button]}>
      <FontAwesome name="file" size={20} color={"#6E6E6E"} />
      <Text style={styles.textButton}>Upload file</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",

    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 200,
  },
  textButton: {
    fontWeight: "bold",
    color: "#6E6E6E",
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
