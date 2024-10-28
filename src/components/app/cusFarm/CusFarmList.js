import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import LandExtension from "../myBlockLand/LandExtension";
import AddCarePackageModal from "../myBlockLand/AddCarePackage";

function FarmList({
  farms,
  numberFarms,
  onShowFarmModal,
  onAddPress,
  onCarePackagePress,
  onNewCarePackagePress,
  onAddCarePackagePress,
}) {
  const [showInfo, setShowInfo] = useState({});
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [showAddCarePackageModal, setShowAddCarePackageModal] = useState(false);

  const toggleInfo = (id) => {
    setShowInfo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRenewPress = (farm) => {
    setSelectedFarm(farm);
    setShowRenewModal(true);
  };

  const handleCloseRenewModal = () => {
    setShowRenewModal(false);
    setSelectedFarm(null);
  };

  const handleAddCarePackagePress = () => {
    setShowAddCarePackageModal(true);
  };

  const handleCloseAddCarePackageModal = () => {
    setShowAddCarePackageModal(false);
  };

  const handleConfirmRenew = (month, paymentMethod) => {
    console.log(
      "Gia hạn",
      month,
      "tháng với phương thức thanh toán:",
      paymentMethod
    );
  };

  return (
    <View style={styles.farmContainer}>
      <FlatList
        data={farms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onShowFarmModal(item)}>
            <View style={styles.farmItem}>
              <Image
                source={item.image}
                style={styles.farmImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.addCarePackageButton}
                onPress={onCarePackagePress}
              >
                <FontAwesome5 name="plus" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => toggleInfo(item.id)}
              >
                <Ionicons name="information-circle" size={32} color="#3498db" />
              </TouchableOpacity>
              {showInfo[item.id] && (
                <View style={styles.infoOverlay}>
                  <Text style={styles.infoText}>
                    Hạn sử dụng ô đất: {item.expiryDate}
                  </Text>
                  <TouchableOpacity
                    style={styles.renewButton}
                    onPress={() => handleRenewPress(item)}
                  >
                    <Text style={styles.renewButtonText}>Gia hạn</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.noAnimalContainer}>
        <TouchableOpacity
          style={styles.addAnimalButton}
          onPress={handleAddCarePackagePress}
        >
          <Text style={styles.noAnimalText}>Chưa có vật nuôi</Text>
          <FontAwesome5 name="plus" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {farms.length < numberFarms && (
        <TouchableOpacity style={styles.addFarmButton} onPress={onAddPress}>
          <Text style={styles.addFarmText}>+</Text>
        </TouchableOpacity>
      )}
      <View style={styles.carePackageContainer}>
        <TouchableOpacity
          style={styles.carePackageButton}
          onPress={onNewCarePackagePress}
        >
          <Text style={styles.carePackageText}>Gói chăm sóc của bạn</Text>
          <FontAwesome5 name="plus" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <LandExtension
        showRenewModal={showRenewModal}
        handleCloseRenewModal={handleCloseRenewModal}
        onConfirmRenew={handleConfirmRenew}
      />

      <AddCarePackageModal
        isVisible={showAddCarePackageModal}
        onClose={handleCloseAddCarePackageModal}
      />
    </View>
  );
}

export default FarmList;

const styles = StyleSheet.create({
  farmContainer: {
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  farmItem: {
    width: "100%",
    margin: 5,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
    position: "relative",
  },
  farmImage: {
    width: 300,
    height: 160,
    borderRadius: 10,
  },
  addCarePackageButton: {
    position: "absolute",
    top: -5,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 20,
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  infoButton: {
    position: "absolute",
    top: 10,
    left: 15,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    marginBottom: 5,
  },
  renewButton: {
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  renewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addFarmButton: {
    width: 300,
    margin: 5,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addFarmText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  carePackageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  carePackageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carePackageButton: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  noAnimalContainer: {
    width: 300,
    margin: 5,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignItems: "center",
  },
  noAnimalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    flex: 1,
  },
  addAnimalButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
