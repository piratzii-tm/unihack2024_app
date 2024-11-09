import { View, Text, StyleSheet } from "react-native";
import { TextFont } from "../constants/themes";

export const OrSpacer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={[TextFont.Text, styles.orText]}>or</Text>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  line: {
    height: 1,
    width: 30,
    backgroundColor: "#C0B3B3",
  },
  orText: {
    color: "#C0B3B3",
    marginLeft: 8,
    marginRight: 8,
  },
});
