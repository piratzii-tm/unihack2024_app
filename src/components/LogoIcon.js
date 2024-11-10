import { Image, StyleSheet } from "react-native";

const LogoIcon = () => {
  return (
    <Image source={require("../../assets/logo.png")} style={styles.icon} />
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    marginVertical: 35,
  },
});

export default LogoIcon;
