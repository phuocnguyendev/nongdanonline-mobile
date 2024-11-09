import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAnimalPackage } from '../../api/farm'

const AddPackageScreen = ({ route }) => {
  const { animalID } = route.params
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [carePackages, setCarePackages] = useState([])
  const [loading, setLoading] = useState(true)
  console.log('animalID', animalID)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const packageData = await getAnimalPackage(animalID)
        setCarePackages(packageData)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch package:', error)
        setLoading(false)
      }
    }

    fetchPackage()
  }, [animalID])

  const handlePurchase = () => {
    console.log('Purchased care package')
  }

  const handleAddPackage = () => {
    console.log('Add new care package')
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#00a86b" />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn Gói Chăm Sóc Từ Kho Của Bạn</Text>

      <Text style={styles.label}>Chọn gói:</Text>
      <DropDownPicker
        open={openDropdown}
        value={selectedPackage}
        items={carePackages.map((pkg) => ({
          label: pkg.packageName,
          value: pkg.packageID,
        }))}
        setOpen={setOpenDropdown}
        setValue={setSelectedPackage}
        setItems={setCarePackages}
        placeholder="Chọn gói"
        style={styles.dropdown}
      />

      <Text style={styles.label}>Thời gian sử dụng:</Text>
      <TextInput style={styles.input} value="30 ngày" editable={false} />

      <Text style={styles.label}>Số lượng:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Mua thêm gói chăm sóc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={handleAddPackage}
        >
          <Text style={styles.buttonText}>Thêm gói</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  dropdown: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonSecondary: {
    backgroundColor: '#757575',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
})

export default AddPackageScreen
