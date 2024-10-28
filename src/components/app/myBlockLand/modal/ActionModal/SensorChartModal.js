import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons để sử dụng biểu tượng

export function SensorChartModal({ data, visible, onClose }) {
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <Modal 
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.chartTitle}>Dữ liệu độ ẩm</Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 80}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: "#006400",
            backgroundGradientFrom: "#228B22",
            backgroundGradientTo: "#32CD32",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 2,
  },
});
