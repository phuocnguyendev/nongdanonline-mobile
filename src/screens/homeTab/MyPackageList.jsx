import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getMyPackages } from '../../api/farm'

function MyPackageList() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true)
      const packagesData = await getMyPackages()
      setPackages(packagesData)
      setLoading(false)
    }
    fetchPackages()
  }, [])

  const handleAddPackage = () => {
    navigation.navigate('AddPackageScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gói chăm sóc của bạn</Text>
        <TouchableOpacity onPress={handleAddPackage}>
          <Ionicons name="add-circle-outline" size={24} color="#00a86b" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" />
      ) : packages.length === 0 ? (
        <Text style={styles.text}>No packages available</Text>
      ) : (
        <FlatList
          data={packages}
          renderItem={({ item }) => (
            <View style={styles.packageItem}>
              <Image
                source={{ uri: item.carePackageImages }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.carePackageName}</Text>
                <Text style={styles.price}>Giá: {item.myPackagePrice}</Text>
                <Text>Tồn kho: {item.stock}</Text>
                <Text>Thời gian sử dụng: {item.timeUseByDay} ngày</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.myPackageID}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  )
}

export default MyPackageList

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  flatListContent: {
    paddingBottom: 10, // Padding for better scroll feel
  },
  packageItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#007aff',
  },
})
