import { Text, Button} from "react-native";
import {KContainer} from "../components";

export function HomeScreen({navigation}) {
    return (
        <KContainer>
            <Text>Home Screen</Text>
            <Button title={"Go to story details"} onPress={() => navigation.navigate("StoryDetails")} />
        </KContainer>
    )
}
