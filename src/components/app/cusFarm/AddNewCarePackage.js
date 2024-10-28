import {
  Modal,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CARE_PACKAGES from "../../../data/data-carePackage";
import { useState, useContext, useRef } from "react";
import { CartContext } from "../../../reducers/CartContext";
import { Swipeable } from "react-native-gesture-handler";

function AddCarePackage({ visible, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, updateCartIcon } = useContext(CartContext);
  const [packages, setPackages] = useState(CARE_PACKAGES);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item) => {
    //Xác nhận
    setSelectedItem(item);
    setConfirmVisible(true);
  };

  const confirmAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem); // Thêm vào giỏ hàng
      updateCartIcon();
    }
    setConfirmVisible(false); // Đóng modal xác nhận
  };

  const deleteItem = (id) => {
    setPackages(packages.filter((item) => item.id !== id));
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Animated.View
          style={[
            styles.deleteButtonContent,
            { transform: [{ translateX: trans }] },
          ]}
        >
          <FontAwesome5 name="trash" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }
    >
      <View style={styles.carePackageItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.carePackageImage} />
        </View>
        <Text style={styles.carePackageName}>{item.name}</Text>
        <Text style={styles.carePackageDescription}>{item.description}</Text>
        <View style={styles.infoRow}>
          <FontAwesome5 name="money-bill-wave" size={16} color="#4a4a4a" />
          <Text style={styles.carePackagePrice}>Giá: {item.price} VND</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="clock" size={16} color="#4a4a4a" />
          <Text style={styles.carePackageTimeUse}>
            Thời gian sử dụng: {item.timeUse}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="paw" size={16} color="#4a4a4a" />
          <Text style={styles.carePackageKindOfAnimal}>
            Loại vật nuôi: {item.kindOfAnimal}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => handleAddToCart(item)}
        >
          <FontAwesome5 name="plus" size={16} color="white" />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    </Swipeable>
  );

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Tất cả các gói chăm sóc</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm gói chăm sóc..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredPackages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
        {/* Modal xác nhận */}
        {selectedItem && (
          <Modal
            visible={confirmVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setConfirmVisible(false)}
          >
            <View style={styles.confirmModalContainer}>
              <View style={styles.confirmModalContent}>
                <Text style={styles.confirmText}>
                  Bạn có muốn thêm "{selectedItem.name}" vào giỏ hàng
                  không?
                </Text>
                <View style={styles.confirmButtons}>
                  <TouchableOpacity
                    style={styles.buttonCancel}
                    onPress={() => setConfirmVisible(false)}
                  >
                    <Text style={styles.buttonText}>Không</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress={confirmAddToCart}
                  >
                    <Text style={styles.buttonText}>Đồng ý</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
}

export default AddCarePackage;

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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ddcb09",
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderColor: "#d8d8d8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  carePackageItem: {
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  carePackageImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  carePackageName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  carePackageDescription: {
    fontSize: 15,
    textAlign: "center",
    color: "gray",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  carePackagePrice: {
    fontSize: 15,
    marginLeft: 10,
  },
  carePackageTimeUse: {
    fontSize: 15,
    marginLeft: 10,
  },
  carePackageKindOfAnimal: {
    fontSize: 15,
    marginLeft: 10,
  },
  buttonAdd: {
    width: 40,
    height: 40,
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 50,
    position: "absolute",
    right: 0,
    top: 0,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#e2e2e2",
    marginVertical: 10,
  },
  buttonClose: {
    width: "30%",
    height: 40,
    backgroundColor: "#eb0000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 100,
    height: "100%",
  },
  deleteButtonContent: {
    padding: 20,
  },

  confirmModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  confirmModalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonCancel: {
    flex: 1,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  buttonConfirm: {
    flex: 1,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
