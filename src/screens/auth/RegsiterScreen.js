import { Text, Button } from "react-native";
import { KContainer } from "../../components";
import { register } from "../../backend/firebase/auth/register";

export function RegisterScreen({ navigation }) {
  return (
    <KContainer>
      <Text>Register Screen</Text>
      <Button
        title={"Register"}
        onPress={() =>
          register({
            email: "iulian1@test.test",
            password: "123456",
            username: "poe",
          })
        }
      />
    </KContainer>
  );
}