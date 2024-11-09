import { Text, Button } from "react-native";
import { KContainer } from "../../components";
import { logout } from "../../backend/firebase/auth/logout";

export function HomeScreen({ navigation }) {
  return (
    <KContainer>
      <Text>Home Screen</Text>
      <Button
        title={"Go to story details"}
        onPress={() => navigation.navigate("StoryDetails")}
      />
      <Button title={"Logout"} onPress={logout} />
    </KContainer>
  );
}
