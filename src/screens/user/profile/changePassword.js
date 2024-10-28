import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

export function ChangePassword({ navigation }) {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(false);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChangePassword = ({ key, value }) => {
    switch (key) {
      case "current":
        setCurrentPass(value);
        break;
      case "new":
        setNewPass(value);
        break;
      case "confirm":
        setConfirmPass(value);
        if (value !== newPass) {
          setIsSamePassword(false);
        } else {
          setIsSamePassword(true);
        }
        break;
      default:
        break;
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Cập Nhật Mật Khẩu</Text>

        <View style={styles.inputView}>
          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <View style={styles.inputStyle}>
            <TextInput
              placeholder="Nhập mật khẩu hiện tại"
              onChangeText={(text) =>
                handleChangePassword({ key: "current", value: text })
              }
              value={currentPass}
              secureTextEntry={!showPassword.current}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => toggleShowPassword("current")}>
              <Ionicons
                name={showPassword.current ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#4caf50"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Mật khẩu mới</Text>
          <View style={styles.inputStyle}>
            <TextInput
              placeholder="Nhập mật khẩu mới"
              onChangeText={(text) =>
                handleChangePassword({ key: "new", value: text })
              }
              value={newPass}
              secureTextEntry={!showPassword.new}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => toggleShowPassword("new")}>
              <Ionicons
                name={showPassword.new ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#4caf50"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
          <View style={styles.inputStyle}>
            <TextInput
              placeholder="Nhập lại mật khẩu mới"
              onChangeText={(text) =>
                handleChangePassword({ key: "confirm", value: text })
              }
              value={confirmPass}
              secureTextEntry={!showPassword.confirm}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => toggleShowPassword("confirm")}>
              <Ionicons
                name={showPassword.confirm ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#4caf50"
              />
            </TouchableOpacity>
          </View>
          {confirmPass ? (
            isSamePassword ? null : (
              <Text style={{ color: "red", marginTop: 5 }}>
                Mật khẩu phải trùng nhau
              </Text>
            )
          ) : null}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lưu Mật Khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonForgot}
          onPress={() => navigation.navigate("Forgot Password")}
        >
          <Text style={styles.buttonTextForgot}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputView: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputStyle: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: "#00a86b",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonForgot: {
    backgroundColor: "#fff",
    borderColor: "#00a86b",
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonTextForgot: {
    color: "#00a86b",
    fontSize: 16,
    fontWeight: "bold",
  },
});
