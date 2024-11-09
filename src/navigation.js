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
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "./backend/firebase/config";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabScreenContainer}>
              <FontAwesome
                name="home"
                size={30}
                color="black"
                style={focused ? focusedStyle.tabScreen : null}
              />
            </View>
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabScreenContainer}>
              <FontAwesome
                name="microphone"
                size={30}
                color="black"
                style={focused ? focusedStyle.tabScreen : null}
              />
            </View>
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabScreenContainer}>
              <FontAwesome
                name="cog"
                size={30}
                color="black"
                style={focused ? focusedStyle.tabScreen : null}
              />
            </View>
          ),
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    marginHorizontal: 60,
    bottom: 20,
  },
  tabScreenContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 70,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

const focusedStyle = StyleSheet.create({
  tabScreen: {
    color: "#FFBAA3",
  },
});

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
