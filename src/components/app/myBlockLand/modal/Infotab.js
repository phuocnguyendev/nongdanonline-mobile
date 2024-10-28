import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ANIMALS } from "../../../../data/data-animal";

function InfoTab({ formatDate }) {
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); 
  const animal = ANIMALS['Chip']; 

  const calculateAge = (startDate) => {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) ) + 1;
    return diffDays;
  };

  return (
    <ScrollView>
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Thông tin cơ bản</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <View style={styles.infoContent}>
              <FontAwesome
                name="clock-o"
                size={20}
                color="blue"
                style={styles.icon}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Số ngày tuổi:</Text>
                <Text style={styles.infoText}>{calculateAge(startDate)} ngày</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <View style={styles.infoContent}>
              <FontAwesome
                name="calendar"
                size={20}
                color="green"
                style={styles.icon}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Ngày bắt đầu:</Text>
                <Text style={styles.infoText}>{formatDate(startDate)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <View style={styles.infoContent}>
              <FontAwesome
                name="calendar"
                size={20}
                color="red"
                style={styles.icon}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Ngày kết thúc:</Text>
                <Text style={styles.infoText}>{formatDate(endDate)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoBlock}>
            <View style={styles.infoContent}>
              <Ionicons
                name="scale"
                size={20}
                color="purple"
                style={styles.icon}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Cân nặng:</Text>
                <Text style={styles.infoText}>{animal.weight} kg</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: "90%",
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: -10,
    marginTop: -5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBlock: {
    width: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 8,
  },
  infoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
  },
});

export default InfoTab;
