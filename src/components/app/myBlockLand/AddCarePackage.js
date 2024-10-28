import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import AddNewCarePackage from "../cusFarm/AddNewCarePackage";

const { width } = Dimensions.get("window");
const modalWidth = width - 50;

function AddCarePackageModal({ isVisible, onClose }) {
  const [activeTab, setActiveTab] = useState("chooseAnimal");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [animalName, setAnimalName] = useState("");
  const [isAddNewCarePackageVisible, setIsAddNewCarePackageVisible] =
    useState(false);
  const scrollViewRef = useRef(null);

  const tabs = ["chooseAnimal", "choosePackage", "setName"];
  const title = {
    chooseAnimal: "Chọn động vật",
    choosePackage: "Chọn gói chăm sóc",
    setName: "Đặt tên",
  };

  const animalData = [{ key: "1", value: "Gà Đen HMông" }];

  const packageData = [
    {
      key: "1",
      value: "Gói Gà Đen HMông 1 tháng",
      quantity: "1",
      time: "30 ngày",
    },
  ];

  const handleTabPress = (tab) => {
    const newIndex = tabs.indexOf(tab);
    setActiveTab(tab);
    scrollViewRef.current?.scrollTo({
      x: newIndex * modalWidth,
      animated: true,
    });
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      handleTabPress(tabs[currentIndex + 1]);
    } else {
      console.log("Form submitted", {
        selectedAnimal,
        selectedPackage,
        animalName,
      });
      onClose();
    }
  };

  const isNextDisabled = () => {
    switch (activeTab) {
      case "chooseAnimal":
        return !selectedAnimal;
      case "choosePackage":
        return !selectedPackage;
      case "setName":
        return !animalName.trim();
      default:
        return false;
    }
  };

  const handleBuyPackage = () => {
    setIsAddNewCarePackageVisible(true);
  };

  const handleCloseAll = () => {
    setSelectedAnimal(null);
    setSelectedPackage(null);
    setAnimalName("");
    setActiveTab("chooseAnimal");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCloseAll}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title[activeTab]}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseAll}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabRow, activeTab === tab && styles.activeTab]}
                onPress={() => handleTabPress(tab)}
              >
                <Text
                  style={
                    activeTab === tab ? styles.activeTabText : styles.tabText
                  }
                >
                  {title[tab]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            initialNumToRender={3}
            removeClippedSubviews={true}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={[styles.tabContent, styles.chooseAnimalTab, { width: modalWidth }]}>
              <Dropdown
                data={animalData}
                labelField="value"
                valueField="key"
                value={selectedAnimal}
                onChange={(item) => setSelectedAnimal(item.key)}
                placeholder="Chọn loại động vật"
                placeholderStyle={styles.placeholderStyle}
                style={styles.dropdown}
              />
            </View>
            <View style={[styles.tabContent, styles.choosePackageTab, { width: modalWidth }]}>
              <Dropdown
                data={packageData}
                labelField="value"
                valueField="key"
                value={selectedPackage}
                onChange={(item) => setSelectedPackage(item.key)}
                placeholder="Chọn gói chăm sóc"
                placeholderStyle={styles.placeholderStyle}
                style={styles.dropdown}
              />
              {selectedPackage && (
                <View style={{marginTop: 20}}>
                  <Text style={styles.packageInfoText}>
                    Số lượng còn lại:{" "}
                    {
                      packageData.find((pkg) => pkg.key === selectedPackage)
                        ?.quantity
                    }
                  </Text>
                  <Text style={styles.packageInfoText}>
                    Thời gian sử dụng:{" "}
                    {
                      packageData.find((pkg) => pkg.key === selectedPackage)
                        ?.time
                    }
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.buyButton}
                onPress={handleBuyPackage}
              >
                <Text style={styles.buttonText}>Mua thêm gói chăm sóc</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.tabContent, { width: modalWidth }]}>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên cho động vật"
                value={animalName}
                onChangeText={setAnimalName}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isNextDisabled() && styles.disabledButton]}
              onPress={handleNext}
              disabled={isNextDisabled()}
            >
              <Text style={styles.buttonText}>
                {activeTab === "setName" ? "Hoàn thành" : "Tiếp theo"}
              </Text>
              <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCloseAll}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isAddNewCarePackageVisible && (
        <AddNewCarePackage
          isVisible={isAddNewCarePackageVisible}
          onClose={() => setIsAddNewCarePackageVisible(false)}
        />
      )}
    </Modal>
  );
}

export default AddCarePackageModal;

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
    width: modalWidth,
    maxHeight: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  scrollViewContent: {
  },
  chooseAnimalTab: {
    height: 150,
  },
  choosePackageTab: {
  },
  tabContent: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  tabText: {
    color: "black",
  },
  activeTabText: {
    color: "green",
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    width: modalWidth - 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: -10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  buttonContainer: {
    marginTop: 0,
    width: modalWidth - 40,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3366ff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  buyButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#33cc00",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: modalWidth - 40,
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  cancelButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  packageInfoText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 5,
  },
  input: {
    width: modalWidth - 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 40,
  },
});
