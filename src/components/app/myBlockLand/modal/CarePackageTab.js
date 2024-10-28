import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CarePackageTab = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.carePackageContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gói chăm sóc</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Thêm gói chăm sóc</Text>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={["#fff7ce", "#ffeb82"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.packageInfo}
      >
        <Text style={styles.packageTitle}>Gói Gà Đen H'Mông 1 tháng</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thời gian sử dụng:</Text>
          <Text style={styles.infoTimeValue}>1 tháng</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số lượng đã sử dụng:</Text>
          <Text style={styles.infoValue}>1</Text>
        </View>
        <TouchableOpacity style={styles.detailButton} onPress={toggleDetails}>
          <Text style={styles.detailButtonText}>
            {showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'}
          </Text>
          <Ionicons
            name={showDetails ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#805600"
          />
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.infoMore}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày bắt đầu:</Text>
              <Text style={styles.infoValue}>01/06/2023</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày kết thúc:</Text>
              <Text style={styles.infoValue}>30/06/2023</Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  carePackageContainer: {
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
  },
  packageInfo: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#bf8000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#333333',
  },
  infoTimeValue: {
    fontSize: 14,
    fontWeight: '350',
    color: '#19a119',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e69a00',
    padding: 2,
    backgroundColor: '#e69a00',
  },
  detailButtonText: {
    color: '#805600',
    marginRight: 5,
    fontWeight: '500',
    fontSize: 14,
  
  },
  infoMore: {
    fontSize: 14,
    color: '#333333',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fcfcfc',
  },
});

export default CarePackageTab;
