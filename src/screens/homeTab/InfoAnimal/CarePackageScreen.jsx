import React, { useState } from 'react'
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { formattedDate } from '../../../utils/Format'

const CarePackageScreen = ({ route, navigation }) => {
  const { animalData, blockData, animalOwnerUserId } = route.params
  const carePackages = animalData.userAnimalOwnerCares || []
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedCarePackage, setSelectedCarePackage] = useState(null)

  const handleShowDetails = (carePackage) => {
    setSelectedCarePackage(carePackage)
    setShowDetailsModal(true)
  }

  return (
    <ScrollView style={styles.container}>
      {carePackages.map((carePackage, index) => (
        <View key={index} style={styles.packageContainer}>
          <Image
            source={{ uri: carePackage.carePackageImages }}
            style={styles.packageImage}
          />
          <Text style={styles.packageName}>{carePackage.carePackageName}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Thời gian sử dụng:</Text>
            <Text style={styles.value}>{carePackage.timeUseByDay} ngày</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Số lượng đã sử dụng:</Text>
            <Text style={styles.value}>{carePackage.quantityCarePackage}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('AddPackageScreen', {
                blockData,
                carePackage,
                animalOwnerUserId,
              })
            }
          >
            <Text style={styles.addButtonText}>Thêm gói chăm sóc</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleShowDetails(carePackage)}
          >
            <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        visible={showDetailsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chi tiết gói chăm sóc</Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabel}>Ngày bắt đầu: </Text>
              {formattedDate(selectedCarePackage?.startDate)}
            </Text>
            <Text style={styles.modalText}>
              <Text style={styles.modalLabel}>Ngày kết thúc: </Text>
              {formattedDate(selectedCarePackage?.endDate)}
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowDetailsModal(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  packageContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  packageImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  packageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00a86b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#00a86b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default CarePackageScreen
