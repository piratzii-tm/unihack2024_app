import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, RecordScreen, SettingsScreen } from "./screens/";
import StoryDetailsScreen from "./screens/StoryDetailsScreen";
import { createStackNavigator } from "@react-navigation/native/src/__stubs__/createStackNavigator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";

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

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="StoryDetails" component={StoryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
