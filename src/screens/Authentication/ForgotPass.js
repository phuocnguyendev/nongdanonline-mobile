import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Modal,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { postForgotPass } from "../../service/authentication/forgotPass";
import Ionicons from "@expo/vector-icons/Ionicons";

export function ForgotPass({ navigation }) {
  const headerHeight = useHeaderHeight();
  const dismissKeyboard = () => Keyboard.dismiss();
  const [inputFocused, setInputFocused] = useState(null);
  const [email, setEmail] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalFailVisible, setModalFailVisible] = useState(false);

  const handleChangeEmail = (value) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSend = async () => {
    try {
      const data = {
        email: email,
      };

      await postForgotPass(data);
      setModalSuccessVisible(true);
    } catch (error) {
      setModalFailVisible(true), console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalSuccessVisible(false);
    setModalFailVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={require("../../assets/background2.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={[styles.container, { paddingTop: headerHeight + 100 }]}>
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
                placeholder="john.doe@gmail.com"
                onChangeText={handleChangeEmail}
                style={styles.input}
                onFocus={() => setInputFocused("email")}
                onBlur={() => setInputFocused(null)}
              />
            </View>
            {email ? (
              isValidEmail ? null : (
                <Text style={{ color: "red", marginTop: 5 }}>
                  Email không hợp lệ
                </Text>
              )
            ) : null}
          </View>
          <TouchableOpacity style={styles.nextContainer} onPress={handleSend}>
            <Text style={styles.nextText}>Gửi</Text>
          </TouchableOpacity>
        </View>

        {/*Modal*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalSuccessVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Close button (X icon) */}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              {/* Modal title */}
              <Text style={[styles.modalTitle, { color: "green" }]}>
                Thông báo
              </Text>
              {/* Modal message */}
              <Text style={styles.modalMessage}>
                Gửi Email thành công! {"\n\n"}
                Hãy tuân thủ các bước sau đây để hoàn tất quá trình khôi phục
                mật khẩu: {"\n\n"}
                1/ Vào ứng dụng Gmail và tìm Email "nongdanonlinee@gmail.com"{" "}
                {"\n"}
                2/ Truy cập vào tin nhắn mới nhất từ Email vừa tìm kiếm {"\n"}
                3/ Nhấn "Đặt lại mật khẩu", trang sẽ chuyển hướng bạn đến trang
                web, hãy điền hết tất cả các thông tin cần thiết. {"\n"}
                4/ Sau khi khôi phục mật khẩu hoàn tất, truy lại vào ứng dụng
                Nông Dân Online và thực hiện đăng nhập với mật khẩu vừa đặt.
              </Text>
              {/* "Đã hiểu" button */}
              <TouchableOpacity
                style={styles.understoodButton}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Đã hiểu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/*Modal*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFailVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Close button (X icon) */}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              {/* Modal title */}
              <Text style={[styles.modalTitle, { color: "red" }]}>
                Thông báo
              </Text>
              {/* Modal message */}
              <Text style={styles.modalMessage}>Gửi Email thất bại.</Text>
              {/* "Đã hiểu" button */}
              <TouchableOpacity
                style={styles.understoodButton}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Đã hiểu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + StatusBar.currentHeight,
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
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  labelFocused: {
    color: "#4caf50",
  },
  input: {
    padding: 2,
    flex: 1,
  },
  nextContainer: {
    borderRadius: 20,
    backgroundColor: "#2dcc6f",
    paddingVertical: 15,
    elevation: 4,
  },
  nextText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  understoodButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
