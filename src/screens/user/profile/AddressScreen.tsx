import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import { deleteUserAddress, getUserAddress, setDefaultAddress } from '../../../api/user/user';
import AddressItem from '../../../components/app/AddressItem';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';

interface AddressScreenProps {
  navigation: { navigate: (screen: string, params?: any) => void };
}

export const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const fetchAddresses = async (): Promise<void> => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id || decodedToken.sub || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const data = await getUserAddress(userId);
      setAddresses(data.data || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultAddress = async (addressId: string): Promise<void> => {
    try {
      await setDefaultAddress(addressId);
      fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleDeleteAddress = async (): Promise<void> => {
    try {
      setDeletePopupVisible(false);
      if (!selectedAddressId) return;
      await deleteUserAddress(selectedAddressId);
      fetchAddresses();
      Alert.alert('Thành công', 'Địa chỉ đã được xóa.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa địa chỉ. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <AddressItem
      name={item.name}
      phone={item.phone}
      address={item.address}
      isdefault={item.isdefault}
      onSetDefault={() => handleSetDefaultAddress(item.userAdressId)}
      onUpdate={() => navigation.navigate('UpdateAddress', { address: item, refreshData: fetchAddresses })}
      onDelete={() => { setSelectedAddressId(item.userAdressId); setDeletePopupVisible(true); }}
    />
  );

  return (
    <View className="flex-1 p-4 bg-[#f9f9f9]">
      <Text className="text-xl font-bold mb-4">Địa chỉ của tôi</Text>
      <TouchableOpacity className="bg-red-400 p-2 rounded-lg mb-4 self-end" onPress={() => navigation.navigate('AddAddress', { refreshData: fetchAddresses })}>
        <Text className="text-white font-bold">+ Thêm địa chỉ mới</Text>
      </TouchableOpacity>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#00a86b" />
        </View>
      ) : addresses.length > 0 ? (
        <FlatList data={addresses} keyExtractor={(item) => item.userAdressId.toString()} renderItem={renderItem} />
      ) : (
        <Text className="text-center mt-5 text-gray-500">Bạn chưa có địa chỉ nào.</Text>
      )}

      <DeleteConfirmationPopup
        visible={deletePopupVisible}
        message="Bạn có chắc chắn muốn xóa địa chỉ này không?"
        onClose={() => setDeletePopupVisible(false)}
        onConfirm={handleDeleteAddress}
      />
    </View>
  );
};

export default AddressScreen;
