import { Text, Button } from "react-native";
import { KContainer } from "../../components";
import { logout } from "../../backend";
import { initStory } from "../../backend/database/stories/initStory";

export function HomeScreen({ navigation }) {
  return (
    <KContainer>
      <Text>Home Screen</Text>
      <Button
        title={"Go to story details"}
        onPress={() => navigation.navigate("StoryDetails")}
      />
      <Button title={"Logout"} onPress={logout} />
      <Button title={"Scan scenes"} onPress={() => initStory()} />
    </KContainer>
  );
}
