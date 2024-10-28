import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export function Info() {
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("0987654321");
  const [selectedImage, setSelectedImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/nongdanonline-458d0.appspot.com/o/LandingPage%2Ffarmer.png?alt=media&token=027e1e3c-c0d7-48db-aa91-edca13609ad3"
  );
  const [loading, setLoading] = useState(false);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setLoading(false);

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Hồ sơ của tôi</Text>
        <Text style={styles.subtitle}>
          Quản lí thông tin hồ sơ để bảo mật tài khoản
        </Text>

        <View style={styles.viewInput}>
          <View style={styles.info}>
            <Text style={styles.label}>Tên</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.textInput}
              placeholder="Nhập tên của bạn"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text style={[styles.emailText]}>
              johndoe123example@gmail.com
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.textInput}
              placeholder="Nhập số điện thoại của bạn"
            />
          </View>
        </View>

        <View style={styles.uploadImage}>
          {loading ? (
            <ActivityIndicator size="large" color="#16a34a" />
          ) : (
            <>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.profileImage}
                />
              )}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#1d4ed8" }]}
                onPress={openImagePicker}
              >
                <Text style={styles.buttonText}>Chọn Ảnh</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Dung lượng file tối đa 1Mb</Text>
              <Text style={styles.text}>Định dạng: JPEG, PNG.</Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#00a86b" }]}
              >
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  viewInput: {
    width: "100%",
    marginBottom: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: "30%",
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  emailText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  uploadImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#00a86b",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 5,
  },
});
