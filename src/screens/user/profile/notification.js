import { View, Text, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Notification({ navigation }) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  const handleChecked1 = () => {
    setIsChecked1(!isChecked1);
  };
  const handleChecked2 = () => {
    setIsChecked2(!isChecked2);
  };
  const handleChecked3 = () => {
    setIsChecked3(!isChecked3);
  };
  const handleAllowed = () => {
    const newAllowedState = !isAllowed;
    setIsAllowed(newAllowedState);

    if (newAllowedState) {
      setIsChecked1(true);
      setIsChecked2(false);
      setIsChecked3(true);
    } else {
      setIsChecked1(false);
      setIsChecked2(false);
      setIsChecked3(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Email thông báo</Text>
          <TouchableOpacity onPress={handleAllowed}>
            <View
              style={isAllowed ? styles.radioButtonOn : styles.radioButtonOff}
            >
              <Ionicons
                name="radio-button-on"
                size={20}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          Thông báo và nhắc nhở quan trọng về tài khoản sẽ không thể bị tắt
        </Text>

        <View style={styles.rowContainer}>
          <View style={[styles.half, isAllowed ? null : {opacity: 0.5}]}>
            <Text style={styles.subtitle}>Cập nhật đơn hàng</Text>
            <Text style={styles.text}>
              Cập nhật về tình trạng vận chuyển của tất cả các đơn hàng
            </Text>
          </View>
          <TouchableOpacity onPress={handleChecked1} disabled={!isAllowed}>
            <View
              style={isChecked1 ? styles.radioButtonOn : styles.radioButtonOff}
            >
              <Ionicons
                name="radio-button-on"
                size={20}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.half, isAllowed ? null : {opacity: 0.5}]}>
            <Text style={styles.subtitle}>Khuyến mãi</Text>
            <Text style={styles.text}>Cập nhật về các ưu đãi và khuyến mãi sắp tới</Text>
          </View>
          <TouchableOpacity onPress={handleChecked2} disabled={!isAllowed}>
            <View
              style={isChecked2 ? styles.radioButtonOn : styles.radioButtonOff}
            >
              <Ionicons
                name="radio-button-on"
                size={20}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.half, isAllowed ? null : {opacity: 0.5}]}>
            <Text style={styles.subtitle}>Khảo sát</Text>
            <Text style={styles.text}>
              Đồng ý nhận khảo sát để cho chúng tôi được lắng nghe bạn
            </Text>
          </View>
          <TouchableOpacity onPress={handleChecked3} disabled={!isAllowed}>
            <View
              style={isChecked3 ? styles.radioButtonOn : styles.radioButtonOff}
            >
              <Ionicons
                name="radio-button-on"
                size={20}
                color="#fff"
              />
            </View>
          </TouchableOpacity>
        </View>
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
  rowContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  radioButtonOn: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#4caf50",
    alignItems: "flex-end",
    backgroundColor: "#4caf50",
    width: 50,
  },
  radioButtonOff: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    alignItems: "flex-start",
    backgroundColor: "#ccc",
    width: 50,
  },
  half: {
    flex: 1,
    marginRight: 10,
  }
});
