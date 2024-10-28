import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

function ProductView() {
  const [showProduct, setShowProduct] = useState(false);

  const handleShowProduct = () => {
    setShowProduct(!showProduct);
  };
  return (
    <View style={[styles.selection, { backgroundColor: "#f0fdf4" }]}>
      <TouchableOpacity onPress={handleShowProduct}>
        <View style={styles.selectionTitle}>
          <Ionicons name="cube-outline" size={24} color={"#00a86b"} />
          <Text style={styles.title}>Sản Phẩm Từ Trang Trại</Text>
          <Ionicons
            name={showProduct ? "chevron-down" : "chevron-up"}
            size={24}
            color={"#00a86b"}
          />
        </View>
      </TouchableOpacity>

      {showProduct && (
        <View style={styles.products}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Các ô đất</Text>
          <View style={styles.productsDetail}>
            <Image
              style={styles.imageProduct}
              source={{
                uri: "https://t3.ftcdn.net/jpg/05/02/18/64/360_F_502186443_Kubg3Wl76uE8BYl1tcAuYYXgGKAaO6r4.jpg",
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 5,
              }}
            >
              <Ionicons />Ô đất Amazing
            </Text>
            <View style={styles.displayRow}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={"#00a86b"}
              />
              <Text style={styles.text}>
                Mô tả: Ô đất để nuôi các loại gia cầm
              </Text>
            </View>
            <View style={styles.displayRow}>
              <Ionicons name="cash-outline" size={22} color={"#00a86b"} />
              <Text style={styles.text}>Giá: 20.000 ₫</Text>
            </View>
            <View style={styles.displayRow}>
              <Ionicons
                name="calendar-clear-outline"
                size={22}
                color={"#00a86b"}
              />
              <Text style={styles.text}>Thời gian thuê: 30 ngày</Text>
            </View>
            <View style={styles.displayRow}>
              <Ionicons
                name="bulb-outline"
                size={22}
                color={"#00a86b"}
              />
              <Text style={styles.text}>Loại động vật: Gia Cầm</Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="cart-outline"
                size={34}
                color={"#00a86b"}
                style={{ alignSelf: "flex-end", padding: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default ProductView;

const styles = StyleSheet.create({
  selection: {
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
  },
  selectionTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#00a86b",
    flex: 1,
  },
  products: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    elevation: 2,
    marginVertical: 10,
    borderColor: "#eee",
    borderWidth: 2,
  },
  productsDetail: {
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 10,
    marginVertical: 15,
  },
  imageProduct: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
    marginLeft: 4,
    flex: 1,
  },
  displayRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
