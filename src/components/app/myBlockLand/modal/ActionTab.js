import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { CameraModal, SensorChartModal } from './ActionModal';

function ActionTab({ onClose }) {
  const navigation = useNavigation();
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [chartModalVisible, setChartModalVisible] = useState(false);

  const sensorData = {
    labels: ["10:00", "11:00", "12:00", "13:00", "14:00"],
    datasets: [
      {
        data: [45, 50, 55, 60, 65],
        strokeWidth: 2,
      },
    ],
  };

  const openCameraModal = () => {
    setCameraModalVisible(true);
  };

  const closeCameraModal = () => {
    setCameraModalVisible(false);
  };

  const openChartModal = () => {
    setChartModalVisible(true);
  };

  const closeChartModal = () => {
    setChartModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Hành động </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4d6bff" }]}
          onPress={openCameraModal}
        >
          <Ionicons
            name="camera"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>Xem Camera</Text>
            <Text style={styles.buttonSubText}>Theo dõi trực tiếp qua camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#6767ff" }]}
          onPress={openChartModal}
        >
          <Ionicons
            name="bar-chart"
            size={20}
            color="white"
            style={styles.buttonIcon}
          />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>Xem dữ liệu cảm biến</Text>
            <Text style={styles.buttonSubText}>Kiểm tra các chỉ số môi trường</Text>
          </View>
        </TouchableOpacity>
      </View>

      <CameraModal visible={cameraModalVisible} onClose={closeCameraModal} />
      <SensorChartModal visible={chartModalVisible} onClose={closeChartModal} data={sensorData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginLeft: -15,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: -10,
  },
  button: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonSubText: {
    color: "white",
    fontSize: 12,
  },
});

export default ActionTab;
