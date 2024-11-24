import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/cartSlice.js'
import { formatVND } from '../../utils/Format.js'

function ProductView({ blocks, farmID }) {
  const [showProduct, setShowProduct] = useState(false)
  const dispatch = useDispatch()
  const currentFarmID = useSelector((state) => state.cart.farmID)

  const handleShowProduct = () => {
    setShowProduct(!showProduct)
  }

  const handleAddToCart = (block) => {
    if (!block || !block.blockID) {
      alert('Sản phẩm không hợp lệ.')
      return
    }

    // Kiểm tra farmID
    if (currentFarmID && currentFarmID !== farmID) {
      alert('Cannot add items from a different farm.')
      return
    }

    dispatch(
      addToCart({
        item: {
          id: block.blockID,
          name: block.blockName,
          price: block.blockPrice,
          imageUrl: block.imageUrl,
          type: 'block',
          farmID: farmID,
        },
      }),
    )

    alert(`${block.blockName} đã được thêm vào giỏ hàng!`)
  }

  return (
    <View style={[styles.selection, { backgroundColor: '#f9f9f9' }]}>
      <TouchableOpacity onPress={handleShowProduct}>
        <View style={styles.selectionTitle}>
          <Ionicons name="cube-outline" size={24} color="#00a86b" />
          <Text style={styles.title}>Sản Phẩm Từ Trang Trại</Text>
          <Ionicons
            name={showProduct ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#00a86b"
          />
        </View>
      </TouchableOpacity>

      {showProduct && (
        <View style={styles.blockGrid}>
          {blocks.map((block, index) => (
            <View key={index} style={styles.blockCard}>
              <Image
                style={styles.imageProduct}
                source={{
                  uri: block.imageUrl || 'https://via.placeholder.com/150',
                }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.blockName} numberOfLines={1}>
                  {block.blockName}
                </Text>
                <Text style={styles.blockDescription} numberOfLines={2}>
                  {block.blockDescription}
                </Text>
                <View style={styles.displayRow}>
                  <Ionicons name="cash-outline" size={16} color="#00a86b" />
                  <Text style={styles.blockPrice}>
                    {formatVND(block.blockPrice)}
                  </Text>
                </View>
                <View style={styles.displayRow}>
                  <Ionicons
                    name="calendar-clear-outline"
                    size={16}
                    color="#00a86b"
                  />
                  <Text style={styles.blockRentTime}>
                    {block.rentTimeByDay} ngày thuê
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(block)}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default ProductView

// StyleSheet remains the same

const styles = StyleSheet.create({
  selection: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  selectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a86b',
    flex: 1,
    textAlign: 'center',
  },
  blockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  blockCard: {
    width: '48%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  imageProduct: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  blockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  blockDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  blockPrice: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333',
    fontWeight: '600',
  },
  blockRentTime: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333',
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#00a86b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
})
