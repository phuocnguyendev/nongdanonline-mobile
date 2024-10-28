import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductView from "../../../components/app/productView";
import PackageView from "../../../components/app/packageView";

export function ProductFarm({ navigation }) {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Farm Info")}
          style={styles.buttonNavigate}
        >
          <Ionicons name="arrow-back" size={22} color="#00a86b" />
          <Text style={styles.navText}>Thông tin Trang trại</Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <ProductView />
          <PackageView />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonNavigate: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  navText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#00a86b",
  },
  item: {
    marginVertical: 10,
    borderRadius: 10,
  },
});
