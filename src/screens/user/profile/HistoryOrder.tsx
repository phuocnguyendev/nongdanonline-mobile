import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getOrderHistory } from '../../../api/order/order';

export const HistoryOrder: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [orderCode, setOrderCode] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const pageSize = 5;

  const orderStatusOptions = [
    { label: 'Tất cả trạng thái', value: '' },
    { label: 'Chờ Xác Nhận', value: '0' },
    { label: 'Đã Xác Nhận', value: '1' },
    { label: 'Đang Giao Hàng', value: '2' },
    { label: 'Đã Giao Hàng', value: '3' },
    { label: 'Đã Hủy', value: '4' },
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
  }, []);

  const formatDate = (date: Date | null): string | null => {
    if (!date || isNaN(new Date(date).getTime())) return null;
    return new Date(date).toISOString().split('T')[0];
  };

  const fetchOrders = useCallback(async (): Promise<void> => {
    if (!userId) return;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) { Alert.alert('Lỗi', 'Ngày bắt đầu không được lớn hơn ngày kết thúc.'); return; }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    setLoading(true);
    try {
      const response = await getOrderHistory(userId, currentPage, pageSize, orderStatus, formattedStartDate || undefined, formattedEndDate || undefined, orderCode);
      const data = response?.data?.data;
      if (data?.items) {
        setOrders(data.items);
        setTotalPages(data.totalPages || 1);
      } else {
        setOrders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      Alert.alert('Lỗi', 'Không thể lấy danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  }, [userId, currentPage, pageSize, orderStatus, startDate, endDate, orderCode]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const convertOrderStatus = (status: number | string): string => {
    switch (Number(status)) {
      case 1: return 'Hoàn thành';
      case 0: return 'Đang xử lý';
      case 2: return 'Hủy';
      default: return 'Không xác định';
    }
  };

  const renderOrderItem = ({ item }: { item: any }) => (
    <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 border border-[#ddd] shadow-sm elevation-[3]" onPress={() => navigation.navigate('HistoryOrderDetails', { historyOrderID: item.historyOrderID })}>
      <View className="flex-row justify-between items-center mb-2.5">
        <Text className="text-base font-bold text-[#333]">📦 Mã đơn: {item.orderCode}</Text>
        <Text className={`text-sm py-1 px-2.5 rounded-lg text-white font-bold ${item.orderStatus === 1 ? 'bg-[#28a745]' : 'bg-[#007BFF]'}`}>
          {convertOrderStatus(item.orderStatus)}
        </Text>
      </View>
      <Text className="text-sm text-[#555] mb-1">📅 Ngày đặt hàng: {new Date(item.orderDate).toLocaleDateString()}</Text>
      <Text className="text-sm font-bold text-[#00a86b] mb-2.5">💵 Tổng tiền: {item.totalAmount.toLocaleString()} đ</Text>
      <Text className="text-sm font-bold text-[#333] mb-2.5">Chi tiết đơn hàng:</Text>
      {item.historyOrderDetails.map((detail: any, index: number) => (
        <View key={index} className="flex-row mb-2.5 items-center">
          <Image source={{ uri: detail.itemImages !== 'Block' ? detail.itemImages : 'https://via.placeholder.com/50' }} className="w-[50px] h-[50px] rounded-lg mr-2.5 bg-[#f0f0f0]" />
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#007BFF] mb-1">{detail.itemName}</Text>
            <Text className="text-xs text-[#333]">Số lượng: {detail.quantity}</Text>
            <Text className="text-xs text-[#333]">Đơn giá: {detail.unitPrice.toLocaleString()} đ</Text>
            <Text className="text-xs font-semibold text-[#333]">Tổng: {detail.totalPrice.toLocaleString()} đ</Text>
          </View>
        </View>
      ))}
    </TouchableOpacity>
  );

  const paginate = (pageNumber: number): void => { if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber); };
  const clearAllFilters = (): void => { setOrderStatus(''); setStartDate(null); setEndDate(null); setOrderCode(''); };

  return (
    <View className="flex-1 p-[20px] bg-[#f5f5f5]">
      <Text className="text-xl font-bold text-center mb-[20px]">Lịch Sử Đơn Hàng</Text>
      <View className="w-full gap-2.5 mb-2.5">
        <View className="flex-row justify-between mb-2.5 z-50">
          <DropDownPicker
            open={dropdownOpen} value={orderStatus} items={orderStatusOptions} setOpen={setDropdownOpen} setValue={setOrderStatus}
            style={{ backgroundColor: '#fff', borderColor: '#ddd', borderRadius: 8, height: 40 }}
            containerStyle={{ width: '100%' }} placeholder="Trạng Thái"
            zIndex={3000} zIndexInverse={1000}
          />
        </View>
        <View className="flex-row justify-between mb-2.5">
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} className="flex-1 bg-white border border-[#ddd] rounded-lg p-2.5 h-10 justify-center mr-2.5">
            <Text className="text-[#555] text-sm text-center">{startDate ? startDate.toLocaleDateString('en-CA') : 'Từ Ngày'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} className="flex-1 bg-white border border-[#ddd] rounded-lg p-2.5 h-10 justify-center">
            <Text className="text-[#555] text-sm text-center">{endDate ? endDate.toLocaleDateString('en-CA') : 'Đến Ngày'}</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mb-2.5">
          <TextInput className="flex-1 bg-white border border-[#ddd] rounded-lg p-2.5 h-10" placeholder="Mã Đơn Hàng" value={orderCode} onChangeText={setOrderCode} />
        </View>

        {showStartDatePicker && <DateTimePicker value={startDate || new Date()} mode="date" display="default" onChange={(event, selectedDate) => { setShowStartDatePicker(false); if (selectedDate) setStartDate(selectedDate); }} />}
        {showEndDatePicker && <DateTimePicker value={endDate || new Date()} mode="date" display="default" onChange={(event, selectedDate) => { setShowEndDatePicker(false); if (selectedDate) setEndDate(selectedDate); }} />}

        {(orderStatus || startDate || endDate || orderCode) && (
          <TouchableOpacity className="self-end px-3 py-1.5 bg-[#f1f1f1] rounded-full mt-[5px] mb-[10px] flex-row items-center border border-[#ddd]" onPress={clearAllFilters}>
            <Text className="text-[#666] text-xs font-medium">Xóa bộ lọc</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" className="mt-[50px]" />
      ) : orders.length === 0 ? (
        <Text className="text-center mt-[50px] text-base text-[#555]">Bạn chưa có đơn hàng nào</Text>
      ) : (
        <FlatList
          data={orders} renderItem={renderOrderItem} keyExtractor={(item) => item.historyOrderID}
          ListFooterComponent={() => (
            <View className="flex-row justify-center mt-[20px]">
              {currentPage > 1 && (
                <TouchableOpacity onPress={() => paginate(currentPage - 1)} className="mx-1 w-[35px] h-[35px] rounded-full bg-white border border-[#ddd] justify-center items-center">
                  <Text className="text-sm text-[#555] text-center">{'<'}</Text>
                </TouchableOpacity>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <TouchableOpacity key={index} onPress={() => paginate(index + 1)} className={`mx-1 w-[35px] h-[35px] rounded-full border border-[#ddd] justify-center items-center ${currentPage === index + 1 ? 'bg-[#00a86b] border-[#00a86b]' : 'bg-white'}`}>
                  <Text className={`text-sm text-center ${currentPage === index + 1 ? 'text-white' : 'text-[#555]'}`}>{index + 1}</Text>
                </TouchableOpacity>
              ))}
              {currentPage < totalPages && (
                <TouchableOpacity onPress={() => paginate(currentPage + 1)} className="mx-1 w-[35px] h-[35px] rounded-full bg-white border border-[#ddd] justify-center items-center">
                  <Text className="text-sm text-[#555] text-center">{'>'}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HistoryOrder;
