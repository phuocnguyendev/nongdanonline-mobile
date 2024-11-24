import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
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
import { BuyItem } from '../../api/payment/payment'
import { clearCart } from '../../store/cartSlice'
function CheckoutScreen({ route }) {
  const { cartItems = [], totalAmount = 0 } = route.params || {}
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const selectFarmID = (state) => state.cart.farmID
  const farmID = useSelector(selectFarmID)
  const navigation = useNavigation()
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

  // Function to build the payment data
  const buildPaymentData = (cartItems, totalAmount, userId, farmID) => {
    const paymentData = {
      amount: totalAmount,
      userId: userId,
      paymentMethod: 2, // Assuming 2 is for PayOS
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
    return paymentData
  }

  const handlePayment = async () => {
    if (!userId || !farmID) {
      alert('Vui lòng đăng nhập và chọn nông trại để thanh toán')
      return
    }

    setIsLoading(true)
    const paymentData = buildPaymentData(cartItems, totalAmount, userId, farmID)

    try {
      const response = await BuyItem(paymentData, paymentData.paymentMethod)

      if (response.status === 200) {
        const { data } = response

        if (data?.url?.data?.qrCode) {
          setQrCode(data?.url?.data?.qrCode)
          navigation.navigate('QRCodeScreen', {
            qrCode: data?.url?.data?.qrCode,
          })
        }
        dispatch(clearCart())
      } else {
        alert('Thanh toán thất bại, vui lòng thử lại.')
      }
    } catch (error) {
      console.error('Error with payment request:', error)
      alert('Thanh toán thất bại, vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
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
            disabled={isLoading}
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
  qrCodeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
})

export default CheckoutScreen
