import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
function CheckoutScreen({ route }) {
  const { cartItems = [], totalAmount = 0 } = route.params || {}
  const [userId, setUserId] = useState(null)
  const [selectedOption, setSelectedOption] = useState('vnpay')
  const selectFarmID = (state) => state.cart.farmID
  const farmID = useSelector(selectFarmID)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (token) {
          const decoded = jwtDecode(token)
          setUserId(decoded.id)
        }
      } catch (error) {
        console.error('Error retrieving user data:', error)
      }
    }
    fetchData()
  }, [])

  const paymentData = {
    amount: totalAmount,
    userId: userId,
    paymentMethod: selectedOption === 'vnpay' ? 0 : 2,
    paymentType: 0,
    farmID: farmID,
    listBlocks: cartItems
      .filter((item) => item.type === 'block')
      .map((item) => ({
        blockID: item.id,
        quantityBlock: item.quantity,
        quantityMonth: item.quantityMonth || 1,
      })),
    listCPs: cartItems
      .filter((item) => item.type === 'carePackage')
      .map((item) => ({
        carePackageID: item.id,
        quantity: item.quantity,
      })),
  }
  // console.log('Processing Payment:', paymentData)

  const handlePayment = () => {
    console.log('Processing Payment with Data:', paymentData)
    // You can now send `paymentData` to your backend
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác Nhận Thanh Toán</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống!</Text>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.cartItemsContainer}>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>
                      {item.price.toLocaleString('vi-VN')} VND x {item.quantity}
                    </Text>
                    {item.type === 'block' && (
                      <View style={styles.quantityMonthControl}>
                        <Text style={styles.quantityMonthLabel}>
                          Số tháng thuê:
                        </Text>
                        <Text style={styles.quantityMonth}>
                          {item.quantityMonth}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.itemTotal}>
                    {(
                      item.price *
                      item.quantity *
                      (item.type === 'block' ? item.quantityMonth : 1)
                    ).toLocaleString('vi-VN')}{' '}
                    VND
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.summaryContainer}>
            <Text style={styles.totalLabel}>Tổng tiền:</Text>
            <Text style={styles.totalAmount}>
              {totalAmount.toLocaleString('vi-VN')} VND
            </Text>
          </View>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handlePayment}
          >
            <Text style={styles.paymentText}>Xác Nhận Thanh Toán</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00a86b',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 50,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  cartItemsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#555',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  paymentButton: {
    backgroundColor: '#00a86b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityMonthControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityMonthLabel: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
  },
  quantityMonth: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
})

export default CheckoutScreen
