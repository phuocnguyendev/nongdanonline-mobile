import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomCheckbox from "../../ui/CustomCheckBox";

function AddNewFarmModal({ visible, onClose }) {
  const [numberFarms, setNumberFarms] = useState(1);
  const [rentDuration, setRentDuration] = useState(1);
  const [step, setStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const data = {
    id: "1",
    name: "Ô đất Amazing",
    image: require("../../../assets/images/oDatAmazing.jpg"),
    description: "Ô đất để nuôi các loại gia cầm ",
    price: "20.000",
    time: "30 ngày",
    animal: "Gia cầm",
  };

  const numberOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  const durationOptions = [
    { label: "1 tháng", value: 1 },
    { label: "3 tháng", value: 3 },
    { label: "6 tháng", value: 6 },
    { label: "12 tháng", value: 12 },
  ];

  const handleNumberChange = (item) => {
    setNumberFarms(item.value);
  };

  const handleDurationChange = (item) => {
    setRentDuration(item.value);
  };

  const handleBuyClick = () => {
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleShowPaymentMethods = () => {
    setShowPaymentMethods(true);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <FontAwesome5 name="times" size={15} color="black" />
          </TouchableOpacity>
          {step === 1 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>
                <FontAwesome5 name="info-circle" size={24} color="black" />{" "}
                Thông tin ô đất:
              </Text>
              <View style={styles.imageContainer}>
                <Image source={data.image} style={styles.image} />
              </View>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.description}>{data.description}</Text>
              <Text style={styles.price}>
                <FontAwesome5 name="money-bill-wave" size={16} color="green" />{" "}
                Giá ô đất mỗi tháng: {data.price} VND
              </Text>
              <Text style={styles.animal}>
                <FontAwesome5 name="paw" size={16} color="black" /> Loại vật
                nuôi: {data.animal}
              </Text>

              <View style={styles.dropdownContainer}>
                <Text style={{ fontSize: 15 }}>
                  <FontAwesome5 name="th" size={16} color="black" /> Số lượng ô
                  đất:
                </Text>
                <Dropdown
                  data={numberOptions}
                  onChange={handleNumberChange}
                  labelField="label"
                  valueField="value"
                  value={numberFarms}
                  placeholderStyle={styles.dropdownPlaceholder}
                  style={styles.dropdown}
                />
              </View>

              <View style={styles.dropdownContainer}>
                <Text style={{ fontSize: 15 }}>
                  <FontAwesome5 name="clock" size={16} color="black" /> Thời
                  gian thuê:
                </Text>
                <Dropdown
                  data={durationOptions}
                  onChange={handleDurationChange}
                  labelField="label"
                  valueField="value"
                  value={rentDuration}
                  placeholderStyle={styles.dropdownPlaceholder}
                  style={styles.dropdown}
                />
              </View>

              <View style={styles.orderInfoContainer}>
                <Text style={styles.orderTitle}>Thông tin đơn hàng:</Text>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Tên ô đất:</Text>
                  <Text style={styles.orderValue}>{data.name}</Text>
                </View>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Số lượng ô đất:</Text>
                  <Text style={styles.orderValue}>{numberFarms}</Text>
                </View>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Thời gian thuê:</Text>
                  <Text style={styles.orderValue}>{rentDuration} tháng</Text>
                </View>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Tổng tiền:</Text>
                  <Text style={styles.orderValue}>
                    {(numberFarms * rentDuration * parseInt(data.price))
                      .toLocaleString("vi-VN", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })
                      .replace(",", ".")}{" "}
                    VND
                  </Text>
                </View>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Ngày bắt đầu:</Text>
                  <Text style={styles.orderValue}>
                    {new Date().toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Ngày kết thúc:</Text>
                  <Text style={styles.orderValue}>
                    {new Date(
                      new Date().getTime() +
                        rentDuration * 30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleClose}>
                  <Text style={styles.buttonText}>
                    <FontAwesome5 name="times" size={18} color="white" /> Hủy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buyButton]}
                  onPress={handleBuyClick}
                >
                  <Text style={styles.buttonText}>
                    <FontAwesome5
                      name="shopping-cart"
                      size={18}
                      color="white"
                    />{" "}
                    Mua
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <View>
              <Text style={styles.title}>
                <FontAwesome5 name="credit-card" size={24} color="black" /> Chọn
                phương thức thanh toán
              </Text>
              <View style={styles.checkboxContainerOuter}>
                <CustomCheckbox
                  image={require("../../../assets/images/vnpay.png")}
                  label="VNPay"
                  checked={selectedPaymentMethod === "VNPay"}
                  onPress={() => handlePaymentSelect("VNPay")}
                />
              </View>
              <View style={styles.checkboxContainerOuter}>
                <CustomCheckbox
                  image={require("../../../assets/images/payos.png")}
                  label="PayOS"
                  checked={selectedPaymentMethod === "PayOS"}
                  onPress={() => handlePaymentSelect("PayOS")}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setStep(1)}>
                  <Text style={styles.buttonText}>
                     Chọn lại
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buyButton]}
                  onPress={handleClose}
                >
                  <Text style={styles.buttonText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default AddNewFarmModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "90%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 15,
    color: "green",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 22,
  },
  animal: {
    fontSize: 15,
    color: "#333",
    marginBottom: 5,
    marginLeft: 22,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  dropdown: {
    width: 100,
    height: 30,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownPlaceholder: {
    color: "gray",
  },
  orderInfoContainer: {
    width: "100%",
    paddingHorizontal: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  orderValue: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buyButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
