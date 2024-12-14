import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getAnimalHistory } from '../../../api/farm/Farm'
import { formattedDate } from '../../../utils/Format'

const AnimalHistory = () => {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    const fetchUserIdAndHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (!token) return

        const decodedToken = jwtDecode(token)
        const userIdFromToken = decodedToken.id

        const response = await getAnimalHistory(userIdFromToken)
        setHistoryData(response.data.data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserIdAndHistory()
  }, [])

  const handleViewHealth = (animalOwnerUserId) => {
    navigation.navigate('AnimalHealth', { animalOwnerId: animalOwnerUserId })
  }

  const handleShowDetails = (item) => {
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.historyItem}>
        <Image
          source={{ uri: item.animalStageImageUrl }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.animalName}>{item.animalName}</Text>
          <Text style={styles.dateText}>
            <Text style={styles.bold}>Ngày bắt đầu nuôi:</Text>{' '}
            {formattedDate(item.startDate)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleShowDetails(item)}
            style={styles.expandButton}
          >
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleViewHealth(item.animalOwnerUserId)}
            style={styles.healthButton}
          >
            <Text style={styles.buttonText}>Sổ sức khỏe</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderModalContent = () => {
    if (!selectedItem) return null

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedItem}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Thông tin chi tiết</Text>

            {/* Thông tin cơ bản */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Thông tin cơ bản</Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Tên vật nuôi:</Text>{' '}
                {selectedItem.animalOwnerUserName}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Mã động vật:</Text>{' '}
                {selectedItem.animalOwnerUserCode}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Tuổi:</Text> {selectedItem.age} ngày
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Trọng lượng:</Text>{' '}
                {(selectedItem.weight / 1000).toFixed(2)} kg
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Chuồng nuôi:</Text>{' '}
                {selectedItem.penCode}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>
                Thông tin thời gian & chi phí
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Trạng thái:</Text>{' '}
                {selectedItem.developStage === 'SHIP'
                  ? 'Đã xuất chuồng'
                  : 'Khác'}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Ngày bắt đầu nuôi:</Text>{' '}
                {formattedDate(selectedItem.startDate)}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Ngày kết thúc nuôi:</Text>{' '}
                {formattedDate(selectedItem.endDate)}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Phí vệ sinh chuồng:</Text>{' '}
                {selectedItem.cleanFee.toLocaleString()} VND
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.bold}>Giá ô đất:</Text>{' '}
                {selectedItem.blockOwnerUser.blockPrice.toLocaleString()} VND
              </Text>
            </View>

            {selectedItem.userAnimalOwnerCares?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Thông tin gói chăm sóc</Text>
                {selectedItem.userAnimalOwnerCares.map((care, index) => (
                  <View key={index} style={styles.carePackage}>
                    <Image
                      source={{ uri: care.carePackageImages }}
                      style={styles.carePackageImage}
                    />
                    <View>
                      <Text style={[styles.modalText, { flexWrap: 'wrap' }]}>
                        <Text style={styles.bold}>Tên gói:</Text>{' '}
                        {care.carePackageName}
                      </Text>

                      <Text style={styles.modalText}>
                        <Text style={styles.bold}>Số lượng:</Text>{' '}
                        {care.quantityCarePackage}
                      </Text>
                      <Text style={styles.modalText}>
                        <Text style={styles.bold}>Thời gian sử dụng:</Text>{' '}
                        {care.timeUseByDay} ngày
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử chăn nuôi</Text>
      {historyData.length === 0 ? (
        <Text style={styles.noDataText}>Không có dữ liệu</Text>
      ) : (
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.animalOwnerUserId.toString()}
          renderItem={renderItem}
        />
      )}

      {renderModalContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FB', // Softer background color for better contrast
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2C3E50', // Dark text color for better visibility
  },
  noDataText: {
    textAlign: 'center',
    color: '#7F8C8D', // Neutral gray for empty state
    fontSize: 16,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // For Android shadows
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  animalName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495E', // Darker color for better readability
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#7F8C8D', // Gray text for secondary information
  },
  bold: {
    fontWeight: '700',
    color: '#34495E',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandButton: {
    backgroundColor: '#3498DB', // Blue for action buttons
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#3498DB',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  healthButton: {
    backgroundColor: '#2ECC71', // Green for health-related actions
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#2ECC71',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2C3E50',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 8,
    lineHeight: 22, // For better spacing between lines
    flexWrap: 'wrap', // Allow text to wrap
  },

  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#2C3E50',
  },
  carePackage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#F4F6F7',
    borderRadius: 10,
  },
  carePackageImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  closeButton: {
    backgroundColor: '#E74C3C', // Red for close button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AnimalHistory
