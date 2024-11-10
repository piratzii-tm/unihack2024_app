import { StyleSheet, Text } from "react-native";
import { KContainer } from "../../components";
import { TextFont } from "../../constants/themes";
import LogoutBtn from "../../components/LogoutBtn";
import UseStepsContainer from "../../components/UseStepsContainer";

export function SettingsScreen() {
  return (
    <KContainer>
      <Text style={[TextFont.Text, styles.title]}>Settings</Text>
      <UseStepsContainer />
      <LogoutBtn />
    </KContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    fontSize: 32,
    color: "#6E6E6E",
    marginTop: 35,
    marginLeft: 30,
  },
});
