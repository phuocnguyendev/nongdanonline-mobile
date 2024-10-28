import React from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export function EmptyPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Có vẻ như bạn chưa có trang trại</Text>
      
      <Image
        source={require('../../assets/images/farm.png')} // Đường dẫn đến hình ảnh của bạn
        style={styles.image}
      />

      <Text style={styles.subtitle}>Tạo trang trại của bạn ngay bây giờ</Text>

      <TouchableOpacity style={styles.createButton} onPress={() => alert("Tạo trang trại")}>
        <Text style={styles.createButtonText}>Tạo ngay</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4', // Màu nền nhạt, trung tính
  },
  image: {
    width: 280,
    height: 230,
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2d3436', // Màu xám đậm tạo sự nổi bật cho tiêu đề
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: '#636e72', // Màu xám nhẹ hơn tiêu đề
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#27ae60', // Xanh lá cây tươi, phù hợp với chủ đề trang trại
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#fff', // Màu trắng tương phản với nền xanh lá cây
    fontSize: 18,
    fontWeight: '600',
  },
});
