import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import AddNewCarePackage from "../cusFarm/AddNewCarePackage";

function AddMyCarePackage({ visible, onClose }) {
  const [selectedCarePackage, setSelectedCarePackage] = useState(null);
  const [inputQuantity, setInputQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddNewCarePackage, setShowAddNewCarePackage] = useState(false);

  const carePackages = [
    { id: 1, name: "Gói Gà Đen H'Mông 1 tháng", quantity: 5, time: "30 ngày" },
    { id: 2, name: "Gói Gà Đen H'Mông 1 ngày", quantity: 10, time: "1 ngày" }
  ];

  const selectedPackage = carePackages.find(
    (pkg) => pkg.id === selectedCarePackage
  );

  const handleQuantityChange = (text) => {
    setInputQuantity(text);
    if (selectedPackage) {
      const enteredQuantity = parseInt(text) || 0;
      if (enteredQuantity > selectedPackage.quantity) {
        setErrorMessage(`Số lượng vượt quá kho (${selectedPackage.quantity})`);
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleAddCarePackage = () => {
    setShowAddNewCarePackage(true);
  };

  const handleCloseAddNewCarePackage = () => {
    setShowAddNewCarePackage(false);
  };

  const handleConfirmAddCarePackage = () => {
    if (selectedPackage && inputQuantity) {
      const quantity = parseInt(inputQuantity);
      if (quantity > 0 && quantity <= selectedPackage.quantity) {
        onClose();
      } else {
        setErrorMessage("Vui lòng nhập số lượng hợp lệ");
      }
    } else {
      setErrorMessage("Vui lòng chọn gói và nhập số lượng");
    }
  };

  const handleClose = () => {
    setSelectedCarePackage(null);
    setInputQuantity("");
    setErrorMessage("");
    setShowAddNewCarePackage(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Chọn gói chăm sóc từ kho của bạn</Text>
          <View style={styles.carePackageContainer}>
            <Text style={styles.carePackageText}>Chọn gói: </Text>
            <Dropdown
              data={carePackages}
              labelField="name"
              valueField="id"
              placeholder="-- Chọn gói chăm sóc --"
              value={selectedCarePackage}
              onChange={(item) => {
                setSelectedCarePackage(item.id);
                setInputQuantity("");
                setErrorMessage("");
              }}
              style={styles.dropdown}
            />
            <Text style={styles.carePackageText}>Thời gian: </Text>
            <Text style={styles.carePackageTime}>
              {selectedPackage ? selectedPackage.time : ""}
            </Text>
            <Text style={styles.carePackageText}>Số lượng bạn có: </Text>
            <Text style={styles.carePackageQuantityText}>
              {selectedPackage ? selectedPackage.quantity : ""}
            </Text>
            <Text style={styles.carePackageText}>Số lượng muốn sử dụng: </Text>
            <TextInput
              style={styles.carePackageQuantity}
              value={inputQuantity}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
            />
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddCarePackage}
          >
            <Text style={styles.buttonText}>Mua thêm gói chăm sóc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "gray", borderRadius: 10 },
            ]}
            onPress={handleClose}
          >
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "green", borderRadius: 10 },
            ]}
            onPress={handleConfirmAddCarePackage}
          >
            <Text style={styles.buttonText}>Thêm gói chăm sóc</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddNewCarePackage
        visible={showAddNewCarePackage}
        onClose={handleCloseAddNewCarePackage}
      />
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
    paddingHorizontal: 10,
    paddingBottom: 30,
    paddingTop: 10,
    borderRadius: 10,
    width: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 30,
  },
  carePackageContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  carePackageText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  carePackageTime: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  carePackageQuantity: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
  },
  carePackageQuantityText: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddMyCarePackage;
