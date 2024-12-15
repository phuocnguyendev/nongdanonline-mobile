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
import { getOrderHistory } from '../../../api/order/order'

export const HistoryOrder = () => {
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [orderStatus, setOrderStatus] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [orderCode, setOrderCode] = useState('')
  const [userId, setUserId] = useState(null)
  const navigation = useNavigation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const pageSize = 5

  const orderStatusOptions = [
    { label: 'Tất cả trạng thái', value: '' },
    { label: 'Chờ Xác Nhận', value: '0' },
    { label: 'Đã Xác Nhận', value: '1' },
    { label: 'Đang Giao Hàng', value: '2' },
    { label: 'Đã Giao Hàng', value: '3' },
    { label: 'Đã Hủy', value: '4' },
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
  }, [])

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return null
    }
    return new Date(date).toISOString().split('T')[0]
  }

  const fetchOrders = useCallback(async () => {
    if (!userId) return

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      Alert.alert('Lỗi', 'Ngày bắt đầu không được lớn hơn ngày kết thúc.')
      return
    }

    const formattedStartDate = formatDate(startDate)
    const formattedEndDate = formatDate(endDate)

    setLoading(true)
    try {
      const response = await getOrderHistory(
        userId,
        currentPage,
        pageSize,
        orderStatus,
        formattedStartDate,
        formattedEndDate,
        orderCode,
      )

      const data = response?.data?.data
      if (data?.items) {
        setOrders(data.items)
        setTotalPages(data.totalPages || 1)
      } else {
        setOrders([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error)
      Alert.alert('Lỗi', 'Không thể lấy danh sách đơn hàng.')
    } finally {
      setLoading(false)
    }
  }, [
    userId,
    currentPage,
    pageSize,
    orderStatus,
    startDate,
    endDate,
    orderCode,
  ])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const convertOrderStatus = (status) => {
    switch (Number(status)) {
      case 1:
        return 'Hoàn thành'
      case 0:
        return 'Đang xử lý'
      case 2:
        return 'Hủy'
      default:
        return 'Không xác định'
    }
  }

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() =>
        navigation.navigate('HistoryOrderDetails', {
          historyOrderID: item.historyOrderID,
        })
      }
    >
      {/* Header */}
      <View style={styles.orderHeader}>
        <Text style={styles.orderCode}>📦 Mã đơn: {item.orderCode}</Text>
        <Text
          style={[
            styles.orderStatus,
            item.orderStatus === 1 && styles.completed,
          ]}
        >
          {convertOrderStatus(item.orderStatus)}
        </Text>
      </View>

      {/* Order Details */}
      <Text style={styles.orderDate}>
        📅 Ngày đặt hàng: {new Date(item.orderDate).toLocaleDateString()}
      </Text>
      <Text style={styles.orderTotal}>
        💵 Tổng tiền: {item.totalAmount.toLocaleString()} đ
      </Text>

      {/* Items List */}
      <Text style={styles.sectionTitle}>Chi tiết đơn hàng:</Text>
      {item.historyOrderDetails.map((detail, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image
            source={{
              uri:
                detail.itemImages !== 'Block'
                  ? detail.itemImages
                  : 'https://via.placeholder.com/50',
            }}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{detail.itemName}</Text>
            <Text>Số lượng: {detail.quantity}</Text>
            <Text>Đơn giá: {detail.unitPrice.toLocaleString()} đ</Text>
            <Text>Tổng: {detail.totalPrice.toLocaleString()} đ</Text>
          </View>
        </View>
      ))}
    </TouchableOpacity>
  )

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const clearAllFilters = () => {
    setOrderStatus('')
    setStartDate(null)
    setEndDate(null)
    setOrderCode('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch Sử Đơn Hàng</Text>
      <View style={styles.filters}>
        <View style={styles.filterRow}>
          <DropDownPicker
            open={dropdownOpen}
            value={orderStatus}
            items={orderStatusOptions}
            setOpen={setDropdownOpen}
            setValue={setOrderStatus}
            style={[styles.dropdown]}
            containerStyle={{ width: '100%' }}
            placeholder="Trạng Thái"
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={[styles.dateButton, { marginRight: 10 }]}
          >
            <Text style={styles.dateButtonText}>
              {startDate ? startDate.toLocaleDateString('en-CA') : 'Từ Ngày'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {endDate ? endDate.toLocaleDateString('en-CA') : 'Đến Ngày'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <TextInput
            style={styles.input}
            placeholder="Mã Đơn Hàng"
            value={orderCode}
            onChangeText={(text) => setOrderCode(text)}
          />
        </View>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false)
              if (selectedDate) {
                setStartDate(selectedDate)
              }
            }}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndDatePicker(false)
              if (selectedDate) {
                setEndDate(selectedDate)
              }
            }}
          />
        )}

        {(orderStatus || startDate || endDate || orderCode) && (
          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={clearAllFilters}
          >
            <Text style={styles.clearAllText}>Xóa bộ lọc</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" style={styles.loader} />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrders}>Bạn chưa có đơn hàng nào</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.historyOrderID}
          ListFooterComponent={() => (
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
    width: '100%',
    gap: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    height: 40,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 40,
    justifyContent: 'center',
  },
  dateButtonText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 40,
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
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  orderStatus: {
    fontSize: 14,
    color: '#555',
  },
  orderDate: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
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
    width: 35,
    height: 35,
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
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#007BFF',
    fontWeight: 'bold',
  },
  completed: {
    backgroundColor: '#28a745',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a86b',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007BFF',
  },
  clearAllButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearAllText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
})

export default HistoryOrder
