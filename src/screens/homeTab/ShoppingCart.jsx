import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  decrementQuantity,
  decrementQuantityMonth,
  incrementQuantity,
  incrementQuantityMonth,
  removeFromCart,
} from '../../store/cartSlice'

export default function ShoppingCart({ navigation }) {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.emptyCartText}>
            Giỏ hàng của bạn trống! Quay về danh sách nông trại
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <ScrollView style={styles.scrollContainer}>
            {cartItems.map((item) => {
              const uniqueKey =
                item.uniqueIdentifier || `${item.id}-${item.name}`
              return (
                <View key={uniqueKey} style={styles.cartItem}>
                  <Image
                    source={{
                      uri: item.imageUrl || 'https://via.placeholder.com/100',
                    }}
                    style={styles.image}
                  />
                  <View style={styles.info}>
                    <Text style={styles.itemName}>
                      {item.name || 'Sản phẩm không có tên'}
                    </Text>
                    <Text style={styles.price}>
                      Giá: {item.price?.toLocaleString('vi-VN')} VND
                    </Text>

                    {item.type === 'block' && (
                      <View style={styles.quantityMonthControl}>
                        <Text style={styles.quantityMonthLabel}>
                          Số tháng thuê:
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            if (item.quantityMonth > 1) {
                              dispatch(
                                decrementQuantityMonth(item.uniqueIdentifier),
                              )
                            }
                          }}
                          style={styles.quantityButton}
                        >
                          <Ionicons
                            name="remove-circle-outline"
                            size={24}
                            color="#00a86b"
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantityMonth}>
                          {item.quantityMonth || 1}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(
                              incrementQuantityMonth(item.uniqueIdentifier),
                            )
                          }
                          style={styles.quantityButton}
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="#00a86b"
                          />
                        </TouchableOpacity>
                      </View>
                    )}

                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(decrementQuantity(item.uniqueIdentifier))
                        }
                        style={styles.quantityButton}
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={24}
                          color="#00a86b"
                        />
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(incrementQuantity(item.uniqueIdentifier))
                        }
                        style={styles.quantityButton}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={24}
                          color="#00a86b"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(removeFromCart(item.uniqueIdentifier))
                    }
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng tiền:</Text>
              <Text style={styles.totalPrice}>
                {totalPrice.toLocaleString('vi-VN')} VND
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate('Checkout', {
                  cartItems,
                  totalAmount: totalPrice,
                })
              }
            >
              <Text style={styles.checkoutText}>Thanh Toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    paddingHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  deleteButton: {
    padding: 10,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  checkoutButton: {
    backgroundColor: '#00a86b',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkoutText: {
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
})
