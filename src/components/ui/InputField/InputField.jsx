import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  isFocused,
  onFocus,
  onBlur,
  secureTextEntry,
  toggleVisibility,
}) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={[styles.label, isFocused && styles.labelFocused]}>
      {label}
    </Text>
    <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {toggleVisibility && (
        <TouchableOpacity onPress={toggleVisibility} style={styles.iconRight}>
          <Ionicons
            name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#4caf50"
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  label: { fontSize: 16, color: "#333", fontWeight: "bold" },
  labelFocused: { color: "#4caf50" },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    alignItems: "center",
  },
  inputFocused: { borderBottomColor: "#4caf50" },
  input: { padding: 2, flex: 1 },
  iconRight: { justifyContent: "flex-end" },
});

export default InputField;
