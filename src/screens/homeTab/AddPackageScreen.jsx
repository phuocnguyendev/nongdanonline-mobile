import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { addPackage, getAnimalPackage } from '../../api/farm'

export default function AddPackageScreen({ route, navigation }) {
  const { blockData } = route.params
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [quantity, setQuantity] = useState('1')
  const [carePackages, setCarePackages] = useState([])
  const [loading, setLoading] = useState(true)

  const animalID = useMemo(
    () => blockData?.animalOwnerUsers?.[0]?.animalID,
    [blockData],
  )
  const animalOwnerUserId = useMemo(
    () => blockData?.animalOwnerUsers?.[0]?.animalOwnerUserId,
    [blockData],
  )

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const packageData = await getAnimalPackage(animalID)
        setCarePackages(packageData)
      } catch (error) {
        console.error('Failed to fetch package:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackage()
  }, [animalID])

  const handleAddPackage = useCallback(async () => {
    Keyboard.dismiss()
    if (!selectedPackage || !quantity || quantity <= 0) {
      alert('Please select a package and enter a valid quantity.')
      return
    }

    const data = {
      animalUserId: animalOwnerUserId,
      myPackageId: selectedPackage,
      quantityCarePackage: parseInt(quantity, 10),
    }
    try {
      await addPackage(data)
      Alert.alert('Thành công', 'Gói đã được thêm thành công', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('My Farm', { refresh: true }),
        },
      ])
    } catch (error) {
      console.error('Failed to add package:', error)
      alert('Failed to add package. Please try again.')
    }
  }, [selectedPackage, quantity, animalOwnerUserId, navigation])

  const selectedPackageDetails = useMemo(() => {
    return carePackages.find((pkg) => pkg.myPackageID === selectedPackage) || {}
  }, [selectedPackage, carePackages])

  if (loading) {
    return <ActivityIndicator size="large" color="#00a86b" />
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Chọn Gói Chăm Sóc Từ Kho Của Bạn</Text>
          <Text style={styles.label}>Chọn gói:</Text>
          <DropDownPicker
            open={openDropdown}
            value={selectedPackage}
            items={carePackages.map((pkg) => ({
              label: `${pkg.carePackageName} - ${pkg.myPackagePrice.toLocaleString()} VND - Stock: ${pkg.stock}`,
              value: pkg.myPackageID,
            }))}
            setOpen={setOpenDropdown}
            setValue={setSelectedPackage}
            setItems={setCarePackages}
            placeholder="Chọn gói"
            style={styles.dropdown}
          />

          {selectedPackage && (
            <View style={styles.packageDetails}>
              <Text style={styles.detailText}>
                Thời gian sử dụng: {selectedPackageDetails.timeUseByDay} ngày
              </Text>
              <Text style={styles.detailText}>
                Giá: {selectedPackageDetails.myPackagePrice?.toLocaleString()}{' '}
                VND
              </Text>
              <Text style={styles.detailText}>
                Số lượng còn: {selectedPackageDetails.stock}
              </Text>
            </View>
          )}

          <Text style={styles.label}>Số lượng:</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(text)}
            onSubmitEditing={Keyboard.dismiss}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleAddPackage}
            >
              <Text style={styles.buttonText}>Thêm gói</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
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
  packageDetails: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 3,
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
