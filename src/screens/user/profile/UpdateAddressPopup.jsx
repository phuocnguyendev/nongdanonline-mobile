import { useRoute } from '@react-navigation/native'
import { useFormik } from 'formik'
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
import { updateUserAddress } from '../../../api/user/user'
import { updateProfileValidationSchema } from '../../../validation/Validation'

const UpdateAddressPopup = ({ closeModal, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const route = useRoute()
  const address = route.params?.address
  const [openProvince, setOpenProvince] = useState(false)
  const [openDistrict, setOpenDistrict] = useState(false)
  const [openWard, setOpenWard] = useState(false)
  const { refreshData } = route.params || {}
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

        // Pre-select province, district, and ward based on the provided address
        const province = provinceOptions.find((p) =>
          address.address.includes(p.label),
        )
        if (province) {
          setSelectedProvince(province)

          const districtOptions = province.districts.map((district) => ({
            label: district.Name,
            value: district.Id,
            wards: district.Wards,
          }))
          setDistricts(districtOptions)

          const district = districtOptions.find((d) =>
            address.address.includes(d.label),
          )
          if (district) {
            setSelectedDistrict(district)

            const wardOptions = district.wards.map((ward) => ({
              label: ward.Name,
              value: ward.Id,
            }))
            setWards(wardOptions)

            const ward = wardOptions.find((w) =>
              address.address.includes(w.label),
            )
            if (ward) {
              setSelectedWard(ward)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching provinces:', error)
      }
    }

    fetchProvinces()
  }, [address])

  const formik = useFormik({
    initialValues: {
      name: address.name || '',
      phone: address.phone || '',
      address: address.address || '',
      isDefault: address.isdefault || false,
    },
    validationSchema: updateProfileValidationSchema,
    onSubmit: async (values) => {
      const fullAddress = `${values.address}, ${selectedWard?.label || ''}, ${selectedDistrict?.label || ''}, ${selectedProvince?.label || ''}`
      const payload = {
        name: values.name,
        address: fullAddress,
        phone: values.phone,
        isdefault: values.isDefault,
      }
      setLoading(true)
      try {
        await updateUserAddress(address.userAdressId, payload)
        Alert.alert('Thành công', 'Địa chỉ mới đã được thêm.')
        if (refreshData) {
          refreshData()
        }
        navigation.goBack()
      } catch (error) {
        console.error('Error updating address:', error)
        Alert.alert(
          'Error',
          'Unable to update address. Please try again later.',
        )
      } finally {
        setLoading(false)
      }
    },
  })
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setDistricts(
      selectedOption
        ? selectedOption.districts.map((district) => ({
            label: district.Name,
            value: district.Id,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật địa chỉ</Text>
      <ScrollView>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.name && formik.errors.name && styles.errorInput,
            ]}
            placeholder="Nhập họ và tên"
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Text style={styles.errorText}>{formik.errors.name}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.phone && formik.errors.phone && styles.errorInput,
            ]}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <Text style={styles.errorText}>{formik.errors.phone}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tỉnh/Thành phố</Text>
          <DropDownPicker
            open={openProvince} // Quản lý trạng thái mở của dropdown Tỉnh/Thành phố
            value={selectedProvince?.value}
            items={provinces}
            setValue={(callback) => {
              const value = callback()
              const option = provinces.find((p) => p.value === value)
              handleProvinceChange(option)
            }}
            setOpen={setOpenProvince} // Thay đổi trạng thái mở/đóng
            placeholder="Chọn Tỉnh/Thành phố"
            style={styles.picker}
            zIndex={3000}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Quận/Huyện</Text>
          <DropDownPicker
            open={openDistrict} // Quản lý trạng thái mở của dropdown Quận/Huyện
            value={selectedDistrict?.value}
            items={districts}
            setValue={(callback) => {
              const value = callback()
              const option = districts.find((d) => d.value === value)
              handleDistrictChange(option)
            }}
            setOpen={setOpenDistrict} // Thay đổi trạng thái mở/đóng
            placeholder="Chọn Quận/Huyện"
            disabled={!selectedProvince}
            style={styles.picker}
            zIndex={2000}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phường/Xã</Text>
          <DropDownPicker
            open={openWard} // Quản lý trạng thái mở của dropdown Phường/Xã
            value={selectedWard?.value}
            items={wards}
            setValue={(callback) => {
              const value = callback()
              const option = wards.find((w) => w.value === value)
              handleWardChange(option)
            }}
            setOpen={setOpenWard} // Thay đổi trạng thái mở/đóng
            placeholder="Chọn Phường/Xã"
            disabled={!selectedDistrict}
            style={styles.picker}
            zIndex={1000}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Địa chỉ cụ thể</Text>
          <TextInput
            style={[
              styles.input,
              formik.touched.address &&
                formik.errors.address &&
                styles.errorInput,
            ]}
            placeholder="Nhập địa chỉ cụ thể"
            onChangeText={formik.handleChange('address')}
            onBlur={formik.handleBlur('address')}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address && (
            <Text style={styles.errorText}>{formik.errors.address}</Text>
          )}
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() =>
              formik.setFieldValue('isDefault', !formik.values.isDefault)
            }
            style={styles.checkboxWrapper}
          >
            <Text style={styles.checkbox}>
              {formik.values.isDefault ? '☑' : '☐'} Đặt làm địa chỉ mặc định
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              closeModal ? closeModal() : navigation.goBack()
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Đóng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={[styles.submitButton, loading && styles.disabledButton]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Cập nhật</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  errorInput: { borderColor: '#f00' },
  errorText: { color: '#f00', fontSize: 12, marginTop: 5 },
  picker: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  checkboxContainer: { marginBottom: 15 },
  checkboxWrapper: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { fontSize: 14, color: '#333' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: { fontSize: 14, color: '#333' },
  submitButton: {
    backgroundColor: '#00a86b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: { opacity: 0.6 },
  submitButtonText: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
})

export default UpdateAddressPopup
