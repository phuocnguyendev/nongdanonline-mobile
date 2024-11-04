import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({
  onPress,
  title,
  backgroundColor = "#2dcc6f",
  textColor = "white",
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      style={[
        styles.button,
        { backgroundColor },
        style,
        disabled && styles.disabledButton,
      ]}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 8,
  },
  buttonText: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});

export default CustomButton;
