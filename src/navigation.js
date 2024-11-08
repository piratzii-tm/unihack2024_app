import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, RecordScreen, SettingsScreen } from "./screens/";
import StoryDetailsScreen from "./screens/StoryDetailsScreen";
import { createStackNavigator } from "@react-navigation/native/src/__stubs__/createStackNavigator";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TabNavigator = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: () => (
                    <FontAwesome name="home" size={25} color="black" />
                ),
            }}/>
            <Tab.Screen name="Record" component={RecordScreen} options={{
                tabBarIcon: () => (
                    <FontAwesome name="microphone" size={25} color="black" />
                ),
            }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: () => (
                    <FontAwesome name="cog" size={25} color="black" />
                ),
            }}/>
        </Tab.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Tabs" component={TabNavigator} />
                <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}