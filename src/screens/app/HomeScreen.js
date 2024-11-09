import { Text, Button, StyleSheet, ScrollView, View } from "react-native";
import { KContainer } from "../../components";
import { logout } from "../../backend";
import { initStory } from "../../backend/database/stories/initStory";
import { TextFont } from "../../constants/themes";
import StoryCard from "../../components/StoryCard";

const MOCK_STORIES = [
  { name: "Story 1", duration: 310 },
  { name: "Story 2", duration: 900 },
  { name: "Story 3", duration: 5730 },
];

export function HomeScreen({ navigation }) {
  return (
    <KContainer>
      <Text style={[TextFont.Text, styles.title]}>My stories</Text>
      <View style={styles.storiesContainer}>
        {MOCK_STORIES.map((story, index) => (
          <StoryCard key={index} story={story} />
        ))}
      </View>
      <Button
        title={"Go to story details"}
        onPress={() => navigation.navigate("StoryDetails")}
      />
      <Button title={"Scan scenes"} onPress={() => initStory()} />
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
  storiesContainer: {
    width: "100%",
    marginTop: 35,
    alignItems: "center",
    gap: 10,
  },
});
