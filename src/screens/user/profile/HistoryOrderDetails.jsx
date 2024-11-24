import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getOrderHistory } from '../../../api/order/order'

export const HistoryOrderDetails = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { historyOrderID } = route.params

  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)

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

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!userId || !historyOrderID) return

      setLoading(true)
      try {
        const response = await getOrderHistory(userId)
        const order = response?.data?.data?.items.find(
          (o) => o.historyOrderID === historyOrderID,
        )

        if (order) {
          setOrderDetails(order)
        } else {
          Alert.alert('Không tìm thấy đơn hàng', `ID: ${historyOrderID}`)
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
        Alert.alert('Lỗi', 'Không thể lấy chi tiết đơn hàng.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [userId, historyOrderID])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00a86b" />
      </View>
    )
  }

  if (!orderDetails) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Không tìm thấy thông tin đơn hàng.</Text>
      </View>
    )
  }

  const renderOrderDetails = ({ item }) => (
    <View style={styles.detailItem}>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
      <Text style={styles.itemPrice}>Đơn giá: {item.unitPrice} VND</Text>
      <Text style={styles.itemTotal}>Thành tiền: {item.totalPrice} VND</Text>
    </View>
  )

  const renderTransactionDetails = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionCode}>
        Mã giao dịch: {item.transactionCode}
      </Text>
      <Text style={styles.transactionDate}>
        Ngày giao dịch: {new Date(item.transactionDate).toLocaleDateString()}
      </Text>
      <Text style={styles.transactionAmount}>
        Số tiền: {item.transactionAmount} VND
      </Text>
      <Text style={styles.transactionMethod}>
        Phương thức thanh toán: {item.paymentMethod === 0 ? 'VNPay' : 'PayOS'}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết đơn hàng</Text>

      {/* Order Summary */}
      <View style={styles.summary}>
        <Text style={styles.orderCode}>
          Mã đơn hàng: {orderDetails.orderCode}
        </Text>
        <Text style={styles.orderDate}>
          Ngày đặt hàng: {new Date(orderDetails.orderDate).toLocaleDateString()}
        </Text>
        <Text style={styles.orderTotal}>
          Tổng tiền: {orderDetails.totalAmount} VND
        </Text>
      </View>

      {/* Product Details */}
      <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
      <FlatList
        data={orderDetails.historyOrderDetails}
        renderItem={renderOrderDetails}
        keyExtractor={(item) => item.historyOrderDetailID.toString()}
        contentContainerStyle={styles.detailsList}
      />

      {/* Transaction Details */}
      <Text style={styles.sectionTitle}>Thông tin giao dịch</Text>
      <FlatList
        data={orderDetails.orderTransactions}
        renderItem={renderTransactionDetails}
        keyExtractor={(item) => item.transactionId.toString()}
        contentContainerStyle={styles.detailsList}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsList: {
    marginBottom: 20,
  },
  detailItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  transactionItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#555',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  transactionMethod: {
    fontSize: 14,
    color: '#555',
  },
  backButton: {
    backgroundColor: '#00a86b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default HistoryOrderDetails
