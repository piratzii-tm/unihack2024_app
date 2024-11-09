import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextFont } from "../constants/themes";
import * as React from "react";
import CustomIcon from "./CustomIcon";

const timeConverter = (duration) => {
  let h = Math.floor(duration / 3600);
  duration %= 3600;
  let min = Math.floor(duration / 60);
  let sec = duration % 60;

  // Format with leading zeros
  h = String(h).padStart(2, "0");
  min = String(min).padStart(2, "0");
  sec = String(sec).padStart(2, "0");

  return `${h}:${min}:${sec}`;
};

const StoryCard = ({ story, onPress }) => {
  console.log(story.title);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <CustomIcon style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[TextFont.Text, styles.name]}>{story.title}</Text>
        <Text style={[TextFont.Text, styles.duration]}>
          {timeConverter(story.duration)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    gap: 10,
    width: "90%",
    borderRadius: 15,
    padding: 10,
  },
  name: {
    fontSize: 16,
    color: "#6E6E6E",
  },
  duration: {
    fontSize: 16,
    color: "#A7A5A5",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  textContainer: {
    justifyContent: "center",
    gap: 5,
  },
});

export default StoryCard;
