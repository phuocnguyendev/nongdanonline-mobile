import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import useTranslationSwitcher from "../../../hooks/useTranslationSwitcher";

export default function LanguageSwitchButton() {
  const { changeLanguage, currentLanguage } = useTranslationSwitcher();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en";
    changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity onPress={toggleLanguage} style={styles.button}>
      <Text style={styles.buttonText}>
        {currentLanguage === "en" ? "Tiếng Việt" : "English"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
