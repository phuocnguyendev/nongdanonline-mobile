import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  deleteUserAddress,
  getUserAddress,
  setDefaultAddress,
} from '../../../api/user/user'
import AddressItem from '../../../components/app/AddressItem'
import DeleteConfirmationPopup from './DeleteConfirmationPopup'

export const AddressScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletePopupVisible, setDeletePopupVisible] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (!token) return

      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id

      const data = await getUserAddress(userId)
      setAddresses(data.data || [])
    } catch (error) {
      console.error('Error fetching addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSetDefaultAddress = async (addressId) => {
    try {
      await setDefaultAddress(addressId)
      fetchAddresses()
    } catch (error) {
      console.error('Error setting default address:', error)
    }
  }
  const handleDeleteAddress = async () => {
    try {
      setDeletePopupVisible(false) // Close popup
      if (!selectedAddressId) return

      // Perform delete action
      await deleteUserAddress(selectedAddressId)
      fetchAddresses() // Refresh addresses
      Alert.alert('Thành công', 'Địa chỉ đã được xóa.')
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa địa chỉ. Vui lòng thử lại.')
    }
  }
  useEffect(() => {
    fetchAddresses()
  }, [])

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Địa chỉ của tôi</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddAddress', { refreshData: fetchAddresses })
        }
        style={{
          backgroundColor: '#f87171',
          padding: 8,
          borderRadius: 8,
          marginBottom: 16,
          alignSelf: 'flex-end',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          + Thêm địa chỉ mới
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" />
      ) : addresses.length > 0 ? (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.userAdressId.toString()}
          renderItem={({ item }) => (
            <AddressItem
              name={item.name}
              phone={item.phone}
              address={item.address}
              isdefault={item.isdefault}
              onSetDefault={() => handleSetDefaultAddress(item.userAdressId)}
              onUpdate={() =>
                navigation.navigate('UpdateAddress', {
                  address: item,
                  refreshData: fetchAddresses,
                })
              }
              onDelete={() => {
                // Open delete confirmation popup
                setSelectedAddressId(item.userAdressId) // Set the address to be deleted
                setDeletePopupVisible(true) // Show popup
              }}
            />
          )}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Bạn chưa có địa chỉ nào.
        </Text>
      )}
      <DeleteConfirmationPopup
        visible={deletePopupVisible}
        message="Bạn có chắc chắn muốn xóa địa chỉ này không?"
        onClose={() => setDeletePopupVisible(false)} // Close popup
        onConfirm={handleDeleteAddress} // Confirm delete action
      />
    </View>
  )
}
