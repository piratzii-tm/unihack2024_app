import { View, StyleSheet, Text } from "react-native";
import { TextFont } from "../constants/themes";
import CustomInfoIcon from "./CustomInfoIcon";

const InfoContainer = ({ text }) => {
  return (
    <View style={styles.infoContainer}>
      <CustomInfoIcon />
      <Text style={[TextFont.Text, styles.infoText]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "rgba(221,221,221,0.7)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "90%",
    borderRadius: 15,
    marginTop: 15,
    flexDirection: "row",
  },
  infoText: {
    color: "#6E6E6E",
    marginLeft: 10,
    marginRight: 10,
  },
});

export default InfoContainer;
