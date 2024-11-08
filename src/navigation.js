import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, RecordScreen, SettingsScreen } from "./screens/";
import StoryDetailsScreen from "./screens/StoryDetailsScreen";
import { createStackNavigator } from "@react-navigation/native/src/__stubs__/createStackNavigator";

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Record" component={RecordScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={TabNavigator} />
                <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}