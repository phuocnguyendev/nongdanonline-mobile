import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import { getOrderHistory } from '../../../api/order/order';

export const HistoryOrderDetails: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { historyOrderID } = route.params;

  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchOrderDetails = async (): Promise<void> => {
      if (!userId || !historyOrderID) return;
      setLoading(true);
      try {
        const response: any = await getOrderHistory(userId);
        const order = response?.data?.data?.items.find((o: any) => o.historyOrderID === historyOrderID);
        if (order) { setOrderDetails(order); } else { Alert.alert('Không tìm thấy đơn hàng', `ID: ${historyOrderID}`); }
      } catch (error) { console.error('Error fetching order details:', error); Alert.alert('Lỗi', 'Không thể lấy chi tiết đơn hàng.'); }
      finally { setLoading(false); }
    };
    fetchOrderDetails();
  }, [userId, historyOrderID]);

  if (loading) { return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#00a86b" /></View>; }
  if (!orderDetails) { return <View className="flex-1 justify-center items-center"><Text className="text-base text-[#555]">Không tìm thấy thông tin đơn hàng.</Text></View>; }

  const renderOrderDetails: ListRenderItem<any> = ({ item }) => (
    <View className="p-2.5 bg-white rounded-lg mb-2.5 shadow-sm">
      <Text className="text-base font-bold text-[#333]">{item.itemName}</Text>
      <Text className="text-sm text-[#555]">Số lượng: {item.quantity}</Text>
      <Text className="text-sm text-[#555]">Đơn giá: {item.unitPrice} VND</Text>
      <Text className="text-sm font-bold text-[#00a86b]">Thành tiền: {item.totalPrice} VND</Text>
    </View>
  );

  const renderTransactionDetails: ListRenderItem<any> = ({ item }) => (
    <View className="p-2.5 bg-white rounded-lg mb-2.5 shadow-sm">
      <Text className="text-base font-bold text-[#333]">Mã giao dịch: {item.transactionCode}</Text>
      <Text className="text-sm text-[#555]">Ngày giao dịch: {new Date(item.transactionDate).toLocaleDateString()}</Text>
      <Text className="text-sm font-bold text-[#00a86b]">Số tiền: {item.transactionAmount} VND</Text>
      <Text className="text-sm text-[#555]">Phương thức thanh toán: {item.paymentMethod === 0 ? 'VNPay' : 'PayOS'}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-[#f9f9f9] p-5">
      <Text className="text-[22px] font-bold mb-[20px] text-center text-[#333]">Chi tiết đơn hàng</Text>

      <View className="bg-white rounded-lg p-4 mb-5 shadow-sm elevation-[3]">
        <Text className="text-base font-bold mb-1 text-[#333]">Mã đơn hàng: {orderDetails.orderCode}</Text>
        <Text className="text-sm mb-1 text-[#555]">Ngày đặt hàng: {new Date(orderDetails.orderDate).toLocaleDateString()}</Text>
        <Text className="text-base font-bold text-[#00a86b]">Tổng tiền: {orderDetails.totalAmount} VND</Text>
      </View>

      <Text className="text-lg font-bold mb-2.5 text-[#333]">Chi tiết sản phẩm</Text>
      <FlatList data={orderDetails.historyOrderDetails} renderItem={renderOrderDetails} keyExtractor={(item) => item.historyOrderDetailID.toString()} contentContainerStyle={{ marginBottom: 20 }} />

      <Text className="text-lg font-bold mb-2.5 text-[#333]">Thông tin giao dịch</Text>
      <FlatList data={orderDetails.orderTransactions} renderItem={renderTransactionDetails} keyExtractor={(item) => item.transactionId.toString()} contentContainerStyle={{ marginBottom: 20 }} />

      <TouchableOpacity className="bg-[#00a86b] p-[15px] rounded-lg items-center mt-[20px]" onPress={() => navigation.goBack()}>
        <Text className="text-base text-white font-bold">Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HistoryOrderDetails;
