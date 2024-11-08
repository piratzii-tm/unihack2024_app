import {StyleSheet, View, Text, Button} from "react-native";

export function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title={"Go to story details"} onPress={() => navigation.navigate("StoryDetails")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})