import {StyleSheet, View, Text} from "react-native";

export function RecordScreen(){
    return(
        <View style={styles.container}>
            <Text>Record Screen</Text>
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