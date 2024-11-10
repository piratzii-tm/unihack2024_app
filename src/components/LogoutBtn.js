import { logout } from "../backend";
import CustomLogoutIcon from "./CustomLogoutIcon";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextFont } from "../constants/themes";

const LogoutBtn = () => {
  return (
    <TouchableOpacity
      title={"Logout"}
      onPress={logout}
      style={styles.logoutBtn}
    >
      <CustomLogoutIcon />
      <Text style={[TextFont.Text, styles.logoutBtnTxt]}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  logoutBtnTxt: {
    fontSize: 20,
    color: "#6E6E6E",
  },
});

export default LogoutBtn;
