import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function FarmItem(props) {
  const openMap = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("An error occurred", err)
    );
  };
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#00a86b"
            style={[
              styles.image,
              { justifyContent: "center", alignItems: "center" },
            ]}
          />
        )}
        <Image
          source={{ uri: props.image }}
          style={styles.image}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
        {props.mapLink && (
          <View style={styles.mapLinkContainer}>
            <Ionicons name="location" size={18} color="gray" />
            <TouchableOpacity onPress={() => openMap(props.mapLink)}>
              <Text style={styles.mapLink}>Xem bản đồ</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.infoRow}>
          <Ionicons name="call" size={18} color="gray" />
          <Text style={styles.info}>{props.phone}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() =>
            props.onPress(
              props.title,
              props.image,
              props.farmOwner,
              props.phone,
              props.farmArea,
              props.mapLink
            )
          }
        >
          Xem chi tiết
        </PrimaryButton>
      </View>
    </View>
  );
}

export default FarmItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  description: {
    fontSize: 15,
    color: "gray",
    marginLeft: 5,
  },
  info: {
    fontSize: 15,
    color: "black",
    marginLeft: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mapLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  mapLink: {
    color: "blue", // Styled as a hyperlink
    textDecorationLine: "underline",
    fontSize: 15,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
