import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

function ContactForm(props) {
  return (
    <View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.label}>Tin nhắn</Text>
        <TextInput
          placeholder="Nhập tin nhắn của bạn"
          style={styles.input}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={props.onPress}
      >
        <Text style={styles.primaryButtonText}>Gửi tin nhắn</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ContactForm;

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 100, 
    textAlignVertical: "top",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#2dcc6f",
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 8,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
