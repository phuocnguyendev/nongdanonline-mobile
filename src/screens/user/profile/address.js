import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddAddressModal from "../../../components/app/AddAddressModal";
import React, { useState } from "react";

export function Address({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Địa chỉ của tôi</Text>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Ionicons name="add-sharp" size={22} color="#fff" />
          <Text style={styles.buttonText}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
        <Text style={styles.noAddressText}>Bạn chưa có địa chỉ nào</Text>
        {isModalVisible && (
          <AddAddressModal isVisible={isModalVisible} onClose={closeModal} />
        )}
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#1d4ed8",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  noAddressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 20,
    textAlign: "center",
  },
});
