import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { KContainer } from "../../components";
import { register } from "../../backend";
import { TextFont } from "../../constants/themes";
import { OrSpacer } from "../../components/OrSpacer";
import { useState } from "react";

export function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KContainer>
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        style={[styles.registerInput, TextFont.Text]}
        placeholder={"Email address"}
        placeholderTextColor="#B4ABAB"
        keyboardType={"email-address"}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.registerInput, TextFont.Text]}
        placeholder={"Password"}
        placeholderTextColor={"#B4ABAB"}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.registerInput, TextFont.Text]}
        placeholder={"Confirm password"}
        placeholderTextColor={"#B4ABAB"}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        onPress={() => {
          if (password.trim() === confirmPassword.trim()) {
            register({
              email: email.trim(),
              password: password.trim(),
            });
          } else {
            alert("Passwords do not match");
          }
        }}
        style={styles.continueBtn}
      >
        <Text style={[TextFont.Text, styles.continueBtnText]}>Continue</Text>
      </TouchableOpacity>

      <OrSpacer />

      <TouchableOpacity onPress={() => null} style={styles.googleBtn}>
        <Image
          source={require("../../../assets/google_icon.png")}
          style={styles.icon}
        />
        <Text style={[TextFont.Text, styles.googleBtnTxt]}>
          Sign up with Google
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={[TextFont.Text, styles.loginTxt]}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={[TextFont.Text, { color: "#FFBAA3", fontSize: 18 }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </KContainer>
  );
}

export const styles = StyleSheet.create({
  title: {
    fontFamily: "DM Sans",
    fontSize: 32,
    color: "#6E6E6E",
    marginTop: 150,
    marginBottom: 30,
  },
  registerInput: {
    backgroundColor: "#fff",
    width: "80%",
    height: "8%",
    borderRadius: 15,
    fontSize: 20,
    padding: 20,
    marginTop: 20,
  },
  continueBtn: {
    backgroundColor: "#FFD1C1",
    marginTop: 30,
    width: "80%",
    borderRadius: 15,
  },
  continueBtnText: {
    color: "#6E6E6E",
    textAlign: "center",
    margin: 15,
    fontSize: 20,
  },
  googleBtn: {
    backgroundColor: "white",
    width: "80%",
    height: "8%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
  },
  googleBtnTxt: {
    color: "#6E6E6E",
    fontSize: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  loginTxt: {
    color: "#B4ABAB",
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    gap: 5,
  },
});
