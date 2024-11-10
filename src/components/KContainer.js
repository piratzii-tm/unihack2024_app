import { SafeAreaView, StyleSheet, Image, Dimensions } from "react-native";

export const KContainer = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFE4B5",
        alignItems: "center",
      }}
    >
      {children}
      <Image
        source={require("../../assets/sketchFinal.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: 200,
    height: 200,
    zIndex: -1,
    transform: [{ scaleX: -1 }],
  },
});
