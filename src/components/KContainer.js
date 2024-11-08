import {SafeAreaView} from "react-native";

export const KContainer = ({children}) => {
    return(
        <SafeAreaView style = {{
                flex: 1,
                backgroundColor: '#FFE4B5',
                alignItems: 'center',
            }}>
            {children}
        </SafeAreaView>
    )
}