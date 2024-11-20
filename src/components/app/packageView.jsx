import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/cartSlice.js'

function PackageView({ animals, farmID }) {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const dispatch = useDispatch()
  const currentFarmID = useSelector((state) => state.cart.farmID)

  const handleShowPackages = (animalID) => {
    setSelectedAnimal(selectedAnimal === animalID ? null : animalID)
  }

  const handleAddToCart = (packageItem) => {
    if (!packageItem || !packageItem.carePackageID) {
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
          id: packageItem.carePackageID,
          name: packageItem.carePackageName,
          price: packageItem.carePackagePrice,
          imageUrl: packageItem.carePackageImages,
          type: 'carePackage',
          farmID: farmID,
        },
      }),
    )
    alert(`${packageItem.carePackageName} đã được thêm vào giỏ hàng!`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách gói chăm sóc cho động vật</Text>

      <View style={styles.animalGrid}>
        {animals.map((animal) => (
          <TouchableOpacity
            key={animal.animalID}
            style={styles.animalCard}
            onPress={() => handleShowPackages(animal.animalID)}
          >
            <Image
              style={styles.imageProduct}
              source={{
                uri: animal.imageUrl || 'https://via.placeholder.com/150',
              }}
            />
            <Text style={styles.animalName} numberOfLines={1}>
              {animal.animalName || 'Unknown Animal'}
            </Text>
            <View style={styles.displayRow}>
              <Ionicons name="bulb-outline" size={14} color="#00a86b" />
              <Text style={styles.animalType}>
                {animal.animalTypeResponse?.animalTypeName || 'Unknown Type'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedAnimal && (
        <View style={styles.packageGrid}>
          {animals
            .find((animal) => animal.animalID === selectedAnimal)
            ?.carePackages.map((pkg) => (
              <View key={pkg.carePackageID} style={styles.packageCard}>
                <Image
                  style={styles.packageImage}
                  source={{
                    uri:
                      pkg.carePackageImages ||
                      'https://via.placeholder.com/150',
                  }}
                />
                <Text style={styles.packageName} numberOfLines={1}>
                  {pkg.carePackageName || 'Unknown Package'}
                </Text>
                <Text style={styles.packagePrice}>
                  Giá:
                  {pkg.carePackagePrice ? `${pkg.carePackagePrice} ₫` : 'N/A'}
                </Text>
                <Text style={styles.packagePrice}>
                  Thời gian sử dụng: {pkg.timeUseByDay} ngày
                </Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(pkg)}
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

export default PackageView

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00a86b',
    marginBottom: 8,
  },
  animalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  animalCard: {
    width: '30%',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  imageProduct: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  animalName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  animalType: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#00a86b',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  packageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  packageCard: {
    width: '48%', // Two items per row for packages
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 2, // Slight shadow effect
  },
  packageImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  packageName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  addToCartButton: {
    marginTop: 5,
    backgroundColor: '#00a86b',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: 'bold',
  },
})
