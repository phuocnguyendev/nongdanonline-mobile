import { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Text,
  Pressable,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { web, android } from "../../data/googleClientId";


export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocused, setInputFocused] = useState(null);

  const [checked, setChecked] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text));
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  const dismissKeyboard = () => Keyboard.dismiss();
  const handleNavigate = (nav) => {
    navigation.navigate(nav);
  };

  const loginApple = () => {
    Alert.alert(
      "Thông báo về đăng nhập Apple",
      "Chức năng vẫn đang trong giai đoạn phát triển, mong bạn thông cảm!",
      [{ text: "Đã hiểu" }]
    );
  };

  const login = () => {
    Alert.alert(
      "Thông báo về đăng nhập Google",
      "Đã đăng nhập Google thành công, nhưng hiện tại vẫn đang trong giai đoạn nâng cấp!",
      [{ text: "Đã hiểu" }]
    );
  };

  {
    /*onPress={loginGoogle} */
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <ImageBackground
              source={require("../../assets/Background.png")}
              style={styles.background}
              resizeMode="cover"
              blurRadius={5}
            />
            <SafeAreaView>
            <Image
              source={require("../../assets/LOGOOFFICIAL-01.png")}
              style={styles.image}
            />
            </SafeAreaView>
          </View>

          <View style={styles.loginView}>
            <View style={styles.login}>
              <View>
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={[
                      styles.label,
                      inputFocused === "email" && styles.labelFocused,
                    ]}
                  >
                    Email
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      inputFocused === "email" && styles.inputFocused,
                    ]}
                  >
                    <TextInput
                      value={email}
                      onChangeText={handleEmailChange}
                      onFocus={() => setInputFocused("email")}
                      onBlur={() => setInputFocused(null)}
                      placeholder="john.doe@gmail.com"
                      style={styles.input}
                    />
                  </View>
                  {email ? (
                    isValidEmail ? null : (
                      <Text style={styles.invalid}>Email không hợp lệ</Text>
                    )
                  ) : null}
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={[
                      styles.label,
                      inputFocused === "password" && styles.labelFocused,
                    ]}
                  >
                    Mật khẩu
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      inputFocused === "password" && styles.inputFocused,
                    ]}
                  >
                    <TextInput
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setInputFocused("password")}
                      onBlur={() => setInputFocused(null)}
                      placeholder="Mật khẩu"
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.iconRight}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="#4caf50"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.optionsContainer}>
                <View style={styles.rememberContainer}>
                  <TouchableOpacity style={styles.box} onPress={toggleCheckbox}>
                    <Ionicons
                      name={checked ? "checkbox" : "square-outline"}
                      size={24}
                      color={checked ? "#4caf50" : "#000"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.rememberText}>Tự động đăng nhập</Text>
                </View>
                <Pressable onPress={() => handleNavigate("Forgot Password")}>
                  <Text style={styles.forgotText}>Quên mật khẩu?</Text>
                </Pressable>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Main Screen")}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <Text style={styles.registerText}>
                Bạn chưa có tài khoản?{" "}
                <Text
                  onPress={() => handleNavigate("Register")}
                  style={styles.registerLink}
                >
                  Đăng ký
                </Text>
              </Text>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.lineText}>Hoặc</Text>
                <View style={styles.line} />
              </View>
              <TouchableOpacity style={styles.signInButton} onPress={login}>
                <Image
                  source={require("../../assets/google.png")}
                  style={styles.logo}
                />
                <Text style={styles.signInThird}>Đăng nhập bằng Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={loginApple}
              >
                <Image
                  source={require("../../assets/apple.png")}
                  style={styles.logo}
                />
                <Text style={styles.signInThird}>Đăng nhập bằng Apple ID</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  imageView: {
    height: Dimensions.get("window").height * 0.4,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.12,
    alignSelf: "center",
  },
  loginView: {
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: "center",
    position: "absolute",
    top: Dimensions.get("window").height * 0.15,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
  },
  login: {
    padding: 26,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 8,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputFocused: {
    borderBottomColor: "#4caf50",
  },
  iconRight: {
    justifyContent: "flex-end",
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  labelFocused: {
    color: "#4caf50",
  },
  input: {
    padding: 2,
    flex: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    color: "red",
  },
  primaryButton: {
    backgroundColor: "#2dcc6f",
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 8,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  registerText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
  registerLink: {
    color: "#2dcc6f",
    fontSize: 16,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  lineText: {
    marginHorizontal: 10,
    color: "gray",
    fontSize: 16,
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  signInThird: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logo: {
    width: 24,
    height: 24,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -10,
  },
  invalid: {
    color: "red",
    marginTop: 5,
  },
});
