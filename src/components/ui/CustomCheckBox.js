import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CustomCheckbox = ({ label, checked, onPress, image }) => {
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checkedContainer]} // Apply background color to the entire container
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.checkbox, checked && styles.checked]}>
          {checked && <FontAwesome5 name="check" size={16} color="green" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", 
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 10,
  },
  checkedContainer: {
    backgroundColor: "#f8fcfd", 
    borderColor: "green", 
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    borderColor: "green", 
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default CustomCheckbox;
