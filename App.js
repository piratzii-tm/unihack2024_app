import { Navigation } from "./src";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  process.env.EXPO_PUBLIC_IMAGE_GENERATOR;
axios.defaults.headers.common["Content-Type"] = "application/json";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "DM Sans": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Navigation />;
}
