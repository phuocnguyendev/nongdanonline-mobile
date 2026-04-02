import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { myFarm } from '../../../api/farm/Farm';
import { getShippingHistory } from '../../../api/shipping/shipping';

export const ShippingHistory: React.FC = () => {
  const navigation = useNavigation();
  const [shippingOrders, setShippingOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [shippingStatus, setShippingStatus] = useState<string>('');
  const [farmID, setFarmID] = useState<string>('');
  const [shippingCode, setShippingCode] = useState('');
  const [shippingDate, setShippingDate] = useState<Date | null>(null);
  const [farms, setFarms] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const pageSize = 5;
  const [userId, setUserId] = useState<string | null>(null);

  const shippingStatusOptions = [
    { label: 'Tất cả trạng thái', value: '' },
    { label: 'Đang Xử Lý', value: '0' },
    { label: 'Đang Vận Chuyển', value: '1' },
    { label: 'Đã Giao', value: '2' },
    { label: 'Đã Hủy', value: '3' },
  ];

  useEffect(() => {
    const fetchUserId = async (): Promise<void> => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) { Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.'); return; }
        const decodedToken: any = jwtDecode(token);
        const id = decodedToken.id || decodedToken.sub || decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        if (id) { setUserId(id); } else { Alert.alert('Lỗi', 'Token không hợp lệ.'); }
      } catch (error) { console.error('Error decoding token:', error); Alert.alert('Lỗi', 'Không thể đọc thông tin người dùng.'); }
    };
    fetchUserId();
    fetchFarms();
  }, []);

  const fetchFarms = async (): Promise<void> => {
    try {
      const response: any = await myFarm();
      if (response.data?.data) {
        setFarms(response.data.data.map((farm: any) => ({ label: farm.farmName, value: farm.farmID })));
      }
    } catch (error) { console.error('Error fetching farms:', error); Alert.alert('Lỗi', 'Không thể tải danh sách nông trại.'); }
  };

  const formatDate = (date: Date | null): string | null => {
    if (!date || isNaN(new Date(date).getTime())) return null;
    return new Date(date).toISOString().split('T')[0];
  };

  const fetchShippingOrders = useCallback(async (): Promise<void> => {
    if (!userId) return;
    const formattedShippingDate = formatDate(shippingDate);
    setLoading(true);
    try {
      const response = await getShippingHistory(userId, currentPage, pageSize, shippingStatus, farmID, shippingCode, formattedShippingDate || undefined);
      const data = response?.data?.data;
      if (data?.items) { setShippingOrders(data.items); setTotalPages(data.totalPages || 1); }
      else { setShippingOrders([]); setTotalPages(1); }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vận chuyển:', error);
      Alert.alert('Lỗi', 'Không thể lấy danh sách vận chuyển.');
    } finally { setLoading(false); }
  }, [userId, currentPage, pageSize, shippingStatus, farmID, shippingCode, shippingDate]);

  useEffect(() => { fetchShippingOrders(); }, [fetchShippingOrders]);

  const convertShippingStatus = (status: number | string): string => {
    switch (Number(status)) {
      case 0: return 'Đang Xử Lý';
      case 1: return 'Đang Vận Chuyển';
      case 2: return 'Đã Giao';
      case 3: return 'Đã Hủy';
      default: return 'Không Xác Định';
    }
  };

  const getFarmName = (fId: string): string => {
    const farm = farms.find((f) => f.value === fId);
    return farm ? farm.label : 'Không Xác Định';
  };

  const renderShippingItem = ({ item }: { item: any }) => (
    <View className="bg-white rounded-xl p-[15px] mb-[15px] shadow-sm elevation-[3] border border-[#ddd]">
      <View className="flex-row justify-between mb-2.5 items-center">
        <Text className="text-base font-bold text-[#333]">🚚 Mã Vận Chuyển: {item.shippingCode}</Text>
      </View>
      <Text className={`text-sm font-bold mb-2.5 ${item.shippingStatus === 3 ? 'text-[#FF0000]' : 'text-[#007BFF]'}`}>{convertShippingStatus(item.shippingStatus)}</Text>
      <Text className="text-sm font-bold mt-2.5 mb-1.5 text-[#333]">Danh Sách Vật Nuôi:</Text>
      {item.animalShippings.map((animal: any, index: number) => (
        <View key={index} className="flex-row mb-2.5 items-center">
          <Image source={{ uri: animal.animalOwnerUser.animalImage }} className="w-[60px] h-[60px] rounded-lg mr-2.5 bg-[#f0f0f0]" />
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#007BFF] mb-0.5">{animal.animalOwnerUser.animalName}</Text>
            <Text className="text-xs text-[#333]">Khối Lượng: ~ {animal.actualWeight / 1000} kg</Text>
            <Text className="text-xs text-[#333]">Ghi Chú: {animal.note || 'Không'}</Text>
          </View>
        </View>
      ))}
      <View className="mt-[10px] mb-[10px]">
        <Text className="text-sm text-[#333] my-0.5">📅 Ngày Vận Chuyển: {new Date(item.shippingDate).toLocaleDateString()}</Text>
        <Text className="text-sm text-[#333] my-0.5">📅 Ngày Giao Dự Kiến: {new Date(item.expectedDeliveryDate).toLocaleDateString()}</Text>
        <Text className="text-sm text-[#333] my-0.5">📞 Liên Hệ: {item.name} ({item.phone})</Text>
        <Text className="text-sm text-[#333] my-0.5">📍 Địa Chỉ: {item.address}</Text>
        <Text className="text-sm text-[#333] my-0.5">🏡 Nông Trại: {getFarmName(item.farmID)}</Text>
        <Text className="text-sm text-[#333] my-0.5">🔖 Mã Đơn Hàng: {item.orderCode}</Text>
      </View>
      <View className="mt-[10px] border-t border-[#ddd] pt-[10px]">
        <Text className="text-xs text-[#555] my-0.5">⚖️ Tổng Khối Lượng: ~ {item.totalWeight / 1000} kg</Text>
        <Text className="text-xs text-[#555] my-0.5">💸 Phí Vận Chuyển: {item.shippingFee.toLocaleString()} đ</Text>
        <Text className="text-xs text-[#555] my-0.5">💸 Phí Dịch Vụ: {item.cleanFee.toLocaleString()} đ</Text>
        <Text className="text-base font-bold text-[#00a86b] mt-[5px]">💵 Tổng Tiền: {(item.shippingFee + item.cleanFee).toLocaleString()} đ</Text>
      </View>
    </View>
  );

  const paginate = useCallback((pageNumber: number) => { if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber); }, [totalPages]);
  const clearAllFilters = (): void => { setShippingStatus(''); setFarmID(''); setShippingDate(null); setShippingCode(''); };

  return (
    <View className="flex-1 p-[20px] bg-[#f5f5f5]">
      <Text className="text-xl font-bold text-center mb-[20px] text-[#333]">Lịch Sử Giao Hàng</Text>
      <View className="w-full gap-2.5 mb-[15px]">
        <View className="flex-row justify-between mb-2.5 z-[3000]">
          <DropDownPicker open={dropdownOpen} value={shippingStatus} items={shippingStatusOptions} setOpen={setDropdownOpen} setValue={setShippingStatus} style={{ backgroundColor: '#fff', borderColor: '#ddd', borderRadius: 8, height: 40 }} containerStyle={{ width: '48%', marginRight: 10 }} placeholder="Trạng Thái" zIndex={3000} zIndexInverse={1000} />
          <DropDownPicker open={farmDropdownOpen} value={farmID} items={farms} setOpen={setFarmDropdownOpen} setValue={setFarmID} style={{ backgroundColor: '#fff', borderColor: '#ddd', borderRadius: 8, height: 40 }} containerStyle={{ width: '48%' }} placeholder="Chọn Nông Trại" zIndex={3000} zIndexInverse={1000} />
        </View>
        <View className="flex-row justify-between mb-2.5 z-10">
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-1 bg-white border border-[#ddd] rounded-lg p-2.5 h-10 justify-center">
            <Text className="text-[#555] text-sm text-center">{shippingDate ? shippingDate.toLocaleDateString('en-CA') : 'Ngày Vận Chuyển'}</Text>
          </TouchableOpacity>
          {showDatePicker && <DateTimePicker value={shippingDate || new Date()} mode="date" display="default" onChange={(event, selectedDate) => { setShowDatePicker(false); if (selectedDate) setShippingDate(new Date(selectedDate)); }} />}
        </View>
        <TextInput className="bg-white border border-[#ddd] rounded-lg p-2.5 h-10 text-sm z-10" placeholder="Mã Vận Chuyển" value={shippingCode} onChangeText={setShippingCode} />
        {(shippingStatus || farmID || shippingDate || shippingCode) && (
          <TouchableOpacity className="self-end px-3 py-1.5 bg-[#f8f8f8] border border-[#ddd] rounded-full mt-1.5 flex-row items-center shadow-sm z-10" onPress={clearAllFilters}>
            <Text className="text-[#666] text-xs font-medium">Xóa bộ lọc</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" className="mt-[50px] z-0" />
      ) : shippingOrders.length === 0 ? (
        <Text className="text-center mt-[50px] text-base text-[#555] z-0">Không có đơn hàng nào.</Text>
      ) : (
        <View className="flex-1 z-0">
          <FlatList
            data={shippingOrders} renderItem={renderShippingItem} keyExtractor={(item) => item.shippingID}
            ListFooterComponent={() => (
              <View className="items-center mt-[20px]">
                {totalPages > 0 && (
                  <View className="flex-row justify-center mt-[20px]">
                    {currentPage > 1 && (
                      <TouchableOpacity onPress={() => paginate(currentPage - 1)} className="mx-1 p-[10px] w-10 h-10 rounded-full bg-white border border-[#ddd] justify-center items-center">
                        <Text className="text-sm text-[#555] text-center">{'<'}</Text>
                      </TouchableOpacity>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                      <TouchableOpacity key={index} onPress={() => paginate(index + 1)} className={`mx-1 p-[10px] w-10 h-10 rounded-full border border-[#ddd] justify-center items-center ${currentPage === index + 1 ? 'bg-[#00a86b] border-[#00a86b]' : 'bg-white'}`}>
                        <Text className={`text-sm text-center ${currentPage === index + 1 ? 'text-white' : 'text-[#555]'}`}>{index + 1}</Text>
                      </TouchableOpacity>
                    ))}
                    {currentPage < totalPages && (
                      <TouchableOpacity onPress={() => paginate(currentPage + 1)} className="mx-1 p-[10px] w-10 h-10 rounded-full bg-white border border-[#ddd] justify-center items-center">
                        <Text className="text-sm text-[#555] text-center">{'>'}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ShippingHistory;
