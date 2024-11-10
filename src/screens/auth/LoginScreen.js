import { Text, TextInput, TouchableOpacity, Image, View } from "react-native";
import { KContainer } from "../../components";
import { TextFont } from "../../constants/themes";
import { OrSpacer } from "../../components/OrSpacer";
import { styles } from "./RegsiterScreen";
import { useState } from "react";
import { login } from "../../backend";
import LogoIcon from "../../components/LogoIcon";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KContainer>
      <LogoIcon />
      <Text style={styles.title}>Welcome back!</Text>
      <TextInput
        style={[styles.registerInput, TextFont.Text]}
        placeholder={"Email address"}
        placeholderTextColor="#B4ABAB"
        keyboardType={"email-address"}
        onChangeText={setEmail}
        autoCapitalize={"none"}
      />
      <TextInput
        style={[styles.registerInput, TextFont.Text]}
        placeholder={"Password"}
        placeholderTextColor={"#B4ABAB"}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={() =>
          login({
            email: email.trim(),
            password: password.trim(),
          })
        }
        style={styles.continueBtn}
      >
        <Text style={[TextFont.Text, styles.continueBtnText]}>Sign in</Text>
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
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={[TextFont.Text, { color: "#FFBAA3", fontSize: 18 }]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KContainer>
  );
}
