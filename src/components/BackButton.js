import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextFont } from "../constants/themes";

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Tabs")}
      style={styles.backBtn}
    >
      <Text style={[TextFont.Text, styles.textBackBtn]}>← Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 15,
  },
  textBackBtn: {
    color: "#6E6E6E",
  },
});

export default BackButton;
