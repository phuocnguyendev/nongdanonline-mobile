import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomCheckbox from "../../ui/CustomCheckBox";

function LandExtension({
  showRenewModal,
  handleCloseRenewModal,
  onConfirmRenew,
}) {
  const [month, setMonth] = useState("1");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const block = {
    price: 20000,
  };

  const handleConfirm = () => {
    if (selectedPaymentMethod) {
      onConfirmRenew(parseInt(month), selectedPaymentMethod);
      handleCloseRenewModal();
    } else {
      // Show an error message or prevent confirmation if no payment method is selected
      alert("Please select a payment method");
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <Modal visible={showRenewModal} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Gia hạn ô đất</Text>
          <TouchableOpacity
            onPress={handleCloseRenewModal}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.paymentContainer}>
            <Text
              style={[
                styles.paymentText,
                { fontWeight: "bold", fontSize: 17, marginBottom: 15 },
              ]}
            >
              Thông tin thanh toán
            </Text>
            <Text style={styles.paymentText}>
              Giá mỗi tháng: {formatPrice(block.price)} VNĐ
            </Text>
            <View style={styles.paymentInputContainer}>
              <Text style={styles.paymentText}>Số tháng gia hạn: </Text>
              <View style={styles.paymentInputWrapper}>
                <TextInput
                  style={styles.paymentInput}
                  value={month}
                  onChangeText={(text) => setMonth(text.replace(/[^0-9]/g, ""))}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={[styles.paymentText, { fontWeight: "bold" }]}>
              Tổng tiền: {formatPrice(block.price * parseInt(month))} VNĐ
            </Text>
          </View>
          <View style={styles.paymentMethodContainer}>
            <Text style={styles.paymentMethodText}>Phương thức thanh toán</Text>
            <View style={styles.paymentMethodWrapper}>
              <View style={styles.checkboxContainerOuter}>
                <CustomCheckbox
                  image={require("../../../assets/images/payos.png")}
                  label="PayOS"
                  checked={selectedPaymentMethod === "PayOS"}
                  onPress={() => handlePaymentSelect("PayOS")}
                />
              </View>
              <View style={styles.checkboxContainerOuter}>
                <CustomCheckbox
                  image={require("../../../assets/images/vnpay.png")}
                  label="VNPay"
                  checked={selectedPaymentMethod === "VNPay"}
                  onPress={() => handlePaymentSelect("VNPay")}
                />
              </View>
            </View>
          </View>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleCloseRenewModal}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  paymentContainer: {
    width: "100%",
    marginBottom: 20,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  paymentInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 70,
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  arrowContainer: {
    marginLeft: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
  },
  confirmButton: {
    backgroundColor: "#2ecc71",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  paymentMethodContainer: {
    width: "100%",
    marginBottom: 20,
  },
  paymentMethodText: {
    color: "green",
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethodWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  checkboxContainerOuter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  checkboxImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checkmark: {
    position: "absolute",
    right: 10,
    backgroundColor: "#2ecc71",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandExtension;
