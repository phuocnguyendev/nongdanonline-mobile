import { TouchableOpacity, Linking } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export function FarmInfo({ navigation, route }) {
  const { title, image, farmOwner, phone, farmArea, mapLink } = route.params;
  const [loading, setLoading] = useState(true);

  const openMap = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Product Farm")}
          style={styles.buttonNavigate}
        >
          <Text style={styles.navText}>Sản phẩm & Dịch vụ</Text>
          <Ionicons name="arrow-forward" size={22} color="#00a86b" />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.imageHeaderView}>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#00a86b"
                style={styles.loadingIndicator}
              />
            )}
            <ImageBackground
              source={{ uri: image }}
              style={styles.imageHeader}
              onLoad={() => {
                setLoading(false);
              }}
              onError={() => setLoading(false)}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={18} color="#00a86b" />
              <Text style={styles.info}>
                <Text style={styles.label}>Chủ trang trại: </Text>{" "}
                {farmOwner || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={18} color="#00a86b" />
              <Text style={styles.info}>
                <Text style={styles.label}>Liên hệ:</Text> {phone || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color="#00a86b" />
              <Text style={styles.info}>
                <Text style={styles.label}>Địa chỉ:</Text> {"N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="resize" size={18} color="#00a86b" />
              <Text style={styles.info}>
                <Text style={styles.label}>Diện tích:</Text> {farmArea || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="map" size={18} color="#00a86b" />
              <Text style={styles.info}>
                <Text style={styles.label}>Bản đồ: </Text>
              </Text>
              <TouchableOpacity onPress={() => openMap(mapLink)}>
                <Text style={styles.mapLink}>Xem bản đồ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonNavigate: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  navText: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
    color: "#00a86b",
  },
  infoContainer: {
    marginVertical: 20,
    elevation: 5,
    borderRadius: 20,
  },
  imageHeaderView: {
    backgroundColor: "transparent",
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageHeader: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  title: {
    color: "#00a86b",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoTextContainer: {
    backgroundColor: "#fff",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
  },
  label: {
    fontWeight: "bold",
  },
  mapLink: {
    color: "#00a86b",
    textDecorationLine: "underline",
    fontSize: 16,
    marginLeft: 5,
  },
});
