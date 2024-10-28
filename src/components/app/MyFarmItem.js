import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

function MyFarmItem(props) {
  const [loading, setLoading] = useState(true);
  return (
    <TouchableOpacity onPress={() => props.onPress(props.title)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {loading && (
            <ActivityIndicator size="large" color="#00a86b" style={[styles.image, {justifyContent: 'center', alignItems: 'center'}]} />
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
          <View style={styles.detailContainer}>
            <Ionicons name="location-outline" size={24} color="#4caf50" />
            <Text style={styles.info}>{props.farmCode}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MyFarmItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 25,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 5,
    padding: 15,
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
    marginVertical: 10,
  },
  info: {
    fontSize: 15,
    color: "black",
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});
