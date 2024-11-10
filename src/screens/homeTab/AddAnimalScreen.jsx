import { FontAwesome } from '@expo/vector-icons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import {
  addAnimalToFarm,
  getAnimalPackage,
  getFarmAnimal,
} from '../../api/farm/index'

export default function AddAnimalScreen({ route, navigation }) {
  const { blockData, farmID } = route.params
  const { blockOwnerUserID, animalTypeID } = blockData
  const [animalOptions, setAnimalOptions] = useState([])
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)
  const [packageOptions, setPackageOptions] = useState([])
  const [selectedPackageId, setSelectedPackageId] = useState(null)
  const [customAnimalName, setCustomAnimalName] = useState('')
  const [openAnimalDropdown, setOpenAnimalDropdown] = useState(false)
  const [openPackageDropdown, setOpenPackageDropdown] = useState(false)
  const [selectedPackageDetails, setSelectedPackageDetails] = useState('')

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animals = await getFarmAnimal(farmID, animalTypeID)
        const options = animals.map((animal) => ({
          label: animal.animalName,
          value: animal.animalID,
        }))
        setAnimalOptions(options)
      } catch (error) {
        console.error('Error fetching animals:', error)
      }
    }
    if (farmID && animalTypeID) {
      fetchAnimals()
    }
  }, [farmID, animalTypeID])

  const handleSelectAnimal = useCallback(async (animalId) => {
    setSelectedAnimalId(animalId)
    if (animalId) {
      try {
        const packagesResponse = await getAnimalPackage(animalId)
        const options = packagesResponse.map((pkg) => ({
          label: `${pkg.carePackageName} - ${pkg.myPackagePrice} VND`,
          value: pkg.myPackageID,
          details: `Số lượng còn: ${pkg.stock} | Thời gian sử dụng: ${pkg.timeUseByDay} ngày`,
        }))
        setPackageOptions(options)
      } catch (error) {
        console.error('Error fetching packages for animal:', error)
        setPackageOptions([])
      }
    } else {
      setPackageOptions([])
    }
  }, [])

  const handleSelectPackage = (packageId) => {
    const selectedPackage = packageOptions.find(
      (pkg) => pkg.value === packageId,
    )
    setSelectedPackageId(packageId)
    setSelectedPackageDetails(selectedPackage ? selectedPackage.details : '')
  }

  const handleAddAnimal = useCallback(async () => {
    const missingFields = []

    if (!selectedAnimalId) missingFields.push('Động vật')
    if (!selectedPackageId) missingFields.push('Gói chăm sóc')
    if (!customAnimalName.trim()) missingFields.push('Tên tùy chỉnh')

    if (missingFields.length > 0) {
      Alert.alert(
        'Thông tin không hợp lệ',
        `Vui lòng nhập các trường còn thiếu: ${missingFields.join(', ')}`,
        [{ text: 'OK' }],
      )
      return
    }

    const data = {
      blockOwnerUserID,
      animalId: selectedAnimalId,
      animalName: customAnimalName,
      myPackageId: selectedPackageId,
    }
    try {
      await addAnimalToFarm(data)
      Alert.alert('Thành công', 'Động vật đã được thêm thành công', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('My Farm', { refresh: true }),
        },
      ])
    } catch (error) {
      console.error('Error adding animal to farm:', error)
    }
  }, [
    blockOwnerUserID,
    selectedAnimalId,
    selectedPackageId,
    customAnimalName,
    navigation,
  ])

  const memoizedAnimalOptions = useMemo(() => animalOptions, [animalOptions])
  const memoizedPackageOptions = useMemo(() => packageOptions, [packageOptions])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn động vật</Text>
      <DropDownPicker
        open={openAnimalDropdown}
        value={selectedAnimalId}
        items={memoizedAnimalOptions}
        setOpen={setOpenAnimalDropdown}
        setValue={setSelectedAnimalId}
        setItems={setAnimalOptions}
        onChangeValue={(value) => handleSelectAnimal(value)}
        placeholder="Chọn động vật có trong trang trại"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Chọn gói chăm sóc</Text>
      <DropDownPicker
        open={openPackageDropdown}
        value={selectedPackageId}
        items={memoizedPackageOptions}
        setOpen={setOpenPackageDropdown}
        setValue={setSelectedPackageId}
        setItems={setPackageOptions}
        onChangeValue={handleSelectPackage}
        placeholder="Chọn gói phù hợp"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        disabled={!selectedAnimalId}
        zIndex={2000}
        zIndexInverse={1000}
      />

      {selectedPackageDetails ? (
        <View style={styles.packageDetailsContainer}>
          <FontAwesome name="info-circle" size={16} color="#333" />
          <Text style={styles.packageDetails}>{selectedPackageDetails}</Text>
        </View>
      ) : null}

      <Text style={styles.label}>Đặt tên động vật</Text>
      <TextInput
        style={[styles.input, customAnimalName ? styles.inputFilled : null]}
        placeholder="Nhập tên động vật"
        value={customAnimalName}
        onChangeText={setCustomAnimalName}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddAnimal}>
        <Text style={styles.buttonText}>Thêm động vật</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0',
    borderRadius: 5,
    height: 40,
  },
  dropdownContainer: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0',
    marginBottom: 15,
  },
  packageDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  packageDetails: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  inputFilled: {
    borderColor: '#00a86b',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#00a86b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
})
