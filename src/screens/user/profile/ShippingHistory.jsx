import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { jwtDecode } from 'jwt-decode'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { myFarm } from '../../../api/farm/Farm'
import { getShippingHistory } from '../../../api/shipping/shipping'

export const ShippingHistory = () => {
  const navigation = useNavigation()
  const [shippingOrders, setShippingOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [shippingStatus, setShippingStatus] = useState('')
  const [farmID, setFarmID] = useState('')
  const [shippingCode, setShippingCode] = useState('')
  const [shippingDate, setShippingDate] = useState(null)
  const [farms, setFarms] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const pageSize = 5
  const [userId, setUserId] = useState(null)

  const shippingStatusOptions = [
    { label: 'Tất cả trạng thái', value: '' },
    { label: 'Đang Xử Lý', value: '0' },
    { label: 'Đang Vận Chuyển', value: '1' },
    { label: 'Đã Giao', value: '2' },
    { label: 'Đã Hủy', value: '3' },
  ]

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (!token) {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.')
          return
        }
        const decodedToken = jwtDecode(token)
        if (decodedToken?.id) {
          setUserId(decodedToken.id)
        } else {
          Alert.alert('Lỗi', 'Token không hợp lệ.')
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        Alert.alert('Lỗi', 'Không thể đọc thông tin người dùng.')
      }
    }
    fetchUserId()
    fetchFarms()
  }, [])

  const fetchFarms = async () => {
    try {
      const response = await myFarm()
      if (response.data?.data) {
        setFarms(
          response.data.data.map((farm) => ({
            label: farm.farmName,
            value: farm.farmID,
          })),
        )
      }
    } catch (error) {
      console.error('Error fetching farms:', error)
      Alert.alert('Lỗi', 'Không thể tải danh sách nông trại.')
    }
  }

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return null
    }
    return new Date(date).toISOString().split('T')[0]
  }

  const fetchShippingOrders = useCallback(async () => {
    if (!userId) return

    const formattedShippingDate = formatDate(shippingDate)

    setLoading(true)
    try {
      const response = await getShippingHistory(
        userId,
        currentPage,
        pageSize,
        shippingStatus,
        farmID,
        shippingCode,
        formattedShippingDate,
      )

      const data = response?.data?.data
      if (data?.items) {
        setShippingOrders(data.items)
        setTotalPages(data.totalPages || 1)
      } else {
        setShippingOrders([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vận chuyển:', error)
      Alert.alert('Lỗi', 'Không thể lấy danh sách vận chuyển.')
    } finally {
      setLoading(false)
    }
  }, [
    userId,
    currentPage,
    pageSize,
    shippingStatus,
    farmID,
    shippingCode,
    shippingDate,
  ])

  useEffect(() => {
    fetchShippingOrders()
  }, [fetchShippingOrders])

  const convertShippingStatus = (status) => {
    switch (Number(status)) {
      case 0:
        return 'Đang Xử Lý'
      case 1:
        return 'Đang Vận Chuyển'
      case 2:
        return 'Đã Giao'
      case 3:
        return 'Đã Hủy'
      default:
        return 'Không Xác Định'
    }
  }

  const renderShippingItem = ({ item }) => (
    <View style={styles.shippingCard}>
      <View style={styles.header}>
        <Text style={styles.shippingCode}>
          🚚 Mã Vận Chuyển: {item.shippingCode}
        </Text>
        <Text
          style={[styles.status, item.shippingStatus === 3 && styles.canceled]}
        >
          {convertShippingStatus(item.shippingStatus)}
        </Text>
      </View>
      <Text style={styles.subHeader}>Danh Sách Vật Nuôi:</Text>
      {item.animalShippings.map((animal, index) => (
        <View key={index} style={styles.animalItem}>
          <Image
            source={{ uri: animal.animalOwnerUser.animalImage }}
            style={styles.animalImage}
          />
          <View style={styles.animalDetails}>
            <Text style={styles.animalName}>
              {animal.animalOwnerUser.animalName}
            </Text>
            <Text>Khối Lượng: ~ {animal.actualWeight / 1000} kg</Text>
            <Text>Ghi Chú: {animal.note}</Text>
          </View>
        </View>
      ))}
      <View style={styles.details}>
        <Text>
          📅 Ngày Vận Chuyển: {new Date(item.shippingDate).toLocaleDateString()}
        </Text>
        <Text>
          📅 Ngày Giao Dự Kiến:{' '}
          {new Date(item.expectedDeliveryDate).toLocaleDateString()}
        </Text>
        <Text>
          📞 Liên Hệ: {item.name} ({item.phone})
        </Text>
        <Text>📍 Địa Chỉ: {item.address}</Text>
        <Text>🏡 Nông Trại: {getFarmName(item.farmID)}</Text>
        <Text>🔖 Mã Đơn Hàng: {item.orderCode}</Text>
      </View>
      <View style={styles.footer}>
        <Text>⚖️ Tổng Khối Lượng: ~ {item.totalWeight / 1000} kg</Text>
        <Text>💸 Phí Vận Chuyển: {item.shippingFee.toLocaleString()} đ</Text>
        <Text>💸 Phí Dịch Vụ: {item.cleanFee.toLocaleString()} đ</Text>
        <Text style={styles.total}>
          💵 Tổng Tiền: {(item.shippingFee + item.cleanFee).toLocaleString()} đ
        </Text>
      </View>
    </View>
  )

  const getFarmName = (farmID) => {
    const farm = farms.find((f) => f.value === farmID)
    return farm ? farm.label : 'Không Xác Định'
  }

  const paginate = useCallback(
    (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
      }
    },
    [totalPages],
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch Sử Giao Hàng</Text>
      <View style={styles.filters}>
        <DropDownPicker
          open={dropdownOpen}
          value={shippingStatus}
          items={shippingStatusOptions}
          setOpen={setDropdownOpen}
          setValue={setShippingStatus}
          style={styles.dropdown}
          placeholder="Trạng Thái"
          zIndex={3000}
          zIndexInverse={1000}
        />
        <DropDownPicker
          open={farmDropdownOpen}
          value={farmID}
          items={farms}
          setOpen={setFarmDropdownOpen}
          setValue={setFarmID}
          style={styles.dropdown}
          placeholder="Chọn Nông Trại"
        />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>
            {shippingDate
              ? shippingDate.toLocaleDateString('en-CA')
              : 'Ngày Vận Chuyển'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={shippingDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false)
              if (selectedDate) {
                setShippingDate(new Date(selectedDate))
              }
            }}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Mã Vận Chuyển"
          value={shippingCode}
          onChangeText={(text) => setShippingCode(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" style={styles.loader} />
      ) : shippingOrders.length === 0 ? (
        <Text style={styles.noOrders}>Không có đơn hàng nào.</Text>
      ) : (
        <FlatList
          data={shippingOrders}
          renderItem={renderShippingItem}
          keyExtractor={(item) => item.shippingID}
          ListFooterComponent={() => (
            <View style={styles.paginationContainer}>
              {totalPages > 0 && (
                <View style={styles.pagination}>
                  {currentPage > 1 && (
                    <TouchableOpacity
                      onPress={() => paginate(currentPage - 1)}
                      style={styles.pageButton}
                    >
                      <Text style={styles.pageText}>{'<'}</Text>
                    </TouchableOpacity>
                  )}
                  {Array.from({ length: totalPages }, (_, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => paginate(index + 1)}
                      style={[
                        styles.pageButton,
                        currentPage === index + 1 && styles.activePageButton,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pageText,
                          currentPage === index + 1 && styles.activePageText,
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {currentPage < totalPages && (
                    <TouchableOpacity
                      onPress={() => paginate(currentPage + 1)}
                      style={styles.pageButton}
                    >
                      <Text style={styles.pageText}>{'>'}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    width: '45%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dateButton: {
    width: '45%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dateButtonText: {
    color: '#555',
    fontSize: 14,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  loader: {
    marginTop: 50,
  },
  noOrders: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
  shippingItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  shippingCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shippingStatus: {
    fontSize: 14,
    color: '#555',
  },
  shippingDate: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  shippingTotalWeight: {
    marginTop: 5,
    fontSize: 14,
    color: '#00a86b',
  },
  paginationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePageButton: {
    backgroundColor: '#00a86b',
    borderColor: '#00a86b',
  },
  pageText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  activePageText: {
    color: '#fff',
    textAlign: 'center',
  },
  shippingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shippingCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  canceled: {
    color: '#FF0000',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  animalItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  animalImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  animalDetails: {
    flex: 1,
  },
  animalName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#007BFF',
  },
  details: {
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a86b',
    marginTop: 5,
  },
})

export default ShippingHistory
