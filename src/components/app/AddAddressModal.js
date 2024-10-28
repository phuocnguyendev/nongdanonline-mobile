import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { TouchableWithoutFeedback } from "react-native";
import { postAddress } from "../../service/user/address";

function AddAddressModal({ visible, onClose }) {
  const [isChecked, setIsChecked] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const handleChange = ({ key, value }) => {
    switch (key) {
      case "name":
        setName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "detailAddress":
        setDetailAddress(value);
      default:
        break;
    }
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setProvinces(json); // Giả sử json là mảng tỉnh
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log lỗi
      });
  }, []);

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setDistricts(province?.Districts || []); // Cập nhật districts dựa trên province đã chọn
    setSelectedDistrict(null);
    setSelectedWard(null);
    setWards([]);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setWards(district?.Wards || []); // Cập nhật wards dựa trên district đã chọn
    setSelectedWard(null);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const getFullAddress = () => {
    return `${detailAddress}, ${selectedWard?.Name || ''}, ${selectedDistrict?.Name || ''}, ${selectedProvince?.Name || ''}`
      .trim()
      .replace(/, +/g, ', ')
      .replace(/ ,/g, ', ');
  }; 

  const handleFinish = async () => {
    if (!name || !phoneNumber || !detailAddress || !selectedProvince || !selectedDistrict || !selectedWard) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin trước khi hoàn thành.");
      return;
    }
    try {
      const fullAddress = getFullAddress();
      const data = {
        name: name,
        address: fullAddress,
        phone: phoneNumber,
        isdefault: isChecked,
      };
      await postAddress(data);
      Alert.alert("Thông báo", "Địa chỉ đã được lưu thành công!");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Thông báo", "Đã xảy ra lỗi trong quá trình lưu địa chỉ.");
      onClose();
    }
  };
  

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Ionicons name="close" size={26} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Địa chỉ mới</Text>
            <View style={styles.inputView}>
              <View style={styles.input}>
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                  onChangeText={(text) =>
                    handleChange({ key: "name", value: text })
                  }
                  value={name}
                  placeholder="Nhập họ và tên của bạn"
                  style={styles.inputText}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                  onChangeText={(text) =>
                    handleChange({ key: "phoneNumber", value: text })
                  }
                  value={phoneNumber}
                  placeholder="Nhập số điện thoại của bạn"
                  style={styles.inputText}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Tỉnh/Thành phố</Text>
                <View style={styles.inputBorder}>
                  <Picker
                    selectedValue={selectedProvince}
                    onValueChange={(itemValue) =>
                      handleProvinceChange(itemValue)
                    }
                  >
                    <Picker.Item label="Chọn tỉnh/thành phố" value={null} />
                    {provinces.map((province, index) => (
                      <Picker.Item
                        key={index}
                        label={province.Name}
                        value={province}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Quận/Huyện</Text>
                <View style={styles.inputBorder}>
                  <Picker
                    selectedValue={selectedDistrict}
                    onValueChange={(itemValue) =>
                      handleDistrictChange(itemValue)
                    }
                  >
                    <Picker.Item label="Chọn quận/huyện" value={null} />
                    {districts.map((district, index) => (
                      <Picker.Item
                        key={index}
                        label={district.Name}
                        value={district}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Phường/Xã</Text>
                <View style={styles.inputBorder}>
                  <TouchableWithoutFeedback>
                    <Picker
                      selectedValue={selectedWard}
                      onValueChange={(itemValue) => setSelectedWard(itemValue)}
                    >
                      <Picker.Item label="Chọn phường/xã" value={null} />
                      {wards.map((ward, index) => (
                        <Picker.Item
                          key={index}
                          label={ward.Name}
                          value={ward}
                        />
                      ))}
                    </Picker>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Địa chỉ cụ thể</Text>
                <TextInput
                  onChangeText={(text) =>
                    handleChange({ key: "detailAddress", value: text })
                  }
                  value={detailAddress}
                  placeholder="Nhập địa chỉ cụ thể của bạn"
                  style={styles.inputText}
                />
              </View>
            </View>

            <View style={styles.checked}>
              <TouchableOpacity onPress={handleChecked}>
                <Ionicons
                  size={22}
                  color="#00796b"
                  name={isChecked ? "checkbox" : "square-outline"}
                  style={styles.checkboxIcon}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>Đặt làm địa chỉ mặc định</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Trở lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <Text style={styles.finishButtonText}>Hoàn thành</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

export default AddAddressModal;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 30,
  },
  modalContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputView: {
    width: "100%",
  },
  input: {
    marginBottom: 15,
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 16,
    width: "100%",
  },
  checked: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxIcon: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  finishButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  finishButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
