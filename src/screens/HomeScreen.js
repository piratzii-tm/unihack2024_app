import { Text, StyleSheet } from "react-native";
import { KContainer } from "../components";

export function HomeScreen() {
  return (
    <KContainer>
      <Text style={styles.title}>My Stories</Text>
    </KContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    color: "#6E6E6E",
    fontFamily: "DM Sans",
    alignSelf: "flex-start",
    margin: 20,
  },
});
