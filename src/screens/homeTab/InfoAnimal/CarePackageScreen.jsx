import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const CarePackageScreen = ({ route, navigation }) => {
  const { animalData, blockData, animalOwnerUserId } = route.params
  const carePackages = animalData.userAnimalOwnerCares || []
  console.log('animalOwnerUserId', animalOwnerUserId)

  return (
    <ScrollView style={styles.container}>
      {carePackages.map((carePackage, index) => (
        <View key={index} style={styles.packageContainer}>
          <Image
            source={{ uri: carePackage.carePackageImages }}
            style={styles.packageImage}
          />
          <Text style={styles.packageName}>{carePackage.carePackageName}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Thời gian sử dụng:</Text>
            <Text style={styles.value}>{carePackage.timeUseByDay} ngày</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Số lượng đã sử dụng:</Text>
            <Text style={styles.value}>{carePackage.quantityCarePackage}</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('AddPackageScreen', {
                blockData,
                carePackage,
                animalOwnerUserId,
              })
            }
          >
            <Text style={styles.addButtonText}>Thêm gói chăm sóc</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  packageContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  packageImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  packageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00a86b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default CarePackageScreen
