import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

function PackageView() {
  const [showAnimal, setShowAnimal] = useState(false);
  const [showPackage, setShowPackage] = useState(false);

  const handleShowAnimal = () => {
    setShowAnimal(!showAnimal);
    setShowPackage(false);
  };

  const handleShowPackage = () => {
    setShowPackage(!showPackage);
  };
  return (
    <View style={[styles.selection, { backgroundColor: "#fff" }]}>
      <TouchableOpacity onPress={handleShowAnimal}>
        <View style={styles.selectionTitle}>
          <Ionicons name="leaf-outline" size={24} color={"#00a86b"} />
          <Text style={styles.title}>
            Chọn Động Vật để xem các gói chăm sóc
          </Text>
          <Ionicons
            name={showAnimal ? "chevron-down" : "chevron-up"}
            size={24}
            color={"#00a86b"}
          />
        </View>
      </TouchableOpacity>

      {showAnimal && (
        <View>
          <TouchableOpacity onPress={handleShowPackage}>
            <View style={styles.animal}>
              <Image
                style={styles.imageProduct}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2FBG_ga_web.png?alt=media&token=5d48a4bb-709b-4e47-9a2c-9a2678ba0229",
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Gà Đen H'Mông
              </Text>
              <Text style={{ fontSize: 16, marginVertical: 10 }}>
                Gà Đen H'Mông là một giống gà truyền thống của người dân tộc
                H'Mông, nổi tiếng với những đặc điểm độc đáo và giá trị dinh
                dưỡng cao. Giống gà này có nguồn gốc từ các vùng núi cao phía
                Bắc Việt Nam, được nuôi theo phương pháp truyền thống.
              </Text>
              <View style={styles.displayRow}>
                <Ionicons name="bulb-outline" size={22} color={"#00a86b"} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Gia cầm
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {showPackage && (
            <View style={styles.products}>
              <TouchableOpacity onPress={handleShowPackage}>
                <View style={styles.selectionTitle}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Các gói chăm sóc
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={24}
                  />
                </View>
              </TouchableOpacity>

              {/*Gói 1 */}
              <View style={styles.productsDetail}>
                <Image
                  style={styles.imageProduct}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2FBG_ga_web.png?alt=media&token=5d48a4bb-709b-4e47-9a2c-9a2678ba0229",
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 5,
                  }}
                >
                  <Ionicons />
                  Gói Gà Đen H'Mông 1 tháng
                </Text>
                <View style={styles.displayRow}>
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color={"#00a86b"}
                  />
                  <Text style={styles.text}>
                    Gói chăm sóc 1 tháng dành cho Gà Đen H'Mông
                  </Text>
                </View>
                <View style={styles.displayRow}>
                  <Ionicons name="cash-outline" size={22} color={"#00a86b"} />
                  <Text style={styles.text}>Giá: 34.000 ₫</Text>
                </View>
                <View style={styles.displayRow}>
                  <Ionicons
                    name="calendar-clear-outline"
                    size={22}
                    color={"#00a86b"}
                  />
                  <Text style={styles.text}>Thời gian sử dụng: 30 ngày</Text>
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

              {/*Gói 2 */}
              <View style={styles.productsDetail}>
                <Image
                  style={styles.imageProduct}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2FBG_ga_web.png?alt=media&token=5d48a4bb-709b-4e47-9a2c-9a2678ba0229",
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 5,
                  }}
                >
                  <Ionicons />
                  Gói Gà Đen H'Mông đầy đủ
                </Text>
                <View style={styles.displayRow}>
                  <Ionicons
                    name="information-circle-outline"
                    size={22}
                    color={"#00a86b"}
                  />
                  <Text style={styles.text}>
                    Gói chăm sóc toàn bộ giai đoạn dành cho Gà Đen H'Mông
                  </Text>
                </View>
                <View style={styles.displayRow}>
                  <Ionicons name="cash-outline" size={22} color={"#00a86b"} />
                  <Text style={styles.text}>Giá: 150.000 ₫</Text>
                </View>
                <View style={styles.displayRow}>
                  <Ionicons
                    name="calendar-clear-outline"
                    size={22}
                    color={"#00a86b"}
                  />
                  <Text style={styles.text}>Thời gian sử dụng: 150 ngày</Text>
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
      )}
    </View>
  );
}

export default PackageView;

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
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#00a86b",
    flex: 1,
  },
  animal: {
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 20,
    marginTop: 20,
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
  imageProduct: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  productsDetail: {
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 10,
    marginVertical: 15,
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
