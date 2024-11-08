import {SafeAreaView} from "react-native";

export const KContainer = ({children}) => {
    return(
        <SafeAreaView style = {{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
            }}>
            {children}
        </SafeAreaView>
    )
}