import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const SocialLoginButton = ({ onPress, icon, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  icon: { width: 24, height: 24 },
  text: { fontSize: 16, fontWeight: "bold", marginLeft: 10 },
});

export default SocialLoginButton;
