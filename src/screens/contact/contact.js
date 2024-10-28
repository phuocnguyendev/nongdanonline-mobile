import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView, // Import ScrollView
} from "react-native";
import ContactForm from "../../components/app/ContactForm";

export function Contact({ navigation }) {
  const dismissKeyboard = () => Keyboard.dismiss();
  const handleSubmit = () => {
    alert("Gửi tin nhắn thành công");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Liên Hệ Chúng Tôi</Text>
          <Text style={styles.description}>
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi bất cứ
            lúc nào.
          </Text>
          <View style={styles.inputContainer}>
            <ContactForm onPress={handleSubmit} />
          </View>

          <View style={styles.contact}>
            <Text style={styles.contactText}>
              Hoặc bạn có thể liên hệ trực tiếp qua:
            </Text>
            <Text style={styles.contactItem}>Hotline: 0378552586</Text>
            <Text style={styles.contactItem}>
              Email: nongdanonline@gmail.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows content to expand and scroll
  },
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#00a86b",
    marginBottom: 20,
  },
  description: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8,
  },
  contact: {
    marginVertical: 30,
    alignItems: "center",
  },
  contactText: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
