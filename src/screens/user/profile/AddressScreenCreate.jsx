import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAddress } from '../../../api/address/address'
import { postUserAddress } from '../../../api/user/user'

const AddressScreenCreate = ({ navigation, route }) => {
  const { refreshData } = route.params || {}
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    isDefault: false,
  })
  const [loading, setLoading] = useState(false)
  const [openProvince, setOpenProvince] = useState(false)
  const [openDistrict, setOpenDistrict] = useState(false)
  const [openWard, setOpenWard] = useState(false)

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getAddress()
        const provinceOptions = response.data.map((province) => ({
          label: province.Name,
          value: province.Id,
          districts: province.Districts,
        }))
        setProvinces(provinceOptions)
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }

    fetchProvinces()
  }, [])

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setDistricts(
      selectedOption
        ? selectedOption.districts.map((district) => ({
            value: district.Id,
            label: district.Name,
            wards: district.Wards,
          }))
        : [],
    )
  }

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption)
    setSelectedWard(null)
    setWards(
      selectedOption
        ? selectedOption.wards.map((ward) => ({
            label: ward.Name,
            value: ward.Id,
          }))
        : [],
    )
  }

  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption)
  }

  const handleSubmit = async () => {
    const { name, phone, address, isDefault } = formData
    if (
      !name ||
      !phone ||
      !address ||
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard
    ) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.')
      return
    }

    const fullAddress = `${address}, ${selectedWard.label}, ${selectedDistrict.label}, ${selectedProvince.label}`
    const payload = {
      name,
      phone,
      address: fullAddress,
      isdefault: isDefault,
    }

    setLoading(true)
    try {
      await postUserAddress(payload)
      Alert.alert('Thành công', 'Địa chỉ mới đã được thêm.')
      if (refreshData) {
        refreshData()
      }
      navigation.goBack()
    } catch (error) {
      console.error('Error creating address:', error)
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm địa chỉ.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Địa chỉ mới</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tỉnh/Thành phố</Text>
        <DropDownPicker
          style={styles.picker}
          placeholder="Chọn Tỉnh/Thành phố"
          items={provinces}
          value={selectedProvince?.value || null}
          setValue={(callback) => {
            const value = callback()
            const selectedOption = provinces.find((p) => p.value === value)
            handleProvinceChange(selectedOption)
          }}
          setOpen={setOpenProvince}
          open={openProvince}
          zIndex={3000}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quận/Huyện</Text>
        <DropDownPicker
          style={styles.picker}
          placeholder="Chọn Quận/Huyện"
          items={districts}
          value={selectedDistrict?.value || null}
          setValue={(callback) => {
            const value = callback()
            const selectedOption = districts.find((d) => d.value === value)
            handleDistrictChange(selectedOption)
          }}
          setOpen={setOpenDistrict}
          open={openDistrict}
          zIndex={2000}
          disabled={!selectedProvince}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phường/Xã</Text>
        <DropDownPicker
          style={styles.picker}
          placeholder="Chọn Phường/Xã"
          items={wards}
          value={selectedWard?.value || null}
          setValue={(callback) => {
            const value = callback()
            const selectedOption = wards.find((w) => w.value === value)
            handleWardChange(selectedOption)
          }}
          setOpen={setOpenWard}
          open={openWard}
          zIndex={1000}
          disabled={!selectedDistrict}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Địa chỉ cụ thể</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ cụ thể"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() =>
            setFormData((prev) => ({ ...prev, isDefault: !prev.isDefault }))
          }
        >
          <Text style={styles.checkboxLabel}>
            {formData.isDefault ? '☑' : '☐'} Đặt làm địa chỉ mặc định
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Hoàn thành</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#00a86b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
})

export default AddressScreenCreate
