import { StyleSheet, Text, View } from "react-native";
import { TextFont } from "../constants/themes";
import InfoContainer from "./InfoContainer";

const UseStepsContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={[TextFont.Text, styles.stepsTxt]}>VR using steps:</Text>
      <InfoContainer
        text={
          "1. Record or upload an audio file or go to your stories and select one of your already existing stories"
        }
      />
      <InfoContainer text={"2. Wait for the scenes to be generated"} />
      <InfoContainer text={"3. Connect your VR Headset"} />
      <InfoContainer text={"4. Select the story you want and enjoy!"} />
    </View>
  );
};

const styles = StyleSheet.create({
  stepsTxt: {
    fontSize: 22,
    color: "#6E6E6E",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 25,
    padding: 15,
    borderRadius: 15,
    marginTop: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default UseStepsContainer;
