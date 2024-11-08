import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  RecordScreen,
  RegisterScreen,
  SettingsScreen,
  LoginScreen,
} from "./screens/";
import StoryDetailsScreen from "./screens/app/StoryDetailsScreen";
import { createStackNavigator } from "@react-navigation/native/src/__stubs__/createStackNavigator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { auth } from "./backend/firebase/config";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={25} color="black" />,
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="microphone" size={25} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="cog" size={25} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={TabNavigator} />
    <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
    <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
  </Stack.Navigator>
);

export const Navigation = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLogged(user !== null);
    });
  }, []);

  return (
    <NavigationContainer>
      {isLogged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
