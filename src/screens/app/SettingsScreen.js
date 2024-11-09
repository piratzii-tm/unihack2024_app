import { StyleSheet, View, Text, Button } from "react-native";
import { KContainer } from "../../components";
import { logout } from "../../backend";

export function SettingsScreen() {
  return (
    <KContainer>
      <Text>Settings Screen</Text>
      <Button title={"Logout"} onPress={logout} />
    </KContainer>
  );
}
