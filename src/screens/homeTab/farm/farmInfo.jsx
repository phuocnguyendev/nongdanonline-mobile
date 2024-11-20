import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getFarmDetails } from '../../../api/farm'
import { formatVND } from '../../../utils/Format.js'

export function FarmInfo({ navigation, route }) {
  const { initialFarmData } = route.params
  const [fetchedFarmData, setFetchedFarmData] = useState(null)
  const [loading, setLoading] = useState(true)
  const farmID = initialFarmData.farmID

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        const response = await getFarmDetails(farmID)
        setFetchedFarmData(response)
      } catch (err) {
        console.error('Error fetching farm details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFarmDetails()
  }, [farmID])

  const openMap = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error('An error occurred', err),
    )
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00a86b" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Product Farm', {
              data: fetchedFarmData,
            })
          }
          style={styles.buttonNavigate}
        >
          <Text style={styles.navText}>Sản phẩm & Dịch vụ</Text>
          <Ionicons name="arrow-forward" size={22} color="#00a86b" />
        </TouchableOpacity>

        {fetchedFarmData && (
          <View style={styles.infoContainer}>
            <View style={styles.imageHeaderView}>
              <ImageBackground
                source={{ uri: fetchedFarmData.farmImages[0]?.imagesUrl }}
                style={styles.imageHeader}
              />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.title}>{fetchedFarmData.farmName}</Text>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={18} color="#00a86b" />
                <Text style={styles.info}>
                  <Text style={styles.label}>Chủ trang trại: </Text>{' '}
                  {fetchedFarmData.farmOwner || 'N/A'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call" size={18} color="#00a86b" />
                <Text style={styles.info}>
                  <Text style={styles.label}>Liên hệ:</Text>{' '}
                  {fetchedFarmData.ownerPhone || 'N/A'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={18} color="#00a86b" />
                <Text style={styles.info}>
                  <Text style={styles.label}>Địa chỉ:</Text>{' '}
                  {fetchedFarmData.farmAddress || 'N/A'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="resize" size={18} color="#00a86b" />
                <Text style={styles.info}>
                  <Text style={styles.label}>Diện tích:</Text>{' '}
                  {fetchedFarmData.farmArea || 'N/A'} m²
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="map" size={18} color="#00a86b" />
                <Text style={styles.info}>
                  <Text style={styles.label}>Bản đồ: </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => openMap(fetchedFarmData.mapLink)}
                >
                  <Text style={styles.mapLink}>Xem bản đồ</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionTitle}>Khu vực hỗ trợ:</Text>
              {fetchedFarmData.farmProvinceSupports.map((support, index) => (
                <View key={index} style={styles.infoRow}>
                  <Ionicons name="location" size={18} color="#00a86b" />
                  <Text style={styles.info}>
                    <Text style={styles.label}>Tỉnh:</Text>{' '}
                    {support.provinceName} -{' '}
                    <Text style={styles.label}>Phí vận chuyển:</Text>{' '}
                    {formatVND(support.shippingFee)}
                    <Text style={styles.label}>Thời gian giao hàng:</Text>{' '}
                    {support.actualDeliveryDate} ngày
                  </Text>
                </View>
              ))}

              <Text style={styles.sectionTitle}>Thông tin Vật nuôi:</Text>
              {fetchedFarmData.animals.map((animal, index) => (
                <View key={index} style={styles.animalContainer}>
                  <ImageBackground
                    source={{ uri: animal.imageUrl }}
                    style={styles.animalImage}
                  />
                  <Text style={styles.animalName}>{animal.animalName}</Text>
                  <Text style={styles.animalDescription}>
                    {animal.animalDescription}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonNavigate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navText: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  infoContainer: {
    marginVertical: 20,
    elevation: 5,
    borderRadius: 20,
  },
  imageHeaderView: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageHeader: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  title: {
    color: '#00a86b',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoTextContainer: {
    backgroundColor: '#fff',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  mapLink: {
    color: '#00a86b',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a86b',
    marginTop: 15,
    marginBottom: 5,
  },
  animalContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  animalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a86b',
    marginBottom: 5,
  },
  animalDescription: {
    fontSize: 14,
    color: '#333',
  },
})
