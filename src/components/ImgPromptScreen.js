import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextFont } from "../constants/themes";

const ImgPromptScreen = ({ item, image, index }) => {
  const width = Dimensions.get("window").width;

  return (
    <View style={[styles.container, { width }]}>
      <Image
        style={styles.image}
        source={{ uri: image[index].img }}
        height={width / 2}
      />
      <TextInput
        style={styles.promptContainer}
        placeholder={"Prompt goes here..."}
        placeholderTextColor={"#B4ABAB"}
        multiline={true}
      >
        {image[index].prompt}
      </TextInput>
      <TouchableOpacity onPress={() => null} style={styles.regenerateBtn}>
        <Text style={[TextFont.Text, styles.regenerateBtnTxt]}>Regenerate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    marginTop: 25,
  },
  image: {
    borderRadius: 15,
    width: "90%",
  },
  promptContainer: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 15,
    height: "17%",
    borderRadius: 15,
    padding: 10,
    fontFamily: "DM Sans",
  },
  regenerateBtn: {
    backgroundColor: "#FFD1C1",
    width: "50%",
    height: "8%",
    marginTop: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  regenerateBtnTxt: {
    color: "#6E6E6E",
    fontSize: 20,
  },
});

export default ImgPromptScreen;