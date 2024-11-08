import {StyleSheet, View, Text} from "react-native";

const StoryDetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Story Details Screen</Text>
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

export default StoryDetailsScreen;